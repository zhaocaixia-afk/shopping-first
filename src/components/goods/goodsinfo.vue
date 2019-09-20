<template>
    <div id="goodsinfo">
        <!--        加入购物车小球-->
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="boll" v-show="ballFull" ref="ball"></div>
        </transition>
<!--        使用的是MUI中的cart.html-->
<!--        只含 中间内容-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
<!--                    封装好的轮播图子组件-->
                    <swiper :lunbotu="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
<!--        含 页眉 和 中间内容-->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodinfo.market_price }}</del>
                        &nbsp;&nbsp;
                        销售价：<span class="now_price">￥{{ goodinfo.sell_price }}</span>
                    </p>
<!--                    向子组件 传递了 一个方法-->
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary">立即购买</mt-button>
                        <mt-button type="danger" @click="add">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
<!--        含 页眉 中间内容 页脚-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodinfo.goods_no }}</p>
                    <p>库存情况：{{ goodinfo.stock_quantity }}</p>
                    <p>上架时间：{{ goodinfo.add_time | dataFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" plain size="large" @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" plain size="large" @click="goComt(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
// <!--    导入轮播图子组件-->
    import swiper from '../subcomponents/swiper.vue'
    //导入数字选择框
    import numbox from '../subcomponents/goodsinfo_numbox.vue'

    export default {
        name: "goodsinfo",
        data(){
            return{
                id:this.$route.params.id,
                lunbotu:[],//轮播图数据
                goodinfo:{},//商品信息
                ballFull:false,//小球的显示和隐藏
                selectedCount:1//默认为一件 保存用户选中的商品数量
            }
        },
        created(){
            this.getlunbotu();
            this.getgoodinfo();
        },
        methods:{
            getlunbotu(){
                this.$axios.get('/api/getthumimages/'+ this.id)
                    .then( res => {
                        if (res.data.status == 0){
                            //添加img属性 封装好的 轮播图 子组件 只认识img
                            res.data.message.forEach( item => {
                                item.img = item.src;
                            })
                            this.lunbotu = res.data.message;
                            // console.log(this.lunbotu);
                        }
                    })
            },
            getgoodinfo(){//得到商品详情信息
                this.$axios.get('/api/goods/getinfo/'+ this.id)
                    .then( res => {
                        if (res.data.status == 0){
                            this.goodinfo = res.data.message[0];
                            // console.log(this.goodinfo);
                        }
                    })
            },
            goDesc(id){//图文介绍 编程式导航
                this.$router.push('/home/goodsdesc/'+ id)
            },
            goComt(id){//商品评论 编程式导航
                this.$router.push({name:'goodscomt',params:{id}})
            },
            add(){//添加到购物车
                this.ballFull = !this.ballFull
                // {id:商品的id，count：商品数量，price：商品的单价，selected：false}
                //拼接出一个，要保存到store 中car 数组的对象
                var goodsinfo = {
                    id: this.id,
                    count: this.selectedCount,
                    price:this.goodinfo.sell_price,
                    selected:true}
                //    商品加入store中
                this.$store.commit('addToCar',goodsinfo);
            },
            beforeEnter(el){
                el.style.transform = "translate(0,0)"
            },
            enter(el,done){
                el.offsetWidth;
                //获取小球的矩形对象
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                //必要 时候 操作 DOM对象 获取 购物车小图标位置
                const badgePosition = document.getElementById('badge').getBoundingClientRect();

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                el.style.transform = `translate(${xDist}px,${yDist}px)`;
                el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterEnter(el){
                this.ballFull = !this.ballFull
            },
            getSelectedCount(count){
                //子组件 向 父组件 传值
                //当子组件 传递的 数量 保存到父组件上
                this.selectedCount = count;
                // console.log('父组件从子组件拿到的数是' + this.selectedCount);
            }
        },
        components:{
            swiper,
            numbox
        }
    }
</script>

<style scoped lang="scss">
#goodsinfo{
    background-color: #cccccc;
    overflow: hidden;//解决上边的背景颜色

    .now_price{
        color: red;
        font-size: 16px;
    }
    /*页脚的按钮*/
    .mui-card-footer{
        display: block;
        button{
            margin: 10px 0px;
        }
    }

    .boll{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        left: 40%;
        top: 390px;
    }
}
</style>