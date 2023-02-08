const passport = require('../middleware/verification').passport;
const UserModel = require('../model/user');
const { Op } = require('sequelize');

// 用户登录
async function Login(ctx) {
    return passport.authenticate('user', (err, user, info) => {
        if (user === false) {
            ctx.dataError(null, info);
        } else {
            ctx.login(user);
            ctx.success(null, { type: 'user', username: user.user_name })
        }
    })(ctx)
}

// 注册
async function Register(ctx) {
    let data = ctx.request.body;
    let isExist = await UserModel.findOne({
        where: {
            [Op.or]: [
                {
                    user_number: data.number
                },
                {
                    user_email: data.email,
                }
            ]
        }
    });
    if (isExist) return ctx.dataError(null, '学号或邮箱已存在');
    await UserModel.create({
        user_number: data.number,
        user_email: data.email,
        user_password: data.password,
        user_name: data.name,
        user_stitute: data.stitute,
        user_authority: data.authority,
    });
    ctx.success(null, '用户注册成功');
}

// 修改密码
async function ModifyPassword(ctx) {
    let data = ctx.request.body;
    let user = await UserModel.findOne({ where: { user_id: ctx.session.passport.user.user_id } });
    if (user.user_password != data.oldPassword) return ctx.dataError(null, '旧密码错误');
    if (user.user_password == data.newPassword) return ctx.dataError(null, '新旧密码相同');
    let result = await UserModel.update({
        user_password: data.newPassword,
    }, {
        where: {
            user_id: ctx.session.passport.user.user_id,
        }
    });
    if (!result[0]) return ctx.error(null, '密码修改错误');
    return ctx.success(null, '密码修改成功');
}

// 修改真实姓名
async function ModifyName(ctx) {
    let data = ctx.request.body;
    let user = await UserModel.findOne({ where: { user_id: ctx.session.passport.user.user_id } });
    if (user.user_name == data.name) return ctx.dataError(null, '新旧姓名相同');
    let result = await UserModel.update({
        user_name: data.name,
    }, {
        where: {
            user_id: ctx.session.passport.user.user_id,
        }
    });
    if (!result[0]) return ctx.error(null, '姓名修改错误');
    return ctx.success(null, '姓名修改成功');
}

module.exports = { Login, Register, ModifyPassword, ModifyName }