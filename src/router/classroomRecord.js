const Router = require('koa-router');
const ClassroomRecordController = require('../controller/classroomRecord');
const router = new Router({prefix: '/classroomRecord'})
    .post('/approval', ClassroomRecordController.Approval)
    .get('/queryList', ClassroomRecordController.QueryList)
    .get('/userQuery', ClassroomRecordController.UserQuery)
    .get('/cancelApply', ClassroomRecordController.CancelApply)

module.exports = router;