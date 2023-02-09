const Router = require('koa-router');
const ClassroomController = require('../controller/classroom');
const router = new Router({ prefix: '/classroom' })
    .get('/queryList', ClassroomController.QueryList)
    .post('/add', ClassroomController.Add)
    .post('/update', ClassroomController.Update)
    .get('/apply', ClassroomController.Apply)
    .post('/approval', ClassroomController.Approval)
module.exports = router;