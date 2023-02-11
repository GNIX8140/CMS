const Router = require('koa-router');
const DashboardController = require('../controller/dashboard');
const router = new Router({ prefix: '/dashboard' })
    .get('/query', DashboardController.Query)

module.exports = router;