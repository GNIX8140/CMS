const ClassroomModel = require('../model/classroom');
const ClassroomRecordModel = require('../model/classroomRecord');
const { Op } = require('sequelize');
const sequelize = require('../database/mysql');
const schedule = require('node-schedule');
const moment = require('moment');
const UserModel = require('../model/user');

// 审批流程
async function Approval(ctx) {
    let adminAuthority = ctx.state.user.admin_authority;
    if (!adminAuthority) return ctx.unauthorized();
    let data = ctx.request.body;
    if (data.classroomRecordId === undefined
        || data.agree === undefined) return ctx.dataError();
    let record = await ClassroomRecordModel.findOne({
        include: [
            {
                attributes: ['user_id', 'user_uuid'],
                model: UserModel,
            }
        ],
        where: {
            classroomRecord_id: data.classroomRecordId,
        }
    });
    if (!record) return ctx.dataError(null, '审批ID错误');
    if (record.classroomRecord_finish) return ctx.dataError(null, '审批ID错误，已完成');
    // 审批流程开始
    // 拒绝申请
    if (!data.agree) {
        await ClassroomRecordModel.update({
            classroomRecord_status: true,
            classroomRecord_pass: false,
            classroomRecord_finish: true,
        }, {
            where: {
                classroomRecord_id: record.classroomRecord_id
            },
        });
        await UserModel.update({
            user_inApply: false,
        }, {
            where: {
                user_id: record.classroomRecord_user,
            }
        });
        schedule.scheduledJobs[`${record.user.user_uuid}_auto`].cancel();
        return ctx.success(null, '审批拒绝成功');
    }
    // 批准申请
    // 教室是否可用
    let classroom = await ClassroomModel.findOne({ where: { classroom_id: record.classroomRecord_classroom } });
    if (!classroom.classroom_available) return ctx.dataError(null, '教室使用中');
    await sequelize.transaction(async (t) => {
        // 更新审批完成&&通过状态
        await ClassroomRecordModel.update({
            classroomRecord_status: true,
            classroomRecord_pass: true,
        }, {
            where: {
                classroomRecord_id: record.classroomRecord_id,
            }
        });
        // 更新教室可用状态
        await ClassroomModel.update({
            classroom_available: false,
        }, {
            where: {
                classroom_id: record.classroomRecord_classroom,
            }
        });
        // 确认更新用户状态
        await UserModel.update({
            user_inApply: true,
        }, {
            where: {
                user_id: record.user.user_id
            }
        })
    });
    // 设置更新教室可用状态定时器
    let user_uuid = await UserModel.findOne({
        where: {
            user_id: record.classroomRecord_user,
        }
    }).then(user => {
        return user.user_uuid;
    });
    if (!user_uuid) return ctx.dataError(null, '教室审批错误，未查询到用户UUID');
    let scheduleEndTime = moment(record.classroomRecord_end).format('YYYY M D H m s').split(' ');
    endDatetime = new Date(scheduleEndTime[0], scheduleEndTime[1] - 1, scheduleEndTime[2], scheduleEndTime[3], scheduleEndTime[4], scheduleEndTime[5]);
    schedule.scheduleJob(user_uuid, endDatetime, async () => {
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
                    user_id: record.classroomRecord_user,
                }
            });
            await ClassroomRecordModel.update({
                classroomRecord_finish: true,
            }, {
                where: {
                    classroomRecord_id: record.classroomRecord_id,
                }
            });
        });
        return;
    });
    if (schedule.scheduledJobs[`${user_uuid}_auto`]) schedule.scheduledJobs[`${user_uuid}_auto`].cancel();
    // 其他相同教室待审核->拒绝&&结束
    let classroomApprovalList = await ClassroomRecordModel.findAll({
        where: {
            [Op.and]: [
                { classroomRecord_classroom: record.classroomRecord_classroom },
                { classroomRecord_status: false },
            ]
        },
        include: [
            {
                attributes: ['user_id', 'user_uuid'],
                model: UserModel,
            }
        ],
    });
    if (classroomApprovalList.length == 0) return ctx.success(null, '审批通过成功');
    classroomApprovalList.forEach(async (item) => {
        // 关闭申请记录
        await ClassroomRecordModel.update({
            classroomRecord_status: true,
            classroomRecord_pass: false,
            classroomRecord_finish: true,
        }, {
            where: {
                classroomRecord_id: item.classroomRecord_id,
            }
        });
        // 更新用户申请状态
        if (schedule.scheduledJobs[`${item.user.user_uuid}_auto`]) schedule.scheduledJobs[`${item.user.user_uuid}_auto`].cancel();
        await UserModel.update({
            user_inApply: false,
        }, {
            where: {
                user_id: item.user.user_id,
            }
        });
    });
    return ctx.success(null, '审批通过成功');
}

// 查询审批列表
async function QueryList(ctx) {
    let admin = ctx.state.user;
    if (!admin.admin_authority) return ctx.unauthorized();
    let data = ctx.query;
    let page = parseInt(data.page), length = parseInt(data.length);
    let offset = (page - 1) * length;
    let where = {};
    if (data.complete) where.classroomRecord_status = parseInt(data.complete);
    let { count, rows } = await ClassroomRecordModel.findAndCountAll({
        where: where,
        order: [
            ['classroomRecord_id', 'DESC']
        ],
        include: [
            {
                attributes: ['user_name', 'user_id'],
                model: UserModel,
            },
            {
                attributes: ['classroom_number', 'classroom_id'],
                model: ClassroomModel,
                paranoid: false,
            }
        ],
        offset: offset,
        limit: length,
    });
    let items = [];
    rows.forEach(item => {
        items.push({
            id: item.classroomRecord_id,
            uuid: item.classroomRecord_uuid,
            userId: item.user.user_id,
            user: item.user.user_name,
            classroomId: item.classroom.classroom_id,
            classroom: item.classroom.classroom_number,
            start: moment(item.classroomRecord_start).format('YYYY-MM-DD HH:mm:ss'),
            end: moment(item.classroomRecord_end).format('YYYY-MM-DD HH:mm:ss'),
            status: item.classroomRecord_status,
            pass: item.classroomRecord_pass,
            finish: item.classroomRecord_finish,
            date: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        });
    });
    let nextItem = await ClassroomRecordModel.findOne({
        where: where,
        offset: page * length,
    });
    ctx.success(null, {
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

// 用户查询
async function UserQuery(ctx) {
    let user = ctx.state.user;
    if (user.user_authority === undefined) return ctx.unauthorized();
    let data = ctx.query;
    let page = parseInt(data.page), length = parseInt(data.length);
    let offset = (page - 1) * length;
    let where = {};
    where.classroomRecord_user = user.user_id;
    let complete = parseInt(data.complete);
    if (complete == 0 || complete == 1) where.classroomRecord_status = complete;
    if (complete == 2) {
        where.classroomRecord_status = true;
        where.classroomRecord_pass = true;
        where.classroomRecord_finish = false;
    }
    let { count, rows } = await ClassroomRecordModel.findAndCountAll({
        include: [
            {
                attributes: ['classroom_number'],
                model: ClassroomModel,
                paranoid: false
            },
        ],
        order: [
            ['classroomRecord_id', 'DESC']
        ],
        where: where,
        offset: offset,
        limit: length,
    });
    let items = [];
    rows.forEach(item => {
        items.push({
            id: item.classroomRecord_id,
            uuid: item.classroomRecord_uuid,
            classroom: item.classroom.classroom_number,
            start: moment(item.classroomRecord_start).format('YYYY-MM-DD HH:mm:ss'),
            end: moment(item.classroomRecord_end).format('YYYY-MM-DD HH:mm:ss'),
            status: item.classroomRecord_status,
            pass: item.classroomRecord_pass,
            finish: item.classroomRecord_finish,
            date: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        })
    });
    let nextItem = await ClassroomRecordModel.findOne({
        where: where,
        offset: page * length,
    });
    ctx.success(null, {
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

// 取消申请
async function CancelApply(ctx) {
    let user = ctx.state.user;
    let data = ctx.query;
    if (user.user_authority === undefined) return ctx.unauthorized();
    let classroomRecordId = parseInt(data.classroomRecordId);
    let record = await ClassroomRecordModel.findOne({
        where: {
            classroomRecord_id: classroomRecordId,
        }
    });
    if (!record) return ctx.dataError(null, '申请记录ID错误');
    if (record.classroomRecord_status) return ctx.dataError(null, '无法取消，审核已通过或已取消');
    await sequelize.transaction(async (t) => {
        await ClassroomRecordModel.update({
            classroomRecord_status: true,
            classroomRecord_pass: false,
            classroomRecord_finish: true,
        }, {
            where: {
                classroomRecord_id: classroomRecordId,
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
    let scheduleJob = schedule.scheduledJobs[`${user.user_uuid}_auto`];
    if (scheduleJob == undefined) {
        let record = await ClassroomRecordModel.findOne({
            where: {
                classroomRecord_id: classroomRecordId,
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
        }
        return ctx.success(null, '取消申请成功');
    } else {
        scheduleJob.cancel();
        return ctx.success(null, '取消申请成功');
    }
}

module.exports = { Approval, QueryList, UserQuery, CancelApply };