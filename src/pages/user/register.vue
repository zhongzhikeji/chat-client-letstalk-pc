<template>
  <div class="login">
    <div class="bgc">
      <div class="top">
        <van-icon name="arrow-left" @click="back" />
      </div>
      <!--     <div class="center">
                    <van-form @submit="onSubmit">
                      <van-cell-group inset>
                        <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                          :rules="[{ required: true, message: '请填写用户名' }]" />
                        <van-field v-model="" name="昵称" label="昵称" placeholder="昵称"
                          :rules="[{ required: true, message: '请填写密码' }]" />
                        <van-field v-model="mobile" name="手机号" label="手机号" placeholder="手机号"
                          :rules="[{ required: true, message: '请填写密码' }]" />
                        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                          :rules="[{ required: true, message: '请填写密码' }]" />
                      </van-cell-group>
                      <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                          提交
                        </van-button>
                      </div>
                    </van-form>
                  </div> -->
      <div class="center">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <p>用户名</p>
            <van-field v-model="username" name="用户名" placeholder="请输入您的用户名"
              :rules="[{ required: true, message: '请填写用户名' }]" style="margin-bottom:10px" />
            <p>昵称</p>
            <van-field v-model="displayName" name="昵称" placeholder="请输入您的昵称"
              :rules="[{ required: true, message: '请填写昵称' }]" style="margin-bottom:10px" />
            <p>手机号</p>
            <van-field v-model="mobile" name="手机号" placeholder="请输入您的手机号" :rules="[{ required: true, message: '请填写手机号' }]"
              style="margin-bottom:10px" />
            <p>密码</p>
            <van-field v-model="password" type="password" name="请输入您的密码" placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]" />
          </van-cell-group>
          <div style="margin: 16px;" class="btn">
            <van-button type="primary" native-type="submit" round block style="margin:24px auto" size="large">
              注册
            </van-button>
          </div>
        </van-form>
        <van-dialog v-model:show="show" :showConfirmButton="false" :closeOnClickOverlay="true" class="dialog"
          style="padding:0 36px ;">
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
    </div>
  </div>
</template>
<script setup>
import {
  login, regist
} from "../../request/http.api";
import { ref } from "vue"
import { Notify, Toast } from 'vant';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
const username = ref('');
const password = ref('');
const displayName = ref('');
const mobile = ref('');
const foxCode = ref('');
const show = ref(false);
const back = function () {
  router.go(-1)
}

const onSubmit = (values) => {
  console.log(username);
  regist({ username: username.value, password: password.value,  mobile: mobile.value }).then(res => {
    show.value = true
    console.log(res);
    foxCode.value = res.data.foxCode
    console.log(foxCode.value, 123);
  }).catch(err => {

    Toast(err.response.data)
  })
};
const goLogin = function () {
  router.push("/login")
}
</script>

<style lang="scss" scoped>
.bgc {
  box-sizing: border-box;
  font-size: 12px;
  color: #ccc;

  hr {
    background-color: red;
    color: red;
  }

  .top {
    width: 100%;
    height: 13.5rem;
    font-size: 5vw;
    line-height: 4rem;
    padding-left: 1rem;
    background-image: url("../../assets/image/66683.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .center {
    background-color: #fff;
    border-radius: 3rem 3rem 0 0;
    padding: 1rem;
    height: 100vh;
    padding-top: 2.75rem;
    position: relative;
    top: -2.5rem;

    p {
      font-size: 1.125rem;
      font-weight: 550;
      color: black;
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

  .dialog {
    .img {
      margin-left: 160px;
      z-index: 99999;
    }
  }
}
</style>