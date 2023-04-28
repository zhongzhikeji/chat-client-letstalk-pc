<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="router.go(-1)" style="margin-right: 16px; font-size: 20px;" />
            <span>附近的人</span>
        </div>
        <div class="center">
            <div class="item" @click="show = true">
                <div class="topItem">
                    <div class="avator">
                        <img src="../../../assets/image/123.png" alt="">
                    </div>
                    <div class="name">
                        <p>22222</p>
                        <p class="time">
                            1km内
                        </p>
                    </div>
                </div>

            </div>
            <div class="item">
                <div class="topItem">
                    <div class="avator">
                        <img src="../../../assets/image/123.png" alt="">
                    </div>
                    <div class="name">
                        <p>22222</p>
                        <p class="time">
                            1km内
                        </p>
                    </div>
                </div>

            </div>
            <div class="item">
                <div class="topItem">
                    <div class="avator">
                        <img src="../../../assets/image/123.png" alt="">
                    </div>
                    <div class="name">
                        <p>22222</p>
                        <p class="time">
                            1km内
                        </p>
                    </div>
                </div>

            </div>
            <div class="item">
                <div class="topItem">
                    <div class="avator">
                        <img src="../../../assets/image/123.png" alt="">
                    </div>
                    <div class="name">
                        <p>22222</p>
                        <p class="time">
                            1km内
                        </p>
                    </div>
                </div>

            </div>
            <div class="item">
                <div class="topItem">
                    <div class="avator">
                        <img src="../../../assets/image/123.png" alt="">
                    </div>
                    <div class="name">
                        <p>22222</p>
                        <p class="time">
                            1km内
                        </p>
                    </div>
                </div>

            </div>
            <div class="item">
                <div class="topItem">
                    <div class="avator">
                        <img src="../../../assets/image/123.png" alt="">
                    </div>
                    <div class="name">
                        <p>22222</p>
                        <p class="time">
                            1km内
                        </p>
                    </div>
                </div>

            </div>
        </div>
        <van-dialog v-model:show="show" :showConfirmButton="false" :closeOnClickOverlay="true" class="dialog">
            <div
                style="width: 110px; height: 100px; border-radius: 50%; overflow: hidden;  margin: 0 auto; margin-top: 47px;">
                
            </div>
            <div style="font-size: 20px; font-weight: 500; text-align: center; color: black; margin-top: 17px;">222
            </div>
            <div style="font-size: 14px; font-weight: 500; text-align: center; color: #BFBFCB; margin-top: 17px;">狐狸号为：22222222
            </div>
            <div class="btn">加好友</div>
        </van-dialog>
    </div>
</template>

<script lang="ts" setup>
import { consumers } from 'stream';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const show = ref(false)
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
        height: 9.375rem;
        padding-top: 3.125rem;
        padding-left: 1.125rem;
        box-sizing: border-box;
        color: #FFFFFF;

        span {
            font-size: 1.5rem;
            color: #FFFFFF;
        }
    }

    .center {
        background-color: #fff;
        height: 100vh;
        border-radius: 1.5rem 1.5rem 0 0;
        position: relative;
        top: -3.125rem;
        padding: 36px;

        .item {
            background-color: #fff;
            padding-left: 36px;
            padding-top: 20px;
            padding-bottom: 34px;
            margin-bottom: 20px;
            border-bottom: 1px solid #f9f3f3;

            .topItem {
                display: flex;

                .avator {
                    width: 88px;
                    height: 88px;
                    border-radius: 50%;
                    overflow: hidden;
                }

                .name {
                    flex: 1;
                    margin-left: 16px;
                    line-height: 36px;
                    margin-top: 8px;

                    .time {
                        font-size: 24px;
                        color: #A5A8B6;
                        margin-top: 4px;
                    }
                }
            }


        }
    }

    .dialog {
        .btn {
            width: 458px;
            height: 82px;
            background: #44B5FF;
            border-radius: 20px 20px 20px 20px;
            opacity: 1;
            font-size: 16px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 82px;
            text-align: center;
            margin: 64px auto 48px;
        }
    }

}
</style>