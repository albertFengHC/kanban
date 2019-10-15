import Vue from 'vue'
import App from './App.vue'
import router from './route/router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import {getUrl,getUrlHome,getUrlEP} from './../public/urlBase';
// import BaiduMap from 'vue-baidu-map'

Vue.use(iView);

Vue.prototype.$getUrl=getUrl;
Vue.prototype.$getUrlEP=getUrlEP;
Vue.prototype.$getUrlHome=getUrlHome;

// Vue.use(BaiduMap, {
//     // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//     ak: 'DD279b2a90afdf0ae7a3796787a0742e'
// });

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
