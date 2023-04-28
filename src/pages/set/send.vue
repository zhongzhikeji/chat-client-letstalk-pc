<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back"/> 发送回馈
        </div>
        <div class="center">
            发送回馈
            <div class="text">
                请说明您的状况或留下评论，感谢您的分享
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { } from "vue"
import { useRouter } from 'vue-router';
const router =useRouter()
const back=function(){
    router.push("/set")
}
</script>
  
<style lang="scss" scoped>
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

     .text{
        width: 90%;
        height: 9.375rem;
        margin: 0 auto;
        border-radius: .625rem;
        font-size: .75rem;
        color: rgb(112, 105, 105);
        background-color: #ccc;
        padding: .625rem 1.25rem ;
        margin-top: .625rem;
     }
    }
}
</style>