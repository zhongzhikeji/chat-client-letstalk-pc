<template>
  <div class="editor">
    <div class="top">
      <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
      <span>群成员</span>
    </div>
    <div class="center">
      <van-search v-model="value" placeholder="搜索" shape="round" right-icon="scan" />
      <div class="member">
        <div class="item" v-for="(item, index) in userList" :key="index">
          <van-image width="35" height="35" :src=" item.avatarUrl? item.avatarUrl :'static/20230407163657.png'" />
          <p>{{ item.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
const onClickLeft = () => history.back();
import { findGroupMember } from "../../../request/http.api";
let imgSrc = ref("/src/assets/image/66680.png")
const change = function () {
  if (imgSrc.value == "/src/assets/image/21974.png") {
    imgSrc.value = "/src/assets/image/66680.png"
  } else {
    imgSrc.value = "/src/assets/image/21974.png"
  }
}
//成员列表
const userList = ref([]);
console.log(localStorage.getItem("groupId"), "1111111111111");
const list = async () => {
  let res = await findGroupMember({ groupId: localStorage.getItem("groupId") });
  console.log(res);
  userList.value = res.data;
console.log(userList.value);
};

onMounted(() => {
  list();
});
</script>

<style lang="scss" scoped>
.editor {
  background-color: #fff;
  width: 100vw;
  height: 100vh;

  .top {
    width: 750px;
    height: 178px;
    display: flex;
    padding: 102px 36px 28px 36px;
    background-color: #fff;

    span {
      width: 92%;
      text-align: center;
      font-size: 32px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #000000;
    }
  }

  .center {
    padding: 24px 36px 0;

    .member {
      padding: 24px 26px;
      display: flex;
      justify-content: left;
      flex-wrap: wrap;

      .item {
        width: 20%;
        text-align: center;
        margin-bottom: 44px;

        .van-image {
          border-radius: 4px;
          overflow: hidden;
        }

        p {
          font-size: 20px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #939395;
          margin-top: 16px;
        }
      }
    }

    .group {
      border-radius: 24px;
      overflow: hidden;
      margin-bottom: 24px;

      .list_user {
        padding: 15px;
        display: flex;
        background-color: #fff;

        .item {
          display: flex;
          align-items: center;
          margin-left: 20px;
        }
      }
    }

    .centerText {
      font-size: 20px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #939395;
      margin-left: 30px;
      margin-bottom: 14px;
    }
  }

  .footer {
    position: absolute;
    bottom: 10px;

    div {
      width: 678px;
      height: 82px;
      background: #44B5FF;
      border-radius: 20px 20px 20px 20px;
      opacity: 1;
      text-align: center;
      line-height: 82px;
    }
  }
}
</style>
