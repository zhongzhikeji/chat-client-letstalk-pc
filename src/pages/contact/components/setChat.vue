<template>
  <div class="set">
    <div class="header">
      <van-nav-bar title="群聊设置" style="padding: 5px 0;">
        <template #left>
          <van-icon name="arrow-left" color="#000000FF" @click="onClickLeft" />
        </template>
      </van-nav-bar>
    </div>
    <div class="content">
      <!--       <div>
        <van-grid :border="false" :column-num="4">
          <van-grid-item @click="setnotDisturb">
            <van-image :src="utils.get_img_url('chatGrop/66971@3x.png')" width="48" height="48" />
            <div class="grid_text">免打扰</div>
          </van-grid-item>
          <van-grid-item>
            <van-image :src="utils.get_img_url('chatGrop/66970@3x.png')" width="50" height="50" />
            <div class="grid_text">群公告</div>
          </van-grid-item>
          <van-grid-item @click="setGroupTop">
            <van-image width="48" height="48" :src="utils.get_img_url('chatGrop/66969@3x.png')" />
            <div class="grid_text">群置顶</div>
          </van-grid-item>
          <van-grid-item>
            <van-image width="48" height="48" :src="utils.get_img_url('chatGrop/66968@3x.png')" />
            <div class="grid_text">查记录</div>
          </van-grid-item>
        </van-grid>
      </div> -->
      <div class="member">
        <div class="title">
          <div>群成员</div>
          <div style="display: flex; align-items: center; color: #939395ff">
            <div style="font-size: 12px" @click="toMember">查看{{ AlluserList.length }}名群成员</div>
            <van-icon name="arrow" color="#939395FF" size="14" />
          </div>
        </div>
        <div>
          <van-grid :border="false" :column-num="5">
            <van-grid-item v-for="(item, index) in userList" :key="index">
              <van-image :src="item.avatarUrl ? item.avatarUrl : 'static/20230407163657.png'" width="32" height="32"
                round />
              <div class="grid_name">{{ item.username }}</div>
            </van-grid-item>
            <van-grid-item @click="goRemove">
              <van-image width="32" height="32" :src="utils.get_img_url('67032.png')" />
              <div style="font-size: 12px; margin-top: 6px">移除</div>
            </van-grid-item>
            <van-grid-item @click="goInvite">
              <van-image width="32" height="32" :src="utils.get_img_url('chatGrop/66790@3x.png')" />
              <div style="font-size: 12px; margin-top: 6px">邀请</div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <van-cell title="群公告" is-link :label="!groupInfo.notice ? '未设置' : groupInfo.notice"
        :value="!groupInfo.notice ? '未设置' : ''" @click="show = true" class="gonggao" />
      <!--       <div class="application">
        <div style="padding: 12px 0 0px 12px">群公告</div>
        <div>
          <van-grid :border="false" :column-num="5">
            <van-grid-item>
              <van-image :src="utils.get_img_url('chatGrop/66985@3x.png')" width="32" height="32" />
              <div class="grid_text">群文件</div>
            </van-grid-item>
            <van-grid-item>
              <van-image :src="utils.get_img_url('chatGrop/66984@3x.png')" width="32" height="32" />
              <div class="grid_text">群相册</div>
            </van-grid-item>
            <van-grid-item>
              <van-image width="32" height="32" :src="utils.get_img_url('chatGrop/66983@3x.png')" />
              <div class="grid_text">群签到</div>
            </van-grid-item>
            <van-grid-item>
              <van-image width="32" height="32" :src="utils.get_img_url('chatGrop/66982@3x.png')" />
              <div class="grid_text">接龙统计</div>
            </van-grid-item>
            <van-grid-item>
              <van-image width="32" height="32" :src="utils.get_img_url('chatGrop/66981@3x.png')" />
              <div class="grid_text">群机器人</div>
            </van-grid-item>
          </van-grid>
        </div>
      </div> -->
      <div style="font-size: 12px; color: #939395ff; padding: 12px 0 7px 10px;background-color: #f6f6f6ff;">
        群聊信息
      </div>
      <div class="center">
        <van-cell title="群组名称/头像" is-link :value="groupInfo.groupName"
          @click="router.push({ name: 'groupName', query: { name: groupInfo.groupName } })" />
        <van-cell title="群聊和二维码" is-link :value="groupInfo.groupConnection" />
        <van-cell title="群聊链接" is-link :value="`https://foxim.lvyanhui.com/#/jumpToGroupId?groupId=${group}`"
          @click="copy" class="yangshi" />

        <van-cell title="我在群里的昵称" is-link :value="groupInfo.username" />
        <van-cell title="消息免打扰">
          <template #value>
            <van-switch v-model="checked" size="18px" @click="setnotDisturb" />
          </template>
        </van-cell>
        <van-cell title="群置顶">
          <template #value>
            <van-switch v-model="checked1" size="18px" @click="setGroupTop" />
          </template>
        </van-cell>
        <van-cell title="群聊管理" is-link value="加群设置、智能管理等" @click="toGropMg" />
        <!--  <van-cell title="群聊备注" is-link value="未设置" /> -->
      </div>
      <div style="font-size: 12px; color: #939395ff; padding: 12px 0 7px 10px;background-color:#f6f6f6">
        群管理
      </div>
      <div class="centerBom">
        <!--  <van-cell title="群聊管理" is-link value="加群设置、智能管理等" @click="toGropMg" />
        <van-cell title="群机器人" is-link value="群机器人设置" @click="toRobot" />
      </div>
      <div style="margin-top: 12px; padding-bottom: 10px">
        <van-cell title="聊天背景" is-link :value="groupInfo.groupName" />
        <van-cell title="传送已读" label="当你阅读讯息时，会传送已读的信息给对方">
          <template #value>
            <van-switch v-model="checked" size="18px" />
          </template>
        </van-cell>
        <van-cell title="聊天记录保存时间" is-link value="永久" label="于设定时间后，将自动删除所有的聊天记
        录，包含未读讯息" />
        <van-cell title="导出聊天历史记录" is-link /> -->
        <van-cell title="清空聊天记录" />
        <van-cell title="投诉" />
        <div @click="quit" style="padding-bottom: 10px; 
     
                  height: 41px;
                  background: #FFFFFF;
                  border-radius: 10px 10px 10px 10px;
                  opacity: 1;
                  color: red;
                  text-align: center;
                  line-height: 41px;
                  margin-top: 5px;
  
            "> 退出群聊</div>
      </div>
    </div>
    <van-dialog v-model:show="show" title="标题" show-cancel-button @confirm="setNotice">

      <van-field v-model="value" rows="2" autosize label="群公告" type="textarea" maxlength="50"
        :placeholder="!groupInfo.notice ? '未设置' : groupInfo.notice" show-word-limit />
    </van-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import utils from "@/utils";
import { useRouter, useRoute } from "vue-router";
import { quitgroup, removegroupbyleader, findGroupMember, findName, viewGroupSetting, groupTop, notDisturb, updateGroupInfo } from "@/request/http.api";
import { Toast } from "vant";
import clipboard3 from "vue-clipboard3";
const router = useRouter();
const route = useRoute();
const onClickLeft = () => history.back();
const checked = ref(false);
const checked1 = ref(false);
const show = ref(false);
const value = ref("");
const groupInfo = ref({})
const { toClipboard } = clipboard3();
const toMember = () => {
  console.log(11111);
  router.push("/groupmenber");
};
const goInvite = () => {
  console.log(11111);
  router.push("/addMembergroup");
};
const goRemove = () => {
  console.log(11111);
  router.push("/remove");
};
const copy = async () => {
  try {
    await toClipboard(`https://foxim.lvyanhui.com/#/jumpToGroupId?groupId=${group}`);

    Toast.success("复制成功");
  } catch (error) {
    console.log(error);
  }
};
const group = localStorage.getItem("groupId")
console.log(`https://foxim.lvyanhui.com/#/jumpToGroupId?groupId=${group}`, 123);
const quit = async () => {
  try {
    let res = await quitgroup({ groupId: localStorage.getItem("groupId") });
    router.push("/contact");
  } catch (error) {
    console.log(error.response.data);
  }




};
const removegroup = () => {
  removegroupbyleader({ groupId: localStorage.getItem("groupId") }).then(
    (res) => {
      console.log(res);
      Toast(res);
      router.push("/contact");
    }
  );
};
//查看群设置
const viewGroup = async () => {
  const res = await viewGroupSetting({ groupId: localStorage.getItem("groupId") })
  console.log(res);
  groupInfo.value = res.data
  console.log(groupInfo.value.notice);
}
//群机器人跳转
const toRobot = () => {
  router.push("/robotics");
}
//群管理跳转
const toGropMg = () => {
  router.push("/groupmanagement");
}


//群成员
//成员列表
const userList = ref([]);
const AlluserList = ref([]);
const list = async () => {
  let res = await findGroupMember({ groupId: localStorage.getItem("groupId") });
  console.log(res);
  userList.value = res.data.slice(0, 6);
  AlluserList.value = res.data;

};
//群置顶
const setGroupTop = function () {

  console.log("置顶");
  groupTop( localStorage.getItem("groupId") ).then(res => {
    console.log(res);
    Toast(res.data)
  })


}

//群免打扰
const setnotDisturb = function () {

  notDisturb(localStorage.getItem("groupId") ).then(res => {
    console.log(res);
    Toast(res.data)
  })

}
//群公告
const setNotice = function () {
  updateGroupInfo({ notice: value.value, groupId: localStorage.getItem("groupId") }).then(res => {
    console.log(res);
    viewGroup()
  })
}

onMounted(() => {
  list();
  viewGroup()
});
</script>

<style lang="scss" scoped>
.set::before {
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

.yangshi {
  ::v-deep .van-cell__value {
    width: 200px;

    span {
      color: #4A8AFF;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}

.set {
  padding-bottom: 10px;
  background: #f6f6f6ff;

  .van-switch--on {
    background: l#4A8AFF;
  }

  .content {
    margin: 24px 36px;

    .member {
      margin-top: 24px;
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 24px;

      .title {
        display: flex;
        justify-content: space-between;
        padding: 24px;
      }
    }

    .application {
      margin-top: 24px;
      background-color: #fff;
    }

    .grid_text {
      font-size: 24px;
      margin-top: 16px;
    }

    .grid_name {
      width: 12.90667vw;
      font-size: 24px;
      color: #939395ff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
  }

}

.gonggao,
.center,
.centerBom {
  border-radius: 24px;
  overflow: hidden;
}</style>
