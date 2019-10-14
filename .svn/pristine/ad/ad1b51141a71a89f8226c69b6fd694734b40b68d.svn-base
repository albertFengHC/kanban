<template>
    <div class="RSInformation">
        <div class="content">
            <div class="LContent">
                <div class="LContentFDiv">
                    <p>危险源识别：</p>
                    <p><span>{{danger.majorDanger}}</span></p>
                </div>
                <div class="LContentSDiv">
                    <p>工点正常监管：</p>
                    <p><span>{{danger.inSsupervision}}</span>项</p>
                </div>
                <div class="LContentTDiv">
                    <p>工点非正常监管：</p>
                    <p><span>{{danger.unSupervision}}</span>项</p>
                </div>
            </div>
            <div>
                <div ref="label" class="label"></div>
                <div class="labelBottom">
                    <table>
                        <thead>
                            <tr>
                                <td>风险源</td>
                                <td>已开工</td>
                                <td>已完工</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{tableDanger[0]}}</td>
                                <td>{{tableDanger[1]}}</td>
                                <td>{{tableDanger[2]}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RSInformation",
        data(){
            return{
                danger:'',
                tableDanger:'',
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
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['2011年'],
                        show: false
                    },
                    grid: {
                        top:"30px",
                        left:"50px",
                        right:"15px",
                        bottom:"30px",
                        containLabel: false
                    },
                    xAxis: {
                        splitLine :{    //网格线
                            lineStyle:{
                                color: '#262F43',
                                type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                            },
                            show:true //隐藏或显示
                        },
                        type: 'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#00d2ff'
                            },
                            data:[1,25,50,75,100]
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: ['风险源','已开工','已完工'],
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#00d2ff'
                            }
                        }
                    },
                    series: [
                        {
                            name: '项',
                            type: 'bar',
                            data: that.tableDanger,
                            label: {
                                normal: {
                                    show: true,
                                    textBorderColor: '#333',
                                    textBorderWidth: 2
                                }
                            },
                            barWidth : 20,
                            itemStyle: {
                                normal: {
                                    //这里是重点
                                    color: '#163857',
                                }
                            }
                        },
                    ]
                };

                // 绘制图表
                myChart.setOption(option);
            },
            getData(valProject,valYear,valMonth,valSeason){
                const that = this;
                const parameter = {
                    companyId: valProject,
                    yearStr: valYear,
                    monthStr: valMonth,
                    quarterStr: valSeason,
                };
                // 发送 POST 请求
                this.$getUrl('getRiskDangerData.do', parameter)
                    .then(function (response) {
                        const data = response.riskDangerData[0];
                        that.danger = '';
                        that.tableDanger = '';

                        let dangerData = {};
                        let tableDangerData = [];

                        dangerData.majorDanger = data.majorDanger;
                        dangerData.inSsupervision = data.inSsupervision;
                        dangerData.unSupervision = data.unSupervision;

                        that.danger = dangerData;

                        tableDangerData.push(data.allDanger,data.startDanger,data.endDanger);

                        that.tableDanger = tableDangerData;

                        that.creatLabel();
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style scoped>
    .RSInformation {
        height: 28%;
        padding: 15px;
        padding-top: 30px;
        padding-bottom: 0;
        margin: 20px;
        background: url('../../assets/indexImg/项目风险源信息动态管理.png') no-repeat;
        background-size: 100% 100%;
        margin-top: 18px;
    }

    .content {
        width: 100%;
        height: 100%;
        margin: 0;
        display: flex;
        justify-content: space-between;
    }

    .LContent{
        width: 35%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 15px;
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
        background: url('../../assets/indexImg/菱形2.png') no-repeat;
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

    .LContentTDiv span{
        color: #D9001B;
    }

    .content > div:first-child {
        width: 35%;
    }

    .content > div:last-child {
        width: 65%;
    }

    .labelBottom{
        padding-top: 15px;
    }

    .labelBottom table{
        width: 100%;
        text-align: center;
        color: #7F9EBA;
        border-collapse: collapse;
    }

    .labelBottom table td{
        border:1px solid #7F9EBA;
    }

    .label {
        width: 100%;
        height: 70%;
    }
</style>