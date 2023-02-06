"use strice"
const Router = require('koa-router');
// User 路由表
const UserRouter = require('./user');
// Admin路由表
const AdminRouter = require('./admin');
// Classroom路由表
const ClassroomRouter = require('./classroom');

const router = new Router()
    .get('/', (ctx) => {
        ctx.success('index', {
            type: 'GET'
        });
    })
    .post('/', (ctx) => {
        ctx.success('index', {
            type: 'POST'
        })
    })
    .use(UserRouter.routes())
    .use(AdminRouter.routes())
    .use(ClassroomRouter.routes());

module.exports = router;