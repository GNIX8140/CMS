const Router = require('koa-router');
const UserController = require('../controller/user');
const router = new Router({ prefix: '/user' })
    // 登陆
    .get('/login', UserController.Login)
    // 资料
    .get('/profile', UserController.Profile)
    // 注册
    .post('/register', UserController.Register)
    // 修改密码
    .post('/modifyPassword', UserController.ModifyPassword)
    // 修改姓名
    .post('/modifyName', UserController.ModifyName)
module.exports = router;