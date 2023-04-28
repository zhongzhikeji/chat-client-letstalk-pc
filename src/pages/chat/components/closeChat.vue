<template>
  <div class="closeChat">
    <div style="height: 8%">
      <van-nav-bar>
        <template #left>
          <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
          <span style="margin-left: 10px">建立密聊</span>
        </template>
        <template #right>
          <span @click="toPersonal">下一步</span>
        </template>
      </van-nav-bar>
    </div>

    <div class="z-flex-align-center content">
      <van-uploader v-model="fileList" multiple :max-count="1" />
      <van-field
        v-model="message"
        size="large"
        :center="true"
        type="textarea"
        maxlength="30"
        placeholder="密聊名称"
        show-word-limit
      />
    </div>
    <div>
    <van-cell title="密聊描述" is-link to="describe"/>
    <van-cell
          :border="false"
          title="管理员聊天记录保存时间"
          label="于设定时间后,将自带删除聊天室内所有成员的聊天记录,包含未读讯息"
          is-link
          value="永久"
          to="keepRecords"
        />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {useRouter} from 'vue-router';
const router = useRouter()
const message = ref("");
const fileList = ref([]);
const onClickLeft = () => history.back();
const toPersonal = ()=>{
   router.push('/personalData')
}
</script>

<style lang="scss">
.closeChat {
  height: 100%;
  .content {
    margin: 0 8px;
    .van-cell {
    padding: 0;
    background: transparent;
    border-bottom: 1px solid #41b883;
  }
  .van-field__value {
    height: 30px;
    display: flex;
    justify-content: space-between;
  }
  .van-field__body {
    width: 85%;
  }
  .van-uploader__upload {
    height: 60px;
    width: 65px;
  }
  .van-field__control--min-height {
    min-height: 0 !important;
    height: 30px;
  }
  }
  .btn {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
