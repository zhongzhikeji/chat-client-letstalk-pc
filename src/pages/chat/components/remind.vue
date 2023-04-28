<template>
  <div class="editor">
    <div class="content" >
      <van-icon name="arrow-left" color="#fff" @click="onClickLeft"/>
    <span style="margin-left: 15px;color: #fff;font-size: 16px;">通知</span>
    </div>
  <div class="z-chat_content content">
  
  
  </div> 
  </div>
</template>

<script setup>
import {} from "vue"
const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped>
.editor{
  background-image: url("@/assets/image/bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  .content{
    padding: 60px 18px 60px 60px;
  }
  .btn{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
