<template>
    <div class="bank-chooser">
        <h2>请选择银行</h2>
        <ul>
            <li v-for="(item,index) in banks" :key="index" :title="item.label" :class="[{active:index===nowIndex},'bank-'+item.name]" @click="change(index)"></li>
        </ul>
    </div>
</template>
<script>
export default {
    methods:{
        change(index){
            this.nowIndex = index;
            this.$emit('chooseBank',this.banks[index]);
        },
    },
    data(){
        return{
            nowIndex:0,
            banks: [
          {
              id: 201,
              label: '招商银行',
              name: 'zhaoshang'
          },
          {
              id: 301,
              label: '中国建设银行',
              name: 'jianshe'
          },
          {
              id: 601,
              label: '浦发银行',
              name: 'pufa'
          },
          {
              id: 1101,
              label: '交通银行',
              name: 'jiaotong'
          },
          {
              id: 101,
              label: '中国工商银行',
              name: 'gongshang'
          },
          {
              id: 401,
              label: '中国农业银行',
              name: 'nongye'
          },
          {
              id: 1201,
              label: '中国银行',
              name: 'zhongguo'
          },
          {
              id: 501,
              label: '中信银行',
              name: 'zhongxin'
          }
      ]
        }
    }
}
</script>
<style scoped>
li{
    width: 120px;
    height: 30px;
    background: url(../assets/banks/banks.png);
    display: inline-block;
    cursor: pointer;
    border: 1px solid transparent;
}
li.bank-zhaoshang{
    background-position: 1318px 0;
}
li.bank-jianshe{
    background-position: 2760px 0;
}
li.bank-pufa{
    background-position: 1680px 0;
}
li.bank-jiaotong{
    background-position: 360px 0;
}
li.bank-gongshang{
    background-position: 840px 0;
}
li.active{
    border:1px solid blue;
}
button{
    
    margin: 20px 0 20px 50px;
}
</style>


