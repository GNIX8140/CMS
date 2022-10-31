// Sequelize DataTypes 数据模型
const { DataTypes, CHAR } = require('sequelize');
// 数据库
const sequelize = require('../database/sequelize');
// 教室区域 数据模型
const AreaModel = sequelize.define('area', {
    // 教室区域表ID值
    area_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // 教室区域名称
    area_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    // 教室区域状态
    area_status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // 教室区域所属学院
    area_stitute: {
        type: DataTypes.CHAR,
        allowNull: false,
    }
}, {
    tableName: 'cms_area',
    timestamps: true
});
module.exports = AreaModel;