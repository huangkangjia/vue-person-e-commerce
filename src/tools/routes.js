import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

// components
import Index from '../components/01.index.vue';
import Goods from '../components/02.goods.vue';
import Cart from '../components/03.cart.vue';
import Login from '../components/04.login.vue';
import Order from '../components/05.order.vue';
import OrderPay from '../components/06.orderPay.vue';
import PaySuccess from '../components/07.paySuccess.vue';
import MemberCenter from '../components/08.memberCenter.vue';
import OrderList from '../components/09.orderList.vue';
import OrderDetail from '../components/10.orderDetail.vue';

// axios
import axios from 'axios';
axios.defaults.baseURL = 'http://47.106.148.205:8899/';
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

const routes = [{
        path: '/',
        component: Index,
        alias: '/index'
    },
    {
        path: '/goods/:id',
        component: Goods
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/login',
        component: Login,
        meta: {
            // routeName: 'login',
            isCheckLogin: true
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
            isCheckLogin: true
        }
    },
    {
        path: '/orderPay/:orderid',
        component: OrderPay,
        meta: {
            isCheckLogin: true
        }
    },
    {
        path: '/paySuccess/',
        component: PaySuccess,
        meta: {
            isCheckLogin: true
        }
    },
    {
        path: '/memberCenter/',
        component: MemberCenter,
        meta: {
            isCheckLogin: true
        }
    },
    {
        path: '/orderList/',
        component: OrderList,
        meta: {
            isCheckLogin: true
        }
    },
    {
        path: '/orderDetail/:orderid',
        component: OrderDetail,
        meta: {
            isCheckLogin: true
        }
    },
]
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes 
})
router.beforeEach((to, from, next) => {
    if (to.meta.isCheckLogin) {
        axios.get('site/account/islogin').then(res => {
            if (res.data.code === 'nologin') {
                if (to.path === '/login') { //这就是跳出循环的关键
                    next()
                } else {
                    next('/login')
                }
            } else {
                next()
            }
        })
    } else {
        next()
    }
})

export default router