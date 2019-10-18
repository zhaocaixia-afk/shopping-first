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
//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次刚进入 网站，肯定会调用main.js 在刚调用的时候，先从本地存储中 判断是否有car 数据
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state:{//this.$store.state.***
        car:car//将购物车中的商品数据，用一个数组存储起来，在car数组中，存储一些商品的对象
        //{id:商品的id，count：商品数量，price：商品的单价，selected：false}
    },
    mutations:{//this.$store.commit('方法的名称','')
        addToCar(state,goodsinfo){
            //点击加入购物车，把商品信息，保存到 store 中的car上
            //1.如果购物车中，之前有，那么，就更新数据
            //2.如果没有，push到car中
            var flag = false;//假设没有找到对应的商品数据
            state.car.some(item =>{
                if (item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true;
                    return true
                }
            })
            //如果最终循环完毕，flag还是false那么就push进入car数组
            if (flag === false){
                state.car.push(goodsinfo)
            }
            //当 更新 car 之后，把car数组，存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){
            //修改购物车中商品的数量值
            state.car.some( item=>{
                if (item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true;
                }
            })
            //
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        del(state,id){
            //根据id从store中的购物车中删除对应的那条商品
            state.car.some((item,i) => {
                if (item.id == id){
                    state.car.splice(i,1);
                    return true;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item => {
                if (item.id == info.id){
                    item.selected = info.selected;
                    return true;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{//this.$store.getters.***
        //相当于计算属性，也相当也filters
        getAllCount(state){
            var c=0;
            state.car.forEach( item => {
                c += item.count;
            })
            return c;
        },
        getGoodsCount(state){//获取本地存储的数据 封装成 一个对象 {"id":"count","id":"count"...}
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o;
        },
        getGoodsSelected(state){
            var o = {};
            state.car.forEach( item => {
                o[item.id] = item.selected
            })
            return o;
        },
        getGoodsCoundAndAmount(state){
            var o = {
                count: 0,//勾选的商品数量
                amount: 0//勾选商品的总价
            };
            state.car.forEach(item => {
                if (item.selected){
                    o.count += item.count;
                    o.amount += item.price * item.count;
                }
            })
            return o;
        }
    }
})

var vm = new Vue({
    el:'#app',
    data:{},
    methods:{},
    render:c => c(app),
    router,
    store//挂载store
})