<template>
    <div class="sales-board">
        <div class="sales-board-intro">
            <h2>数据预测</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, natus fuga? Eius eveniet similique hic!</p>
            <div class="sales-board-form">
                <div class="sales-board-line">
                    <div class="sales-board-line-left fl">购买数量  ：  </div> 
                    <div class="sales-board-line-right fl">
                       <v-count :max="maxNum" :min="minNum" @on-change="onParamChange('buyNum',$event)"></v-count>
                    </div>                
                </div>
                <div class="sales-board-line">
                    <div class="sales-board-line-left fl">产品类型  ：  </div> 
                    <div class="sales-board-line-right fl">
                        <v-select :salesList="buyTypes" @on-change="onParamChange('buyType',$event)"></v-select>
                    </div>                
                </div>
                <div class="sales-board-line">
                    <div class="sales-board-line-left fl">有效时间  ：  </div> 
                    <div class="sales-board-line-right fl">  
                        <v-select :salesList="periodList"  @on-change="onParamChange('buyTime',$event)"></v-select>
                    </div>
                </div>
                <div class="sales-board-line">
                    <div class="sales-board-line-left fl">单价  ：  </div> 
                    <div class="sales-board-line-right">
                        {{price}}
                    </div>            
                </div>
                <div class="sales-board-line">
                    <div class="sales-board-line-left fl">总价  ：  </div> 
                    <div class="sales-board-line-right">
                        {{totalprice}}
                    </div>            
                </div>
                <button @click="showPayDialog">立即购买</button>
            </div>
        </div>
        <div class="sales-board-des">
            <h2>产品说明</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta asperiores totam iure voluptatem, dolore laboriosam.</p>
        </div>
        <!--  -->
        <myDialog :isShow="isShowPayDialog"  @oncloseDialog="closeDialog" >
            <table class="dialog-trans">
                <tr>
                    <td>购买数量</td>
                    <td>产品类型</td>
                    <td>有效时间</td>
                    <td>产品版本</td>
                    <td>总价</td>
                </tr>
                <tr>
                    <td>{{buyNum}}</td>
                    <td>{{buyType.label}}</td>
                    <td>{{buyTime.label}}</td>
                    <td><span v-for="item in buyVersion" :key="item.label">{{item.label}}</span></td>
                    <td>{{totalprice}}</td>
                </tr>
            </table>
            <bankChooser @chooseBank="onParamChange('bank',$event)">
            </bankChooser>
            <button @click="showCheckOrder">确认购买</button>
        </myDialog>
        <myDialog :isShow="isShowDefeatDialog"  @oncloseDialog="closeDialog">
            <button>购买失败！</button>
        </myDialog>
        <checkOrder :isShowCheckOrder="isShowCheckOrder"  :orderId="bank.id" @closeCheckOrder="closeCheckOrder"></checkOrder>
    </div>
</template>
<script>
import VSelect from "../../components/base/selection"
import VCount from "../../components/base/counter"
import VSingleChooser from "../../components/base/singleChooser"
import bankChooser from "../../components/bankChooser"
import VMulChooser from "../../components/base/mulChooser"
import myDialog from "../../components/dialog"
import checkOrder from "../../components/checkOrder"
export default {
    components:{
        VSelect,VCount,VMulChooser,myDialog,bankChooser,checkOrder
    },
    watch:{
        buyNum(val){
            this.totalprice = val * this.price;
        }
    },
    mounted(){
        this.buyNum = 0;
        this.buyType = this.buyTypes[0];
        this.buyTime = this.periodList[0];
        this.buyVersion = [this.versionList[0]];
        this.$store.dispatch('fetchPrice',this.price);
        this.price = this.$store.getters.getPrice;
    },
    methods:{
        closeCheckOrder(){
            this.isShowCheckOrder = false;
        },
        confirmBuy(){
            console.log('success')
        },
        // 传过去的 都是控制 叉号 或点击锁屏 进行关闭dialog
        closeDialog(){

            this.isShowPayDialog = false;
            this.isShowCheckOrder = false;
            this.isShowReConfineDialog = false;
            this.isShowSuccessDialog = false;
            this.isShowDefeatDialog = false;
        },
        // 特定条件下打开某个dialog
        showPayDialog(){
            console.log(this.isShowPayDialog)
            this.isShowPayDialog =  true;
        },
        showReconfineDialog(){
            this.isShowPayDialog = false;
            this.isShowReConfineDialog = true;
            
        },
        showCheckOrder(){
            let ver = [];
            this.buyVersion.forEach((item,idx)=>{
                ver.push(idx);
            })
            let params = {
                number :this.buyNum,
                version:ver.join(','),
                time:this.buyTime.value,
                type:this.buyType.value,
                bankId:this.bank.id
            }
            this.$http.post('/api/order',params)
            .then((res)=>{
                this.order = res.data.data.orderId;
                this.isShowPayDialog = false;
                this.isShowCheckOrder = true;
            },err=>{
                this.isShowPayDialog = false;
                this.isShowDefeatDialog = true;
                console.log(this.isShowCheckOrder)
            })
  
        },
        showDefeatDialog(){
            this.isShowReConfineDialog = false;
            this.isShowDefeatDialog = true;
        },
        closeSuccessDialog(){
            this.isShowSuccessDialog = false;
        },
        closeDefeatDialog(){
            this.isShowDefeatDialog = false;
        },
        onParamChange(attr,val){
            this[attr] = val;
            let ver = [];
            this.buyVersion.forEach((item,idx)=>{
                ver.push(idx);
            })
            console.log(this.buyNum);
            
            let params = {
                number :this.buyNum,
                version:ver.join(','),
                time:this.buyTime.value,
                type:this.buyType.value,
                bank:this.bank.id
            }
            for(let [key,val] of Object.entries(params)){
                this.$store.commit('updateParams',{key,val});
            }
            this.$store.dispatch('fetchPrice',this.price);
        },
    },
    
    data(){
        return {
            isShowCheckOrder:false,
            isShowDefeatDialog:false,
            order:0,
            isShowSuccessDialog:false,
            isShowReConfineDialog:false,
            bank:0,
            isShowPayDialog:false,
            // price:0,
            buyNum:0,
            buyType:{},
            buyTime:{},
            buyVersion:[],
            maxNum:20,
            minNum:1,
            totalprice:0,
            buyTypes: [
                {
                    value: 0,
                    label: '客户版',
                },
                {
                    value: 1,
                    label: '代理商版',
                },
                {
                    value: 2,
                    label: '专家版',
                }
            ],
            periodList: [
                {
                    label: '半年',
                    value: 0
                },
                {
                    label: '一年',
                    value: 1
                },
                {
                    label: '三年',
                    value: 2
                }
            ],
            versionList: [
                {
                    label: '客户版',
                    value: 0
                },
                {
                    label: '代理商版',
                    value: 1
                },
                {
                    label: '专家版',
                    value: 2
                }
            ],
           
        }
            
    },
}
</script>