const UserModel = require('../model/user');
const ClassroomModel = require('../model/classroom');
const ClassroomRecordModel = require('../model/classroomRecord');
const ClassroomAreaModel = require('../model/classroomArea');
const ClassroomTypeModel = require('../model/classroomType');

module.exports = async () => {
    UserModel.belongsTo(ClassroomRecordModel, {
        foreignKey: 'user_id',
        targetKey: 'classroomRecord_user',
    });
    ClassroomRecordModel.hasOne(UserModel, {
        foreignKey: 'user_id',
        targetKey: 'classromRecord_user',
    });
    ClassroomModel.belongsTo(ClassroomRecordModel, {
        foreignKey: 'classroom_id',
        targetKey: 'classroomRecord_classroom',
    });
    ClassroomRecordModel.hasOne(ClassroomModel, {
        foreignKey: 'classroom_id',
        targetKey: 'classroomRecord_classroom',
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