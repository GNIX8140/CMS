const UserModel = require('./user');
const AdminModel = require('./admin');
const ClassroomModel = require('./classroom');
const ClassroomRecordModel = require('./classroomRecord');
const ClassroomAreaModel = require('./classroomArea');
const ClassroomTypeModel = require('./classroomType');
const StituteModel = require('./stitute')
const crypto = require('crypto');
const moment = require('moment');
module.exports = async () => {
    // 测试数据
    await UserModel.create({
        user_uuid: crypto.randomUUID(),
        user_number: '123',
        user_email: '123@123.com',
        user_password: crypto.createHash('md5').update('123').digest('hex'),
        user_name: 'name1',
        user_stitute: 1,
        user_authority: 0,
        user_inApply: false,
    });
    await UserModel.create({
        user_uuid: crypto.randomUUID(),
        user_number: '234',
        user_email: '234@123.com',
        user_password: crypto.createHash('md5').update('123').digest('hex'),
        user_name: 'name2',
        user_stitute: 2,
        user_authority: 0,
        user_inApply: false,
    });
    await AdminModel.create({
        admin_uuid: crypto.randomUUID(),
        admin_username: 'admin',
        admin_name: 'admin',
        admin_password: crypto.createHash('md5').update('admin').digest('hex'),
        admin_authority: 10,
    });
    await ClassroomModel.create({
        classroom_uuid: crypto.randomUUID(),
        classroom_area: 1,
        classroom_number: 'A001',
        classroom_type: 1,
        classroom_capacity: 30,
        classroom_authority: true,
        classroom_available: true,
    });
    await ClassroomModel.create({
        classroom_uuid: crypto.randomUUID(),
        classroom_area: 2,
        classroom_number: 'B001',
        classroom_type: 2,
        classroom_capacity: 90,
        classroom_authority: true,
        classroom_available: true,
    });
    await ClassroomModel.create({
        classroom_uuid: crypto.randomUUID(),
        classroom_area: 3,
        classroom_number: 'C001',
        classroom_type: 3,
        classroom_capacity: 20,
        classroom_authority: true,
        classroom_available: true,
    });
    await ClassroomModel.create({
        classroom_uuid: crypto.randomUUID(),
        classroom_area: 4,
        classroom_number: 'D001',
        classroom_type: 4,
        classroom_capacity: 40,
        classroom_authority: true,
        classroom_available: true,
    });
    await ClassroomAreaModel.create({
        classroomArea_name: 'A区',
    });
    await ClassroomAreaModel.create({
        classroomArea_name: 'B区',
    });
    await ClassroomAreaModel.create({
        classroomArea_name: 'C区',
    });
    await ClassroomAreaModel.create({
        classroomArea_name: 'D区',
    });
    await ClassroomTypeModel.create({
        classroomType_name: '小型教室',
        classroomType_capacity: 30,
    });
    await ClassroomTypeModel.create({
        classroomType_name: '阶梯教室',
        classroomType_capacity: 90,
    });
    await ClassroomTypeModel.create({
        classroomType_name: '实验室',
        classroomType_capacity: 20,
    });
    await ClassroomTypeModel.create({
        classroomType_name: '多功能教室',
        classroomType_capacity: 40,
    });
    await ClassroomTypeModel.create({
        classroomType_name: '语音教室',
        classroomType_capacity: 10,
    });
    await StituteModel.create({
        stitute_name: '国际商学院',
    });
    await StituteModel.create({
        stitute_name: '国际设计学院',
    });
    await StituteModel.create({
        stitute_name: '人文学院',
    });
    await StituteModel.create({
        stitute_name: '信息工程学院',
    });
    // await ClassroomRecordModel.create({
    //     classroomRecord_uuid: crypto.randomUUID(),
    //     classroomRecord_user: 1,
    //     classroomRecord_classroom: 1,
    //     classroomRecord_start: moment(),
    //     classroomRecord_end: moment().add(20, 'seconds'),
    //     classroomRecord_status: false,
    //     classroomRecord_pass: false,
    //     classroomRecord_finish: false,
    // });
    // await ClassroomRecordModel.create({
    //     classroomRecord_uuid: crypto.randomUUID(),
    //     classroomRecord_user: 1,
    //     classroomRecord_classroom: 1,
    //     classroomRecord_start: moment(),
    //     classroomRecord_end: moment().add(20, 'seconds'),
    //     classroomRecord_status: false,
    //     classroomRecord_pass: false,
    //     classroomRecord_finish: false,
    // });
}