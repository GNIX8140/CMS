<template>
    <div class="classroom-list-body">
        <Modal v-if="showModal" :type="modalType" :modalData="bind.modifyClassroom" :typeList="typeList"
            :areaList="areaList" @applyClassroom="applyClassroom" @closeModal="closeModal"
            @showAlertMsg="modalShowAlertMsg" />
        <Confirm v-if="showConfirm" @confirmBack="deleteClassroom" />
        <div class="list-params">
            <div class="input-group">
                <span class="input-group-text">区域</span>
                <select class="form-select" v-model="bind.area" @change="changeArea">
                    <option value="null" selected>全部</option>
                    <option v-for="(item, index) in areaList" :value="item.id">{{ item.name }}</option>
                </select>
            </div>
            <div class="input-group mx-2">
                <span class="input-group-text">类型</span>
                <select class="form-select" v-model="bind.type" @change="changeType">
                    <option value="null" selected>全部</option>
                    <option v-for="(item, index) in typeList" :value="item.id">{{ item.name }}</option>
                </select>
            </div>
            <div class="input-group">
                <span class="input-group-text">编号</span>
                <input type="text" class="form-control" placeholder="教室编号" v-model="bind.number" @change="queryNumber">
            </div>
        </div>
        <div class="list-table">
            <div class="description">
                <span>编号</span>
                <span>区域</span>
                <span>类型</span>
                <span class="pc">容纳</span>
                <span>状态</span>
                <span class="pc">审核</span>
                <span>操作</span>
            </div>
            <div class="table" v-if="classroomList">
                <div class="row" v-for="(item, index) in classroomList.items">
                    <span>{{ item.number }}</span>
                    <span>{{ areaList[item.area - 1].name }}</span>
                    <span>{{ typeList[item.type - 1].name }}</span>
                    <span class="pc">{{ item.capacity }}</span>
                    <span>{{ item.available ? '空闲' : '不可用' }}</span>
                    <span class="pc">{{ item.authority ? '需要审核' : '无需审核' }}</span>
                    <span v-if="type == 'classroom'">
                        <button class="btn btn-outline-primary"
                            @click="bind.applyId = item.id; showModal = true; modalType = 'applyLength'"
                            :disabled="!item.available">申请</button>
                    </span>
                    <span v-if="type == 'control'">
                        <button class="btn btn-outline-primary"
                            @click="bind.modifyClassroom = item; showModal = true; modalType = 'modify'">修改</button>
                        <button class="pc btn btn-outline-danger" @click="deleteConfirm(item.id)">删除</button>
                    </span>
                </div>
            </div>
            <div class="list-button-group" v-if="classroomList">
                <button class="btn btn-secondary" :disabled="!classroomList.hasPrevious"
                    @click="queryPreviousPage">上一页</button>
                <input ref="pageInput" type="text" class="form-control" :placeholder="classroomList.num" @change="jumpPage">
                <button class="btn btn-secondary" :disabled="!classroomList.hasNext" @click="queryNextPage">下一页</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import moment from 'moment'
import axios from 'axios';
import Modal from './Modal.vue';
import Confirm from './Confirm.vue'
const props = defineProps(['type']);
const emits = defineEmits(['showAlertMsg']);
const bind = ref({
    area: null,
    type: null,
    number: null,
    applyId: null,
    modifyClassroom: null,
    deleteId: null,
});
const pageInput = ref();
const showModal = ref(false);
const modalType = ref();
const areaList = ref();
const typeList = ref();
const classroomList = ref()
const showConfirm = ref(false);
onMounted(async () => {
    await queryAreaList();
    await queryTypeList();
    await queryClassroomList(1, 10);
});
async function queryClassroomList(page, length, area, type, number) {
    let params = {
        page: page,
        length: length,
    }
    if (area != 'null') params.area = area;
    if (type != 'null') params.type = type;
    if (number != 'null') params.number = number;
    await axios.get(`${window.ServerURL}/classroom/queryList`, {
        params: params
    }).then(res => {
        if (res.data.status != 1) {
            emits('showAlertMsg', res.data.detail);
        }
        return classroomList.value = res.data.data;
    });
}
async function queryAreaList() {
    await axios.get(`${window.ServerURL}/area/queryList`).then(res => {
        if (res.data.status != 1) {
            emits('showAlertMsg', res.data.detail);
        }
        return areaList.value = res.data.data;
    });
}
async function queryTypeList() {
    await axios.get(`${window.ServerURL}/type/queryList`).then(res => {
        if (res.data.status != 1) {
            emits('showAlertMsg', res.data.detail);
        }
        return typeList.value = res.data.data;
    });
}
function jumpPage() {
    let num = pageInput.value.value;
    if (num > classroomList.value.pageTotal || num < 1) {
        pageInput.value.value = null;
        return emits('showAlertMsg', '页数超出范围');
    }
    queryClassroomList(num, 10, bind.value.area, bind.value.type, bind.value.number)
    pageInput.value.value = null;
}
function queryPreviousPage() {
    if (!classroomList.value.hasPrevious) return emits('showAlertMsg', '已经是第一页')
    classroomList.value.num--;
    queryClassroomList(classroomList.value.num, 10, bind.value.area, bind.value.type, bind.value.number)
}
function queryNextPage() {
    if (!classroomList.value.hasNext) return emits('showAlertMsg', '已经是最后一页');
    classroomList.value.num++;
    queryClassroomList(classroomList.value.num, 10, bind.value.area, bind.value.type, bind.value.number)
}
function changeArea() {
    classroomList.value.num = 1;
    queryClassroomList(classroomList.value.num, 10, bind.value.area, bind.value.type, bind.value.number)
}
function changeType() {
    classroomList.value.num = 1;
    queryClassroomList(classroomList.value.num, 10, bind.value.area, bind.value.type, bind.value.number)
}
function queryNumber() {
    bind.value.area = null;
    bind.value.type = null;
    classroomList.value.num = 1;
    queryClassroomList(classroomList.value.num, 10, bind.value.area, bind.value.type, bind.value.number)
}
function applyClassroom(applyLength) {
    if (bind.value.applyId == null) return emits('showAlertMsg', '请选择申请教室');
    if (applyLength == null) return emits('showAlertMsg', '请选择申请时长');
    let startTime = moment().format('YYYY-MM-DD HH:mm:ss');
    let endTime = moment().add(applyLength, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    axios.get(`${window.ServerURL}/classroom/apply`, {
        params: {
            classroomId: bind.value.applyId,
            startTime: startTime,
            endTime: endTime,
        }
    }).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        emits('showAlertMsg', res.data.data);
        queryClassroomList(classroomList.value.num, 10, bind.value.area, bind.value.type, bind.value.number)
        bind.value.applyId = null;
        showModal.value = false;
    })
}
function closeModal() {
    showModal.value = false;
    queryClassroomList(classroomList.value.num, 10, bind.value.area, bind.value.type, bind.value.number)
}
function modalShowAlertMsg(msg) {
    emits('showAlertMsg', msg);
}
function deleteClassroom(status) {
    if (!status) {
        showConfirm.value = false;
        bind.value.deleteId = null;
        return;
    }
    if (bind.value.deleteId == undefined) return emits('showAlertMsg', '删除教室ID错误');
    axios.get(`${window.ServerURL}/classroom/delete`, {
        params: {
            classroomId: bind.value.deleteId,
        }
    }).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        emits('showAlertMsg', res.data.data);
        queryClassroomList(classroomList.value.num, 10, bind.value.area, bind.value.type, bind.value.number);
        showConfirm.value = false;
        bind.value.deleteId = null;
    })
}
function deleteConfirm(id) {
    showConfirm.value = true;
    bind.value.deleteId = id;
}
</script>

<style scoped>
@media screen and (max-width: 600px) {

    .pc {
        display: none !important;
    }

    .list-params .input-group span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
    }

    .list-table .table .row .btn {
        height: 20px;
        font-size: 0.6rem;
    }

    .list-params .input-group * {
        font-size: 0.7rem;
    }

    .list-table .description {
        padding: 8px 0px;
        font-size: 0.9rem;
    }

    .list-table .table .row *,
    .list-button-group button {
        font-size: 0.8rem;
    }

    .list-table .table .row span {
        width: calc(100% / 5) !important;
    }

    .list-button-group * {
        margin: 0px 8px;
    }

    .list-button-group button {
        padding: 6px 18px;
    }

    .list-button-group button:hover {
        padding: 6px 24px;
    }

    .list-button-group input {
        width: 72px;
        padding: 2px 0px;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .list-params .input-group span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 48px;
    }

    .list-table .table .row .btn {
        height: 30px;
    }

    .list-params .input-group * {
        font-size: 0.8rem;
    }

    .list-table .description {
        padding: 8px 0px;
        font-size: 1rem;
    }

    .list-table .table .row *,
    .list-button-group button {
        font-size: 0.9rem;
    }

    .list-button-group * {
        margin: 0px 16px;
    }

    .list-button-group button {
        padding: 6px 26px;
    }

    .list-button-group button:hover {
        padding: 6px 32px;
    }

    .list-button-group input {
        width: 80px;
        padding: 2px 0px;
    }
}

@media screen and (min-width: 1200px) {
    .list-table .description {
        padding: 8px 0px;
        font-size: 1.1rem;
    }

    .list-table .table .row .btn {
        height: 30px;
    }

    .list-table .table .row *,
    .list-button-group button {
        font-size: 1rem;
    }

    .list-button-group * {
        margin: 0px 24px;
    }

    .list-button-group button {
        padding: 6px 38px;
    }

    .list-button-group button:hover {
        padding: 6px 42px;
    }

    .list-button-group input {
        width: 120px;
        padding: 4px 0px;
    }
}

.classroom-list-body {
    padding: 18px 8px;
}

.list-params {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.list-table {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-top: 16px;
    border-radius: 8px;
    padding: 4px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.list-table .description {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-weight: 600;
    border-bottom: 2px solid rgba(0, 0, 0, 0.4);
}

.list-table .description span {
    width: 20%;
}

.list-table .table {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.list-table .table .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 8px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    white-space: nowrap;

}

.list-table .table .row span {
    width: calc(100% / 7);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.list-table .table .row .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 1px;
}

.list-button-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
}

.list-button-group * {
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
}

.list-button-group button {
    border-radius: 12px;
    transition: all 0.1s linear;
}

.list-button-group input {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    text-align: center;
}
</style>