//导入vue-router包
import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
//HomeContainer.vue是组件，导入组件
import MemberContainer from './components/tabbar/MemberContainer.vue'

import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'

import SearchContainer from './components/tabbar/SearchContainer.vue'

import NewsList from './components/news/NewsList.vue'

import NewsInfo from './components/news/NewsInfo.vue'

import PhotoList from './components/photo/PhotoList.vue'

import PhotoInfo from './components/photo/PhotoInfo.vue'

import GoodsList from './components/goods/GoodsList.vue'

import GoodsInfo from './components/goods/GoodsInfo.vue'

import GoodsDesc from './components/goods/GoodsDesc.vue'

import GoodsComment from './components/goods/GoodsComment.vue'

import  ShopcarJiesuan from './components/subcomponents/ShopcarJiesuan.vue'

import Call from './components/subcomponents/Call.vue'

import SearchInfo from './components/subcomponents/SearchInfo.vue'

import LiuYan from './components/subcomponents/LiuYan.vue'

import Video from './components/subcomponents/Video.vue'
//创建路由对象
var router = new VueRouter({//vue-router的路由独享守卫
    routes: [//通过 routes 属性来定义路由匹配规则
        { path: '/', redirect: '/home' },//默认一进网页就是首页
        {path: '/home', component: HomeContainer},
        //对应<router-link class="mui-tab-item" to="/home">
        //它的 to 属性和 js 中配置的路径{ path: '/home', component: Home}  path 一一对应，从而找到了匹配的组件， 
        //最后把组件渲染到 <router-view> 标签所在的地方。所有的这些实现才是基于hash 实现的。
        //可以直接把to里面内容直接copy到path里面
        {path: '/member', component: MemberContainer},
        {path: '/shopcar', component: ShopcarContainer},
        {path: '/shopcar/jiesuan', component: ShopcarJiesuan},
        {path: '/search', component: SearchContainer},
        {path: '/home/newslist', component: NewsList},
        {path: '/home/newsinfo/:id', component: NewsInfo},//  这个/不能少
        {path: '/home/photolist', component: PhotoList},
        {path: '/home/photoinfo/:id', component: PhotoInfo},
        {path: '/home/goodslist', component: GoodsList},
        {path: '/home/goodsinfo/:id', component: GoodsInfo, name: "goodsinfo"},
        {path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' },
        {path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment'},
        {path: '/home/call', component: Call},
        {path: '/search/searchinfo1/:title', component: SearchInfo,name: 'searchinfo1'},
        {path: '/home/liuyan',component: LiuYan},
        {path: '/home/video',component: Video}
        
    ],
    linkActiveClass: 'mui-active'//覆盖默认的路由高亮的类，vue-router欲设置 链接激活时默认使用的 CSS 类名，用到linkActiveClass来配置。
})
export default router//暴露路由对象