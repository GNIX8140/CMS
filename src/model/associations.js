const UserModel = require('../model/user');
const ClassroomModel = require('../model/classroom');
const ClassroomRecordModel = require('../model/classroomRecord');
const ClassroomAreaModel = require('../model/classroomArea');
const ClassroomTypeModel = require('../model/classroomType');
const StituteModel = require('../model/stitute');

module.exports = async () => {
    UserModel.belongsTo(StituteModel, {
        foreignKey: 'user_stitute',
        targetKey: 'stitute_id',
    });
    StituteModel.hasMany(UserModel, {
        foreignKey: 'user_stitute',
        targetKey: 'stitute_id',
    });
    ClassroomRecordModel.belongsTo(UserModel, {
        foreignKey: 'classroomRecord_user',
        targetKey: 'user_id',
    });
    UserModel.hasMany(ClassroomRecordModel, {
        foreignKey: 'classroomRecord_user',
        targetKey: 'user_id',
    });
    ClassroomRecordModel.belongsTo(ClassroomModel, {
        foreignKey: 'classroomRecord_classroom',
        targetKey: 'classroom_id',
    });
    ClassroomModel.hasMany(ClassroomRecordModel, {
        foreignKey: 'classroomRecord_classroom',
        targetKey: 'classroom_id',
    });
    ClassroomModel.belongsTo(ClassroomAreaModel, {
        foreignKey: 'classroom_area',
        targetKey: 'classroomArea_id',
    });
    ClassroomAreaModel.hasMany(ClassroomModel, {
        foreignKey: 'classroom_area',
        targetKey: 'classroomArea_id',
    });
    ClassroomModel.belongsTo(ClassroomTypeModel, {
        foreignKey: 'classroom_type',
        targetKey: 'classroomType_id',
    });
    ClassroomTypeModel.hasMany(ClassroomModel, {
        foreignKey: 'classroom_type',
        targetKey: 'classroomType_id',
    });
}