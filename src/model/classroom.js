// Sequelize DataTypes 数据模型
const { DataTypes, CHAR } = require('sequelize');
// 数据库
const sequelize = require('../database/sequelize');
// 教室信息 数据模型
const ClassroomModel = sequelize.define('classroom', {
    // 教室信息表ID值
    classroom_id: {
        type: DataTypes.INTEGER(20),
        autoIncrement: true,
        primaryKey: true,
    },
    // 教室所属区域
    classroom_area: {
        type: DataTypes.CHAR(10),
        allowNull: false,
    },
    // 教室编号
    classroom_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    // 教室类型
    classroom_type: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    // 教室可容纳人数
    classroom_capacity: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
    },
    // 教室申请权限
    classroom_authority: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
    },
    // 教室使用状态
    classroom_status: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
}, {
    // 教室信息表名称
    tableName: 'cms_classroom',
    // Sequelize 时间戳
    timestamps: true
});
module.exports = ClassroomModel;