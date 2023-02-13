const ClassroomAreaModel = require('../model/classroomArea');

// 查询列表
async function QueryList(ctx) {
    let classroomArea = await ClassroomAreaModel.findAll();
    let items = [];
    classroomArea.forEach(item => {
        items.push({
            id: item.classroomArea_id,
            name: item.classroomArea_name,
        });
    });
    return ctx.success(null, items);
}

// 添加
async function Add(ctx) {
    let admin = ctx.state.user;
    if (admin.admin_authority == undefined) return ctx.unauthorized();
    let data = ctx.request.body;
    if (!data.name) return ctx.dataError();
    let isExist = await ClassroomAreaModel.findOne({
        where: {
            classroomArea_name: data.name,
        }
    });
    if (isExist) return ctx.dataError(null, '区域名称已存在');
    await ClassroomAreaModel.create({
        classroomArea_name: data.name,
    });
    return ctx.success(null, '添加区域成功');
}

// 修改
async function Update(ctx) {
    let admin = ctx.state.user;
    if (admin.admin_authority == undefined) return ctx.unauthorized();
    let data = ctx.request.body;
    if (!data.name || !data.areaId) return ctx.dataError();
    let isExist = await ClassroomAreaModel.findOne({
        where: {
            classroomArea_name: data.name,
        }
    });
    if (isExist) return ctx.dataError(null, '区域名称已存在');
    isExist = await ClassroomAreaModel.findOne({
        where: {
            classroomArea_id: data.areaId,
        }
    });
    if (!isExist) return ctx.dataError(null, '区域ID错误');
    let result = await ClassroomAreaModel.update({
        classroomArea_name: data.name,
    }, {
        where: {
            classroomArea_id: data.areaId,
        }
    });
    if (!result[0]) return ctx.error(null, '更新区域错误');
    return ctx.success(null, '更新区域成功');
}

// 删除
async function Delete(ctx) {
    let admin = ctx.state.user;
    if (admin.admin_authority == undefined) return ctx.unauthorized();
    let data = ctx.query;
    if (!data.areaId) return ctx.dataError();
    let isExist = await ClassroomAreaModel.findOne({
        where: {
            classroomArea_id: data.areaId,
        }
    });
    if (!isExist) return ctx.dataError(null, '区域ID错误');
    let result = await ClassroomAreaModel.destroy({
        where: {
            classroomArea_id: data.areaId
        }
    });
    if (!result) ctx.error(null, '删除区域错误');
    return ctx.success(null, '删除区域成功');
}


module.exports = { QueryList, Add, Update, Delete };