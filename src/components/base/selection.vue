<template>
    <div class="select-component">
       <div class="select-default"  @click.stop="isShow = !isShow">{{salesList[nowIndex].label}}
           <span class="arrow" ></span>
       </div>
       <ul class="select-options" v-show="isShow">
           <li :class="{active : index == nowIndex}" v-for="(item,index) in salesList" :key="index" @click="onchange(index)" >{{item.label}}</li>
       </ul>
    </div>
</template>
<script>
export default {
    props:{
        salesList:{
            type:Array,
            default:[]
        },
    },
    data(){
        return {
            nowIndex:0,
            isShow:false
        }
    },
    methods:{
        closeSelect(){
           this.isShow = false;
        },
       onchange(index){
           this.nowIndex = index;
           this.isShow = false;
           this.$emit('on-change',this.salesList[index])
       },
       
    },
    mounted(){
        this.$root.eventHub.$on('close-select',this.closeSelect);
    },
    // beforeDestory(){
    //    this.$root.eventHub.$off('close-select',this.closeSelect)
    // }
}
</script>
<style lang="scss">
.select-component{
    text-indent: 10px;
    width: 100px;
    position: relative;
    line-height: 30px;
    background-color: #fff;
    display: inline-block;
}
.select-default{
    width: 100%;
    border:1px solid #ccc;
    position: relative;
    span{
        position: absolute;
        display: inline-block;
        right: 20px;
        top: 10px;
        width: 0;
        height: 0;
        border-left: 6px solid  transparent;
        border-right: 6px solid  transparent;
        border-top: 10px solid #ccc;
        cursor: pointer;
        transform:translateX(10px)
    }
}
.select-options{
    width: 100px;
    position: absolute;
    top: 30px;
    z-index: 1000;
    border:1px solid #ccc;
    background-color: #fff;
    li{
        cursor: pointer;
    }
    li.active{
        color: #Fff;
        background-color: blue;
    }
    li:hover{
        color: #Fff;
        background-color: blue;
    }
}

</style>


