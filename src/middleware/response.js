"use strict"
// response数据格式
module.exports = async (ctx, next) => {
    ctx.success = (message, data) => {
        ctx.body = {
            status: 1,
            message: message,
            data: data
        }
    }
    ctx.error = (message, detail) => {
        console.log(message, detail);
        ctx.body = {
            status: 1000,
            message: message,
            detail: detail
        }
    }
    ctx.unauthorized = (message, detail) => {
        ctx.body = {
            status: 1001,
            message: message,
            detail: "请求未授权",
        }
    }
    ctx.dataError = (message, detail) => {
        ctx.body = {
            status: 1002,
            message: message,
            detail: "请求数据错误",
        }
    }
    await next();
}