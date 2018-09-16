<template>
    <div class="choose-component">
        <span :class="{active:index == nowIndex}"  v-for="(item,index) in salesList" :key="index" @click="change(index)">{{item.label}}</span>
    </div>
</template>
<script>
export default {
    props:{
        salesList:{
            type:Array,
            default:[],
        }
    },
    data(){
        return{
            ischoose:false,
            nowIndex:0
        }
    },
    methods:{
        change(index)   {
            this.nowIndex = index;
            this.$emit('on-change',Array.of(this.salesList[index]))
        },
    }
}
</script>
<style lang="scss" scoped>
span{
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #ccc;
    cursor: pointer;
    margin-right:15px;
    display: inline-block;
}
span.active{
    // background-color: $dark-color;
    background-color: green;
    color:#fff;
}
</style>


