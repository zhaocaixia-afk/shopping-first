<template>
    <div id="app">
<!--        顶部固定区域 使用 Mint-UI的 Header-->
        <mt-header fixed title="固定在顶部"></mt-header>

<!--        中间组件 切换 动画-->
        <transition>
            <router-view></router-view>
        </transition>

<!--        底部固定切换区域 使用 mui 的 tabbar.html-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item1" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item1" to="/contact">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">消息</span>
            </router-link>
            <router-link class="mui-tab-item1" to="cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item1" to="search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "App",
        data(){
            return{

            }
        },
        methods:{

        }
    }
</script>

<style scoped>
#app{
    padding-top: 40px;
    overflow-x: hidden;
    padding-bottom: 50px;
}
    .v-enter{
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }
    .v-enter-active,
    .v-leave-active{
        transition: all 0.5s ease;
    }
</style>