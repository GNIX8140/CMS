// Sequelize DataTypes 数据模型
const { DataTypes, CHAR } = require('sequelize');
// 数据库
const sequelize = require('../database/mysql');
// 教室类型 数据模型
const ClassroomTypeModel = sequelize.define('classroomType', {
    // 教室类型表ID值
    classroomType_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // 教室类型名称
    classroomType_name: {
        type: DataTypes.CHAR,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'cms_classroomType',
    timestamps: true,
});
module.exports = ClassroomTypeModel;