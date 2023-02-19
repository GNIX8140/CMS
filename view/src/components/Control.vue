<template>
    <div class="control-body">
        <div class="alert alert-warning" ref="alertMsgDiv">
            {{ alertMsg }}
        </div>
        <div class="control-title">
            <img src="../assets/logo.svg">
            <router-link to="/"><span class="title-span">后台管理</span></router-link>
            <div class="title-user navbar" v-if="adminData">
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">您好:{{ adminData.name }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <button class="btn">退出登录</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="control-main">
            <div class="main-left">
                <button class="btn" :class="{ 'menu-active': mainMenu == 'classroom' }"
                    @click="switchMainMenu('classroom')">教室列表</button>
                <button class="btn" :class="{ 'menu-active': mainMenu == 'record' }"
                    @click="switchMainMenu('record')">申请审核</button>
                <button class="btn" :class="{ 'menu-active': mainMenu == 'profile' }"
                    @click="switchMainMenu('profile')">个人资料</button>
            </div>
            <div class="main-right">
                <ClassroomList v-if="mainMenu == 'classroom'" :classroomList="classroomList" :areaList="areaList"
                    :typeList="typeList" @queryClassroomList="queryClassroomList" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import ClassroomList from './ClassroomList.vue'
axios.defaults.withCredentials = true;
const adminData = ref();
const alertMsg = ref();
const alertMsgDiv = ref();
const mainMenu = ref('classroom');
const classroomList = ref();
const areaList = ref();
const typeList = ref();
let alertTimer = null;
onMounted(async () => {
    await axios.get(`${window.ServerURL}/admin/profile`).then(res => {
        if (res.data.status === 1) {
            adminData.value = res.data.data;
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
    });
    queryClassroomList(1, 10);
    queryAreaList();
    queryTypeList();
});
function queryClassroomList(page, length) {
    axios.get(`${window.ServerURL}/classroom/queryList`, {
        params: {
            page: page,
            length: length,
        }
    }).then(res => {
        if (res.data.status != 1) {
            showAlertMsg(res.data.detail);
        }
        return classroomList.value = res.data.data;
    });
}
function queryAreaList() {
    axios.get(`${window.ServerURL}/area/queryList`).then(res => {
        if (res.data.status != 1) {
            showAlertMsg(res.data.detail);
        }
        return areaList.value = res.data.data;
    });
}
function queryTypeList() {
    axios.get(`${window.ServerURL}/type/queryList`).then(res => {
        if (res.data.status != 1) {
            showAlertMsg(res.data.detail);
        }
        return typeList.value = res.data.data;
    });
}
function switchMainMenu(name) {
    mainMenu.value = name;
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

<style>
@media screen and (max-width: 600px) {
    .control-body {
        padding: 12px 8px;
    }

    .control-title {
        height: 68px;
        padding: 0px 12px;
    }

    .control-main .main-left {
        display: none !important;
    }

    .control-main .main-right {
        width: 100%;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .control-body {
        padding: 16px 22px;
    }

    .control-title {
        height: 68px;
        padding: 0px 18px;
    }
}

@media screen and (min-width: 1200px) {
    .control-body {
        padding: 18px 24px;
    }

    .control-title {
        height: 68px;
        padding: 0px 26px;
    }
}

.control-body {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: linear-gradient(to bottom right, rgba(162, 210, 255, 0.4), rgba(205, 180, 219, 0.4));
}

.control-body .alert {
    position: absolute;
    border-radius: 18px;
    font-size: 1rem;
    top: -60px;
    opacity: 0.9;
    width: 90%;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
    transition: all 0.3s linear;
}

.control-title {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 18px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
    background-color: rgba(255, 255, 255, 0.496);
}

.control-title a {
    color: black;
    text-decoration: none;
}

.control-title img {
    width: 48px;
    height: 48px;
}

.control-title .title-span {
    font-weight: 700;
    font-size: 1.3rem;
    margin-left: 12px;
}

.control-title .title-user {
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
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
}

.control-main {
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
    border-radius: 18px;
    width: 100%;
    min-height: 80vh;
    margin-top: 28px;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.control-main .main-left {
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

.control-main .main-left button {
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 16px 0px;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 1px;
    border-radius: 0px;
}

.control-main .main-left button:hover {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    background-color: rgba(179, 179, 179, 0.1);
}

.menu-active {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    background-color: rgba(196, 196, 196, 0.1);
}

.control-main .main-right {
    width: 100%;
    min-height: 80vh;
}
</style>