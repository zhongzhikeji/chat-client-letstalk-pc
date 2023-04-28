<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back" style="float: left; margin-top: 5px;" /> 密码设置
        </div>
        <div class="center">
            <p>设置新密码</p>

        </div>

        <div class="set">
            <div class="item">
                <span>
                    新密码
                </span>
                <input type="password" name="" id="" placeholder="请输入新密码" v-model="value" @input="checkSec">
            </div>
            <div class="item item2">
                <span>
                    确认密码
                </span>
                <input type="password" name="" id="" placeholder="请再次输入新密码" v-model="valueSec" @input="checkSec">
            </div>
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
            <div class="btn" @click="check" :style="{ opacity: show ? 1 : 0.5 }">
                确认
            </div>
            <span>安全提示：新密码请勿与旧密码过于相似。</span>
        </div>
        <van-dialog v-model:show="showPop" title="下线通知" @confirm="confirm">
            <p style="text-align: center; margin: 20px auto;">您的登录已过期，请重新登录</p>
        </van-dialog>
    </div>
</template>
  
<script setup>
import { ref } from "vue"
import { useRouter, useRoute } from 'vue-router';
import { codes, setPas } from "@/request/http.api";

const router = useRouter()
const route = useRoute()
const back = function () {
    router.go(-1)
}
const value = ref("")
const valueSec = ref("")
const show = ref(false)
const showPop = ref(false)
console.log(value.value.length);
const checkSec = function () {
    let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/

    console.log(value.value.length);
    if (value.value == valueSec.value && value.value.length > 7 && value.value.length < 17 && reg.test(value.value)) {

        show.value = true
        console.log(show.value);
    }
}
const check = function () {
    if (show.value == true) {
        setPas({ password: value.value }).then(res => {
            console.log(res);
            showPop.value=true
        })
    } else {
        if (value.value !== valueSec.value) {

            Toast("两次输入不一致")

        } else {
            Toast("请输入正确的格式")

        }

    }
}
const confirm=function(){
    localStorage.clear()
    location.reload()
}





</script>
  
<style lang="scss" scoped>
.bgc {
    height: 100vh;
    background: #F6F6F6;

    .top {
       
       
        background: #FFFFFF;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        text-align: center;
        font-size: 18px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #000000;
        padding: 15px 36px;
    }

    .center {
        padding: 42px 36px;

        p {
            font-size: 24px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #000000;
        }

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
            font-size: 16px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #000000;
            margin-bottom: 20px;
        }

    }

    .set {
        padding: 76px 36px;

        .item {
            display: flex;
            height: 96px;
            border-bottom: 1px solid #E3E3E3;

            span {

                font-size: 16px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                color: #000000;
                line-height: 96px;
                width: 90px;
            }

            input {
                border: none;
                flex: 1;
                background: #F6F6F6;
                  font-size: 16px;
            }
        }

        .item2 {
            margin-bottom: 32px;
        }

        .bom {
            margin-bottom: 12px;
     
            img {
                width: 28.64px;
                height: 28.64px;
            }

            span {
                font-size: 18px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                color: #A5A8B6;
                margin-left: 4px;
                position: relative;
                top: -5px;
            }
        }

        .btn {
           font-size: 18px;
            height: 52px;
            background: #4A8AFF;
            border-radius: 20px 20px 20px 20px;
            opacity: 0.5;
            margin: 0 auto;
            color: #fff;
            text-align: center;
            line-height: 52px;
            margin-top: 2rem;
            margin-bottom: 24px;
        }

    }

    span {
        font-size: 16px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #A5A8B6;
    }
}
</style>