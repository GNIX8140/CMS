const Router = require('koa-router');
const router = new Router({ prefix: '/classroom' })
    .get('/test', (ctx) => {
        ctx.success('test', 'test');
    });
module.exports = router;