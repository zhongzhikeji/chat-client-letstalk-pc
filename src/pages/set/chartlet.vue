<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back"/> 贴图
        </div>
        <div class="center">
            <van-cell title="表情商店" is-link />

            <van-cell title="预览表情" label="选择的表情会在发送前放大显示">
                <template #right-icon>
                    <van-switch v-model="checked" size="20" />
                </template>
            </van-cell>
            <van-cell title="显示建议贴图" label="系统将根据你输入的文字，显示适合该文字的贴图">
                <template #right-icon>
                    <van-switch v-model="checked1" size="20" />
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const checked = ref(false);
const checked1 = ref(true);
const router =useRouter()
const back=function(){
    router.push("/set")
}
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