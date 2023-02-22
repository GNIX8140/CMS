<template>
    <div class="record-list-body">
        <div class="list-table">
            <div class="description">
                <span>教室</span>
                <span class="pc">开始时间</span>
                <span>结束时间</span>
                <span>审核</span>
                <span>操作</span>
            </div>
            <div class="table" v-if="recordList">
                <div class="row" v-for="(item, index) in recordList.items">
                    <span>{{ item.classroom }}</span>
                    <span class="pc">{{ item.start }}</span>
                    <span>{{ item.end }}</span>
                    <span v-show="!item.status">待审核</span>
                    <span v-show="item.status && !item.finish">使用中</span>
                    <span v-show="item.finish">已完成</span>
                    <span>
                        <button class="btn btn-outline-primary" @click="refundsClassroom(item.id)"
                            :disabled="item.pass && item.finish" v-show="item.status && !item.finish">退还</button>
                        <button class="btn btn-outline-primary" @click="cancelApply(item.id)"
                            v-show="!item.status">取消</button>
                        <div v-show="item.finish">已结束</div>
                    </span>
                </div>
            </div>
            <div class="list-button-group" v-if="recordList">
                <button class="btn btn-secondary" :disabled="!recordList.hasPrevious"
                    @click="queryPreviousPage">上一页</button>
                <input ref="pageInput" type="text" class="form-control" :placeholder="recordList.num" @change="jumpPage">
                <button class="btn btn-secondary" :disabled="!recordList.hasNext" @click="queryNextPage">下一页</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
const emits = defineEmits(['showAlertMsg']);
const recordList = ref();
const pageInput = ref();
onMounted(() => {
    queryRecordList(1, 10);
});
function queryRecordList(page, length) {
    axios.get(`${window.ServerURL}/classroomRecord/userQuery`, {
        params: {
            page: page,
            length: length
        }
    }).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        recordList.value = res.data.data;
    });
}
function refundsClassroom(classroomRecordId) {
    axios.get(`${window.ServerURL}/classroom/refunds`, {
        params: {
            classroomRecordId: classroomRecordId,
        },
    }).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        emits('showAlertMsg', res.data.data);
        setTimeout(() => {
            queryRecordList(recordList.value.num, 10);
        }, 1000 * 0.2);
    });
}
function cancelApply(classroomRecordId) {
    axios.get(`${window.ServerURL}/classroomRecord/cancelApply`, {
        params: {
            classroomRecordId: classroomRecordId,
        }
    }).then(res => {
        if (res.data.status != 1) return emits('showAlertMsg', res.data.detail);
        queryRecordList(recordList.value.num, 10);
        emits('showAlertMsg', res.data.data);
    })
}
function jumpPage() {
    let num = pageInput.value.value;
    if (num > recordList.value.pageTotal || num < 1) {
        pageInput.value.value = null;
        return emits('showAlertMsg', '页数超出范围');
    }
    queryRecordList(num, 10);
    pageInput.value.value = null;
}
function queryPreviousPage() {
    if (!recordList.value.hasPrevious) return emits('showAlertMsg', '已经是第一页')
    recordList.value.num--;
    queryRecordList(recordList.value.num, 10);
}
function queryNextPage() {
    if (!recordList.value.hasNext) return emits('showAlertMsg', '已经是最后一页');
    recordList.value.num++;
    queryRecordList(recordList.value.num, 10);
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
    .pc {
        display: none !important;
    }

    .list-table .description {
        padding: 8px 0px;
        font-size: 0.9rem;
    }

    .list-table .table .row *,
    .list-button-group button {
        font-size: 0.8rem;
    }

    .list-table .table .row span {
        width: 25% !important;
    }

    .list-button-group * {
        margin: 0px 8px;
    }

    .list-button-group button {
        padding: 6px 18px;
    }

    .list-button-group button:hover {
        padding: 6px 24px;
    }

    .list-button-group input {
        width: 72px;
        padding: 2px 0px;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .list-table .description {
        padding: 8px 0px;
        font-size: 1rem;
    }

    .list-table .table .row *,
    .list-button-group button {
        font-size: 0.9rem;
    }

    .list-button-group * {
        margin: 0px 16px;
    }

    .list-button-group button {
        padding: 6px 26px;
    }

    .list-button-group button:hover {
        padding: 6px 32px;
    }

    .list-button-group input {
        width: 80px;
        padding: 2px 0px;
    }
}

@media screen and (min-width: 1200px) {
    .list-table .description {
        padding: 8px 0px;
        font-size: 1.1rem;
    }

    .list-table .table .row *,
    .list-button-group button {
        font-size: 1rem;
    }

    .list-button-group * {
        margin: 0px 24px;
    }

    .list-button-group button {
        padding: 6px 38px;
    }

    .list-button-group button:hover {
        padding: 6px 42px;
    }

    .list-button-group input {
        width: 120px;
        padding: 4px 0px;
    }
}

.record-list-body {
    padding: 18px 8px;
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

.list-table .description span {
    width: 20%;
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
    padding: 10px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    white-space: nowrap;

}

.list-table .table .row span {
    width: 20%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.list-table .table .row .btn {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.list-button-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
}

.list-button-group * {
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
}

.list-button-group button {
    border-radius: 12px;
    transition: all 0.1s linear;
}

.list-button-group input {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    text-align: center;
}
</style>