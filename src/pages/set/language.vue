<template>
  <div class="bgc">
      <div class="top">
          <van-icon name="arrow-left" @click="back"/> 语言设置
      </div>
      <van-field >
  <template #input>
    <van-radio-group v-model="checked" direction="horizontal">
        <div>
      <van-radio name="1" width="375px"
      >English</van-radio> <br>
        </div>
      <div>
        <van-radio name="2">繁体中文</van-radio> 
      </div>
      <div>
        <van-radio name="3">简体中文</van-radio> 
      </div>
      <div>
        <van-radio name="4">泰语</van-radio> 
      </div>
      <div>
        <van-radio name="5">韩语</van-radio> 
      </div>
      <div>
        <van-radio name="6">日语</van-radio> 
      </div>
    </van-radio-group>
  </template>
</van-field>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router =useRouter()
const back=function(){
    router.push("/set")
}
var checked=ref(false)
</script>

<style scoped lang="scss">
.van-switch--on {
  background: linear-gradient(180deg, #14bffd 0%, #69d29a 100%);
}
.bgc {
    .van-switch--on {
  background: linear-gradient(180deg, #14bffd 0%, #69d29a 100%);
}
    padding-top: 1.875rem;
    box-sizing: border-box;

    .top {
        height: 3rem;
        font-size: 5vw;
        line-height: 4rem;
        padding-left: 1rem;
    }

    .center {
        background-color: #fff;
        border-radius: 2rem 2rem 0 0;
        padding: 1rem;
    }
}
</style>




