<template>
    <div class="dashboard-body">
        <div class="alert alert-warning" ref="alertMsgDiv">
            {{ alertMsg }}
        </div>
        <div class="dashboard-title">
            <img src="../assets/logo.svg">
            <router-link to="/"><span class="title-span">数据面板</span></router-link>
            <div v-if="dashboardData" class="time">更新时间: {{ dashboardData.time }}</div>
        </div>
        <div class="dashboard-pc">
            <div class="panel-left">
                <div id="panel-user-active"></div>
                <div id="panel-user-inApply"></div>
            </div>
            <div class="panel-middle">
                <div id="panel-record-history"></div>
                <div id="panel-classroom-topUse"></div>
            </div>
            <div class="panel-right">
                <div id="panel-classroom-inUse"></div>
                <div id="panel-classroom-rate"></div>
            </div>
        </div>
        <div class="dashboard-mobile">

        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue'
import moment from 'moment';
import * as echarts from 'echarts'
const dashboardData = ref();
const dataBackup = ref({
    time: moment().format('YYYY-MM-DD HH:mm:ss'),
    user: {
        inActive: 148,
        unActive: 127,
        inUse: 120,
        unUse: 180,
    },
    classroom: {
        inUse: 10,
        inApproval: 10,
        unUse: 10,
    },
    record: {
        date: ['2023-02-15', '2023-02-16', '2023-02-17', '2023-02-18', '2023-02-19', '2023-02-20', '2023-02-21'],
        value: [140, 232, 101, 264, 90, 340, 250],
    },
    topUse: {
        classroom: ['A001', 'A003', 'B003', 'B005', 'C05', 'D11', 'A01', 'B02', 'D13', 'D23'],
        value: [120, 200, 150, 80, 70, 110, 130, 12, 24, 120],
    }

});
const alertMsg = ref();
const alertMsgDiv = ref();
let alertTimer = null;
let active, inApply, inUse, useRate, recordHistory, topUse;
let interval = null;
onMounted(() => {
    active = echarts.init(document.getElementById('panel-user-active'));
    inApply = echarts.init(document.getElementById('panel-user-inApply'));
    inUse = echarts.init(document.getElementById('panel-classroom-inUse'));
    useRate = echarts.init(document.getElementById('panel-classroom-rate'));
    recordHistory = echarts.init(document.getElementById('panel-record-history'));
    topUse = echarts.init(document.getElementById('panel-classroom-topUse'));
    queryDashboard();
    interval = setInterval(() => {
        queryDashboard();
    }, 1000 * 20);
    window.addEventListener('resize', () => {
        active.resize();
        inApply.resize();
        inUse.resize();
        useRate.resize();
        recordHistory.resize();
        topUse.resize();
    })
});
onUnmounted(() => {
    active.dispose();
    inApply.dispose();
    inUse.dispose();
    useRate.dispose();
    recordHistory.dispose();
    topUse.dispose();
    clearInterval(interval);
    interval = null;
})
function queryDashboard() {
    axios.get(`${window.ServerURL}/dashboard/query`).then(res => {
        if (res.data.status != 1) {
            dashboardData.value = dataBackup.value;
            drawDashboard();
            return showAlertMsg(res.data.detail)
        };
        dashboardData.value = res.data.data;
        drawDashboard();
    }).catch(err => {
        dashboardData.value = dataBackup.value;
        drawDashboard();
    })
}
function drawDashboard() {
    let userData = dashboardData.value.user;
    // 活跃用户
    active.setOption({
        title: {
            text: '用户活跃数据',
            left: 'left'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
        series: [
            {
                type: 'pie',
                radius: ['30%', '60%'],
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                color: [
                    '#6190E8',
                    '#B06AB3',
                ],
                data: [
                    { value: userData.inActive, name: '活跃用户' },
                    { value: userData.unActive, name: '未活跃用户' },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
    // 用户申请数据
    inApply.setOption({
        title: {
            text: '用户申请数据',
            left: 'left'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
        series: [
            {
                type: 'pie',
                radius: ['30%', '60%'],
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                color: [
                    '#43C6AC',
                    '#a8c0ff',
                ],
                data: [
                    { value: userData.inUse, name: '申请/使用中' },
                    { value: userData.unUse, name: '未申请' },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
    let classroomData = dashboardData.value.classroom;
    // 教室申请数据
    inUse.setOption({
        tooltip: {
            trigger: 'item',
        },
        title: {
            text: '教室申请数据',
            left: 'left'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
        toolbox: {
            show: true,
        },
        series: [
            {
                type: 'pie',
                radius: ['30%', '60%'],
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                color: [
                    '#EC6EAD',
                    '#F3904F',
                    '#ffd89b',
                ],
                data: [
                    { value: classroomData.inUse, name: '使用中' },
                    { value: classroomData.inApproval, name: '审核中' },
                    { value: classroomData.unUse, name: '未使用' },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
    // 教室使用数据
    useRate.setOption({
        title: {
            text: '教室使用数据',
            left: 'left'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                type: 'pie',
                radius: ['30%', '60%'],
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                color: [
                    '#8e9eab',
                    '#108dc7',
                ],
                data: [
                    { value: classroomData.inUse, name: '使用中' },
                    { value: classroomData.unUse, name: '可申请' },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    });
    let recordData = dashboardData.value.record;
    // 申请数量历史数据
    recordHistory.setOption({
        color: ['#80FFA5'],
        title: {
            text: '申请数量历史数据'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Line 1'],
            left: 'right',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: recordData.date,
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Line 1',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(128, 255, 165)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(1, 191, 236)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: recordData.value,
            },
        ]
    });
    let topUseData = dashboardData.value.topUse;
    // 教室申请数量排行
    topUse.setOption({
        title: {
            text: '教室申请次数'
        },
        tooltip: {
            trigger: 'item',
        },
        xAxis: {
            type: 'category',
            data: topUseData.classroom,
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: topUseData.value,
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                },
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(115, 105, 205)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(201, 191, 236)'
                    }
                ])
            }
        ]
    })
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
    .dashboard-title .time {
        font-size: 0.7rem !important;
    }

    .dashboard-title {
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
    .dashboard-title {
        height: 68px;
        padding: 0px 18px;
    }
}

@media screen and (min-width: 1200px) {
    .dashboard-title {
        height: 68px;
        padding: 0px 26px;
    }
}

.dashboard-body {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: linear-gradient(to bottom right, rgba(162, 210, 255, 0.4), rgba(205, 180, 219, 0.4));
}

.dashboard-body .alert {
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

.dashboard-title {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
    background-color: rgba(255, 255, 255, 0.496);
}

.dashboard-title a {
    color: black;
    text-decoration: none;
}

.dashboard-title img {
    width: 48px;
    height: 48px;
}

.dashboard-title .title-span {
    font-weight: 700;
    font-size: 1.3rem;
    margin-left: 12px;
}

.dashboard-title .title-user {
    margin-left: auto;
}

.dashboard-body .alert {
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

.dashboard-title .time {
    margin-left: auto;
    font-size: 1.1rem;
    font-weight: 600;
}
</style>

<style scoped>
@media screen and (max-width: 600px) {
    .dashboard-pc {
        flex-direction: column;
        height: auto;
    }

    .dashboard-pc .panel-left,
    .dashboard-pc .panel-right,
    .dashboard-pc .panel-middle {
        width: 100%;
        height: 800px;
    }

    #panel-user-inApply,
    #panel-classroom-topUse,
    #panel-classroom-rate {
        margin-top: 18px !important;
    }

    #panel-user-active,
    #panel-user-inApply,
    #panel-classroom-inUse,
    #panel-classroom-rate,
    #panel-record-history,
    #panel-classroom-topUse {
        height: 50%;
    }

    #panel-user-inApply,
    #panel-classroom-rate,
    #panel-classroom-topUse {
        margin-top: auto;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .dashboard-pc {
        flex-direction: column;
        height: auto;
    }

    .dashboard-pc .panel-left,
    .dashboard-pc .panel-right,
    .dashboard-pc .panel-middle {
        width: 100%;
        height: 800px;
    }

    #panel-user-inApply,
    #panel-classroom-topUse,
    #panel-classroom-rate {
        margin-top: 18px !important;
    }

    #panel-user-active,
    #panel-user-inApply,
    #panel-classroom-inUse,
    #panel-classroom-rate,
    #panel-record-history,
    #panel-classroom-topUse {
        height: 50%;
    }

    #panel-user-inApply,
    #panel-classroom-rate,
    #panel-classroom-topUse {
        margin-top: auto;
    }
}

@media screen and (min-width: 1200px) {
    .dashboard-pc {
        flex-direction: row;
        height: calc(100vh - 68px);
    }

    .dashboard-pc .panel-left,
    .dashboard-pc .panel-right {
        width: 25%;
    }

    .dashboard-pc .panel-middle {
        width: 50%;
        height: 100%;
        padding: 12px;
    }

    #panel-user-active,
    #panel-user-inApply,
    #panel-classroom-inUse,
    #panel-classroom-rate,
    #panel-record-history,
    #panel-classroom-topUse {
        height: 49%;
    }

    #panel-user-inApply,
    #panel-classroom-rate,
    #panel-classroom-topUse {
        margin-top: auto;
    }
}

.dashboard-pc {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
    background-color: rgba(255, 255, 255, 0.496);
    display: flex;
    justify-content: space-between;
}

.dashboard-pc .panel-left,
.dashboard-pc .panel-right {
    display: flex;
    flex-direction: column;
    padding: 12px;
}

.dashboard-pc .panel-middle {
    display: flex;
    flex-direction: column;
    padding: 12px;
}


#panel-user-active,
#panel-user-inApply,
#panel-classroom-inUse,
#panel-classroom-rate,
#panel-record-history,
#panel-classroom-topUse {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    padding: 18px;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.26);
    background-color: rgba(255, 255, 255, 0.3);
}

#panel-user-inApply,
#panel-classroom-rate,
#panel-classroom-topUse {
    margin-top: auto;
}
</style>