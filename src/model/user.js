// Sequelize DataTypes 数据模型
const { DataTypes, CHAR } = require('sequelize');
// 数据库
const sequelize = require('../database/mysql');
// 用户 数据模型
const UserModel = sequelize.define('user', {
    // 用户表ID值
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // UUID
    user_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    // 用户编号
    user_number: {
        type: DataTypes.CHAR,
        allowNull: false,
        unique: true,
    },
    // 用户邮箱地址
    user_email: {
        type: DataTypes.STRING,
        unique: true,
    },
    // 用户登陆密码
    user_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // 用户真实姓名
    user_name: {
        type: DataTypes.CHAR,
    },
    // 用户所属学院
    user_stitute: {
        type: DataTypes.INTEGER,
    },
    // 用户权限等级 (0: 学生; 1: 教师; 2: 组织管理人员; 3: 其他)
    user_authority: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    user_inApply: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    // 用户头像链接
    // user_portrait: {
    //     type: DataTypes.STRING,
    // }
}, {
    // 用户表名称
    tableName: 'cms_user',
    // Sequelize 时间戳
    timestamps: true,
});
module.exports = UserModel;