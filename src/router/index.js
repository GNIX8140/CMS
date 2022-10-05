"use strice"
const Router = require('koa-router');
const TestRouter = require('./test');
const router = new Router()
    .use(TestRouter.routes());
module.exports = router;