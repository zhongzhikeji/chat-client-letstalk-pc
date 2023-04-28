<template>
    <div class="bgc">
        <div class="top">
            <div class="img" style="width: 86px; margin: 0px auto 0px;">
                <img src="../../assets/image/67109.png" alt="">
            </div>
            <p style="width: 100%; text-align: center; color: black;">狐狸</p>
        </div>
        <div class="center">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <p>用户名</p>
                    <van-field v-model="username" name="用户名" placeholder="请输入您的用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]" style="margin-bottom:40px" />
                    <p>密码</p>
                    <van-field v-model="password" type="password" name="密码" placeholder="请输入您的密码"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                </van-cell-group>
                <div style="margin: 16px;" class="btn">
                    <van-button type="primary" native-type="submit" round block style="margin:24px auto" size="large">
                        登录
                    </van-button>
                    <van-button type="primary" @click="goregiet" round block size="large">
                        去注册
                    </van-button>
                </div>
            </van-form>
        </div>
        <div class="footer">
            <p style="border-right: 1px solid black;" @click="router.push('phoneLogin')">手机号登录</p>
            <p @click="router.push('phoneRegister')">新用户注册</p>
        </div>
    </div>
</template>
  
<script setup>
import {
    login, regist
} from "../../request/http.api";
import { ref } from "vue"
import { Notify, Toast } from 'vant';
import appStore from "../../store/index"
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const store = appStore()
const isLoading = ref(false)

const username = ref('')
const password = ref('')
const onSubmit = (values) => {
    console.log(username.value);
    console.log(password.value);
    store.login({ account: username.value, password: password.value }).then((res) => {
        Toast('登录成功');
        router.push("/")
    })
};

const goregiet = function () {
    router.push("/register")
}
const goregiet1 = function () {
    router.push("/phoneLogin")
}
</script>
  
<style lang="scss" scoped>
.bgc {
    font-size: 12px;
    height: 100vh;

    .top {
        width: 100%;
        font-size: 5vw;
        color: black !important;
        padding-top: 190px;
        padding-bottom: 150px;
    }

    .center {
        background-color: #fff;
        border-radius: 3rem 3rem 0 0;
        padding: 0 40px;
        p {
            font-size: 36px;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: bold;
            color: #000000;
            text-indent: 1em;
            position: relative;
            right: .1875rem;
            margin-top: .3125rem;
            margin-bottom: .5rem;
        }

        .btn {
            font-size: 2rem !important;
        }
    }

    .van-button {
        width: 18.375rem;
        height: 3.25rem;
        margin: 0 auto;
        background: linear-gradient(45deg, #6EC6FF, #27A9FF);
        border: none;
    }

    .footer {
        position: fixed;
        bottom: 100px;
        width: 100%;
        display: flex;
        margin: 0 auto;
        text-align: center;

        P {
            width: 50%;
            font-size: 32px;
            font-weight: 500;
            color: #000000;
            line-height: 18px;
        }
    }
}
</style>