<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.id_time}}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>

    <hr />

    <!-- 缩略图区域  img的Class属性不能去    -->
     <div class="thumbs">   
      <vue-preview :slides="list" @close="handleClose"></vue-preview>    
    </div>
      
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置一个现成的 评论子组件  :id="id" -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
// 1. 导入评论子组件
import comment from "../subcomponents/comment.vue";
import { Toast } from 'mint-ui';

export default {
  data() {
    return {
      id: this.$route.params.id, // 从路由中获取到的 图片Id,今后直接this.id就可以
      photoinfo: {}, // 图片详情
      list: [] // 缩略图的数组    //list为你数据储存的地方
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      // 获取图片的详情
      this.$http.get("static/photoinfo.json").then(result => {
        // + this.id
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[this.id];
        }
      });
    },
    getThumbs() {
      // 获取缩略图
      this.$http
        .get("static/suoluetu.json")
        .then(result => {
          // + this.id
          
          if (result.body.status === 0) {
            // 循环每个图片数据，补全图片的宽和高
            result.body.message.forEach(item => {
              item.w = 600;
              item.h = 400;
              item.msrc =  result.body.message[this.id].src;//item.msrc = item.src     
            });
            // 把完整的数据保存到 list 中
            this.list = result.body.message;
            console.log(this.list);
           
          }
        })
        .catch(error => {//捕捉错误
          console.log(error);
          Toast({
            message: "获取缩略图图片失败..."
          });
        });
    },
    handleClose () {  //加上这个方法 点击x号
                console.log('close event')
            }
  },
  components: {
    // 注册 评论子组件
    "cmt-box": comment
  }
};
</script>

<style lang="scss">
.photoinfo-container {
  padding: 3px;
  h3 {
    color:#000;
    font-size: 15px;
    
    margin: 15px 0;
  }
  .subtitle {
    color: #226aff;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
   // max-width: 375px;
    position: relative;
  }

 
     .thumbs {
     /deep/ .my-gallery {//deep深层作用选择器
       display: flex;
       flex-wrap: wrap;//让弹性盒元素在必要的时候拆行：
       figure {
         width: 30%;
         margin: 5px;
         img {
           width: 100%;
           box-shadow: 0 0 8px #999;
         }
       }
     }
   }
}
</style>

