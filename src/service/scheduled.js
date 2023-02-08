"use strict";
// 引入node-schedule
const schedule = require('node-schedule');
// sequelize
const sequelize = require('../database/mysql');
// 数据模型
const AdminModel = require('../model/admin');
const ClassroomModel = require('../model/classroom');
const UserModel = require('../model/user');
// Redis
const Redis = require('../database/redis');
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
    await sequelize.query("SET foreign_key_checks = 0");
    await AdminModel.sync({ force: true });
    await ClassroomModel.sync({ force: true });
    await UserModel.sync({ force: true });
    await sequelize.query("SET foreign_key_checks = 1");
    await UserModel.create({
        user_number: '190201139',
        user_email: '1290754123@qq.com',
        user_password: 'Zxc1290754123',
        user_name: '邢文浩',
        user_stitute: '信息工程学院',
        user_authority: 0,
    });
    await AdminModel.create({
        admin_username: '190201139',
        admin_name: '邢文浩',
        admin_password: 'Zxc1290754123',
        admin_authority: 10,
    });
    return '数据模型同步-重建';
}
// 数据模型同步-更新
async function dataModelSyncAlert() {
    await AdminModel.sync({ alert: true, });
    await ClassroomModel.sync({ alert: true, });
    await UserModel.sync({ alert: true, });
    return '数据模型同步-更新';
}
// 计划任务启动
async function start() {
    try {
        console.log(await mysqlConnectTest());
        console.log(await redisConnectTest());
        // console.log(await dataModelSyncForce());
        console.log(await dataModelSyncAlert());
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = { start }