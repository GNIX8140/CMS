const Router = require('koa-router');
const UserController = require('../controller/user');
const router = new Router({ prefix: '/user' })
    .post('/login', UserController.Login)
    .get('/logout', UserController.Logout)
module.exports = router;