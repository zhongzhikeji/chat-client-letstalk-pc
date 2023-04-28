<template>
    <div class="bgc">
        <div class="top">
            <p>发现</p>
        </div>
        <div class="center">
            <van-cell title="朋友圈" is-link value="内容" @click="gocircle">
                <template #title>
                    <img src="../../assets/image/66758.png" alt=""> <span class="text">朋友圈</span>
                </template>
            </van-cell>
            <van-cell title="朋友圈" is-link>
                <template #title>
                    <img src="../../assets/image/66759.png" alt=""> <span class="text">视频号</span>
                </template>
            </van-cell>
            <van-cell title="朋友圈" is-link>
                <template #title>
                    <img src="../../assets/image/66760.png" alt=""> <span class="text">小游戏</span>
                </template>
            </van-cell>
            <van-cell title="朋友圈" is-link>
                <template #title>
                    <img src="../../assets/image/66761.png" alt=""> <span class="text">扫一扫</span>
                </template>
            </van-cell>
            <van-cell title="朋友圈" is-link>
                <template #title>
                    <img src="../../assets/image/66762.png" alt="" style="width: 30px; height: 30px;"> <span
                        class="text">附近</span>
                </template>
            </van-cell>
        </div>
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
        height: 220px;
        padding-top: 40px;
        padding-left: 40px;
        box-sizing: border-box;

        p {
            font-size: 40px;
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

        .van-cell {
            width: 339px;
            height: 50px;
            margin: 0 auto;
            margin-bottom: 8px;
            border-radius: 6px 6px 6px 6px;

            .text {
                width: 48px;
                height: 24px;
                font-size: 16px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                color: #000000;
                line-height: 9px;
                margin-left: 10px;
                position: relative;
                top: -9px;
            }
        }

        .van-collapse-item {
            width: 21.1875rem;
            height: 65px;
            margin: 0 auto;
            border: none !important;
            border-radius: .375rem;
            box-sizing: border-box;
            padding-top: .5rem;
           
        }
    }


}</style>