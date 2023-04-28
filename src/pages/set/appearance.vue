<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back"/> 外观
        </div>
        <div class="center">
            <van-cell title="夜间模式" is-link value="关"/>          
            <van-cell title="聊天背景" is-link />          
            <van-cell title="字型大小" is-link value="适中"/>          
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router =useRouter()
const back=function(){
    router.push("/set")
}
const checked = ref(false);
const checked1 = ref(true);
onMounted(() => {
    console.log("我是my页面,我做了缓存")
})
</script>

<style scoped lang="scss">
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