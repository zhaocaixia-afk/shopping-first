<template>
    <div id="cart">
<!--        商品列表区域 使用 mui 的 cart.html-->
        <div class="goods-list" v-for="(item,i) in goodslist" :key="item.id">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch
                                v-model="$store.getters.getGoodsSelected[item.id]"
                                @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
                        ></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
<!--                                如何从 本地存储的购物车获取 商品数量-->
<!--                                我们可以创建空对象，循环，组件{"id":"count","id":"count".....}-->
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="del(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<!--        商品结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>
                            已勾选商品<span class="red">{{ $store.getters.getGoodsCoundAndAmount.count}}</span>件，
                            总价￥<span class="red">{{ $store.getters.getGoodsCoundAndAmount.amount}}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>

<!--        <p>{{ this.$store.getters.getGoodsSelected}}</p>-->
    </div>
</template>

<script>
    import numbox from '../subcomponents/cart_numbox.vue'

    export default {
        name: "cart",
        data(){
            return{
                goodslist:[]
            }
        },
        created(){
            this.getGoodsList();
        },
        methods:{
            getGoodsList(){
                //获取到store中所有商品的id
                var idArr = [];
                this.$store.state.car.forEach( item => idArr.push(item.id))
                if (idArr.length <= 0){
                    return;//如果购物车中没有商品，不需要请求数据接口
                }
                this.$axios.get('/api/goods/getshopcarlist/'+ idArr.join(','))
                    .then( res => {
                        if (res.data.status == 0){
                            this.goodslist = res.data.message;
                            // console.log(this.goodslist);
                        }
                    })
            },
            del(id,index){
                //把商品从 store 中根据传递的id删除
                //同时，把当前组件中的goodslist中，对应要删除的那个商品，使用index来删除
                this.goodslist.splice(index,1);
                this.$store.commit('del',id);
            },
            selectedChanged(id,val){
                //每当点击开关，把最新的开关状态 同步到store中
                // console.log(id+'===='+val);
                this.$store.commit('updateGoodsSelected',{id:id,selected:val})
            }
        },
        components:{
            numbox
        }
    }
</script>

<style scoped lang="scss">
#cart{
    background-color: #cccccc;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            justify-content: space-between;
            img{
                width: 60px;
                height: 60px;
            }
            h1{
                font-size: 13px;
            }
            .info{
                .price{
                    color: red;
                }
            }
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
    }
}
</style>