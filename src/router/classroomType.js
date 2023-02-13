const Router = require('koa-router');
const ClassroomTypeController = require('../controller/classroomType');
const router = new Router({ prefix: '/type'})
    .get('/queryList', ClassroomTypeController.QueryList)
    .post('/add', ClassroomTypeController.Add)
    .post('/update', ClassroomTypeController.Update)
    .get('/delete', ClassroomTypeController.Delete)

module.exports = router;