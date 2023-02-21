const passport = require('../middleware/verification').passport;
const UserModel = require('../model/user');
const StituteModel = require('../model/stitute');
const UserTypeEnum = require('../enumeration/userType').userType;
const { Op } = require('sequelize');
const crypto = require('crypto');

// 用户登录
async function Login(ctx) {
    return passport.authenticate('user', (err, user, info) => {
        if (user === false) {
            ctx.dataError(null, info);
        } else {
            ctx.login(user);
            ctx.success(null, { type: 'user', name: user.user_name })
        }
    })(ctx)
}

// 用户资料
async function Profile(ctx) {
    let user = ctx.state.user;
    if (!user || !user.user_id) return ctx.unauthorized();
    let userProfile = await UserModel.findOne({
        where: {
            user_id: user.user_id
        },
        // include: [
        //     {
        //         attributes: ['stitute_name'],
        //         model: StituteModel,
        //     }
        // ]
    });
    if (!userProfile) return ctx.dataError(null, '未查询到用户资料');
    userProfile = {
        number: userProfile.user_number,
        email: userProfile.user_email,
        name: userProfile.user_name,
        stitute: userProfile.user_stitute,
        authority: userProfile.user_authority,
    }
    return ctx.success(null, userProfile);
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
        user_uuid: crypto.randomUUID(),
        user_number: data.number,
        user_email: data.email,
        user_password: data.password,
        user_name: data.name,
        user_stitute: data.stitute,
        user_authority: data.authority,
    });
    return ctx.success(null, '用户注册成功');
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

// 修改用户资料
async function Update(ctx) {
    let data = ctx.request.body;
    let userTemp = ctx.state.user;
    let oldUser = await UserModel.findOne({ where: { user_id: ctx.session.passport.user.user_id } });
    if (JSON.stringify(data) === '{}'
        || data.number === undefined
        || data.email === undefined
        || data.name === undefined
        || data.stitute === undefined
        || data.authority === undefined) return ctx.dataError(null, '用户数据缺失');
    if (data.number == oldUser.user_number
        && data.email == oldUser.user_email
        && data.name == oldUser.user_name
        && data.stitute == oldUser.user_stitute
        && data.authority == oldUser.user_authority) return ctx.dataError(null, '用户数据无更新');
    let result = await UserModel.update({
        user_number: data.number,
        user_email: data.email,
        user_name: data.name,
        user_stitute: data.stitute,
        user_authority: data.authority
    }, {
        where: {
            user_id: userTemp.user_id,
        }
    });
    if (!result[0]) return ctx.error(null, '用户资料更新错误');
    return ctx.success(null, '用户资料更新成功');
}

module.exports = { Login, Profile, Register, ModifyPassword, Update }