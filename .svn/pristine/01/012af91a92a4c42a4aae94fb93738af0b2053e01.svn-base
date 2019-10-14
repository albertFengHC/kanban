<template>
    <div class="SHConstruction">
        <div class="TContent">
            <div class="TContentT">
                <div class="TContentL">
                    <span>{{trapDailyData.trapDaily}}</span>
                    <p>安全隐患巡查</p>
                </div>
                <div class="TContentR">
                    <span>{{trapDailyData.noPunctualNoSale}}</span>
                    <p>未按期销号</p>
                </div>
            </div>
            <div class="TContentM">
                <div class="label1">
                    <span>{{trapDailyData.punctualSale}}</span>
                    <p>按期销号</p>
                </div>
               <div class="label2">
                   <span>{{trapDailyData.noPunctualSale}}</span>
                   <p>未按期已销号</p>
               </div>
               <div class="label3">
                   <span>{{trapDailyData.noSale}}</span>
                   <p>未销号</p>
                </div>
            </div>
        </div>
        <div class="BContent">
            <div ref="label" class="label"></div>
            <table>
                <thead>
                <tr>
                    <td>隐患级别</td>
                    <td>Ⅰ级隐患</td>
                    <td>Ⅱ级隐患</td>
                    <td>Ⅲ级隐患</td>
                    <td>Ⅳ级隐患</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>排查数量</td>
                    <td>{{trapDailyLevelData[0]}}</td>
                    <td>{{trapDailyLevelData[1]}}</td>
                    <td>{{trapDailyLevelData[2]}}</td>
                    <td>{{trapDailyLevelData[3]}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SHConstruction",
        data(){
            return{
                trapDailyData:'',
                trapDailyLevelData:''
            }
        },
        methods:{
            creatLabel() {
                const that = this;

                const echarts = require('echarts');
                const echarts3D = require('echarts-gl');
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
                        left:"70px",
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
                        // boundaryGap: [0,10,20,30,40,50,60,70,80,90,100],
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#00d2ff',
                            },
                            data:[1,25,50,75,100]
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: ['Ⅰ级隐患','Ⅱ级隐患','Ⅲ级隐患','Ⅳ级隐患'],
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#00d2ff',
                            }
                        }
                    },
                    series: [
                        {
                            name: '项',
                            type: 'bar',
                            data: that.trapDailyLevelData,
                            itemStyle: {
                                normal: {
                                    color:'#205584'
                                }
                            },
                            barWidth : 20,
                            label: {
                                normal: {
                                    show: true,
                                    textBorderColor: '#333',
                                    textBorderWidth: 2
                                }
                            },
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
                this.$getUrl('getTrapDailyData.do', parameter)
                    .then(function (response) {
                        const data = response;
                        that.trapDailyData = '';
                        that.trapDailyLevelData = '';

                        let trapDailyLevelData = data.trapDailyLevelData[0];
                        that.trapDailyData = data.trapDailyData[0];
                        that.trapDailyLevelData = data.trapDailyLevelData[0];
                        let trapDailyLevelDataTable = [];
                        let primaryDanger = '';
                        let secondaryDanger = '';
                        let threeDanger = '';
                        let fourDanger = '';
                        for(let i in  trapDailyLevelData) {
                            if(i === 'primaryDanger'){
                                primaryDanger = trapDailyLevelData[i];
                            }else  if(i === 'secondaryDanger'){
                                secondaryDanger = trapDailyLevelData[i];
                            }else if(i === 'threeDanger'){
                                threeDanger = trapDailyLevelData[i];
                            }else{
                                fourDanger = trapDailyLevelData[i];
                            }
                        }
                        trapDailyLevelDataTable.push(primaryDanger,secondaryDanger,threeDanger,fourDanger);
                        that.trapDailyLevelData = trapDailyLevelDataTable;
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
    .SHConstruction {
        height: 62%;
        padding: 15px;
        padding-top: 30px;
        margin: 20px;
        background: url('../../assets/indexImg/施工现场安全隐患统计分析.png') no-repeat;
        background-size: 100% 100%;
        margin-top: 35px;
    }

    .TContent{
        height: 44%;
        text-align: center;
    }

    .TContent .TContentT{
        display: flex;
        justify-content: space-between;
    }

    .TContent .TContentT>div{
        flex: 1;
    }

    .TContent .TContentM{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }

    .TContent .TContentM>div{
        flex: 1;
    }

    .TContentL span{
        background: url('../../assets/indexImg/三角4.png') no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        width: 130px;
        height: 100px;
        line-height: 125px;
        color: #FF0D09;
        font-weight: 900;
    }

    .TContentL p{
        color: #00D2FF;
    }

    .TContentM p{
        color: #00D2FF;
    }

    .TContentM .label1 span{
        background: url('../../assets/indexImg/三角2.png') no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        width: 110px;
        height: 85px;
        line-height: 115px;
        color: #FF0D09;
        font-weight: 900;
    }

    .TContentM .label2 span{
        background: url('../../assets/indexImg/三角2.png') no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        width: 110px;
        height: 85px;
        line-height: 115px;
        color: #FF0D09;
        font-weight: 900;
    }

    .TContentM .label3 span{
        background: url('../../assets/indexImg/三角3.png') no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        width: 110px;
        height: 85px;
        line-height: 115px;
        color: #3399FF;
        font-weight: 900;
    }

    .TContentM .label3 p{
        color: #FFFF80;
    }

    .TContentR span{
        background: url('../../assets/indexImg/三角1.png') no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        width: 130px;
        height: 100px;
        line-height: 125px;
        color: #FFFF00;
        font-weight: 900;
    }

    .TContentR p{
        color: #FFFF00;
    }

    .BContent{
        height: 65%;
    }

    .BContent .label{
        width: 100%;
        height: 70%;
    }

    .BContent table{
        margin-top: 15px;
        width: 100%;
        text-align: center;
        color: #7F9EBA;
        border-collapse: collapse;
    }

    .BContent table td{
        border:1px solid #7F9EBA;
    }
</style>