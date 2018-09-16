<template>
    <div class="details-wrap">
        <div class="details-left">
            <div class="details-img"><img :src="productIcon" alt=""></div>
            <ul class="details-list">
                <router-link v-for="item in productList" :to="{path:item.path}" :key="item.name" tag="li" active-class="active">{{item.name}}</router-link>
            </ul>
        </div>
        <div class="details-right">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        productIcon(){
            console.log('das');
            return this.imgMap[this.$route.path];
        }
    },
    data(){
        return{
            msg:"hello",
            imgMap: {
                '/details/count': require("../assets/images/1.png"),
                '/details/forecast': require("../assets/images/2.png"),
                '/details/analysis': require("../assets/images/3.png"),
                '/details/publish': require("../assets/images/4.png")
            },
            productList:[
                {
                    name: '数据统计',
                    path: 'count',
                    icon: require('../assets/images/1.png'),
                    active: false
                },
                {
                    name: '数据预测',
                    path: 'forecast',
                    active: false
                },
                {
                    name: '流量分析',
                    path: 'analysis',
                    active: false
                },
                {
                    name: '广告发布',
                    path: 'publish',
                    active: false
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.details-wrap{
    
}
// details-left
.details-left{
    width:180px;
    float: left;
    background-color: #fff;
    .details-img{
        width: 100%;
        padding: 50px 0;
        img{
            margin: 0 auto;
            display: block
        }
    }
    .details-list{
        li{
            width: 100%;
            line-height: 50px;
            text-align: center;
            cursor: pointer;
        }
        li:hover{
            color: #fff;
            background-color: $light-color;
        }
        li.active{
            color: #fff;
            background-color: $light-color;
        }
    }
}
//details-right
.details-right{
    float: right;
    width: 920px;

}



</style>


