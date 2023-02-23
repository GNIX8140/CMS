<template>
    <div class="record-detail-body">
        <div class="detail-main">
            <div class="title">
                <span>详细信息</span>
                <button type="button" class="btn-close" @click="emits('closeDetail')"></button>
            </div>
            <div class="classroom-group" v-if="props.type == 'classroom' && detailData">
                <div class="info-group">
                    <span class="key">编号:</span>
                    <span class="value">{{ detailData.number }}</span>
                </div>
                <div class="info-group">
                    <span class="key">区域:</span>
                    <span class="value">{{ detailData.area }}</span>
                </div>
                <div class="info-group">
                    <span class="key">类型:</span>
                    <span class="value">{{ detailData.type }}</span>
                </div>
                <div class="info-group">
                    <span class="key">审核:</span>
                    <span class="value">{{ detailData.authority ? '需要审核' : '无需审核' }}</span>
                </div>
                <div class="info-group">
                    <span class="key">状态:</span>
                    <span class="value">{{ detailData.available ? '空闲' : '不可用' }}</span>
                </div>
            </div>
            <div class="user-group" v-if="props.type == 'user' && detailData">
                <div class="info-group">
                    <span class="key">编号:</span>
                    <span class="value">{{ detailData.number }}</span>
                </div>
                <div class="info-group">
                    <span class="key">姓名:</span>
                    <span class="value">{{ detailData.name }}</span>
                </div>
                <div class="info-group">
                    <span class="key">邮箱:</span>
                    <span class="value">{{ detailData.email }}</span>
                </div>
                <div class="info-group">
                    <span class="key">学院:</span>
                    <span class="value">{{ detailData.stitute }}</span>
                </div>
                <div class="info-group">
                    <span class="key">身份:</span>
                    <span class="value">{{ detailData.authority }}</span>
                </div>
            </div>
            <button class="btn btn-outline-success" @click="emits('closeDetail')">确认</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const props = defineProps(['type', 'id']);
const emits = defineEmits(['closeDetail', 'detailMsg']);
const detailData = ref();
onMounted(() => {
    queryDetail();
});
function queryDetail() {
    axios.get(`${window.ServerURL}/${props.type}/detail`, {
        params: {
            id: props.id
        }
    }).then(res => {
        if (res.data.status != 1) return emits('detailMsg', res.data.detail);
        detailData.value = res.data.data;
    });
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
    .info-group {
        width: 260px;
    }

    .info-group .key {
        width: 50px;
    }

    .info-group .value {
        font-size: 0.9rem;
    }}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .info-group {
        width: 380px;
    }

    .info-group .key {
        width: 70px;
    }

    .info-group .value {
        font-size: 1rem;
    }
}

@media screen and (min-width: 1200px) {
    .info-group {
        width: 480px;
    }

    .info-group .key {
        width: 80px;
    }

    .info-group .value {
        font-size: 1rem;
    }
}

.record-detail-body {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.2);
}

.detail-main {
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

.detail-main .title {
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 18px;
}

.detail-main .title span {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 2px;
}

.detail-main .classroom-group,
.detail-main .user-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 18px 18px;
}

.info-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 8px 6px;
}

.info-group .key {
    font-weight: 600;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 1.1rem;
}

.info-group .value {
    width: 100%;
    font-weight: 500;
}
</style>