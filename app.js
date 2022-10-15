"use strict"
const Koa = require("koa");
const KoaBody = require("koa-body");
const KoaCors = require("koa2-cors");
const KoaStatic = require('koa-static')
const sslify = require("koa-sslify").default;
const ResponseModule = require("./src/middleware/response");
const fs = require("fs");
const https = require("https");
const IndexRouter = require("./src/router/index");
const schedule = require("./src/service/scheduled");
const app = new Koa();
const https_port = 8194;
const prettyError = require("pretty-error").start();
const ssl = {
    key: fs.readFileSync('./src/static/ssl/server-xing.top.key'),
    cert: fs.readFileSync('./src/static/ssl/server-xing.top.crt')
}
function initialization() {
    return new Promise(async function (resolve, reject) {
        app.use(KoaBody({
            multipart: true,
            formidable: {
                maxFileSize: 200 * 1024 * 1024
            }
        }))
            .use(KoaCors({
                origin: function (ctx) {
                    let url = ctx.header.origin;
                    if (url == 'https://cms.server-xing.top') {
                        return '*';
                    }
                    return 'https://cms.server-xing.top';
                }
            }))
            .use(ResponseModule)
            .use(sslify())
            .use(IndexRouter.routes()).use(IndexRouter.allowedMethods())
            .use(KoaStatic('/Nodejs/Public/CMS/Preview'))
        let scheduleTaskStatus = await schedule.start();
        if (!scheduleTaskStatus) {
            reject('服务初始化-错误');
        }
        resolve('服务初始化成功');
    });
}
initialization().then(res => {
    console.log(res);
    https.createServer(ssl, app.callback()).listen(https_port, (err) => {
        if (err) {
            console.log('Server Start Error:' + err);
            process.exit(1);
        }
        console.log(`Server run at https://server-xing.top:${https_port}/`);
    });
}).catch(err => {
    console.log(err);
    process.exit(1);
});