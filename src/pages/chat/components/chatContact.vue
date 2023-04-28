<template>
  <div class="header">
    <div class="header_title" style="padding: 50px 20px 15px 20px; text-align: center;font-size: 20px;">
      <van-icon name="arrow-left" color="black" size="21" @click="onClickLeft" style="float: left;" />
      查找联系人
    </div>
    <van-tabs v-model:active="active" :border="false" line-width="30px">
      <van-tab title="找人">
        <div class="content">
          <div>
            <van-search v-model="value" show-action placeholder="狐狸号/手机号/群" title-style="margin-left: 10px;"
              @search="goSeach">
              <template #action>
                <div @click="goSeach">搜索</div>
              </template>
            </van-search>
          </div>
    <!--       <van-cell title="添加手机联系人" icon="phone-o" is-link />
          <van-cell title="扫一扫添加好友" icon="scan" is-link />
          <van-cell title="面对面加好友" icon="exchange" is-link />
          <van-cell title="按条件查找陌生人" icon="search" is-link />
          <van-cell title="查看附近的人" icon="location-o" is-link to="nearby"/> -->
        </div>
      </van-tab>
      <van-tab title="找群">
        <div class="centent">
          <van-search v-model="value" placeholder="狐狸号/手机号/群" title-style="margin-left: 10px;" />
          <p style="text-align: center;">完善中.....</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router";
import { quitgroup, removegroupbyleader, findGroupMember, findName } from "../../../request/http.api";
/* import { findGroupMember, setgroupGuilder, removegroupGuilder, removegroup } from "@/request/http.api.ts"; */

import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
const active = ref('')
const tabList = reactive([
  {
    name: 'user-o',
    title: '电子邮件/ID'
  },
  {
    name: 'phone-o',
    title: '电话'
  },
  // {
  //   name: 'qr',
  //   title: 'QR 图码'
  // }
])
const num = ref(0)
const changes = (key) => {
  num.value = key
}
const onClickLeft = () => history.back();
const value = ref("")
const fruInfo = ref({})
//查询好友
const onClickButton = function () {
  console.log(value.value);
  searchFriend(value.value).then(res => {
    fruInfo.value = res.data
    if (res.status !== 200) {
      Toast.fail(res.message)
    }
  }).catch(err => {

    Toast.fail(fruInfo.value)
  })

}
//显示好友信息
const showInfo = function () {
  console.log(fruInfo.value.id);
  showInfoBefore(fruInfo.value.id).then(res => {
    Toast.fail(res.message)
  })

}
//添加好友
const addFri = function () {
  console.log(fruInfo.value.id);
  addFriend({ contactId: fruInfo.value.id }).then(res => {
    
    Toast.success(res.data)
  }).catch(err => {
    console.log(11111);
    Toast.fail(fruInfo.value)
  })
}
const goSeach = function () {
  console.log(11111);

  router.push({ path: 'add', query: { searchValue: value.value } });

}
</script>

<style lang="scss" scoped>
.header {

  color: black;
 
  padding: auto;
  ::v-deep .van-tabs__line{
    background-color: #3E78FE;
  }

  
  :root:root {
    --van-tabs-bottom-bar-color: blue;
}

  /*  ::v-deep .van-tab--active {
    background-color: linear-gradient(180deg, #14bffd 0%, #69d29a 100%);
  } */

  /*   .header_title {
    color: #fff;
    font-size: 35px;
    padding: 50px 50px 50px 30px;
  }

  ::v-deep .van-tab--active {
    background-color: #eeeff3;
  }
  ::v-deep .van-tabs__nav {
    width: 150px;
    line-height: 50px;
  }

  ::v-deep #van-tabs-1-0 {
    width: 70px;
    height: 32px;
    border-radius: 28px 0px 0px 28px;
    opacity: 1;
    flex: none;
  }

  ::v-deep #van-tabs-1-1 {
    width: 70px !important;
    height: 32px;
    border-radius: 0px 28px 28px 0px;
    opacity: 1;
    flex: none;

  }

  .content {
    width: 100%;
    height: 300px;
    margin-left: -200px;
    padding: 20px 20px 0 20px;
  }

  .centent {
    width: 100%;
    height: 300px;
    margin-left: -200px;
  }

  ::v-deep .van-cell__title {
    margin-left: 10px;
  }

  ::v-deep .van-cell:after {
    border: none;
  } */

}</style>
