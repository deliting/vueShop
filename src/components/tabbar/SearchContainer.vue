<template>
  <div>
 <div class="mui-input-row mui-search">
    <input type="search" id="serach" class="mui-input-clear" placeholder="搜索" @keyup.13="enterSearch">
</div>
<div class="remen">
    <h3>推荐搜索</h3>
    <div class="mui-row">
      <mt-badge size="small" color="#aaa">小米（Mi）小米Note 16G双网通版</mt-badge>
    </div>
    <div class="mui-row">
      <mt-badge size="small" color="#aaa">双面呢大衣做最美的穿搭</mt-badge>
    </div>
    <div class="mui-row">
      <mt-badge size="small" color="#aaa">正宗浙江海宁皮草</mt-badge>
    </div>
    <div class="mui-row">
      <mt-badge size="small" color="#aaa">富士D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）</mt-badge>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    };
  },
  methods: {
      enterSearch() {
          var title=document.getElementById("serach").value;
           this.$router.push({ name: "searchinfo1", params: {title} });
          
      }
  }
};
</script>

<style lang="scss" scoped>
.remen h3{
    color: #aaa
}

</style>