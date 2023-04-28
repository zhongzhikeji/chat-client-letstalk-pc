<template>
    <div class="register">
        <div class="top">
            <van-icon name="arrow-left" @click="back" style="font-size: 20px;" />
        </div>
        <div class="logo">
            <img src="../../assets/image/lygLogo.png" alt="">
        </div>
        <p>欢迎来到绿有购~</p>
        <div class="center">

            <div style="margin: 16px;" class="btn" @click="goUpload">
                <van-button type="primary"  block size="large"
                    style="background-color: #038E3D; margin-top: 30px; border: none;" @click="goUpload">
                    手机端（安卓）下载
                </van-button>
            </div>
            <div style="margin: 16px;" class="btn">
                <van-button type="primary"  block size="large"
                    style="background-color: #038E3D; margin-top: 30px; border: none;">
                    手机端（iphone）下载
                </van-button>
            </div>

        </div>

    </div>
</template>
<script setup>
import { ref } from "vue"
import { Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const back = function () {
    router.go(-1)
}
const goUpload = function () {
    location.href='https://wkzx.wang/dOHa'
    
}
</script>
  
<style lang="scss" scoped>
.register {
    width: 100vw;
    padding: 60px 60px 120px;
    height: 100vh;

    .logo {

        margin-bottom: 100px;
        width: 30%;
        margin: 0 auto;
        margin-top: 100px;

        img {
            width: 100%;
            height: 100%;
        }

    }

    p {
        line-height: 120px;
        font-size: 36px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #000000;
        text-align: center;
    }

    .center {

        p {
            font-size: 16px;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: bold;
            color: #000000;
            margin-left: 25px;
            margin-top: 1.25rem;

        }

        ::v-deep .van-button:before {
            border-radius: 10px;
            overflow: hidden;
        }
    }

    .footer {
        position: fixed;
        width: 80%;
        bottom: 30px;
        display: flex;
        margin: 0 auto;
        text-align: center;

        P {
            width: 50%;
            font-size: 28px;
            font-weight: 500;
            color: #000000;
            line-height: 18px;
        }
    }
}</style>