<template>
<div>
    <form class="dialog-form">
        <div class="dialog-form-line">
            <label for="regusername">用户名 ：</label>
            <input type="text" id="regusername" placeholder="请输入用户名" v-model="username"  autofocus>
            <span class="formError">{{nameError.errorText}}</span>
        </div>
        <div class="dialog-form-line">
            <label for="regpassword">密码 ：</label>
            <input type="password" id="regpassword" placeholder="请输入密码" v-model="password" autocomplete="on" >
            <span  class="formError">{{passError.errorText}}</span>
        </div>
        <button type="" class="submit" @click="onsubmit">注册</button>
        <span class="subError" v-show="isSubmmit">*用户名或密码不符合</span>
    </form>
</div>
</template>
<script>
export default {
  
    data() {
        return {
            username:'',
            password:'',
            isSubmmit:false,
        }
    },
    methods:{
        onsubmit(){
            if(this.nameError.status && this.passError.status && this.username !== '' && this.password !== ''){
                this.$http.get('api/login')
                .then((res)=>{
                    this.$emit("has-log",res.data.data);
                },err => console.log(err));
            }else{
                this.isSubmmit = false;
                console.log('false')
                this.isSubmmit = true;
            }
        }
    },
    computed:{
        nameError(){
            let errorText,status;
           
            if(/^[a-z0-9]{3,5}$/.test(this.username)){
                status = true;
                errorText = '';
            }else{
                status = false;
                 errorText = '*用户名由3-5位字母和数字组成';
            }
            // 不输入不提示
            if(this.username === ''){
                errorText = '';
            }
            return{
                status,
                errorText,
            }
        },
        passError(){
            let errorText,status;
            if(/^[\S]{6,10}$/.test(this.password)){
                errorText = '';
                status = true;
            }else{
                status = false;
                errorText = '*密码由6-10位非空白符组成';
            }
            // 不输入不提示
            if(this.password === ''){
                errorText = '';
            }

            return{
                status,
                errorText,
            }
        }
    }  
}
</script>
<style lang="scss" scoped>

</style>


