const Router = require('koa-router');
const StituteController = require('../controller/stitute');
const router = new Router({ prefix: '/stitute' })
    .get('/queryList', StituteController.QueryList)
    .post('/add', StituteController.Add)
    .post('/update', StituteController.Update)
    .get('/delete', StituteController.Delete)

module.exports = router;