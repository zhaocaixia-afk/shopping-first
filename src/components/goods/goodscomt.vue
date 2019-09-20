<template>
    <div id="goodscomt">
        <comment :id="this.$route.params.id"></comment>
    </div>
</template>

<script>
// <!--    引入评论子组件-->
    import comment from '../subcomponents/comment.vue'

    export default {
        name: "goodscomt",
        components:{
            comment
        }
    }
</script>

<style scoped>

</style>