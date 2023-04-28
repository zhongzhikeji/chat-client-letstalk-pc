<template>
  <div class="editor">
    <div style="height: 8%">
      <van-nav-bar>
        <template #left>
          <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
          <span style="margin-left: 10px">新增群成员</span>
        </template>
      </van-nav-bar>
    </div>
    <div class="z-chat_content content1">
      <van-search v-model="value" placeholder="搜寻" />
      <div class="list" v-for="(item, index) in userList" :key="index">
        <div style="display: flex; align-items: center; margin-left: 10px border-bottom: 1px solid #000;">
          <van-image width="36" height="36" :src="item.avatarUrl ? item.avatarUrl:'static/20230407163657.png'" round />
          <span style="margin-left: 24px">{{ item.username }}</span>
        </div>
        <div class="m-4">
          <van-checkbox-group v-model="checked" ref="checkboxGroup">
            <van-checkbox :name="item" @click="toggle"></van-checkbox>
          </van-checkbox-group>
        </div>
      </div>

    </div>
    <div class="btn">
        <van-button block :disabled="btn" :color="keys == false ? '#7b7d83' : '#4A8AFF'" size="small"
          @click="changeAdd">新增</van-button>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUpdate, computed } from "vue";
import { findMyFriends, addgroup } from "@/request/http.api.ts";
import { useRouter } from "vue-router";
import { Toast } from "vant"
import appStore from '@/store/index.ts'
const store = appStore()
const router = useRouter()
const value = ref("");
const keys = ref(false);
const btn = ref(true);
const btnColor = ref("#");
const checked = ref([]);
const checkboxGroup = ref(null);
const userList = ref([]);
const pushList = ref([]);
const list = ["a", "b", "c"];
const onClickLeft = () => history.back();
const friend = computed(() => {
  return store.friendListgroup
})
const toggle = computed(() => {
  if (checked.value) {
    pushList.value = checked.value
  }
  if (checked.value.length > 0) {
    keys.value = true;
    btn.value = false;
  } else {
    keys.value = false;
  }
});

const getList = async () => {
  let res = await findMyFriends();
  userList.value = res.data;
  console.log(res);
};
const changeAdd = async () => {
  store.friendListgroup = pushList
  let obj = {
    gid: localStorage.getItem("groupId"),
    uids: []
  }
  friend.value.forEach(item => {
    obj.uids.push(item.id)
  })
  console.log(friend.value);
  addgroup(obj).then(res => {
    console.log(res);
    router.push("/groupmenber")
  })

};
onMounted(() => {
  getList();
});
</script>

<style lang="scss">
.van-checkbox__icon--checked .van-icon{
  background:#4A8AFF;
 border-color: transparent;
}
.van-button--block{
    border-radius: 12px;
  }
.van-search__content{
  border-radius: 10px;
}
.van-tabs__line{
  background: #4A8AFF !important;
}
.editor {
  height: 100%;

  .content1 {
    height: 92%;
    padding: 36px;
    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 18px;
      margin: 18px;
      border-bottom: 1px solid #e3e3e333;
    }

    .user {
      width: 100%;
      background-color: #eee;
      position: absolute;
      bottom: 100px;

      .list_user {
        padding: 15px;
        display: flex;

        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 20px;
        }
      }
    }
  }

  .btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 30px 36px;
    .van-button {
      height: 50px;
      font-size: 14px;
    }
  }
}
</style>
