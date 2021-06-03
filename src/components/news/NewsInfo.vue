<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <!-- <h1>hahaha------{{$route.params.id}}</h1>  -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.id_time}}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>
    <hr/>
    
    <!-- 内容区域 -->
    <img class="mui-media-object mui-pull-left" :src="newsinfo.img_url" />
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论子组件区域 -->
    <comment-box :id="this.id"></comment-box> 
    <!-- <comment-box></comment-box>  -->
  </div>
</template>

<script>
// 1. 导入 评论子组件
import comment from "../subcomponents/comment.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id, // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
      newsinfo: {} // 新闻对象
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      
      this.$http.get("static/newsInfo.json" ).then(res => {
         if (res.body.status === 0) {
           this.newsinfo = res.body.message[this.id];
         } else {
           Toast("获取新闻失败！");
         }
        console.log(res)
      });
    }
  },
   components: {
     // 用来注册子组件的节点
     "comment-box": comment
   }
};
</script>

<style lang="scss">
 .newsinfo-container {
   
   padding: 0 4px;
   .title {
     font-size: 16px;
     text-align: center;
     margin: 15px 0;
     color: red;
   }
   .subtitle {
     font-size: 13px;
     color: #226aff;
     display: flex;
     justify-content: space-between;
   }
    .mui-pull-left{  
     
       width: 100%;
     
   }
   .content {
     max-width: 375px;
      
        
       
     position: relative;
   }
}
</style>

