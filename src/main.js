import Vue from 'vue'
import app from './App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import axios from 'axios'
Vue.prototype.$axios = axios

//mint-ui里面的按需导入
import { Header,Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//使用mui
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//引入mock.js文件
import './mock/mock.js'

var vm = new Vue({
    el:'#app',
    data:{},
    methods:{},
    render:c => c(app),
    router
})