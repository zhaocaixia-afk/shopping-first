<template>
    <div id="photolist">
<!--        使用MUI里面的tab-top-webview-main.html-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0?'mui-active':'']" v-for="item in imgcategory" :key="item.id" @click="getimageslist(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>

<!--        图片列表 使用 Mint-UI里面的 Lazyload-->
        <ul class="photo-list">
            <router-link :to="'/home/photoinfo/'+item.id" tag="li" v-for="item in imageslist" :key="item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
// <!--    导入mui的js文件-->
    import mui from '../../lib/mui/js/mui.min.js'

    export default {
        name: "photolist",
        mounted() {
            //如果要操作元素，必须在mounted里面
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        data(){
            return{
                imgcategory:[],//图片分类标题
                imageslist:[]//图片列表
            }
        },
        created(){
            this.getimgcategory();
            this.getimageslist(0);//默认选中 第一个选项
        },
        methods:{
            getimgcategory(){//获取图片分类标题
                this.$axios.get('/api/getimgcategory')
                    .then( res => {
                        if (res.data.status == 0){
                            res.data.message.unshift({"title":"全部","id":0})
                            this.imgcategory = res.data.message;
                            // console.log(this.imgcategory);
                        }
                    })
            },
            getimageslist(cateId){//获取图片列表
                this.$axios.get('/api/getimages/'+cateId)
                    .then( res => {
                        if(res.data.status == 0){
                            this.imageslist = res.data.message;
                            // console.log(this.imageslist);
                        }
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    *{
        touch-action: pan-y;
    }
#photolist{
    .photo-list{
        margin: 0px;
        padding: 10px 10px 0px 10px;
        li{
            background-color: #cccccc;
            text-align: center;
            list-style: none;
            margin-bottom: 10px;
            box-shadow: 0 0 6px #999999;
            position: relative;
            img{
                width: 100%;
                vertical-align: middle;
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info{
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0px;
                background-color: rgba(0,0,0,0.6);
                max-height: 84px;
                .info-title{
                    font-size: 14px;
                }
                .info-body{
                    font-size: 13px;
                }
            }
        }
    }
}
</style>