<template>
    <div id="comment">
        <h3>发表评论</h3>
        <hr>
        <textarea cols="2" rows="3" placeholder="请输入要BB的内容(最多BB120个字)" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="add">发表评论</mt-button>
        <div class="list-container">
            <div class="info" v-for="(item,i) in comments" :key="item.add_time">
                <div class="info-title">
                    <span>第{{ i+1 }}楼</span>
                    &nbsp;&nbsp;
                    <span>用户：{{ item.user_name }}</span>
                    &nbsp;&nbsp;
                    <span>发表时间：{{ item.add_time | dataFormat}}</span>
                </div>
                <div class="info-content">
                    {{ (item.content === 'undefined') || (item.content === "")?'此用户没有输入':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" plain size="large" @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        name: "comment",
        data(){
            return{
                pageIndex:1,
                comments:[],
                msg:''//评论框数据
            }
        },
        created() {
            this.getcomments();
        },
        methods:{
            getcomments(){//获取评论
                this.$axios.get('/api/getcomments/'+ this.id + '?pageindex='+ this.pageIndex)
                    .then( res => {
                        if (res.data.status == 0){
                            //加载更多 拼接数据-拼接数据
                            this.comments = this.comments.concat(res.data.message);
                            // console.log(this.comments);
                        }
                    })
            },
            getmore(){//加载更多
                this.pageIndex++;
                this.getcomments();

            },
            add(){//增加评论

            }
        },
        //请求地址中需要 父组件的 id值
        props:["id"]
    }
</script>

<style scoped lang="scss">
#comment{
    h3{
        font-size: 20px;
    }
    textarea{
        font-size: 15px;
        resize: none;
        margin-bottom: 5px;
    }
    .mint-button{
        margin-bottom: 5px;
    }
    .list-container{
        .info{
            line-height: 30px;
            .info-title{
                height: 30px;
                background-color: #cccccc;
                font-size: 13px;
            }
            .info-content{
                height: 30px;
                text-indent: 20px;
                font-size: 13px;
            }
        }
    }
}
</style>