"use strict"
// response数据格式
module.exports = async (ctx, next) => {
    ctx.success = (message, data) => {
        ctx.body = {
            status: 200,
            message: message,
            data: data
        }
    }
    ctx.error = (message, detail) => {
        console.log(message, detail);
        ctx.body = {
            status: 500,
            message: message
        }
    }
    ctx.infoError = (message, detail) => {
        ctx.body = {
            status: 404,
            message: message,
            detail: detail
        }
    }
    await next();
}