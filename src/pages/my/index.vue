<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" /> 我的
        </div>
        <van-tabs v-model:active="active" line-height="0px">
            
            <van-tab title="标签 4">
                <div class="center">
                    44
                </div>
            </van-tab>
            <van-tab title="标签 5">
                <div class="center">
                    55
                </div>
            </van-tab>
            <van-tab title="标签 6">
                <div class="center">
                    66
                </div>
            </van-tab>
            <van-tab title="标签 7">
                <div class="center">
                    77
                </div>
            </van-tab>
            <van-tab title="标签 8">
                <div class="center">
                    88
                </div>
            </van-tab>
        </van-tabs>


    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const active = ref(0);

onMounted(() => {
    console.log("我是my页面,我做了缓存")
})
</script>

<style scoped lang="scss">
.bgc {
      background-image: url("@/assets/image/userBg.png");
  background-repeat: no-repeat;
  background-size: 100%;
    padding-top: 1.875rem;
    box-sizing: border-box;

    .top {
        height: 3rem;
        font-size: 5vw;
        line-height: 4rem;
        padding-left: 1rem;
        color: #fff;
    }

    ::v-deep .van-tab {
        background-color: rgb(195, 218, 194);
        height: 1.875rem;
        border-radius: .9375rem;
        margin-right: 1.25rem;
        margin-top: .5rem;
        padding: 0px 1.25rem;
    }

    ::v-deep .van-tabs__nav {
        // background-color: green;
        background: transparent;
    }

    .center {
        background-color: #fff;
        border-radius: 2rem 2rem 0 0;
        padding: 1rem;
        margin-top: 1.25rem;
        .avator {
            width: 4.6875rem;
            margin: 0 auto;
            margin-top: 1.25rem;
        }

        p {
            width: 23.4375rem !important;
            text-align: center;
            font-size: 12px;
            margin-top: .625rem;
            color: gray;
        }
    }
}
</style>