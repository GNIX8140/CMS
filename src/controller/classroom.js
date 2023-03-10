const ClassroomModel = require('../model/classroom');
const ClassroomRecordModel = require('../model/classroomRecord');
const ClassroomAreaModel = require('../model/classroomArea');
const ClassroomTypeModel = require('../model/classroomType');
const { Op } = require('sequelize');
const moment = require('moment');
const schedule = require('node-schedule');
const UserModel = require('../model/user');
const crypto = require('crypto');
const sequelize = require('../database/mysql');

// 查询列表
async function QueryList(ctx) {
    let data = ctx.query;
    let page = parseInt(data.page), length = parseInt(data.length);
    let offset = (page - 1) * length;
    let where = {};
    if (data.area) where.classroom_area = data.area;
    if (data.type) where.classroom_type = data.type;
    if (data.number) where = { classroom_number: { [Op.like]: `%${data.number}%` } };
    let { count, rows } = await ClassroomModel.findAndCountAll({
        where: where,
        include: [
            {
                attributes: ['classroomArea_name'],
                model: ClassroomAreaModel,
            },
            {
                attributes: ['classroomType_name'],
                model: ClassroomTypeModel,
            }
        ],
        offset: offset,
        limit: length,
    });
    let items = [];
    rows.forEach(item => {
        items.push({
            id: item.classroom_id,
            area: item.classroom_area,
            number: item.classroom_number,
            type: item.classroom_type,
            capacity: item.classroom_capacity,
            authority: item.classroom_authority,
            available: item.classroom_available,
        });
    });
    let nextItem = await ClassroomModel.findOne({
        where: where,
        offset: page * length,
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
    let admin_authority = ctx.state.user.admin_authority;
    if (!admin_authority) return ctx.unauthorized();
    let data = ctx.request.body;
    if (JSON.stringify(data) === '{}'
        || data.area === undefined
        || data.number === undefined
        || data.type === undefined) return ctx.dataError();
    let isExist = await ClassroomModel.findOne({
        where: {
            classroom_number: data.number,
        },
        paranoid: false,
    });
    if (isExist) {
        await sequelize.transaction(async (t) => {
            await ClassroomModel.restore({
                where: {
                    classroom_id: isExist.classroom_id,
                }
            })
            await ClassroomModel.update({
                classroom_area: data.area,
                classroom_number: data.number,
                classroom_type: data.type,
                classroom_capacity: data.capacity ? data.capacity : classroomType[data.type].classroomType_capacity,
                classroom_authority: data.authority ? data.authority : false,
                classroom_available: data.available ? data.available : false,
            }, {
                where: {
                    classroom_id: isExist.classroom_id
                }
            });
        });
        return ctx.success(null, '教室信息添加成功');
    }
    isExist = await ClassroomModel.findOne({
        where: {
            classroom_number: data.number,
        }
    });
    if (isExist) return ctx.dataError(null, '教室编号已存在');
    let classroomType = await ClassroomTypeModel.findAll();
    await sequelize.transaction(async (t) => {
        await ClassroomModel.create({
            classroom_uuid: crypto.randomUUID(),
            classroom_area: data.area,
            classroom_number: data.number,
            classroom_type: data.type,
            classroom_capacity: data.capacity ? data.capacity : classroomType[data.type].classroomType_capacity,
            classroom_authority: data.authority ? data.authority : false,
            classroom_available: data.available ? data.available : false,
        });
    });
    return ctx.success(null, '教室信息添加成功');
}

// 更新教室信息
async function Update(ctx) {
    let admin = ctx.state.user;
    if (!admin.admin_authority) return ctx.unauthorized();
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
    let classroomArea = await ClassroomAreaModel.findAll();
    let classroomType = await ClassroomTypeModel.findAll();
    if (data.area > classroomArea.length) return ctx.dataError(null, '教室区域数据错误');
    if (data.type > classroomType.length) return ctx.dataError(null, '教室类型数据错误');
    if (data.available) {
        let recordList = await ClassroomRecordModel.findAll({
            where: {
                [Op.and]: [
                    {
                        createdAt: {
                            [Op.between]: [moment().subtract(6, 'hours'), moment()],
                        }
                    },
                    {
                        classroomRecord_classroom: data.id,
                    },
                    {
                        classroomRecord_status: true
                    },
                    {
                        classroomRecord_pass: true,
                    },
                    {
                        classroomRecord_finish: false,
                    }
                ]
            }
        });
        if (recordList.length > 0) {
            return ctx.dataError(null, '当前教室在使用中,请稍后更改');
        }
    }
    let updateResult = await ClassroomModel.update({
        classroom_area: data.area,
        classroom_number: data.number,
        classroom_type: data.type,
        classroom_capacity: data.capacity,
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
    if (user.user_authority === undefined) return ctx.unauthorized();
    // 数据验证
    if (data.classroomId === undefined
        || user.user_id === undefined
        || data.startTime === undefined
        || data.endTime === undefined) return ctx.dataError();
    // // *** Delete Start *** 测试时间
    // data.startTime = moment();
    // data.endTime = moment().add(40, 'seconds');
    // // *** Delete End *** 测试时间
    let endDatetime = moment(data.endTime).format('YYYY M D H m s').split(' ');
    endDatetime = new Date(endDatetime[0], endDatetime[1] - 1, endDatetime[2], endDatetime[3], endDatetime[4], endDatetime[5]);
    // 查询教室信息
    let classroom = await ClassroomModel.findOne({ where: { classroom_id: data.classroomId } });
    if (!classroom) return ctx.dataError(null, '教室ID错误');
    if (!classroom.classroom_available) return ctx.dataError(null, '当前教室不可用');
    let userData = await UserModel.findOne({ where: { user_id: user.user_id } });
    if (userData.user_inApply) return ctx.dataError(null, '已有申请或使用中教室');
    // 开始申请流程 更新用户申请状态
    let userUpdateResult = await UserModel.update({
        user_inApply: true,
    }, {
        where: {
            user_id: user.user_id,
        }
    });
    if (!userUpdateResult[0]) return ctx.error(null, '教室使用申请错误');
    // 判断申请是否需要审核
    let classroomRecordUUID = crypto.randomUUID();
    if (classroom.classroom_authority) {
        await ClassroomRecordModel.create({
            classroomRecord_uuid: classroomRecordUUID,
            classroomRecord_user: user.user_id,
            classroomRecord_classroom: data.classroomId,
            classroomRecord_start: data.startTime,
            classroomRecord_end: data.endTime,
            classroomRecord_status: false,
            classroomRecord_pass: false,
            classroomRecord_finish: false,
        });
        // 超时未审核 自动拒绝计划任务
        schedule.scheduleJob(`${user.user_uuid}_auto`, endDatetime, async () => {
            let record = await ClassroomRecordModel.findOne({
                where: {
                    classroomRecord_uuid: classroomRecordUUID,
                }
            });
            if (!record.classroomRecord_status) {
                await sequelize.transaction(async (t) => {
                    await ClassroomRecordModel.update({
                        classroomRecord_status: true,
                        classroomRecord_pass: false,
                        classroomRecord_finish: true,
                    }, {
                        where: {
                            classroomRecord_id: record.classroomRecord_id,
                        }
                    });
                    await UserModel.update({
                        user_inApply: false,
                    }, {
                        where: {
                            user_id: user.user_id,
                        }
                    });
                });
                return;
            }
            return;
        });
        return ctx.success(null, '申请成功，等待审核');
    }
    // 无需审核
    // 创建申请记录 更新教室状态
    await sequelize.transaction(async (t) => {
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
        await ClassroomModel.update({
            classroom_available: false,
        }, {
            where: {
                classroom_id: data.classroomId,
            }
        });
    });
    // 创建计划任务
    // 结束时间更新教室状态 
    // 更新用户申请状态
    // 更新申请记录表信息
    schedule.scheduleJob(user.user_uuid, endDatetime, async () => {
        await sequelize.transaction(async (t) => {
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
        })
    });
    ctx.success(null, '教室使用申请成功');
}

// 提前退还
async function Refunds(ctx) {
    let user = ctx.state.user;
    if (user.user_authority === undefined) return ctx.unauthorized();
    let data = ctx.query;
    let classroomRecordId = data.classroomRecordId;
    if (!classroomRecordId) return ctx.dataError(null, '申请记录ID错误');
    let record = await ClassroomRecordModel.findOne({
        where: {
            classroomRecord_id: classroomRecordId,
        }
    });
    if (!record) return ctx.dataError(null, '未查询到申请记录');
    let userScheduleJob = schedule.scheduledJobs[user.user_uuid];
    if (userScheduleJob == undefined) {
        await sequelize.transaction(async (t) => {
            await ClassroomModel.update({
                classroom_available: true,
            }, {
                where: {
                    classroom_id: record.classroomRecord_classroom,
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
                    classroomRecord_id: classroomRecordId,
                }
            });
        });
    } else {
        // 执行退还操作
        userScheduleJob.job();
        // 取消计划任务
        userScheduleJob.cancel();
    }
    // 更新结束时间
    await ClassroomRecordModel.update({
        classroomRecord_end: moment(),
    }, {
        where: {
            classroomRecord_id: classroomRecordId,
        }
    });
    ctx.success(null, '教室退还成功');
}

// 删除教室
async function Delete(ctx) {
    let admin = ctx.state.user;
    if (!admin.admin_authority) return ctx.unauthorized();
    let data = ctx.query;
    let classroom = await ClassroomModel.findOne({
        where: {
            classroom_id: data.classroomId,
        }
    });
    if (!classroom.classroom_available) return ctx.dataError(null, '教室使用中，请稍后操作');
    await sequelize.transaction(async (t) => {
        await ClassroomModel.destroy({
            where: {
                classroom_id: data.classroomId,
            }
        });
    });
    ctx.success(null, '教室信息删除成功');
}

// 详细信息
async function Detail(ctx) {
    let admin = ctx.state.user;
    if (!admin.admin_authority) return ctx.unauthorized();
    let data = ctx.query;
    let classroomDetail = await ClassroomModel.findOne({
        include: [
            {
                attributes: ['classroomArea_name'],
                model: ClassroomAreaModel,
            },
            {
                attributes: ['classroomType_name'],
                model: ClassroomTypeModel,
            }
        ],
        where: {
            classroom_id: data.id,
        }
    });
    if (!classroomDetail) return ctx.dataError(null, '未查询到教室');
    classroomDetail = {
        number: classroomDetail.classroom_number,
        area: classroomDetail.classroomArea.classroomArea_name,
        type: classroomDetail.classroomType.classroomType_name,
        capacity: classroomDetail.classroom_capacity,
        authority: classroomDetail.classroom_authority,
        available: classroomDetail.classroom_available,
    }
    return ctx.success(null, classroomDetail);
}


module.exports = { QueryList, Add, Update, Apply, Refunds, Delete, Detail }