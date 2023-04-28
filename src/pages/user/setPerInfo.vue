<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back" />
            <div class="img" style="width: 86px; margin: 0px auto 0px;">
                <img src="../../assets/image/67109.png" alt="">
            </div>
            <p style="width: 100%; text-align: center; color: black; margin-top: 20px;">设置账户信息</p>
        </div>
        <div class="center">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="username" placeholder="请输入昵称" :rules="[{ required: true, message: '请填写昵称' }]" @input="checkSec"/>
                </van-cell-group><van-cell-group inset>
                    <van-field v-model="password" placeholder="请输入狐狸密码" :rules="[{ required: true, message: '请填写密码' }]"
                        type="password" @input="checkSec"/>
                </van-cell-group>
            </van-form>
            <div class="bom">
                <img src="../../assets/image/81377@2x.png" alt=""> <span>
                    密码由8-16位数字，字母或符号组成
                </span>
            </div>
            <div class="bom">
                <img src="../../assets/image/81377@2x.png" alt=""> <span>
                    至少含2种以上字符
                </span>
            </div>
            <div class="btn" native-type="submit" @click="submit" :style="{ opacity: showBtn ? 1 : 0.5 }">注册并登录</div>
        </div>
        <van-dialog v-model:show="show" :showConfirmButton="false" :closeOnClickOverlay="true" class="dialog"
            :modal-append-to-body='false' :append-to-body="false" style="padding:0 36px ;">
            <div style="font-size: 20px; font-weight: 500; text-align: center; color: black; margin-top: 17px;">恭喜你注册成功
            </div>
            <div style="font-size: 14px; font-weight: 500; text-align: center; color: #BFBFCB; margin-top: 17px;">您的狐狸号为
            </div>
            <div style="width: 80%;
                        height: 57px;
                        background: #F4F5FE; margin: 0 auto; font-size: 30px;
                        font-weight: 500;
                        color: #000000;
                        text-align: center;
                        line-height: 57px;
                        margin: 0 auto;">
                {{ foxCode }}
            </div>
            <van-button type="primary" @click="goLogin" round block style="margin:24px auto; width: 80%;" size="large">
                登录
            </van-button>
        </van-dialog>
    </div>
</template>
  
<script setup>
import {
    login, regist, codesregister
} from "../../request/http.api";
import { ref } from "vue"
import { Notify, Toast } from 'vant';
import appStore from "../../store/index"
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const store = appStore()
const isLoading = ref(false)
const value = ref("")
const valuePass = ref("")
const username = ref('')
const foxCode = ref('')
const show = ref(false)
const password = ref('')
const showBtn=ref(false)
const submit = (values) => {
    codesregister({ username: username.value, password: password.value, mobile: route.query.phone }).then((res) => {
        foxCode.value = res.data.foxCode
        show.value = true
    }).catch(err => {
        Toast(err.response.data)
    })
};

const goregiet = function () {
    router.push("/register")
}
const goLogin = function () {
    router.push("/login")
}
const goregiet1 = function () {
    console.log(111);
    router.push("/phoneLogin")
}
const back = function () {
    router.go(-1)
}
const checkSec = function () {
    let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/

    console.log(value.value.length);
    if ( password.value.length > 7 && password.value.length < 17 && reg.test(password.value)) {
        showBtn.value = true
    }
}
</script>
  
<style lang="scss" scoped>
.bgc {
    font-size: 12px;
    height: 100vh;

    .top {
        width: 100%;
        font-size: 20px;
        color: black !important;
        padding-left: 40px;
        padding-top: 70px;

        .van-icon-arrow-left:before {
            color: #000000;
            font-weight: bold;
        }
    }

    .center {
        background-color: #fff;
        border-radius: 3rem 3rem 0 0;
        padding: 1rem;

        ::v-deep .van-field__body {
            width: 100%;
            margin: 0 auto;
            height: 40px;
            background: #FFFFFF;
            box-shadow: 4px 6px 24px 2px rgba(0, 0, 0, 0.08);
            border-radius: 12px 12px 12px 12px;
            opacity: 1;
            text-align: center;
            margin-top: 20px;
        }

        ::v-deep .van-field__control {

            text-align: center;
        }

        .bom {
            width: 80%;
            margin: 0 auto;
            margin-bottom: 12px;
            

            img {
                width: 16px;
                height: 16px;
            }

            span {
                font-size: 16px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                color: #A5A8B6;
                margin-left: 4px;
                position: relative;
                top: -5px;
            }
        }

        .btn {
            width: 80%;
            height: 40px;
            background: #4A8AFF;
            border-radius: 20px 20px 20px 20px;
            color: #fff;
            font-size: 20px;
            text-align: center;
            margin: 0 auto;
            margin-top: 34px;
           line-height: 40px;
        }
    }
}</style>