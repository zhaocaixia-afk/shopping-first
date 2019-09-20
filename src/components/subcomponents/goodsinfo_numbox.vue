<template>
<!--    异步请求 不知道什么时候会拿到max值-->
<!--    使用watch 属性来监听，来监听父组件传递过来的max值，最后一次，肯定是一个合法的max值-->
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="countChanged()" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "goodsinfo_numbox",
        mounted() {
            //初始化数字选择框组件
            mui('.mui-numbox').numbox();
        },
        methods:{
        //    子组件什么时候把数据 传递给 子组件
        //    点击 ‘+’或‘-’或‘修改数量’都应该立即把值传递个父组件
        //    值的onchange事件
            countChanged(){
                // console.log(this.$refs.numbox.value);
                this.$emit('getcount',parseInt(this.$refs.numbox.value))
            }
        },
        props:['max'],
        watch:{//监听max值
            'max':function (newVal,oldVal) {
                //使用JS API设置最大值 官方文档中
                mui('.mui-numbox').numbox().setOption('max',newVal)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>