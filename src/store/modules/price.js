import Vue from 'vue'
const state = {  //存放数据
    price:0,
    params:{}
} ;
const getters = {  //页面调用state里的值
    getPrice(state){
        return state.price;
    }
} ;
const actions = { //异步操作
    fetchPrice({commit,state}){ // commit调用 mutations，
                                // state获取状态集数据
        Vue.http.post('/api/getPrice',state.params)
        .then((res)=>{
            console.log(res.data.data)
            commit('updatePrice',res.data.data.amount);
        },err=>console.log(err))
    }
} ;
const mutations= {//同步状态更改
    // 设置同步动作
    updatePrice(state,payload){
        state.price = payload
    },
    updateParams(state,{key,val}){
        state.params[key] = val
    }
} ;
 
 
 
 
 export default{
     state,
     getters,
     actions,
     mutations,
 }