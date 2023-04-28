<template>
  <div class="chat_bg">
    <div class="chat">
      <div class="z-flex-justify-between headers">
        <div class="text">消息(1)</div>
        <div class="z-flex-align-center">
      
          <span style="margin: 0 17px" @click="showAdd">
            <van-icon name="plus" size="21px" color="#000" />
          </span>

          <span  @click="toRemind" style="margin-top: 5px;">
            <img
              src="../../assets/image/bell.png"
              style="width: 21px; height: 23px"
            />
          </span>
          <van-popup v-model:show="NewAdd" position="bottom">
            <div
              class="z-t-c btn_text"
              style="padding-top: 10px"
              @click="toModule('/chatContact')"
            >
              新增联络人
            </div>
            <van-divider />
            <div class="z-t-c btn_text" @click="toModule('/group')">
              建立群组
            </div>
            <van-divider />
            <div class="z-t-c btn_text" @click="toModule('/closeChat')">
              建立密聊
            </div>
            <van-divider />
            <div
              class="z-t-c"
              @click="close"
              style="color: #a5a8b6ff; padding-bottom: 15px"
            >
              取消
            </div>
          </van-popup>
        </div>
      </div>
    </div>
    <div class="chat_content">
      <div>
        <van-search
          v-model="value"
          shape="round"
          placeholder="搜索"
          @search="onSearch"
        />
      </div>

      <div style="width: 100%;margin-top: 21px;">
        <div>
          <van-tabs
            v-model:active="active"
            type="card"
            animated
            color="#3E78FEFF"
            title-inactive-color="#000"
            title-active-color="#fff"
          >
            <van-tab title="全部">
              <div
                class="z-flex-column"
                style="margin-top: 108px"
                v-if="Finalist.length <= 0"
              >
                <van-image
                  width="170"
                  height="123"
                  :src="utils.get_img_url('set/7.png')"
                />
                <div style="margin: 20px 0; font-weight: 500">暂无消息</div>
              </div>
              <van-list v-else>
                
                <div
                  @click="
                    changeChat(item.contactId, item.username, 'user', item,item.avatarUrl)
                  "
                  v-for="item in Finalist"
                >
                
                  <van-swipe-cell
                    v-if="item.groupName == null || item.groupName == ''"
                  >
              
                    <div style="padding: 10px;margin:10px" :class="[item.isSticky?'msg_item':'']" class="z-flex-justify-between">
                      <div style="display: flex">
                        <van-badge :content="item.badge" v-show="!item.isMuted">
                          <van-image
                            width="50"
                            height="50"
                            :src="item.avatarUrl ? item.avatarUrl : 'static/20230407163657.png'"
                          />
                        </van-badge>
                        <van-badge :dot="muted_msg" v-show="item.isMuted">
                          <van-image
                            width="50"
                            height="50"
                            :src="item.avatarUrl ? item.avatarUrl : 'static/20230407163657.png'"
                          />
                        </van-badge>
                        <div
                          style="
                            display: flex;
                            flex-direction: column;
                            margin-left: 20px;
                          "
                        >
                          <span style="font-size: 18px;">{{ item.username }}</span>

                          <div
                            style="
                              font-size: 14px;
                              color: #a5a8b6ff;
                              margin-top: 8px;
                            "
                            v-if="item.text != ''"
                          >
                            {{ item.text }}
                            
                          </div>
                    
                   
                       
                        </div>
                      </div>

                      <div class="time">
                        {{ utils.weChatTimeFormat(item.createdAt) }}
                      </div>
                    </div>
                    <template #right>
                      <van-button square text="标记未读" type="primary" />
                      <van-button square text="不显示" type="warning" />
                      <van-button square text="删除" type="danger" />
                    </template>
                  </van-swipe-cell>
                </div>
                <div
                  @click="
                    changeChat(
                      item.groupId,
                      item.groupName,
                      'group',
                      item,
                      item.groupHead
                    )
                  "
                  v-for="item in groupList"
                >
                  <van-swipe-cell v-if="item.groupName != null">
                    <div style="padding: 10px;margin:10px" :class="[item.isSticky?'msg_item':'']" class="z-flex-justify-between">
                      <div style="display: flex">
                        <van-badge :content="item.badge" v-show="!item.isMuted">
                          <van-image
                            width="50"
                            height="50"
                            :src="item.groupHead?item.groupHead :'static/20230407163657.png' "
                          />
                        </van-badge>
                        <van-badge :dot="muted_msg" v-show="item.isMuted">
                          <van-image
                            width="50"
                            height="50"
                            :src="item.groupHead?item.groupHead:'static/20230407163657.png'"
                      
                          />
                        </van-badge>
                        <div
                          style="
                            display: flex;
                            flex-direction: column;
                            margin-left: 20px;
                          "
                        >
                          <span style="font-size: 18px;">{{ item.groupName }}</span>

                          <div
                            style="
                              font-size: 14px;
                              color: #a5a8b6ff;
                              margin-top: 8px;
                            "
                          >
                            {{ item.text }}
                          </div>
                        </div>
                      </div>

                      <div class="time">
                        {{ utils.weChatTimeFormat(item.createdAt) }}
                      </div>
                    </div>
                    <template #right>
                      <van-button square text="标记未读" type="primary" />
                      <van-button square text="不显示" type="warning" />
                      <van-button square text="删除" type="danger" />
                    </template>
                  </van-swipe-cell>
                </div>
              </van-list>
            </van-tab>

            <van-tab title="群组">
              <div
                class="z-flex-column"
                style="margin-top: 108px"
                v-if="groupList.length <= 0"
              >
                <van-image
                  width="170"
                  height="123"
                  :src="utils.get_img_url('set/7.png')"
                />
                <div style="margin: 20px 0; font-weight: 500">暂无消息</div>
              </div>
              <van-list>
                <div
                  @click="
                    changeChat(
                      item.groupId,
                      item.groupName,
                      'group',
                      item,
                      item.groupHead
                    )
                  "
                  v-for="item in groupList"
                >
                  <van-swipe-cell v-if="item.groupName != null">
                    <div style="padding: 10px;margin:10px" :class="[item.isSticky?'msg_item':'']" class="z-flex-justify-between">
                      <div style="display: flex">
                        <van-badge :content="item.badge" v-show="!item.isMuted">
                          <van-image
                            width="50"
                            height="50"
                            :src="item.groupHead?item.groupHead :'static/20230407163657.png'"
                           
                          />
                        </van-badge>
                        <van-badge :dot="muted_msg" v-show="item.isMuted">
                          <van-image
                            width="50"
                            height="50"
                            :src="item.groupHead?item.groupHead:'static/20230407163657.png'"
                          
                          />
                        </van-badge>
                        <div
                          style="
                            display: flex;
                            flex-direction: column;
                            margin-left: 20px;
                          "
                        >
                          <span style="font-size: 18px;">{{ item.groupName }}</span>

                          <div
                            style="
                              font-size: 14px;
                              color: #a5a8b6ff;
                              margin-top: 8px;
                            "
                          >
                            {{ item.text }}
                          </div>
                        </div>
                      </div>

                      <div class="time">
                        {{ utils.weChatTimeFormat(item.createdAt) }}
                      </div>
                    </div>
                    <template #right>
                      <van-button square text="标记未读" type="primary" />
                      <van-button square text="不显示" type="warning" />
                      <van-button square text="删除" type="danger" />
                    </template>
                  </van-swipe-cell>
                </div>
              </van-list>
            </van-tab>
            <van-tab title="密聊">
              <div
                class="z-flex-column"
                style="margin-top: 108px"
                v-if="Finalist.length <= 0"
              >
                <van-image
                  width="170"
                  height="123"
                  :src="utils.get_img_url('set/7.png')"
                />
                <div style="margin: 20px 0; font-weight: 500">暂无消息</div>
              </div>
              <van-list>
                <div
                  @click="
                    changeChat(item.contactId, item.username, 'user', item,item.avatarUrl)
                  "
                  v-for="(item, index) in Finalist"
                  :key="index"
                >
                  <van-swipe-cell
                    v-if="item.groupName == null || item.groupName == ''"
                  >
                  <div style="padding: 10px;margin:10px" :class="[item.isSticky?'msg_item':'']" class="z-flex-justify-between">
                      <div style="display: flex">
                        <van-badge :content="item.badge" v-show="!item.isMuted">
                          <van-image
                            width="50"
                            height="50"
                            :src="item.avatarUrl?item.avatarUrl:'static/20230407163657.png'"
                          
                          />
                        </van-badge>
                        <van-badge :dot="muted_msg" v-show="item.isMuted">
                          <van-image
                            width="50"
                            height="50"
                            :src="item.avatarUrl?item.avatarUrl:'static/20230407163657.png'"
                          
                          />
                        </van-badge>
                        <div
                          style="
                            display: flex;
                            flex-direction: column;
                            margin-left: 20px;
                          "
                        >
                          <span style="font-size: 18px;">{{ item.username }}</span>

                          <div
                            style="
                              font-size: 14px;
                              color: #a5a8b6ff;
                              margin-top: 8px;
                            "
                          >
                            {{ item.text }}
                          </div>
                        </div>
                      </div>

                      <div class="time">
                        {{ utils.weChatTimeFormat(item.createdAt) }}
                      </div>
                    </div>
                    <template #right>
                      <van-button square text="标记未读" type="primary" />
                      <van-button square text="不显示" type="warning" />
                      <van-button square text="删除" type="danger" />
                    </template>
                  </van-swipe-cell>
                </div>
              </van-list>
            </van-tab>
          </van-tabs>
        </div>
        <div></div>
      </div>
    </div>
    <audio ref="audio">
         <source src="@/assets/msgaudio.mp3" type="audio/mpeg" />
       </audio>
  </div>

  <!-- </div>
  </div> -->
</template>
<script>
import { defineComponent } from "vue";
import appstore from "@/store/index";
export default defineComponent({
  beforeRouteEnter(to, from, next) {
    console.log(from);
    if (from.path === "/login") {
      next(() => {
        const stores = appstore();
        const { connect } = stores;
        connect();
      });
    }
    // else if(from.path === '/pageChat'){
    //   location.reload()
    // }
    else {
      next();
    }
  },
});
</script>
<script setup>
import { ref, onMounted, watch, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import {
  getInfoByToken,
  findMyFriends,
  GetRecent,
  setUserList,
} from "@/request/http.api";
import utils from "@/utils";
import appStore from "@/store/index";
import { storeToRefs } from "pinia";
const store = appStore();
const isDot = ref(false);
const { obj, messages } = storeToRefs(store);
const { send } = store;
const show = ref(false);
const NewAdd = ref(false);
const value = ref("");
const active = ref(0);
const router = useRouter();
const time = ref("");
const arr = ref("");
const Finalist = ref([]);
const groupList = ref([]);
const audio =  ref(null)
let users = ref(JSON.parse(localStorage.getItem("info")));
const muted_msg = ref(false)
const onSearch = () => {
  searchUser(value.value);
};
const searchUser = async (params) => {
  const res = await setUserList(params);
  let userArr = [];
  let groupArr = [];
  res.data.forEach((item) => {
    if (item.userId != null) {
      userArr.push(item);
      Finalist.value = userArr;
      Finalist.value.forEach((item) => {
        
      });
      console.log(Finalist.value);
    } else {
      groupArr.push(item);

      groupList.value = groupArr;
    }
  });
};

const Recent = async () => {
  const res = await GetRecent();
   console.log(res);
  res.data.forEach((item) => {
    if (item.groupName == null) {
      
      item.createdAt = Date.parse(item.recentAt);
      // item.userId = item.contactId;
      Finalist.value.push(item);
    }

    if (item.groupName != null) {
      item.createdAt = Date.parse(item.recentAt);
      
      // item.contactId = item.groupId;
      groupList.value.push(item);
    }
  });
};

watch(
  () => obj.value,
  (val) => {
    nextTick(() => {
    
      if (val.$type == "GROUP-MESSAGE") {
       
        if (val.groupName != "") {
        
          ReplaceList(val, groupList.value);
           audio.value.play()
        }
      } else if (val.$type == "") {
     
        if (val.groupName == "" || !val.groupName) {
       
          ReplaceUserList(val, Finalist.value);
          audio.value.play()
        }
      }
    });
  }
);
const msgNum = (list)=>{
  const totalScore = list.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.score;
}, 0);
}
//  替换数组操作
const ReplaceList = (data, list) => {
  const i = list.findIndex((i) => i.groupId === data.groupId);
  if (i == -1) {
    list.push(data);
  } else {
    list.forEach((item) => {
      if (item.groupId === data.groupId) {
        item.text = data.text;
        item.createdAt = data.createdAt;
        // item.badge == undefined ? (item.badge = data.badge) : item.badge++;
      
        item.badge = data.msgCount
    
        if(item.isMuted){
          muted_msg.value = true
        }
      }
    });
  }
};
const ReplaceUserList = (data, list) => {

  const i = list.findIndex((i) => i.contactId === data.userId);
  if (i == -1) {
    list.push(data);
  } else {
    list.forEach((item) => {
      if (item.contactId === data.userId) {
        item.text = data.text;
        item.createdAt = data.createdAt;
        // item.badge == undefined ? (item.badge = data.badge) : item.badge++;
        item.badge = data.msgCount
        if(item.isMuted){
          muted_msg.value = true
        }
      
      }
    });
  }
};
const changeLogin = () => {
  localStorage.clear();
  location.reload();
};
const close = () => {
  NewAdd.value = false;
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
const changeChat = (id, name, info, msg,url) => {
    
      msg.userId = users.value.id
      console.log(msg);
     if(info === 'user'){
      
       send(`private/${msg.contactId}/read`, JSON.stringify(msg));
     }else{
      console.log(msg,123);
      send(`group/${msg.groupId}/read`, JSON.stringify(msg));
     }
  router.push({
    path: "pageChat",
    query: { id: id, name: name, info ,url},
  });
};
const showPopup = () => {
  show.value = true;
};
let avatul = ref("");
avatul.value = JSON.parse(localStorage.getItem("info")).avatarUrl;
onMounted(() => {
  Recent();
});

//根据token获取信息
</script>

<style lang="scss">
.chat_bg {

  .chat_content .van-search__content {
    background-color: #f3f5f8ff !important;
    box-shadow: none !important;
  }
 
  .van-swipe-cell__right {
    right: -1px;
  }
  .van-popup--bottom{
    width: 30%;
    left: 35%;
  }
  .van-overlay{
    width: 30%;
    left: 35%;
  }
  .van-image__img,
  .van-image__error,
  .van-image__loading {
    border-radius: 8px;
  }
}

.chat {

  .headers{
    padding: 40px 36px;
    .text{
      font-size: 18px;
    
       color: #000000FF;
    }
  }
  .search-icon {
    font-size: 16px;
    line-height: inherit;
    color: #fff;
    margin-left: 6px;
  }

  // height: ;
  .van-cell {
    background-color: transparent;
    border: none;
     position: static;
  }
}

.use {
  .tab_name {
    text-align: center;
    font-size: 14px;
    margin: 15px 0;
  }

  .bg_class {
    // background: #41b883;
  }
}

.chat_content {

  .time {
    margin-right: 20px;
    font-size: 14px;
  }

  .van-search {
    background: transparent;
  }

  .van-tabs__nav--card {
    border: none;
  }

  .van-tab--card {
    border: none;
  }

  .van-tab {
    border-radius: 20px;
  }

 
  .van-tabs__nav--card {
    width: 50%;
  }
}
.van-popup--top {
  position: absolute;
  top: 70px;
  width: 28%;
  left: 72%;
  border-radius: 15px;
  transition: none;
  animation: none;      
}
.btn_text {
  color: #53adfbff;
}
.msg_item{
  background-color: #f3f5f9;
  border-radius: 20px;
}
</style>
