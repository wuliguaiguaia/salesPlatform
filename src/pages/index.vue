<template>
    <div class="index-wrap">
        <div class="index-left">
            <div class="index-allList">
                <h2>全部产品</h2>
                <template v-for="product in productList">
                    <h3 :key="product">{{product.title}}</h3>
                    <ul :key="product"> 
                        <li v-for="item in product.list" :key="item">
                            <router-link :to="{path:'/details/'+ item.toKey}">{{item.name}}</router-link>
                            <!-- <a :href="item.url">{{item.name}}</a> -->
                            <span v-if="item.hot" class="hot-tag">HOT</span>
                        </li>
                    </ul>
                    <span v-if="!product.last" class="hr" :key="product"></span>
                </template>
            </div>
            <div class="index-newsList">
                <h2>最新消息</h2>
                <ul>
                    <li v-for="item in newsList"  :key="item">
                        <a :href="item.url">{{item.title}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="index-right">
            <slide-show :slides="slides" :invTime="invTime" @onchange="dosomething"></slide-show>
            <div class="index-board-list">
                <div class="index-board-item" v-for="(board) in boardList" :key="board"  :class="`index-board-${board.id}`" :style="`background:url(${board.url})#fff no-repeat  20px center`">
                    <h2>{{board.title}}</h2>
                    <p>{{board.description}}</p>
                    <div class="index-board-button">
                        <router-link class="button" :to="{path:'details/'+ board.toKey}">立即购买</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import slideShow from "./../components/slidesShow";
export default {
    created(){
        this.$http.get('api/NewsList').then((res)=>{
            this.newsList = res.data.data;
        },err=>console.log(err));
    },
    components:{
        slideShow,
    },
    data(){
        return  {
            invTime:'1000',
            slides: [
                {
                    url: require('../assets/slideShow/pic1.jpg'),
                    title: 'xxx1',
                    href: 'detail/analysis'
                },
                {
                    url: require('../assets/slideShow/pic2.jpg'),
                    title: 'xxx2',
                    href: 'detail/count'
                },
                {
                    url: require('../assets/slideShow/pic3.jpg'),
                    title: 'xxx3',
                    href: 'http://xxx.xxx.com'
                },
                {
                    url: require('../assets/slideShow/pic4.jpg'),
                    title: 'xxx4',
                    href: 'detail/forecast'
                }
            ],
            boardList: [
                {
                    title: '开放产品',
                    description: '开放产品是一款开放产品',
                    id: 'car',  //当图片和文字关联性强的时候 取名id
                    toKey: 'analysis',
                    saleout: false,
                    url:require('../assets/images/1.png')
                },
                {
                    title: '品牌营销',
                    description: '品牌营销帮助你的产品更好地找到定位',
                    id: 'earth',
                    toKey: 'count',
                    saleout: false,
                    url:require('../assets/images/2.png')
                },
                {
                    title: '使命必达',
                    description: '使命必达快速迭代永远保持最前端的速度',
                    id: 'loud',
                    toKey: 'forecast',
                    saleout: true,
                    url:require('../assets/images/3.png')
                },
                {
                    title: '勇攀高峰',
                    description: '帮你勇闯高峰，到达事业的顶峰',
                    id: 'hill',
                    toKey: 'publish',
                    saleout: false,
                    url:require('../assets/images/4.png')
                }
            ],
            newsList:[
            ],
            productList:{
                pc:{
                    title:'PC产品',
                    list:[{
                        name: '数据统计',
                        url: 'http://starcraft.com',
                        toKey: 'count',
                    },
                    {
                        name: '数据预测',
                        url: 'http://warcraft.com',
                        toKey: 'forecast',
                    },
                    {
                        name: '流量分析',
                        url: 'http://overwatch.com',
                        toKey: 'analysis',
                        hot: true
                    },
                    {
                        name: '广告发布',
                        url: 'http://hearstone.com',
                        toKey: 'publish',
                    }]
                },
                app:{
                    title: '手机应用类',
                    last: true,
                    list: [
                    {
                        name: '91助手',
                        url: 'http://weixin.com'
                    },
                    {
                        name: '产品助手',
                        url: 'http://twitter.com',
                        hot: true
                    },
                    {
                        name: '智能地图',
                        url: 'http://maps.com'
                    },
                    {
                        name: '团队语音',
                        url: 'http://phone.com'
                    }]
                }
            }
        }
    },
    methods:{
        dosomething(index){
            console.log(index);
        }
    }
}
</script>
<style lang="scss" scoped>

.index-wrap{
     
}
// .index-left
.index-left{
    width:180px;
    float: left;

    .index-newsList{
        h2{
            margin-bottom: 10px;
        }
    }
    & > div{
        margin-bottom:15px;
        color:#000;
        text-indent:20px;  //**
        background-color: #fff;
        box-shadow: 0 0 11px 0px #b5b5b5;

        h2{
            color:#fff;
            width:100%;
            line-height:30px;
            height: 30px;
            background-color:$color;
            font-size:$fsize;
        }

        h3{
            font-weight:bold;
            font-size:$small-fsize;
            line-height: 35px;
        }

        ul{
            padding-bottom: 10px;
            li{
                line-height: 25px;
                text-indent: 30px;
                position: relative;
            }
        }

        .hr{
            width: 100%;
            height: 2px;
            background-color: #ccc;
            display:block;
        }

        .hot-tag{
            background-color: red;
            color: #fff;
            font-size: 12px;
            width: 34px;
            overflow: hidden;
            height: 20px;
            line-height: 20px;
            display: inline-block;
            text-indent: 0;
            transform: scale(0.8) translateY(4px);
            text-align: center;
        }
    }
}


// index-right
.index-right{
    float: right;
    width: 920px;
    .index-board-list{
    }
    .index-board-item{
        background-color: #fff;
        margin: 10px 0 0 10px ;
        width: calc(50% - 10px);
        float: left;
        box-sizing: border-box;
        padding-left: 150px;
        height: 120px;
        h2{
            font-weight: bold;
            line-height: 50px;
        }
        p{
            // line-height: 30px;
        }

    }
    .index-board-button{
        width: 100px;
        height: 30px;
        line-height: 30px;
        margin: 10px 0;
        background: green;
        text-align: center;
        a {
            color: #fff;

        }
    }
    
}

</style>



