<template>
    <div class="myMap">
            <div class="video" v-show="showVideo">
                <video :src="videoUrl" controls="controls" controlslist="nodownload"></video>
                <span @click="videoHide()">X</span>
            </div>
            <div ref="map" class="map"></div>
            <div class="typeBtn">
                <div>
                    <img src="../../assets/indexImg/六边形30x30.png" alt="" class="warningIcon" @click="warningSwitchBtn">
                </div>
                <div>
                    <img src="../../assets/indexImg/六边形30x30.png" alt="" class="warningIcon" @click="warningSwitchBtn">
                </div>
                <div>
                    <img src="../../assets/indexImg/六边形30x30.png" alt="" class="warningIcon" @click="warningSwitchBtn">
                </div>
                <div v-for="(data,index) in typeData"  :key="data.value" @click="changeType($event,index)">
                    <img :src="data.show === true?typeImgA:typeImgN" alt="">
                    <p>{{data.text}}</p>
                </div>
                <div>
                    <img src="../../assets/indexImg/六边形30x30.png" alt="" class="warningIcon" @click="warningSwitchBtn">
                </div>
                <div>
                    <img src="../../assets/indexImg/六边形30x30.png" alt="" class="warningIcon" @click="warningSwitchBtn">
                </div>
                <div>
                    <img src="../../assets/indexImg/六边形30x30.png" alt="" class="warningIcon" @click="warningSwitchBtn">
                </div>
                <img src="../../assets/indexImg/线条.png" alt="" class="typeBtnLine">
            </div>
        </div>
</template>

<script>
    export default {
        props:['msg'],
        name: 'myMap',
        data () {
            return {
                videoUrl: '',
                showVideo: false,
                mapData:'',
                videoSurveillanceData: [
                    {
                        title: '廖家湾拌和站视频监控点',
                        F_Longitude: 112.865167,
                        F_Latitude: 37.958232,
                    },
                    {
                        title: '书生沟拌和站视频监控点',
                        F_Longitude: 112.803956,
                        F_Latitude: 37.829195,
                    },
                ],
                riskDangerData: '',
                saveStorageData: '',
                typeImgN: require('../../assets/indexImg/六边形80x80 （正常）.png'),
                typeImgA: require('../../assets/indexImg/六边形80x80 （选中）.png'),
                typeData: [
                    {text:'视频监控',show:true},
                    {text:'应急物资',show:false},
                    {text:'危大工程',show:false},
                    {text:'危险物品库',show:false},
                ],
                routeData: {
                    bDashed : {},
                    bSolid: {},
                    yDashed : {},
                    ySolid: {},
                },
                routeDataSE:{
                    startPoint: {},
                    endPoint: {}
                },
                companyIdR : '',
                warningMarker: '',
                mapShow: '',
                warningSwitch: true
            }
        },
        methods: {
            mapProvinceShow(valProvince){
                const that = this;
                let map = that.mapShow;
                map.clearMap();
                new AMap.DistrictSearch({
                    extensions:'all',
                    subdistrict:0
                }).search(valProvince,function(status,result){
                    // 外多边形坐标数组和内多边形坐标数组
                    let outer = [
                        new AMap.LngLat(-360,90,true),
                        new AMap.LngLat(-360,-90,true),
                        new AMap.LngLat(360,-90,true),
                        new AMap.LngLat(360,90,true),
                    ];
                    let holes = result.districtList[0].boundaries;

                    let pathArray = [
                        outer
                    ];
                    pathArray.push.apply(pathArray,holes);

                    let polygon = new AMap.Polygon( {
                        pathL:pathArray,
                        strokeColor: '#00eeff',
                        strokeWeight: 1,
                        fillColor: '#71B3ff',
                        fillOpacity: 0.9,
                    });
                    polygon.setPath(pathArray);
                    map.add(polygon);

                    if(valProvince === '山西省'){
                        map.setCenter([112.53008,37.730962]);
                        map.setZoom(7);
                    }else if(valProvince === '四川省'){
                        map.setCenter([104.061168, 30.583825]);
                        map.setZoom(6);
                    }else if(valProvince === '云南省'){
                        map.setCenter([102.820715,24.864306]);
                        map.setZoom(6);
                    }else if(valProvince === '江西省'){
                        map.setCenter([115.782033,27.522143]);
                        map.setZoom(7);
                    }else if(valProvince === '贵州省'){
                        map.setCenter([106.671423,26.69929]);
                    }else if(valProvince === '海南省'){
                        map.setCenter([109.781924,19.201202]);
                        map.setZoom(8);
                    }else if(valProvince === '西藏自治区'){
                        map.setCenter([89.221316,31.388255]);
                        map.setZoom(6);
                    }
                });
                this.getRouteData();
            },
            map(checked){
                this.mapShow = '';
                let map = new AMap.Map(this.$refs.map, {
                    resizeEnable: true, //是否监控地图容器尺寸变化
                    zoom:11, //初始化地图层级
                    center: [112.839365,37.933685], //初始化地图中心点
                    mapStyle: 'amap://styles/52787a3119fdf6e3d0d9fe858462deb0',
                });

                this.mapShow = map;

                let markers = [];

                const that = this;

                if(checked === '危险物品库'){
                    that.riskDangerData.map(data => {
                        // 创建点实例
                        let marker = new AMap.Marker({
                            position: new AMap.LngLat(data.F_Longitude,data.F_Latitude),
                            icon: new AMap.Icon({
                                image: require('../../assets/indexImg/地图图标2/重大危险源（未完工）.png'),
                                size: new AMap.Size(32, 42),  //图标大小
                                imageSize: new AMap.Size(32,42)
                            }),
                        });

                        let content = `<h3>危险源信息</h3><p><span>行为或环境:</span>${data.F_ActionMilieu}</p><p><span>危险源辨识范围:</span>${data.F_DangerRange}</p><p><span>潜在危险因素:</span>${data.F_DangerFactor}</p><p><span>危险源级别:</span>${data.F_DangerGrade}</p><p><span>可能导致的结果:</span>${data.F_PossibleResult}</p><p><span>控制措施概述:</span>${data.F_MeasureDesc}</p><p><span>危险源名称:</span>${data.F_DangerName}</p></br><h3>危险源工点监控信息</h3><p><span>信息填报时间:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_ReportDate:''}</p><p><span>填报人:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_CreateUserName:''}</p><p><span>现场存在问题:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_SceneProblem:''}</p><p><span>施工工点总体进展情况:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_ProgressDesc:''}</p><p><span>安全质量管控现状:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_ManageCurrent:''}</p><p><span>是否完工:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_IsFinish:''}</p><p><span>本月安全质量管控重点:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_FocalPoint:''}</p><p><span>问题整改情况:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_ProblemImprove:''}</p>`;

                        content.replace(/undefined/g,'');

                        let infoWindow = new AMap.InfoWindow({
                            content: content,  //使用默认信息窗体框样式，显示信息内容
                            offset: new AMap.Pixel(5, -35)
                        });

                        AMap.event.addListener(marker, 'click', function () {
                            infoWindow.open(map, marker.getPosition(data.F_Longitude,data.F_Latitude));
                        });

                        markers.push(marker);
                    });
                }else if(checked === '应急物资'){
                    that.saveStorageData.map(data => {
                        // 创建点实例
                        let marker = new AMap.Marker({
                            position: new AMap.LngLat(data.F_Longitude,data.F_Latitude),
                            icon: new AMap.Icon({
                                image: require('../../assets/indexImg/地图图标2/应急物资存放地.png'),
                                size: new AMap.Size(32, 42),  //图标大小
                                imageSize: new AMap.Size(32,42)
                            }),
                        });

                        let content = `<h3>保障物资管理信息</h3><p><span>物资存放地点:</span>${data.F_StorePlace}</p><p><span>登记时间:</span>${data.F_RegisterDate}</p><p><span>责任人联系方式:</span>${data.F_ContactPhone}</p><p><span>物资种类简要说明:</span>${data.F_ConciseDesc}</p><p><span>备注:</span>${data.F_Note}</p><p><span>管理责任人:</span>${data.F_Principal}</p></br><h3>物资登记</h3><p><span>规格型号:</span>${data.saveStorageMaterials[0]?data.saveStorageMaterials[0].F_ItemSpec:''}</p><p><span>应急物资名称:</span>${data.saveStorageMaterials[0]?data.saveStorageMaterials[0].F_ItemName:''}</p><p><span>完好情况:</span>${data.saveStorageMaterials[0]?data.saveStorageMaterials[0].F_Situation:''}</p><p><span>数量:</span>${data.saveStorageMaterials[0]?data.saveStorageMaterials[0].F_Qty:''}</p><p><span>单位:</span>${data.saveStorageMaterials[0]?data.saveStorageMaterials[0].F_Unit:''}</p><p><span>存放时间:</span>${data.saveStorageMaterials[0]?data.saveStorageMaterials[0].F_StoreDate:''}</p>`;

                        content.replace(/undefined/g,'');

                        let infoWindow = new AMap.InfoWindow({
                            content: content,  //使用默认信息窗体框样式，显示信息内容
                            offset: new AMap.Pixel(5, -35)
                        });

                        AMap.event.addListener(marker, 'click', function () {
                            infoWindow.open(map, marker.getPosition(data.F_Longitude,data.F_Latitude));
                        });

                        markers.push(marker);
                    });
                }else if(checked === '视频监控'){
                    that.videoSurveillanceData.map(data => {
                        // 创建点实例
                        let marker = new AMap.Marker({
                            position: new AMap.LngLat(data.F_Longitude,data.F_Latitude),
                            icon: new AMap.Icon({
                                image: require('../../assets/indexImg/地图图标2/监控摄像头.png'),
                                size: new AMap.Size(32, 42),  //图标大小
                                imageSize: new AMap.Size(32,42)
                            }),
                        });

                        markers.push(marker);
                    });
                } else {
                    that.riskDangerData.map(data => {
                        // 创建点实例
                        let marker = new AMap.Marker({
                            position: new AMap.LngLat(data.F_Longitude,data.F_Latitude),
                            icon: new AMap.Icon({
                                image: require('../../assets/indexImg/地图图标2/重大危险源（未完工）.png'),
                                size: new AMap.Size(32, 42),  //图标大小
                                imageSize: new AMap.Size(32,42)
                            }),
                        });

                        let content = `<h3>危险源信息</h3><p><span>行为或环境:</span>${data.F_ActionMilieu}</p><p><span>危险源辨识范围:</span>${data.F_DangerRange}</p><p><span>潜在危险因素:</span>${data.F_DangerFactor}</p><p><span>危险源级别:</span>${data.F_DangerGrade}</p><p><span>可能导致的结果:</span>${data.F_PossibleResult}</p><p><span>控制措施概述:</span>${data.F_MeasureDesc}</p><p><span>危险源名称:</span>${data.F_DangerName}</p></br><h3>危险源工点监控信息</h3><p><span>信息填报时间:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_ReportDate:''}</p><p><span>填报人:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_CreateUserName:''}</p><p><span>现场存在问题:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_SceneProblem:''}</p><p><span>施工工点总体进展情况:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_ProgressDesc:''}</p><p><span>安全质量管控现状:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_ManageCurrent:''}</p><p><span>是否完工:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_IsFinish:''}</p><p><span>本月安全质量管控重点:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_FocalPoint:''}</p><p><span>问题整改情况:</span>${data.riskDangerSupervise[0]?data.riskDangerSupervise[0].F_ProblemImprove:''}</p>`;

                        content.replace(/undefined/g,'');

                        let infoWindow = new AMap.InfoWindow({
                            content: content,  //使用默认信息窗体框样式，显示信息内容
                            offset: new AMap.Pixel(5, -35)
                        });

                        AMap.event.addListener(marker, 'click', function (e) {
                            infoWindow.open(map, marker.getPosition(data.F_Longitude,data.F_Latitude));
                        });

                        markers.push(marker);
                    });
                    that.saveStorageData.map(data => {
                        // 创建点实例
                        let marker = new AMap.Marker({
                            position: new AMap.LngLat(data.F_Longitude,data.F_Latitude),
                            icon: new AMap.Icon({
                                image: require('../../assets/indexImg/地图图标2/应急物资存放地.png'),
                                size: new AMap.Size(32, 42),  //图标大小
                                imageSize: new AMap.Size(32,42)
                            }),
                        });

                        let content = `<h3>保障物资管理信息</h3><p><span>物资存放地点:</span>${data.F_StorePlace}</p><p><span>登记时间:</span>${data.F_RegisterDate}</p><p><span>责任人联系方式:</span>${data.F_ContactPhone}</p><p><span>物资种类简要说明:</span>${data.F_ConciseDesc}</p><p><span>备注:</span>${data.F_Note}</p><p><span>管理责任人:</span>${data.F_Principal}</p></br><h3>物资登记</h3><p><span>规格型号:</span>${data.saveStorageMaterials[0]?data.saveStorageMaterials[0].F_ItemSpec:''}</p><p><span>应急物资名称:</span>${data.saveStorageMaterials[0]?data.saveStorageMaterials[0].F_ItemName:''}</p><p><span>完好情况:</span>${data.saveStorageMaterials[0]?data.saveStorageMaterials[0].F_Situation:''}</p><p><span>数量:</span>${data.saveStorageMaterials[0]?data.saveStorageMaterials[0].F_Qty:''}</p><p><span>单位:</span>${data.saveStorageMaterials[0]?data.saveStorageMaterials[0].F_Unit:''}</p><p><span>存放时间:</span>${data.saveStorageMaterials[0]?data.saveStorageMaterials[0].F_StoreDate:''}</p>`;

                        content.replace(/undefined/g,'');

                        let infoWindow = new AMap.InfoWindow({
                            content: content,  //使用默认信息窗体框样式，显示信息内容
                            offset: new AMap.Pixel(5, -35)
                        });

                        AMap.event.addListener(marker, 'click', function () {
                            infoWindow.open(map, marker.getPosition(data.F_Longitude,data.F_Latitude));
                        });

                        markers.push(marker);
                    });
                }
                that.videoSurveillanceData.map(data => {
                    let title = '';

                    if(data.title === '廖家湾拌和站视频监控点'){
                        title = '廖家湾拌和站视频监控点'
                    }else {
                        title = '书生沟拌和站视频监控点'
                    }

                    // 创建点实例
                    let marker = new AMap.Marker({
                        position: new AMap.LngLat(data.F_Longitude,data.F_Latitude),
                        icon: new AMap.Icon({
                            image: require('../../assets/indexImg/地图图标2/监控摄像头.png'),
                            size: new AMap.Size(32, 42),  //图标大小
                            imageSize: new AMap.Size(32,42)
                        }),
                        title: title
                    });

                    AMap.event.addListener(marker, 'click', function (e) {
                        if(e.target.Je.title === '廖家湾拌和站视频监控点'){
                            that.videoUrl = require('../../assets/indexImg/出料口在线监控.mp4');
                        }else {
                            that.videoUrl = require('../../assets/indexImg/拌和楼在线监控.mp4');
                        }
                        that.videoShow();
                    });

                    markers.push(marker);
                });

                const overlayGroups = new AMap.OverlayGroup(markers);

                map.add(overlayGroups);

                this.warningShow(map);
            },
            getRouteData(){
                const that = this;
                const parameter = {
                    companyId: that.companyIdR,
                };
                // 发送 POST 请求
                this.$getUrl('getRoadMessage.do', parameter)
                    .then(function (response) {
                        const data = response;
                        that.getRouteName(data);
                        that.setRouteDataSE(data);
                    })
                    .catch(function (error) {

                    });
            },
            setRouteDataSE(data){
                const that = this;
                that.routeDataSE.startPoint = data.startPoint;
                that.routeDataSE.endPoint = data.endPoint;
                let markers = [];
                that.routeDataSE.startPoint.map((data,i) => {
                    let size = '';
                    if(i%2 ===0){
                        size = 'right';
                    }else {
                        size = 'left';
                    }
                    let marker = new AMap.Marker({
                        position: new AMap.LngLat(data.fLongitude,data.fLatitude),
                        icon: new AMap.Icon({
                            image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                            size: new AMap.Size(22, 32),  //图标大小
                            imageSize: new AMap.Size(22,32)
                        }),
                        offset: new AMap.Pixel(-13, -30),
                        title: data.fCompanyName
                    });
                    marker.setLabel({
                        offset: new AMap.Pixel(0, -5),  //设置文本标注偏移量
                        content: `<div class='info'>${data.fCompanyName}起点</div>`, //设置文本标注内容
                        direction: size //设置文本标注方位
                    });
                    markers.push(marker);
                });
                that.routeDataSE.endPoint.map((data,i) => {
                    let size = '';
                    if(i%2 ===0){
                        size = 'right';
                    }else {
                        size = 'left';
                    }
                    let marker = new AMap.Marker({
                        position: new AMap.LngLat(data.fLongitude,data.fLatitude),
                        icon: new AMap.Icon({
                            image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                            size: new AMap.Size(22, 32),  //图标大小
                            imageSize: new AMap.Size(22,32)
                        }),
                        offset: new AMap.Pixel(-13, -30),
                        title: data.fCompanyName
                    });
                    marker.setLabel({
                        offset: new AMap.Pixel(0, -5),  //设置文本标注偏移量
                        content: `<div class='info'>${data.fCompanyName}终点</div>`, //设置文本标注内容
                        direction: size //设置文本标注方位
                    });
                    markers.push(marker);
                });
                const overlayGroups = new AMap.OverlayGroup(markers);
                that.mapShow.add(overlayGroups);
                // that.mapShow.on('click', function(e) {
                //     console.log(e.lnglat.getLng(),e.lnglat.getLat());
                // });
            },
            getData(valProject,valYear,valMonth,valSeason){
                this.companyIdR=valProject;
                const that = this;
                const parameter = {
                    companyId: valProject,
                    yearStr: valYear,
                    monthStr: valMonth,
                    quarterStr: valSeason,
                };
                // 发送 POST 请求
                this.$getUrl('getMapMessage.do', parameter)
                    .then(function (response) {
                        that.riskDangerData = response.riskDangerData;
                        that.saveStorageData = response.saveStorageData;
                        that.map();
                    })
                    .catch(function (error) {

                    });
            },
            changeType(e,index){
                let checked = '';

                for(let i in this.typeData){
                    if( parseFloat(i) === index){
                        this.typeData[i].show = true;
                        checked = this.typeData[i].text;
                    }else{
                        this.typeData[i].show = false
                    }
                }

                this.map(checked);
            },
            getRouteName(data){
                const that = this;
                for(let i in  data) {
                    let isFirst = true;
                    let routerNameArray = {};
                    if(data[i].length){
                        data[i].map(a => {
                            let routeName = '';
                            if (isFirst) {
                                routeName = a.fRoadCode;
                                routerNameArray[routeName] = [];
                                isFirst = false;
                            }
                            for (let i in routerNameArray) {
                                if (i != a.fRoadCode) {
                                    routeName = a.fRoadCode;
                                    routerNameArray[routeName] = [];
                                }
                            }
                        });

                        data[i].map(a => {
                            for(let i in  routerNameArray) {
                                if(i === a.fRoadCode){
                                    routerNameArray[i].push([+parseFloat(a.fLongitude).toFixed(5),+parseFloat(a.fLatitude).toFixed(5)]);
                                }
                            }
                        });

                        if(i === 'bdashed'){
                            that.routeData.bDashed = routerNameArray;
                        }else if(i === 'bsolid'){
                            that.routeData.bSolid = routerNameArray;
                        }else if(i === 'ydashed'){
                            that.routeData.yDashed = routerNameArray;
                        }else if(i === 'ysolid'){
                            that.routeData.ySolid = routerNameArray;
                        }
                    }
                }
                if(this.routeData&&this.mapShow){
                    that.mapPolyline(this.mapShow);
                }
                // this.mapShow.setZoom(11);
            },
            mapPolyline(map){
                const that = this;
                for(let i in that.routeData){
                    let strokeColor = '';
                    let strokeStyle = '';
                    if(i === 'bDashed'){
                        strokeColor = '#fff';
                        strokeStyle = 'dashed'
                    }else if(i === 'bSolid'){
                        strokeColor = '#fff';
                        strokeStyle = 'solid'
                    }else if(i === 'yDashed'){
                        strokeColor = '#FFFF00';
                        strokeStyle = 'dashed'
                    }else if(i === 'ySolid'){
                        strokeColor = '#FFFF00';
                        strokeStyle = 'solid'
                    }

                    for(let y in  that.routeData[i]) {
                        const polyline = new AMap.Polyline({
                            path: that.routeData[i][y],
                            // isOutline: true,
                            // outlineColor: '#ffeeff',
                            borderWeight: 0.5,
                            strokeColor: strokeColor,
                            strokeOpacity: 1,
                            strokeWeight: 1,
                            // 折线样式还支持 'dashed'
                            strokeStyle: strokeStyle,
                            // strokeStyle是dashed时有效
                            strokeDasharray: [10,2,10],
                            lineJoin: 'round',
                            lineCap: 'round',
                            zIndex: 50,
                        });
                        polyline.setMap(map);
                    }
                }
            },
            videoShow(){
                this.showVideo = true;
            },
            videoHide(){
                this.showVideo = false;
            },
            warningShow(){
                this.warningMarker = '';
                this.warningMarker = new AMap.Marker({
                    position: new AMap.LngLat(112.900891,38.058444),
                    icon: new AMap.Icon({
                        image: require('../../assets/indexImg/地图图标2/警报2.png'),
                        size: new AMap.Size(62, 62),  //图标大小
                        imageSize: new AMap.Size(62,62)
                    }),
                });

                this.mapShow.add(this.warningMarker);

                function switchIcon() {
                    this.warningMarker.setIconStyle({
                        image: require('../../assets/indexImg/地图图标2/警报1.png'),
                        size: new AMap.Size(62, 62),  //图标大小
                        imageSize: new AMap.Size(62,62)
                    });
                }

                // setInterval(switchIcon, 500);
            },
            warningSwitchBtn(){
                if(this.warningSwitch === false){
                    this.warningShow();
                    this.warningSwitch = true;
                }else {
                    this.warningSwitch = false;
                    this.mapShow.remove(this.warningMarker);
                }
            }
        },
        mounted(){
            this.getData();
            this.getRouteData();
        },
        watch: {
            msg: function(val,oldVal){

            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .myMap{
       height: 100%;
       background: url('../../assets/indexImg/项目地理信息@业务信息综合展示.png') no-repeat;
       background-size: 100% 100%;
       padding: 15px;
       padding-top: 30px;
       position: relative;
   }
   .map {
       width: 100%;
       height: 100%;
       color: #02010f;
   }

   .typeBtn{
       position: absolute;
       bottom: 50px;
       left: 19%;
       width: 60%;
       text-align: center;
       display: flex;
       justify-content: space-between;
   }

   .typeBtn>div{
       flex: 1;
       position: relative;
       cursor: pointer;
   }

   .typeBtn>div p{
       position: absolute;
       top: 30px;
       text-align: center;
       width: 100%;
   }

    .typeBtn img{
        width: 80px;
    }

   .typeBtn .warningIcon{
       position: relative;
       width: 35px;
       top: 22px;
       cursor: pointer;
       margin: 0 3px;
   }

    .video{
        position: absolute;
        top: 20%;
        left: 25%;
        width: 55%;
        z-index: 1000;
        padding: 20px;
        background-color: #069;
        text-align: right;
    }

   .video video{
       width: 100%;
   }

    .video span{
        position: absolute;
        top: 0;
        right: 5px;
        font-weight: bold;
        cursor: pointer;
        font-size: large;
    }

   .typeBtn .typeBtnLine {
        position: absolute;
        width: 678px;
        top: 35%;
        height: 20px;
        right: -48px;
    }
</style>
