"use strict";
// 引入node-schedule
const schedule = require('node-schedule');
// sequelize
const sequelize = require('../database/mysql');
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
        Dashboard.HandleDashboardData();
        console.log('服务初始化-完成');
        return true;
    } catch (err) {
        console.log(err);
        throw Error('服务初始化-错误');
    }
}
module.exports = { start }