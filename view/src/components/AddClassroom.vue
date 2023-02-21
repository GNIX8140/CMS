<template>
    <div class="add-classroom-body">
        <div class="input-group">
            <span class="input-group-text">编号</span>
            <input class="form-control" type="text" v-model="bind.number">
        </div>
        <div class="input-group">
            <span class="input-group-text">区域</span>
            <select class="form-select" v-model="bind.area">
                <option v-for="(item, index) in areaList" :value="item.id">{{ item.name }}</option>
            </select>
        </div>
        <div class="input-group">
            <span class="input-group-text">类型</span>
            <select class="form-select" v-model="bind.type" @change="updateCapacity">
                <option v-for="(item, index) in typeList" :value="item.id">{{ item.name }}</option>
            </select>
        </div>
        <div class="input-group">
            <span class="input-group-text">容纳</span>
            <input class="form-control" type="text" v-model="bind.capacity">
        </div>
        <div class="input-group">
            <span class="input-group-text">状态</span>
            <select class="form-select" v-model="bind.available">
                <option value="true">可申请</option>
                <option value="false">不可用</option>
            </select>
        </div>
        <div class="input-group">
            <span class="input-group-text">审核</span>
            <select class="form-select" v-model="bind.authority">
                <option value="true">需要审核</option>
                <option value="false">无需审核</option>
            </select>
        </div>
        <div class="btn-group">
            <button class="btn btn-outline-success" @click="addClassroom">确认</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
const emits = defineEmits(['showAlertMsg']);
const areaList = ref();
const typeList = ref();
const bind = ref({
    number: null,
    area: 1,
    type: 1,
    capacity: 30,
    available: true,
    authority: false,
})
onMounted(() => {
    queryAreaList();
    queryTypeList();
});
function queryAreaList() {
    axios.get(`${window.ServerURL}/area/queryList`).then(res => {
        if (res.data.status != 1) {
            emits('showAlertMsg', res.data.detail);
        }
        return areaList.value = res.data.data;
    });
}
function queryTypeList() {
    axios.get(`${window.ServerURL}/type/queryList`).then(res => {
        if (res.data.status != 1) {
            emits('showAlertMsg', res.data.detail);
        }
        return typeList.value = res.data.data;
    });
}
function updateCapacity() {
    bind.value.capacity = typeList.value[bind.value.type].capacity;
}
function addClassroom() {
    console.log(bind.value);
    if (bind.value.number == null || bind.value.number.trim().length == 0) return emits('showAlertMsg', '请输入教室编号');
    if (bind.value.capacity == null) return emits('showAlertMsg', '请输入教室容纳人数');
    axios.post(`${window.ServerURL}/classroom/add`, {
        area: bind.value.area,
        number: bind.value.number,
        type: bind.value.type,
        capacity: bind.value.capacity,
        authority: bind.value.authority,
        available: bind.value.available,
    }).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        emits('showAlertMsg', res.data.data);
        bind.value = {
            number: null,
            area: 1,
            type: 1,
            capacity: 30,
            available: true,
            authority: false,
        }
    })
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
    .add-classroom-body {
        padding: 28px 28px;
    }

    .add-classroom-body .input-group {
        width: 260px;
        margin: 18px 0px;
    }

    .add-classroom-body .input-group span {
        width: 80px;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .add-classroom-body {
        padding: 48px 54px;
    }

    .add-classroom-body .input-group {
        width: 360px;
        margin: 18px 0px;
    }

    .add-classroom-body .input-group span {
        width: 90px;
    }
}

@media screen and (min-width: 1200px) {
    .add-classroom-body {
        padding: 48px 62px;
    }

    .add-classroom-body .input-group {
        width: 460px;
        margin: 18px 0px;
    }

    .add-classroom-body .input-group span {
        width: 100px;
    }

}

.add-classroom-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.add-classroom-body .input-group span {
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