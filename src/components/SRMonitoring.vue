<template>
    <div id="SRMonitoring">
        <div class="box">
            <div class="titleJump">
                <p class="titleJumpTo">
                    <router-link to="indexPage">首页</router-link>
                </p>
                <p class="titleJumpTo">
                    <router-link to="EPMonitoring">进场人员监控</router-link>
                </p>
                <p class="titleJumpTo">安全风险监控 </p>
                <p class="titleJumpTo">
                    <router-link to="HDFMonitor">隐患整改监控</router-link>
                </p>
                <p class="titleJumpTo">
                    <router-link to="ERMonitoring">应急救援监控</router-link>
                </p>
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
                                <select name="" id="company" v-model="mapData.valCompany" @change="selCompany($event)">
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
                                <select name="" id="segments" v-model="mapData.valSegments" @change="selCompany($event)">
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
                    <div class="leftMidMaskTrigger" @click="maskShow" v-show="MaskTrigger">
                        <img src="./../assets/SRMonitoringImg/地图弹出层箭头.png" alt="">
                    </div>
                    <div class="leftMidMask"  v-show="maskShowTrigger">
                        <div class="leftMidMaskArrow">
                            <img src="./../assets/SRMonitoringImg/地图弹出层箭头.png" @click="maskShow">
                        </div>
                        <div class="leftMidMaskTableTitle">
                            <table>
                                <thead>
                                    <tr>
                                        <th>风险清单项</th>
                                        <th>最近检查时间</th>
                                        <th>检查次数</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <table  :class="{'tableScrollAnimation': tableData.length>=15}">
                            <tbody>
                                <tr v-for="(data,i) in tableData" :value="data.project" :key="i">
                                    <td>{{data.project}}</td>
                                    <td>{{data.name}}</td>
                                    <td>{{i}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mapFrame">
                        <myMap :msg='mapData' ref="map" class="myMap"/>
                    </div>
<!--                    <div ref="mapFrame" class="mapFrame"></div>-->
                </div>
                <div class="leftBottom">
                    <div class="leftBottomLeft">
                        <h4>风险源开工信息统计</h4>
                        <div class="leftBottomLeftFrame">
                            <div class="leftBottomLeftFrameLeft">
                                <div>
                                    <p>风险源总数</p>
                                    <p><i>{{StatisticsStartInformationRiskSourcesData.allDanger}}</i>项</p>
                                </div>
                                <div>
                                    <p>已完工数</p>
                                    <p><i>{{StatisticsStartInformationRiskSourcesData.endDanger}}</i>项</p>
                                </div>
                                <div>
                                    <p>未完工数</p>
                                    <p><i>{{StatisticsStartInformationRiskSourcesData.startDanger}}</i>项</p>
                                </div>
                            </div>
                            <div class="labelLeftFrame">
                                <div ref="labelLeft" class="labelLeft"></div>
                            </div>
                        </div>
                    </div>
                    <div class="leftBottomMid">
                        <h4>风险处理信息统计</h4>
                        <div class="leftBottomMidFrame">
                            <div class="leftBottomMidFrameLeft">
                                <div>
                                    <p>发生风险数</p>
                                    <p><i>{{RiskHandlingInformationStatisticsData.riskDanger.allDanger}}</i>项</p>
                                </div>
                                <div>
                                    <p>已处理完</p>
                                    <p><i>{{RiskHandlingInformationStatisticsData.riskDanger.processed}}</i>项</p>
                                </div>
                                <div>
                                    <p>未处理完</p>
                                    <p><i class="redMark">{{RiskHandlingInformationStatisticsData.riskDanger.untreated}}</i>项</p>
                                </div>
                            </div>
                            <div class="labelMidFrame">
                                <div ref="labelMid" class="labelMid"></div>
                            </div>
                        </div>
                    </div>
                    <div class="leftBottomRight">
                        <h4>风险发生级别趋势</h4>
                        <div ref="labelRight" class="labelRight"></div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="rightTop">
                    <h3>危大工程安全预警监控</h3>
                    <div class="rightTopFrame">
                        <div class="rightTopLeft">
                            <div>
                                <div>
                                    <div class="rightTopLeftImg">
                                        <img src="./../assets/SRMonitoringImg/菱形一级.png" alt="">
                                        <span>{{safetyRisk.oneType}}</span>
                                    </div>
                                    <p>Ⅰ级</p>
                                </div>
                                <div>
                                    <div class="rightTopLeftImg">
                                        <img src="./../assets/SRMonitoringImg/菱形二级.png" alt="">
                                        <span>{{safetyRisk.twoType}}</span>
                                    </div>
                                    <p>Ⅱ级</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div class="rightTopLeftImg">
                                        <img src="./../assets/SRMonitoringImg/菱形三级.png" alt="">
                                        <span>{{safetyRisk.threeType}}</span>
                                    </div>
                                    <p>Ⅲ级</p>
                                </div>
                                <div>
                                    <div class="rightTopLeftImg">
                                        <img src="./../assets/SRMonitoringImg/菱形四级.png" alt="">
                                        <span>{{safetyRisk.fourType}}</span>
                                    </div>
                                    <p>Ⅳ级</p>
                                </div>
                            </div>
                        </div>
                        <div class="rightTopRight">
                            <div>
                                <i v-for="(data,i) in DBP" :key="i" @click="DBProject(i)" :class="{checkI:i === DBPIsShow}">{{data}}</i>
                            </div>
                            <div class="tableFrame">
                                <div class="tableFrameTableTitle">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>序号</th>
                                                <th>隶属项目</th>
                                                <th>危险源</th>
                                                <th>部位</th>
                                                <th>预警级别</th>
                                                <th>发生时间</th>
                                                <th>监控</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div>
                                    <table  :class="{'tableScrollAnimation': SafetyEarlyWarningMonitoringDangerousProjectsTableLength>=3}" ref="tableFrameTable">
                                        <tbody>
                                            <tr v-for="(data,i) in (DBPIsShow===0?safetyRiskList.deepFP:DBPIsShow===1?safetyRiskList.highM:safetyRiskList.highS)" :value="data.F_ProjectName" :key="i">
                                                <td>{{++i}}</td>
                                                <td>{{data.F_ProjectName}}</td>
                                                <td>{{data.F_BidSection}}</td>
                                                <td>{{data.F_TestAddress}}</td>
                                                <td>{{data.F_WarnParameter}}</td>
                                                <td>{{data.F_CollectionDate}}</td>
                                                <td>{{data.F_WarnType}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rightMid">
                    <h3>特种设备安全预警监控</h3>
                    <div class="rightMidFrame">
                        <div class="rightMidLeft">
                            <div>
                                <div>
                                    <div class="rightMidLeftImg">
                                        <img src="./../assets/SRMonitoringImg/菱形一级.png" alt="">
                                        <span>{{specialEquipment.oneType}}</span>
                                    </div>
                                    <p>Ⅰ级</p>
                                </div>
                                <div>
                                    <div class="rightMidLeftImg">
                                        <img src="./../assets/SRMonitoringImg/菱形二级.png" alt="">
                                        <span>{{specialEquipment.twoType}}</span>
                                    </div>
                                    <p>Ⅱ级</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div class="rightMidLeftImg">
                                        <img src="./../assets/SRMonitoringImg/菱形三级.png" alt="">
                                        <span>{{specialEquipment.threeType}}</span>
                                    </div>
                                    <p>Ⅲ级</p>
                                </div>
                                <div>
                                    <div class="rightMidLeftImg">
                                        <img src="./../assets/SRMonitoringImg/菱形四级.png" alt="">
                                        <span>{{specialEquipment.fourType}}</span>
                                    </div>
                                    <p>Ⅳ级</p>
                                </div>
                            </div>
                        </div>
                        <div class="rightMidRight">
                            <div>
                                <i v-for="(data,i) in SE" :key="i" @click="SEquipment(i)" :class="{checkI:i === SEIsShow}">{{data}}</i>
                            </div>
                            <div class="rightMidRightTableTitle">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>序号</th>
                                            <th>项目名称</th>
                                            <th>标段</th>
                                            <th>监测工点</th>
                                            <th>监控参数</th>
                                            <th>采集时间</th>
                                            <th>预警级别</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <table ref="rightMRTable"  :class="{'tableScrollAnimation': SafetyEarlyWarningMonitoringSpecialEquipmentTableLength>=3}">
                                <tbody>
                                    <tr v-for="(data,i) in (SEIsShow===0?specialEquipmentList.towerC:SEIsShow===1?specialEquipmentList.gantryC:(SEIsShow===2?specialEquipmentList.constructionE:specialEquipmentList.bridgeEM))" :value="data.F_ProjectName" :key="i">
                                        <td>{{++i}}</td>
                                        <td>{{data.F_ProjectName}}</td>
                                        <td>{{data.F_BidSection}}</td>
                                        <td>{{data.F_TestAddress}}</td>
                                        <td>{{data.F_WarnParameter}}</td>
                                        <td>{{data.F_CollectionDate}}</td>
                                        <td>{{data.F_WarnType}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="rightBottom">
                    <div class="rightBottomTitle">
                        <h3>现场监控</h3>
                        <p>更多》</p>
                    </div>
                    <div class="rightBottomFrame">
                        <div class="rightBottomFrameTop">
                            <div>
                                <img src="./../assets/SRMonitoringImg/现场监控1.png" alt="">
                            </div>
                            <div>
                                <img src="./../assets/SRMonitoringImg/现场监控2.png" alt="">
                            </div>
                            <div>
                                <img src="./../assets/SRMonitoringImg/现场监控3.png" alt="">
                            </div>
                        </div>
                        <div class="rightBottomFrameBottom">
                            <div>
                                <img src="./../assets/SRMonitoringImg/现场监控4.png" alt="">
                            </div>
                            <div>
                                <img src="./../assets/SRMonitoringImg/现场监控5.png" alt="">
                            </div>
                            <div>
                                <img src="./../assets/SRMonitoringImg/现场监控6.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import myMap from '../components/indexPage/myMap.vue';
    export default {
        name: "SRMonitoring",
        components: {
            myMap
        },
        data() {
            return {
                SafetyEarlyWarningMonitoringDangerousProjectsTableLength: '',
                SafetyEarlyWarningMonitoringSpecialEquipmentTableLength: '',
                RiskHandlingInformationStatisticsData:{
                    riskDanger: '',
                    riskDangerLevel: ''
                },
                DBPIsShow: 0,
                SEIsShow: 0,
                DBP: ['深基坑监控','高支模监控','高边坡监控','隧道监控'],
                SE: ['塔吊','龙门吊','施工电梯','架桥机'],
                safetyRisk: '',
                safetyRiskList: {
                    deepFP: [],
                    highM: [],
                    highS: [],
                },
                specialEquipment: '',
                specialEquipmentList: {
                    towerC: [],
                    gantryC: [],
                    constructionE: [],
                    bridgeEM: [],
                },
                StatisticsStartInformationRiskSourcesData:'',
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
                    {project:'易燃物',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'吊篮',name:'2019-09-29',post:'002',certificate:'002',time:'002',date:'002'},
                    {project:'无证上岗',name:'2019-09-29',post:'003',certificate:'003',time:'003',date:'003'},
                    {project:'幽闭空间',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'化学物品',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'高压电',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'空压机',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'违规操作',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'易爆品',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'高边坡',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'高压机',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'幽闭空间',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'无证上岗',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'吊篮',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'化学物品',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'易燃物',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'高边坡',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'易爆品',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                    {project:'高压电',name:'2019-09-29',post:'001',certificate:'001',time:'001',date:'001'},
                ],
                MaskTrigger:true,
                maskShowTrigger:false
            }
        },
        methods:{
            selCompany(e) {
                this.$refs.map.getData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract, this.mapData.valYear, this.mapData.valMonth, this.mapData.valSeason);
                this.getContractVal(this.mapData.valProject);
                this.changeSeasonMonth(e);
                this.$refs.map.getRouteData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract);
                this.getStatisticsStartInformationRiskSourcesData();
                this.getSRData();
                this.getRiskHandlingInformationStatisticsData();
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
                    })
                    .catch(function (error) {

                    });
            },
            creatLabelLeft() {
                const that = this;
                const echarts = require('echarts');
                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(this.$refs.labelLeft);

                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c}项"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'middle',
                        data: ['已完工数', '未完工数'],
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
                                        let html='风险源开工'+"\n"+'信息统计';
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
                                {value: that.StatisticsStartInformationRiskSourcesData.endDanger, name: '已完工数'},
                                {value: that.StatisticsStartInformationRiskSourcesData.startDanger, name: '未完工数'},
                            ],
                            color: ['#00B050','#FFC000']
                        },
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            creatLabelMid() {
                const that = this;
                const echarts = require('echarts');
                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(this.$refs.labelMid);

                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c}项"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'middle',
                        data: ['已处理完', '未处理完'],
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
                                        let html='风险处理'+"\n"+'信息统计';
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
                                {value: that.RiskHandlingInformationStatisticsData.riskDanger.processed, name: '已处理完'},
                                {value: that.RiskHandlingInformationStatisticsData.riskDanger.untreated, name: '未处理完'},
                            ],
                            color: ['#00B050','#FFC000']
                        },
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            creatLabelRight() {
                const that = this;
                const echarts = require('echarts');
                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(this.$refs.labelRight);

                let option = {
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
                        left:"25px",
                        right:"10px",
                        bottom:"30px",
                        containLabel: false
                    },
                    xAxis: {
                        splitLine :{    //网格线
                            lineStyle:{
                                color: '#262F43',
                                type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                            },
                            show:false //隐藏或显示
                        },
                        type: 'category',
                        data: ['Ⅰ级风险','Ⅱ级风险','Ⅲ级风险','Ⅳ级风险'],
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#00d2ff',
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#00d2ff',
                            },
                            data:[1,25,50,75,100]
                        },
                        splitLine :{    //网格线
                            lineStyle:{
                                color: '#262F43',
                                type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                            },
                            show:true //隐藏或显示
                        },
                    },
                    series: [
                        {
                            name: '项',
                            type: 'bar',
                            data: [that.RiskHandlingInformationStatisticsData.riskDangerLevel.oneType,that.RiskHandlingInformationStatisticsData.riskDangerLevel.twoType,that.RiskHandlingInformationStatisticsData.riskDangerLevel.threeType,that.RiskHandlingInformationStatisticsData.riskDangerLevel.fourType],
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        let colorList = [
                                            "#FF0000",
                                            "#ED7D31",
                                            "#FFFF00",
                                            "#5B9BD5",
                                        ];
                                        return colorList[params.dataIndex];
                                    }
                                }
                            },
                            barWidth : 20,
                            label: {
                                normal: {
                                    show: true,
                                    textBorderColor: '#333',
                                    textBorderWidth: 2,
                                },
                            },
                        },
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            maskShow(e){
                if(this.MaskTrigger === true){
                    this.MaskTrigger = false;
                    this.maskShowTrigger = true;
                }else {
                    this.MaskTrigger = true;
                    this.maskShowTrigger = false;
                }
            },
            getStatisticsStartInformationRiskSourcesData(){
                const that = this;
                const parameter = {
                    companyId: this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract,
                    yearStr: this.mapData.valYear,
                    monthStr: this.mapData.valMonth,
                    quarterStr: this.mapData.valSeason,
                };
                // 发送 POST 请求
                this.$getUrl('getRiskDangerData.do', parameter)
                    .then(function (response) {
                        that.StatisticsStartInformationRiskSourcesData = response.riskDangerData[0];

                        that.creatLabelLeft();
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            },
            getSRData(){
                const that = this;
                const parameter = {
                    companyId: this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract,
                    yearStr: this.mapData.valYear,
                    monthStr: this.mapData.valMonth,
                    quarterStr: this.mapData.valSeason,
                };
                // 发送 POST 请求
                this.$getUrlEP('getSafetyRisk.do', parameter)
                    .then(function (response) {
                        console.log(response);
                        let data = response;
                        data.safetyRiskList.map(data => {
                            if(data.ttype === 1){
                                that.safetyRiskList.deepFP.push(data);
                            }else if(data.ttype === 2){
                                that.safetyRiskList.highM.push(data);
                            }else if(data.ttype === 3){
                                that.safetyRiskList.highS.push(data);
                            }
                        });
                        data.specialEquipmentList.map(data => {
                            if(data.ttype === 1){
                                that.specialEquipmentList.towerC.push(data);
                            }else if(data.ttype === 2){
                                that.specialEquipmentList.gantryC.push(data);
                            }else if(data.ttype === 3){
                                that.specialEquipmentList.constructionE.push(data);
                            }else if(data.ttype === 4){
                                that.specialEquipmentList.bridgeEM.push(data);
                            }
                        });
                        that.safetyRisk = data.safetyRisk[0];
                        that.specialEquipment = data.specialEquipment[0];
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            },
            getRiskHandlingInformationStatisticsData(){
                const that = this;
                const parameter = {
                    companyId: this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract,
                    yearStr: this.mapData.valYear,
                    monthStr: this.mapData.valMonth,
                    quarterStr: this.mapData.valSeason,
                };
                // 发送 POST 请求
                this.$getUrlEP('getRiskDanger.do', parameter)
                    .then(function (data) {
                        console.log(data);
                        that.RiskHandlingInformationStatisticsData.riskDanger = data.riskDanger[0];
                        that.RiskHandlingInformationStatisticsData.riskDangerLevel = data.riskDangerLevel[0];

                        that.creatLabelMid();
                        that.creatLabelRight();
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            },
            DBProject(e){
                this.DBPIsShow = e;
            },
            SEquipment(e){
                this.SEIsShow = e;
            },
        },
        mounted() {
            this.getProjectVal();
            this.getContractVal();
            this.getData();
            this.getStatisticsStartInformationRiskSourcesData();
            this.getSRData();
            this.getRiskHandlingInformationStatisticsData();
            console.log(this.$refs.rightMRTable.rows.length);
            this.SafetyEarlyWarningMonitoringDangerousProjectsTableLength = this.$refs.tableFrameTable.rows.length;
            this.SafetyEarlyWarningMonitoringSpecialEquipmentTableLength = this.$refs.rightMRTable.rows.length;
        },
    }
</script>

<style scoped>
    #SRMonitoring {
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
        background: url('./../assets/SRMonitoringImg/背景.png') no-repeat;
        background-size: 100% 100%;
        padding: 30px;
        padding-top: 4%;
        display: flex;
        justify-content: space-between;
    }

    .left{
        width: 54%;
        position: relative;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
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
        background: url('./../assets/SRMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        padding: 25px;
        position: relative;
    }

    .mapFrame {
        width: 100%;
        height: 100%;
    }

    .leftMidMaskTrigger{
        position: absolute;
        right: 15px;
        top: 15px;
        margin: 25px;
        z-index: 1000;
        cursor: pointer;
    }

    .leftMidMask{
        position: absolute;
        right: 15px;
        top: 15px;
        margin: 25px;
        background-color: #2F4F88;
        padding: 10px;
        width: 38%;
        height: 375px;
        z-index: 1000;
        overflow: hidden;
    }

    .leftMidMaskArrow{
        background-color: #2F4F88;
        z-index: 1100;
        padding-top: 10px;
        position: relative;
        top: -10px;
    }

    .leftMidMaskArrow img{
        height: 25px;
        z-index: 10000;
        position: relative;
        cursor: pointer;
    }

    .leftMidMaskTableTitle{
        background-color: #2F4F88;
        z-index: 1000;
        position: relative;
        top: -12px;
        padding-bottom: 10px;
        text-align: center;
    }

    .leftMidMask table{
        width: 100%;
        text-align: center;
        color: #02E3FA;
        border-collapse: collapse;
        table-layout: fixed;
    }

    .leftMidMask table th{
        padding: 0 15px;
    }

    .leftMidMask table td {
        border-bottom: 1px dashed #7F9EBA;
    }
    
    .leftBottom{
        display: flex;
        justify-content: space-between;
        padding-top: 15px;
    }

    .leftBottomLeft,.leftBottomMid,.leftBottomRight{
        background: url('./../assets/SRMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        padding: 10px;
        flex: 1;
    }

    .leftBottomLeft,.leftBottomMid{
        margin-right: 15px;
    }

    .leftBottomLeftFrame,.leftBottomMidFrame{
        display: flex;
        justify-content: space-between;
    }

    .leftBottomLeftFrameLeft,.leftBottomMidFrameLeft{
        padding: 0 15px;
        flex: 1;
        color: #02E3FA;
    }

    .leftBottomLeftFrameLeft i,.leftBottomMidFrameLeft i{
        color: #fff;
    }

    .leftBottomMidFrameLeft .redMark{
        color: #CA0C00;
    }

    .labelLeftFrame,.labelMidFrame{
        flex: 2;
    }

    .labelLeft,.labelMid,.labelRight{
        width: 100%;
        height: 100%;
    }

    .leftBottomLeftFrameLeft>div,.leftBottomMidFrameLeft>div{
        margin: 10px 0;
        padding: 5px;
        background-color: #1F3661;
        text-align: center;
    }

    .right{
        width: 46%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }

    .rightTop{
        background: url('./../assets/SRMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        padding: 10px;
        margin: 10px;
        flex: 1;
        overflow: hidden;
    }

    .rightTopFrame{
        display: flex;
        justify-content: space-between;
        height: 100%;
    }

    .rightTopLeft,.rightMidLeft{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        text-align: center;
        padding-bottom: 30px;
        padding-top: 15px;
        padding-left: 10px;
        margin-right: 20px;
        color: #02E3FA;
    }

    .rightTopLeft>div,.rightMidLeft>div{
        flex-basis: 100%;
        display: flex;
        justify-content: space-between;
    }

    .rightTopLeft img,.rightMidLeft img{
        height: 50px;
    }

    .rightMidLeftImg,.rightTopLeftImg{
        position: relative;
    }

    .rightMidLeftImg span,.rightTopLeftImg span{
        position: absolute;
        top: 25%;
        left: 40%;
        color: #fff;
        font-weight: bold;
        font-size: 15px;
        text-shadow:2px 2px #000;
    }

    .rightTopRight{
        flex: 5;
    }

    .rightTopRight i{
        display: inline-block;
        padding: 5px 10px;
        border: 1px dashed #2E75B6;
        border-radius: 5px;
        color: #02E3FA;
    }

    .rightTopRight .tableFrame{
        height: 100%;
        overflow: hidden;
    }

    .tableFrameTableTitle{
        background-color: #0D1963;
        z-index: 1000;
        padding: 10px 0;
        position: relative;
        top: -5px;
        text-align: center;
    }

    .rightTopRight table{
        width: 100%;
        text-align: center;
        color: #02E3FA;
        border-collapse: collapse;
        table-layout: fixed;
    }

    .rightTopRight table td {
        border-bottom: 1px dashed #7F9EBA;
    }

    .rightTopRight table th:first-child{
        width: 60px;
    }

    .rightTopRight table th:nth-child(3), .rightTopRight table th:nth-child(4){
        width: 70px;
    }

    .rightTopRight table td:first-child{
        width: 60px;
    }

    .rightTopRight table td:nth-child(3),.rightTopRight table td:nth-child(4){
        width: 70px;
    }

    .rightMid{
        background: url('./../assets/SRMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        padding: 10px;
        margin: 10px;
        flex: 1;
        overflow: hidden;
    }

    .rightMidFrame{
        display: flex;
        justify-content: space-between;
        height: 100%;
    }

    /*.rightMidLeft{*/
    /*    flex: 1;*/
    /*    margin-right: 20px;*/
    /*    justify-content: center;*/
    /*    align-items: center;*/
    /*    display: flex;*/
    /*    padding-bottom: 15px;*/
    /*}*/

    /*.rightMidLeft img{*/
    /*    height: 65%;*/
    /*}*/

    .rightMidRight{
        flex: 5;
        height: 100%;
        overflow: hidden;
    }

    .rightMidRight>div:first-child{
        background-color: #0D1963;
        z-index: 1000;
        position: relative;
        top: 0;
    }

    .rightMidRight>div:first-child i{
        display: inline-block;
        padding: 5px 10px;
        border: 1px dashed #2E75B6;
        border-radius: 5px;
        color: #02E3FA;
    }

    /*.rightMidRight>div:first-child i:nth-child(2){*/
    /*    color: #fff;*/
    /*    background-color: #164989;*/
    /*}*/

    .checkI{
        color: #fff !important;
        background-color: #164989;
    }

    .rightMidRightTableTitle{
        background-color: #0D1963;
        z-index: 1000;
        padding: 10px 0;
        position: relative;
        top: 0;
        text-align: center;
    }

    .rightMidRight table{
        width: 100%;
        text-align: center;
        color: #02E3FA;
        border-collapse: collapse;
        table-layout: fixed;
    }

    .rightMidRight table th:first-child{
        width: 60px;
    }

    .rightMidRight table th:nth-child(3), .rightMidRight table th:nth-child(4){
        width: 70px;
    }

    .rightMidRight table td:first-child{
        width: 60px;
    }

    .rightMidRight table td:nth-child(3),.rightMidRight table td:nth-child(4){
        width: 70px;
    }

    .tableScrollAnimation{
        position: relative;
        top: 0;
        -webkit-animation: scrollToUp 10s linear infinite; /* 引入 scrollToUp动画 */
        animation: scrollToUp 10s linear infinite;
    }

    .rightMidRight table td {
        border-bottom: 1px dashed #7F9EBA;
    }

    .rightBottom{
        background: url('./../assets/SRMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        padding: 10px;
        margin: 10px;
        flex: 1;
    }

    .rightBottomTitle{
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }

    .rightBottomTitle p{
        color: #02E3FA;
    }

    .rightBottomFrame{
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
    }

    .rightBottomFrame img{
        height: 100px;
    }

    .rightBottomFrameTop,.rightBottomFrameBottom{
        flex-basis: 100%;
        display: flex;
        justify-content: space-between;
        text-align: center;
    }

    .rightBottomFrameTop div,.rightBottomFrameBottom div{
        width: 100%;
        height: 100%;
    }

    .rightBottomFrameTop div{
        border-bottom: 1px dashed #02E3FA;
        border-right: 1px dashed #02E3FA;
    }

    .rightBottomFrameBottom div{
        border-top: 1px dashed #02E3FA;
        border-right: 1px dashed #02E3FA;
    }

    .rightBottomFrameTop div:last-child,.rightBottomFrameBottom div:last-child{
        border-right:none;
    }

    /*table滚动动画*/
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