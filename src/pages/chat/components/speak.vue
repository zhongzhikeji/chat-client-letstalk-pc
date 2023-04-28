<template>
    <div class="editor">
        <div class="top">
            <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
            <span>入群欢迎</span>
        </div>
        <div class="center">
            <div class="group">
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="禁止发链接" name="1" style="font-size: 14px">
                        <template #right-icon>
                            <van-switch v-model="isWelcome" active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)"
                                inactive-color="#dcdee0" size="20px" @click="infoSet" />
                        </template>
                    </van-collapse-item>
                    <p> 启用后群成员发链接时，将由群管家自动撤回并警告该成员。
                        在白名单内的链接除外。</p>
                    <van-collapse-item title="禁止发送含二维码的图片" name="1" style="font-size: 14px; margin-top: 20px;">
                        <template #right-icon>
                            <van-switch v-model="isWelcome" active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)"
                                inactive-color="#dcdee0" size="20px" @click="infoSet" />
                        </template>
                    </van-collapse-item>
                    <p>启用后群成员发送含二维码的图片时，将由群管家自动撤回。</p>

                </van-collapse>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router";
import { getBoID, welcomeGroup } from "@/request/http.api.ts";
const isWelcome = ref(true)
const router = useRouter();
const onClickLeft = () => history.back();
const toForward = () => {
    console.log(11);
    router.push({ path: '/retransmission', query: { id: id.value } });
}
const text = ref("")
const infoSet = async () => {
    console.log(text.value);
    let obj = {
        isWelcome: true,
        welcomeText: text.value
    }
    let res = await getBoID(localStorage.getItem("groupId"))
    obj.id = res.data.id
    console.log(obj, 1);
    if (isWelcome.value == true) {
        welcomeGroup(obj).then(res => {
            console.log(res);
        })
    }
}



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

            p {
                font-size: 22px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                color: #939395;
                margin-top: 12px;
            }

            .van-switch--on {
                background: linear-gradient(180deg, #14bffd 0%, #69d29a 100%);

            }
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

    ::v-deep .van-field__body {
        width: 280px;
        height: 43px;
        background: #F3F5F8;
        border-radius: 10px;
        opacity: 1;
        margin: 0 auto;
        padding-left: 16px;
    }
}
</style>
