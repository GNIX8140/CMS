<template>
    <div class="user-profile-body" v-if="adminData">
        <div class="profile-row">
            <span class="title">帐号：</span>
            <span class="data">{{ adminData.username }}</span>
        </div>
        <div class="profile-row input-group">
            <span class="title">姓名：</span>
            <span class="data" v-show="!inModify">{{ adminData.name }}</span>
            <input ref="nameInput" type="text" class="form-control" v-show="inModify" :value="adminData.name">
        </div>
        <div class="profile-row input-group">
            <span class="title">权限：</span>
            <span class="data">管理员</span>
        </div>
        <div class="profile-btn-group">
            <button class="btn btn-outline-primary" v-show="!inModify" @click="inModify = true">修改</button>
            <button class="btn btn-outline-danger" v-show="inModify" @click="inModify = false">取消</button>
            <button class="btn btn-outline-success" v-show="inModify" @click="updateProfile">确认</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const emits = defineEmits(['showAlertMsg']);
const inModify = ref(false);
const adminData = ref();
const nameInput = ref();
onMounted(async () => {
    queryAdminProfile();
});
async function queryAdminProfile() {
    axios.get(`${window.ServerURL}/admin/profile`).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        adminData.value = res.data.data;
    })
}
function updateProfile() {
    if (nameInput.value.value.trim().length == 0) return emits('showAlertMsg', '请输入姓名');
    axios.post(`${window.ServerURL}/admin/modifyName`, {
        name: nameInput.value.value,
    }).then(res => {
        if (res.data.status != 1)return emits('showAlertMsg', res.data.detail);
        emits('showAlertMsg', res.data.data);
        inModify.value = false;
        queryAdminProfile();
    });
}
</script>

<style>
@media screen and (max-width: 600px) {
    .user-profile-body {
        padding: 28px 28px;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .user-profile-body {
        padding: 28px 54px;
    }
}

@media screen and (min-width: 1200px) {
    .user-profile-body {
        padding: 28px 62px;
    }

}

.profile-row {
    padding: 12px 0px;
    font-size: 1.2rem;
}

.profile-row .title {
    font-weight: 700;
    letter-spacing: 4px;
}

.profile-row {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.profile-btn-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
}

.profile-btn-group button {
    padding: 8px 42px;
    margin: 0px 12px;
}
</style>