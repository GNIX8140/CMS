const passport = require('../middleware/verification').passport;

async function Login(ctx) {
    return passport.authenticate('local', (err, user, info, status) => {
        if (user === false) {
            ctx.dataError(null, info);
        } else {
            ctx.login(user);
            ctx.success()
        }
    })(ctx)
}

async function Logout(ctx) {
    ctx.logout();
    return ctx.success()
}

module.exports = { Login, Logout }