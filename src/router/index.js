import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//=======================  组件引入  ===========================
const Login = () => import('@/views/Login');
const Home = () => import('@/layout/Home');
const Welcome = () => import('@/views/welcome/Welcome');
const DailySales = () => import('@/views/sales/DailySales');
const RoleInfo = () => import('@/views/role/RoleInfo');
const ProductInfo = () => import('@/views/product/ProductInfo');
const OrderInfo = () => import('@/views/order');
const Log = () => import('@/views/log/Log');
//=======================  组件引入  ===========================

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: '',
        component: Home,
        redirect: '/home/welcome',
        children: [
            {
                path: 'welcome',
                name: '首页',
                component: Welcome
            },
            {
                path: 'dailySales',
                name: '销售情况',
                component: DailySales
            },
            {
                path: 'roleInfo',
                name: '角色信息',
                component: RoleInfo
            },
            {
                path: 'productInfo',
                name: '物品信息',
                component: ProductInfo
            },
            {
                path: 'orderInfo',
                name: '订单信息',
                component: OrderInfo
            },
            {
                path: 'log',
                name: '日志信息',
                component: Log
            }
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});


export default router