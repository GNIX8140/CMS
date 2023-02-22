"use strict"
const Koa = require("koa");
const KoaBody = require("koa-body");
const KoaCors = require("koa2-cors");
const KoaStatic = require('koa-static')
const session = require('koa-session');
const sslify = require("koa-sslify").default;
const ResponseModule = require("./src/middleware/response");
const fs = require("fs");
const https = require("https");
const IndexRouter = require("./src/router/index");
const schedule = require("./src/service/scheduled");
const app = new Koa();
const https_port = 8194;
const passport = require('./src/middleware/verification').passport;
const ssl = {
    key: fs.readFileSync('./src/static/ssl/cms.server-xing.top.key'),
    cert: fs.readFileSync('./src/static/ssl/cms.server-xing.top.crt')
}
const Verification = require('./src/middleware/verification');

async function initialization() {
    try {
        app.keys = ['Server-XING'];
        app.use(KoaBody({
            multipart: true,
            formidable: {
                maxFileSize: 20 * 1024 * 1024
            }
        }))
            .use(KoaCors({
                origin: function (ctx) {
                    return 'https://cms.server-xing.top';
                },
                maxAge: 5,
                credentials: true,
                allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
                exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
            }))
            .use(session({
                key: 'CMS',
                maxAge: 1000 * 60 * 60 * 24 * 7,
                overwrite: true,
                httpOnly: true,
                signed: true,
                rolling: true,
                renew: true,
                sameSite: 'none',
            }, app))
            .use(ResponseModule)
            .use(async (ctx, next) => {
                try {
                    await next();
                } catch (err) {
                    ctx.error(false, err);
                }
            })
            .use(sslify())
            .use(passport.initialize())
            .use(passport.session())
            .use(async (ctx, next) => {
                if (await Verification.Filter(ctx)) {
                    await next();
                }
            })
            .use(IndexRouter.routes())
            .use(IndexRouter.allowedMethods())
            .use(KoaStatic('/Nodejs/Public/CMS/Preview'))
        await schedule.start();
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
initialization().then(res => {
    if (!res) {
        process.exit(1);
    }
    https.createServer(ssl, app.callback()).listen(https_port, err => {
        if (err) {
            console.log('Server Start Error:' + err);
            process.exit(1);
        }
        console.log(`Server run at https://cms.server-xing.top:${https_port}/`);
    });
});
