<template>
  <div class="groupSet">
    <div class="header">
      <div>
        <van-icon name="arrow-left" color="#fff" @click="onClickLeft" />
        <span style="margin-left: 10px">群组管理</span>
      </div>
    </div>
    <div class="z-chat_content content">
      <div style="margin-top: 10px;">
        <van-cell
          :border="false"
          title="管理员聊天记录保存时间"
          label="于设定时间后,将自带删除聊天室内所有成员的聊天记录,包含未读讯息"
          is-link
          value="永久"
          to="keepRecords"
        />
        
      </div>
      <div style="margin-top: 10px;">
        <van-cell
          :border="false"
          title="群组聊天背景"
          label="于设置后，将更换所有成员的聊天背景。"
          is-link
          value="永久"
          to="keepRecords"
        />
        <van-cell center title="开启机器人功能">
          <template #right-icon>
            <van-switch v-model=" groupAuthority.openBots"  size="18px"  />
          </template>
        </van-cell>
      </div>
      <div>
        <van-cell
          title="设定群组成员权限"
          title-style="font-size:14px;color:#eee"
        />
        <van-cell center title="更改群组头像">
          <template #right-icon>
            <van-switch v-model="groupAuthority.groupHead"  size="18px"  />
          </template>
        </van-cell>
      </div>
      <div>
        <van-cell center title="更改群组名称">
          <template #right-icon>
            <van-switch v-model="groupAuthority.changeGroupName"  size="18px"  />
          </template>
        </van-cell>
      </div>
      <div>
        <van-cell center title="新增成员">
          <template #right-icon>
            <van-switch v-model="groupAuthority.addGroupUser"  size="18px"  />
          </template>
        </van-cell>
      </div>
      <!-- <div>
        <van-cell center title="移除成员">
          <template #right-icon>
            <van-switch v-model="removeMember"  size="18px" @change="isChange" />
          </template>
        </van-cell>
      </div> -->
      <div>
        <van-cell center title="新增或编辑贴文">
          <template #right-icon>
            <van-switch v-model="groupAuthority.editorialPost"  size="18px"  />
          </template>
        </van-cell>
      </div>
      <div>
        <van-cell center title="允许提醒他人">
          <template #right-icon>
            <van-switch v-model="groupAuthority.remindOthers"  size="18px"  />
          </template>
        </van-cell>
      </div>
      <div>
        <van-cell center title="允许群组通话">
          <template #right-icon>
            <van-switch v-model="groupAuthority.groupCall"  size="18px"  />
          </template>
        </van-cell>
      </div>
      <div>
        <van-cell center title="允许成员私聊"
        label="成员可透过点击头像联络其他成员或查看对方
信息"
        >
          <template #right-icon>
            <van-switch v-model="groupAuthority.privateMemberChat"  size="18px"  />
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from "vue";
import appStore from '@/store/index.ts'
const store = appStore()
const groupImg = ref(false);
const groupName = ref(false);
const addMember = ref(false);
const isRobot = ref(false)
import { storeToRefs } from "pinia";
const { groupAuthority } = storeToRefs(store);
// const removeMember = ref(true);
const add = ref(false);
const isReminder = ref(false);
const isCall = ref(false);
const isPrivate = ref(false);


const onClickLeft = () => history.back();

</script>

<style lang="scss" scoped>
.van-switch--on{
  background: linear-gradient(180deg, #14BFFD 0%, #69D29A 100%);
}
.groupSet {
  background-image: url("@/assets/image/bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  .header {
    padding: 45px 50px 45px 30px;
    color: #fff;
    font-size: 1.25rem;
  }
  .content {
    height: 92%;
  }
  .btn {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
