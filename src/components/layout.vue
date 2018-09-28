<template>
<div @click.stop="resetComponent" >
  <div class="app-head">
      <div class="app-head-inner">
          <router-link :to="{name:'index'}">
            <img src="./../assets/logo.png" alt="">
          </router-link>
          <div class="head-nav">
            <ul class="nav-list list-inline">
                <li v-if="username"  v-text="username"></li>
                <li v-if="username"  @click="quit">退出</li>
                <li v-if="!username" @click="showDialog('login')">登录</li>
                <li v-if="!username" @click="showDialog('reg')"  >注册</li>
                <li @click="showDialog('about')">关于</li> 
            </ul>
          </div>
      </div>
  </div>
  <div class="app-content">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
  </div>
  <div class="app-foot">
    <p>© 2016 fishenal MIT</p>
  </div>

  <!--  -->
    <Dialog :isShow="isShow.login" dialogName="登录"  @oncloseDialog="closeDialog('login')"  >
        <LoginForm  @oncloseDialog="closeDialog('login')" @has-log="onsuccessLog"></LoginForm>
    </Dialog>

  <!--  -->
  <Dialog :isShow="isShow.reg"  dialogName="注册"  @oncloseDialog="closeDialog('reg')" >
      <RegForm  @oncloseDialog="closeDialog('reg')" @has-log="showDialog('login')"></RegForm>
  </Dialog>
  
  <!--  -->
  <Dialog :isShow="isShow.about"   dialogName="关于"  @oncloseDialog="closeDialog('about')" >
      <p>本报告在调研数据的基础上，采用定性与定量相结合的方式深入分析了专车市场发展的驱动因素与阻碍因素、专车市场背后的产业格局、专车企业的竞争格局、用户对专车市场的依赖程度、专车对其他交通工具运力的补充效应等，通过这五个章节的研究反映专车市场的发展态势和面临的问题。报告力求客观、深入、准确地反映中国专车市场发展情况，为政府、企事业单位和社会各界提供决策依据。 </p>
  </Dialog>
</div>
</template>

<script>
export default {
    data () {
        return {
            username:'',
            isShow:{
                login:false,
                reg:false,
                about:false,
            },
        }
    },
    methods:{
        quit(){
            this.username = ''
        },
        closeDialog(attr){
            this.isShow[attr] = false;
        },
        showDialog(attr){
            this.isShow.login = false;
            this.isShow.reg = false;
            this.isShow.about = false;
            this.isShow[attr] = true;
        },
        onsuccessLog(data){
            this.username = data.name;
            console.log(data);
            console.log('das');
            this.closeDialog('login');
            this.closeDialog('regin');
        },
        resetComponent(e){
            if (!e.target.classList.contains('select-default')){
                this.$root.eventHub.$emit('close-select',1)
            } 
        },
    },
}
</script>
<style lang="scss"> 
html{
    font-size: 62.5%;
    color: #222;
}

body{
    font-size: $small-fsize;
    margin: 0;
    background-color: #ccc;
    color: #333;
    font-family:"微软雅黑";
}

h1,h2,h3,h4,h5{
    margin: 0;
    font-weight: normal;
}

ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
}

a{
    color: #666;
    text-decoration: none;
}   

a:hover{
    color:dark-color;
}

dl,dt,dd,p{
    margin: 0;
    padding: 0;
}

img{
    vertical-align: middle;
}

label,button{
    cursor: pointer;    
}

button{
    outline: none;
    text-align: center;
    border: none;
}

//layout
.fr{
    float: right;
}

.fl{
    float: left;
}


// flex
.flex{
    display: flex;
}

.flex-row{
    display: flex;
    flex-direction: row;
}

.flex-col{
    display: flex;
    flex-direction: column;
}

.flex-between{
    display: flex;
    justify-content: space-between;
}

.flex-around{
    display: flex;
    justify-content: space-around;
}

.jusBetween-alignCenter{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.jusCenter-alignCenter{
    display: flex;
    align-items: center;
    justify-content: center;
}

.jusAround-alignCenter{
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.jus-around{
    display: flex;
    justify-content: space-around;
}

.jus-between{
    display: flex;
    justify-content: space-between;
}
.jus-center{
    display: flex;
    justify-content: center;
}

/*   app-head     */
.app-head{
    width: 100%;
    height: 50px;
    background-color: #333;
    color: #fff;
    min-width:1300px;
}

.app-head-inner{
    margin-left: 200px;
    margin-right: 20px;
    overflow: hidden;
}

.app-head a img{
    width: 48px;
    transform: translate(0, 2px);
}

.head-nav{
    float:right;

    .nav-list{
        li{
            line-height: 50px;
            float: left;
            padding-left: 15px;
            cursor: pointer;
        }
        li ~ li:before{
            content:'|';
            width: 3px;
            height: 50px;
            display: inline-block;
            color:#fff;
            margin-right: 15px;
        }
    }
}

.app-content{
    margin:30px 20px  30px 200px;
    overflow:hidden;
    width: 1100px;
    min-height: 500px;
}

/* app - foot */
.app-foot{
    width: 100%;
    height: 50px;
    color: #333;
    background-color: #aaa;
    text-align: center;
    line-height: 50px;
    min-width: 1300px;
}

/*   form */ 
.dialog-form{
    width: 100%;
    background-color: #ccc;
    box-sizing: border-box;
    padding: 20px;
    font-size: 16px;
    .subError{
        color: red;
        font-size: 14px;
        display: block;
        transform: translateX(200px);
    }
    .submit{
        width: 200px;
        height: 40px;
        background-color: green;
        color: #fff;
        font-size: 20px;
        line-height: 30px;
        margin:0 auto;
        display: block;
    }
}
.dialog-form-line{
    position: relative;
    margin:20px;
    label{
        width: 80px;
        text-align: right;
        display: inline-block;
    }
    input{
        width: 200px;
        height: 30px;
    }
    .formError{
        color: red;
        font-size: 14px;
        position: absolute;
        left: 300px;

    }
   
}

// // sales 各组件
.sales-board{
    margin: 0 20px 0 15px;
}
.sales-board-intro{
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px 20px 30px;
    h2{
        font-weight: bold;
        font-size: 18px;
    }
    p{
        margin: 10px 0 15px;
    }
}
.sales-board-form{
    .sales-board-line{
        display: block;
        margin: 35px 0;
        height: 28px;
    }
    .sales-board-line-right{
        margin-left: 20px;
    }
    button{
        margin-left: 100px;
  
    }
    .sales-board-line-left{
        // width: 80px;
    }
}
.sales-board-des{
    padding: 15px 20px 30px;
    background-color: #fff;
}

button{
     
    width: 150px;
    height: 35px;
    line-height: 35px;
    background-color: green;
    color: #fff;
    margin: 50px;
}


</style>
 
 