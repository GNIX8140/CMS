const ClassroomModel = require('../model/classroom');
const ClassroomRecordModel = require('../model/classroom_record');
const { Op, where } = require('sequelize');
const ClassroomAreaEnum = require('../enumeration/classroomArea');
const ClassroomTypeEnum = require('../enumeration/classroomType');
const moment = require('moment');
const schedule = require('node-schedule');
const UserModel = require('../model/user');
const crypto = require('crypto');

// 查询列表
async function QueryList(ctx) {
    let data = ctx.query;
    let page = parseInt(data.page), length = parseInt(data.length);
    let offset = (page - 1) * length;
    let where = {};
    if (data.area) where.classroom_area = data.area;
    if (data.type) where.classroom_type = data.type;
    if (data.number) where = { classroom_number: { [Op.like]: `%${data.number}%` } };
    let resultList = await ClassroomModel.findAll({
        where: where,
        offset: offset,
        limit: length,
    });
    let items = [];
    resultList.forEach(item => {
        items.push({
            id: item.classroom_id,
            area: ClassroomAreaEnum[item.classroom_area],
            number: item.classroom_number,
            type: ClassroomTypeEnum[item.classroom_type][0],
            capacity: item.classroom_capacity,
            authority: item.classroom_authority,
            available: item.classroom_available,
        });
    });
    let nextItem = await ClassroomModel.findOne({
        where: where,
        offset: page * length,
    });
    let { count } = await ClassroomModel.findAndCountAll({
        where: where,
    });
    return ctx.success('查询教室数据列表成功', {
        first: page == 1 ? true : false,
        hasPrevious: offset > 1 ? true : false,
        hasNext: nextItem == null ? false : true,
        last: nextItem == null ? true : false,
        num: page,
        pageSize: length,
        pageTotal: Math.floor(count / length) + 1,
        recordsTotal: count,
        items: items,
    });
}

// 添加教室
async function Add(ctx) {
    let data = ctx.request.body;
    if (JSON.stringify(data) === '{}'
        || data.area === undefined
        || data.number === undefined
        || data.type === undefined) return ctx.dataError();
    let isExist = await ClassroomModel.findOne({
        where: {
            classroom_number: data.number,
        }
    });
    if (isExist) return ctx.dataError(null, '教室编号已存在');
    await ClassroomModel.create({
        classroom_area: data.area,
        classroom_number: data.number,
        classroom_type: data.type,
        classroom_capacity: data.capacity ? data.capacity : ClassroomTypeEnum[data.type][1],
        classroom_authority: data.authority ? data.authority : false,
        classroom_available: data.available ? data.available : false,
    });
    return ctx.success(null, '教室信息添加成功');
}

// 更新教室信息
async function Update(ctx) {
    let data = ctx.request.body;
    if (JSON.stringify(data) === '{}'
        || data.id === undefined
        || data.area === undefined
        || data.number === undefined
        || data.type === undefined
        || data.capacity === undefined
        || data.authority === undefined
        || data.available == undefined) return ctx.dataError(null, '教室数据不完整');
    let oldClassroom = await ClassroomModel.findOne({ where: { classroom_id: data.id } });
    if (!oldClassroom) return ctx.dataError(null, '教室信息不存在');
    if (data.area === oldClassroom.classroom_area
        && data.number === oldClassroom.classroom_number
        && data.type === oldClassroom.classroom_type
        && data.capacity === oldClassroom.classroom_capacity
        && data.authority === oldClassroom.classroom_authority
        && data.available === oldClassroom.classroom_available) return ctx.dataError(null, '教室信息无更新');
    if (data.area + 1 > ClassroomAreaEnum.length) return ctx.dataError(null, '教室区域数据错误');
    if (data.type + 1 > ClassroomTypeEnum.length) return ctx.dataError(null, '教室类型数据错误');
    let updateResult = await ClassroomModel.update({
        classroom_area: data.area,
        classroom_number: data.number,
        classroom_type: data.type,
        classroom_capacity: ClassroomTypeEnum[data.type][1],
        classroom_authority: data.authority,
        classroom_available: data.available,
    }, {
        where: {
            classroom_id: data.id,
        }
    });
    if (!updateResult[0]) return ctx.dataError(null, '数据更新错误');
    return ctx.success(null, '教室数据更新成功');
}

// 申请使用教室
async function Apply(ctx) {
    let data = ctx.query;
    let user = ctx.state.user;
    //测试时间
    data.startTime = moment();
    data.endTime = moment().add(10, 'seconds');
    // 数据验证
    if (data.classroomId === undefined
        || user.user_id === undefined
        || data.startTime === undefined
        || data.endTime === undefined) return ctx.dataError();
    // 查询教室信息
    let classroom = await ClassroomModel.findOne({ where: { classroom_id: data.classroomId } });
    if (!classroom) return ctx.dataError(null, '教室ID错误');
    if (!classroom.classroom_available) return ctx.dataError(null, '当前教室不可用');
    let userData = await UserModel.findOne({ where: { user_id: user.user_id } });
    if (userData.user_inApply) return ctx.dataError(null, '已有申请教室');
    // 开始申请流程
    let userUpdateResult = await UserModel.update({
        user_inApply: true,
    }, {
        where: {
            user_id: user.user_id,
        }
    });
    if (!userUpdateResult[0]) return ctx.error(null, '教室使用申请错误');
    // 判断申请是否需要审核
    if (classroom.classroom_authority) {
        await ClassroomRecordModel.create({
            classroomRecord_uuid: crypto.randomUUID(),
            classroomRecord_user: user.user_id,
            classroomRecord_classroom: data.classroomId,
            classroomRecord_start: data.startTime,
            classroomRecord_end: data.endTime,
            classroomRecord_status: false,
            classroomRecord_pass: false,
            classroomRecord_finish: false,
        });
        return ctx.success(null, '申请成功，等待审核');
    } else {
        let classroomRecordUUID = crypto.randomUUID();
        await ClassroomRecordModel.create({
            classroomRecord_uuid: classroomRecordUUID,
            classroomRecord_user: user.user_id,
            classroomRecord_classroom: data.classroomId,
            classroomRecord_start: data.startTime,
            classroomRecord_end: data.endTime,
            classroomRecord_status: true,
            classroomRecord_pass: true,
            classroomRecord_finish: false,
        });
        let classroomUpdateResult = await ClassroomModel.update({
            classroom_available: false,
        }, {
            where: {
                classroom_id: data.classroomId,
            }
        });
        if (!classroomUpdateResult[0]) return ctx.error(null, '教室使用申请错误');
        let endDatetime = data.endTime.format('YYYY M D H m s').split(' ');
        endDatetime = new Date(endDatetime[0], endDatetime[1] - 1, endDatetime[2], endDatetime[3], endDatetime[4], endDatetime[5]);
        schedule.scheduleJob(user.user_uuid, endDatetime, async () => {
            await ClassroomModel.update({
                classroom_available: true,
            }, {
                where: {
                    classroom_id: data.classroomId,
                }
            });
            await UserModel.update({
                user_inApply: false,
            }, {
                where: {
                    user_id: user.user_id,
                }
            });
            await ClassroomRecordModel.update({
                classroomRecord_finish: true,
            }, {
                where: {
                    classroomRecord_uuid: classroomRecordUUID,
                }
            });
            console.log('finish');
        });
        ctx.success(null, '教室使用申请成功');
    }
}

// 审批流程
async function Approval(ctx) {
    let adminAuthority = ctx.state.user.admin_authority;
    if (!adminAuthority) return ctx.unauthorized();
    let data = ctx.query;
    let record = ClassroomRecordModel.findOne({
        where: {
            classroomRecord_id: data.classroomRecordId,
        }
    });
    if (!record) return ctx.dataError(null, '申请ID错误');
    // 审批流程开始
    if (!data.agree) {
        await ClassroomRecordModel.update({
            classroomRecord_status: true,
            classroomRecord_pass: false,
            classroomRecord_finish: true,
        }, {
            where: record.classroomRecord_id,
        });
        ctx.success(null, '审批拒绝成功');
    }
    // 教室是否可用
    let classroom = await ClassroomModel.findOne({ where: { classroom_id: record.classroomRecord_classroom } });
    if (!classroom.classroom_available) return ctx.dataError(null, '教室使用中');
    // 审批完成&&通过状态
    let classroomRecordUpdateResult = await ClassroomRecordModel.update({
        classroomRecord_status: true,
        classroomRecord_pass: true,
    });
    if (!classroomRecordUpdateResult[0]) return ctx.error(null, '审批流程错误');
    // 教室可用状态
    let classroomUpdateResult = await ClassroomModel.update({
        classroom_available: false,
    }, {
        where: {
            classroom_id: record.classroomRecord_classroom,
        }
    });
    if (!classroomUpdateResult[0]) return ctx.error(null, '审批流程错误');
    let classroomApprovalList = await ClassroomRecordModel.findAll({
        where: {
            [Op.and]: [
                { classroomRecord_classroom: record.classroomRecord_id },
                { classroomRecord_status: false },
            ]
        }
    });
    // 其他相同教室待审核->拒绝&&结束
    classroomApprovalList.forEach(async (item) => {
        item.classroomRecord_status = false;
        item.classroomRecord_pass = false;
        item.classroomRecord_finish = true;
        await ClassroomRecordModel.update(item, {
            where: {
                classroomRecord_id: item.classroomRecord_id,
            }
        })
    });
    ctx.success(null, '审批通过成功');
}

module.exports = { QueryList, Add, Update, Apply, Approval }