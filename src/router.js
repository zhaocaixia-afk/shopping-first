import VueRouter from "vue-router"

//app组件里面的tabber
import home from './components/tabber/home.vue'
import contact from './components/tabber/contact.vue'
import cart from './components/tabber/cart.vue'
import search from './components/tabber/search.vue'
//新闻里面的页面
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
//图片
import photolist from './components/photo/photolist.vue'
import photoinfo from './components/photo/photoinfo.vue'
//商品
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import goodsdesc from './components/goods/goodDesc.vue'
import goodscomt from './components/goods/goodscomt.vue'

var router = new VueRouter({
    routes:[
        { path:'/',redirect:'/home' },
        { path:'/home',component: home},
        { path:'/contact',component: contact},
        { path:'/cart',component: cart},
        { path:'/search',component: search},
        { path:'/home/newslist',component:newslist},
        { path:'/home/newsinfo/:id',component:newsinfo},
        { path:'/home/photolist',component:photolist},
        { path:'/home/photoinfo/:id',component:photoinfo},
        { path:'/home/goodslist',component:goodslist},
        { path:'/home/goodsinfo/:id',component:goodsinfo},
        { path:'/home/goodsdesc/:id',component:goodsdesc},
        { path:'/home/goodscomt/:id',component:goodscomt,name:'goodscomt'}
    ],
    linkActiveClass:'mui-active'
})
export default router