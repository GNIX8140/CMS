<template>
    <div class="user-profile-body" v-if="userData">
        <div class="profile-row">
            <span class="title">编号：</span>
            <span class="data">{{ userData.number }}</span>
        </div>
        <div class="profile-row input-group">
            <span class="title">邮箱：</span>
            <span class="data" v-show="!inModify">{{ userData.email }}</span>
            <input ref="emailInput" type="text" class="form-control" v-show="inModify" :value="userData.email">
        </div>
        <div class="profile-row input-group">
            <span class="title">姓名：</span>
            <span class="data" v-show="!inModify">{{ userData.name }}</span>
            <input ref="nameInput" type="text" class="form-control" v-show="inModify" :value="userData.name">
        </div>
        <div class="profile-row input-group">
            <span class="title">学院：</span>
            <span class="data" v-show="!inModify">{{ stituteList[userData.stitute - 1].name }}</span>
            <select class="form-select" v-show="inModify" :value="userData.stitute" ref="stituteInput">
                <option v-for="(item, index) in stituteList" :value="item.id">{{ item.name }}</option>
            </select>
        </div>
        <div class="profile-row input-group">
            <span class="title">身份：</span>
            <span class="data" v-show="!inModify">{{ identityList[userData.authority].name }}</span>
            <select class="form-select" v-show="inModify" :value="userData.authority" ref="authorityInput">
                <option v-for="(item, index) in identityList" :value="item.id">{{ item.name }}</option>
            </select>
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
const userData = ref();
const stituteList = ref();
const identityList = ref([
    { id: 0, name: '学生' },
    { id: 1, name: '教师' },
    { id: 2, name: '社团/组织成员' },
    { id: 3, name: '其他' }
]);
const emailInput = ref();
const nameInput = ref();
const stituteInput = ref();
const authorityInput = ref();
onMounted(async () => {
    await QueryStituteList();
    queryUserProfile();
});
async function queryUserProfile() {
    axios.get(`${window.ServerURL}/user/profile`).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        userData.value = res.data.data;
    })
}
async function QueryStituteList() {
    await axios.get(`${window.ServerURL}/stitute/queryList`).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        stituteList.value = res.data.data;
    }).catch(err => {
        return emits('showAlertMsg', err);
    });
}
function updateProfile() {
    let email = emailInput.value.value;
    let name = nameInput.value.value;
    let stitute = stituteInput.value.value;
    let authority = authorityInput.value.value;
    if (email == null || email.trim().lenth == 0) return emits('showAlertMsg', '请输入邮箱');
    if (name == null || name.trim().length == 0) return emits('showAlertMsg', '请输入姓名');
    if (stitute == null || stitute.trim().length == 0) return emits('showAlertMsg', '请选择学院');
    if (authority == null || authority.trim().length == 0) return emits('showAlertMsg', '请选择身份');
    axios.post(`${window.ServerURL}/user/update`, {
        number: userData.value.number,
        email: email,
        name: name,
        stitute: stitute,
        authority: authority
    }).then(res => {
        if (res.data.status != 1)return emits('showAlertMsg', res.data.detail);
        emits('showAlertMsg', res.data.data);
        inModify.value = false;
        queryUserProfile();
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