<template>
    <div id="ERMonitoring">
        <div class="box">
            <div class="titleJump">
                <p class="titleJumpTo">
                    <router-link to="indexPage">首页</router-link>
                </p>
                <p class="titleJumpTo">
                    <router-link to="EPMonitoring">进场人员监控</router-link>
                </p>
                <p class="titleJumpTo">
                    <router-link to="SRMonitoring">安全风险监控</router-link>
                </p>
                <p class="titleJumpTo">
                    <router-link to="HDFMonitor">隐患整改监控</router-link>
                </p>
                <p class="titleJumpTo">应急救援监控</p>
            </div>
            <div class="left">
                <div class="leftTop">
                    <div class="dateShow">
                        <p>2019年9月16日</p>
                        <p>星期二</p>
                        <p>晴</p>
                    </div>
                    <div class="search">
                        <div class="searchLeft">
                            <div class="searchLeftLeft">
                                <select name="" id="company" v-model="mapData.valCompany">
                                    <option value="">公司或分子公司选择</option>
                                    <option v-for="option in sellCompanyData" :value="option.value" :key="option.value">
                                        {{ option.text }}
                                    </option>
                                </select>
                                <select name="" id="province" v-model="mapData.valProvince" @change="changeProject">
                                    <option value="">省份选择</option>
                                    <option v-for="option in selProvinceData" :value="option.value" :key="option.value">
                                        {{ option.text }}
                                    </option>
                                </select>
                                <select name="" id="project" v-model="mapData.valProject" @change="selCompany($event)">
                                    <option value="">指挥部(项目公司)选择</option>
                                    <option v-for="option in selProjectData" :value="option.F_CompanyId"
                                            :key="option.F_CompanyId">
                                        {{ option.F_FullName }}
                                    </option>
                                </select>
                            </div>
                            <div class="searchLeftRight">
                                <select name="" id="segments" v-model="mapData.valSegments">
                                    <option value="">业务板块选择</option>
                                    <option v-for="option in selSegmentsData" :value="option.value" :key="option.value">
                                        {{ option.text }}
                                    </option>
                                </select>
                                <select name="" id="contract" v-model="mapData.valContract"
                                        @change="selCompany($event)">
                                    <option value="">项目部选择</option>
                                    <option v-for="option in selContractData" :value="option.F_CompanyId"
                                            :key="option.F_CompanyId">
                                        {{ option.F_ShortName }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <img src="../assets/indexImg/图层30拷贝.png" alt="">
                        <div>
                            <button>统计周期</button>
                            <select name="" id="year" v-model="mapData.valYear" @change="selCompany($event)">
                                <option value="">年份选择</option>
                                <option v-for="option in selYearData" :value="option.value" :key="option.value">
                                    {{ option.text }}
                                </option>
                            </select><i>年</i>
                            <select name="" id="season" v-model="mapData.valSeason" @change="selCompany($event)">
                                <option value="">季度选择</option>
                                <option v-for="option in selSeasonData" :value="option.value" :key="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                            <select name="" id="month" v-model="mapData.valMonth" @change="selCompany($event)">
                                <option value="">月份选择</option>
                                <option v-for="option in selMonthData" :value="option.value" :key="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="leftMid">
                    <myMap :msg='mapData' ref="map" class="myMap"/>
<!--                    <div ref="mapFrame" class="mapFrame"></div>-->
                </div>
                <div class="leftBottom">
                    <div class="leftBottomLeft">
                        <h4>应急机构信息统计</h4>
                        <div class="leftBottomLeftFrame">
                            <div class="leftBottomLeftFrameLeft">
                                <p>应急机构总数</p>
                                <p>{{lrSaveDrilling.saveOrg}}</p>
                            </div>
                            <div class="leftBottomLeftFrameRight">
                                <div>
                                    <p>四川应急分平台</p>
                                    <p><i>20</i>个</p>
                                </div>
                                <div>
                                    <p>云南应急分平台</p>
                                    <p><i>30</i>个</p>
                                </div>
                                <div>
                                    <p>贵州应急分平台</p>
                                    <p><i>10</i>个</p>
                                </div>
                                <div>
                                    <p>西藏应急分平台</p>
                                    <p><i>36</i>个</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="leftBottomMid">
                        <h4>应急人员信息统计</h4>
                        <div class="leftBottomMidFrame">
                            <div class="leftBottomMidFrameLeft">
                                <p>应急人员总数</p>
                                <p>{{lrSaveDrilling.savePerson}}</p>
                            </div>
                            <div class="leftBottomMidFrameRight">
                                <div>
                                    <p>四川应急分平台</p>
                                    <p><i>20</i>人</p>
                                </div>
                                <div>
                                    <p>云南应急分平台</p>
                                    <p><i>30</i>人</p>
                                </div>
                                <div>
                                    <p>贵州应急分平台</p>
                                    <p><i>10</i>人</p>
                                </div>
                                <div>
                                    <p>西藏应急分平台</p>
                                    <p><i>36</i>人</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="leftBottomRight">
                        <h4>应急演练次数统计</h4>
                        <div class="leftBottomRightFrame">
                            <div class="leftBottomRightFrameLeft">
                                <p>应急演练总数</p>
                                <p>{{lrSaveDrilling.saveOrg}}</p>
                            </div>
                            <div class="leftBottomRightFrameRight">
                                <div>
                                    <p>四川应急分平台</p>
                                    <p><i>20</i>次</p>
                                </div>
                                <div>
                                    <p>云南应急分平台</p>
                                    <p><i>30</i>次</p>
                                </div>
                                <div>
                                    <p>贵州应急分平台</p>
                                    <p><i>10</i>次</p>
                                </div>
                                <div>
                                    <p>西藏应急分平台</p>
                                    <p><i>36</i>次</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="rightTop">
                    <div class="rightTopLeft">
                        <h4>主平台应急事件统计</h4>
                        <div class="rightTopLeftFrame">
                            <div class="rightTopLeftFrameLeft">
                                <div>
                                    <P>应急事件数</P>
                                    <P><i>96</i>项</P>
                                </div>
                                <div>
                                    <P>处理完结数</P>
                                    <P><i>90</i>项</P>
                                </div>
                                <div>
                                    <P>正在处理数</P>
                                    <P><i class="redMark">6</i>项</P>
                                </div>
                            </div>
                            <div class="rightTopLeftFrameRight">
                                <div ref="label" class="label"></div>
                            </div>
                        </div>
                    </div>
                    <div class="rightTopMid">
                        <div>
                            <div class="rightTopMidQuarter">
                                <div class="rightTopMidQuarterFrame">
                                    <div>
                                        <p>应急事件数</p>
                                        <p>完结数</p>
                                        <p>在处理数</p>
                                    </div>
                                    <div>
                                        <p><i>10</i>项</p>
                                        <p><i>10</i>项</p>
                                        <p><i class="redMark">0</i>项</p>
                                    </div>
                                </div>
                                <h5>四川分平台</h5>
                            </div>
                            <div class="rightTopMidQuarter">
                                <div class="rightTopMidQuarterFrame">
                                    <div>
                                        <p>应急事件数</p>
                                        <p>完结数</p>
                                        <p>在处理数</p>
                                    </div>
                                    <div>
                                        <p><i>18</i>项</p>
                                        <p><i>17</i>项</p>
                                        <p><i class="redMark">1</i>项</p>
                                    </div>
                                </div>
                                <h5>云南分平台</h5>
                            </div>
                        </div>
                        <div>
                            <div class="rightTopMidQuarter">
                                <div class="rightTopMidQuarterFrame">
                                    <div>
                                        <p>应急事件数</p>
                                        <p>完结数</p>
                                        <p>在处理数</p>
                                    </div>
                                    <div>
                                        <p><i>20</i>项</p>
                                        <p><i>17</i>项</p>
                                        <p><i class="redMark">3</i>项</p>
                                    </div>
                                </div>
                                <h5>贵州分平台</h5>
                            </div>
                            <div class="rightTopMidQuarter">
                                <div class="rightTopMidQuarterFrame">
                                    <div>
                                        <p>应急事件数</p>
                                        <p>完结数</p>
                                        <p>在处理数</p>
                                    </div>
                                    <div>
                                        <p><i>0</i>项</p>
                                        <p><i>0</i>项</p>
                                        <p><i class="redMark">0</i>项</p>
                                    </div>
                                </div>
                                <h5>西藏分平台</h5>
                            </div>
                        </div>
                    </div>
                    <div class="rightTopRight">
                        <div>
                            <div class="rightTopRightQuarter">
                                <div class="rightTopRightQuarterFrame">
                                    <div>
                                        <p>应急事件数</p>
                                        <p>完结数</p>
                                        <p>在处理数</p>
                                    </div>
                                    <div>
                                        <p><i>10</i>项</p>
                                        <p><i>10</i>项</p>
                                        <p><i class="redMark">0</i>项</p>
                                    </div>
                                </div>
                                <h5>公路业务模块</h5>
                            </div>
                            <div class="rightTopRightQuarter">
                                <div class="rightTopRightQuarterFrame">
                                    <div>
                                        <p>应急事件数</p>
                                        <p>完结数</p>
                                        <p>在处理数</p>
                                    </div>
                                    <div>
                                        <p><i>18</i>项</p>
                                        <p><i>17</i>项</p>
                                        <p><i class="redMark">1</i>项</p>
                                    </div>
                                </div>
                                <h5>房建业务版块</h5>
                            </div>
                        </div>
                        <div>
                            <div class="rightTopRightQuarter">
                                <div class="rightTopRightQuarterFrame">
                                    <div>
                                        <p>应急事件数</p>
                                        <p>完结数</p>
                                        <p>在处理数</p>
                                    </div>
                                    <div>
                                        <p><i>20</i>项</p>
                                        <p><i>17</i>项</p>
                                        <p><i class="redMark">3</i>项</p>
                                    </div>
                                </div>
                                <h5>地铁业务版块</h5>
                            </div>
                            <div class="rightTopRightQuarter">
                                <div class="rightTopRightQuarterFrame">
                                    <div>
                                        <p>应急事件数</p>
                                        <p>完结数</p>
                                        <p>在处理数</p>
                                    </div>
                                    <div>
                                        <p><i>0</i>项</p>
                                        <p><i>0</i>项</p>
                                        <p><i class="redMark">0</i>项</p>
                                    </div>
                                </div>
                                <h5>市政业务版块</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rightBottom">
                    <div class="rightBottomTop">
                        <i>处理完结事件</i>
                        <i>正在处理事件</i>
                    </div>
                    <div class="rightBottomBottom">
                        <div class="rightBottomBottomTableTitle">
                            <table>
                                <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>报送单位</th>
                                    <th>发生时间</th>
                                    <th>工程名称</th>
                                    <th>时间部位</th>
                                    <th>时间类别</th>
                                    <th>快报时间</th>
                                    <th>续报次数</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <table>
                            <thead style="opacity: 0">
                                <tr>
                                    <th>序号</th>
                                    <th>报送单位</th>
                                    <th>发生时间</th>
                                    <th>工程名称</th>
                                    <th>时间部位</th>
                                    <th>时间类别</th>
                                    <th>快报时间</th>
                                    <th>续报次数</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data,i) in tableData" :value="data.project" :key="i">
                                    <td>{{i++}}</td>
                                    <td>{{data.project}}</td>
                                    <td>{{data.name}}</td>
                                    <td>{{data.post}}</td>
                                    <td>{{data.certificate}}</td>
                                    <td>{{data.time}}</td>
                                    <td>{{data.date}}</td>
                                    <td>{{data.date}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import myMap from '../components/indexPage/myMap.vue';
    export default {
        name: "ERMonitoring",
        components: {
            myMap
        },
        data() {
            return {
                lrSaveDrilling: '',
                mapData: {
                    valCompany: '',
                    valProvince: '',
                    valSegments: '',
                    valProject: '',
                    valContract: '',
                    valYear: '',
                    valMonth: '',
                    valSeason: '',
                },
                sellCompanyData: [
                    {text: '资产公司', value: '资产公司'},
                    {text: '地铁公司', value: '地铁公司'},
                    {text: '路桥公司', value: '路桥公司'},
                    {text: '贵州公司', value: '贵州公司'},
                    {text: '云南投资', value: '云南投资'},
                    {text: '云南交建', value: '云南交建'},
                    {text: '海南公司', value: '海南公司'},
                    {text: '西藏筹备组', value: '西藏筹备组'},
                ],
                selProvinceData: [
                    {text: '山西省', value: '山西省'},
                    {text: '四川省', value: '四川省'},
                    {text: '云南省', value: '云南省'},
                    {text: '江西省', value: '江西省'},
                    {text: '贵州省', value: '贵州省'},
                    {text: '海南省', value: '海南省'},
                    {text: '西藏自治区', value: '西藏自治区'},
                ],
                selSegmentsData: [
                    {text: '地铁工程', value: '地铁工程'},
                    {text: '房建工程', value: '房建工程'},
                    {text: '市政工程', value: '市政工程'},
                    {text: '公路工程', value: '公路工程'},
                    {text: '其他工程', value: '其他工程'},
                ],
                selProjectData: '',
                selContractData: '',
                selYearData: [
                    {text: '2019', value: '2019'},
                    {text: '2018', value: '2018'},
                    {text: '2017', value: '2017'},
                    {text: '2016', value: '2016'},
                    {text: '2015', value: '2015'},
                ],
                selSeasonData: [
                    {text: '第一季度', value: '第一季度'},
                    {text: '第二季度', value: '第二季度'},
                    {text: '第三季度', value: '第三季度'},
                    {text: '第四季度', value: '第四季度'},
                ],
                SeasonData: '',
                selMonthData: [
                    {text: '一月', value: '一月'},
                    {text: '二月', value: '二月'},
                    {text: '三月', value: '三月'},
                    {text: '四月', value: '四月'},
                    {text: '五月', value: '五月'},
                    {text: '六月', value: '六月'},
                    {text: '七月', value: '七月'},
                    {text: '八月', value: '八月'},
                    {text: '九月', value: '九月'},
                    {text: '十月', value: '十月'},
                    {text: '十一月', value: '十一月'},
                    {text: '十二月', value: '十二月'},
                ],
                riskDangerData: '',
                saveStorageData: '',
                tableData:[
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'002',name:'002',post:'002',certificate:'002',time:'002',date:'002'},
                    {project:'003',name:'003',post:'003',certificate:'003',time:'003',date:'003'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'001',name:'001',post:'001',certificate:'001',time:'001',date:'001'},
                ]
            }
        },
        methods:{
            selCompany(e) {
                this.$refs.map.getData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract, this.mapData.valYear, this.mapData.valMonth, this.mapData.valSeason);
                this.getContractVal(this.mapData.valProject);
                this.changeSeasonMonth(e);
                this.$refs.map.getRouteData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract);
                this.getAllData();
            },
            getProjectVal() {
                const that = this;
                const parameter = {
                    id: ""
                };
                this.$getUrlHome('getCompany.do', parameter)
                    .then(function (response) {
                        that.selProjectData = response;
                    })
                    .catch(function (error) {

                    });
            },
            getContractVal(companyId) {
                const that = this;
                const parameter = {
                    id: companyId
                };
                this.$getUrlHome('getAgreement.do', parameter)
                    .then(function (response) {
                        that.selContractData = response;
                    })
                    .catch(function (error) {

                    });
            },
            changeSeasonMonth() {
                if (this.mapData.valSeason === '第一季度') {
                    this.selMonthData = [
                        {text: '一月', value: '一月'},
                        {text: '二月', value: '二月'},
                        {text: '三月', value: '三月'},
                    ]
                } else if (this.mapData.valSeason === '第二季度') {
                    this.selMonthData = [
                        {text: '四月', value: '四月'},
                        {text: '五月', value: '五月'},
                        {text: '六月', value: '六月'},
                    ]
                } else if (this.mapData.valSeason === '第三季度') {
                    this.selMonthData = [
                        {text: '七月', value: '七月'},
                        {text: '八月', value: '八月'},
                        {text: '九月', value: '九月'},
                    ]
                } else if (this.mapData.valSeason === '第四季度') {
                    this.selMonthData = [
                        {text: '十月', value: '十月'},
                        {text: '十一月', value: '十一月'},
                        {text: '十二月', value: '十二月'},
                    ]
                } else {
                    this.selMonthData = [
                        {text: '一月', value: '一月'},
                        {text: '二月', value: '二月'},
                        {text: '三月', value: '三月'},
                        {text: '四月', value: '四月'},
                        {text: '五月', value: '五月'},
                        {text: '六月', value: '六月'},
                        {text: '七月', value: '七月'},
                        {text: '八月', value: '八月'},
                        {text: '九月', value: '九月'},
                        {text: '十月', value: '十月'},
                        {text: '十一月', value: '十一月'},
                        {text: '十二月', value: '十二月'},
                    ]
                }
            },
            changeProject() {
                this.$refs.map.mapProvinceShow(this.mapData.valProvince);
            },
            getData() {
                const that = this;
                const parameter = {
                    companyId: '',
                    yearStr: '',
                    monthStr: '',
                    quarterStr: '',
                };
                // 发送 POST 请求
                this.$getUrl('getMapMessage.do', parameter)
                    .then(function (response) {
                        that.riskDangerData = response.riskDangerData;
                        that.saveStorageData = response.saveStorageData;
                        // that.map();
                    })
                    .catch(function (error) {

                    });
            },
            creatLabel() {
                const echarts = require('echarts');
                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(this.$refs.label);

                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c}项"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'middle',
                        data: ['应急事件数', '处理完结数', '正在处理数'],
                        textStyle: {
                            color: '#fff'
                        },
                        show:false
                    },
                    series: [
                        {
                            // name: '访问来源',
                            type: 'pie',
                            radius: ['60%', '90%'],
                            center: ["50%", "50%"],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    formatter:function (argument) {
                                        let html='主平台应急'+"\n"+'事件统计';
                                        return html;
                                    },
                                    textStyle:{
                                        // fontSize: 15,
                                        color:'#fff'
                                    }
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                    },
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: 96, name: '应急事件数'},
                                {value: 90, name: '处理完结数'},
                                {value: 6, name: '正在处理数'},
                            ],
                            color: ['#E3AB00','#F40000','#FFF']
                        },
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            getAllData(){
                const that = this;
                const parameter = {
                    companyId: this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract,
                    yearStr: this.mapData.valYear,
                    monthStr: this.mapData.valMonth,
                    quarterStr: this.mapData.valSeason,
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
        },
        mounted() {
            this.getProjectVal();
            this.getContractVal();
            this.getData();
            this.creatLabel();
            this.getAllData();
        }
    }
</script>

<style scoped>
    #ERMonitoring {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #fff;
        width: 100%;
        height: 100%;
        background-color: #0D1963;
        border-collapse: collapse;
        font-size: 14px;
        padding: 20px;
    }

    i {
        font-style: normal;
    }

    .box {
        width: 100%;
        height: 100%;
        background: url('./../assets/ERMonitoringImg/背景.png') no-repeat;
        background-size: 100% 100%;
        padding: 30px;
        padding-right: 20px;
        padding-top: 4%;
        display: flex;
        justify-content: space-between;
    }

    .left{
        width: 54%;
        position: relative;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding-right: 10px;
    }

    .dateShow {
        display: flex;
        justify-content: space-between;
        position: absolute;
        left: 63%;
        top: -4%;
        color: #02E3FA;
        font-size: 18px;
    }

    .dateShow > p {
        margin: 0 15px;
    }

    .search {
        display: flex;
        justify-content: space-between;
        width: 100%;
        color: #3ac0f5;
        padding: 10px;
    }

    .search > div:first-child {
        flex: 3;
    }

    .search > div:last-child {
        flex: 1;
    }

    .search select {
        text-transform: none;
        background-color: #0d1963;
        color: #02E3FA;
        padding: 5px;
        margin-right: 15px;
        border-radius: 5px;
        border: 1px solid #02E3FA;
        margin-bottom: 10px;
    }

    .search button {
        background-color: #0c3e5a;
        border: 1px solid #3ac0f5;
        color: #3ac0f5;
        padding: 4px;
        border-radius: 5px;
        width: 90px;
        margin-right: 15px;
    }

    .search img {
        position: relative;
        left: -25px;
        height: 80px;
    }

    .searchLeft{
        display: flex;
        justify-content: space-between;
        flex: 3;
    }

    .searchLeftLeft{
        flex: 3;
    }

    .searchLeftRight{
        flex: 1;
    }

    .search #company {
        width: 74%;
    }

    .search #project {
        width: 97%;
    }

    .search #contract {
        width: 118px;
    }

    .search #year {
        margin-right: 5px;
    }

    .leftMid {
        width: 100%;
        height: 100%;
        background: url('./../assets/ERMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        padding: 25px;
        position: relative;
    }

    .mapFrame {
        width: 100%;
        height: 100%;
        color: #02010f;
    }

    .leftBottom{
        display: flex;
        justify-content: space-between;
    }

    .leftBottomLeft,.leftBottomMid,.leftBottomRight{
        flex: 1;
        padding: 10px;
        margin: 5px;
        margin-top: 10px;
        margin-bottom: 0;
        background: url('./../assets/ERMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
    }

    .leftBottomLeft h4,.leftBottomMid h4,.leftBottomRight h4{
        padding: 10px 0;
        padding-top: 0;
    }

    .leftBottomLeftFrame,.leftBottomMidFrame,.leftBottomRightFrame{
        display: flex;
        justify-content: space-between;
        color: #02E3FA;
    }

    .leftBottomLeftFrameLeft,.leftBottomMidFrameLeft,.leftBottomRightFrameLeft{
        flex: 1;
        padding: 5px;
        background-color: #1F3661;
        margin: 3px;
    }

    .leftBottomLeftFrameLeft p:last-child,.leftBottomMidFrameLeft p:last-child,.leftBottomRightFrameLeft p:last-child{
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFC000;
        font-size: 18px;
    }

    .leftBottomLeftFrameRight,.leftBottomMidFrameRight,.leftBottomRightFrameRight{
        flex: 2;
    }

    .leftBottomLeftFrameRight>div,.leftBottomMidFrameRight>div,.leftBottomRightFrameRight>div{
        display: flex;
        justify-content: space-between;
        padding: 5px;
        margin: 3px;
        background-color: #1F3661;
    }

    .leftBottomLeftFrameRight i,.leftBottomMidFrameRight i,.leftBottomRightFrameRight i{
        color: #fff;
        text-decoration:underline
    }

    .right{
        width: 46%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }

    .rightTop{
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }

    .rightTop .redMark{
        color: #FF0D09;
    }

    .rightTopLeft{
        background: url('./../assets/ERMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        padding: 10px;
        margin: 5px;
        flex: 1;
    }

    .rightTopLeft>h4{
        font-size: 15px;
    }

    .rightTopLeftFrame{
        display: flex;
        justify-content: space-between;
        height: 80%;
    }

    .rightTopLeftFrameLeft{
        flex: 1;
        text-align: center;
        color: #02E3FA;
    }

    .rightTopLeftFrameLeft>div{
        padding: 5px;
        margin: 10px;
        height: 30%;
        background-color: #1F3661;
    }

    .rightTopLeftFrameLeft>div p{
        height: 50%;
    }

    .rightTopLeftFrameLeft>div i{
        color: #fff;
    }

    .rightTopLeftFrameRight{
        flex: 1;
    }

    .label{
        width: 100%;
        height: 100%;
    }

    .rightTopMid,.rightTopRight{
        background: url('./../assets/ERMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        margin: 5px;
        padding: 10px;
        flex: 1;
    }

    .rightTopMid>div, .rightTopRight>div{
        display: flex;
        justify-content: space-between;
    }

    .rightTopMidQuarter,.rightTopRightQuarter{
        margin: 3px;
        flex: 1;
    }

    .rightTopMidQuarter>h5,.rightTopRightQuarter>h5{
        text-align: center;
    }

    .rightTopMidQuarterFrame,.rightTopRightQuarterFrame{
        padding: 5px;
        margin: 3px;
        color: #02E3FA;
        background-color: #1F3661;
        display: flex;
        justify-content: space-between;
    }

    .rightTopMidQuarterFrame p,.rightTopRightQuarterFrame p{
        padding: 5px 0;
    }

    .rightTopMidQuarterFrame i,.rightTopRightQuarterFrame i{
        color: #fff;
    }

    .rightTopMidQuarterFrame>div,.rightTopRightQuarterFrame>div{
        text-align: right;
    }

    .rightTopRight{
        background: url('./../assets/ERMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        margin: 5px;
        flex: 1;
    }

    .rightBottom{
        background: url('./../assets/ERMonitoringImg/应急时间快报详情.png') no-repeat;
        background-size: 100% 100%;
        padding: 10px;
        padding-right: 30px;
        margin-left: 5px;
        height: 100%;
    }

    .rightBottomTop{
        border-bottom: 1px dashed #7F9EBA;
        margin-right: 55%;
        margin-left: 2%;
        position: relative;
        bottom: 10px;
    }

    .rightBottomTop i{
        display: inline-block;
        padding: 5px 25px;
        border: 1px dashed #2E75B6;
        border-radius: 5px;
        color: #02E3FA;
        margin: 0 15px;
    }

    .rightBottomTop i:first-child{
        background-color: #164989;
    }

    .rightBottomTop i:last-child{
        color: #FF0D09;
    }

    .rightBottomBottom{
        height: 100%;
        overflow: hidden;
    }

    .rightBottomBottomTableTitle{
        background-color: #0D1963;
        z-index: 1000;
        padding: 10px 0;
        position: relative;
        top: -5px;
        text-align: center;
    }

    .rightBottomBottom table{
        width: 100%;
        text-align: center;
        color: #02E3FA;
        border-collapse: collapse;
        position: relative;
        top: 0;
        -webkit-animation: scrollToUp 10s linear infinite; /* 引入 scrollToUp动画 */
        animation: scrollToUp 10s linear infinite;
    }

    .rightBottomBottom table td {
        border-bottom: 1px dashed #7F9EBA;
    }

    @-webkit-keyframes scrollToUp {
        0% {
            top: 0;
        }
        100% {
            top: -100%;
        }
    }
    @keyframes scrollToUp {
        0% {
            top: 0;
        }
        100% {
            top: -100%;
        }
    }

    .titleJump{
        position: absolute;
        top: 1%;
        right: 4%;
        z-index: 100;
        width: 42%;
        height: 5%;
        display: flex;
        justify-content: space-between;
        opacity: 0;
        cursor: pointer;
    }

    .titleJumpTo a{
        width: 100%;
        height: 100%;
        display: inline-block;
    }

    .titleJump .titleJumpTo{
        flex: 1;
    }

    .myMap{
        padding: 0;
    }
</style>