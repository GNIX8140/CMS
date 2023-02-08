const passport = require('koa-passport');
const Strategy = require('passport-local').Strategy;
const UserModel = require('../model/user');

passport.use(new Strategy('local',
    async (username, password, done) => {
        UserModel.findOne({
            where: {
                user_number: username
            }
        }).then(user => {
            if (!user) { return done(null, false, { message: "用户名错误" }); }
            if (user.user_password !== password) { return done(null, false, { message: "密码错误" }); }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    return done(null, user)
})

const allowAPI = ['/', '/unauthorized', '/user/login', '/admin/login'];
function Filter(ctx) {
    if (allowAPI.indexOf(ctx.originalUrl) == -1) {
        if (!ctx.isAuthenticated()) {
            ctx.redirect('/unauthorized');
        }
    }
}

module.exports = { Filter, passport };