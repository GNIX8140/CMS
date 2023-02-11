const UserModel = require('../model/user');
const ClassroomModel = require('../model/classroom');
const ClassroomRecordModel = require('../model/classroomRecord');
const moment = require('moment');
const sequelize = require('../database/mysql');
const redis = require('../database/redis');
const { Op } = require('sequelize');

// 处理综合数据
async function HandleDashboardData() {
    try {
        let TodayDate = moment().format('YYYY-MM-DD 00:00:00');
        let userList = await UserModel.findAll();
        let classroomList = await ClassroomModel.findAll();
        let classroomRecordList = await ClassroomRecordModel.findAll({
            where: {
                createdAt: {
                    [Op.between]: [TodayDate, moment().format('YYYY-MM-DD HH:mm:ss')],
                }
            }
        });
        let userData = {
            total: userList.length,
            active: 0,
            inApply: 0,
        }
        let classroomData = {
            total: classroomList.length,
            inUse: 0,
            available: 0,
        };
        let classroomRecordData = {
            today: classroomRecordList.length,
            waitApproval: 0,
            alreadyApproval: 0,
        };
        userList.forEach(item => {
            let isActive = moment(item.updatedAt).isAfter(TodayDate)
            if (isActive) {
                userData.active += 1;
            }
            if (isActive && item.user_inApply) {
                userData.inApply += 1;
            }
        });
        classroomList.forEach(item => {
            if (item.classroom_available) {
                classroomData.available += 1;
            } else {
                classroomData.inUse += 1;
            }
        });
        classroomRecordList.forEach(item => {
            if (item.classroomRecord_status) {
                classroomRecordData.alreadyApproval += 1;
            } else {
                classroomRecordData.waitApproval += 1;
            }
        });
        redis.set('cms_dashboard_user', JSON.stringify(userData));
        redis.set('cms_dashboard_classroom', JSON.stringify(classroomData));
        redis.set('cms_dashboard_record', JSON.stringify(classroomRecordData));
        return;
    } catch (err) {
        console.log(err);
        return;
    }
}

// 数据面板查询
async function Query(ctx) {
    let userData = JSON.parse(await redis.get('cms_dashboard_user'));
    let classroomData = JSON.parse(await redis.get('cms_dashboard_classroom'));
    let classroomRecordData = JSON.parse(await redis.get('cms_dashboard_record'));
    return ctx.success(null, {
        user: userData,
        classroom: classroomData,
        record: classroomRecordData,
    });
}

module.exports = { HandleDashboardData, Query };