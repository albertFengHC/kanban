<template>
    <div id="EPMonitoring">
        <div class="box">
            <div class="titleJump">
                <p class="titleJumpTo">
                    <router-link to="indexPage">首页</router-link>
                </p>
                <p class="titleJumpTo">进场人员监控 </p>
                <p class="titleJumpTo">
                    <router-link to="SRMonitoring">安全风险监控</router-link>
                </p>
                <p class="titleJumpTo">
                    <router-link to="HDFMonitor">隐患整改监控</router-link>
                </p>
                <p class="titleJumpTo">
                    <router-link to="ERMonitoring">应急救援监控</router-link>
                </p>
            </div>
            <div class="top">
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
                    <div class="leftBottom">
                        <myMap :msg='mapData' ref="map" class="myMap"/>
                    </div>
                </div>
                <div class="right">
                    <div class="rightTop">
                        <h3>进场人员资质证书到期预警</h3>
                        <div class="rightTopFrame">
                            <div class="rightTopFrameLeft">
                                <div>
                                    <div class="rightTopFrameLeftFrame">
                                        <div class="rightTopFrameLeftImg">
                                            <img src="./../assets/EPMonitoringImg/菱形图片背景黄.png" alt="">
                                            <span>{{EntryPersonnelMonitoringData.approachPersonNum.staffYellow}}</span>
                                        </div>
                                        <div class="rightTopFrameLeftImg">
                                            <img src="./../assets/EPMonitoringImg/菱形图片背景红.png" alt="">
                                            <span>{{EntryPersonnelMonitoringData.approachPersonNum.staffRed}}</span>
                                        </div>
                                    </div>
                                    <p>管理人员预警</p>
                                </div>
                                <div>
                                    <div class="rightTopFrameLeftFrame">
                                        <div class="rightTopFrameLeftImg">
                                            <img src="./../assets/EPMonitoringImg/菱形图片背景黄.png" alt="">
                                            <span>{{EntryPersonnelMonitoringData.approachPersonNum.LaborYellow}}</span>
                                        </div>
                                        <div class="rightTopFrameLeftImg">
                                            <img src="./../assets/EPMonitoringImg/菱形图片背景红.png" alt="">
                                            <span>{{EntryPersonnelMonitoringData.approachPersonNum.LaborRed}}</span>
                                        </div>
                                    </div>
                                    <p>特种作业人员</p>
                                </div>
                            </div>
                            <div class="rightTopFrameRight">
                                <div class="rightTopFrameRightTableTitle">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>序号</th>
                                                <th>隶属项目</th>
                                                <th>姓名</th>
                                                <th>岗位</th>
                                                <th>证书编号</th>
                                                <th>签发时间</th>
                                                <th>有效期</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <table>
                                    <thead style="opacity: 0">
                                        <tr>
                                            <th>序号</th>
                                            <th>隶属项目</th>
                                            <th>姓名</th>
                                            <th>岗位</th>
                                            <th>证书编号</th>
                                            <th>签发时间</th>
                                            <th>有效期</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data,i) in EntryPersonnelMonitoringData.approachPerson" :value="data.F_StaffName" :key="i">
                                            <td>{{i++}}</td>
                                            <td>{{data.F_CompanyName}}</td>
                                            <td>{{data.F_StaffName}}</td>
                                            <td>{{data.F_WorkStationName}}</td>
                                            <td>{{data.F_SafeLicenseNo}}</td>
                                            <td>{{data.F_NewSignDate}}</td>
                                            <td>{{data.F_LicenseAge}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="rightBottom">
                        <h3>进场人员教育及持证率统计</h3>
                        <div class="rightBottomFrame">
                            <div class="rightBottomFrameLabel">
                                <div class="rightBottomFrameLabelDiv">
                                    <div class="EDLabel" ref="EDLabel"></div>
                                </div>
                                <h2>{{EntryPersonnelMonitoringData.percentage.threeCard}}%</h2>
                                <p>三级教育卡发放率</p>
                            </div>
                            <div class="rightBottomFrameLabel">
                                <div class="rightBottomFrameLabelDiv">
                                    <div class="SOLabel" ref="SOLabel"></div>
                                </div>
                                <h2>{{EntryPersonnelMonitoringData.percentage.special}}%</h2>
                                <p>特种作业人员持证上岗率</p>
                            </div>
                            <div class="rightBottomFrameLabel">
                                <div class="rightBottomFrameLabelDiv">
                                    <div class="SELabel" ref="SELabel"></div>
                                </div>
                                <h2>{{EntryPersonnelMonitoringData.percentage.record}}%</h2>
                                <p>参加安全教育培训学时达标率</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="bottomLeft">
                    <div class="bottomLeftLabel">
                        <div class="circleLabel" ref="circleLabel"></div>
                    </div>
                </div>
                <div class="bottomRight">
                    <div class="bottomRightLabel">
                        <div class="lineLabel" ref="lineLabel"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import myMap from '../components/indexPage/myMap.vue';
    export default {
        name: "EPMonitoring",
        components: {
            myMap
        },
        data() {
            return {
                EntryPersonnelMonitoringData:{
                    percentage: '',
                    approachPerson: '',
                    approachPersonNum: ''
                },
                admission: [],
                appearance: [],
                termData: '',
                allA: [],
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
                this.$refs.map.getData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract, this.mapData.valYear, this.mapData.valMonth, this.mapData.valSeason);
                this.getContractVal(this.mapData.valProject);
                this.changeSeasonMonth(e);
                this.$refs.map.getRouteData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract);
                this.getLabourForceData();
                this.getEntryPersonnelMonitoringData();
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
            getLabourForceData() {
                const that = this;
                const parameter = {
                    companyId: this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract,
                    yearStr: this.mapData.valYear,
                    monthStr: this.mapData.valMonth,
                    quarterStr: this.mapData.valSeason,
                };
                // 发送 POST 请求
                this.$getUrl('getTermLabor.do', parameter)
                    .then(function (data) {
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

                        that.ApproachPersonnelLineLabel();
                        that.ApproachPersonnelCircleLabel();
                    })
                    .catch(function (error) {

                    });
            },
            getEntryPersonnelMonitoringData(){
                const that = this;
                const parameter = {
                    companyId: this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract,
                    yearStr: this.mapData.valYear,
                    monthStr: this.mapData.valMonth,
                    quarterStr: this.mapData.valSeason,
                };
                // 发送 POST 请求
                this.$getUrlEP('getApproachPerson.do', parameter)
                    .then(function (data) {
                        console.log(data);
                        that.EntryPersonnelMonitoringData.percentage = data.percentage[0];
                        that.EntryPersonnelMonitoringData.approachPerson = data.approachPerson;
                        that.EntryPersonnelMonitoringData.approachPersonNum = data.approachPersonNum[0];

                        that.creatEDLabel();
                        that.creatSOLabel();
                        that.creatSELabel();
                    })
                    .catch(function (error) {

                    });
            },
            creatEDLabel() {
                const that = this;
                const echarts = require('echarts');
                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(this.$refs.EDLabel);

                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c}%"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'middle',
                        data: ['三级教育卡发放率', '剩余'],
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
                                        let html='三级教育卡'+"\n"+'发放率';
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
                                {value: that.EntryPersonnelMonitoringData.percentage.threeCard, name: '三级教育卡发放率'},
                                {value: 100-that.EntryPersonnelMonitoringData.percentage.threeCard, name: '剩余'},
                            ],
                            color: ['#03A4EC','#A5A5A5']
                        },
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            creatSOLabel() {
                const that = this;
                const echarts = require('echarts');
                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(this.$refs.SOLabel);

                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c}%"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'middle',
                        data: ['特种作业人员持证上岗率', '剩余'],
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
                                        let html='特种作业人员'+"\n"+'持证上岗率';
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
                                {value: that.EntryPersonnelMonitoringData.percentage.special, name: '特种作业人员持证上岗率'},
                                {value: 100-that.EntryPersonnelMonitoringData.percentage.special, name: '剩余'},
                            ],
                            color: ['#03A4EC','#A5A5A5']
                        },
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            creatSELabel() {
                const that = this;
                const echarts = require('echarts');
                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(this.$refs.SELabel);

                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c}%"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'middle',
                        data: ['安全教育培训学时达标率', '总计'],
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
                                        let html='安全教育培训'+"\n"+'学时达标率';
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
                                {value: that.EntryPersonnelMonitoringData.percentage.record, name: '安全教育培训学时达标率'},
                                {value: 100-that.EntryPersonnelMonitoringData.percentage.record, name: '剩余'},
                            ],
                            color: ['#03A4EC','#A5A5A5']
                        },
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            ApproachPersonnelCircleLabel() {
                const that = this;
                const echarts = require('echarts');
                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(this.$refs.circleLabel);

                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c}个"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y: 'middle',
                        data: ['管理技术人员', '普通劳务人员','特种作业人员'],
                        textStyle: {
                            color: '#fff'
                        },
                        show:true
                    },
                    series: [
                        {
                            // name: '访问来源',
                            type: 'pie',
                            radius: ['60%', '90%'],
                            center: ["30%", "50%"],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'center',
                                    formatter:function (argument) {
                                        let html='进场人员'+"\n"+'统计';
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
                                {value: that.termData.technicianPerson, name: '管理技术人员'},
                                {value: that.termData.presencePerson, name: '普通劳务人员'},
                                {value: that.termData.specialPerson, name: '特种作业人员'},
                            ],
                            color: ['#4472C4','#A5A5A5','#FFC000']
                        },
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
            ApproachPersonnelLineLabel() {
                const that = this;
                const echarts = require('echarts');
                // 基于准备好的dom，初始化echarts实例
                const myChart = echarts.init(this.$refs.lineLabel);

                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: false, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
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
                    legend: {
                        // orient: 'vertical',
                        x: 'middle',
                        y: 'top',
                        data: ['进场人员','出场人员','在场人员总数'],
                        textStyle: {
                            color: '#fff'
                        },
                        show: true
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
                        data: ['1月份','2月份','3月份','4月份','5月份','6月份','7月份','8月份','9月份','10月份','11月份','12月份'],
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
                            name: '进场人员',
                            type: 'bar',
                            data: that.admission,
                            itemStyle: {
                                normal: {
                                    //这里是重点
                                    color: '#B3BEDF',
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
                            barWidth : 20,
                            label: {
                                normal: {
                                    show: true,
                                    textBorderColor: '#333',
                                    textBorderWidth: 2,
                                },
                            },
                        },
                        {
                            name:'在场人员总数',
                            type:'bar',
                            data: that.allA,
                            itemStyle: {
                                normal: {
                                    //这里是重点
                                    color: '#6F6132',
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
                        }
                    ]
                };
                // 绘制图表
                myChart.setOption(option);
            },
        },
        mounted() {
            this.getProjectVal();
            this.getContractVal();
            this.getLabourForceData();
            this.getEntryPersonnelMonitoringData();
        }
    }
</script>

<style scoped>
    #EPMonitoring {
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
        background: url('./../assets/EPMonitoringImg/背景.png') no-repeat;
        background-size: 100% 100%;
        padding: 30px;
        padding-right: 20px;
        padding-top: 4%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .top{
        flex: 3;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
    }

    .left{
        width: 54%;
        height: 100%;
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

    .leftBottom {
        width: 100%;
        height: 100%;
        background: url('./../assets/EPMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        padding: 25px;
        position: relative;
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

    .right{
        width: 46%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }

    .rightTop{
        flex: 3;
        background: url('./../assets/EPMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        padding: 10px;
        margin: 10px;
        overflow: hidden;
    }

    .rightTopFrame{
        display: flex;
        justify-content: space-between;
        height: 100%;
    }

    .rightTopFrameLeft{
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    .rightTopFrameLeft>div{
        padding: 15px 0;
    }

    .rightTopFrameLeft img{
        height: 45px;
    }

    .rightTopFrameLeft p{
        color: #02E3FA;
    }

    .rightTopFrameLeft>div:first-child{
        border-bottom: 1px dashed #02E3FA;
    }

    .rightTopFrameLeftFrame{
        display: flex;
        justify-content: space-between;
    }

    .rightTopFrameLeftImg{
        position: relative;
    }

    .rightTopFrameLeftImg span{
        position: absolute;
        top: 25%;
        left: 40%;
        color: #fff;
        font-weight: bold;
        font-size: 15px;
        text-shadow: 2px 2px #000;
    }

    .rightTopFrameRight{
        flex: 5;
        height: 100%;
        overflow: hidden;
    }

    .rightTopFrameRightTableTitle{
        background-color: #0d1963;
        z-index: 1000;
        position: relative;
        top: 0;
        padding-bottom: 10px;
        text-align: center;
    }

    .rightTopFrameRight table{
        width: 100%;
        text-align: center;
        color: #02E3FA;
        border-collapse: collapse;
        position: relative;
        top: 0;
        -webkit-animation: scrollToUp 10s linear infinite; /* 引入 scrollToUp动画 */
        animation: scrollToUp 10s linear infinite;
    }

    .rightTopFrameRight table th{
        padding: 0 15px;
    }

    .rightTopFrameRight table td {
        border-bottom: 1px dashed #7F9EBA;
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

    .rightBottom{
        flex: 2;
        background: url('./../assets/EPMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        padding: 10px;
        margin: 10px;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .rightBottomFrame{
        display: flex;
        justify-content: space-between;
        flex: 2;
    }

    .rightBottomFrameLabel{
        flex: 1;
        text-align: center;
    }

    .rightBottomFrameLabel .rightBottomFrameLabelDiv{
        height: 130px;
    }

    .rightBottomFrameLabel h3{
        color: #787c77;

    }

    .rightBottomFrameLabel p{
        color: #02E3FA;

    }

    .EDLabel,.SOLabel,.SELabel,.circleLabel,.lineLabel{
        width: 100%;
        height: 100%;
    }

    .bottom{
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .bottomLeft{
        flex: 1;
        background: url('./../assets/EPMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        padding: 10px;
        margin: 10px;
    }

    .bottomLeftLabel{
        width: 100%;
        height: 100%;
    }

    .bottomRight{
        flex: 4;
        background: url('./../assets/EPMonitoringImg/地图背景框.png') no-repeat;
        background-size: 100% 100%;
        padding: 10px;
        margin: 10px;
    }

    .bottomRightLabel{
        width: 100%;
        height: 100%;
    }
</style>