<template>
    <div id="indexPage">
        <div class="leftInfo">
            <LPInformation ref="LPInformation"/>
            <MEInformation ref="MEInformation"/>
            <RSInformation ref="RSInformation"/>
        </div>
        <div class="rightInfo">
            <div class="title">
                <img src="../assets/indexImg/标题logo简称(1).png" alt="">
                <div class="titleLeft">
                    <p>
                        <router-link to="EPMonitoring">进场人员监控</router-link>
                    </p>
                    <p>
                        <router-link to="SRMonitoring">安全风险监控</router-link>
                    </p>
                </div>
                <div class="titleRight">
                    <p>
                        <router-link to="HDFMonitor">隐患整改监控</router-link>
                    </p>
                    <p>
                        <router-link to="ERMonitoring">应急救援监控</router-link>
                    </p>
                </div>
            </div>
            <div class="search">
                <div>
                    <div>
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
                        <select name="" id="segments" v-model="mapData.valSegments">
                            <option value="">业务板块选择</option>
                            <option v-for="option in selSegmentsData" :value="option.value" :key="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <select name="" id="project" v-model="mapData.valProject" @change="selCompany($event)">
                            <option value="">指挥部(项目公司)选择</option>
                            <option v-for="option in selProjectData" :value="option.F_CompanyId"
                                    :key="option.F_CompanyId">
                                {{ option.F_FullName }}
                            </option>
                        </select>
                        <select name="" id="contract" v-model="mapData.valContract" @change="selCompany($event)">
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
            <myMap :msg='mapData' ref="map" class="myMap"/>
        </div>
        <div class="leftInfo">
            <DMSProduction ref="DMSProduction" v-on:popupData='showPopup'/>
            <SHConstruction ref="SHConstruction"/>
        </div>
        <div class="popupInfoShield" v-show="popup"></div>
        <div class="popupInfo" v-show="popup">
            <div class="PIHead">
                <h3>安全事故快报在线管理</h3>
                <span @click="hidePopup">X</span>
            </div>
            <div class="PIBody">
                <div class="PIBodyL">
                    <div>
                        <div ref="mapPopup" class="mapPopup"></div>
                    </div>
                    <div>
                        <div class="PIBodyLBF">
                            <h4>统计周期</h4>
                            <select name="" id="yearPopup">
                                <option value="">年份选择</option>
                                <option v-for="option in selYearData" :value="option.value" :key="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                            <select name="" id="seasonPopup" @change="changeSeasonMonth" v-model="mapData.valSeason">
                                <option value="">季度选择</option>
                                <option v-for="option in selSeasonData" :value="option.value" :key="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                            <select name="" id="monthPopup">
                                <option value="">月份选择</option>
                                <option v-for="option in selMonthData" :value="option.value" :key="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                            <img src="../assets/indexImg/弹出框/图层30拷贝.png" alt="">
                        </div>
                        <div class="PIBodyLBS">
                            <div>10</div>
                            <p>安全事故快报</p>
                        </div>
                        <div class="PIBodyLBT">
                            <div class="PIBodyLBTL">
                                <div>
                                    <p>区域</p>
                                    <p>数量(条)</p>
                                </div>
                                <div>
                                    <p>四川</p>
                                    <p>3</p>
                                </div>
                                <div>
                                    <p>云南</p>
                                    <p>4</p>
                                </div>
                                <div>
                                    <p>贵州</p>
                                    <p>3</p>
                                </div>
                                <div>
                                    <p>西藏</p>
                                    <p>0</p>
                                </div>
                            </div>
                            <div class="PIBodyLBTR">
                                <div>
                                    <p>业务板块</p>
                                    <p>数量(条)</p>
                                </div>
                                <div>
                                    <p>地铁工程</p>
                                    <p>2</p>
                                </div>
                                <div>
                                    <p>房建工程</p>
                                    <p>5</p>
                                </div>
                                <div>
                                    <p>市政工程</p>
                                    <p>0</p>
                                </div>
                                <div>
                                    <p>公路工程</p>
                                    <p>3</p>
                                </div>
                                <div>
                                    <p>其他工程</p>
                                    <p>0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="PIBodyR">
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>报送单位简称</th>
                            <th>事故发生时间</th>
                            <th>工程名称及所在地</th>
                            <th>事故发生部位</th>
                            <th>事故类别</th>
                            <th>快报时间</th>
                            <th>续报次数</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>中铁建</td>
                            <td>2019.6.27</td>
                            <td>中铁建-西安</td>
                            <td>中区</td>
                            <td>一级事故</td>
                            <td>2019.6.27</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>中铁建</td>
                            <td>2019.6.27</td>
                            <td>中铁建-西安</td>
                            <td>中区</td>
                            <td>一级事故</td>
                            <td>2019.6.27</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>中铁建</td>
                            <td>2019.6.27</td>
                            <td>中铁建-西安</td>
                            <td>中区</td>
                            <td>一级事故</td>
                            <td>2019.6.27</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>中铁建</td>
                            <td>2019.6.27</td>
                            <td>中铁建-西安</td>
                            <td>中区</td>
                            <td>一级事故</td>
                            <td>2019.6.27</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>中铁建</td>
                            <td>2019.6.27</td>
                            <td>中铁建-西安</td>
                            <td>中区</td>
                            <td>一级事故</td>
                            <td>2019.6.27</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>中铁建</td>
                            <td>2019.6.27</td>
                            <td>中铁建-西安</td>
                            <td>中区</td>
                            <td>一级事故</td>
                            <td>2019.6.27</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>中铁建</td>
                            <td>2019.6.27</td>
                            <td>中铁建-西安</td>
                            <td>中区</td>
                            <td>一级事故</td>
                            <td>2019.6.27</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>中铁建</td>
                            <td>2019.6.27</td>
                            <td>中铁建-西安</td>
                            <td>中区</td>
                            <td>一级事故</td>
                            <td>2019.6.27</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>中铁建</td>
                            <td>2019.6.27</td>
                            <td>中铁建-西安</td>
                            <td>中区</td>
                            <td>一级事故</td>
                            <td>2019.6.27</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>中铁建</td>
                            <td>2019.6.27</td>
                            <td>中铁建-西安</td>
                            <td>中区</td>
                            <td>一级事故</td>
                            <td>2019.6.27</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>11</td>
                            <td>中铁建</td>
                            <td>2019.6.27</td>
                            <td>中铁建-西安</td>
                            <td>中区</td>
                            <td>一级事故</td>
                            <td>2019.6.27</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>12</td>
                            <td>中铁建</td>
                            <td>2019.6.27</td>
                            <td>中铁建-西安</td>
                            <td>中区</td>
                            <td>一级事故</td>
                            <td>2019.6.27</td>
                            <td>5</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import myMap from '../components/indexPage/myMap.vue';
    import LPInformation from '../components/indexPage/LPInformation.vue';
    import MEInformation from '../components/indexPage/MEInformation.vue';
    import RSInformation from '../components/indexPage/RSInformation.vue';
    import DMSProduction from '../components/indexPage/DMSProduction.vue';
    import SHConstruction from '../components/indexPage/SHConstruction.vue';
    export default {
        name: "indexPage",
        data() {
            return {
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
                popup: false,
                riskDangerData: '',
                saveStorageData: '',
            }
        },
        components: {
            myMap,
            LPInformation,
            MEInformation,
            RSInformation,
            DMSProduction,
            SHConstruction
        },
        methods: {
            selCompany(e) {
                // let val = e.target.value;
                // this.mapData = val;
                this.$refs.map.getData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract, this.mapData.valYear, this.mapData.valMonth, this.mapData.valSeason);
                this.$refs.LPInformation.getData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract, this.mapData.valYear, this.mapData.valMonth, this.mapData.valSeason);
                this.$refs.MEInformation.getData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract, this.mapData.valYear, this.mapData.valMonth, this.mapData.valSeason);
                this.$refs.RSInformation.getData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract, this.mapData.valYear, this.mapData.valMonth, this.mapData.valSeason);
                this.$refs.DMSProduction.getData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract, this.mapData.valYear, this.mapData.valMonth, this.mapData.valSeason);
                this.$refs.SHConstruction.getData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract, this.mapData.valYear, this.mapData.valMonth, this.mapData.valSeason);
                this.getContractVal(this.mapData.valProject);
                this.changeSeasonMonth(e);
                this.$refs.map.getRouteData(this.mapData.valContract === '' ? this.mapData.valProject : this.mapData.valContract);
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
            showPopup(prop) {
                this.popup = prop;
                this.getData();
            },
            hidePopup() {
                this.popup = false;
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
            // map() {
            //     let map = new AMap.Map(this.$refs.mapPopup, {
            //         resizeEnable: true, //是否监控地图容器尺寸变化
            //         zoom: 11, //初始化地图层级
            //         center: [104.07, 30.67], //初始化地图中心点
            //         mapStyle: 'amap://styles/52787a3119fdf6e3d0d9fe858462deb0',
            //     });
            //
            //     let markers = [];
            //
            //     const that = this;
            //
            //     that.riskDangerData.map(data => {
            //         // 创建点实例
            //         let marker = new AMap.Marker({
            //             position: new AMap.LngLat(data.F_Longitude, data.F_Latitude),
            //             icon: new AMap.Icon({
            //                 image: require('../assets/indexImg/地图图标2/重大危险源（未完工）.png'),
            //                 size: new AMap.Size(32, 42),  //图标大小
            //                 imageSize: new AMap.Size(32, 42)
            //             }),
            //             offset: new AMap.Pixel(-13, -30)
            //         });
            //
            //         markers.push(marker);
            //     });
            //     that.saveStorageData.map(data => {
            //         // 创建点实例
            //         let marker = new AMap.Marker({
            //             position: new AMap.LngLat(data.F_Longitude, data.F_Latitude),
            //             icon: new AMap.Icon({
            //                 image: require('../assets/indexImg/地图图标2/应急物资存放地.png'),
            //                 size: new AMap.Size(32, 42),  //图标大小
            //                 imageSize: new AMap.Size(32, 42)
            //             }),
            //             offset: new AMap.Pixel(-13, -30)
            //         });
            //
            //         markers.push(marker);
            //     });
            //
            //     const overlayGroups = new AMap.OverlayGroup(markers);
            //
            //     map.add(overlayGroups);
            // },
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
            }
        },
        mounted() {
            this.getProjectVal();
            this.getContractVal();
        }
    }
</script>

<style scoped>
    #indexPage {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #fff;
        height: 100%;
        display: flex;
        border-collapse:collapse;
        font-size: 14px;
        /*background: url('./assets/TIM图片20190822145904.png') no-repeat;*/
        /*background-size: 100% auto;*/
        background-color: #0D1963;
    }

    .leftInfo {
        flex: 1;
    }

    .rightInfo {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 20px;
    }

    .rightInfo .title {
        text-align: center;
        position: relative;
    }

    .title {
        flex: 1;
        padding-top: 15px;
    }

    .title img {
        width: 100%;
    }

    .title p{
        padding: 5px 10px;
        color: #3cc8ff;
        font-size: 16px;
        font-weight: bold;
        margin: 0 10px;
        cursor: pointer;
    }

    .titleLeft{
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
    }

    .titleRight{
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
    }

    .search {
        flex: 1;
        width: 100%;
        color: #3ac0f5;
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
    }

    .search > div:first-child {
        flex: 3;
    }

    .search > div:last-child {
        flex: 1;
    }

    .search select {
        text-transform: none;
        background-color: #015478;
        color: #FFFF00;
        padding: 5px;
        margin-right: 15px;
        border-radius: 5px;
        border: 1px solid #797979;
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

    #company {
        width: 290px;
    }

    #project {
        width: 466px;
    }

    #province {
        width: 160px;
    }

    #contract {
        width: 180px;
    }

    #segments {
        width: 180px;
    }

    #year {
        margin-right: 5px;
        width: 90px;
    }

    #month {
        width: 90px;
    }

    .myMap {
        flex: 7;
    }

    i {
        font-style: normal;
    }

    /*弹出框*/
    .popupInfoShield {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color: #525252ab;
    }

    .popupInfo {
        z-index: 100;
        position: fixed;
        top: 5%;
        left: 5%;
        margin: 0 auto;
        width: 90%;
        height: 90%;
    }

    .PIHead {
        background-color: #02010f;
        color: #F0FFFF;
        position: relative;
        padding: 20px;
        height: 7%;
        border-bottom: 3px solid #32a4d5;
    }

    .PIHead span {
        display: inline-block;
        font-weight: bold;
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 20px;
        cursor: pointer;
    }

    .PIBody {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        height: 93%;
        background-color: #03031F;
    }

    .PIBodyL {
        width: 45%;
        padding-right: 15px;
    }

    .PIBodyL > div:first-child {
        background: url('../assets/indexImg/弹出框/左框.png') no-repeat;
        background-size: 100% 100%;
        padding: 15px;
        padding-top: 30px;
        height: 65%;
    }

    .PIBodyL > div:last-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 35%;
        padding: 15px;
    }

    .PIBodyL .mapPopup {
        width: 100%;
        height: 100%;
        /*color: #02010f;*/
    }

    .PIBodyLBF {
        width: 155px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        position: relative;
        color: #3ac0f5;
        height: 100%;
        border: 1px solid #3ac0f5;
        border-radius: 5px;
        background-color: #1022667d;
    }

    .PIBodyLBF select {
        text-transform: none;
        background-color: #040227;
        color: #3ac0f5;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #3ac0f5;
    }

    .PIBodyLBF img {
        position: absolute;
        top: 0;
        right: -23%;
        height: 100%;
    }

    .PIBodyLBS {
        text-align: center;
        padding: 15px;
        height: 100%;
        width: 180px;
        color: #3ac0f5;
    }

    .PIBodyLBS > div {
        background: url('../assets/indexImg/弹出框/椭圆1.png') no-repeat;
        background-size: 100% 100%;
        height: 126px;
        width: 128px;
        margin: 0 auto;
        padding-top: 22%;
        font-weight: bold;
        font-size: 45px;
        color: #67FE00;
    }

    .PIBodyLBS > p {
        height: 20%;
        margin-top: 30px;
    }

    .PIBodyLBT {
        display: flex;
        justify-content: space-between;
        width: 45%;
        height: 100%;
    }

    .PIBodyLBT > div {
        padding: 10px;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .PIBodyLBTR {
        margin-left: 30px;
    }

    .PIBodyLBT > div > div {
        display: flex;
        justify-content: space-between;
    }

    .PIBodyLBT > div > div:first-child p {
        color: #3ac0f5;
    }

    .PIBodyLBT > div > div > p {
        color: #F0B821;
    }

    .PIBodyR {
        width: 55%;
        background: url('../assets/indexImg/弹出框/右框.png') no-repeat;
        background-size: 100% 100%;
        padding: 15px;
        padding-top: 30px;
        text-align: center;
    }

    .PIBodyR table {
        width: 100%;
        height: 100%;
    }

    .PIBodyR table thead {
        color: #3ac0f5;
    }
</style>