"use strict";
// 引入node-schedule
const schedule = require('node-schedule');
// sequelize
const sequelize = require('../database/mysql');
const { Op } = require('sequelize')
// 数据模型
const UserModel = require('../model/user');
const AdminModel = require('../model/admin');
const ClassroomModel = require('../model/classroom');
const ClassroomRecordModel = require('../model/classroomRecord');
const ClassroomAreaModel = require('../model/classroomArea');
const ClassroomTypeModel = require('../model/classroomType');
const StituteModel = require('../model/stitute')
const Associations = require('../model/associations');
const InitData = require('../model/data');
// Redis
const Redis = require('../database/redis');
// Dashboard
const Dashboard = require('../controller/dashboard');
// Moment
const moment = require('moment');
// MySQL连接测试
async function mysqlConnectTest() {
    await sequelize.authenticate();
    return 'MySQL连接测试完成';
}
// Redis连接测试
async function redisConnectTest() {
    if (Redis.isReady) return 'Redis连接测试完成';
    else throw Error('Redis连接错误');
}
// 数据模型同步-重建
async function dataModelSyncForce() {
    await sequelize.query('SET foreign_key_checks = 0;');
    await UserModel.sync({ force: true });
    await AdminModel.sync({ force: true });
    await ClassroomModel.sync({ force: true });
    await ClassroomRecordModel.sync({ force: true });
    await ClassroomAreaModel.sync({ force: true });
    await ClassroomTypeModel.sync({ force: true });
    await StituteModel.sync({ force: true });
    await sequelize.query('SET foreign_key_checks = 1;');
    await Associations();
    await InitData();
    return '数据模型同步-重建';
}
// 数据模型同步-更新
async function dataModelSyncAlert() {
    await UserModel.sync({ alert: true, });
    await AdminModel.sync({ alert: true, });
    await ClassroomModel.sync({ alert: true, });
    await ClassroomRecordModel.sync({ alter: true });
    await ClassroomAreaModel.sync({ alert: true });
    await ClassroomTypeModel.sync({ alert: true });
    await StituteModel.sync({ alter: true });
    await Associations();
    return '数据模型同步-更新';
}
// 定时查询数据库任务
async function scheduleQueryDatabase() {
    schedule.scheduleJob('cms_dashboard_data', '0 * * * * *', () => {
        Dashboard.HandleDashboardData();
    });
    return '数据面板定时任务-启动';
}
// 处理ClassroomRecord计划任务
async function handleClassroomRecordSchduled() {
    // 未归还教室申请记录
    let recordList = await ClassroomRecordModel.findAll({
        where: {
            [Op.and]: [
                {
                    updatedAt: {
                        [Op.between]: [moment().subtract(12, 'hours'), moment()],
                    }
                },
                {
                    classroomRecord_finish: false,
                }
            ]
        },
        include: [
            {
                attributes: ['user_id', 'user_uuid'],
                model: UserModel,
            },
            {
                attributes: ['classroom_id'],
                model: ClassroomModel,
            }
        ]
    });
    recordList.forEach(async item => {
        // // 超过结束时间
        // if (moment(item.classroomRecord_end).isBefore(moment())) {
        //     await sequelize.transaction(async (t) => {
        //         let update = {};
        //         // 已审核过
        //         if (item.classroomRecord_status) {
        //             update.classroomRecord_finish = true;
        //         } else { // 未审核过
        //             update.classroomRecord_status = true;
        //             update.classroomRecord_pass = false;
        //             update.classroomRecord_finish = true;
        //         }
        //         await ClassroomRecordModel.update(update, {
        //             where: {
        //                 classroomRecord_id: item.classroomRecord_id,
        //             }
        //         });
        //     });
        //     return;
        // }
        // 未超过结束时间
        let scheduleEndTime = moment(item.classroomRecord_end).format('YYYY M D H m s').split(' ');
        let endDatetime = new Date(scheduleEndTime[0], scheduleEndTime[1] - 1, scheduleEndTime[2], scheduleEndTime[3], scheduleEndTime[4], scheduleEndTime[5]);
        if (item.classroomRecord_status) { //已审核
            // 定时任务 归还教室 更新用户申请状态 审核记录结束
            schedule.scheduleJob(item.user.user_uuid, endDatetime, async () => {
                await sequelize.transaction(async (t) => {
                    await ClassroomModel.update({
                        classroom_available: true,
                    }, {
                        where: {
                            classroom_id: item.classroom.classroom_id,
                        }
                    });
                    await UserModel.update({
                        user_inApply: false,
                    }, {
                        where: {
                            user_id: item.user.user_id,
                        }
                    });
                    await ClassroomRecordModel.update({
                        classroomRecord_finish: true,
                    }, {
                        where: {
                            classroomRecord_id: item.classroomRecord_id,
                        }
                    });
                });
            });
        } else {
            // 定时任务 更新用户申请状态 结束审核记录
            schedule.scheduleJob(`${item.user.user_uuid}_auto`, endDatetime, async () => {
                await sequelize.transaction(async (t) => {
                    await UserModel.update({
                        user_inApply: false,
                    }, {
                        where: {
                            user_id: item.user.user_id,
                        }
                    });
                    await ClassroomRecordModel.update({
                        classroomRecord_status: true,
                        classroomRecord_pass: false,
                        classroomRecord_finish: true,
                    }, {
                        where: {
                            classroomRecord_id: item.classroomRecord_id,
                        }
                    });
                });
            });
        }
    });
    return '申请记录复核-完成'
}
// 计划任务启动
async function start(recreate) {
    try {
        console.log(await mysqlConnectTest());
        console.log(await redisConnectTest());
        if (recreate) {
            console.log(await dataModelSyncForce());
        }
        console.log(await dataModelSyncAlert());
        console.log(await scheduleQueryDatabase());
        console.log(await handleClassroomRecordSchduled());
        Dashboard.HandleDashboardData();
        console.log('服务初始化-完成');
        return true;
    } catch (err) {
        console.log(err);
        throw Error('服务初始化-错误');
    }
}
module.exports = { start }