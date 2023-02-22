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
        // 区域
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
        // 类型
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
        // 学院
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
    // 测试用户
    await UserModel.create({
        user_uuid: crypto.randomUUID(),
        user_number: '123',
        user_email: '123@163.com',
        user_password: crypto.createHash('md5').update('123').digest('hex'),
        user_name: '测试用户',
        user_stitute: 1,
        user_authority: 0,
        user_inApply: false,
    });
    // 管理员
    await AdminModel.create({
        admin_uuid: crypto.randomUUID(),
        admin_username: 'admin',
        admin_name: '管理员',
        admin_password: crypto.createHash('md5').update('admin').digest('hex'),
        admin_authority: 10,
    });
    // 教室 A区
    for (let i = 1; i<=5; i++) {
        let number = `A0${i}`;
        await ClassroomModel.create({
            classroom_uuid: crypto.randomUUID(),
            classroom_area: 1,
            classroom_number: number,
            classroom_type: 4,
            classroom_capacity: 40,
            classroom_authority: false,
            classroom_available: true,
        });
    }
    // 小型教室 B区
    for (let i = 1; i <= 30; i++) {
        let number;
        if (i < 10) {
            number = `B10${i}`;
        } else {
            number = `B1${i}`;
        }
        await ClassroomModel.create({
            classroom_uuid: crypto.randomUUID(),
            classroom_area: 2,
            classroom_number: number,
            classroom_type: 1,
            classroom_capacity: 30,
            classroom_authority: false,
            classroom_available: true,
        });
    }
    // 阶梯教室 B区
    for (let i = 1; i <= 10; i++) {
        let number;
        if (i < 10) {
            number = `B0${i}`;
        } else {
            number = `B${i}`;
        }
        await ClassroomModel.create({
            classroom_uuid: crypto.randomUUID(),
            classroom_area: 2,
            classroom_number: number,
            classroom_type: 2,
            classroom_capacity: 90,
            classroom_authority: false,
            classroom_available: true,
        });
    }
    // 阶梯教室 C区
    for (let i = 1; i <= 10; i++) {
        let number;
        if (i < 10) {
            number = `C0${i}`;
        } else {
            number = `C${i}`;
        }
        await ClassroomModel.create({
            classroom_uuid: crypto.randomUUID(),
            classroom_area: 2,
            classroom_number: number,
            classroom_type: 2,
            classroom_capacity: 90,
            classroom_authority: false,
            classroom_available: true,
        });
    }
    // 实验室 D区
    for (let i = 1; i <= 8; i++) {
        let number = `D0${i}`;
        await ClassroomModel.create({
            classroom_uuid: crypto.randomUUID(),
            classroom_area: 4,
            classroom_number: number,
            classroom_type: 3,
            classroom_capacity: 20,
            classroom_authority: true,
            classroom_available: true,
        });
    }
}