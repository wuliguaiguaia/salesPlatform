<template>
    <div class="choose-component">
        <span :class="{active:ischoose(index)}"  v-for="(item,index) in salesList" :key="index" @click="chooseArrEvent(index)">{{item.label}}</span>
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
            chooseArr:[0],
        }
    },
    methods:{
        chooseArrEvent(index){
            if(this.chooseArr.indexOf(index) !== -1){
                this.chooseArr.splice(index,1)
            }else{
                this.chooseArr.push(index);
            }
            this.$emit('on-change',[...this.chooseArr])
        },
        ischoose(index){
            return this.chooseArr.indexOf(index) !== -1;
        }
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
    margin-left: 15px;
    display: inline-block;
}
span.active{
    // background-color: $dark-color;
    background-color: red;
    color:#fff;
}
</style>


