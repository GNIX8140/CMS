// Sequelize DataTypes 数据模型
const { DataTypes, CHAR } = require('sequelize');
// 数据库
const sequelize = require('../database/mysql');
// 教室信息 数据模型
const ClassroomModel = sequelize.define('classroom', {
    // 教室信息表ID值
    classroom_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // 教室所属区域
    classroom_area: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // 教室编号
    classroom_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    // 教室类型
    classroom_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // 教室可容纳人数
    classroom_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // 教室申请权限
    classroom_authority: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // 教室使用状态
    classroom_status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    // 教室信息表名称
    tableName: 'cms_classroom',
    // Sequelize 时间戳
    timestamps: true,
    paranoid: true
});
module.exports = ClassroomModel;