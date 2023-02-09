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
const https_port = 8195;
const passport = require('./src/middleware/verification').passport;
const ssl = {
    key: fs.readFileSync('./src/static/ssl/cert.key'),
    cert: fs.readFileSync('./src/static/ssl/cert.crt')
}
const Verification = require('./src/middleware/verification');

// *** Delete Start ***
const os = require("os")
const prettyError = require("pretty-error").start();

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
// *** Delete End ***

async function initialization() {
    try {
        app.keys = ['server-xing'];
        app.use(KoaBody({
            multipart: true,
            formidable: {
                maxFileSize: 20 * 1024 * 1024
            }
        }))
            .use(KoaCors({
                origin: function (ctx) {
                    let url = ctx.header.origin;
                    return '*';
                }
            }))
            .use(session({
                key: 'koa:sess',
                maxAge: 86400000,
                overwrite: true,
                httpOnly: true,
                signed: true,
                rolling: false,
                renew: true,
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
        console.log(`Server run at https://${server_ip}:${https_port}/`);
    });
});