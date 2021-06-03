<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item,index) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!-- 开关 事件只能使用change，不能使用click。-->
            <!-- $store.getters.getGoodsSelected使用数据 -->
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <!-- 图片 -->
            <img :src="item.img_url" />
            <!-- 右边标题，售价，数字框，删除 -->
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 } -->
                <a href="#" @click.prevent="remove(item.id,index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件， 总价
              <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span>
            </p>
          </div>
         <mt-button type="danger" @click="payMoney">去结算</mt-button>
        </div>
      </div>
    </div>

    <p>{{ $store.getters.getGoodsSelected }}</p> 
    
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";
 
export default {
  data() {
    return {
      goodslist: [] ,// 购物车中所有商品的数据    
      id: this.$route.params.id,
     
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
      var idArr = [];//数组下标0-3,id  1-4
      this.$store.state.car.forEach(item => idArr.push(item.id));
     
      // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
      if (idArr.length <= 0) {
        return;
      }
      // 获取购物车商品列表（本质上是拿最新的本地存储的购物车信息state.car）
      this.$http
        .get("static/shopcarlist.json" ) // + idArr.join(",")
        .then(result => {
          if (result.body.status === 0) {
             this.goodslist = result.body.message;//先过去购物车json中所有商品信息（这些是不包含实时的购买件数和开关选择情况，需要后面动态加入）
            console.log("goodlist")
             console.log(this. goodslist)//这个和goodslist.json一致
            console.log("carlist")
            console.log(this.$store.state.car)

            var carlist=this.$store.state.car;//取出本地加入购物车的列表，属性有 （id,count,price,selected）
            var newgoodslist=[];//新的商品列表数组
            //遍历循环carlist和 goodslist
            for(var i=0;i<carlist.length;i++){
              var object={};//存放新的实时单个商品信息对象，属性有（id,count,selected,img_url,title）
              for(var j=0;j<this.goodslist.length;j++){
                if(carlist[i].id===this.goodslist[j].id){ //如果购物车取出来的id和json里的id一样，就把购物车里的count、selected属性给goodslist
                  // this.goodslist[j].count=carlist[i].count;
                  // this.goodslist[j].selected=carlist[i].selected;
                  object.count=carlist[i].count;
                  object.selected=true;
                  object.img_url=this.goodslist[j].img_url;
                  object.title=this.goodslist[j].title;
                  object.id=carlist[i].id;
                  object.sell_price=this.goodslist[j].sell_price;
                  newgoodslist.push(object);
                  break;//如果一条实时购物车商品在json文件中找到一条匹配上的话，就跳出对本地json数据的循环，继续寻找下一条的实时购物车商品
                }
                
              }
            }
            this.goodslist=newgoodslist;//把最新实时的购物车数组给goodslist对象，这样页面展示的就是实时购物的商品信息
            
            console.log("重新封装的goodlist")
             console.log(this. goodslist)

           }
         
        });
    },
    remove(id, index) {
      // 点击删除，把商品从 store 中根据 传递的 Id 删除，同时，把 当前组件中的 goodslist 中，对应要删除的那个商品，使用 index 来删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar",id);//this.$store.commit存储数据
    },
    // 每当点击开关，把最新的 快关状态，同步到 store 中
    selectedChanged(id,val) {  
      console.log(id + " --- " + val);
      this.$store.commit("updateGoodsSelected", { id, selected: val });
     
  },
  payMoney() {//按钮绑定函数，函数跳转到另一个页面
    
      this.$router.push('/shopcar/jiesuan')
   
  }

  },
  components: {
    numbox
  }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;//这2句表示弹性盒子垂直居中显示  元素位于容器的中心。弹性盒子元素在该行的侧轴（纵轴）上居中放置
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
     
    text-overflow: ellipsis;//以省略号展现超出部分。
    white-space: nowrap;//文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
      // display: flex;
      // flex-direction: column;//主轴为垂直方向，起点在上沿。
      // justify-content: space-between;//两端对齐，项目之间的间隔都相等
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
    
    
  }
}
</style>
