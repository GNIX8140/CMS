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
async function initialization() {
    try {
        app.use(KoaBody({
            multipart: true,
            formidable: {
                maxFileSize: 20 * 1024 * 1024
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
            .use(IndexRouter.routes())
            .use(IndexRouter.allowedMethods())
            .use(KoaStatic('/Nodejs/Public/CMS/Preview'))
        let scheduleTaskStatus = await schedule.start();
        if (!scheduleTaskStatus) {
            throw Error('计划任务-错误');
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
initialization().then(res => {
    if (!res) {
        console.log('服务初始化-错误');
        process.exit(1);
    }
    console.log('服务初始化-完成');
    https.createServer(ssl, app.callback()).listen(https_port, (err) => {
        if (err) {
            console.log('Server Start Error:' + err);
            process.exit(1);
        }
        console.log(`Server run at https://server-xing.top:${https_port}/`);
    });
});