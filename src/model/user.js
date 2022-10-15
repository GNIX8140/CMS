// Sequelize DataTypes 数据模型
const { DataTypes, CHAR } = require('sequelize');
// 数据库
const sequelize = require('../database/sequelize');
// 用户 数据模型
const UserModel = sequelize.define('user', {
    // 用户表ID值
    user_id: {
        type: DataTypes.INTEGER(20),
        autoIncrement: true,
        primaryKey: true,
    },
    // 用户编号
    user_number: {
        type: DataTypes.CHAR(20),
        allowNull: false,
    },
    // 用户邮箱地址
    user_email: {
        type: DataTypes.STRING(50),
    },
    // 用户登陆密码
    user_password: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    // 用户真实姓名
    user_name: {
        type: DataTypes.CHAR(10)
    },
    // 用户所属学院
    user_stitute: {
        type: DataTypes.CHAR(20),
    },
    // 用户权限等级
    user_authority: {
        type: DataTypes.INTEGER(4),
    },
    // 用户头像链接
    user_portrait: {
        type: DataTypes.STRING,
    }
}, {
    // 用户表名称
    tableName: 'cms_user',
    // Sequelize 时间戳
    timestamps: true,
});
module.exports = UserModel;