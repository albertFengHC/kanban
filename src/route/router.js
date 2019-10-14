import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const indexPage = () => import('../components/index.vue');
const EPMonitoring = () => import('../components/EPMonitoring.vue');
const SRMonitoring = () => import('../components/SRMonitoring.vue');
const HDFMonitor = () => import('../components/HDFMonitor.vue');
const ERMonitoring = () => import('../components/ERMonitoring.vue');

// eslint-disable-next-line no-unused-vars
const router = new VueRouter({
    routes: [
        // 动态路径参数 以冒号开头
        { path: '/indexPage', component: indexPage },
        { path: '/EPMonitoring', component: EPMonitoring },
        { path: '/SRMonitoring', component: SRMonitoring },
        { path: '/HDFMonitor', component: HDFMonitor },
        { path: '/ERMonitoring', component: ERMonitoring },
        {path:'*',redirect:'/indexPage'}
    ]
});

export default router;