<template>
    <div class="add-admin-body">
        <div class="input-group">
            <span class="input-group-text">用户名</span>
            <input class="form-control" type="text" v-model="bind.username">
        </div>
        <div class="input-group">
            <span class="input-group-text">姓名</span>
            <input class="form-control" type="text" v-model="bind.name">
        </div>
        <div class="input-group">
            <span class="input-group-text">密码</span>
            <input class="form-control" type="text" v-model="bind.password">
        </div>
        <div class="input-group">
            <span class="input-group-text">重复密码</span>
            <input class="form-control" type="text" v-model="bind.passwordRepeat">
        </div>
        <div class="btn-group">
            <button class="btn btn-outline-success" @click="addAdmin">确认</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import md5 from 'js-md5'
const emits = defineEmits(['showAlertMsg']);
const bind = ref({
    username: null,
    name: null,
    password: null,
    passwordRepeat: null,
});
onMounted(() => {

});
function addAdmin() {
    if (bind.value.username == null || bind.value.username.trim().length == 0) return emits('showAlertMsg', '请输入用户名');
    if (bind.value.name == null || bind.value.name.trim().length == 0) return emits('showAlertMsg', '请输入姓名');
    if (bind.value.password == null || bind.value.password.trim().length == 0) return emits('showAlertMsg', '请输入密码');
    if (bind.value.passwordRepeat == null || bind.value.passwordRepeat.trim().length == 0) return emits('showAlertMsg', '请重复密码');
    if (bind.value.password !== bind.value.passwordRepeat) return emits('showAlertMsg', '两次密码不一致');
    axios.post(`${window.ServerURL}/admin/register`, {
        username: bind.value.username,
        name: bind.value.name,
        password: md5(bind.value.password),
    }).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        emits('showAlertMsg', res.data.data);
        bind.value.username = null;
        bind.value.name = null;
        bind.value.password = null;
        bind.value.passwordRepeat = null;
    })
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
    .add-admin-body {
        padding: 28px 28px;
    }

    .add-admin-body .input-group {
        width: 260px;
    }

    .add-admin-body .input-group span {
        width: 80px;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .add-admin-body {
        padding: 48px 54px;
    }

    .add-admin-body .input-group {
        width: 360px;
    }

    .add-admin-body .input-group span {
        width: 90px;
    }
}

@media screen and (min-width: 1200px) {
    .add-admin-body {
        padding: 48px 62px;
    }

    .add-admin-body .input-group {
        width: 460px;
    }

    .add-admin-body .input-group span {
        width: 100px;
    }
}

.add-admin-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.add-admin-body .input-group {
    margin: 18px 0px;
}

.add-admin-body .input-group span {
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-group {
    margin-top: 24px;
}

.btn-group button {
    padding: 8px 48px;
    border-radius: 12px;
}
</style>