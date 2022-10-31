"use strice"
const Router = require('koa-router');
// User 路由
const UserRouter = require('./user');
// Admin路由
const AdminRouter = require('./admin');
// Classroom路由
const ClassroomRouter = require('./classroom');
const router = new Router()
    .use(UserRouter.routes())
    .use(AdminRouter.routes())
    .use(ClassroomRouter.routes());
module.exports = router;