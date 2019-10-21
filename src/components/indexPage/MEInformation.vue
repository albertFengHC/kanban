<template>
    <div class="MEInformation">
        <div class="content">
            <div class="contentTop">
                <div class="LContent">
                    <div class="LContentFDiv">
                        <p>在场设备数(台)：</p>
                        <p><span>{{equipmentRecordData.allEquipment}}</span></p>
                    </div>
                    <div class="LContentSDiv">
                        <p>可用设备数：</p>
                        <p><span>{{equipmentRecordData.normal}}</span>台</p>
                    </div>
                    <div class="LContentTDiv">
                        <p>不可用设备数：</p>
                        <p><span>{{equipmentRecordData.abnormal}}</span>台</p>
                    </div>
                </div>
                <div ref="label" class="label"></div>
            </div>
            <div>
                <div class="labelBottom">
                    <div>
                        <p>特种设备当期情况</p>
                        <p>进场：<span>{{equipmentCountData.eSpecialEquipment}}</span>台</p>
                        <p>退场：<span>{{equipmentCountData.lSpecialEquipment}}</span>台</p>
                    </div>
                    <div>
                        <p>关键设备当期情况</p>
                        <p>进场：<span>{{equipmentCountData.eKeyEquipment}}</span>台</p>
                        <p>退场：<span>{{equipmentCountData.lKeyEquipment}}</span>台</p>
                    </div>
                    <div>
                        <p>主要设备当期情况</p>
                        <p>进场：<span>{{equipmentCountData.eMajorEquipment}}</span>台</p>
                        <p>退场：<span>{{equipmentCountData.lMajorEquipment}}</span>台</p>
                    </div>
                    <div>
                        <p>一般设备当期情况</p>
                        <p>进场：<span>{{equipmentCountData.eGeneralEquipment}}</span>台</p>
                        <p>退场：<span>{{equipmentCountData.lGeneralEquipment}}</span>台</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MEInformation",
        data (){
            return {
                equipmentData : [],
                equipmentRecordData: [],
                equipmentCountData: ''
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
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}"
                    },
                    legend: {
                        show: false,
                    },
                    toolbox: {
                        show : false,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {
                                show: true,
                                type: 'pie'
                            },
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    series : [
                        {
                            name:'数量(个)',
                            type:'pie',
                            radius : [10, 60],
                            center : ['50%', '50%'],
                            roseType : 'radius',
                            data: that.equipmentData,
                        }
                    ],
                    color:['#7b4b0c', '#c18f00','#00c10e','#4A97C1']
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
                this.$getUrl('getEquipmentData.do', parameter)
                    .then(function (response) {
                        const data = response;
                        let NEquipmentData = '';
                        that.equipmentRecordData = [];
                        that.equipmentData = [];
                        that.equipmentCountData = '';

                        that.equipmentRecordData = data.equipmentRecorddata[0];
                        that.equipmentRecordData.allEquipment = data.equipmentdata[0].allEquipment;

                        NEquipmentData = data.equipmentdata[0];
                        delete NEquipmentData.allEquipment;

                        that.equipmentData.push({'name':'关键设备数','value':NEquipmentData.keyEquipment});
                        that.equipmentData.push({'name':'特种设备数','value':NEquipmentData.specialEquipment});
                        that.equipmentData.push({'name':'一般设备数','value':NEquipmentData.generalEquipment});
                        that.equipmentData.push({'name':'主要设备数','value':NEquipmentData.majorEquipment});

                        that.equipmentCountData = data.equipmentCountdata[0];
                        that.creatLabel();
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            }
        },
        mounted() {
            this.getData('','','','');
        }
    }
</script>

<style scoped>
    .MEInformation {
        height: 32%;
        padding: 15px;
        padding-top: 30px;
        padding-bottom: 5px;
        margin: 20px;
        background: url('../../assets/indexImg/进场设备信息动态管理.png') no-repeat;
        background-size: 100% 100%;

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

    .label{
        width: 65%;
        height: 100%;
        margin-top: 18px;
    }

    .labelBottom{
        display: flex;
        justify-content: space-between;
        font-weight: 400;
        font-style: normal;
        font-size: 12px;
        color: rgb(119, 230, 165);
        text-align: center;
        padding-top: 25px;
    }

    .labelBottom span{
        text-decoration: underline;
        color: #FFFF00;
        padding: 0 5px;
        display: inline-block;
    }
</style>