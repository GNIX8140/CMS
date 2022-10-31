// 数据模型
const AdminModel = require('../model/admin');
const AreaModel = require('../model/area');
const ClassroomModel = require('../model/classroom');
const ClassroomTypeModel = require('../model/classroomType');
const UserModel = require('../model/user');
// 数据模型关联
// 教学区域与教室关联
AreaModel.hasMany(ClassroomModel, {
    foreignKey: 'classroom_area',
    sourceKey: 'area_id',
});
// 教室类型与教室关联
ClassroomTypeModel.hasMany(ClassroomModel, {
    foreignKey: 'classroom_type',
    sourceKey: 'classroomType_id',
});