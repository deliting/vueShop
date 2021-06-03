<template>
  <div class="newslist">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(item,index) in newsList" :key="index">
        <router-link :to="'/home/newsinfo/'+index">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <!-- vue对图片地址进行拼接:src -->
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.id_time}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>

  <!-- 静态写html -->
  <!-- <div class="newslist">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media">
        <router-link to="/home/newsInfo">
          <img class="mui-media-object mui-pull-left" src="http://p1.pstatp.com/large/pgc-image/2ca41a499cd4462882f8420e9a980ea6">
          <div class="mui-media-body">
            <h1>华为起诉美国联邦通信委员会违反美国宪法</h1>
            <p class="mui-ellipsis">
              <span>发表时间：2019-12-5  09:00:00</span>
              <span>点击：0次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>-->
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      
      newsList: []
    };
  },
  mounted() {},
  created() {
    this.getnewslist();
  },
  methods: {
    getnewslist: function() {
   
      this.$http.get("static/newsList.json").then(
        res => {
           if (res.body.status === 0) {
                this.newsList = res.body.message;//newsList就是vue里面数组
              } else {
                Toast("获取失败！");
              }
          console.log(res)
        });
    }
  }
}


</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 16px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
