<template>
    <div class="sales-board">
        <div class="sales-board-intro">
            <h2>数据预测</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, natus fuga? Eius eveniet similique hic!</p>
            <div class="sales-board-form">
                <div class="sales-board-line">
                    <div class="sales-board-line-left fl">购买数量  ：  </div> <div class="sales-board-line-right fl">
                       <v-count :max="maxNum" :min="minNum"></v-count>
                    </div>                
                </div>
                <div class="sales-board-line">
                    <div class="sales-board-line-left fl">产品类型  ：  </div> <div class="sales-board-line-right fl">
                        <v-select :salesList="versionList"></v-select>
                    </div>                
                </div>
                <div class="sales-board-line">
                    <div class="sales-board-line-left fl">有效时间  ：  </div> <div class="sales-board-line-right fl">  
                        <v-select :salesList="periodList"></v-select>
                    </div>
                </div>
                <div class="sales-board-line">
                    <div class="sales-board-line-left fl">单价  ：  </div> <div class="sales-board-line-right">
                        500元
                    </div>                
                </div>
                <button>立即购买</button>
            </div>
        </div>
        <div class="sales-board-des">
            <h2>产品说明</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta asperiores totam iure voluptatem, dolore laboriosam.</p>

        </div>
    </div>
</template>
<script>
import VSelect from "../../components/base/selection"
import VCount from "../../components/base/counter"
export default {
    components:{
        VSelect,VCount
    },
    data(){
        return {
            maxNum:20,
            minNum:1,
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


