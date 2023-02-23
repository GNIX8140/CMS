<template>
    <div class="login-body">
        <div class="alert alert-warning" ref="alertMsgDiv">
            {{ alertMsg }}
        </div>
        <div class="login-nav">
            <img src="../assets/logo.svg">
            <router-link to="/"><span class="title-span">CMS</span></router-link>
        </div>
        <div class="login-main">
            <div class="login-container">
                <div class="login-left">
                    <span class="login-title" v-show="type == 'user'">CMS 用户登录</span>
                    <span class="login-title" v-show="type == 'admin'">CMS管理员登录</span>
                    <span class="login-title" v-show="type == 'register'">CMS 用户注册</span>
                    <button class="login-change btn btn-primary" @click="type = 'admin'"
                        v-show="type == 'user'">管理员登录</button>
                    <button class="login-change btn btn-primary" @click="type = 'user'"
                        v-show="type == 'admin'">用户登录</button>
                    <button class="login-change btn btn-primary" @click="type = 'user'"
                        v-show="type == 'register'">返回登录</button>
                </div>
                <div class="login-right">
                    <div class="login-sm-title" @click="switchType">
                        <span v-show="type == 'admin'">管理员登录</span>
                        <span v-show="type == 'user'">用户登录</span>
                        <span v-show="type == 'register'">用户注册</span>
                        <i class="las la-exchange-alt"></i>
                    </div>
                    <div class="login-user" v-show="type == 'user'">
                        <div class="input-group">
                            <span class="input-group-text">用户名</span>
                            <input ref="userAccount" type="text" class="form-control" placeholder="学号/邮箱">
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">密码</span>
                            <input ref="userPassword" type="password" class="form-control" placeholder="密码">
                        </div>
                        <div class="button-group">
                            <button class="btn btn-secondary" @click="type = 'register'">注册</button>
                            <button ref="userLoginBtn" class="btn btn-success" @click="login">登录</button>
                        </div>
                    </div>
                    <div class="login-admin" v-show="type == 'admin'">
                        <div class="input-group">
                            <span class="input-group-text">帐号</span>
                            <input ref="adminAccount" type="text" class="form-control" placeholder="管理员帐号">
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">密码</span>
                            <input ref="adminPassword" type="password" class="form-control" placeholder="密码">
                        </div>
                        <div class="button-group">
                            <button ref="adminLoginBtn" class="btn btn-success" @click="login">登录</button>
                        </div>
                    </div>
                    <div class="login-register" v-show="type == 'register'">
                        <div class="input-group">
                            <span class="input-group-text">编号</span>
                            <input type="text" class="form-control" placeholder="学号/工号" v-model="registerData.number">
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">邮箱</span>
                            <input type="text" class="form-control" placeholder="邮箱" v-model="registerData.email">
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">姓名</span>
                            <input type="text" class="form-control" placeholder="真实姓名" v-model="registerData.name">
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">密码</span>
                            <input type="password" class="form-control" placeholder="密码" v-model="registerData.password">
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">学院</span>
                            <select class="form-select" aria-label="Default select example" v-model="registerData.stitute">
                                <option v-for="(item, index) in stituteList" :value="item.id">{{ item.name }}</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">身份</span>
                            <select class="form-select" aria-label="Default select example" v-model="registerData.identity">
                                <option v-for="(item, index) in identityList" :value="item.id">{{ item.name }}</option>
                            </select>
                        </div>
                        <div class="button-group">
                            <button class="btn btn-success" @click="register">注册</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import route from '../router/index'
import axios from 'axios'
import md5 from 'js-md5';
axios.defaults.withCredentials = true;
const type = ref('user');
const userAccount = ref();
const userPassword = ref();
const adminAccount = ref();
const adminPassword = ref();
const userLoginBtn = ref();
const adminLoginBtn = ref();
const alertMsg = ref();
const alertMsgDiv = ref();
const stituteList = ref();
const identityList = ref([
    { id: 0, name: '学生' },
    { id: 1, name: '教师' },
    { id: 2, name: '社团/组织成员' },
    { id: 3, name: '其他' }
]);
const registerData = ref({
    number: null,
    email: null,
    name: null,
    password: null,
    stitute: null,
    identity: 0,
});
let alertTimer = null;
const router = useRoute();

onMounted(() => {
    if (router.query.type !== undefined) {
        type.value = router.query.type;
    }
    QueryStituteList();
    window.addEventListener('keydown', keyEvent)
});
onUnmounted(() => {
    window.removeEventListener('keydown', keyEvent);
});
function keyEvent(e) {
    if (e.key !== 'Enter') return;
    if (type.value == 'user') {
        userLoginBtn.value.click();
        return;
    }
    if (type.value == 'admin') {
        adminLoginBtn.value.click();
        return;
    }
}
async function QueryStituteList() {
    stituteList.value = await axios.get(`${window.ServerURL}/stitute/queryList`).then(res => {
        if (res.data.status != 1) throw Error('查询学院列表错误');
        registerData.value.stitute = res.data.data[0].id;
        return res.data.data;
    }).catch(err => {
        showAlertMsg(err);
    });
}
async function login() {
    let username, password;
    if (type.value == 'admin') {
        username = adminAccount.value.value;
        password = adminPassword.value.value;
    } else if (type.value == 'user') {
        username = userAccount.value.value;
        password = userPassword.value.value;
    }
    if (username.trim().length == 0) return showAlertMsg('请输入用户名');
    if (password.trim().length == 0) return showAlertMsg('请输入密码');
    await axios.get(`${window.ServerURL}/${type.value}/login`, {
        params: {
            username: username,
            password: md5(password),
        }
    }).then(res => {
        if (res.data.status != 1) return showAlertMsg(res.data.detail);
        if (type.value === 'user') {
            return route.push({
                path: '/classroom',
            })
        } else if (type.value === 'admin') {
            return route.push({
                path: '/control',
            })
        }
    }).catch(err => {
        showAlertMsg(err);
    });

}
async function register() {
    let data = registerData.value;
    if (data.number == null || data.number.trim().length == 0) return showAlertMsg('请输入编号');
    if (data.email == null || data.email.trim().length == 0) return showAlertMsg('请输入邮箱');
    if (data.name == null || data.name.trim().length == 0) return showAlertMsg('请输入姓名');
    if (data.password == null || data.password.trim().length == 0) return showAlertMsg('请输入密码');
    if (data.stitute == null) return showAlertMsg('请选择学院');
    if (data.identity == null) return showAlertMsg('请选择身份');
    let res = axios.post(`${window.ServerURL}/user/register`, {
        number: data.number,
        email: data.email,
        name: data.name,
        password: md5(data.password),
        stitute: data.stitute,
        authority: data.identity,
    }).then(res => {
        if (res.data.status != 1) throw Error('注册错误');
        showAlertMsg('注册成功，请登录');
        type.value = 'user';
        userAccount.value.value = data.number;
        userPassword.value.value = data.password;
    })
}
function switchType() {
    if (type.value === 'admin') return type.value = 'user';
    if (type.value === 'user') return type.value = 'admin';
    if (type.value === 'register') return type.value = 'user';
}
function showAlertMsg(msg) {
    alertMsg.value = msg;
    alertMsgDiv.value.style = "top: 48px";
    if (alertTimer) {
        clearTimeout(alertTimer);
        alertTimer = null;
    }
    alertTimer = setTimeout(() => {
        alertMsg.value = null;
        alertMsgDiv.value.style = "top: -60px";
    }, 1000 * 2);
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
    .login-nav {
        height: 68px;
        padding: 0px 12px;
    }

    .login-container {
        width: 340px;
        height: 520px;
    }

    .login-left {
        display: none !important;
    }

    .login-right {
        width: 100% !important;
    }

    .login-sm-title {
        display: block !important;
        width: 100%;
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: 5px;
        padding: 10px;
    }

    .login-user,
    .login-admin {
        padding: 48px 0px;
    }

    .login-user,
    .login-admin,
    .login-register {
        width: 90%;
    }

    .input-group {
        margin: 18px 0px;
    }

    .button-group button {
        margin: 0px 8px;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .login-nav {
        height: 68px;
        padding: 0px 18px;
    }

    .login-container {
        min-width: 600px;
        height: 460px;
    }

    .login-change {
        font-size: 1rem !important;
        border-radius: 16px !important;
    }

    .login-user,
    .login-admin,
    .login-register {
        width: 90%;
    }

    .input-group {
        margin: 22px 0px;
    }

    .button-group button {
        margin: 0px 6px;
    }
}

@media screen and (min-width: 1200px) {
    .login-nav {
        height: 68px;
        padding: 0px 26px;
    }

    .login-container {
        width: 900px;
        height: 600px;
    }

    .login-user,
    .login-admin,
    .login-register {
        width: 70%;
    }

    .input-group {
        margin: 26px 0px;
    }

    .button-group button {
        margin: 0px 18px;
    }
}

.login-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.login-nav a {
    color: black;
    text-decoration: none;
}

.login-nav img {
    width: 48px;
    height: 48px;
}

.login-nav .title-span {
    font-weight: 700;
    font-size: 1.3rem;
    margin-left: 12px;
    transition: all 0.1s linear;
}

.login-nav .title-span:hover {
    font-size: 1.4rem;
}

.login-body {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    background-image: linear-gradient(to bottom right, rgba(162, 210, 255, 0.2), rgba(205, 180, 219, 0.2));
}

.login-body .alert {
    position: absolute;
    border-radius: 18px;
    font-size: 1rem;
    top: -60px;
    opacity: 0.9;
    width: 90%;
    z-index: 100;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
    transition: all 0.3s linear;
}

.login-main {
    widows: 100%;
    height: calc(100vh - 68px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-container {
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 18px;
    display: flex;
    flex-direction: row;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
}

.login-left {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.login-title {
    font-size: 1.7rem;
    font-weight: 800;
    letter-spacing: 2px;
    padding: 10px 12px;
}

.login-change {
    font-size: 1.1rem;
    font-weight: 500;
    border-radius: 14px;
    padding: 10px 36px;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.2);
    margin-top: 8px;
    transition: all 0.1s linear;
    opacity: 0.8;
}

.login-change:hover {
    padding: 10px 42px;
}

.login-right {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.1s linear;
}

.login-sm-title {
    display: none;
}

.input-group {
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.1);
    border-radius: .375rem;
}

.login-user .button-group,
.login-admin .button-group {
    margin-top: 36px;
}

.input-group input {
    opacity: 0.9;
}

.input-group-text {
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
}

.button-group button {
    padding: 8px 46px;
    border-radius: 14px;
    font-weight: 500;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.2);
    transition: all 0.1s linear;
    opacity: 0.8;
}

.button-group button:hover {
    padding: 8px 52px;
}</style>