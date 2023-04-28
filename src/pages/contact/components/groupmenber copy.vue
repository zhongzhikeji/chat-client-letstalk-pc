<template>
     <div style="height: 8%;">
      <van-nav-bar>
        <template #left>
          <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
          <span style="margin-left: 10px;">设定</span>
        </template>

      </van-nav-bar>
    </div>
  <div class="chat_content">
    <van-search v-model="value" placeholder="搜索" shape="round" right-icon="scan" />

    <div class="wrapper">
      <div @click="showmem">
        <van-icon name="envelop-o" size="18" style="margin-right: 8px" />邀请好友
      </div>
      <van-collapse v-model="activeNames" :border="false">
        <van-collapse-item name="1" :border="false">
          <template #title>
            <div>群成员({{ userList.length }})</div>
          </template>
          <div v-for="(item, index) in userList" class="list_item" @click="showSet(item)" :key="index">
            <van-image width="50" height="50" :src="item.avatarUrl" round />
            <div style="margin-left: 10px">{{ item.username }}</div>
            <p v-if="item.isAdmin && item.isBoss == false">管理员</p>
            <p v-if="item.isBoss">群主</p>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
  <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { findGroupMember, setgroupGuilder, removegroupGuilder, removegroup } from "@/request/http.api.ts";
import { useRouter, useRoute } from 'vue-router';
import appStore from '../../../store/index'
import { Toast } from 'vant';
import { Dialog } from 'vant';
const store = appStore()
const router = useRouter()
const route = useRoute()
const show = ref(false);
const NewAdd = ref(false);
const value = ref("");
const showShare = ref(false);
const activeNames = ref(["1"]);
const onClickLeft = () => history.back();
//好友列表
const userList = ref([]);
console.log(localStorage.getItem("groupId"), "1111111111111");
const list = async () => {
  let res = await findGroupMember({ groupId: localStorage.getItem("groupId") });
  console.log(res);
    userList.value = res.data;
  
};
const addgroup = function () {
  router.push("/contact")
}
onMounted(() => {
  list();
});
//基础用法
const actions = [
  { name: '加好友' },
  { name: '设置群管理员' },
  { name: '取消群管理员' },
  { name: '踢出群聊' },
];

let userid
let userGroupArr = []
const showSet = function (item1) {
  show.value = true
  userid = item1.id
  console.log(userid);
  userGroupArr = []
  userGroupArr.push(userid)
}
const onSelect = (item) => {
  // 默认情况下点击选项时不会自动收起
  // 可以通过 close-on-click-action 属性开启自动收起
  show.value = false;
  if (item.name == "设置群管理员") {
    console.log(userGroupArr);
    setgroupGuilder({
      gid: localStorage.getItem("groupId"),
      uids: userGroupArr
    }).then(res => {
      console.log(res);
      Toast(res);
      list();
    })
  }
  if (item.name == "取消群管理员") {
    console.log(userGroupArr);
    removegroupGuilder({
      gid: localStorage.getItem("groupId"),
      uids: userGroupArr
    }).then(res => {
      console.log(res);
      Toast(res);
      list();
    })
  }
  if (item.name == "踢出群聊") {
    console.log(userGroupArr);
    removegroup({
      gid: localStorage.getItem("groupId"),
      uids: userGroupArr
    }).then(res => {
      console.log(res);
      Toast(res);
      list();
    })
  }
};
const showmem = function () {
  router.push('/addMembergroup')
}

</script>

<style lang="scss">
.contact {
  padding: 25px 25px;
}

.chat_content {
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  border: 1px solid #fff;
  background-color: #fff;

  .list_item {
    display: flex;
    align-items: center;

    p {
      margin-left: 1.875rem;
      font-size: .75rem;
    }
  }

  .wrapper {
    margin-left: 3%;

    div {

      margin-bottom: 2%;
    }

    .call {
      display: flex;
      align-items: baseline;

      .sub_title {
        font-size: 12px;
        color: #eee;
      }
    }
  }

  .van-search {
    background: transparent;
  }

  .van-search__content {
    background-color: #fff;
    box-shadow: 0 0 3px 0;
  }
}
</style> 






