<template>
    <div id="photoinfo">
        <h3>{{ imageinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ imageinfo.add_time | dataFormat}}</span>
            <span>点击：{{ imageinfo.click}}次</span>
        </p>
        <hr>
<!--        缩略图区域 接口的原因-->
            <vue-preview :slides="slide1" height="100" @close="handleClose"></vue-preview>

        <div class="content" v-html="imageinfo.content"></div>
<!--        放置一个现成的 评论子组件 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
// <!--    1.导入-->
    import comment from '../subcomponents/comment.vue'

    export default {
        name: "photoinfo",
        data(){
            return{
                id:this.$route.params.id,//URL传过来的id
                imageinfo:{},
                slide1:[]//缩略图列表
            }
        },
        created(){
            this.getimageinfo();
            this.getslt();
        },
        methods:{
            getimageinfo(){
                this.$axios.get('/api/getimageInfo/'+this.id)
                    .then( res => {
                        if (res.data.status == 0){
                            this.imageinfo = res.data.message[0]
                            // console.log(this.imageinfo);
                        }
                    })
            },
            handleClose () {
                console.log('close event')
            },
            getslt(){//缩略图的列表
                this.$axios.get('/api/getthumimages/'+this.id)
                    .then( res => {
                        if (res.data.status == 0){
                            res.data.message.forEach(item => {
                                item.msrc = item.src;
                                item.w = 600;
                                item.h = 400;
                            })
                            this.slide1 = res.data.message;
                            // console.log(this.slide1);
                        }
                    })
            }
        },
        components:{
            "comment-box":comment//2.注册评论子组件
        }
    }
</script>

<style scoped lang="scss">
#photoinfo{
    padding: 3px;
    h3{
        color: #26a2ff;
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    .thumbs{

    }
}
</style>