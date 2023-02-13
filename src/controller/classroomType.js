const ClassroomTypeModel = require('../model/classroomType');
// 查询类型
async function QueryList(ctx) {
    let classroomType = await ClassroomTypeModel.findAll();
    let items = [];
    classroomType.forEach(item => {
        items.push({
            id: item.classroomType_id,
            name: item.classroomType_name,
            capacity: item.classroomType_capacity,
        })
    })
    return ctx.success(null, items);
}

// 添加
async function Add(ctx) {
    let admin = ctx.state.user;
    if (admin.admin_authority == undefined) return ctx.unauthorized();
    let data = ctx.request.body;
    if (!data.name || !data.capacity) return ctx.dataError();
    let isExist = await ClassroomTypeModel.findOne({
        where: {
            classroomType_name: data.name,
        }
    });
    if (isExist) return ctx.dataError(null, '类型名称已存在');
    await ClassroomTypeModel.create({
        classroomType_name: data.name,
        classroomType_capacity: data.capacity,
    });
    return ctx.success(null, '添加类型成功');
}

// 修改
async function Update(ctx) {
    let admin = ctx.state.user;
    if (admin.admin_authority == undefined) return ctx.unauthorized();
    let data = ctx.request.body;
    if (!data.name || !data.typeId || !data.capacity) return ctx.dataError();
    let isExist = await ClassroomTypeModel.findOne({
        where: {
            classroomType_name: data.name,
        }
    });
    if (isExist) return ctx.dataError(null, '类型名称已存在');
    isExist = await ClassroomTypeModel.findOne({
        where: {
            classroomType_id: data.typeId,
        }
    });
    if (!isExist) return ctx.dataError(null, '类型ID错误');
    let result = await ClassroomTypeModel.update({
        classroomType_name: data.name,
        classroomType_capacity: data.capacity,
    }, {
        where: {
            classroomType_id: data.typeId,
        }
    });
    if (!result[0]) return ctx.error(null, '更新类型错误');
    return ctx.success(null, '更新类型成功');
}

// 删除
async function Delete(ctx) {
    let admin = ctx.state.user;
    if (admin.admin_authority == undefined) return ctx.unauthorized();
    let data = ctx.query;
    if (!data.typeId) return ctx.dataError();
    let isExist = await ClassroomTypeModel.findOne({
        where: {
            classroomType_id: data.typeId,
        }
    });
    if (!isExist) return ctx.dataError('类型ID错误');
    let result = await ClassroomTypeModel.destroy({
        where: {
            classroomType_id: data.typeId,
        }
    });
    if (!result) return ctx.error(null, '删除类型错误');
    return ctx.success(null, '删除类型成功');
}

module.exports = { QueryList, Add, Update, Delete };