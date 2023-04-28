<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back" style="float: left; margin-top: 5px;" /> 账号安全
        </div>
        <div class="center">
            <img src="../../assets/image/67317@3x.png" alt="" class="load">

        </div>
        <div class="text">
            <p class="info">
                身份验证
            </p>
            <p>为了保护你的账户安全，狐狸需要验证你的身份
                ，验证<br>
                通过后即可修改密码。</p>
        </div>
        <div class="set" @click="check">
            <p>发送验证码</p>
            <img src="../../assets/image/82075@2x.png" alt="" class="load">
        </div>
    </div>
</template>
  
<script setup>
import { ref } from "vue"
import { useRouter,useRoute } from 'vue-router';
import {codes } from "@/request/http.api";
import { Toast } from "vant";
const router = useRouter()
const route = useRoute()
const back = function () {
    router.go(-1)
}
const check = function () {
    
    codes(JSON.parse(localStorage.getItem('info')).mobile).then(res=>{
        console.log(res);
        Toast(res.data)
        router.push({ path: "/check", query: { phone: JSON.parse(localStorage.getItem('info')).mobile }})
    }).catch(err=>{
        Toast(err.response.data)
    })
}


</script>
  
<style lang="scss" scoped>
.bgc {
    height: 100vh;
    background: #F6F6F6;

    .top {
        height: 60px;
        background: #FFFFFF;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        text-align: center;
        font-size: 18px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #000000;
        padding: 15px 18px;
    }

    .center {
        width: 80px;
        height: 80px;
        margin: 0 auto;
        margin-top: 86px;
        margin-bottom: 60px;

        img {
            width: 100%;
        }


    }

    .text {
        font-size: 16px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #A5A8B6;
        text-align: center;
        margin-bottom: 70px;

        .info {
            font-size: 20px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #000000;
            margin-bottom: 20px;
        }

    }

    .set {
    
        height: 98px;
        background: #FFFFFF;
        border-radius: 24px 24px 24px 24px;
        opacity: 1;
        margin: 0 auto;
        display: flex;
        padding: 0 34px;

        p {
            flex: 1;
            font-size: 20px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #000000;
            line-height: 98px;
        }

        .load {
            width: 14.42px;
            height: 24.54px;
            margin-top: 35px;
        }
    }
}</style>