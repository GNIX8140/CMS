"use strice"
const Router = require('koa-router');
// User 路由
const UserRouter = require('./user');
const router = new Router()
    .use(UserRouter.routes());
module.exports = router;