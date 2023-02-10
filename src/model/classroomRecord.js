const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql');
const ClassroomRecordModel = sequelize.define('classroomRecord', {
    // 申请记录表ID
    classroomRecord_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // UUID
    classroomRecord_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    // 申请用户ID
    classroomRecord_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // 申请教室ID
    classroomRecord_classroom: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // 开始时间
    classroomRecord_start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    // 结束时间
    classroomRecord_end: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    // 审核状态
    classroomRecord_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    // 通过状态
    classroomRecord_pass: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    // 完成状态
    classroomRecord_finish: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    // 表名
    tableName: 'cms_classroomRecord',
    // 时间戳
    timestamps: true,
    // 软删除
    paranoid: true,
});
module.exports = ClassroomRecordModel;