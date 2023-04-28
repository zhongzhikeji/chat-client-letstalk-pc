<template>
  <div class="login">
    <div class="bgc">
      <div class="top">
        <van-icon name="arrow-left" @click="back" /> 登录
      </div>
      <div class="center">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]" />
          </van-cell-group>
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>

  </div>


</template>

<script setup>
import {
  login, regist
} from "../../request/http.api";
import { ref } from "vue"
import { Notify } from 'vant';
import appStore from "../../store/index"
const store = appStore()
const username = ref('');
const password = ref('');
const onSubmit = (values) => {
  console.log(username);
  store.login( { token: username.value, password: password.value }).then((res) => {
      console.log("login页面调用接收到的");
      console.log(res);
      if (res.code == 200) {
      Notify('登录成功');
    }
    });
};
</script>

<style lang="scss" scoped>
.bgc {
  padding-top: 1.875rem;
  box-sizing: border-box;
  font-size: 12px;
  color: #ccc;

  hr {
    background-color: red;
    color: red;
  }

  .top {
    height: 3rem;
    font-size: 5vw;
    line-height: 4rem;
    padding-left: 1rem;
  }

  .center {
    background-color: #fff;
    border-radius: 2rem 2rem 0 0;
    padding: 1rem;
    height: 100vh;
    padding-top: 6.25rem;
  }
}
</style>