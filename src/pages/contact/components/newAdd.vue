<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="router.go(-1)" style="margin-right: 16px; font-size: 20px;" />
            <span>附近的人</span>
        </div>
        <div class="center"></div>

    </div>
</template>

<script lang="ts" setup>
import { consumers } from 'stream';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const gocircle = function () {
    console.log(1111);
    router.push("/circle")
}
</script>

<style scoped lang="scss">
.bgc {
    background-image: url("@/assets/image/bg.png");
    background-repeat: no-repeat;
    background-size: 100%;
    box-sizing: border-box;
    .top {
        height: 9.375rem;
        padding-top: 3.125rem;
        padding-left: 1.125rem;
        box-sizing: border-box;
        color: #FFFFFF;

        span {
            font-size: 1.5rem;
            color: #FFFFFF;
        }
    }

    .center {
        background-color: #F3F5F8;
        height: 100vh;
        border-radius: 1.5rem 1.5rem 0 0;
        position: relative;
        top: -3.125rem;
        padding-top: 1.4375rem;
    }


}
</style>