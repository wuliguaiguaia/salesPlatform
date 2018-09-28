<template>
    <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
        <div class="slide-img">
            <transition name="slide-trans">
                <a v-if="isShow" :href="slides[nowIndex].url">
                    <img  :src="slides[nowIndex].url" alt="">
                </a>
            </transition>
            <transition name="slide-trans-old">
                <a  v-if="!isShow" :href="slides[nowIndex].url"   >
                    <img :src="slides[nowIndex].url" alt="">
                </a>
            </transition>
        </div>
        <div class="slide-page flex-between">
            <h2>{{slides[nowIndex].title}}</h2>
            <ul class="slide-toggle">
                <li @click="goto(prevIndex)">&lt;</li>
                <li 
                @click="goto(index)" v-for="(item,index) in slides" :key="index" :class="{on:nowIndex===index}">{{index+1}}</li>
                <li  @click="goto(nextIndex)">&gt;</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        slides:{
            type:Array,
            default:[]
        },
        invTime:{
            type:String,
            default:'3000'
        }
    },
    data(){
        return{
            nowIndex:0,
            invId:null,
            isShow:true
        }
    },
    computed:{
        prevIndex(){
            if(this.nowIndex ==  0){
                return this.slides.length-1
            }else{
                return this.nowIndex-1
            }
        },
        nextIndex(){
            if(this.nowIndex == this.slides.length-1){
                return 0
            }else{
                return this.nowIndex+1
            }
        },
    },
    methods:{
        goto(index){
            this.isShow = false;
            setTimeout(()=>{
                this.isShow = true;
                this.nowIndex =  index;
                this.$emit('onchange',index)
            },10)
        },
        runInv(){
            this.invId = setInterval(()=>{
                this.goto(this.nextIndex);
            },this.invTime)
        },
        clearInv(){
            clearInterval(this.invId);
        }
    },
    mounted(){
        this.runInv();
    }
}
</script>
<style lang="scss" scoped>
.slide-show{
    width: 900px;
    overflow: hidden;
    margin-left: 10px;
    position: relative;
    height: 505px;
    .slide-img{
        a,img{
            width: 900px;
            display: inline-block;
            height: 505px;
            position: absolute;
            top: 0;
        }
    }
    .slide-page{
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        cursor: pointer;
        line-height: 50px;
        h2{
            margin-left: 20px;
        }
        .slide-toggle{
            li{
                float: left;
                padding: 0 20px;
            }
            .on:after{
                content: '___';
                width: 50px;
                height: 5px;
                display: block;
                transform: translate(-19px,-9px);
                position: absolute;
                background: #fff;
            }
        }
    }
    .slide-trans-enter-active{
        transition: all .5s;
    }
    .slide-trans-enter{
        transform: translate(900px,0);
    }
    .slide-trans-old-leave-active{
        transition: all .5s;
        transform: translate(-900px,0);
    }

}
</style>

