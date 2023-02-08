const passport = require('../middleware/verification').passport;
const AdminModel = require('../model/admin');

// 管理员登陆
async function Login(ctx) {
    return passport.authenticate('admin', (err, admin, info, status) => {
        if (admin === false) {
            ctx.dataError(null, info);
        } else {
            ctx.login(admin);
            ctx.success(null, { type: 'admin', username: admin.admin_name });
        }
    })(ctx)
}

// 管理员资料
async function Profile(ctx) {
    let admin = ctx.state.user;
    if (!admin || !admin.admin_id) return ctx.unauthorized();
    let adminProfile = await AdminModel.findOne({ where: { admin_id: admin.admin_id } });
    if (!adminProfile) return ctx.dataError(null, '未查询到管理员资料');
    adminProfile = {
        username: adminProfile.admin_username,
        name: adminProfile.admin_name,
        authority: adminProfile.admin_authority,
    }
    return ctx.success(null, adminProfile);
}

// 注册
async function Register(ctx) {
    let data = ctx.request.body;
    let isExist = await AdminModel.findOne({ where: { admin_username: data.username } });
    if (isExist) return ctx.dataError(null, "用户名已存在");
    await AdminModel.create({
        admin_username: data.username,
        admin_name: data.name,
        admin_password: data.password,
        admin_authority: 10,
    });
    return ctx.success(null, '管理员注册成功');
}

// 修改密码
async function ModifyPassord(ctx) {
    let data = ctx.request.body;
    let admin = await AdminModel.findOne({ where: { admin_id: ctx.session.passport.user.admin_id } });
    if (admin.admin_password != data.oldPassword) return ctx.dataError(null, '旧密码错误');
    if (admin.admin_password == data.newPassword) return ctx.dataError(null, '新旧密码相同');
    let result = await AdminModel.update({
        admin_password: data.newPassword,
    }, {
        where: {
            admin_id: ctx.session.passport.user.admin_id,
        }
    });
    if (!result[0]) return ctx.error(null, '管理员密码修改错误');
    return ctx.success(null, '管理员密码修改成功');
}

// 修改真实姓名
async function ModifyName(ctx) {
    let data = ctx.request.body;
    let admin = await AdminModel.findOne({ where: { admin_id: ctx.session.passport.user.admin_id } });
    if (admin.admin_name == data.name) return ctx.dataError(null, '新旧管理员姓名相同');
    let result = await AdminModel.update({
        admin_name: data.name,
    }, {
        where: {
            admin_id: ctx.session.passport.user.admin_id
        }
    });
    if (!result[0]) return ctx.error(null, '管理员姓名修改错误');
    return ctx.success(null, '管理员姓名修改成功');
}

module.exports = { Login, Profile, Register, ModifyPassord, ModifyName };