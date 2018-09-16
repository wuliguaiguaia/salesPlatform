<template>
    <div>
        <div class="dialog-wrap">
            <div class="dialog-cover"  @click="closeDialog" v-show="isShow"></div>
            <transition name="dialogAnimation"> <!-- 需要做动画，所以将v-show分开-->
                <div class="dialog-content " v-show="isShow">
                    <div class="dialog-close">
                        <h2>{{dialogName}}</h2>
                        <button class="close-button" @click="closeDialog">×</button>
                    </div>
                    <slot>no  slot</slot>
                </div>
            </transition>
        </div> 
    </div>
</template>
<script>
export default {
    props:{
        isShow:{
            type:Boolean,
            default:false,
        },
        dialogName:{
            type:String,
            // default:'登录'
        }
    },
    data(){
        return {
            msg:'hello'
        }
    },
    methods:{
        closeDialog(){
            this.$emit("oncloseDialog");
        },
    }
}
</script>
<style lang="scss" scoped>
.dialog-wrap{
    .dialogAnimation-enter,.dialogAnimation-leave-active{
        transform: translateY(-300px);
    }
    .dialogAnimation-enter-active,{
        transition:all ease-in .3s;
    }
    .dialogAnimation-leave-active{
        transition:all linear .1s;
    }

    .dialog-cover{
        background-color: rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
    }

    .dialog-content{
        width: 550px;
        background-color: #fff;
        box-shadow: 0 0 3px 1px #333;
        z-index:1000;
        position: absolute;
        color :#000;
        padding-bottom:30px;
        top: 20%;
        left: 50%;
        margin-left:-25%;
    }
    .dialog-close{
        background-color:#333;
        color: #fff;
        width: 100%;
        height: 35px;
        line-height: 35px;
        margin-bottom:20px;
        h2{
            text-align: center;
            
        }
        button.close-button{
            line-height: 35px;
            position: absolute;
            right: 20px;
            cursor: pointer;
            background-color: transparent;
            color: #fff;
            font-size: 25px;
            font-weight: bold;
            width: 30px;
            top: 0;
            margin: 0;
        }

    }
    
}
</style>


