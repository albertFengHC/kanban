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
        {
            path: '/indexPage',
            name: 'indexPage',
            component: indexPage,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/EPMonitoring',
            name: 'EPMonitoring',
            component: EPMonitoring,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/SRMonitoring',
            name: 'SRMonitoring',
            component: SRMonitoring,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/HDFMonitor',
            name: 'HDFMonitor',
            component: HDFMonitor,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/ERMonitoring',
            name: 'ERMonitoring',
            component: ERMonitoring,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {path:'*',redirect:'/indexPage'}
    ]
});

export default router;