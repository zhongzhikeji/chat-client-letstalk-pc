<template>
  <div class="keepRecords">
    <div style="height: 8%;">
      <van-nav-bar  >
      <template #left>
       <van-icon name="arrow-left" color="#000" @click="onClickLeft"/>
    <span style="margin-left: 10px;">聊天记录保存时间</span>
  </template>
  <template #right>
    <span>完成</span>
  </template>
</van-nav-bar>
    </div>
  <div class="z-chat_content content">
    <div class="group">
      <van-radio-group v-model="checked">
  <van-radio name="1" shape="square" checked-color="#41b883">永久</van-radio>
  <van-radio name="2" shape="square" checked-color="#41b883">30 分钟</van-radio>
  <van-radio name="3" shape="square" checked-color="#41b883">12 小时</van-radio>
  <van-radio name="4" shape="square" checked-color="#41b883">1 天</van-radio>
  <van-radio name="5" shape="square" checked-color="#41b883">3 天</van-radio>
  <van-radio name="6" shape="square" checked-color="#41b883">1 周</van-radio>
  <van-radio name="7" shape="square" checked-color="#41b883">15 天</van-radio>
  <van-radio name="8" shape="square" checked-color="#41b883">30 天</van-radio>
</van-radio-group>
    </div>
 
  
  </div>
  </div>
</template>

<script setup>
import {ref} from "vue"
const checked = ref('1');
const onClickLeft = () => history.back();
</script>

<style lang="scss" scoped>
.keepRecords{
  height: 100%;
  .van-radio{
   margin: 20px 10px;
  }
  .content{
    height: 92%;
    .group{
      margin: 40px 0 0 30px;
    }
  }
  .btn{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
