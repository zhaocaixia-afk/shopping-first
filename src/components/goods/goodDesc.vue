<template>
    <div id="goodsdesc">
        <h1>{{ info.title }}</h1>
        <hr>
        <div class="conten" v-html="info.content"></div>
    </div>
</template>

<script>
    export default {
        name: "goodDesc",
        data(){
            return{
                id:this.$route.params.id,
                info:{}
            }
        },
        created(){
            this.getinfo();
        },
        methods:{
            getinfo(){
                this.$axios.get('/api/goods/getdesc/'+this.id)
                    .then( res => {
                        if (res.data.status == 0){
                            this.info = res.data.message[0];
                            // console.log(this.info);
                        }
                    })
            }
        }
    }
</script>

<style lang="scss">
#goodsdesc{
    h1{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0px;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>