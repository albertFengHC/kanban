<template>
    <div class="LPInformation">
        <div class="content">
            <div class="contentTop">
                <div class="LContent">
                    <div class="LContentFDiv">
                        <p>在场人员统计(人)：</p>
                        <p>{{termData.allPerson}}</p>
                    </div>
                    <div class="LContentSDiv">
                        <p>技术人员统计：</p>
                        <p><span>{{termData.technicianPerson}}</span>人</p>
                    </div>
                    <div class="LContentTDiv">
                        <p>劳务人员统计：</p>
                        <p><span>{{termData.presencePerson}}</span>人</p>
                    </div>
                </div>
                <div ref="label" class="label"></div>
            </div>
            <div class="contentBtm">
                <div class="contentBtmF">
                    <p class="safeThreePerson">{{termData.safeThreePerson}}</p>
                    <p>"三类"人员</p>
                </div>
                <div class="contentBtmS">
                    <p class="specialPerson">{{termData.specialPerson}}</p>
                    <p>特种作业人员</p>
                </div>
                <div class="contentBtmT">
                    <p class="dangerPerson">{{termData.dangerPerson}}</p>
                    <p>危害场所人员</p>
                </div>
                <div class="contentBtmFro">
                    <p class="termSafetyPerson">{{termData.termSafetyPerson}}</p>
                    <p>现场群安员</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LPInformation",
        data() {
            return {
                admission: [],
                appearance: [],
                allA: [],
                termData: ''
            }
        },
        methods: {
            creatLabel() {
                const that = this;

                const echarts = require('echarts');
                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(this.$refs.label);

                let option = {
                    backgroundColor: '#0b1446',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            label: {
                                show: true
                            }
                        }
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    // legend: {
                    //     x: 'center',
                    //     y: 'bottom',
                    //     data: ['进场人员', '出场人员'],
                    //     itemGap: 5,
                    //     textStyle: {  // 图列内容样式
                    //         color: '#fff',  // 字体颜色
                    //     },
                    // },
                    grid:{
                        top:"30px",
                        left:"50px",
                        right:"15px",
                        bottom:"30px",
                        containLabel: false
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            axisLabel: {
                                color: '#00d2ff',
                            }
                        },
                    ],
                    yAxis: [
                        {
                            splitLine :{    //网格线
                                lineStyle:{
                                    color: '#262F43',
                                    type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                                },
                                show:true //隐藏或显示
                            },
                            type: 'value',
                            name: '数量(个)',
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#00d2ff'
                                }
                            },
                        },
                        {
                            splitLine :{    //网格线
                                lineStyle:{
                                    color: '#262F43',
                                    type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                                },
                                show:true //隐藏或显示
                            },
                        },
                    ],
                    dataZoom: [
                        {
                            show: false,
                            start: 0,
                            end: 1000
                        },
                        {
                            type: 'inside',
                            start: 0,
                            end: 1000
                        },
                        {
                            show: false,
                            yAxisIndex: 0,
                            filterMode: 'empty',
                            width: 30,
                            height: '80%',
                            showDataShadow: false,
                            left: '93%'
                        }
                    ],
                    series: [
                        {
                            name: '进场人员',
                            type: 'bar',
                            data: that.admission,
                            itemStyle: {
                                normal: {
                                    //这里是重点
                                    color: '#B3BEDF',
                                }
                            },
                        },
                        {
                            name: '出场人员',
                            type: 'bar',
                            data: that.appearance,
                            itemStyle: {
                                normal: {
                                    //这里是重点
                                    color: '#3F6AB7',
                                }
                            },
                        },
                        {
                            name:'在场人员总数',
                            type:'line',
                            yAxisIndex: 1,
                            data: that.allA,
                            itemStyle: {
                                normal: {
                                    //这里是重点
                                    color: '#6F6132',
                                }
                            }
                        }
                    ]
                };

                // 绘制图表
                myChart.setOption(option);
            },
            getData(valProject,valYear,valMonth,valSeason) {
                const that = this;
                const parameter = {
                    companyId: valProject,
                    yearStr: valYear,
                    monthStr: valMonth,
                    quarterStr: valSeason,
                };
                this.$getUrl('getTermLabor.do', parameter)
                    .then(function (response) {
                        const data = response;
                        that.admission = [];
                        that.appearance = [];
                        that.termData = '';
                        that.termData = data.termdata[0];
                        let allAData = '';

                        for (let i in data.termMonthData[0]) {
                            that.admission.push(data.termMonthData[0][i]);
                        }

                        for (let i in data.termMonthData[1]) {
                            that.appearance.push(data.termMonthData[1][i]);
                        }

                        for (let i in data.termMonthData[0]) {
                            allAData = data.termMonthData[0][i];
                            allAData += data.termMonthData[1][i];
                            that.allA.push(allAData);
                        }

                        that.creatLabel();
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            }
        },
        mounted() {
            this.getData();
        },
    }
</script>

<style scoped>
    .LPInformation {
        background: url('../../assets/indexImg/进场人员信息动态管理.png') no-repeat;
        background-size: 100% 100%;
        height: 30%;
        padding: 15px;
        padding-top: 30px;
        margin: 20px;
        margin-top: 35px;
    }

    .content {
        width: 100%;
        height: 100%;
        margin: 0;
    }

    .content .contentTop{
        width: 100%;
        height: 70%;
        display: flex;
        justify-content: space-between;
    }

    .LContent{
        width: 35%;
    }

    .LContent .LContentFDiv{
        font-weight: 700;
        font-style: normal;
        font-size: 15px;
        color: rgb(202, 249, 130);
    }

    .LContent .LContentFDiv p:last-child{
        font-weight: 700;
        font-style: normal;
        font-size: 18px;
        color: rgb(255, 255, 128);
        text-align: center;
        background: url('../../assets/indexImg/菱形1.png') no-repeat;
        background-size: 100% 100%;
        height: 50px;
        width: 95px;
        line-height: 50px;
        margin: 10px auto;
    }

    .LContent .LContentSDiv,.LContentTDiv{
        font-weight: 400;
        font-style: normal;
        font-size: 15px;
        color: rgb(128, 255, 255);
    }

    .LContent .LContentSDiv span,.LContentTDiv span{
        text-decoration: underline;
        color: #fff;
    }

    .LContent .LContentSDiv p:last-child,.LContentTDiv p:last-child{
        text-align: right;
        padding-right: 20px;
    }

    .contentBtm{
        display: flex;
        justify-content: space-between;
        text-align: center;
        padding-top: 10px;
    }

    .contentBtm div p:last-child{
        font-weight: 400;
        font-style: normal;
        font-size: 12px;
        color: rgb(119, 230, 165);
        text-align: center;
    }

    .contentBtm .safeThreePerson,.specialPerson,.dangerPerson,.termSafetyPerson{
        font-weight: 700;
        font-style: normal;
        font-size: 18px;
        color: rgb(255, 255, 128);
        border: 1px solid #0B8AC9;
        border-radius: 50px;
        height: 50px;
        width: 50px;
        line-height: 50px;
        margin: 0 auto;
    }

    .specialPerson{
       color: #EC808D;
    }

    .dangerPerson{
        color: #D9001B;
    }

    .termSafetyPerson{
        color: #FFFF80;
    }

    .label{
        width: 65%;
        height: 100%;
    }
</style>