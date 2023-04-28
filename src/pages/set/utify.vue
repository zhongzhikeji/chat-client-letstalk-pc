<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back"/> 通知
        </div>
        <div class="center">
            <van-cell title="显示通知">
                <template #right-icon>
                    <van-switch v-model="checked" size="20" />
                </template>
            </van-cell>
            <van-cell title="铃声" is-link to="utify"  value="全部显示" label="在讯息通知中预览信息文字" />
            <van-cell title="程序内部提醒" is-link to="utify"  label="设定档Letstall收到讯息时的提醒，铃声与震动" />
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