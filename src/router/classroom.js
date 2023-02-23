const Router = require('koa-router');
const ClassroomController = require('../controller/classroom');
const router = new Router({ prefix: '/classroom' })
    .get('/queryList', ClassroomController.QueryList)
    .post('/add', ClassroomController.Add)
    .post('/update', ClassroomController.Update)
    .get('/apply', ClassroomController.Apply)
    .get('/refunds', ClassroomController.Refunds)
    .get('/delete', ClassroomController.Delete)
    .get('/detail', ClassroomController.Detail)
module.exports = router;