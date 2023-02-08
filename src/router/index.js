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
        return ctx.success('index', {
            type: 'GET'
        });
    })
    .post('/', (ctx) => {
        return ctx.success('index', {
            type: 'POST'
        })
    })
    .get('/unauthorized', (ctx) => {
        return ctx.unauthorized();
    })
    .use(UserRouter.routes())
    .use(AdminRouter.routes())
    .use(ClassroomRouter.routes());

module.exports = router;