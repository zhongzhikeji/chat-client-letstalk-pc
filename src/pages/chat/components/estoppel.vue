<template>
    <div class="editor">
        <div class="top">
            <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
            <span>设置禁言</span>
        </div>
        <div class="center">
            <div class="group">
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="全员禁言" name="1" style="font-size: 16px;">
                        <template #right-icon>
                            <van-switch v-model="checked1" active-color="#4A8AFF"
                                inactive-color="#dcdee0" />
                        </template>
                    </van-collapse-item>

                </van-collapse>
            </div>
            <div class="group" v-if="!checked1">
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="禁言成员" name="1" style="font-size: 16px;">
                        <template #right-icon>
                            <span class="btn">全选</span>
                            <span class="btn">添加</span>
                        </template>
                    </van-collapse-item>

                </van-collapse>
            </div>
            <div class="group" v-if="!checked1">
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="禁言成员列表" name="1" style="font-size: 16px;">
                        <template #right-icon>
                        </template>
                    </van-collapse-item>
                    <div class="list_user">
                        <div class="item">
                            <van-image width="35" height="35" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                                round />
                            <p style="margin-left: 20px; flex: 1;">名字</p>
                            <img width="24" height="24" :src="imgSrc" @click="change" />
                        </div>
                    </div>
                </van-collapse>
            </div>
        </div>
        <div class="footer" v-if="!checked1">
            <span>
                解除禁言
            </span>
            <span style="background-color: #fff; border: 2px solid #44B5FF; color: #44B5FF;">
                取消禁言
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
const onClickLeft = () => history.back();
const checked1 = ref(true);
const checked2 = ref(true);
const checked3 = ref(true);
const checked4 = ref(false);
const checked5 = ref(true);
const checked6 = ref(true);
const checked7 = ref(true);
const checked8 = ref(false);
let imgSrc = ref("/src/assets/image/21974.png")
const change = function () {
    if (imgSrc.value == "/src/assets/image/21974.png") {
        imgSrc.value = "/src/assets/image/66680.png"
    } else {
        imgSrc.value = "/src/assets/image/21974.png"
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
        height: 178px;
        display: flex;
        padding: 102px 36px 28px 36px;
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

        .group {
            border-radius: 24px;
            overflow: hidden;
            margin-bottom: 24px;

            .van-switch--on {
          
                background: #4A8AFF;
            }

            ::v-deep .van-cell__title {
                margin-top: 5px;
            }

            .btn {
                width: 144px;
                height: 56px;
                border-radius: 32px 32px 32px 32px;
                opacity: 1;
                border: 2px solid #D6D6D6;
                text-align: center;
                line-height: 56px;
                margin-right: 12px;

                background: #FFFFFF;
            }

            .list_user {
                padding: 15px 36px;
                background-color: #fff;

                .item {
                    display: flex;
                    align-items: center;
                    margin-left: 20px;

                    p {
                        flex: 1;
                    }
                }
            }

        }
    }

    .footer {
        position: absolute;
        bottom: 10px;
        display: flex;
        padding: 0 36px;

        span {
            width: 50%;
            width: 320px;
            height: 80px;
            background: #4A8AFF;
            border-radius: 20px 20px 20px 20px;
            opacity: 1;
            text-align: center;
            color: white;
            line-height: 80px;
            margin-right: 38px;
        }
    }
}
</style>
