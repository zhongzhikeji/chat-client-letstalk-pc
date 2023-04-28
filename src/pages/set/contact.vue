<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back"/> 联络人
        </div>
        <div class="center">
            <van-cell title="自动添加好友" label="启用此设定后，可将你装置的通讯录中有使用Letstalk的人自动加入好友名单。如需手动更新，请点选更新图示。">
                <template #right-icon>
                    <van-switch v-model="checked1" size="20" />
                </template>
            </van-cell>
            <van-cell title="寻找附近的人" is-link />
            <van-cell title="封锁名单" is-link />
            <van-cell title="加你为好友" is-link />
            <van-cell title="投诉" is-link />
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