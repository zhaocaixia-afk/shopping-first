import Vue from 'vue'
import app from './App.vue'
//路由的引入
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'
//axios的引入
import axios from 'axios'
Vue.prototype.$axios = axios;
//设置默认请求地址前缀
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//mint-ui里面的按需导入
// import { Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
//为了显示懒加载效果，使用全局导入
import MintUi from 'mint-ui'
Vue.use(MintUi)
import 'mint-ui/lib/style.css'
//使用mui
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//引入mock.js文件
import './mock/mock.js'
//全局时间过滤器 引用cnpm i moment -D
import moment from 'moment'
Vue.filter('dataFormat',function (str,pattern='YYYY-MM-DD HH:mm:ss') {
    return moment(str).format(pattern)
})
//缩略图的引入
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// Vue.use(preview, {
//     mainClass: 'pswp--minimal--dark',
//     barsSize: {top: 0, bottom: 0},
//     captionEl: false,
//     fullscreenEl: false,
//     shareEl: false,
//     bgOpacity: 0.85,
//     tapToClose: true,
//     tapToToggleControls: false
// })

var vm = new Vue({
    el:'#app',
    data:{},
    methods:{},
    render:c => c(app),
    router
})