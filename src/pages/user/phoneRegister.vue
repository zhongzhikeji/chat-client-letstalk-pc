<template>
    <div class="login">
        <div class="bgc">
            <div class="top">
                <van-icon name="arrow-left" @click="back" />
            </div>

            <div class="center">
                <p>注册狐狸并绑定手机号</p>

                <div class="inpu">
                    <span class="label">+86</span> <input type="text" v-model="value" placeholder="请输入手机号">
                </div>
                <div class="line"
                    style="width: 100%;
                                                                                                                    height: 0px;
                                                                                                                    opacity: 1;
                                                                                                                    border: .5px solid #F5F6FA;
                                                                                                                    margin-top: 7px;
                                                                                                                    margin-bottom: 10px;">
                </div>
                <!--    <van-cell-group inset>
                    <van-field v-model="value" label="+86" placeholder="请输入手机号" />
                </van-cell-group> -->
                <!--    <div class="line"
                    style="width: 100%;
                                                                                                    height: 0px;
                                                                                                    opacity: 1;
                                                                                                    border: 1px solid #F5F6FA;">
                </div> -->

              
                <van-radio-group @click="checkedinfo" style="margin-top: 20px;">
                    <van-radio :checked="checked">
                        <span style="color: #303030 ;font-size: 16px;">已阅读并同意</span>
                        <span style="font-size: 16px;"> 服务协议</span>
                        
                         <span
                            style="color: #303030 ;font-size: 16px;">和</span>
                            <span style="font-size: 16px;">狐狸隐私保护指引</span>
                        </van-radio>
                </van-radio-group>
                <div class="btn" :style="{ opacity: checked == '1' ? 1 : 0.5 }" @click="checkedinfopush">同意并继续</div>
            </div>

        </div>
    </div>
</template>
<script setup>
import {
    login, regist, codes
} from "../../request/http.api";
import { ref } from "vue"
import { Notify, Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
const back = function () {
    router.go(-1)
}
let checked = ref(false);
const value = ref("")

const checkedinfo = function () {
    console.log(111);
    checked.value = !checked.value
}
const checkedinfopush = function () {

    if (checked.value) {
        console.log(1111);
        codes(value.value).then(res => {
            console.log(res);
            router.push({ path: "/verification", query: { phone: value.value } })
        }).catch(err => {
            Toast(err.response.data)
        })

    } else {
        Toast("请先同意狐狸隐私保护指引")
    }
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
        font-size: 25px;
        line-height: 4rem;
        padding-left: 1rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;

        .van-icon-arrow-left:before {
            color: #000000;
            font-weight: bold;
        }
    }

    .center {
        padding: 0 18px;

        .inpu {
            display: flex;
              align-items: center;
            .label {
                font-size: 16px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                color: #898D96;
                width: 20%;
            }

            input {
                border: none;
                height: 40px;
                width: 80%;
                font-size: 16px;
                color: #000000;
            }
        }

        p {
            margin-bottom: 48px;
            font-size: 22px;
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
            font-weight: 500;
            color: #000000;
        }



        ::v-deep .van-field__label {

            width: 42px;
            font-size: 16px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #898D96;
            line-height: 24px;
            position: relative;
        }

        ::v-deep .van-radio__icon {
            margin-left: 10px;
            margin-top: 5px;

            i {
              
                border: 1px solid #4A8AFF;
             
            }
        }

        ::v-deep .van-radio__icon--checked {
            i {
              
            }

            margin-top: 5px;

        }

        ::v-deep .van-radio__label {

            font-size: 12px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #4A8AFF;
         
            margin-top: 7px;
        }

        .btn {
            width: 100%;
            height: 40px;
            background: #4A8AFF;
            border-radius: 20px 20px 20px 20px;
            opacity: 0.5;
            color: #fff;
            font-size: 20px;
            text-align: center;
            line-height: 40px;
            margin: 0 auto;
            margin-top: 42px;
         
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
         



        }
    }
}
</style>