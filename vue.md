---
title:  用vue写一个完整的商城项目
date:   2020-4-28
tags: [vue,javascript ]
categories: [web前端开发 ]

---
[TOC]

# 一、首页header、tabbar区域

## 1、header（顶部导航栏）区域用的是mint-ui中的Header组件

main.js中引入

```javascript
import { Header} from 'mint-ui'
Vue.component(Header.name, Header)
```

App.vue中写

```javascript
<mt-header fixed title="我的Vue项目">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>   
      </span>     
</mt-header>
```

## 2、tabbar区域引用的是ui组件mui中的案例tabbar.html，拷贝到App.vue

代码：

```jade
<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge">{{ $store.getters.getAllCount }}</span>
				</span>
				<span class="mui-tab-label" id="badge">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
```

tabbar区域包括首页、会员、购物车、搜索

购物车小图标引用了mui中的案例icons-extra.html

```javascript
class="mui-icon mui-icon-extra mui-icon-extra-cart"
```

拷贝扩展图标的css样式到我们的项目中

```javascript
icons-extra.css
mui.css
mui.min.css
```

拷贝字体库ttf文件到我们的项目中

```javascript
mui-icons-extra.ttf
mui.ttf
```

我把他们都放到了lib\mui文件夹里面，去mui官网的github下载



另外改造tabbar区域为`<router-link> ` 组件:

1、main.js里面导入VueRouter

```javascript
import VueRouter from 'vue-router'//配置路由
Vue.use(VueRouter)
```

2、原来的 `<a href="..."> `变成`<router-link to="...">`，to就是定义点击之后，要到哪里去

3、在router.js中引入路由组件

```javascript
import VueRouter from 'vue-router'
	// 导入对应的路由组件
	import HomeContainer from '../components/tabbar/HomeContainer.vue'
	import MemberContainer from '../components/tabbar/MemberContainer.vue'
	import ShopcarContainer from '../components/tabbar/ShopcarContainer.vue'
	import SearchContainer from '../components/tabbar/SearchContainer.vue'
	//创建路由对象
	var router = new VueRouter({
	  routes: [// 配置路由规则
	    { path: '/', redirect: '/home' },//默认一进网页就是首页
	    { path: '/home', component: HomeContainer },
	    { path: '/member', component: MemberContainer },
	    { path: '/shopcar', component: ShopcarContainer },
	    { path: '/search', component: SearchContainer }
	  ],
	  linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类
	})
	//mui-active原本在首页标签的class里面
	export default router//暴露路由对象
```

`<router-link to="...">`的 to 属性和 routes中的路径{ path: '/home'}一一对应，从而找到了匹配的组件， 可以直接把to里面内容直接copy到path里面,最后把组件渲染到 `<router-view> `标签所在的地方。所有的这些实现才是基于hash 实现的。

# 二、在中间区域放置一个router-view来展示路由匹配的组件

App.vue中加入代码:

```javascript
<transition>
		  <router-view></router-view>
</transition>

```

transition表示组件切换时的动画效果

App.vue中设置类

```javascript
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

```

## 1、轮播图区域

单独建立一个swiper.vue组件，方便下次其他组件需要调用时，直接导入这个组件

代码：

```javascript
<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.src" :class="{'full': isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

```

在组件中，使用v-for循环的话，一定要使用 key 
首页里面写入代码：

```javascript
<template>
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
</template>
<script>
        export default {
  data() {
    return {
      lunbotuList: [] // 保存轮播图的数组
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      // 获取轮播图数据的方法
      this.$http.get("static/lunbotulist.json").then(result => {
        // console.log(result.body);
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

```

注意：在需要用到Toast的地方都要在`<script>`里面，export default前面加上这一串代码，后面不再重复

```javascript
import { Toast } from "mint-ui";

```

轮播图样式设置高度

获取数据要用vue-resource

安装

```javascript
npm i vue vue-resource --save-dev

```

在入口文件main.js中配置

```javascript
import VueResource from 'vue-resource'
Vue.use(VueResource)

```

get请求：

```javascript
this.$http.get(地址).then(res => {
        console.log(res)
        // 响应成功回调
    })  

```

## 2、六宫格区域

拷贝mui中的九宫格案例 grid-default.html，将九宫格改成六宫格

# 三、新闻资讯

## 1、改造新闻资讯的路由链接

- 将a标签改为router-link，href改为to，to=‘home/newslist’
- 在router.js导入对应的路由组件
- 创建新闻资讯列表的组件页面NewsList.vue

## 2、新闻资讯列表页面

- 使用mui中的midia-list.html绘制界面

- 使用vue-resource获取数据，this.$http.get

- 渲染真实数据，其中给时间定义一个全局过滤器

  安装

  ```javascript
  npm install moment --save
  
  ```

   在main.js中导入格式化时间的插件

  ```javascript
   import moment from 'moment'
  
  ```

  在main.js定义全局过滤器,，格式化时间

  ```javascript
  Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
  })
  
  ```

  filter两个参数 第一个是函数名 ，第二个是时间格式化处理的函数

  

  在需要格式化时间的地方使用插值表达式

  ```javascript
  发表时间：{{ item.id_time|  dateformat('YYYY-MM-DD HH:mm:ss') }}
  
  
  ```

## 3、点击新闻资讯列表跳转到新闻详情

- 把列表中的每一项改造为 router-link,同时在跳转的时候应该提供唯一的index标识符

  ```javascript
  :to="'/home/newsinfo/'+index"
   
  ```

- 创建新闻详情的组件页面NewsInfo.vue

- 在router.js导入对应的路由组件

## 4、新闻详情页面

- 先单独封装一个评论子组件comment.vue

- 在NewsInfo.vue里面导入评论子组件

  ```javascript
  import comment from "../subcomponents/comment.vue";
  
  
  ```

- 在父组件NewsInfo.vue里面使用`components`属性将comment组件注册为自己的子组件

```javascript
<script>
// 1. 导入 评论子组件
import comment from "../subcomponents/comment.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id,
      // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
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


```

- 将注册子组件时候的注册名称以标签形式在页面中引用即可，父组件向子组件传值

```javascript
父组件：<comment-box :id="this.id"></comment-box> 
子组件：props: ['id']


```

## 5、发表评论、加载更多评论

获取评论、加载更多评论都用到了mint-ui中的Button组件

main.js中引入

```javascript
import { Button } from 'mint-ui';

Vue.component(Button.name, Button);


```

comment.vue中渲染

```javascript
<mt-button type="primary" size="large" @click="postComment">发表评论
</mt-button> 
type改变颜色---default（默认值）, primary（蓝色）, danger（红色）
size改变大小---normal（默认值）,small（小）,large（大）
plain---幽灵按钮


```

- 发表评论

把文本框做双向数据绑定 v-model='msg'
为发表按钮绑定一个事件 @click="postComment"
校验评论内容是否为空，如果为空则 Toast 提示用户
通过vue-resource发送一个请求，把评论内容提交给服务器并保存，this.$http.post
当发表评论完成后，重新刷新列表，以查看最近的评论，如果调用getComments方法重新刷新评论列表的话，可能只能得到 最后一页的评论，前几页的评论获取不到，所以要用postComment

```javascript
postComment() {
      // 校验是否为空内容
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空！");
      }

      this.$http
        .get("static/comment2.json", {// + this.$route.params.id
          content: this.msg.trim()
        })
        .then(function(result) {
          if (result.body.status === 0) {
            // 1. 拼接出一个评论对象
            var cmt = {
              user_name: "匿名用户",
              id_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);//数组开头添加数据
            this.msg = "";
          }
          console.log(result)         
        });       
    }
  }


```

当评论成功后，在客户端手动拼接出一个最新的评论对象，然后调用数组的unshift方法，把最新的评论追加到date中comments的开头；这样就能完美实现刷新评论列表的需求

- 加载更多评论

为加载更多按钮绑定点击事件 @click="getMore"

点击加载更多，让pageIndex++，然后重新调用this.getComments()方法，重新获取最新一页的数据，为了防止新数据覆盖老数据的情况，点击加载更多的时候，每当获取到新数据，应该让老数据调用数组concat方法，拼接新数组

```javascript
 methods: {
    getComments() {
      // 获取评论
      this.$http
        .get("static/comment.json")// + this.id + "?pageindex=" + this.pageIndex
        .then(result => {
          if (result.body.status === 0) {
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("获取评论失败！");
          }
        });
    },
    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getComments();
    }
 }


```

# 四、图片分享

## 1、改造图片分享的路由链接

- 将a标签改为router-link，href改为to，to="/home/photolist"
- 在router.js导入对应的路由组件
- 创建图片分享列表的组件页面PhotoList.vue

## 2、图片分享列表页面

- 制作顶部滑动条

使用mui的tab-top-webview-main.html

把 slider 区域的 mui-fullscreen 类去掉

滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，导入mui.js，mui是js组件

```javascript
import mui from "../../lib/mui/js/mui.min.js";

```

若使用区域滚动组件，需手动初始化scroll控件，如果要初始化滑动条，必须要等DOM元素加载完毕，所以把初始化滑动条的代码，搬到了mounted生命周期函数中

```javascript
export default {
    mounted() {
    // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
    // 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
}

```

此时控制台报错： `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`

mui.js 中用到了’caller’,‘callee’,and’arguments’,但是webpack打包好的bundle.js 中，默认是启用严格模式的，所以这两者冲突了

解决办法：禁用webpack打包时候的严格模式

安装：

```javascript
cnpm i babel-plugin-transform-remove-strict-mode -D

```

配置：

在.babelrc文件中配置

```javascript
{
   "presets": ["env","stage-0"],
   "plugins": ["transform-runtime",["component", 
      {
        "libraryName": "mint-ui",
        "style": true
      }
    ], "transform-remove-strict-mode"]
}

```

当滑动条调试OK后，发现tabbar无法正常工作了，这时需要把每个tabbar按钮的样式中`mui-tab-item`重新改一下名字,改成 `mui-tab-item-llb`



## 3、懒加载技术

懒加载其实就是延时加载，即当对象需要用到的时候再去加载。

- main.js中导入

```javascript
import { Lazyload } from 'mint-ui';

Vue.use(Lazyload);

```

- 渲染

```javascript
<ul class="photo-list">
      <router-link v-for="(item,index) in list" :key="index" :to="'/home/photoinfo/' + index" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>

```

- css样式

```javascript
 img[lazy="loading"] {
       width: 40px;
       height: 300px;
       margin: auto;
     }

```

## 4、点击图片列表跳转到图片详情

- 将a标签改为router-link，href改为to，  :to="'/home/photoinfo/' + index
- 在router.js导入对应的路由组件
- 创建图片详情页面PhotoInfo.vue

## 5、图片详情页面（缩略图）

　Vue-preview是一个非常好用的移动端图片预览的组件，支持滑动换图，支持手势缩放，点击小图可以预览放大效果.。

- 安装

```javascript
npm i vue-preview -S

```

- 在main.js中导入

```javascript
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

```

- 渲染

```javascript
 <div class="thumbs">   
      <vue-preview :slides="list" @close="handleClose"></vue-preview>    
 </div>

```

```javascript
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
    handleClose () {  //加上这个方法
                console.log('close event')
            }
  }

```

```javascript
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

```

当你不想写全局样式,想写scoped局部样式不污染全局,又想更改子组件内的样式,此时就可以用/deep/深度作用选择器.

# 五、商品购买

## 1、改造商品购买的路由链接

- 将a标签改为router-link，href改为to，to="/home/goodslist"
- 在router.js导入对应的路由组件
- 创建图片分享列表的组件页面GoodsList.vue

## 2、商品列表页面

```javascript
<mt-button type="danger" size="large" plain @click="getMore">加载更多
</mt-button>

```

```javascript
getGoodsList() {
      this.$http.get("static/gooslist.json").then(result => {
        // + this.pageindex
        if (result.body.status === 0) {
          //this.goodslist = result.body.message;
          this.goodslist = this.goodslist.concat(result.body.message);
        }
      });
    },
    getMore() {
      this.pageIndex++;
      this.getGoodsList();
    }

```

## 3、点击商品列表跳转到商品详情

编程式导航：

```javascript
@click="goDetail(item.id)

```

```javascript
goDetail(id) {
      console.log(this);
      //传递命名的路由 
     this.$router.push({ name: "goodsinfo", params: { id } });
    }

```

1. push字符串

```javascript
this.$router.push("/home/goodsinfo/");

```

2. push 对象

```javascript
this.$router.push({ path: "/home/goodsinfo/" + id });

```

| **声明式导航**          | 编程式导航       |
| ----------------------- | ---------------- |
| <router-link :to="..."> | router.push(...) |

| this.$route      | this.$router              |
| ---------------- | ------------------------- |
| 路由【参数对象】 | 路由【导航对象】          |
| params, query    | this.$router.go（-1）后退 |
|                  | this.$router.push         |

## 4、商品详情页面

- 引用mui的card.html

```javascript
<p>购买数量<numbox  @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>

```

绑定了 max 属性,将goodsinfo.stock_quantity的值传递给子组件

- 加入购物车

GoodsInfo.vue里面代码：

```javascript
@click="addToShopCar"

 addToShopCar() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag;
      // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
      // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      //console.log(goodsinfo)//这个id从0开始，价格数量都对应
      // 调用 store 中的 mutations 来将商品加入购物车
      this.$store.commit("addToCar", goodsinfo);
    }

```

main.js里面代码：

```javascript
  mutations: { 
  addToCar(state, goodsinfo) {
    var flag = false
    state.car.some(item => {
      if (item.id == goodsinfo.id) {
        item.count += parseInt(goodsinfo.count)
        flag = true
        return true//终止some循环
      }
    })
    if (!flag) {
     state.car.push(goodsinfo)
    }
    localStorage.setItem('car', JSON.stringify(state.car))
   
  }

```

- 小球动画

```javascript
 <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

 enter(el, done) {
      el.offsetWidth;
      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";//贝塞尔曲线,从开始到结束的不同速度过渡效果
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    }

```

- **vuex**

```shell
npm i vuex -s

```

main.js里面

挂载vuex

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

```

创建vuex对象

```javascript
var store = new Vuex.Store({

  state:{//数据源,就是组件里面的data
  },

  getters: {//包含多个计算属性

  },

  actions: {  

  },

  mutations: {

  }

}
                           }）

```

将store挂载到当前项目的Vue实例当中去

```javascript
var vm = new Vue({
  el: '#app',
  router,
  store
 
})

```

在需要用到的地方$store.state

$store.commit

$store.getters



- 加入购物车，拿到选择的数量

GoodsInfo.vue里面代码：

```javascript
<p>购买数量：<numbox  @getcount="getSelectedCount":max="goodsinfo.stock_quantity"></numbox></p>
    
    getSelectedCount(count) {
            this.selectedCount = count;
        }

```

goodsinfo_number.vue里面代码：

```javascript
countChanged() {
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
    }

```

## 5、使用编程式导航实现图文介绍和商品评论跳转

```javascript
 <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>

  goDesc(id) {
      // 点击使用编程式导航跳转到 图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      // 点击跳转到 评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    }


```

# 六、视频专区

## 1、改造视频专区的路由链接

- 将a标签改为router-link，href改为to，to="/home/video"
- 在router.js导入对应的路由组件
- 创建视频的组件页面video.vue

## 2、视频页面

video-player标签

main.js里面导入

```javascript
import VueVideoPlayer from 'vue-video-player'//全局安装vue-video-player视频播放插件
import 'video.js/dist/video-js.css'
Vue.use(VueVideoPlayer)

```

video.vue里面代码：

```javascript
<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
    data() {
        return {
            playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          src: 'http://loveyx815.cn/dist/MV_Jay_New.mp4',  // 路径
          type: 'video/mp4'  // 类型
        }],
        // , {
        //   src: '//path/to/video.webm',
        //   type: 'video/webm'
        // }
        //poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
    }
        }
    },
  components: {
    videoPlayer
  }
}
</script>

```

# 七、联系我们

客服随机回复
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200428210212479.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Njc2NTYzMA==,size_16,color_FFFFFF,t_70)

实现代码：

```javascript
<template>
  <div id="container">
    <div class="header">
      <span style="float: left;">在线客服【迪丽热巴】</span>
    </div>

    <ul class="content"></ul>

    <div class="footer">
      <input id="text" type="text" placeholder="说点什么吧..." />
      <span id="btn" @click="btnclick">发送</span>
    </div>
  </div>
</template>
<script>


export default {
  data() {
    return {
      img: document.getElementById("icon"),
      arr: [
        "https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=2680453416,1570907118&fm=74&app=80&f=JPEG&size=f121,140?sec=1880279984&t=a5f4ada437074dfca35c1b50e40649b9",
        "https://dss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=733717429,363003047&fm=74&app=80&f=JPEG&size=f121,140?sec=1880279984&t=e781cf317a6ac72636fe1430c476d8aa"
      ],
      tag: 1,
      btn: document.getElementById("btn"),
      num: -1, //统计聊天记录
      messageList: []
    };
  },
  methods: {
    imgclick() {
      // 根据当前显示的图片切换用户图片。
      if (this.tag == 0) {
        document.getElementById("icon").src = this.arr[1];
        this.tag = 1;
        //console.log(document.getElementById("icon").src);
      } else {
        // document.getElementById("icon").attributes("src",this.arr[0]) ;
        document.getElementById("icon").src = this.arr[0];
        this.tag = 0;
      }
      console.log("tag" + this.tag);
    },

    btnclick() {
      // 判断用户内容是否为空
      var text = document.getElementById("text").value;
      if (text == "") {
        return//alert("聊天内容不能为空");
      } else {
        // 把用户内容添加到区域区域
        var content = document.getElementsByTagName("ul")[0];
        content.innerHTML +=
          "<li><img src='" +
          this.arr[this.tag] +
          "'/><span>" +
          text +
          "</span></li>";
      }

      var imgs = content.getElementsByTagName("img");
      var span = content.getElementsByTagName("span");
      this.num++;
      console.log(imgs[this.num]);
      console.log(span[this.num]);
      console.log(this.num);
      // 判断当前聊天的用户，0是机器人，1是用户
      if (this.tag == 0) {
        imgs[this.num].className = "imgleft";
        span[this.num].className = "spanleft";
      } else {
        imgs[this.num].className = "imgright";
        span[this.num].className = "spanright";
      }
      //清空聊天内容
      document.getElementById("text").value = "";

      if (this.tag == 1) {
        // this.$options.methods.chat();

        var text = document.getElementById("text").value;
        this.$http.get("static/messagelist.json").then(result => {
          if (result.body.status === 0) {
            text = result.body.message[Math.ceil((Math.random(0.8)*10)%5)].text; //有几条消息就%几，把本地json中的机器人回复信息给text   (Math.random(0.8)*10)%5
            console.log(text);
            var content = document.getElementsByTagName("ul")[0];
            content.innerHTML +=
              "<li><img src='" +
              this.arr[0] +
              "'/><span>" +
              text +
              "</span></li>";

            var imgs = content.getElementsByTagName("img");
            var span = content.getElementsByTagName("span");
            this.num++;
            console.log(imgs[this.num]);
            console.log(span[this.num]);
            console.log(this.num);
            // 当前聊天的用户，0是机器人

            imgs[this.num].className = "imgleft";
            span[this.num].className = "spanleft";

            //清空聊天内容
            document.getElementById("text").value = "";
          }
        });
        // 把用户内容添加到区域区域
      }
    },
    // 点击发送时候发送信息,机器人自动回复
    chat() {
      var text = document.getElementById("text").value;
      this.$http.get("static/messagelist.json").then(result => {
        if (result.body.status === 0) {
          text = result.body.message[0].text; 
        }
      });
      // 把用户内容添加到区域区域
      var content = document.getElementsByTagName("ul")[0];
      content.innerHTML +=
        "<li><img src='" + this.arr[0] + "'/><span>" + text + "</span></li>";

      var imgs = content.getElementsByTagName("img");
      var span = content.getElementsByTagName("span");
      this.num++;
      console.log(imgs[this.num]);
      console.log(span[this.num]);
      console.log(this.num);
      // 当前聊天的用户，0是机器人

      imgs[this.num].className = "imgleft";
      span[this.num].className = "spanleft";

      //清空聊天内容
      document.getElementById("text").value = "";

      //   this.messageList.push({
      //     message: this.inputValue,
      //     //这个是判断当前是否是自己输入的内容,自己的是true,机器人的是false
      //     myself: true
      //   });
    }
  }
};
</script>
<style lang="scss">
* {
		 padding: 0;
			list-style: none;
			font-family: '微软雅黑'
		}

		#container {
     
			 width: 375px;
      height:600px;   
			background: #eee;
			margin: 0 auto;
			position: relative;
			
		}

		.header {
      width: 100%;
      position: absolute;
			background: #000;
			height: 34px;
			color: #fff;
			height: 40px;
			line-height: 40px;
			font-size: 20px;
			padding: 0 10px;
		}

    .content {
      width: 100%;
       position: absolute;
			font-size: 20px;
		max-height: 600px;
    
    
			overflow: auto;
		padding: 5px;
		}

		.content li {
			margin-top: 10px;
			padding-left:5px;
      padding-right: 5px;
			width: 100%;
			display: block;
			clear: both;
			overflow: hidden;
		}

	.content li img {
		float: left;
     width: 40px;
		
			border-radius: 8px;
	}

		.content li span {
			background: #7cfc00;
			padding: 10px;
			border-radius: 10px;
			float: left;
		
			border: 1px solid #ccc;
			box-shadow: 0 0 3px #ccc;
		}

		.content li img.imgleft {
			float: left;
		}

		.content li img.imgright {
			float: right;
		}

		.content li span.spanleft {
			float: left;
			background: #fff;
		}

		.content li span.spanright {
			float: right;
			background: #7cfc00;
		}
		.footer {
			 width: 100%;
			  height:38px;
			
			position: absolute;
			bottom: 0px;
     
		}

		.footer input {//输入框
    width: 90%;
			display: inline-block;
			outline: none;
			font-size: 16px;
			text-indent: 10px;
		
			border-radius: 6px;
			
		}

		.footer span {//发送按钮
    width: 10%;
			display: inline-block;
			
			background: #ccc;
			font-weight: 900;
			line-height: 40px;
			cursor: pointer;
			text-align: center;
			position: absolute;
			right: 2px;
		
			border-radius: 6px;
		}

		.footer span:hover {
			color: #777;
			background: #ddd;
		}			
</style>

```



# 八、会员注册

- 引用mint-ui中的组件`mt-field`
- message box（弹出消息框）

```javascript
import { MessageBox } from 'mint-ui';
MessageBox('提示', '用户名或密码不能为空');

```

# 九、搜索区域

- 引用了mui的搜索框
- vue监听键盘回车事件，以及编程式导航

```javascript
@keyup.13="enterSearch"

```

```javascript
methods: {
      enterSearch() {
          var title=document.getElementById("serach").value;
           this.$router.push({ name: "searchinfo1", params: {title} })       
      }
  }

```

- router.js

```javascript
{path: '/search/searchinfo1/:title', component:SearchInfo,name:'searchinfo1'}

```

- SearchInfo.vue

```javascript
export default {
  data() {
    return {
        
    searchtitle:this.$route.params.title
      
    };
  }

```