const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql');

const ClassroomTypeModel = sequelize.define('classroomType', {
    classroomType_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    classroomType_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    classroomType_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'cms_classroomType',
    timestamps: true,
    paranoid: true,
});
module.exports = ClassroomTypeModel;