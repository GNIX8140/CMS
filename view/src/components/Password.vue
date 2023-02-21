<template>
    <div class="password-body">
        <div class="input-group">
            <span class="input-group-text">旧密码</span>
            <input type="text" class="form-control" ref="oldPassword">
        </div>
        <div class="input-group">
            <span class="input-group-text">新密码</span>
            <input type="text" class="form-control" ref="newPassword">
        </div>
        <div class="input-group">
            <span class="input-group-text">确认密码</span>
            <input type="text" class="form-control" ref="newPasswordRepeat">
        </div>
        <div class="btn-group">
            <button class="btn btn-outline-success" @click="updatePassword">确认</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import md5 from 'js-md5'
const props = defineProps(['type']);
const emits = defineEmits(['showAlertMsg']);
const oldPassword = ref();
const newPassword = ref();
const newPasswordRepeat = ref();
onMounted(() => {

});
function updatePassword() {
    if (oldPassword.value.value == null
        || oldPassword.value.value.trim().length == 0) return emits('showAlertMsg', '请输入旧密码');
    if (newPassword.value.value == null
        || newPassword.value.value.trim().length == 0) return emits('showAlertMsg', '请输入新密码');
    if (newPasswordRepeat.value.value == null
        || newPasswordRepeat.value.value.trim().length == 0) return emits('showAlertMsg', '请重复新密码');
    axios.post(`${window.ServerURL}/${props.type}/modifyPassword`, {
        oldPassword: md5(oldPassword.value.value),
        newPassword: md5(newPassword.value.value),
    }).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        emits('showAlertMsg', res.data.data);
        oldPassword.value.value = null;
        newPassword.value.value = null;
        newPasswordRepeat.value.value = null;
    })
}
</script>

<style>
@media screen and (max-width: 600px) {
    .password-body {
        padding: 28px 28px;
    }

    .password-body .input-group {
        width: 260px;
        margin: 18px 0px;
    }

    .password-body .input-group span {
        width: 80px;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .password-body {
        padding: 48px 54px;
    }

    .password-body .input-group {
        width: 360px;
        margin: 18px 0px;
    }

    .password-body .input-group span {
        width: 90px;
    }
}

@media screen and (min-width: 1200px) {
    .password-body {
        padding: 48px 62px;
    }

    .password-body .input-group {
        width: 460px;
        margin: 18px 0px;
    }

    .password-body .input-group span {
        width: 100px;
    }

}

.password-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.password-body .input-group span {
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