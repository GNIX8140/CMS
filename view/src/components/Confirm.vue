<template>
    <div class="confirm-bg">
        <div class="confirm-body">
            <div class="title">
                <span>请确认</span>
            </div>
            <div class="main">
                <span>是否确认删除？</span>
                <div class="button-group">
                    <button class="btn btn-outline-danger" @click="confirm(false)">取消</button>
                    <button class="btn btn-outline-success" @click="confirm(true)">确认</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
const props = defineProps(['']);
const emits = defineEmits(['confirmBack']);
function confirm(status) {
    emits('confirmBack', status);
}
</script>

<style>
@media screen and (max-width: 600px) {}

@media screen and (min-width: 600px) and (max-width: 1200px) {}

@media screen and (min-width: 1200px) {}

.confirm-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.2);
}

.confirm-body {
    width: 80%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    background-color: rgba(255, 255, 255, 1);
}

.confirm-body .title {
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    width: 100%;
    display: flex;
    padding: 12px 18px;
}
.confirm-body .title span {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 2px;
}
.confirm-body .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 32px 18px;
}

.confirm-body .main span {
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 2px;
}

.confirm-body .main .button-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 28px;
}
.confirm-body .main .button-group button  {
    margin: 0px 8px;
    padding: 6px 24px;
}
</style>