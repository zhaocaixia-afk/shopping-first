<template>
    <div id="newsinfo">
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="sub-title">
            <span>发表时间：{{ newsinfo.add_time | dataFormat}}</span>
            <span>点击：{{ newsinfo.click }}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content"></div>
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    // 导入评论子组件
    import comment from '../subcomponents/comment.vue'

    export default {
        name: "newsinfo",
        data(){
            return{
                id:this.$route.params.id, //将URL 地址中传递过来的id值，挂载到当前页面
                newsinfo:{}
            }
        },
        created(){
            this.getnewsinfo();
        },
        methods:{
            getnewsinfo(){//获取新闻详情
                this.$axios.get('/api/getnew/'+this.id)
                    .then( res => {
                        if (res.data.status == 0){
                            this.newsinfo = res.data.message[0]
                            // console.log(this.newsinfo);
                        }
                    })
            }
        },
        components:{
            "comment-box":comment
        }
    }
</script>

<style scoped lang="scss">
#newsinfo{
    padding: 0 5px;
    .title{
        font-size: 15px;
        color: red;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
    .sub-title{
        display: flex;
        justify-content: space-between;
        color: deepskyblue;
        font-size: 13px;
    }
    .content{

    }
}

</style>