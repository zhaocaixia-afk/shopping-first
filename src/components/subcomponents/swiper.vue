<template>
    <div id="swiper">
<!--        谁使用此轮播图组件 谁传递 lunbutu的list-->
<!--        此时是 父组件 向 子组件 传值-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotu" :key="item.img">
                <img :src="item.img" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
<!--    首页 中图片 宽高 100%-->
<!--    商品详情中的图片 宽高 为 高为100% 宽度自适应-->
<!--    解决 定义一个属性 让使用轮播图的 调用者-->
</template>

<script>
    export default {
        name: "swiper",
        data(){
            return{

            }
        },
        methods:{

        },
        props:["lunbotu","isfull"]
    }
</script>

<style scoped lang="scss">
    .mint-swipe{
        height: 200px;
    }
    .mint-swipe-item{
        text-align: center;
        img{
            /*width: 100%;*/
            height: 100%;
        }
    }
    /*这个类 判断是否 width为100%*/
    .full{
        width: 100%;
    }
</style>