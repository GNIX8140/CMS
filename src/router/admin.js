const Router = require('koa-router');
const AdminController = require('../controller/admin')
const router = new Router({ prefix: '/admin' })
    // 登陆
    .get('/login', AdminController.Login)
    // 注册
    .post('/register', AdminController.Register)
    // 修改密码
    .post('/modifyPassword', AdminController.ModifyPassord)
    // 修改姓名
    .post('/modifyName', AdminController.ModifyName)
module.exports = router;