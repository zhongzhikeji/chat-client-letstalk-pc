<template>
  <div class="retransmission">
    <div class="top">
      <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
      <span>自动转发</span>
    </div>
    <div class="center">
      <div class="group">
        <div class="text">设置转发规则</div>
        <van-collapse v-model="activeNames">
          <van-collapse-item title="转发开启" name="1" style="font-size: 14px">
            <template #right-icon>
              <span style="
                                font-size: 12px;
                                color: #939395;
                                margin-right: 25px;
                                margin-top: 6px;
                              ">仅群主或管理员可配置或开启</span>

              <van-switch v-model="forward" active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)"
                inactive-color="#dcdee0" size="20px" @click="infoSet" />
            </template>
          </van-collapse-item>
          <van-collapse-item title="只在时间段开启" name="1" style="font-size: 14px">
            <template #right-icon>
              <van-switch v-model="timeEnable" @change="tabTime"
                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)" inactive-color="#dcdee0" size="20px"
                @click="infoSet" />
            </template>
          </van-collapse-item>
          <div class="time" @click="startTime" v-show="timeLoop">
            <div class="time_item">
              <div>开始时间</div>
              <div style="display: flex">
                <div>{{ startValue ? startValue : "请选择" }}</div>
                <div>
                  <van-icon name="arrow" />
                </div>
              </div>
            </div>
          </div>
          <div class="time" @click="endTime" v-show="timeLoop">
            <div class="time_item">
              <div>结束时间</div>
              <div style="display: flex">
                <div>{{ endValue ? endValue : "请选择" }}</div>
                <div>
                  <van-icon name="arrow" />
                </div>
              </div>
            </div>
          </div>
          <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
            <van-datetime-picker type="time" cancel-button-text="设置信息源成员" @confirm="startConfirm" />
          </van-popup>
          <van-popup v-model:show="endShow" position="bottom" :style="{ height: '30%' }">
            <van-datetime-picker type="time" cancel-button-text="结束时间" @confirm="endConfirm" />
          </van-popup>
          <van-collapse-item title="设置信息源成员" name="1" @click="goInfro">
            <template #right-icon>
              <van-icon name="arrow" style="margin-top: 5px; margin-left: 5px" />
            </template>
            <template #value>
              <span style="font-size: 12px">设置</span>
            </template>
          </van-collapse-item>
          <van-collapse-item title="设置转发目标" name="1" @click="goremind">
            <template #right-icon>
              <van-icon name="arrow" style="margin-top: 5px; margin-left: 5px" />
            </template>
            <template #value>
              <span style="font-size: 12px">设置</span>
            </template>
          </van-collapse-item>
        </van-collapse>
        <div class="text">转发类型设置</div>
        <van-collapse>
          <van-collapse-item title="文字" name="1" style="font-size: 14px">
            <template #right-icon>
              <van-switch v-model="text" @change="tabTime"
                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)" inactive-color="#dcdee0" size="20px"
                @click="infoSet" />
            </template>
          </van-collapse-item>
          <van-collapse-item title="语音" name="1" style="font-size: 14px">
            <template #right-icon>
              <van-switch v-model="audio" @change="tabTime"
                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)" inactive-color="#dcdee0" size="20px"
                @click="infoSet" />
            </template>
          </van-collapse-item>
          <van-collapse-item title="图片" name="1" style="font-size: 14px">
            <template #right-icon>
              <van-switch v-model="image" @change="tabTime"
                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)" inactive-color="#dcdee0" size="20px"
                @click="infoSet" />
            </template>
          </van-collapse-item>
          <van-collapse-item title="小视频" name="1" style="font-size: 14px">
            <template #right-icon>
              <van-switch v-model="shortVideo" @change="tabTime"
                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)" inactive-color="#dcdee0" size="20px"
                @click="infoSet" />
            </template>
          </van-collapse-item>
          <van-collapse-item title="文章" name="1" style="font-size: 14px">
            <template #right-icon>
              <van-switch v-model="article" @change="tabTime"
                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)" inactive-color="#dcdee0" size="20px"
                @click="infoSet" style="position: relative; top: 10px;" />
            </template>
          </van-collapse-item>
          <van-collapse-item title="名片" name="1" style="font-size: 14px">
            <template #right-icon>
              <van-switch v-model="card" @change="tabTime"
                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)" inactive-color="#dcdee0" size="20px"
                @click="infoSet" />
            </template>
          </van-collapse-item>
          <van-collapse-item title="动画表情" name="1" style="font-size: 14px">
            <template #right-icon>
              <van-switch v-model="emoji" @change="tabTime"
                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)" inactive-color="#dcdee0" size="20px"
                @click="infoSet" />
            </template>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getBoID, botInfo } from "@/request/http.api.ts";
const router = useRouter();
const route = useRoute();
const onClickLeft = () => history.back();
let timeLoop = ref()
let forward = ref(false);
let timeEnable = ref(false);
let text = ref(false);
let audio = ref(false);
let image = ref(false);
let shortVideo = ref(false);
let article = ref(false);
let card = ref(false);
let emoji = ref(false);
let id = ref("")
const startValue = ref("");
const endValue = ref("");
//群机器人信息

getBoID(localStorage.getItem("groupId")).then(res => {
  console.log(res);
  id.value = res.data.id
  forward.value = res.data.autoForward.forward
  timeEnable.value = res.data.autoForward.timeEnable
  text.value = res.data.autoForward.text
  image.value = res.data.autoForward.image
  shortVideo.value = res.data.autoForward.shortVideo
  article.value = res.data.autoForward.article
  card.value = res.data.autoForward.card
  emoji.value = res.data.autoForward.emoji
  audio.value = res.data.autoForward.audio
  console.log(obj, 1111);
})
let obj = ref({
  forward: forward.value,
  timeEnable: timeEnable.value,
  text: text.value,
  audio: audio.value,
  image: image.value,
  shortVideo: shortVideo.value,
  article: article.value,
  card: card.value,
  emoji: emoji.value,
  groupId: localStorage.getItem("groupId"),
  startTime: startValue.value,
  endTime: endValue.value,
})
const show = ref(false);
const endShow = ref(false);
const startTime = () => {
  show.value = true;
};
const endTime = () => {
  endShow.value = true;
};
const goInfro = () => {
  router.push("/information")
};
const goinfo = () => {
  router.push("/info")
};
const goremind = () => {
  router.push("/target")
};
const startConfirm = (value) => {
  startValue.value = value;
  show.value = false;
};
const endConfirm = (value) => {
  endValue.value = value;
  endShow.value = false;
};
const tabTime = (value) => {
  value ? timeLoop.value = true : timeLoop.value = false
}

//设置

const infoSet = function () {
  obj = {
    forward: forward.value,
    timeEnable: timeEnable.value,
    text: text.value,
    audio: audio.value,
    image: image.value,
    shortVideo: shortVideo.value,
    article: article.value,
    card: card.value,
    emoji: emoji.value,
    groupId: localStorage.getItem("groupId"),
    startTime: startValue.value,
    endTime: endValue.value,
    id: id.value
  }
  console.log(obj, 'index');
  botInfo(obj).then(res => {
    console.log(res);
  })
}
</script>

<style lang="scss">
.retransmission {
  background-color: #f6f6f6;
  width: 100vw;
  height: 100vh;

  .van-picker__cancel {
    color: #000000;
  }

  .van-picker__confirm {
    color: #44b5ffff;
  }

  .top {
    width: 750px;
    height: 120px;
    display: flex;
    align-items: center;
    padding: 45px 36px 28px 36px;
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

    .group {
      border-radius: 24px;
      overflow: hidden;
      margin-bottom: 24px;

      .van-switch--on {
        background: linear-gradient(180deg, #14bffd 0%, #69d29a 100%);

      }

      .text {
        font-size: 24px;
        color: #939395FF;
        margin-top: 24px;
        margin-bottom: 12px;
      }

      ::v-deep .van-cell__title {
        margin-top: 5px;
      }
    }

    .time {
      background-color: #fff;
      padding: 10px 24px;
      font-size: 24px;

      .time_item {
        display: flex;
        justify-content: space-between;
        background: #f7f8f9ff;
        padding: 18px 24px 18px 34px;
        color: #939395ff;
      }
    }
  }
}
</style>
