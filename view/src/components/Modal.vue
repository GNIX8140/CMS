<template>
    <div class="modal-body">
        <div class="modal-main">
            <div class="modal-title">
                <span v-if="type == 'applyLength'">请选择时长</span>
                <span v-if="type == 'modify'">修改教室信息</span>
                <button type="button" class="btn-close" @click="emits('closeModal')"></button>
            </div>
            <div class="modal-applyLength" v-if="type == 'applyLength'">
                <select class="form-select" v-model="bind.applyLength">
                    <option value="null" selected>请选择</option>
                    <option v-for="(item, index) in applyTimeList" :value="item.value">{{ item.length }}</option>
                </select>
                <div class="button-group">
                    <button class="btn btn-outline-danger" @click="emits('closeModal')">取消</button>
                    <button class="btn btn-outline-success" @click="confirmApplyLength">申请</button>
                </div>
            </div>
            <div class="modal-modify" v-if="type == 'modify' && modalData">
                <div class="input-group">
                    <span class="input-group-text">编号</span>
                    <input class="form-control" type="text" v-model="modalData.number" >
                </div>
                <div class="input-group">
                    <span class="input-group-text">区域</span>
                    <select class="form-select" v-model="modalData.area">
                        <option v-for="(item, index) in areaList" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div class="input-group">
                    <span class="input-group-text">类型</span>
                    <select class="form-select" v-model="modalData.type">
                        <option v-for="(item, index) in typeList" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
                <div class="input-group">
                    <span class="input-group-text">容纳</span>
                    <input class="form-control" type="text" v-model="modalData.capacity">
                </div>
                <div class="input-group">
                    <span class="input-group-text">状态</span>
                    <select class="form-select" v-model="modalData.available">
                        <option :value="true">空闲</option>
                        <option :value="false">不可用</option>
                    </select>
                </div>
                <div class="input-group">
                    <span class="input-group-text">权限</span>
                    <select class="form-select" v-model="modalData.authority">
                        <option :value="false">无需审核</option>
                        <option :value="true">需要审核</option>
                    </select>
                </div>
                <div class="button-group">
                    <button class="btn btn-outline-danger" @click="emits('closeModal')">取消</button>
                    <button class="btn btn-outline-success" @click="confirmModify">确认</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
const props = defineProps(['type', 'modalData', 'typeList', 'areaList']);
const emits = defineEmits(['applyClassroom', 'closeModal', 'showAlertMsg']);
const bind = ref({
    applyLength: null,
})
const applyTimeList = ref([
    { length: '20分钟', value: 20 },
    { length: '45分钟', value: 45 },
    { length: '1小时', value: 60 },
    { length: '2小时', value: 60 * 2 },
    { length: '3小时', value: 60 * 3 },
    { length: '4小时', value: 60 * 4 },
]);
onMounted(() => {
});
function confirmApplyLength() {
    if (bind.value.applyLength == null) return emits('showAlertMsg', '请选择申请时长');
    emits('applyClassroom', bind.value.applyLength);
}
function confirmModify() {
    axios.post(`${window.ServerURL}/classroom/update`, {
        id: props.modalData.id,
        area: props.modalData.area,
        number: props.modalData.number,
        type: props.modalData.type,
        capacity: props.modalData.capacity,
        authority: props.modalData.authority,
        available: props.modalData.available,
    }).then(res => {
        if(res.data.status !=1) return emits('showAlertMsg', res.data.detail);
        emits('showAlertMsg', res.data.data);
        return emits('closeModal');
    })
}
</script>

<style>
@media screen and (max-width: 600px) {}

@media screen and (min-width: 600px) and (max-width: 1200px) {}

@media screen and (min-width: 1200px) {}

.modal-body {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-main {
    width: 70%;
    height: auto;
    background-color: rgb(250, 250, 250);
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 18px 18px;
}

.modal-title {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.modal-title span {
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 2px;
}

.modal-applyLength {
    padding: 24px 0px;
    width: 100%;
}

.modal-applyLength .button-group,
.modal-modify .button-group {
    margin-top: 18px;
}

.modal-applyLength .button-group button,
.modal-modify .button-group button {
    margin: 12px;
    padding: 6px 24px;
}

.modal-modify .input-group {
    margin-top: 12px;
}

.modal-modify .input-group span {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>