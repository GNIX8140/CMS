"use strict";
// 引入node-schedule
const schedule = require('node-schedule');
// sequelize
const sequelize = require('../database/mysql');
// 数据模型
const UserModel = require('../model/user');
const AdminModel = require('../model/admin');
const ClassroomModel = require('../model/classroom');
const ClassroomRecordModel = require('../model/classroom_record');
// Redis
const Redis = require('../database/redis');
// Crypto
const crypto = require('crypto');
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
    await UserModel.sync({ force: true });
    await AdminModel.sync({ force: true });
    await ClassroomModel.sync({ force: true });
    await ClassroomRecordModel.sync({ force: true });
    await UserModel.create({
        user_uuid: crypto.randomUUID(),
        user_number: '123',
        user_email: '123@123.com',
        user_password: '123',
        user_name: 'name',
        user_stitute: 'stitute',
        user_authority: 0,
        user_inApply: false,
    });
    await AdminModel.create({
        admin_uuid: crypto.randomUUID(),
        admin_username: 'admin',
        admin_name: 'admin',
        admin_password: 'admin',
        admin_authority: 10,
    });
    await ClassroomModel.create({
        classroom_uuid: crypto.randomUUID(),
        classroom_area: 0,
        classroom_number: 'A001',
        classroom_type: 0,
        classroom_capacity: 30,
        classroom_authority: false,
        classroom_available: true,
    })
    return '数据模型同步-重建';
}
// 数据模型同步-更新
async function dataModelSyncAlert() {
    await UserModel.sync({ alert: true, });
    await AdminModel.sync({ alert: true, });
    await ClassroomModel.sync({ alert: true, });
    await ClassroomRecordModel.sync({ alter: true });
    return '数据模型同步-更新';
}
// 计划任务启动
async function start() {
    try {
        console.log(await mysqlConnectTest());
        console.log(await redisConnectTest());
        console.log(await dataModelSyncForce());
        console.log(await dataModelSyncAlert());
        console.log('服务初始化-完成');
        return true;
    } catch (err) {
        console.log(err);
        throw Error('服务初始化-错误');
    }
}
module.exports = { start }