"use strice"
const Router = require('koa-router');
// User 路由表
const UserRouter = require('./user');
// Admin路由表
const AdminRouter = require('./admin');
// Classroom路由表
const ClassroomRouter = require('./classroom');
// ClassroomRecord路由表
const ClassroomRecordRouter = require('./classroomRecord');
// DashBoard路由表
const DashboardRouter = require('./dashboard');
// 主路由表
const router = new Router()
    // index GET
    .get('/', ctx => {
        return ctx.success('index', {
            type: 'GET'
        });
    })
    // index POST
    .post('/', ctx => {
        return ctx.success('index', {
            type: 'POST'
        })
    })
    // 退出登录
    .get('/logout', ctx => {
        ctx.logout();
        return ctx.success(null, '已退出，请重新登陆');
    })
    // 用户路由表
    .use(UserRouter.routes())
    // 管理员路由表
    .use(AdminRouter.routes())
    // 教室管理路由表
    .use(ClassroomRouter.routes())
    // 申请记录路由表
    .use(ClassroomRecordRouter.routes())
    // 数据面板路由表
    .use(DashboardRouter.routes())

module.exports = router;