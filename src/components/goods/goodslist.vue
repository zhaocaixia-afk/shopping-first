<template>
    <div id="goodslist">
        <ul>
            <li v-for="item in goodslist" :key="item.id" @click="godetail(item.id)">
                <img :src="item.img_url">
                <h1>{{ item.title }}</h1>
                <div class="info">
                    <p class="sell">
                        <span class="new">￥{{ item.sell_price }}</span>
                        <span class="old">￥{{ item.market_price}}</span></p>
                    <p class="title">
                        <span>热卖中</span>
                        <span>剩{{ item.stock_quantity}}件</span>
                    </p>
                </div>
            </li>
        </ul>
        <mt-button size="large" type="danger" plain @click="add">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        name: "goodslist",
        data(){
            return{
                pageindex:1,
                goodslist:[]//商品列表
            }
        },
        created(){
            this.getgoodslist();
        },
        methods:{
            getgoodslist(){//得到商品列表
                this.$axios.get('/api/getgoods?pageindex='+this.pageindex)
                    .then( res => {
                        if (res.data.status == 0){
                            res.data.message = this.goodslist.concat(res.data.message)
                            this.goodslist = res.data.message;
                        }
                    })
            },
            add(){//加载更多函数
                this.pageindex++;
                this.getgoodslist();
            },
            godetail(id){//跳转到商品详情的 编程式导航
                this.$router.push('/home/goodsinfo/'+id)
            }
        }
    }
</script>

<style scoped lang="scss">
    #goodslist{
        padding: 5px;
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            list-style: none;
            padding: 0px;
            margin: 0px;
            li{
                width: 49%;
                height: 200px;
                margin-bottom: 6px;
                border: 1px solid #cccccc;
                box-shadow: 0 0 3px #999999;
                img{
                    width: 100%;
                    height: 49%;
                }
                h1{
                    font-size: 15px;
                    max-height: 30px;
                    overflow: hidden;
                }
                /*下面的灰色部分*/
                .info{
                    background-color: #eceeeb;
                    margin:3px;
                    p{
                        margin: 0px;
                        padding: 3px;
                    }
                    .sell{
                        .new{
                            font-size: 15px;
                            color: red;
                            font-weight: bold;
                        }
                        .old{
                            font-size: 12px;
                            text-decoration: line-through;
                            color: #8f8f94;
                        }
                    }
                    .title{
                        display: flex;
                        justify-content: space-between;
                        font-size: 13px;
                    }
                }
            }
        }
    }
</style>