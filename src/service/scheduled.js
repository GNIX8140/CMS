"use strict";
// 计划任务启动
async function start() {
    try {
        return true
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = { start }