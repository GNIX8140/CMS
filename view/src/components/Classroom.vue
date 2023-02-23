<template>
    <div class="classroom-body">
        <div class="alert alert-warning" ref="alertMsgDiv">
            {{ alertMsg }}
        </div>
        <div class="classroom-title">
            <img src="../assets/logo.svg">
            <router-link to="/"><span class="title-span">教室申请系统</span></router-link>
            <div class="title-user navbar" v-if="userData">
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">您好:{{ userData.name }}</h5>
                        <button ref="navClose" type="button" class="btn-close" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <button class="btn" :class="{ 'menu-active': mainMenu == 'classroom' }"
                            @click="switchMainMenu('classroom')">教室列表</button>
                        <button class="btn" :class="{ 'menu-active': mainMenu == 'record' }"
                            @click="switchMainMenu('record')">申请记录</button>
                        <button class="btn" :class="{ 'menu-active': mainMenu == 'profile' }"
                            @click="switchMainMenu('profile')">个人资料</button>
                        <button class="btn" :class="{ 'menu-active': mainMenu == 'password' }"
                            @click="switchMainMenu('password')">修改密码</button>
                        <button class="btn" @click="logout">退出登录</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="classroom-main">
            <div class="main-left">
                <button class="btn" :class="{ 'menu-active': mainMenu == 'classroom' }"
                    @click="switchMainMenu('classroom')">
                    <i class="las la-home"></i>教室列表</button>
                <button class="btn" :class="{ 'menu-active': mainMenu == 'record' }" @click="switchMainMenu('record')">
                    <i class="las la-list"></i>申请记录</button>
                <button class="btn" :class="{ 'menu-active': mainMenu == 'profile' }" @click="switchMainMenu('profile')">
                    <i class="las la-id-badge"></i>个人资料</button>
                <button class="btn" :class="{ 'menu-active': mainMenu == 'password' }" @click="switchMainMenu('password')">
                    <i class="las la-key"></i>修改密码</button>
            </div>
            <div class="main-right">
                <ClassroomList v-if="mainMenu == 'classroom'" :type="'classroom'" @showAlertMsg="showAlertMsg" />
                <RecordList v-if="mainMenu == 'record'" @showAlertMsg="showAlertMsg" />
                <UserProfile v-if="mainMenu == 'profile'" @showAlertMsg="showAlertMsg" />
                <Password v-if="mainMenu == 'password'" :type="'user'" @showAlertMsg="showAlertMsg" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import ClassroomList from './ClassroomList.vue'
import RecordList from './RecordList.vue'
import UserProfile from './UserProfile.vue'
import Password from './Password.vue'
import route from '../router/index'
axios.defaults.withCredentials = true;
const userData = ref();
const alertMsg = ref(null);
const alertMsgDiv = ref();
const mainMenu = ref('classroom');
const navClose = ref();
let alertTimer = null;
onMounted(async () => {
    await axios.get(`${window.ServerURL}/user/profile`).then(res => {
        if (res.data.status === 1) {
            userData.value = res.data.data;
            return res.data.data;
        } else if (res.data.status === 1001) {
            return route.push({
                path: '/login',
            });
        } else {
            return showAlertMsg(res.data.detail);
        }
    }).catch(err => {
        console.log(err);
        showAlertMsg('网络错误');
    });
});
function switchMainMenu(name) {
    mainMenu.value = name;
    navClose.value.click();
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
function logout() {
    axios.get(`${window.ServerURL}/logout`);
    route.push({
        path: '/',
    });
}
</script>

<style scoped>
@media screen and (max-width: 600px) {


    .classroom-title {
        height: 68px;
        padding: 0px 12px;
    }

    .classroom-main .main-left {
        display: none !important;
    }

    .classroom-main .main-right {
        width: 100%;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {

    .classroom-title {
        height: 68px;
        padding: 0px 18px;
    }

    .menu-active {
        font-size: 1.2rem !important;
    }
}

@media screen and (min-width: 1200px) {

    .classroom-title {
        height: 68px;
        padding: 0px 26px;
    }

    .menu-active {
        font-size: 1.2rem !important;
    }
}

.classroom-body {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: linear-gradient(to bottom right, rgba(162, 210, 255, 0.2), rgba(205, 180, 219, 0.2));
}

.classroom-body .alert {
    position: fixed;
    border-radius: 18px;
    font-size: 1rem;
    top: -60px;
    opacity: 0.9;
    width: 90%;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
    z-index: 100;
    transition: all 0.2s linear;
}

.classroom-title {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
    background-color: rgba(255, 255, 255, 0.496);
}

.classroom-title a {
    color: black;
    text-decoration: none;
}

.classroom-title img {
    width: 48px;
    height: 48px;
}

.classroom-title .title-span {
    font-weight: 700;
    font-size: 1.3rem;
    margin-left: 12px;
    transition: all 0.1s linear;
}

.classroom-title .title-span:hover {
    font-size: 1.4rem;
}

.classroom-title .title-user {
    margin-left: auto;
}

.offcanvas-body {
    display: flex;
    flex-direction: column;
    align-items: start;
}

.offcanvas-body button {
    width: 100%;
    padding: 12px 0px;
    margin: 8px 0px;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.1);
}

.classroom-main {
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
    width: 100%;
    min-height: calc(100vh - 68px);
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.classroom-main .main-left {
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    width: 240px;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 18px 0px;
    border-radius: 18px 0px 0px 18px;
    background-image: linear-gradient(to bottom right, rgba(162, 210, 255, 0.1), rgba(205, 180, 219, 0.1));
}

.classroom-main .main-left button {
    width: 100%;
    padding: 16px 0px;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 1px;
    border-radius: 0px;
    transition: all 0.1s linear;
}

.classroom-main .main-left button:hover {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    background-color: rgba(179, 179, 179, 0.1);
}

.menu-active {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    border-right: 6px solid rgba(16, 91, 205, 0.667) !important;
    background-color: rgba(196, 196, 196, 0.2);
}

.classroom-main .main-right {
    width: 100%;
    min-height: 80vh;
}
</style>