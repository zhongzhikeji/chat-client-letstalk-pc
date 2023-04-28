<template>
  <div class="root_contact">
    <div class="contact">
      <div class="z-flex-justify-between">
        <div class="chat_header">
          <span style="color:#000000">联络人</span>
        </div>
        <div>
          <span style="margin: 0 10px; color: #000000;" @click="showAdd">
            <van-icon name="plus" size="21px" />
          </span>
        </div>
      </div>
    </div>
    <van-popup v-model:show="NewAdd" position="bottom">
      <div class="z-t-c btn_text" style="padding-top: 10px" @click="toModule('/chatContact')">
        新增联络人
      </div>
      <van-divider />
      <div class="z-t-c btn_text" @click="toModule('/group')">建立群组</div>
      <van-divider />
      <div class="z-t-c btn_text" @click="toModule('/closeChat')">建立密聊</div>
      <van-divider />
      <div class="z-t-c" @click="close" style="color: #a5a8b6ff; padding-bottom: 15px;font-size: 16px;">
        取消
      </div>
    </van-popup>
    <div class="chat_content">
      <van-search v-model="value" shape="round" placeholder="搜索" @search="onSearch" />
      <!--     <div class="wrapper">
        <div class="z-flex-align-center" @click="router.push('/nearby')">
          <img src="../../assets/image/66574.png" class="img" />
          寻找附件的人
        </div>
           <div class="call">
          <div>
            <img src="../../assets/image/66575.png" class="img" />
          </div>
          <div>
            <div>同步电话联系人</div>
            <div class="sub_title">允许手机同步联络人</div>
          </div>
        </div> 
        <div @click="share" class="z-flex-align-center">
          <img src="../../assets/image/66576.png" class="img" />
          邀请好友
        </div>
      </div> -->
      <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
    </div>
    <div class="bgca">

      <van-tabs v-model:active="active" @click-tab="change" type="card" color="#3E78FEFF" title-inactive-color="#000"
        title-active-color="#fff">

        <van-tab title="联系人" :title-class="active == 0 ? 'activeName' : ''">
          <div class="z-flex-column" style="margin-top: 50px;" v-if="Object.values(userList).length <= 0">
            <van-image width="170" height="123" :src="utils.get_img_url('set/7.png')" />
            <div style="margin: 15px 0;font-size: 18px;">暂无联系人,请前往添加</div>
            <div>
              <van-button class="btn" color="#44B5FFFF" @click="btnUser">添加</van-button>
            </div>
          </div>

          <div :name="0" v-else>
            <van-index-bar :index-list="Object.keys(userList)" :sticky="false">
              <div v-for="(item, index) in Object.entries(userList)">
                <van-index-anchor :index="item[0]" :key="index">{{ item[0] }}
                </van-index-anchor>
                <van-cell v-for="i in item[1]" @click="toChat(i, 'user')">
                  <van-image width="36" height="36" round :src="i.avatarUrl ? i.avatarUrl:'static/20230407163657.png'" />
                  <span class="text">{{ i.username }}</span>
                </van-cell>
              </div>
            </van-index-bar>
          </div>
        </van-tab>
        <van-tab title="群组" :title-class="active == 1 ? 'activeName' : ''">
          <div class="z-flex-column" style="margin-top: 50px;" v-if="groupList.length <= 0">
            <van-image width="170" height="123" :src="utils.get_img_url('set/7.png')" />
            <div style="margin: 15px 0;font-size: 18px;">暂无群组,请前往创建</div>
            <div>
              <van-button class="btn" color="#44B5FFFF" @click='btnGroup'>添加</van-button>
            </div>
          </div>
          <div :name="1" v-for="(item, index) in groupList" @click="toChatGroup(item, 'group')">
            <van-cell>
              <van-image width="47" height="47" :src="item.groupHead ? item.groupHead:'static/group.png'" />
              <span class="text" style="position: relative; top: -10px;">{{ item.name }}</span>
            </van-cell>
          </div>
        </van-tab>
        
        <div class="tishi" style="width: 10px; height: 10px;" v-if="addList.length > 0"></div>
        <van-tab title="新增加" :title-class="active == 2 ? 'activeName' : ''">
          <div>
           

            <div class="z-flex-column" style="margin-top: 50px;" v-if="addList.length <= 0">
              <van-image width="170" height="123" :src="utils.get_img_url('set/7.png')" />
              <div style="margin: 15px 0;font-size: 18px;">暂无增加申请</div>
            </div>
            <div class="item" v-for="item in addList" v-if="addList.length">
              <div class="topItem">
                <div class="avator" style="width: 40px;">
                  <img :src="item.avatarUrl ? item.avatarUrl:'static/20230407163657.png'" alt="" style="width: 100%;">
                </div>
                <div class="name">
                  <p>{{ item.friendName }}</p>
                </div>
                <div class="btn" style="margin-right: 20px;"
                  @click="router.push({ path: '/personInfo', query: { id: item.userId } })">查看</div>
              </div>
            </div>
          </div>
        </van-tab>
        <!--   <van-tab title="群通知" :title-class="active == 3 ? 'activeName' : ''">
          <div>
            <div class="z-flex-column" style="margin-top: 50px;">
              <van-image width="170" height="123" :src="utils.get_img_url('7(1).png')" />
              <div style="margin: 15px 0;">暂无群通知</div>
            </div>
          </div>
        </van-tab> -->
      </van-tabs>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated,watch } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { findMyFriends, findGroup, friReList, agreeFri } from "@/request/http.api.ts";
import { IndexBar, IndexAnchor } from "vant";
import utils from "@/utils";
import appStore from "@/store/index";
import { storeToRefs } from "pinia";

const store = appStore();
const { abc } = storeToRefs(store);
const show = ref(false);
const NewAdd = ref(false);
const value = ref("");
const showShare = ref(false);
const activeNames = ref(["1"]);
const active = ref(0);
const router = useRouter();
//好友列表
const userList = ref([]);
//群组
const groupList = ref([]);
const addList = ref([]);
//新增加
const btnUser = () => {
  router.push("/chatContact");
}
const btnGroup = () => {
  router.push("/group");
}
const list = async () => {
  let Initials;
  let res = await findMyFriends();
  // 存放所有联系人
  let AllContactPerson = {};
  res.data.map((item) => {
    if (
      item.pinyinUserName[0].toUpperCase() >= "A" &&
      item.pinyinUserName[0].toUpperCase() <= "Z"
    ) {
      Initials = item.pinyinUserName[0].toUpperCase();
    } else {
      Initials = "#";
    }
    console.log(Initials);
    // 如果项目集合里面有当前字母项则直接push一个对象如果没有则创建一个新的并赋值;
    if (AllContactPerson[Initials]) {
      AllContactPerson[Initials].push(item);
    } else {
      AllContactPerson[Initials] = [item];
    }
  });
  userList.value = AllContactPerson;
  console.log(userList.value);
};
const getGroup = async () => {
  let res = await findGroup();
  groupList.value = res.data;
  console.log(groupList.value);
};

const options = [
  { name: "微信", icon: "wechat" },
  { name: "微博", icon: "weibo" },
  { name: "复制链接", icon: "link" },
  { name: "分享海报", icon: "poster" },
  { name: "二维码", icon: "qrcode" }
];


const close = () => {
  console.log(123);
  NewAdd.value = false;
};
const onSelect = (option) => {
  Toast(option.name);
  showShare.value = false;
};
const share = () => {
  showShare.value = true;
};
const toChat = (item, info) => {
  console.log(item);
  router.push({
    path: "pageChat",
    query: { id: item.id, name: item.pinyinUserName, info, url: item.avatarUrl },
  });
};
const toChatGroup = (item, info) => {

  localStorage.setItem("groupId", item.id);
  router.push({
    path: "pageChat",
    query: { id: item.id, name: item.name, info },
  });
};

//编辑已读页面
const toEditor = () => {
  router.push("/editor");
};
//提醒
const toRemind = () => {
  router.push("/remind");
};
const toModule = (key) => {
  router.push(key);
  NewAdd.value = false;
};
//添加
const showAdd = () => {
  NewAdd.value = true;
};

const showPopup = () => {
  show.value = true;
};
const addListfun = function () {
  friReList().then(res => {
    console.log(res, 123456787);
    addList.value = res.data
  })
}
let infoList=ref([])
watch(
  ()=>abc.value,
  (val)=>{
    console.log("监听");
    addListfun()
    
  }
)
onActivated(() => {
  getGroup();
  list();
  addListfun()
});
//dianji 标签
const change = function () {
  console.log(active.value);
  console.log(active.value == 0);
};
//联系人列表
</script>

<style lang="scss" >
.root_contact {

  .van-index-bar__sidebar{
    top:30%;
    right: 35%;
  }
  .van-popup--bottom{
    width: 30%;
    left: auto;
  }
  .van-overlay{
    width: 30%;
    left: auto;
  }
  .btn {
    width: 240px;
    height: 64px;
    background: #44B5FF;
    border-radius: 20px 20px 20px 20px;
    opacity: 1;
    text-align: center;
    line-height: 64px;
  }

  .chat_content .van-search__content {
    background-color: #f3f5f8ff !important;
    box-shadow: none !important;
  }

  .van-tabs__nav--card {
    border: none;
  }

  .van-tab--card {
    border: none;
  }

  .van-tab {
    border-radius: 20px;
    margin-right: 5px;
  }

  .van-tabs__nav--card {
    width: 60%;
    margin: 0;
  }

  .chat_header {
    span {
      font-size: 18px;
    }
  }

  .chat_content {

    .van-search {
      background: transparent;
    }


  }




  .van-index-bar__index {
    padding: 4px;
  }
}

.contact {
  padding: 38px 30px 41px 36px;
  color: #fff;
}

.btn_text {
  color: #53adfbff;
  font-size: 16px;
}

.chat_content {
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  border: 1px solid #fff;
  background-color: #fff;

  .list_item {
    display: flex;
    align-items: center;
  }

  .wrapper {
    margin-left: 25px;

    .img {
      width: 45px;
      height: 45px;
      margin-right: 42px;
      margin-left: 14px;
    }



    .call {
      display: flex;
      align-items: center;

      .sub_title {
        font-size: 14px;
        color: #a5a8b6ff;
      }
    }
  }


}

.bgca {
  width: 100%;
  padding: 10px 35px;
  padding-top: 30px;


  .text {
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #000000;
    margin-left: 24px;
    position: absolute;
    top: 13px;
  }

  /* 
  .van-tab {
    width: 94px;
    margin-right: 24px;
    padding: 0px 5px;
    font-size: 12px;
    background: #fff;
    color: #000;
    height: 24px;
    border-radius: 12px;
    opacity: 1;


    .van-tab__text {

      position: absolute;
      z-index: 999;
      opacity: 1;
      color: #000;
    }

    .van-tab--active {
      ::v-deep .van-tab__text {
        color: #fff;
      }
    }
  }

  .activeName {

    background: #3E78FE;
    border-radius: 24px;
    opacity: 1;
    padding: 0px 5px;
  } */


  /* .van-tab--active {
    background: #3E78FE;
    border-radius: 28px;
    padding: 0 18px;
    color: #fff;
    
  } */

  .item {
    background-color: #fff;
    padding-left: 36px;
    padding-top: 20px;
    padding-bottom: 34px;
    margin-bottom: 20px;

    .topItem {
      display: flex;

      .avator {
        width: 88px;
        height: 88px;

      }

      .name {
        flex: 1;
        margin-left: 16px;
        line-height: 36px;
        margin-top: 30px;

        .time {
          font-size: 24px;
          color: #A5A8B6;
          margin-top: 4px;
        }
      }

      .btn {
        width: 112px;
        height: 52px;
        border-radius: 12px 12px 12px 12px;
        opacity: 1;
        border: 0.5px solid #e7e7e7;
        text-align: center;
        line-height: 52px;
        font-size: 24px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #000000;
        position: relative;
        top: 1.66667vw;

      }
    }


  }

  .tishi {
    
    background-color: red;
    border-radius: 50%;
    position: absolute;
    left: 49.33333vw;
    top: -0.66667vw;
  
  }


}
</style>
