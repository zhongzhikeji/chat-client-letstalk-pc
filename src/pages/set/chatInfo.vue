<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back"/> 聊天和备份
        </div>
        <div class="center">
            聊天室
            <hr style='background-color:#ccc; height:1px; border:none;' />
            <van-cell title="自动回复" is-link />
            <van-cell title="按行键传送" label="点选【换行】来传送信息">
                <template #right-icon>
                    <van-switch v-model="checked1" size="20" />
                </template>
            </van-cell>
            <van-cell title="传送已读" label="当你阅读讯息时,会传送已读的通知给对方。">
                <template #right-icon>
                    <van-switch v-model="checked2" size="20" />
                </template>
            </van-cell>
            <van-cell title="自动播放语音" label="允许语音讯息在手机接近耳朵时自动播放。">
                <template #right-icon>
                    <van-switch v-model="checked3" size="20" />
                </template>
            </van-cell>
            <van-cell title="仅使用听筒播放语音讯息" label="从听筒而不是扩音器播放语音讯息">
                <template #right-icon>
                    <van-switch v-model="checked4" size="20" />
                </template>
            </van-cell>
            <van-cell title="情绪大小字" label="滑动传送键即可调整讯息文字大小">
                <template #right-icon>
                    <van-switch v-model="checked5" size="20" />
                </template>
            </van-cell>
            清除缓存
            <hr style='background-color:#ccc; height:1px; border:none;' />


            <van-cell title="Lesstall备份" is-link />
            <van-cell title="聊天记录保存时间" is-link icon="manager-o" value="永久"
                label="设定时间后，将自动删除所有的聊天记录，包含未读讯息。个别聊天室可另外设定保留时间。" />

            <span>清除历史缓存</span>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router';
const router =useRouter()
const back=function(){
    router.push("/set")
}
var checked1 = ref(false)
var checked2 = ref(false)
var checked3 = ref(true)
var checked4 = ref(false)
var checked5 = ref(true)
</script>
  
<style lang="scss" scoped>
.bgc {
    .van-switch--on {
  background: linear-gradient(180deg, #14bffd 0%, #69d29a 100%);
}
    padding-top: 1.875rem;
    box-sizing: border-box;
    font-size: 12px;
    color: #ccc;
    hr {
        background-color: red;
        color: red;
    }

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

        span {
            color: red;
            font-size: 12px;
        }
    }
}
</style>