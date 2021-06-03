<template>
  <div>

    <!-- 轮播图区域 -->
    <!-- 在组件中，使用v-for循环的话，一定要使用 key     遍历轮播图-->
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>  -->
      
    <!-- 轮播图区域 -->
     <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>


    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item">
        <img :src="item" alt="">
      </mt-swipe-item>
    </mt-swipe> -->
    
<!-- 九宫格 到 6宫格 的改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-6">
      <!-- 点击新闻，跳到另一个界面，所以新闻资讯这个链接要改为router-link to什么什么，to后面跟的是跳到的组件界面，又要新建组件 -->
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
		                    <img src="../../images/menu1.png" alt="">
              <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <img src="../../images/menu2.png" alt="">
              <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                    <img src="../../images/menu3.png" alt="">
              <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/liuyan">
		                    <img src="../../images/menu4.png" alt="">
              <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/video">
		                    <img src="../../images/menu5.png" alt="">
              <div class="mui-media-body">视频专区</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/call">
		                    <img src="../../images/menu6.png" alt="">
              <div class="mui-media-body">联系我们</div></router-link></li>

                
		           
		</ul>
   
  </div>
</template>

<script>
import { Toast } from "mint-ui";//引入整个mint-ui 再单独引用Toast组件
import swiper from "../subcomponents/swiper.vue";

export default {
  data() {
    return {
      lunbotuList: [] // 保存轮播图的数组
    };
  },
  created() {//实例之后 模板渲染成html之前使用
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      // 获取轮播图数据的方法
      this.$http.get("static/lunbotulist.json").then(result => {
         console.log(result.body);//result.body就是lunbotulist.json的所有内容
        if (result.body.status === 0) {
          // 成功了
          this.lunbotuList = result.body.message;
        } else {
          // 失败的
          Toast("加载轮播图失败。。。");
        }
      });
    }
  },
  components: {
    swiper
  }
};
</script>

<style lang="scss" scoped>
 .mint-swipe {
   height: 200px;//没有这个高度，轮播图区域没有

//   .mint-swipe-item {//嵌套
//     &:nth-child(1) {//交集选择器
//       background-color: pink;
//     }
//     &:nth-child(2) {
//       background-color: green;
//     }
//     &:nth-child(3) {
//       background-color: cyan;
//     }

img {
 width: 100%;
  height: 100%;
}

  }
 

 .mui-grid-view.mui-grid-6 {
   background-color: #fff;
   border: none;
   
  img {
    width: 60px;
    height: 60px;
   
  }

   .mui-media-body{
     font-size: 13px;
   }
 }

 .mui-grid-view.mui-grid-6 .mui-table-view-cell {
   border: 0;

 }
</style>
