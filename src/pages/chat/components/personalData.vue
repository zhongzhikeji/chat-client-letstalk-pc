<template>
  <div class="personalData">
    <div style="height: 8%;">
      <van-nav-bar  >
      <template #left>
       <van-icon name="arrow-left" color="#000" @click="onClickLeft"/>
    <span style="margin-left: 10px;">编辑个人资料</span>
  </template>
  <template #right>
    <span>完成</span>
  </template>
</van-nav-bar>
    </div>
    <div>
      <div style="text-align: center;margin-top: 20px;"> <van-uploader v-model="fileList" multiple :max-count="1" />
      </div>
      <div class="ipt_border">
        <div class="z-flex-align-center content">
      <van-field
        v-model="message"
        size="large"
        :center="true"
        type="textarea"
        maxlength="30"
        placeholder="密聊名称"
        show-word-limit
      />
    </div>
    <div style="font-size: 12px;margin:8px 15px;color:#eee">你在密聊中使用的昵称</div>
      </div>
 
  
   
  </div>
  </div>
</template>

<script setup>
import {ref} from "vue"
const message = ref("");
const onClickLeft = () => history.back();
</script>

<style lang="scss">
.personalData{
  height: 100%;
  .ipt_border{
    border: 1px solid #fff;
    background-color: #fff;
    height: 80%;
  }
  .content{
    margin: 0 15px;
     .van-cell {
    padding: 0;
    background: transparent;
    border-bottom: 1px solid #41b883;
  }
  .van-field__value {
    height: 30px;
    display: flex;
    justify-content: space-between;
  }
  .van-field__body {
    width: 85%;
  }

  .van-field__control--min-height {
    min-height: 0 !important;
    height: 30px;
  }
  }
  .btn{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
