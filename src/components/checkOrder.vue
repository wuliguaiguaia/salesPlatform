<template>
    <div class="check-order">
        <Dialog :isShow="isShowCheckOrder"  @oncloseDialog="closeDialog">
            <span class="orderConfirm">请确定你的订单状态?</span>
            <button @click="checkStatus">支付成功</button>
            <button @click="checkDefeatStatus">支付失败</button>
        </Dialog>
        <Dialog :isShow="isShowSuccessDialog" @oncloseDialog="closeSuccessDialog">
            <span>购买成功！</span>
        </Dialog>
        <Dialog :isShow="isShowDefeatDialog" @oncloseDialog="closeDialog">
            <span>购买失败！</span>
        </Dialog>
    </div>
</template>
<script>
export default {
    props:{
        isShowCheckOrder:{
            type:Boolean,
            default:false,
        },
        orderId:{
            type:[Number,String],
        }

    },
    data(){
        return{
            isShowDefeatDialog:false,
            isShowSuccessDialog:false,
        }
    },
    methods:{
        closeDialog(){
            this.$emit("closeCheckOrder"); //
            this.isShowDefeatDialog = false;
        },
        // 只当成功 后才打开 列表
        closeSuccessDialog(){
            this.isShowSuccessDialog = false;
            this.$router.push({path:'/orderList'})  // '/'表示从根目录跳转

        },
        checkStatus(){
            this.$emit('closeCheckOrder')
            this.$http.post('/api/order',this.orderId)
            .then((res)=>{
                this.isShowSuccessDialog = true;
            },(err)=>{
                this.isShowDefeatDialog = true;
                console.log('defeat')
            })
        },
        checkDefeatStatus(){
            this.$emit('closeCheckOrder')
            this.isShowDefeatDialog  = true;
        }
    }
}
</script>
<style scoped>
button{
    margin: 10px;
}
</style>


