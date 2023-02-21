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
        let todayStart = moment().format('YYYY-MM-DD 00:00:00');
        let data = {
            time: moment().format('YYYY-MM-DD HH:mm:ss'),
            user: {
                inActive: 0,
                unActive: 0,
                inUse: 0,
                unUse: 0,
            },
            classroom: {
                inUse: 0,
                inApproval: 0,
                unUse: 0,
            },
            record: {
                date: [],
                value: [0, 0, 0, 0, 0, 0, 0],
            },
            topUse: {
                classroom: [],
                value: [],
            }
        }
        // data.user
        var { count, rows } = await UserModel.findAndCountAll();
        rows.forEach(item => {
            let updatedAt = moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss');
            if (moment(updatedAt).isAfter(todayStart)) data.user.inActive++;
            if (item.user_inApply) data.user.inUse++;
        });
        data.user.unActive = count - data.user.inActive;
        data.user.unUse = count - data.user.inUse;
        // data.classroom
        var { count, rows } = await ClassroomModel.findAndCountAll();
        rows.forEach(item => {
            if (item.classroom_available) data.classroom.unUse++;
        });
        data.classroom.inUse = count - data.classroom.unUse;
        // data.classroom.inApproval
        var { count, rows } = await ClassroomRecordModel.findAndCountAll({
            include: [
                {
                    attributes: ['classroom_number'],
                    model: ClassroomModel,
                }
            ],
            where: {
                createdAt: {
                    [Op.between]: [todayStart, moment().format('YYYY-MM-DD HH:mm:ss')],
                }
            }
        });
        let number = [], value = [];
        rows.forEach(item => {
            if (!item.classroomRecord_status) data.classroom.inApproval++;
            let index = number.indexOf(item.classroom.classroom_number);
            if (index == -1) {
                number.push(item.classroom.classroom_number);
                value.push(1);
            } else {
                value[index]++;
            }
        });
        data.topUse.classroom = number;
        data.topUse.value = value;
        // data.record
        for (let i = 6; i >= 0; i--) {
            let date, dateStart, dateEnd;
            if (i == 0) {
                date = moment().format('YYYY-MM-DD');
                dateStart = moment().format('YYYY-MM-DD 00:00:00');
                dateEnd = moment().format('YYYY-MM-DD 23:59:59');
            } else {
                date = moment().subtract(i, 'days').format('YYYY-MM-DD');
                dateStart = moment().subtract(i, 'days').format('YYYY-MM-DD 00:00:00');
                dateEnd = moment().subtract(i, 'days').format('YYYY-MM-DD 23:59:59');
            }
            var { count, rows } = await ClassroomRecordModel.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.between]: [dateStart, dateEnd],
                    }
                }
            });
            data.record.date[i] = date;
            data.record.value[i] = count;
        }
        data.record.date.reverse();
        data.record.value.reverse();
        redis.set('cms_dashboard_data', JSON.stringify(data));
        return;
    } catch (err) {
        console.log(err);
        return;
    }
}

// 数据面板查询
async function Query(ctx) {
    let data = JSON.parse(await redis.get('cms_dashboard_data'));
    return ctx.success(null, data);
}

module.exports = { HandleDashboardData, Query };