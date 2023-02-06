"use strict"
const Koa = require("koa");
const KoaBody = require("koa-body");
const KoaCors = require("koa2-cors");
const KoaStatic = require('koa-static')
const sslify = require("koa-sslify").default;
const ResponseModule = require("./src/middleware/response");
const fs = require("fs");
const os = require("os")
const https = require("https");
const IndexRouter = require("./src/router/index");
const schedule = require("./src/service/scheduled");
const app = new Koa();
const https_port = 8195;
const prettyError = require("pretty-error").start();
const ssl = {
    key: fs.readFileSync('./src/static/ssl/cert.key'),
    cert: fs.readFileSync('./src/static/ssl/cert.crt')
}
const Verification = require('./src/middleware/verification');
const server_ip = getLocalIpAddress();
function getLocalIpAddress() {
    var ifaces = os.networkInterfaces()
    for (var dev in ifaces) {
        let iface = ifaces[dev];
        for (let i = 0; i < iface.length; i++) {
            let { family, address, internal } = iface[i];
            if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                return address;
            }
        }
    }
}
async function initialization() {
    try {
        app.use(KoaBody({
            multipart: true,
            formidable: {
                maxFileSize: 20 * 1024 * 1024
            }
        }))
            .use(async (ctx, next) => {
                Verification.Filter(ctx);
                await next();
            })
            .use(KoaCors({
                origin: function (ctx) {
                    let url = ctx.header.origin;
                    return '*';
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
    } else {
        console.log('服务初始化-完成');
        https.createServer(ssl, app.callback()).listen(https_port, (err) => {
            if (err) {
                console.log('Server Start Error:' + err);
                process.exit(1);
            }
            console.log(`Server run at https://${server_ip}:${https_port}/`);
        });
    }
});