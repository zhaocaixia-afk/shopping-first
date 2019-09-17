<template>
    <div id="home">
<!--        轮播图区域 使用 Mint-UI里面的Swipe-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotu" :key="item.id">
                <img :src="item.img_url">
            </mt-swipe-item>
        </mt-swipe>
<!--        六宫格区域 使用 MUI的grid-default.html-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
<!--                放置图片，修改不了图片大小-->
                <img src="../../images/xiaotubiao/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/xiaotubiao/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/xiaotubiao/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/xiaotubiao/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/xiaotubiao/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/xiaotubiao/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return{
                lunbotu:[]
            }
        },
        created(){
            this.getlunbotu();
        },
        methods:{
            getlunbotu(){
                this.$axios.get('/lunbotu')
                    .then((result) => {
                        if (result.data.status == 0){
                            this.lunbotu = result.data.message;
                            // console.log(this.lunbotu);
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .mint-swipe{
        height: 200px;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .mui-grid-view.mui-grid-9{
        background-color: white;
        border-top: none;
        border-left: none;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border-right: none;
        border-bottom: none;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell img{
        width: 60px;
        height: 60px;
    }
</style>