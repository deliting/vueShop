<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            v-for="item in cates"
            :key="item.id"
            @tap="getPhotoListByCateId(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <router-link v-for="(item,index) in list" :key="index" :to="'/home/photoinfo/' + index" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>



<script>
import mui from "../../lib/mui/js/mui.min.js";
//mui(".mui-scroll-wrapper").scroll({
//  //mui是js组件，导入mui.js，调用MUI官网提供的scroll方法
//  deceleration: 0.0005
//}); //这句话不能放这里，应该放mounted(){}里面，因为刚进入页面不能滑动，要在页面刷新后才能滑动，但是之后切换其他tabbar就不行了,
//在App.vue改变tabbar栏标签类样式可以解决
export default {
  data() {
    return {
      cates: [], // 所有分类的列表数组
      list: [] // 图片列表的数组
    };
  },
  created() {
    this.getAllCategory();
    // 默认进入页面，就主动请求 所有图片列表的数据
    this.getPhotoListByCateId(0);
  },
  mounted() {
    // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
    // 2. 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      // 获取所有的图片分类
      this.$http.get("static/photoclass.json").then(result => {
        if (result.body.status === 0) {
          // 手动拼接出一个最完整的 分类列表
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId() {
      //(cateId)
      // 根据 分类Id，获取图片列表
      this.$http.get("static/photolist.json").then(result => {
        // + cateId
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y; //这是一个谷歌浏览器的权限问题
}
 .photo-list {
   list-style: none;
   margin: 0;
   padding: 10px;
   padding-bottom: 0;
   li {
     background-color: #ccc;
     text-align: center;
     margin-bottom: 10px;
     box-shadow: 0 0 9px #999;
     position: relative;
     img {
       width: 100%;
       vertical-align: middle;
     }
     img[lazy="loading"] {
       width: 40px;
       height: 300px;
       margin: auto;
     }
     .info {
       color: white;
       text-align: left;
       position: absolute;
       bottom: 0;
       background-color: rgba(0, 0, 0, 0.4);
       max-height: 84px;
       .info-title {
         font-size: 14px;
       }
       .info-body {
         font-size: 13px;
       }
     }
   }
 }
</style>