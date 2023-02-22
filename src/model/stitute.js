const {DataTypes}  = require('sequelize');
const sequelize = require('../database/mysql');
const StituteModel = sequelize.define('stitute', {
    stitute_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    stitute_name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'cms_stitute',
    timestamps: true,
});
module.exports = StituteModel;