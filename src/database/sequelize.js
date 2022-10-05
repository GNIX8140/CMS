"use strict"
const { Sequelize } = require('sequelize');
const mysql = new Sequelize('ccms', 'CCMS', 'Zxc1290754123', {
    dialect: 'mysql',
    host: 'localhost',
    timezone: '+08:00',
    pool: {
        max: 5,
        min: 0,
        qcquire: 30000,
        idle: 10000,
        logging: false
    }
});
module.exports = mysql;