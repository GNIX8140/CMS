const UserModel = require('../model/user');
const ClassroomModel = require('../model/classroom');
const ClassroomRecordModel = require('../model/classroomRecord');

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
}