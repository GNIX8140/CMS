const Router = require('koa-router');
const router = new Router({ prefix: '/admin' })
    .get('/test', (ctx) => {
        ctx.success('test', 'test');
    });
module.exports = router;