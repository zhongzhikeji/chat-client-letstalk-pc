<template>
    <div class="login">
        <div class="bgc">
            <div class="top">
                <van-icon name="arrow-left" @click="back" />
            </div>

            <div class="center">
                <p>输入短信验证码</p>
                <p style="color: #ccc; font-size: 15px;">已发送验证码</p>
                <van-field v-model="value" />
            
                <div class="btn" @click="checkedinfopush">下一步</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {
    login, regist, checkCodes
} from "../../request/http.api";
import { ref } from "vue"
import { Notify, Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const show = ref(true);
const value = ref('');
const back = function () {
    router.go(-1)
}
let checked = ref(false)
console.log(route.query.phone);
const checkedinfopush = function () {
    checkCodes({
        phone: route.query.phone,
        code: value.value
    }).then(res => {
        console.log(res);
        router.push("/passwordSet")
    }).catch(err => {
        Toast(err.response.data)
    })

    /* if(value.value=="123456"){
        router.push("/setPerInfo")
    }else{
        Toast("短信验证码不正确")
    } */

}

</script>
  
<style lang="scss" scoped>
.bgc {
    box-sizing: border-box;
    font-size: 12px;
    color: #ccc;

    .top {
        width: 100%;
        height: 224px;
        font-size: 20px;
        line-height: 4rem;
        padding-left: 1rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .center {
        padding: 0 36px;

        p {
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
            font-weight: 500;
            color: #000000;
            line-height: 18px;
            font-size: 22px;
            margin-bottom: 96px;
            text-align: center;
        }

        ::v-deep .van-field__control {
            color: #000000;
            text-align: center;
            font-size: 20px;
        }

        .btn {
            width: 80%;
            height: 50px;
            background: #27A9FF;
            border-radius: 20px 20px 20px 20px;
            color: #fff;
            font-size: 18px;
            text-align: center;
            line-height: 50px;
         
            margin: 0 auto;
            margin-top: 42px;
        }

    }
}
</style>