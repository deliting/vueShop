<template>
<div>
 <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>

<mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
<mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>


<mt-button type="primary" @click="memberSubmit" plain>会员注册</mt-button>



  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      username: '',
      email:'',
      password:'',
      birthday:''
    }
  },
  methods: {
    memberSubmit(){
      if(this.username=='' || this.password==''){
        MessageBox('提示', '用户名或密码不能为空');
        return true;//终止当前
      }
     // if(this.username=="^[a-zA-Z][a-zA-Z0-9]{4,15}$")//字母开头，数字和字母组成，允许5-16字节   错了bug
     if(!this.username.match("^[a-zA-Z][a-zA-Z0-9]{4,15}$"))//match匹配正则专用
     {
        MessageBox('用户名字母开头，数字和字母组成');
      return true;//终止当前
     }
     if(!this.password.match(/\d{6}/))
     {
        MessageBox('密码由6位数字组成');
      return true;
     }
     
 
   this.$router.push('/home');
   },
 

  }
}

</script>

<style lang="scss" scoped>

</style>
