const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql');
const ClassroomAreaModel = sequelize.define('classroomArea', {
    classroomArea_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    classroomArea_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "cms_classroomArea",
    timestamps: true,
    paranoid: true,
});

module.exports = ClassroomAreaModel;