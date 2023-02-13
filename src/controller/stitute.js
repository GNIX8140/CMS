const StituteModel = require('../model/stitute');

// 查询列表
async function QueryList(ctx) {
    let stituteList = await StituteModel.findAll();
    let items = [];
    stituteList.forEach(item => {
        items.push({
            id: item.stitute_id,
            name: item.stitute_name,
        });
    });
    return ctx.success(null, items);
}

// 添加
async function Add(ctx) {
    let admin = ctx.state.user;
    if (admin.admin_authority == undefined) return ctx.unauthorized();
    let data = ctx.request.body;
    if (!data.stitute) return ctx.dataError();
    let isExist = await StituteModel.findOne({
        where: {
            stitute_name: data.stitute,
        }
    });
    if (isExist) return ctx.dataError(null, '学院名称已存在');
    await StituteModel.create({
        stitute_name: data.stitute,
    });
    return ctx.success(null, '添加学院成功');
}

// 修改
async function Update(ctx) {
    let admin = ctx.state.user;
    if (admin.admin_authority == undefined) return ctx.unauthorized();
    let data = ctx.request.body;
    if (!data.stitute || !data.stituteId) return ctx.dataError();
    let isExist = await StituteModel.findOne({
        where: {
            stitute_name: data.stitute,
        }
    });
    if (isExist) return ctx.dataError(null, '学院名称已存在');
    isExist = await StituteModel.findOne({
        where: {
            stitute_id: data.stituteId,
        }
    });
    if (!isExist) return ctx.dataError(null, '学院ID错误');
    let result = await StituteModel.update({
        stitute_name: data.stitute,
    }, {
        where: {
            stitute_id: data.stituteId,
        }
    });
    if (!result[0]) return ctx.error(null, '更新学院错误');
    return ctx.success(null, '更新学院成功');
}

// 删除
async function Delete(ctx) {
    let admin = ctx.state.user;
    if (admin.admin_authority == undefined) return ctx.unauthorized();
    let data = ctx.query;
    if (!data.stituteId) return ctx.dataError();
    let isExist = await StituteModel.findOne({
        where: {
            stitute_id: data.stituteId,
        }
    });
    if (!isExist) return ctx.dataError(null, '学院ID错误');
    let result = await StituteModel.destroy({
        where: {
            stitute_id: data.stituteId,
        }
    });
    if (!result) return ctx.error(null, '删除学院错误');
    return ctx.success(null, '删除学院成功');
}

module.exports = { QueryList, Add, Update, Delete };