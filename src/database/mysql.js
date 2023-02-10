"use strict"
const { Sequelize } = require('sequelize');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('transaction');
Sequelize.useCLS(namespace);
const mysql = new Sequelize('cms', 'cms', 'Zxc1290754123', {
    dialect: 'mysql',
    host: 'localhost',
    timezone: '+08:00',
    pool: {
        max: 5,
        min: 0,
        qcquire: 30000,
        idle: 10000,
    },
    logging: false,
});
module.exports = mysql;