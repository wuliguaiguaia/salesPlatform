<template>
    <div class="sales-board">
        <div class="sales-board-intro">
            <h2>数据预测</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, natus fuga? Eius eveniet similique hic!</p>
            <div class="sales-board-form">
                <div class="sales-board-line">
                    <div class="sales-board-line-left fl">媒介多选 ：  </div> <div class="sales-board-line-right fl">
                       <v-mul-chooser :salesList="mediaList"></v-mul-chooser>
                    </div>                
                </div>
                <div class="sales-board-line">
                    <div class="sales-board-line-left fl">媒介 ：  </div> <div class="sales-board-line-right fl">
                       <v-single-chooser :salesList="mediaList"></v-single-chooser>
                    </div>                
                </div>
                <div class="sales-board-line">
                    <div class="sales-board-line-left fl">产品类型  ：  </div> <div class="sales-board-line-right fl">
                        <v-select :salesList="buyTypes"></v-select>
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
import VMulChooser from "../../components/base/mulChooser"
import VSingleChooser from "../../components/base/singleChooser"

export default {
    components:{
        VSelect,VCount,VMulChooser,VSingleChooser,
    },
    data(){
        return {
            maxNum:20,
            minNum:1,
            mediaList: [
                {
                    label: '纸质报告',
                    value: 0
                },
                {
                    label: 'pdf',
                    value: 1
                },
                {
                    label: '页面报告',
                    value: 2
                },
                {
                    label: '邮件',
                    value: 3
                }
            ],
            buyTypes: [
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


