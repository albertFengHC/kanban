<template>
    <div class="DMSProduction">
        <h3 @click="showPopup">主平台信息统计</h3>
        <div class="TContent">
            <div>
                <p>应急机构总数</p>
                <p>{{lrSaveDrilling.saveOrg}}</p>
            </div>
            <div>
                <p>应急救援人员总数</p>
                <p>{{lrSaveDrilling.savePerson}}</p>
            </div>
            <div>
                <p>应急演练次数</p>
                <p>{{lrSaveDrilling.saveDrilling}}</p>
            </div>
        </div>
        <div class="BContent">
            <table>
                <thead>
                    <tr>
                        <td>应急分平台</td>
                        <td>四川分平台</td>
                        <td>云南分平台</td>
                        <td>贵州分平台</td>
                        <td>西藏分平台</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>应急机构总数</td>
                        <td>7</td>
                        <td>6</td>
                        <td>8</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>应急救援人员总数</td>
                        <td>28</td>
                        <td>32</td>
                        <td>26</td>
                        <td>34</td>
                    </tr>
                    <tr>
                        <td>应急演练次数</td>
                        <td>15</td>
                        <td>15</td>
                        <td>12</td>
                        <td>13</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DMSProduction",
        data(){
            return{
                lrSaveDrilling:'',
            }
        },
        methods:{
            getData(valProject,valYear,valMonth,valSeason){
                const that = this;
                const parameter = {
                    companyId: valProject,
                    yearStr: valYear,
                    monthStr: valMonth,
                    quarterStr: valSeason,
                };
                // 发送 POST 请求
                this.$getUrl('getLrSaveDrilling.do', parameter)
                    .then(function (response) {
                        // console.log(response);
                        that.lrSaveDrilling = '';
                        that.lrSaveDrilling = response.lrSaveDrilling[0];
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            },
            showPopup(){
                this.$emit('popupData',true);
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style scoped>
    .DMSProduction {
        height: 30%;
        padding: 15px;
        padding-top: 30px;
        margin: 20px;
        background: url('../../assets/indexImg/安全生产动态管理.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }

    .DMSProduction h3{
        cursor: pointer;
        text-align: center;
    }

    .TContent{
        display: flex;
        justify-content: space-between;
        text-align: center;
        padding-top: 15px;
    }

    .TContent>div>p:last-child{
        font-weight: 700;
        font-style: normal;
        font-size: 18px;
        color: rgb(255, 255, 128);
        border: 1px solid #0B8AC9;
        border-radius: 50px;
        height: 50px;
        width: 50px;
        line-height: 50px;
        margin: 10px auto;
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