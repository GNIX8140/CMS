<template>
    <div class="classroom-list-body">
        <div class="list-params">
            <div class="input-group">
                <span class="input-group-text">区域</span>
                <select class="form-select" v-model="bind.area">
                    <option v-for="(item, index) in areaList" :value="item.id">{{ item.name }}</option>
                </select>
            </div>
            <div class="input-group">
                <span class="input-group-text">类型</span>
                <select class="form-select" v-model="bind.type">
                    <option v-for="(item, index) in typeList" :value="item.id">{{ item.name }}</option>
                </select>
            </div>
            <div class="input-group">
                <span class="input-group-text">编号</span>
                <input type="text" class="form-control" placeholder="教室编号" v-model="bind.number">
            </div>
        </div>
        <div class="list-table">
            <div class="description">
                <span>编号</span>
                <span>区域</span>
                <span>类型</span>
                <span>状态</span>
                <span>操作</span>
            </div>
            <div class="table" v-if="classroomList">
                <div class="row" v-for="(item, index) in classroomList.items">
                    <span>{{ item.number }}</span>
                    <span>{{ item.area }}</span>
                    <span>{{ item.type }}</span>
                    <span>{{ item.available ? '可申请' : '使用中' }}</span>
                    <span><button class="btn">测试</button></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps(['classroomList', 'areaList', 'typeList']);
const emits = defineEmits(['queryClassroomList']);
const bind = ref({
    area: 1,
    type: 1,
    number: null,
})
onMounted(() => {
    emits('queryClassroomList', 1, 10);
})
</script>

<style>
@media screen and (max-width: 600px) {
    .list-params .input-group span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
    }

    .list-params .input-group * {
        font-size: 0.7rem;
    }

    .list-table .description {
        padding: 8px 0px;
        font-size: 0.9rem;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .list-params .input-group span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 48px;
    }

    .list-params .input-group * {
        font-size: 0.8rem;
    }

    .list-table .description {
        padding: 8px 0px;
        font-size: 1rem;
    }
}

@media screen and (min-width: 1200px) {
    .list-table .description {
        padding: 8px 0px;
        font-size: 1.1rem;
    }
}

.classroom-list-body {
    padding: 18px 8px;
}

.list-params {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.list-table {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-top: 16px;
    border-radius: 18px;
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
    padding: 12px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.list-table .table .row span {
    width: 140px;
}
</style>