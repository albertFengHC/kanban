<template>
    <div id="HDFMonitor">
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
                <p class="titleJumpTo">隐患整改监控</p>
                <p class="titleJumpTo">
                    <router-link to="ERMonitoring">应急救援监控</router-link>
                </p>
            </div>
            <div class="left">
                <div class="leftTopFrame">
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
                        <myMap :msg='mapData' ref="map" class="myMap"/>
                        <!--                    <div ref="mapFrame" class="mapFrame"></div>-->
                    </div>
                </div>
                <div class="leftBottom">
                    <div class="leftBottomLeft">
                        <h4>排查隐患信息统计</h4>
                        <div class="leftBottomLeftFrame">
                            <div class="leftBottomLeftFrameLeft">
                                <div class="leftBottomLeftFrameLeftLeft">
                                    <p>隐患排查数:</p>
                                    <h4>{{trapDailyData.trapDaily}}</h4>
                                </div>
                                <div class="leftBottomLeftFrameLeftRight">
                                    <div class="column">
                                        <div class="item">
                                            <p>已按期整改销号:</p>
                                            <h4 class="leftBottomLeftFrameLeftRightFirst">{{trapDailyData.punctualSale}}</h4>
                                        </div>
                                        <div class="item">
                                            <p>未按期未销号:</p>
                                            <h4 class="leftBottomLeftFrameLeftRightSecond">{{trapDailyData.noPunctualNoSale}}</h4>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <div class="item">
                                            <p>未按期但整改销号:</p>
                                            <h4 class="leftBottomLeftFrameLeftRightThird">{{trapDailyData.noPunctualSale}}</h4>
                                        </div>
                                        <div class="item">
                                            <p>未销号:</p>
                                            <h4 class="leftBottomLeftFrameLeftRightFourth">{{trapDailyData.noSale}}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="labelLeftFrame">
                                <div ref="labelLeft" class="labelLeft"></div>
                            </div>
                        </div>
                    </div>
                    <div class="leftBottomRight">
                        <h4>排查隐患级别趋势</h4>
                        <div ref="labelRight" class="labelRight"></div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="rightTop">
                    <div class="rightTopFrame">
                        <div class="rightTopLeft">
                            <div>
                                <div>
                                    <img src="./../assets/HDFMonitorImg/菱形项目公司.png" alt="">
                                    <p>项目公司</p>
                                </div>
                                <div>
                                    <img src="./../assets/HDFMonitorImg/菱形项目部.png" alt="">
                                    <p>项目部</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src="./../assets/HDFMonitorImg/菱形子公司.png" alt="">
                                    <p>子公司</p>
                                </div>
                                <div>
                                    <img src="./../assets/HDFMonitorImg/菱形集团.png" alt="">
                                    <p>集团</p>
                                </div>
                            </div>
                        </div>
                        <div class="rightTopRight">
                            <div>
                                <i>集团公司督办</i>
                                <i>分子公司督办</i>
                                <i>项目公司督办</i>
                                <i>指挥部督办</i>
                                <i>项目部督办</i>
                            </div>
                            <div class="rightTopRightTableFrame">
                                <div class="rightTopRightTableFrameTableTitle">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>序号</th>
                                                <th>检查单位</th>
                                                <th>检查时间</th>
                                                <th>被检查单位</th>
                                                <th>隐患类别</th>
                                                <th>要求整改时间</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <table :class="{'tableScrollAnimation': HDSGCUSNData.length>=15}">
                                    <tbody>
                                        <tr v-for="(data,i) in HDSGCUSNData" :value="data.F_Id" :key="i" @click="getDIHDUSNData(data.F_Id)">
                                            <td>{{++i}}</td>
                                            <td>{{data.F_CompanyName}}</td>
                                            <td>{{data.F_CheckDate}}</td>
                                            <td>{{data.F_PassiveName}}</td>
                                            <td>{{data.F_TrapType}}</td>
                                            <td>{{data.F_LastDate}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rightBottom">
                    <div class="rightBottomTop">
                        <i v-for="(data,i) in SE" :key="i" @click="SEquipment(i)" :class="{checkI:i === SEIsShow}">{{data}}</i>
                    </div>
                    <div class="rightBottomBottom">
                        <table v-show="SEIsShow === 0">
                            <tbody>
                                <tr>
                                    <td>检查单位:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_CompanyName}}</td>
                                    <td>检查记录编号:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_TrapNo}}</td>
                                </tr>
                                <tr>
                                    <td>检查人:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_CheckName}}</td>
                                    <td>检查时间:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_CheckDate}}</td>
                                </tr>
                                <tr>
                                    <td>被检查单位:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_PassiveName}}</td>
                                    <td>要求整改截止时间:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_LastDate}}</td>
                                </tr>
                                <tr>
                                    <td>存在隐患工程名称:</td>
                                    <td class="tableRight" colspan="3">{{DIHDUSNData.recordMessage.f_DangerName}}</td>
                                </tr>
                                <tr>
                                    <td>坐标经度:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_Longitude}}</td>
                                    <td>坐标纬度:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_Latitude}}</td>
                                </tr>
                                <tr>
                                    <td>检查发问题:</td>
                                    <td class="tableRight" colspan="3"><button class="CheckIssueProblems" v-show="DIHDUSNData.recordMessageItem.length>=1" @click="CheckIssueProblemsDetail">点击查看</button></td><span v-show="DIHDUSNData.recordMessageItem.length === 0">无</span>
                                </tr>
                                <tr>
                                    <td>发现问题描述:</td>
                                    <td class="tableRight" colspan="3">{{DIHDUSNData.recordMessage.f_ProblemDesc}}</td>
                                </tr>
                                <tr>
                                    <td>整改要求:</td>
                                    <td class="tableRight" colspan="3">{{DIHDUSNData.recordMessage.f_RequireDesc}}</td>
                                </tr>
                                <tr>
                                    <td>排查工程对象:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_TestObject}}</td>
                                    <td>隐患类别:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_TrapClass}}</td>
                                </tr>
                                <tr>
                                    <td>隐患类型:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_TrapType}}</td>
                                    <td>督办级别:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_TrapClass}}</td>
                                </tr>
                                <tr>
                                    <td>整改责任人:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_AcceptName}}</td>
                                    <td>督办人:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordMessage.f_ReadName}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table v-show="SEIsShow === 1">
                            <tbody>
                                <tr>
                                    <td>整改记录编号:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordBack.f_BackNo}}</td>
                                    <td>整改填报人:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordBack.f_RecordName}}</td>
                                </tr>
                                <tr>
                                    <td>整改情况综述:</td>
                                    <td class="tableRight" colspan="3">{{DIHDUSNData.recordBack.f_BackDesc}}</td>
                                </tr>
                                <tr>
                                    <td>整改详细情况:</td>
                                    <td class="tableRight" colspan="3">{{DIHDUSNData.recordBack.f_BackDetail}}</td>
                                </tr>
                                <tr>
                                    <td>整改单位负责人:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordBack.f_PrincipalName}}</td>
                                    <td>整改完成时间:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordBack.f_FinishDate}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table v-show="SEIsShow === 2">
                            <tbody>
                                <tr>
                                    <td>复核验证人:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordReview.f_ReviewName}}</td>
                                    <td>复核时间:</td>
                                    <td class="tableRight">{{DIHDUSNData.recordReview.f_ReviewDate}}</td>
                                </tr>
                                <tr>
                                    <td>复核意见:</td>
                                    <td class="tableRight" colspan="3">{{DIHDUSNData.recordReview.f_Message}}</td>
                                </tr>
                                <tr>
                                    <td>复核结果:</td>
                                    <td class="tableRight" colspan="3">{{DIHDUSNData.recordReview.f_Status}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="CheckIssueProblemsTable" v-show="CheckIssueProblemsDetailShow">
                        <h3>检查发问题</h3>
                        <p @click="CheckIssueProblemsHide">X</p>
                        <table>
                            <div v-show="DIHDUSNData.recordMessageItem.length === 0">无信息</div>
                            <thead>
                            <tr>
                                <th>项目编号</th>
                                <th>隐患级别</th>
                                <th>排查内容</th>
                            </tr>
                            </thead>
                            <tbody v-show="DIHDUSNData.recordMessageItem.length>=1">
                            <tr v-for="(data,i) in DIHDUSNData.recordMessageItem" :value="data.F_ItemNo" :key="i">
                                <td>{{data.F_ItemNo}}</td>
                                <td>{{data.F_TrapLevel}}</td>
                                <td>{{data.F_ItemName}}</td>
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
        name: "HDFMonitor",
        components: {
            myMap
        },
        data() {
            return {
                CheckIssueProblemsDetailShow: false,
                DIHDUSNData: {
                    recordBack: '',
                    recordMessage: '',
                    recordReview: '',
                    recordMessageItem: '',
                },
                SEIsShow: 0,
                SE: ['隐患巡查情况','隐患整改情况','隐患复核情况'],
                HDSGCUSNData:'',
                trapDailyData:'',
                trapDailyLevelData:'',
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
            }
        },
        methods:{
            selCompany(e) {
                // let val = e.target.value;
                // this.mapData = val;
                this.$refs.map.getData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract, this.mapData.valYear, this.mapData.valMonth, this.mapData.valSeason);
                this.getContractVal(this.mapData.valProject);
                this.changeSeasonMonth(e);
                this.$refs.map.getRouteData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract);
                this.getHDSGCUSNData();
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
            getHDSGCUSNData() {
                const that = this;
                const parameter = {
                    companyId: this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract,
                    yearStr: this.mapData.valYear,
                    monthStr: this.mapData.valMonth,
                    quarterStr: this.mapData.valSeason,
                };
                // 发送 POST 请求
                this.$getUrlEP('getRecordRectify.do', parameter)
                    .then(function (data) {
                        that.HDSGCUSNData = data.recordRectify;
                        console.log(that.HDSGCUSNData);
                    })
                    .catch(function (error) {

                    });
            },
            getDIHDUSNData(e){
                console.log(e);
                const that = this;
                const parameter = {
                    fid: e,
                };
                // 发送 POST 请求
                this.$getUrlEP('getRecordRectifyByFid.do', parameter)
                    .then(function (data) {
                        console.log(data);
                        data.recordMessage === null?that.DIHDUSNData.recordMessage = '':that.DIHDUSNData.recordMessage = data.recordMessage;
                        data.recordBack === null?that.DIHDUSNData.recordBack = '':that.DIHDUSNData.recordBack = data.recordBack;
                        data.recordReview === null?that.DIHDUSNData.recordReview = '':that.DIHDUSNData.recordReview = data.recordReview;
                        console.log(that.DIHDUSNData);
                        data.recordMessageItem === null?that.DIHDUSNData.recordMessageItem = '':that.DIHDUSNData.recordMessageItem = data.recordMessageItem;
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
                        data: ['已按期整改销号', '未按期未销号', '未按期但整改销号','未销号'],
                        textStyle: {
                            color: '#fff'
                        },
                        show:false
                    },
                    series: [
                        {
                            // name: '访问来源',
                            type: 'pie',
                            radius: ['70%', '100%'],
                            center: ["50%", "50%"],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    formatter:function (argument) {
                                        let html='排查隐患' +"\n"+
                                        '信息统计';
                                        return html;
                                    },
                                    textStyle:{
                                        // fontSize: 15,
                                        color:'#00d2ff'
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
                                {value: that.trapDailyData.punctualSale, name: '已按期整改销号'},
                                {value: that.trapDailyData.noPunctualNoSale, name: '未按期未销号'},
                                {value: that.trapDailyData.noPunctualSale, name: '未按期但整改销号'},
                                {value: that.trapDailyData.noSale, name: '未销号'},
                            ],
                            color: ['#E3AB00','#F40000','#FFF','#0f31bb']
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
                            data: that.trapDailyLevelData,
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
                                    textBorderWidth: 2
                                }
                            },
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
                        that.creatLabelLeft();
                        that.creatLabelRight();
                    })
                    .catch(function (error) {
                        // console.log(error);
                    });
            },
            SEquipment(e){
                this.SEIsShow = e;
            },
            CheckIssueProblemsDetail(){
                this.CheckIssueProblemsDetailShow = true;
            },
            CheckIssueProblemsHide(){
                this.CheckIssueProblemsDetailShow = false;
            }
        },
        updated(){
            // this.creatLabelLeft();
        },
        mounted() {

        },
        created() {
            this.getProjectVal();
            this.getContractVal();
            this.getHDSGCUSNData();
            this.getAllData();
        }
    }
</script>

<style scoped>
    #HDFMonitor {
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
        background: url('./../assets/HDFMonitorImg/背景.png') no-repeat;
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
    }

    .leftTopFrame{
        flex: 3;
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
        background: url('./../assets/HDFMonitorImg/地图背景框.png') no-repeat;
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
        padding-top: 15px;
        flex: 1;
    }

    .leftBottomLeft,.leftBottomRight{
        background: url('./../assets/HDFMonitorImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        padding: 10px;
    }

    .leftBottomLeft{
        margin-right: 15px;
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .leftBottomRight{
        flex: 1;
    }

    .leftBottomLeft h4{
        padding-bottom: 10px;
        flex: 1;
    }

    .leftBottomLeftFrame{
        display: flex;
        justify-content: space-between;
        flex: 4;
    }

    .leftBottomLeftFrameLeft{
        flex: 2;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #02E3FA;
    }

    .leftBottomLeftFrameLeft h4{
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80%;
    }

    .labelLeftFrame{
        flex: 1;
    }

    .labelLeft,.labelRight{
        width: 100%;
        height: 100%;
    }

    .leftBottomLeftFrameLeftLeft{
        background-color: #1F3661;
        padding: 5px;
        flex: 1;
        margin: 0 5px;
    }

    .leftBottomLeftFrameLeftLeft h4{
        color: #FFC000;
        font-size: 18px;
    }

    .leftBottomLeftFrameLeftRight{
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        flex: 3;
    }

    .leftBottomLeftFrameLeftRightFirst{
        font-size: 18px;
        color: #00B0F0;
    }

    .leftBottomLeftFrameLeftRightSecond{
        font-size: 18px;
        color: #FF0000;
    }

    .leftBottomLeftFrameLeftRightThird{
        font-size: 18px;
        color: #843C0B;
    }

    .leftBottomLeftFrameLeftRightFourth{
        font-size: 18px;
        color: #FF0000;
    }

    .column {
        flex-basis: 100%;
        display: flex;
        justify-content: space-between;
    }

    .column .item{
        width: 50%;
        background-color: #1F3661;
        padding: 5px;
        margin: 3px;
    }

    .right{
        width: 46%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }

    .rightTop{
        background: url('./../assets/HDFMonitorImg/未整改销号监控背景.png') no-repeat;
        background-size: 100% 100%;
        padding: 20px;
        padding-top: 50px;
        margin: 10px;
        flex: 1;
        overflow: hidden;
    }

    .rightTopFrame{
        display: flex;
        justify-content: space-between;
        height: 100%;
    }

    .rightTopLeft{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        text-align: center;
        padding-bottom: 30px;
        padding-top: 15px;
        padding-right: 10px;
        color: #02E3FA;
    }

    .rightTopLeft>div{
        flex-basis: 100%;
        display: flex;
        justify-content: space-between;
    }

    .rightTopLeft img{
        height: 60%;
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

    .rightTopRight i:nth-child(2){
        color: #fff;
        background-color: #164989;
    }

    .rightTopRightTableFrame{
        height: 100%;
        overflow: hidden;
    }

    .rightTopRightTableFrameTableTitle{
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

    .rightTopRight table th:first-child{
        width: 60px;
    }

    .rightTopRight table th:nth-child(3), .rightTopRight table td:nth-child(3){
        width: 90px;
    }

    .rightTopRight table th:nth-child(5), .rightTopRight table td:nth-child(5){
        width: 70px;
    }

    .rightTopRight table th:last-child,.rightTopRight table td:last-child{
        width: 90px;
    }

    .rightTopRight table td:first-child{
        width: 60px;
    }

    .tableScrollAnimation{
        position: relative;
        top: 0;
        -webkit-animation: scrollToUp 10s linear infinite; /* 引入 scrollToUp动画 */
        animation: scrollToUp 10s linear infinite;
    }

    .rightTopRight table td {
        border-bottom: 1px dashed #7F9EBA;
    }

    .rightTopRight table th:first-child{
        width: 60px;
    }

    .rightTopRight table td:first-child{
        width: 60px;
    }

    .rightMidLeft img{
        height: 65%;
    }

    .rightMidRight table{
        width: 100%;
        text-align: center;
        color: #02E3FA;
        border-collapse: collapse;
    }

    .rightMidRight table td {
        border-bottom: 1px dashed #7F9EBA;
    }

    .rightBottom{
        background: url('./../assets/HDFMonitorImg/未整改销号详细信息背景.png') no-repeat;
        background-size: 100% 100%;
        padding: 10px;
        padding-top: 50px;
        margin: 10px;
        margin-bottom: 0;
        flex: 2;
    }

    .rightBottomTitle p{
        color: #02E3FA;
    }

    .rightBottomFrame img{
        height: 100px;
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

    .rightBottom{
        text-align: center;
    }

    .rightBottomTop{
        border-bottom: 1px dashed #7F9EBA;
        margin: 0 10%;
    }

    .rightBottomTop i{
        display: inline-block;
        padding: 5px 10px;
        border: 1px dashed #2E75B6;
        border-radius: 5px;
        color: #02E3FA;
        margin: 0 15px;
    }

    .checkI{
        color: #fff !important;
        background-color: #164989;
    }

    .rightBottomBottom{
        height: 93%;
    }

    .rightBottomBottom table{
        width: 100%;
        height: 100%;
        text-align: right;
        color: #02E3FA;
    }

    .rightBottomBottom .tableRight{
        width: 35%;
        border-bottom: 1px dashed #7F9EBA;
        text-align: start;
        padding-left: 5px;
    }

    .CheckIssueProblems{
        background-color: #0d1963;
        color: #02E3FA;
        padding: 0 5px;
        border-radius: 5px;
        border: 1px solid #02E3FA;
        cursor: pointer;
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

    .CheckIssueProblemsTable{
        position: absolute;
        top: 40%;
        left: 5%;
        z-index: 10000;
        background-color: #0d1963;
        padding: 15px;
        overflow-y: auto;
        border: 1px dashed #2E75B6;
        border-radius: 5px;
    }

    .CheckIssueProblemsTable table{
        color: #02E3FA;
        text-align: left;
    }

    .CheckIssueProblemsTable table th{
        border-bottom: 1px dashed #7F9EBA;
        padding: 0 5px;
    }

    .CheckIssueProblemsTable table td{
        border-bottom: 1px dashed #7F9EBA;
        padding: 0 5px;
    }

    .CheckIssueProblemsTable div{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .CheckIssueProblemsTable>p{
        text-align: right;
        font-weight: bold;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        padding-right: 15px;
        padding-top: 10px;
        position: absolute;
        right: 0;
        top: 0;
    }
</style>