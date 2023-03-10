<template>
    <div class="stitute-list-body">
        <Confirm v-if="showConfirm" @confirmBack="deleteStitute" />
        <div class="modal-body" v-if="showModal">
            <div class="modal-main">
                <div class="modal-title">
                    <span>修改学院信息</span>
                    <button type="button" class="btn-close" @click="showModal = false"></button>
                </div>
                <div class="modal-modify">
                    <div class="input-group">
                        <span class="input-group-text">学院名称</span>
                        <input class="form-control" type="text" v-model="modalName">
                    </div>
                    <div class="modal-btn-group">
                        <button class="btn btn-outline-danger" @click="showModal = false">取消</button>
                        <button class="btn btn-outline-success" @click="modifyStituteName">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="list-add">
            <span>学院信息列表</span>
            <button class="btn btn-outline-success" @click="showAddInput = true">添加学院</button>
        </div>
        <div class="list-table">
            <div class="description">
                <span class="pc">ID</span>
                <span>名称</span>
                <span>操作</span>
            </div>
            <div class="table" v-if="stituteList">
                <div class="row" v-for="(item, index) in stituteList">
                    <span class="pc">{{ item.id }}</span>
                    <span>{{ item.name }}</span>
                    <span>
                        <button class="btn btn-outline-success" @click="updateModal(index)">修改</button>
                        <button class="btn btn-outline-danger" @click="deleteConfirm(item.id)">删除</button>
                    </span>
                </div>
                <div class="row" v-show="showAddInput">
                    <span class="pc"></span>
                    <span><input class="form-control" type="text" ref="addInputName"></span>
                    <span>
                        <button class="btn btn-outline-success" @click="addStitute">确认</button>
                        <button class="btn btn-outline-danger" @click="cancelAdd">取消</button>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import Confirm from './Confirm.vue'
const emits = defineEmits(['showAlertMsg']);
const stituteList = ref();
const showModal = ref(false);
const modalId = ref();
const modalName = ref();
const showAddInput = ref(false);
const addInputName = ref();
const showConfirm = ref(false);
const deleteId = ref();
onMounted(() => {
    queryStituteList();
});
function queryStituteList() {
    axios.get(`${window.ServerURL}/stitute/queryList`).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        stituteList.value = res.data.data;
    });
}
function updateModal(index) {
    modalId.value = stituteList.value[index].id;
    modalName.value = stituteList.value[index].name;
    showModal.value = true;
}
function modifyStituteName() {
    if (modalId.value == undefined) return emits('showAlertMsg', '请确认修改学院ID');
    if (modalName.value == undefined || modalName.value.trim().length == 0) return emits('showAlertMsg', '请输入修改学院名称');
    axios.post(`${window.ServerURL}/stitute/update`, {
        stituteId: modalId.value,
        stitute: modalName.value,
    }).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        showModal.value = false;
        modalId.value = null;
        modalName.value = null;
        emits('showAlertMsg', res.data.data);
        queryStituteList();
    })
}
function addStitute() {
    if (addInputName.value.value == null || addInputName.value.value.trim().length == 0) return emits('showAlertMsg', '请输入添加学院名称');
    axios.post(`${window.ServerURL}/stitute/add`, {
        stitute: addInputName.value.value,
    }).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        emits('showAlertMsg', res.data.data);
        queryStituteList();
        showAddInput.value = false;
        addInputName.value.value = null;
    })
}
function cancelAdd() {
    showAddInput.value = false;
    addInputName.value.value = null;
}
function deleteStitute(status) {
    if (!status) {
        deleteId.value = null;
        showConfirm.value = false;
        return;
    }
    if (deleteId.value == null || deleteId.value == undefined) return emits('showAlertMsg', '请确认删除学院ID');
    axios.get(`${window.ServerURL}/stitute/delete`, {
        params: {
            stituteId: deleteId.value,
        }
    }).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        queryStituteList();
        emits('showAlertMsg', res.data.data);
        deleteId.value = null;
        showConfirm.value = false;
    })
}
function deleteConfirm(id) {
    deleteId.value = id;
    showConfirm.value = true;
}
</script>

<style>
@media screen and (max-width: 600px) {
    .pc {
        display: none !important;
    }

    .list-table .table .row span {
        width: 50% !important;
    }

    .list-table .description {
        padding: 8px 0px;
        font-size: 0.9rem;
    }

    .list-table .table .row *,
    .list-button-group button {
        font-size: 0.8rem;
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

.stitute-list-body {
    padding: 18px 8px;
}

.list-add {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 4px;
}

.list-add span {
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 2px;
}

.list-add button {
    padding: 6px 32px;
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
    width: 30%;
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
    padding: 10px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    white-space: nowrap;

}

.list-table .table .row span {
    width: 30%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.list-table .table .row .btn {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 2px;
}
</style>

<style scoped>
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

.modal-modify {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px 12px;
}

.modal-btn-group {
    margin-top: 18px;
}

.modal-btn-group button {
    padding: 6px 22px;
    margin: 0px 6px;
}
</style>