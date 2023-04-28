<template>
  <div class="editor">
    <div style="height: 8%;">
      <van-nav-bar  >
      <template #left>
       <van-icon name="arrow-left" color="#000" @click="onClickLeft"/>
    <span style="margin-left: 10px;">密聊描述</span>
  </template>

</van-nav-bar>
    </div>
  <div class="z-chat_content content">
    <van-cell-group inset>
  <van-field
    v-model="message"
   
    autosize
  
    type="textarea"
    maxlength="200"
    placeholder="输入描述"
    show-word-limit
  />
</van-cell-group>
    <div class="btn">
      <van-button type="primary" block disabled	color="#41b883"
      size="small"
      >储存</van-button>
    </div>
  
  </div>
  </div>
</template>

<script setup>
import {} from "vue"
const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped>
.editor{
  height: 100%;
  .content{
    height: 92%;
  }
  .btn{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
