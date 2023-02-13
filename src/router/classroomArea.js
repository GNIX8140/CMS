const Router = require('koa-router');
const ClassroomAreaController = require('../controller/classroomArea');
const router = new Router({ prefix: '/area' })
    .get('/queryList', ClassroomAreaController.QueryList)
    .post('/add', ClassroomAreaController.Add)
    .post('/update', ClassroomAreaController.Update)
    .get('/delete', ClassroomAreaController.Delete)
module.exports = router;