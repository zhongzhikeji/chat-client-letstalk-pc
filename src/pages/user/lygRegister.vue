<template>
    <div class="register">
        <!--       <div class="logo">
            <img src="../../assets/image/lygLogo.png" alt="" style="width: 66px; height: 66px;">
            <p>欢迎来到绿有购~</p>
        </div>
        <div class="center">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <p>邀请码</p>
                    <van-field v-model="invite" name="用户名" placeholder="请输入您的用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]" label-align="top" >
                    </van-field>
                    <p>用户名</p>
                    <van-field v-model="username" name="用户名" placeholder="请输入您的用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]" label-align="top" label-class="labelClass">
                    </van-field>
                    <p>密码</p>
                    <van-field v-model="password" type="password" name="密码" placeholder="请输入您的密码"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                    <p>确认密码</p>
                    <van-field v-model="passwordSec" type="password" name="密码" placeholder="请再次输入您的密码"
                        :rules="[{ required: true, message: '请再次填写密码' }]" />
                    <p>手机号</p>
                    <van-field v-model="phoneNumber" name="手机号" placeholder="请输入您的手机号"
                        :rules="[{ required: true, message: '请填写手机号' }]" label-align="top" label-class="labelClass" />
                    <p>验证码</p>
                    <van-field v-model="captcha" name="验证码" placeholder="请输入您的验证码"
                        :rules="[{ required: true, message: '请填写验证码' }]" label-align="top" label-class="labelClass" />
                    <span style="position: relative; top: -30px; left: 200px;" @click="getCaptcha">点击获取</span>
                </van-cell-group>
                <div style="margin: 16px;" class="btn">
                    <van-button type="primary" native-type="submit" block size="large"
                        style="background-color: #038E3D; margin-top: 30px;" @click="submit">
                        去注册
                    </van-button>
                </div>
            </van-form>
        </div> -->
        <div class="center">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="invite" name="邀请码" label-align="top" placeholder="请输入邀请码">
                    </van-field>
                    <van-field v-model="password" type="password" name="密码" placeholder="请输入登录密码（6-16位）" />
                    <van-field v-model="passwordSec" type="password" name="密码" placeholder="请再次输入登录密码（6-16位）" />
                    <van-field v-model="phoneNumber" name="手机号" label-align="top" placeholder="请输入11位数字手机号" />
                    <van-field v-model="captcha" name="验证码" label-align="top" placeholder="请输入短信验证码">
                        <template #button>
                            <span style="color: red; margin-right: 1.25rem;"
                                @click="getCaptcha">获取验证码</span>
                        </template>
                    </van-field>
                </van-cell-group>
            </van-form>
            <van-radio-group @click="checkedinfo">
                <van-radio :checked="checked"><span style="color: #303030;text-align: center;">已阅读并同意</span> 服务协议<span
                        style="color: #303030 ;">                                           和</span>用户协议</van-radio>
            </van-radio-group>
            <div class="btn" :style="{ opacity: checked == '1' ? 1 : 0.5 }" @click="checkedinfopush">注册</div>
        </div>

    </div>
</template>
<script setup>
import { ref } from "vue"
import { Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router';
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';

const router = useRouter()
const route = useRoute()
const back = function () {
    router.go(-1)
}
const invite = ref(route.query.invite)
console.log(invite.value);

const password = ref('')
const passwordSec = ref('')
const phoneNumber = ref('')
const captcha = ref('')
const uuidValue = uuidv4()
//配置接口地址
//获取验证码
const getCaptcha = function () {
    var phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
    if (!phoneReg.test(phoneNumber.value)) {
        Toast("手机号码格式错误!");
        return false;
    }

    console.log(formData);
    axios.get(`http://47.109.86.70:28003/buyer/common/sms/REGISTER/${phoneNumber.value}`, {
        headers: { //头部参数
            uuid: uuidValue
        }
    }).then(function (response) { //请求成功，response接收返回参数
        console.log(response);
        Toast(response.data.message)

    })
        .catch(function (error) { //请求失败，error接收失败原因
            console.log(error);
        })
}
//注册
let formData = new URLSearchParams()
/* const submit = function () {

} */


let checked = ref(false);

const checkedinfo = function () {
    checked.value = !checked.value
}
const checkedinfopush = function () {
    if (!password.value) {
        Toast("请输入密码")
        return
    } else if (!passwordSec.value) {
        Toast("请再次输入密码")
        return
    } else if (!phoneNumber.value) {
        Toast("请输入手机号")
        return
    } else if (!captcha.value) {
        Toast("请输入验证码")
        return
    } else if (passwordSec.value != password.value) {
        Toast("两次密码输入不一致")
        return
    }
    if (checked.value) {
        formData.append('code', captcha.value)
        formData.append('mobilePhone', phoneNumber.value)
        formData.append('password', password.value)
        formData.append('invite', invite.value)

        console.log(formData.toString());
        axios.post(`//47.109.86.70:28006/buyer/passport/member/register/invite`, formData, {
            headers: { //头部参数
                uuid: uuidValue
            }
        }).then(function (response) { //请求成功，response接收返回参数
            console.log(response);
            Toast(response.data.message)
            router.push('/upLoad')
        })
            .catch(function (error) { //请求失败，error接收失败原因
                console.log(error.response);
                Toast(error.response.data.message)
            })
    } else {
        Toast("请先阅读并同意服务协议和用户协议")
    }
}
</script>
  
<style lang="scss" scoped>
.register {
    width: 100vw;
    height: 100vh;
    background-image: url(../../assets/lyg.png);
    background-size: cover;
    padding: 304px 36px 0;

    .center {
        width: 678px;
        height: 1030px;
        background: #FFFFFF;
        border-radius: 28px 28px 28px 28px;
        opacity: 0.9;
        padding-top: 60px;

        .van-form {
            padding-bottom: 0px;
        }

        ::v-deep .van-field__body {
            width: 275px;
            height: 41px;
            background: #FFFFFF;
            border-radius: 50px 50px 50px 50px;
            opacity: 1;
            border: 1px solid #707070;
            margin: 0 auto;
            padding-left: 25px;

        }

        ::v-deep .van-field__control::-webkit-input-placeholder {
            color: #000000;
        }

        :v-deep .van-field__control {
            text-align: left;
            font-size: 24px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #000000 !important;

        }

        .van-radio {
            margin: 0 auto;
            width: 70%;
            margin-top: 0;
            position: relative;
            top: -10px;
        }

        ::v-deep .van-radio__icon {
            margin-left: 10px;
            margin-top: 5px;

            i {
                width: 13px;
                height: 13px;
                border: 1px solid #038E3D;
                margin-top: 5px;
            }
        }

        ::v-deep .van-radio__icon--checked {
            i {
                width: 13px;
                height: 13px;
                margin-top: 4px;
                font-size: 12px;
                background-color: #038E3D;
            }

            margin-top: 5px;

        }

        ::v-deep .van-radio__label {

            font-size: 12px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #038E3D;
            line-height: 0px;
            margin-top: 7px;
        }

        .btn {
            width: 80%;
            height: 80px;
            background: #038E3D;
            border-radius: 20px 20px 20px 20px;
            opacity: 0.5;
            color: #fff;
            font-size: 20px;
            text-align: center;
            line-height: 80px;
            text-align: center;
            margin: 10px auto;
        }
    }

    /*  .logo {
        display: flex;
        margin-bottom: 100px;

        p {
            line-height: 120px;
            font-size: 40px;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: bold;
            color: #000000;
            margin-left: 32px;
        }
    }

    .center {
        p {
            font-size: 32px;
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
    } */
}
</style>