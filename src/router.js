import VueRouter from "vue-router"

//app组件里面的tabber
import home from './components/tabber/home.vue'
import contact from './components/tabber/contact.vue'
import cart from './components/tabber/cart.vue'
import search from './components/tabber/search.vue'


var router = new VueRouter({
    routes:[
        { path:'/',redirect:'/home' },
        { path:'/home',component: home},
        { path:'/contact',component: contact},
        { path:'/cart',component: cart},
        { path:'/search',component: search}
    ],
    linkActiveClass:'mui-active'
})
export default router