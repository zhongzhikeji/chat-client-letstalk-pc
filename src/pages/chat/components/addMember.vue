<template>
  <div class="editor">
    <div class="header" style="padding: 50px 20px 15px 20px">
      <div>
        <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
        <span style="margin-left: 10px">新增成员</span>
      </div>
    </div>
    <div>
   
        <van-tabs v-model:active="active" animated title-active-color="#4A8AFF"
       
        >
        <van-tab title="选人创建">
       <div style="padding: 5px 10px;"> <van-search v-model="value" placeholder="搜寻" /></div>
        
   
      <div class="list" v-for="(item, index) in userList">
        <div class="z-flex-justify-between" style="padding: 10px 10px;">
          <div style="display: flex; align-items: center; margin-left: 10px">
          <van-image
            width="36"
            height="36"
            :src="item.avatarUrl? item.avatarUrl:'static/20230407163657.png'"
            round
          />
          <span style="margin-left: 10px;">{{ item.username }}</span>
        </div>
      
        <div style="margin-right: 10px">
          <van-checkbox-group v-model="checked"  >
            <van-checkbox  :name="item" @click="toggle"  checked-color="#4A8AFF" ></van-checkbox>
          </van-checkbox-group>
        </div>
        </div>
       
      </div>
        </van-tab>
       <van-tab title="标签创建">标签</van-tab>
</van-tabs>
    
    </div>
    <div class="btn">
        <van-button
          block
          :disabled="btn"
          :color="keys == false ? '#7b7d83' : '#4A8AFF'"
          @click="changeAdd"
          >新增</van-button
        >
      </div> 
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUpdate, computed } from "vue";
import { findMyFriends } from "@/request/http.api.ts";
import { useRouter } from "vue-router";
import appStore from '@/store/index.ts'
const store = appStore()
const visible = ref(true)
const router = useRouter()
const value = ref("");
const keys = ref(false);
const btn = ref(true);
const btnColor = ref("#");
const checked = ref([]);

const userList = ref([]);
const pushList = ref([]);
// const list = ["a", "b", "c"];
const active = ref(0)
import { Toast } from 'vant';
const onClickLeft = () => history.back();

const toggle = (e) => {
   console.log(value);
  if (checked.value) {
    
     pushList.value = checked.value
     
  }
  if (checked.value.length > 0) {
    keys.value = true;
    btn.value = false;
  } else {
    keys.value = false;
  }
};
const isChange = (value)=>{
  console.log(value);
}
const getList = async () => {
  try {
    let res = await findMyFriends();
  userList.value = res.data;
  } catch (error) {
    Toast.fail('服务器响应失败')
  }

};
const changeAdd = async () => {
  pushList.value.forEach(ele=>{
    console.log(store.groupAuthority.usersId);
    store.groupAuthority.usersId.push(ele.id)
  })
  store.groupAuthority.IdArr = pushList
   router.push('/group')
};
onMounted(() => {
  getList();
});
</script>

<style lang="scss" >
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
  .content {
    height: 92%;
    .list {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
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
    width: 33%;
    position: fixed;
    left: 33.5%;
    right: 0;
    bottom: 0;
    padding: 36px;
    .van-button {
      height: 41px;
    }
  }
}
</style>
