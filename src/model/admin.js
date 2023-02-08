// Sequelize DataTypes 数据模型
const { DataTypes, CHAR } = require('sequelize');
// 数据库
const sequelize = require('../database/mysql');
// 管理员 数据模型
const AdminModel = sequelize.define('admin', {
    // 管理员表ID值
    admin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // 管理员用户名
    admin_username: {
        type: DataTypes.CHAR,
        allowNull: false,
        unique: true,
    },
    // 管理员姓名
    admin_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // 管理员密码
    admin_password: {
        type: DataTypes.CHAR,
    },
    // 管理员权限等级
    admin_authority: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'cms_admin',
    timestamps: true,
});
module.exports = AdminModel;