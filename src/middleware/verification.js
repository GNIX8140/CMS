const passport = require('koa-passport');
const Strategy = require('passport-local').Strategy;
const UserModel = require('../model/user');
const AdminModel = require('../model/admin');
const validator = require('validator');
// 用户登录验证策略
passport.use('user', new Strategy(async (username, password, done) => {
    if (!username) { return done(null, false, { message: "请输入用户名" }) }
    let where = {};
    if (validator.isEmail(username)) where = { user_email: username }
    else where = { user_number: username }
    UserModel.findOne({
        where: where
    }).then(user => {
        if (!user) { return done(null, false, { message: "用户名错误" }); }
        if (user.user_password !== password) { return done(null, false, { message: "密码错误" }); }
        return done(null, user);
    });
}
));
// 管理员登陆验证策略
passport.use('admin', new Strategy(async (username, password, done) => {
    AdminModel.findOne({
        where: {
            admin_username: username
        }
    }).then(user => {
        if (!user) { return done(null, false, { message: "用户名错误" }); }
        if (user.admin_password !== password) { return done(null, false, { message: "密码错误" }); }
        return done(null, user);
    });
}
));
// 序列化用户数据
passport.serializeUser(function (user, done) {
    done(null, user);
});
// 反序列化用户数据
passport.deserializeUser(function (user, done) {
    return done(null, user)
})
// API拦截白名单
const allowAPI = ['/', '/user/login', '/admin/login', '/user/register', '/dashboard/query'];
// API拦截过滤器
function Filter(ctx) {
    return new Promise((resolve) => {
        let url = ctx.originalUrl;
        if (url.indexOf('?')) {
            url = url.split('?')[0];
        }
        if (allowAPI.indexOf(url) == -1 && !ctx.isAuthenticated()) {
            ctx.unauthorized()
            resolve(false);
        }
        resolve(true);
    })
}

module.exports = { Filter, passport };