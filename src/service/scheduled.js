"use strict";
// 引入node-schedule
const schedule = require('node-schedule');
// sequelize
const sequelize = require('../database/sequelize');
// 数据模型
const AdminModel = require('../model/admin');
const AreaModel = require('../model/area');
const ClassroomModel = require('../model/classroom');
const ClassroomTypeModel = require('../model/classroomType');
const UserModel = require('../model/user');
// 数据库服务连接测试
async function databaseConnectTest() {
    await sequelize.authenticate();
    return true;
}
// 数据模型同步-重建
async function dataModelSyncForce() {
    await AdminModel.sync({ force: true });
    await AreaModel.sync({ force: true });
    await ClassroomModel.sync({ force: true });
    await ClassroomTypeModel.sync({ force: true });
    await UserModel.sync({ force: true });
    return true;
}
// 数据模型同步-更新字段
async function dataModelSyncAlert() {
    await AdminModel.sync({ alert: true, });
    await AreaModel.sync({ alert: true, });
    await ClassroomModel.sync({ alert: true, });
    await ClassroomTypeModel.sync({ alert: true, });
    await UserModel.sync({ alert: true, });
    return true;
}
// 计划任务启动
async function start() {
    try {
        // 数据库连接测试
        console.log("计划任务-数据库连接测试");
        await databaseConnectTest();
        // 数据模型同步
        console.log("计划任务-数据模型同步");
        await dataModelSyncForce();
        // await dataModelSyncAlert();
        return true
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = { start }