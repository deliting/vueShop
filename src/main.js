import Vue from 'vue'
import VueRouter from 'vue-router'//配置路由
Vue.use(VueRouter)

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')//重新刷新界面后依然保存上次的购物车数量,配合localStorage

//localStorage.getItem(key):获取指定key本地存储的值
// 将 购物车中的商品的数据，用一个数组存储起来，

var store = new Vuex.Store({
  state: {//this.$store.state.***   
    car: car
   
    
  },
  mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
  addToCar(state, goodsinfo) {
    // 点击加入购物车，把商品信息，保存到 store 中的 car 上
    // 分析：
    // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
    // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

    // 假设 在购物车中，没有找到对应的商品
    var flag = false
    //some会遍历数组中的每个元素，让每个值都执行一遍回调函数

    //如果有一个元素满足条件，返回true , 剩余的元素不会再执行检测。
    state.car.some(item => {
      if (item.id == goodsinfo.id) {
        item.count += parseInt(goodsinfo.count)//goodsinfo.count可能是字符串
        flag = true
        return true//终止some循环
      }
    })

    // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
    if (!flag) {
     state.car.push(goodsinfo)
    }
    
    // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
    localStorage.setItem('car', JSON.stringify(state.car))
   
  },
  clearToCar(state){//清空购物车
    state.car.some(item => {
         item.count = 0
    })
  },
  updateGoodsInfo(state, goodsinfo) {//第一个参数是id1 2 3 4，第二个参数是商品数量
    // 修改购物车中商品的数量值
    // 分析： 
   
    state.car.some(item => {
      if (item.id == goodsinfo.id) {
        item.count = parseInt(goodsinfo.count)
       
        return true
      }
    })
   
    // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中   localStorage.setItem(key,value)：将value存储到key字段
    localStorage.setItem('car', JSON.stringify(state.car))
  },
  removeFormCar(state, id) {
    // 根据Id，从store 中的购物车中删除对应的那条商品数据
    state.car.some((item, i) => {
      if (item.id == id) {
        state.car.splice(i, 1)//位置，数量
        return true;
      }
    })
    
    // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
    localStorage.setItem('car', JSON.stringify(state.car))
  },
  updateGoodsSelected(state, info) {
    
     state.car.some(item => {
       if (item.id == info.id) {
        item.selected = info.selected;      
       }
 
    })
    
    console.log(state.car)
    // 把最新的 所有购物车商品的状态保存到 store 中去
    localStorage.setItem('car', JSON.stringify(state.car))
  }
},
getters: { // this.$store.getters.***
  // 相当于 计算属性，也相当于 filters
  getAllCount(state) {//App.vue中tabbar栏的购物车引用这个方法
    var c = 0;
    state.car.forEach(item => {
      c += item.count
    })
    return c
  },
  getGoodsCount(state) {
    var o = {}
   state.car.forEach(item => {
      o[item.id] = item.count
    })
    return o
  },
  getGoodsSelected(state) {
    var o = {}
    
    state.car.forEach(item => {
      o[item.id] = item.selected;
    })
    console.log("getGoodsSelected()----");
    console.log(o);
    return o
  },
  getGoodsCountAndAmount(state) {
    var o = {
      count: 0, // 勾选的数量
      amount: 0 // 勾选的总价
    }
    state.car.forEach(item => {
      if (item.selected) {
        o.count += item.count
        o.amount += item.price * item.count
      }
    })
  
    return o
  }
    
}
})
// // 导入格式化时间的插件
 import moment from 'moment'
// // // 定义全局的过滤器  格式化时间
  Vue.filter('dateformat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
  })

// // 2.1 导入 vue-resource           获取数据使用vue-resource
import VueResource from 'vue-resource'
// // 2.2 安装 vue-resource
 Vue.use(VueResource)
 //Vue.http.options.root = 'http://vue.studyit.io';//全局配置根路径，在vue-resource后，顺序很重要
 // 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;其实等同于在headers中添加  'Content-Type': 'application/x-www-form-urlencoded'
//Vue支持全局的emulateJSON配置

import VuePreview from 'vue-preview'//vue-preview动态获取图片宽高    vue-preview缩略图插件
Vue.use(VuePreview)


import VueVideoPlayer from 'vue-video-player'//全局安装vue-video-player视频播放插件
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer)


// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件   
// import { Header, Swipe, SwipeItem, Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload);
 
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import router from './router.js'
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  router,//启动路由，等价于router: router,
  render: c => c(app),
  store
})
