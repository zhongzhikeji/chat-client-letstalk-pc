<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back" /> 收藏
        </div>
        <div class="center">
            <van-search v-model="value" shape="round" background="#F6F6F6" placeholder="请输入搜索关键词" />
            <div class="content">
                <van-image width="100" height="100" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                <p><span style="width: 70%;">暖风</span> <span>2022年12月23日</span></p>
            </div>
            <div class="content">
                <van-image width="100" height="100" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                <p><span style="width: 70%;">暖风</span> <span>2022年12月23日</span></p>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const back = function () {
    router.push("/set")
}
const value = ref('');
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

    box-sizing: border-box;
    height: 100vh;
    background-color: #f6f6f6;

    .top {
        height: 7%;
        font-size: 5vw;
        line-height: 4rem;
        padding-left: 1rem;
        background-color: #fff;
    }

    .center {
        padding: 1rem;

        ::v-deep .van-search__field {
            background-color: #fff;
            padding-left: 10px;
            box-sizing: border-box;
            border-radius: 10px;
        }

        .content {
            width: 100%;
            margin: 0 auto;
            padding: 30px;
            background-color: #fff;
            margin-top: 20px;
            border-radius: 20px 20px 20px 20px;



            p {

                display: flex;
                margin-top: 10px;
                font-size: 24px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                color: #A0A0A0;

            }
        }

    }
}
</style>