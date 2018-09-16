import Vue from 'vue'
const state = {  //存放数据
    orderList:[],
    params:{}
} ;
const getters = {  //页面调用state里的值
    getOrderList(state){
        return state.orderList;
    }
} ;
const actions = { //异步操作
    fetchOrderList({commit,state}){ //commit调用 mutations，
                                    // state获取状态集数据
        Vue.http.post('/api/orderList',state.params)
        .then((res)=>{
            commit('updateOrderList',res.data.data.list);
        },err=>console.log(err))
    }
} ;
const mutations= {//同步状态更改
    // 设置同步动作
    updateOrderList(state,payload){
        state.orderList = payload
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