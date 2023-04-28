<template>
  <div class="userSet">
    <div>
      <van-nav-bar title="单聊管理主页面">
        <template #left>
          <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
        </template>
      </van-nav-bar>
    </div>
    <div class="content">
    
        <div class="name_wrapper">
        
            <div class="z-flex">
              <div class="z-flex-column" style="margin-right: 20px;">
                <van-image
                width="36"
                height="36"
                :src="route.query.url ? route.query.url :'static/20230407163657.png'"
                round
              />
              <div class="user_text">{{ route.query.name }}</div>
              </div>
            <div class="z-flex-column" @click="toGroup">
              <van-image
                width="36"
                height="36"
                :src="utils.get_img_url('66986.png')"
                round
              />
              <div class="group_text">发起群聊</div>
            </div>
            </div>
          <div>
            
          </div>
        
        </div>
      
    
      <div style="margin-top: 20px">
        <van-cell title="设置好友备注" is-link :value="route.query.name"  @click="toRemarks" />

        <van-cell center title="设为置顶">
          <template #right-icon>
            <van-switch v-model="checkedTop" size="18px"  @change="changTop"/>
          </template>
        </van-cell>
        <van-cell center title="消息免打扰">
          <template #right-icon>
            <van-switch v-model="disturb" size="18px" @change="changeDis"/>
          </template>
        </van-cell>
<!-- 
        <van-cell center title="阅后即焚" label="当消息已读后，阅后即焚讯息会自动销毁">
          <template #right-icon>
            <van-switch v-model="checked_burn" size="18px" @change="burn" />
          </template>
        </van-cell> -->
        <!-- <div class="slider" v-show="isSlider">
          <div class="z-flex-justify-between">
            <div>消息已读后自动销毁</div>
            <div style="color: #44B5FFFF;">{{ num }}秒</div>
          </div>
          <div style="margin-top: 20px;">
            <van-slider v-model="num" active-color="#44B5FFFF" bar-height="15px">
              <template #button>
                <div class="custom-button">{{ num }}</div>
              </template>
            </van-slider>
          </div>
        </div> -->

        <!-- <van-cell title="申请清空双方记录" is-link value="申请" label="对方同意将会同时永久删除双方的聊天记录" />
        <van-cell title="聊天记录保存时间" label="于设定时间后,将自带删除聊天室内所有成员的聊天记录,包含未读讯息" is-link value="永久" />
        <van-cell title="清空聊天记录" is-link /> -->
        <van-cell title="投诉举报" is-link />
      </div>

    </div>
    <div @click="deleteFri" class="btn">
      <!-- <van-button plain style="width: 100%; color: #f40; font-size: 14px;" @click="blackFri">拉黑好友</van-button> -->
      <van-button plain style="width: 100%; color: #f40; font-size: 14px; margin-top: 10px;" @click="deleteFri">删除好友</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { deleteFriend, blackFriend, contactTop } from "../../../request/http.api";

import { useRouter, useRoute } from "vue-router";
import { Notify,Toast } from "vant";
import utils from "@/utils";
const router = useRouter();
const route = useRoute();
const checkedTop = ref(false);
const disturb = ref(false);
const value = ref("");
const isSlider = ref(false)
const num = ref(10);
const checked_burn = ref(false)

const onClickLeft = () =>{
  findTop()
  history.back();
} 
// const burn = (value) => {
//   value ? isSlider.value = true : isSlider.value = false
// }
//好友置顶

// console.log(disturb.value);
const changTop = (value)=>{
  checkedTop.value = value
}
const changeDis = (value)=>{

  disturb.value = value
}
const findTop = async ()=>{
  const res  = await contactTop({ 
      contactId:route.query.id,
      isSticky:checkedTop.value,
      isMuted:disturb.value
    
  
  })
  console.log(res);
}

//删除好友
const deleteFri = function () {
  console.log(route.query.id );
  deleteFriend( route.query.id ).then((res) => {
    console.log(res.data);
    Toast(res.data);
    router.push("/contact")
  }).catch(res => {
    Toast(res.response.data);

  });
};
//拉黑好友
const blackFri = function () {
  blackFriend({ contactId: route.query.id }).then((res) => {
    console.log(res.data);
    Toast(res.data);
    router.push("/contact")
  }).catch(res => {
    Toast(res.response.data);

  });
};
const toRemarks = ()=>{
  router.push({
    path: "userRemarks",
    query: { name: route.query.name,url:route.query.url,id:route.query.id },
  });
}
const toGroup = ()=>{
  console.log(222);
  router.push('/group')
}
onMounted(() => {

 

})
</script>

<style lang="scss" scoped>
// .van-switch--on {
//   background: linear-gradient(180deg, #14bffd 0%, #69d29a 100%);
// }

.userSet::before {
  content: '';
  position: fixed;
  z-index: -1;
  background-size: 100% auto;
  background-color: #f6f6f6ff;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0px;
  margin: 0px;
}

.userSet {
  background: #f6f6f6ff;

  padding-bottom: 30px;

  .custom-button {
    width: 50px;
    color: #fff;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    background-color: #44B5FFFF;
    border-radius: 50%;
  }

  .slider {
    background-color: #fff;
    padding: 24px;

  }

  .content {
    margin: 24px 36px;

  
      .name_wrapper {
        padding: 30px 24px;
        background: #fff;
        border-radius: 24px;
        // box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.16);
      }
    
  }

  .btn {
    position: fixed;
    bottom: 20px;
    width: 100%;
    padding: 10px 36px;
    // margin: 10px 36px;

  }
  .user_text{
    font-size: 16px;
    margin-top: 12px;
  }
  .group_text{
    color: #4A8AFFFF;
    font-size: 16px;
    margin-top: 12px;
  }
}
</style>
