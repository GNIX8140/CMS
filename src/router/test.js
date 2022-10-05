"use strice"
const Router = require('koa-router')
const router = new Router({ prefix: '/test' })
    .get('/test', (ctx) => {
        ctx.success('test', 'test');
    })
module.exports = router;