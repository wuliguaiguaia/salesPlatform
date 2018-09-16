<template>
<div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
        <div class="order-list-option">
            <label for="">选择产品：</label>
            <v-select :salesList="products" @on-change="onchange('product',$event)"></v-select>
        </div>
        <div class="order-list-option  row">
            <label for="">开始日期：</label>
            <!-- <my-datepicker  :date="startTime"    :option="option" :limit="limit" ></my-datepicker> -->
                <date-picker v-model="time1" :first-day-of-week="1" @input="onchange('startDate',$event)"></date-picker>
        </div>
        <div class="order-list-option">
            <label for="">结束日期：</label>
            <date-picker v-model="time2" :first-day-of-week="1" @input="onchange('endDate',$event)"></date-picker>
        </div>
        <div class="order-list-option">
            <label for="" >关键词：</label>
            <input type="text" v-model.lazy="query" @keydown.enter="onchange('query',$event)">
        </div>
    </div>
    <div class="order-list-table">
        <table>
            <tr>
                <th v-for="heads in tableHeads" :key="heads" :class="{active:heads.active}"  @click="changeOrder(heads)" @mouseover="isShowSpan = true" @mouseout="isShowSpan=false"> {{heads.label}} <span v-show="isShowSpan"></span></th>
                
            </tr>
            <tr  v-for="list in tableData" :key="list.period">
                <td v-for="head in tableHeads" :key="head">{{list[head.key]}}</td>
            </tr>
        </table>
    </div>
</div>
</template>
<script>
import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'
import VSelect from "../components/base/selection";
import datePicker from 'vue2-datepicker'
import {calendar} from 'vue-calendar-picker'
export default {
    components:{
        VSelect,
        calendar,
        datePicker ,
        myDatepicker,
        
    },
    // watch:{
    //     query(){
    //         let params = {
    //             query:this.query,
    //             product:this.product.value,
    //             startDate:this.startDate,
    //             endDate:this.endDate,
    //         }
    //         for(let [key,val] of Object.entries(params)){
    //             this.$store.commit('updateParams',{key,val})
    //         }
    //         this.$store.dispatch('fetchOrderList',this.tableData)
    //         // this.getOrderList();
    //     }
    // },
    mounted(){
        this.$store.dispatch('fetchOrderList',this.tableData)
    },
    computed:{
        tableData(){
            return this.$store.getters.getOrderList;
        }
    },
    methods:{
        switchPeriod(){
            let[ period, year,month,day] = [];
            this.tableData.forEach((item) =>{
                period = item.period;
                year = period.indexOf('年');
                month = period.indexOf("月");
                if(year == -1){
                    year = 0
                }
                if(month<0){
                    month = 0
                }
                year = period.slice(0,year);
                month = period.slice(year,month-1);
                day = 365*year + month*30
                item.periodDay = day;
            })
        },
        changeSort(key){
            this.tableData.sort((item1,item2)=>{
                switch(key){
                    case 'period' :
                        return item1.periodDay > item2.periodDay;
                        break;
                    case 'date':
                        return Date.parse(item1[key]) > Date.parse(item2[key])
                        break;
                    case 'buyNum' :
                        return item1[key] > item2[key];
                        break;
                    case 'amount' :
                        return parseInt(item1[key]) > parseInt(item2[key]);
                        break;
                    case 'orderId':
                        return item1[key] > item2[key];
                        break;
                    default:
                    return item1[key].localeCompare(item2[key],"zh")
                }
            })
        },
        changeReverse(key){
            this.tableData.sort((item1,item2)=>{
                switch(key){
                    case 'period' :
                        return item1.periodDay < item2.periodDay;
                        break;
                    case 'date':
                        return Date.parse(item1[key]) < Date.parse(item2[key])
                        break;
                    case 'buyNum' :
                        return item1[key] < item2[key];
                        break;
                    case 'amount' :
                        return parseInt(item1[key]) < parseInt(item2[key]);
                        break;
                    case 'orderId':
                        return item1[key] < item2[key];
                        break;
                    default:
                    return item2[key].localeCompare(item1[key],"zh")
                }
            })
        },
        changeOrder(head){
            this.tableHeads.forEach(item=>{
                item.active = false;
            })
            head.active = true;
            this.switchPeriod();
            let key = head.key;
            if(this.changeOrderFlag == 'sort'){
                this.changeSort(key);
                this.changeOrderFlag = 'reverse'
                return false;
            }
            if(this.changeOrderFlag == 'reverse'){
                this.changeReverse(key);
                this.changeOrderFlag = 'sort'
                return  false;
            }
          
        },
        onchange(attr,value){
            console.log('on change')
            this[attr] = value;
            let params = {
                query:this.query,
                product:this.product.value,
                startDate:this.startDate,
                endDate:this.endDate,
            }
            for(let [key,val] of Object.entries(params)){
                this.$store.commit('updateParams',{key,val})
                
            }
            this.$store.dispatch('fetchOrderList',this.tableData)
            // this.getOrderList();
        },
        getOrderList(){
            let params = {
                query:this.query,
                product:this.product.value,
                startDate:this.startDate,
                endDate:this.endDate,
            }
            this.$http.post('/api/orderList',params)
            .then((res)=>{
                this.tableData = res.data.data.list ;
            },err=>console.log('err'))
        }
    },
    data(){
        return{
            isShowSpan:false,
            changeOrderFlag:'sort',
            query:'',
            startDate:'',
            endDate:'',
            product:{},
            // tableData:[],
            
            // vue2-datepicker
            time1: '',
            time2: '',
            time3: '',
            shortcuts: [
                {
                text: 'Today',
                onClick: () => {
                    this.time3 = [ new Date(), new Date() ]
                }
            }
            ],
            timePickerOptions:{
                start: '00:00',
                step: '00:30',
                end: '23:30'
            },
            products: [
        {
          label: '数据统计',
          value: 0
        },
        {
          label: '数据预测',
          value: 1
        },
        {
          label: '流量分析',
          value: 2
        },
        {
          label: '广告发布',
          value: 3
        }
      ],
           // th
             tableHeads: [
                {
                label: '订单号',
                key: 'orderId'
                },
                {
                label: '购买产品',
                key: 'product'
                },
                {
                label: '版本类型',
                key: 'version'
                },
                {
                label: '有效时间',
                key: 'period'
                },
                {
                label: '购买日期',
                key: 'date'
                },
                {
                label: '数量',
                key: 'buyNum'
                },
                {
                label: '总价',
                key: 'amount'
                }
            ],
        }
    },
    
}
</script>
<style lang="scss" scoped>

.order-list-option{
    margin-left: 18px; 
    display: inline-block;
}
.order-list-table{
    margin-top: 30px;
}

table{
    width: 100%;
    text-align: left;
    line-height: 40px;
    box-shadow: 0 0 2px 2px #ccc;
    border-spacing: 3px;
    cursor: pointer;

    th{
        background-color: green;
        color: #fff;
        text-align: center;
        position: relative;
        span{
            width: 0px;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #f9f5f5;
            position: absolute;
            right: 9px;
            top: 18px;
        }
    }
    th.active{
        background-color: red;
    }
    td{
        background-color: #fff;
        text-indent: 15px;
    }
}

</style>


