"use strict"
// response数据格式模板
module.exports = async (ctx, next) => {
    // API接口请求成功
    ctx.success = (message, data) => {
        ctx.body = {
            status: 1,
            message: message ? message : true,
            data: data ? data : 'success'
        }
    }
    // API接口服务器内部错误
    ctx.error = (message, detail) => {
        console.log(message, detail);
        ctx.body = {
            status: 1000,
            message: message ? message : false,
            detail: '服务器内部错误'
        }
    }
    // API接口未授权
    ctx.unauthorized = (message, detail) => {
        ctx.body = {
            status: 1001,
            message: message ? message : false,
            detail: "请求未授权",
        }
    }
    // API接口请求数据错误
    ctx.dataError = (message, detail) => {
        ctx.body = {
            status: 1002,
            message: message ? message : false,
            detail: detail ? detail : "请求数据错误",
        }
    }
    await next();
}