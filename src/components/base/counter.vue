<template>
    <div class="count">
        <span class="dec" @click="dec"> - </span>
        <input type="text" v-model="number" @keyup="fixnumber">
        <span class="add" @click="add"> + </span>
    </div>
</template>
<script>
export default {
    data(){
        return{
            number:0,
        }
    },
    props:{
        max:{
            type:Number,
            default:20
        },
        min:{
            type:Number,
            default:0
        }
    },
    watch:{
        number(){
            this.$emit('on-change',this.number);
        }
    },
    methods:{
        fixnumber(){
            this.number = Number(this.number.replace(/\D/g,''));
        },
        dec(){
            if(this.number <= this.min){
                this.number = this.min;
            }else{
                this.number-- 
            }
        },
        add(){
            if(this.number >= this.max){
                this.number = this.max;
            }else{
                this.number++ 
            }
        }
    },
   
    
}
</script>
<style lang="scss" scoped>
.dec,.add{
    width: 30px;
    height: 30px;
    background-color: #ccc;
    color: #fff;
    border: 1px solid #ccc;
    display: inline-block;
    text-align: center;
    line-height: 30px;
    font-size: 23px;
    font-weight: bold;
    cursor: pointer;
}
.count{
    user-select:none;
}
input{
    width: 100px;
    text-align: center;
    height: 26px;
    vertical-align: bottom;
}
</style>


