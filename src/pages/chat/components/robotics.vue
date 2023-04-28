<template>
    <div class="editor">
        <div class="top">
            <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
            <span>群机器人</span>
        </div>
        <div class="center">
            <div class="group">
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="入群欢迎" name="1" @click="router.push('welcome')">
                        <template #right-icon>
                            <van-icon name="arrow" style="margin-top: 5px;margin-left: 5px;" @click="router.push('welcome')"/>
                        </template>
                        <template #value>
                            <span style="font-size: 12px;">未设置</span>
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="定时消息" name="1" @click="router.push('timing')">
                        <template #right-icon>
                            <van-icon name="arrow" style="margin-top: 5px; margin-left: 5px;"  />
                        </template>
                        <template #value>
                            <span style="font-size: 12px;">未设置</span>
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="自助问答" name="1"  @click="router.push('selfHelp')">
                        <template #right-icon>
                            <van-icon name="arrow" style="margin-top: 5px; margin-left: 5px;" />
                        </template>
                        <template #value>
                            <span style="font-size: 12px;">未设置</span>
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="自动转发" name="1" @click="toForward">
                        <template #right-icon>
                            <van-icon name="arrow" style="margin-top: 5px; margin-left: 5px;" />
                        </template>
                        <template #value>
                            <span style="font-size: 12px;">{{ isSetting?'已设置':'未设置' }}</span>
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="发言管理" name="1" @click="router.push('speak')">
                        <template #right-icon>
                            <van-icon name="arrow" style="margin-top: 5px;margin-left: 5px;" />
                        </template>
                        <template #value>
                            <span style="font-size: 12px;">未设置</span>
                        </template>
                    </van-collapse-item>
                </van-collapse>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref} from "vue"
import { useRouter } from "vue-router";
import { getBoID } from "@/request/http.api.ts";

const router = useRouter();
const isSetting = ref(false)
const onClickLeft = () => history.back();

const toForward = ()=>{
   
    router.push({ path: '/retransmission', query: { id: id.value } });
    
}
const id=ref("")
getBoID(localStorage.getItem("groupId")).then(res=>{
 
    id.value=res.data.id
    res.data.autoForward.forward === true?isSetting.value=true:isSetting.value =false
})

</script>

<style lang="scss" scoped>
.editor {
    background-color: #F6F6F6;
    width: 100vw;
    height: 100vh;

    .top {
        width: 750px;
        height: px;
        display: flex;
        padding: 40px 36px 28px 36px;
        background-color: #fff;

        span {
            width: 92%;
            text-align: center;
            font-size: 32px;
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
            font-weight: 500;
            color: #000000;
        }
    }

    .center {
        padding: 24px 36px 0;

        .manager {
            width: 678px;
            background-color: #fff;
            padding: 24px;
            margin-bottom: 24px;
            border-radius: 24px 24px 24px 24px;

            .mTop {
                padding-bottom: 30px;

                span {
                    font-size: 28px;
                    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                }

                .text {

                    font-size: 24px;
                    margin-left: 336px;
                }
            }

            .mCenter {
                display: flex;
                justify-content: left;
                flex-wrap: wrap;

                div {
                    width: 20%;

                    p {
                        text-align: center;
                        font-size: 20px;
                        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                        color: #939395;
                    }
                }
            }
        }

        .group {
            border-radius: 24px;
            overflow: hidden;
            margin-bottom: 24px;
        }

        .centerText {
            font-size: 20px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #939395;
            margin-left: 30px;
            margin-bottom: 14px;
        }
    }
}
</style>
