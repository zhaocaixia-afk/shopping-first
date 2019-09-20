<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9' style="height: 25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" readonly ref="numbox" @change="countChanged()" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "cart_numbox",
        mounted() {
            //初始化数字选择框组件
            mui('.mui-numbox').numbox();
        },
        methods:{
            countChanged(){
                // console.log(this.$refs.numbox.value);
                //每当数值改变
                this.$store.commit('updateGoodsInfo',{id:this.goodsid,count:this.$refs.numbox.value})
            }
        },
        props:['initcount','goodsid']
    }
</script>

<style scoped>

</style>