<!-- 公共头部 -->
<template>
  <div class="home">
    <div class="home-left">大型仪器设备平台购置系统</div>
    <div class="home-right">
      <div class="G-center">
        <i class="el-icon-s-fold home-icon" @click="onclickCollapse"></i>
        <i class="el-icon-s-home home-icon G-mgl-5" @click="goHome" title="首页"></i>
      </div>
      <!-- <div class="G-center">
        <div class="G-mgr-5">{{username}}</div>
        <div class="login-out" @click="loginOut">退出登录</div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "herder",
  props:{
    isCollapse:{
      type:Boolean,
      default: () => false
    }
  },
  data() {
    return {
      headerIsCollapse:false,
      username:''
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.username = this.$_.get('username')
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    onclickCollapse(){
      this.headerIsCollapse = !this.isCollapse
      this.$emit('onclickCollapse',this.headerIsCollapse)
    },
    goHome(){
      this.$router.push('/home')
    },
    loginOut(){
      this.$_.remove('infolist')
      this.$store.dispatch('changePermission', false)
      this.$router.push('/login')
    }
  },
};
</script>
<style scoped lang="scss">
@import './index.scss';
</style>