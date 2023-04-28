<template>
  <div class="pageChat">
    <van-sticky>
      <div class="header">
        <div v-if="route.query.info == 'group'" class="title">
          <van-icon
            name="arrow-left"
            size="25px"
            @click="refund"
            v-show="!isForward"
          />
          <span class="title_size" v-show="!isForward">
            {{ users.groupName }}</span
          >
          <span v-show="!isForward">({{ users.groupUserSize }})</span>
          <span @click="isForward = false" v-show="isForward">取消</span>
        </div>
        <div v-else class="title">
          <van-icon
            name="arrow-left"
            size="25px"
            @click="refund"
            v-show="!isForward"
          />
          <span v-show="!isForward"> {{ route.query.name }}</span>
          <span @click="isForward = false" v-show="isForward">取消</span>
        </div>

        <van-icon
          name="wap-nav"
          size="25px"
          @click="setList"
          v-if="route.query.info == 'group'"
          style="margin-right: 10px"
        />
        <van-icon
          name="wap-nav"
          size="25px"
          @click="goset"
          style="margin-right: 10px"
          v-else
        />
      </div>
    </van-sticky>
 
    <div class="content" ref="room" @click="clickIscop">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <DynamicScroller
          :items="messages"
          :min-item-size="220"
          class="scroller"
        >
          <template v-slot="{ item, index, active }">
            <DynamicScrollerItem
              :item="item"
              :active="active"
              :size-dependencies="[item.text]"
           
            >
              <div>
                <div class="chat">
                  <div v-if="item.userId == userId.id">
                    <div
                      class="dt"
                      v-show="
                        index - 1 >= 0
                          ? messages[index - 1].createdAt <
                            item.createdAt - 60000
                          : true
                      "
                    >
                      {{ utils.weChatTimeFormat(Number(item.createdAt)) }}
                    </div>

                    <div :class="[isForward ? 'z-flex-justify-between' : '']">
                      <van-checkbox
                        :name="item"
                        ref="checkbox"
                        v-show="isForward"
                      ></van-checkbox>
                      <div class="chat-send">
                        <div>
                          <van-image
                            width="40"
                            height="40"
                            round
                            :src="item.avatarUrl?item.avatarUrl:'static/20230407163657.png'"
                          />
                        </div>

                        <van-popover
                          theme="dark"
                          trigger="manual"
                          v-model:show="messages[item.id]"
                          placement="top"
                        >
                          <div class="z-flex-center">
                            <div
                              class="item_text"
                              @click="
                                copy(item);
                                messages[item.id] = false;
                              "
                            >
                              <van-image
                                :src="utils.get_img_url('pageChat/d01.png')"
                              />
                              <div>复制</div>
                            </div>
                            <div class="item_text" @click="clickForward">
                              <van-image
                                :src="utils.get_img_url('pageChat/d02.png')"
                              />
                              <div>转发</div>
                            </div>
                            <div
                              class="item_text"
                              @click="onSelects(item, index)"
                              v-if="!checkIfTimeExpired(item.createdAt)"
                            >
                              <van-image
                                :src="utils.get_img_url('pageChat/d04.png')"
                              />
                              <div>撤回</div>
                            </div>

                            <!-- <div class="item_text">
                          <van-image :src="utils.get_img_url('pageChat/d05.png')" />
                          <div>多选</div>
                        </div> -->
                          </div>

                          <template #reference>
                            <div v-if="item.videoUrl != null && item.videoUrl != ''" style="margin-right: 10px;"><vue3VideoPlay 
                                width= '200px'
                                height='300px'
                                color="#409eff"
                                :control= false
                                :src="item.videoUrl" 
                              /></div>
                            <div v-show="item.imgUrl != null && item.imgUrl != ''" style="margin-right: 10px;">
                                <van-image
                                :src="item.imgUrl"
                                width="150"
                                height="150"
                                @click="getImg(item.imgUrl)"
                              />
                              </div>
                             
                              <div class="document-message"  v-show="item.documentUrl != null && item.documentUrl != ''" @click.prevent="downloadDocument(item.documentUrl)" style="margin-right: 10px;">
                               <div class="z-flex-justify-between document_wpr">
                                <div class="z-line-1" >{{ item.fileName }}</div>
                                <van-image
                                :src="utils.get_img_url('pageChat/document.png')"
                                width="40"
                                height="40"
                          
                              />
                               </div>
                            </div>
                            <div
                              @touchstart.native="gtouchstart(item.id)"
                              @touchend="end()"
                
                            >
                              <div  class="user_msg"  v-show="item.text != '' && item.text != '[语音消息]' &&
                              item.text != '[图片消息]' && item.text != '[视频消息]' && item.text != '[文件消息]'
                             ">
                                {{ item.text }}
                                
                              </div>
                           
                              <!-- 语音 -->
                              <div @click.prevent="handlePlayAudio(index)" v-show="item.audio != null" class="user_msg">
                                <div
                                  class="z-flex-justify-end"
                                  :style="{ width: item.width + 'px' }"
                                >
                                  <div class="right_text">
                                    {{ item.audioTime }}
                                  </div>

                                  <img
                                    :src="
                                      item.playing
                                        ? utils.get_img_url(
                                            'pageChat/audio2.gif'
                                          )
                                        : utils.get_img_url('pageChat/laba.png')
                                    "
                                    class="audio_img"
                                  />
                                </div>
                                <audio
                                  ref="audios"
                                  @ended="onAudioEnded()"
                                >
                                  <source :src="item.audio" type="audio/mpeg" />
                                </audio>
                              </div>
                            </div>
                          </template>
                        </van-popover>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div
                      class="dt"
                      v-if="
                        index - 1 >= 0
                          ? messages[index - 1].createdAt <
                            item.createdAt - 60000
                          : true
                      "
                    >
                      {{ utils.weChatTimeFormat(Number(item.createdAt)) }}
                    </div>
                    <div class="z-flex-align-center">
                      <van-checkbox
                        :name="item"
                        ref="checkbox"
                        v-show="isForward"
                      ></van-checkbox>
                      <div class="chat-recv">
                        <div
                          class="z-flex-align-center"
                          style="margin-right: 10px"
                        ></div>

                        <div>
                          <van-image
                            width="40"
                            height="40"
                            round
                            :src="item.avatarUrl?item.avatarUrl:'static/20230407163657.png'"
                          />
                          
                        </div>
                        <van-popover
                          theme="dark"
                          trigger="manual"
                          v-model:show="messages[item.id]"
                          placement="top"
                        >
                          <div class="z-flex-center">
                            <div
                              class="item_text"
                              @click="
                                copy(item);
                                messages[item.id] = false;
                              "
                            >
                              <van-image
                                :src="utils.get_img_url('pageChat/d01.png')"
                              />
                              <div>复制</div>
                            </div>
                            <div class="item_text" @click="clickForward">
                              <van-image
                                :src="utils.get_img_url('pageChat/d02.png')"
                              />
                              <div>转发</div>
                            </div>
                            <div
                              class="item_text"
                              @click="onSelects(item, index)"
                              v-if="!checkIfTimeExpired(item.createdAt)"
                            >
                              <van-image
                                :src="utils.get_img_url('pageChat/d04.png')"
                              />
                              <div>撤回</div>
                            </div>

                            <!-- <div class="item_text">
                          <van-image :src="utils.get_img_url('pageChat/d05.png')" />
                          <div>多选</div>
                        </div> -->
                          </div>

                          <template #reference>
                            <!-- 私聊 -->
                            <div
                              style="display: flex; flex-direction: column"
                              v-if="item.username"
                              @touchstart.native="gtouchstart(item.id)"
                              @touchend="end()"
                            >
                     
                              <div class="row_name">{{ item.username }}</div>
                              <div v-if="item.videoUrl != null && item.videoUrl != ''" style="margin-left: 10px;"><vue3VideoPlay 
                                width= '200px'
                                height='300px'
                                color="#409eff"
                                :control= false
                                :src="item.videoUrl" 
                              /></div>
                              <div v-show="item.imgUrl != null && item.imgUrl != ''" style="margin-left: 10px;">
                                <van-image
                                :src="item.imgUrl"
                                width="150"
                                height="150"
                                @click="getImg(item.imgUrl)"
                              />
                              <div class="document-message"  v-show="item.documentUrl != null && item.documentUrl != ''" @click.prevent="downloadDocument(item.documentUrl)" style="margin-left: 10px;">
                               <div class="z-flex-justify-between document_wpr">
                                <div class="z-line-1" >{{ item.fileName }}</div>
                                <van-image
                                :src="utils.get_img_url('pageChat/document.png')"
                                width="40"
                                height="40"
                          
                              />
                               </div>
                            </div>
                              </div>
                              <div class="row_msg"   v-show="item.text != '' && item.text != '[语音消息]' &&
                              item.text != '[图片消息]' && item.text != '[视频消息]'&& item.text != '[文件消息]'
                             ">
                                {{ item.text }}
                              </div>
                              <div class="row_msg"  v-show="item.audio != null">
                                 
                                <div @click.prevent="handlePlayAudio(index)">
                                  <div
                                    class="z-flex-align-center"
                                    :style="{ width: item.width + 'px' }"
                                  >
                                    <img
                                      :src="
                                        item.playing
                                          ? utils.get_img_url(
                                              'pageChat/audio1.gif'
                                            )
                                          : utils.get_img_url(
                                              'pageChat/67141.png'
                                            )
                                      "
                                      class="audio_img"
                                    />
                                    <div style="margin-left: 12px">
                                      {{ item.audioTime }}
                                    </div>
                                  </div>

                                  <audio
                                    ref="audios"
                                    @ended="onAudioEnded()"
                                  >
                                    <source
                                      :src="item.audio"
                                      type="audio/mpeg"
                                    />
                                  </audio>
                                </div>
                              </div>
                            </div>
                            <!-- 群 -->
                            <div
                              v-else
                              @touchstart.native="gtouchstart(item.id)"
                              @touchend="end()"
                            >
                            <div v-if="item.videoUrl != null && item.videoUrl != ''" style="margin-left: 10px;"><vue3VideoPlay 
                                width= '200px'
                                height='300px'
                                color="#409eff"
                                :control= false
                                :src="item.videoUrl" 
                              /></div>
                              <div v-show="item.imgUrl != null && item.imgUrl != ''" style="margin-left: 10px;">
                                <van-image
                                :src="item.imgUrl"
                                width="150"
                                height="150"
                                @click="getImg(item.imgUrl)"
                              />
                              </div>
                              <div class="document-message"  v-show="item.documentUrl != null && item.documentUrl != ''" @click.prevent="downloadDocument(item.documentUrl)" style="margin-left: 10px;">
                               <div class="z-flex-justify-between document_wpr">
                                <div class="z-line-1" >{{ item.fileName }}</div>
                                <van-image
                                :src="utils.get_img_url('pageChat/document.png')"
                                width="40"
                                height="40"
                          
                              />
                               </div>
                            </div>
                              <div class="row_msg"   v-show="item.text != '' && item.text != '[语音消息]' &&
                              item.text != '[图片消息]' && item.text != '[视频消息]'&& item.text != '[文件消息]'
                             ">
                                {{ item.text }}
                              </div>
                              <div class="row_msg" v-show="item.audio != null">
                            
                                <div @click.prevent="handlePlayAudio(index,audios)">
                                  <div
                                    class="z-flex-align-center"
                                    :style="{ width: item.width + 'px' }"
                                  >
                                    <img
                                      :src="
                                        item.playing
                                          ? utils.get_img_url(
                                              'pageChat/audio1.gif'
                                            )
                                          : utils.get_img_url(
                                              'pageChat/67141.png'
                                            )
                                      "
                                      class="audio_img"
                                    />
                                    <div style="margin-left: 12px">
                                      {{ item.audioTime }}
                                    </div>
                                  </div>
                                  {{ item.username }}
                             
                                  <audio
                                    ref="audios"
                                    @ended="onAudioEnded()"
                                  >
                                    <source
                                      :src="item.audio"
                                      type="audio/mpeg"
                                    />
                                  </audio>
                                </div>
                              </div>
                            </div>
                          </template>
                        </van-popover>
                    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </van-checkbox-group>
    </div>
    <div class="footer" v-show="!isForward">
      <div class="z-flex-justify-between" style="padding: 5px 0">
        <img
          src="../../../assets/image/66602.png"
          class="isAudio"
          @click="isVoice"
        />

        <van-cell-group inset style="width: 80%">
          <van-field
            v-model="value"
            placeholder="请输入讯息"
            @focus="changeFocus"
            @click-right-icon="changeIcon"
            @keyup.enter="changeSend"
            v-show="voice"
            @update:model-value="changeUpdate($event)"
          />
          <div style="-webkit-touch-callout: none; -webkit-user-select: none">
            <van-button
              v-show="!voice && stopBtn==false"
              color="#F3F5F8FF"
              style="width: 100%; color: black"
              @click.prevent="handleTouchStart($event)"
           
           
              >开始录音</van-button
            >
            <van-button
              v-show="stopBtn"
              color="#F3F5F8FF"
              style="width: 100%; color: black"
              @click.prevent="gtouchend()"
           
              >停止录音</van-button
            >
          </div>
          
        </van-cell-group>
        <V3Emoji
          size="mid"
          fixPos="downleft"
          style="width: auto; height: auto"
          :custom-size="customSize"
          @click-emoji="appendText"
        >
          <div>
            <img
              src="../../../assets/image/66601.png"
              class="img"
              style="margin-right: 6px; vertical-align: middle"
              @click="ClickEmoji"
            />
          </div>
        </V3Emoji>
        <img
          v-show="isImg"
          src="../../../assets/image/13595.png"
          class="img"
          @click="changeGrid"
          style="margin-right: 9px"
        />
        <img
          v-show="!isImg"
          src="../../../assets/image/pageChat/send.png"
          class="img"
          @click="changeSend"
          style="margin-right: 9px"
        />
      </div>
      <div
        v-show="isCollapse"
        class="animate__animated animate__fadeInBottomLeft"
      >

        <van-grid :border="false" :column-num="4">
          <van-grid-item v-for="item in imgUrl" :key="item.text">
            <van-uploader v-if="item.text =='照片' ||  item.text=='文件' "
          :preview-image = 'false'
          :after-read="afterRead"
          @click-upload="typeUpload(item.text)"
       
            >
              <div class="z-flex-column-center" >
                <van-image :src="utils.get_img_url(item.url)" />
            <div>{{ item.text }}</div>  
              </div>
            </van-uploader> 
            <van-uploader v-else-if="item.text == '拍摄' "
          :preview-image = 'false'
          :after-read="afterRead"
          capture="camera"
          @click-upload="typeUpload(item.text)"
            >
              <div class="z-flex-column-center">
                <van-image :src="utils.get_img_url(item.url)" />
            <div>{{ item.text }}</div>  
              </div>
            </van-uploader> 
            <div class="z-flex-column-center" v-else>
                <van-image :src="utils.get_img_url(item.url)" />
            <div>{{ item.text }}</div>  
              </div>
                
       
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <div
      class="foot_send z-flex-column-center"
      v-show="isForward"
      @click="toForward"
    >
      <img src="@/assets/image/pageChat/d08.png" alt="" />
      转发
    </div>
    <div
      style="width: 100%; height: 270px; margin-top: 50px"
      v-show="emoji"
    ></div>
    <!-- 遮罩层 -->
    <!-- <van-overlay :show="show" @click.prevent="show = false" z-index="999">
      <div class="wrapper">
        <wave />
      
        
    
      </div>
    </van-overlay> -->
  </div>
</template>

<script setup lang="ts">
import { watch, nextTick, ref, onMounted, computed,reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import appStore from "../../../store/index";
import { nanoid } from "nanoid";
import { findName, geiMessages, getGroupMessage,fileUpload } from "@/request/http.api";
import wave from "@/components/wave.vue";

import clipboard3 from "vue-clipboard3";
import utils from "@/utils";
import V3Emoji from "vue3-emoji";
import "vue3-emoji/dist/style.css";
import { Toast, ImagePreview  } from "vant";
const stopBtn = ref(false)
const router = useRouter();
const route = useRoute();
const value = ref("");
const store = appStore();
const userId = JSON.parse(localStorage.getItem("info") || "{}");
const { messages } = storeToRefs(store);
const { send } = store;
const loop: any = ref(0);
const groupImg = ref("");
const voice = ref(true);
const audios = ref(null) as any;
const isImg = ref(true);
const show = ref(false);
const timeOutEvent = ref(0);
const recorder = ref(null) as any;
const audioBlob = ref(null) as any;
const audioURL = ref(null) as any;
const base64String = ref(null) as any;
const isCollapse = ref(false);
const recordStartTime = ref(0);
const audioDuration = ref(0);
const emoji = ref(false);
const steam = ref(null) as any;
const startX = ref(null);
const startY = ref(null);
const isRecording = ref(false);
const { toClipboard } = clipboard3();
const result = ref([]);
const typeText = ref('')
const users = ref({
  groupName: "",
  groupUserSize: "",
});
const stopAudio = ref({})
const imgUrl = ref([
  {
    url: "pageChat/p01.png",
    text: "照片",
  },
  {
    url: "pageChat/p02.png",
    text: "拍摄",
  },
  {
    url: "pageChat/p03.png",
    text: "位置",
  },
  {
    url: "pageChat/p04.png",
    text: "语音输入",
  },
  {
    url: "pageChat/p05.png",
    text: "收藏",
  },
  {
    url: "pageChat/p06.png",
    text: "个人名片",
  },
  {
    url: "pageChat/p07.png",
    text: "文件",
  },
  {
    url: "pageChat/p08.png",
    text: "音乐",
  },
]);
const isForward = ref(false);
//转发显示
const clickForward = () => {
  isForward.value = !isForward.value;
};
//跳转转发
const toForward = () => {
  router.push({
    name: "forward",
    params: { value: JSON.stringify(result.value) },
  });
};
const customSize = {
  "V3Emoji-width": "100vw",
};
//上传发送
const upLoaders = async (params)=>{
  const res: any = await fileUpload(params);
  let time = new Date().getTime();
let msg = {
    text: '',
    createdAt: time,
    userId: userId.id,
    contactId: route.query.id,
    groupId: route.query.id,
    username: userId.username,
    groupName: "" as any,
    groupHead: "",
    id: Math.random(),
    documentUrl:'',
    fileName:'',
    playing: false,
    width: 0,
    audioTime: "",
    audio: null,
    avatarUrl: userId.avatarUrl,
    badge: 1,
    $type: "",
    imgUrl:'' as any,
    videoUrl: '' as any
  }
      console.log(res.data);
      console.log(typeText.value);
      
      if(typeText.value == '照片' || typeText.value == '拍摄'){
        console.log(222);
        
        if(res.data.fileName.indexOf('mp4') != -1){
        msg.groupId = "";
       msg.videoUrl = res.data.fileUrl
       msg.text = '[视频消息]'
      send(`private/${route.query.id}`, JSON.stringify(msg));
        messages.value.push(msg);
      }else{
      msg.groupId = "";
      msg.imgUrl = res.data.fileUrl
      msg.text = '[图片消息]'
    send(`private/${route.query.id}`, JSON.stringify(msg));
     messages.value.push(msg);
      }
      }else{
         
         
        msg.groupId = "";
       msg.documentUrl = res.data.fileUrl
       msg.fileName = res.data.fileName
       msg.text = '[文件消息]'
      send(`private/${route.query.id}`, JSON.stringify(msg));
        messages.value.push(msg);
      }
}
//下载文件
const downloadDocument = (href)=>{
  window.location.href = href
}
//图片预览
const getImg = (img)=>{
    console.log(img);
    ImagePreview({
        images: [img],
        showIndex: true,
        loop: false,
        closeable:true
    
    })
}
const afterRead = (file)=>{
  let formdata = new FormData();
  formdata.append("file", file.file);
  upLoaders(formdata);
}
const typeUpload = (text)=>{
  typeText.value =text
   
}
const ClickEmoji = () => {
  emoji.value = !emoji.value;
  voice.value = true;
  isCollapse.value = false;
};
const appendText = (emo:string) => {
  value.value += emo;
  console.log(isImg.value);

  isImg.value = false;
};
//复制
const copy = async (item) => {
  try {
    await toClipboard(item.text);

    Toast.success("复制成功");
  } catch (error) {
    console.log(error);
  }
};
const onSelects = (user, index) => {
  const id = nanoid();
  user.$type = "recall";
  user.id = id;
  console.log(user);

  send(`private/${route.query.id}/recall`, JSON.stringify(user));
  // console.log(user);
  messages.value.splice(index, 1);
};
//判断当前是不是超过一分钟
const checkIfTimeExpired = (timestamp) => {
  const date = new Date(timestamp); // 将时间戳转换为Date对象
  const now = new Date(); // 获取当前时间的Date对象

  return date.getMinutes() < now.getMinutes() - 1;
};
const handlePlayAudio = async (index: number) => {
 
  
  const message = messages.value[index];
  if (message.playing) {
    // console.log(audios.value.duration);
    audios.value.currentTime = 0;
    audios.value.pause();
   
    
    audios.value = null;
    message.playing = false;
  } else {
    //base64转blod
     const ad = await b64ToBlob(message.audio);
    const audioUrl = URL.createObjectURL(ad);
     message.audio = audioUrl;
     nextTick(()=>{
      audios.value.play();
     message.playing = true;
     stopAudio.value = message
     })
   
  }
};
const onAudioEnded = () => {
      stopAudio.value.playing = false
      audios.value.pause();
};
const newState = computed(() => {
  return JSON.stringify(messages.value);
});
//切换语音或输入框
const isVoice = () => {
  voice.value = !voice.value;
};

//键盘弹起影响样式
const changeFocus = () => {
  emoji.value = false;
  if (isCollapse.value) {
    isCollapse.value = false;
  }
};
const clickIscop = () => {
  emoji.value = false;
  if (isCollapse.value) {
    isCollapse.value = false;
  }
};
//切换发送或者功能
const changeUpdate = (e) => {
  e != "" ? (isImg.value = false) : (isImg.value = true);
};
const changeGrid = () => {
  emoji.value = false;
  isCollapse.value = !isCollapse.value;
  console.log(isCollapse.value);
};
//按住说话
let handleTouchStart = (e) => {
  stopBtn.value  = true

  timeOutEvent.value = window.setTimeout(() => {

    recordStartTime.value = new Date().getTime();
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      steam.value = stream;
      recorder.value = new MediaRecorder(stream);
      recorder.value.start();
      recorder.value.addEventListener("dataavailable", (event) => {
        audioBlob.value = event.data;
        blobToBase64(audioBlob.value);
      });
    });
  }, 300);
};
const gtouchend = () => {
  stopBtn.value  = false
  const recordDuration =
    Math.round(((new Date().getTime() - recordStartTime.value) / 1000) * 10) /
    10;
    let time = new Date().getTime();
let msg = {
    text: '',
    createdAt: time,
    userId: userId.id,
    contactId: route.query.id,
    groupId: route.query.id,
    username: userId.username,
    groupName: "" as any,
    groupHead: "",
    id: Math.random(),
    playing: false,
    width: 0,
    audioTime: "",
    audio: null,
    avatarUrl: userId.avatarUrl,
    badge: 1,
    $type: "",
    imgUrl:null as any,
    videoUrl: null as any
  }
 
    recorder.value.stop();
    audioDuration.value = Math.round(recordDuration);
    setTimeout(() => {
      recorder.value = null;
      audioURL.value = URL.createObjectURL(audioBlob.value);
      if (route.query.info == "user") {
        msg.$type = "";
        //  msg.audio = audioURL.value;
        msg.audio = base64String.value;
        msg.audioTime = `${audioDuration.value} ''`;
        msg.width = audioDuration.value < 5 ? 80 : 115;
        msg.text = '[语音消息]'
        send(`private/${route.query.id}`, JSON.stringify(msg));
        messages.value.push(msg);
      } else if (route.query.info == "group") {
        msg.groupName = route.query.name;
        msg.groupHead = groupImg.value;
        msg.audio = base64String.value;
        msg.audioTime = `${audioDuration.value} ''`;
        msg.width = audioDuration.value < 5 ? 80 : 115;
        msg.text = '[语音消息]'
        send(`group/${route.query.id}`, JSON.stringify(msg));
        //messages.value.push(msg);
      }
    }, 300);
  

  clearTimeout(timeOutEvent.value); //清除定时器
};
const blobToBase64 = (blod) => {
  const reader = new FileReader();
  reader.readAsDataURL(blod);
  reader.onloadend = () => {
    base64String.value = reader.result;
  };
};
const b64ToBlob = async (data) => {
  const resp = await fetch(data);
  const blob = await resp.blob();

  return blob;
};
//按住撤回
const gtouchstart = (id: string) => {
  clearTimeout(loop.value); //再次清空定时器，防止重复注册定时器
  loop.value = setTimeout(() => {
    messages.value[id] = !messages.value[id];
  }, 500);
};
const end = () => {
  clearTimeout(loop.value);
};
const room = ref<any>(null);
//聊天界面信息
const chatInfo = async () => {
  if (route.query.info == "group") {
    let obj = {
      groupId: route.query.id,
    };
    let res: any = await findName(obj);
    users.value = res.data;
    groupImg.value = res.data.groupHead;
    localStorage.setItem("groupId", res.data.groupId);
  }
};
//聊天历史记录
const historyChat = async () => {
  if (route.query.info == "group") {
    const res: any = await getGroupMessage(route.query.id as any);
    res.data.forEach((item: { createdAt: any }) => {
      item.createdAt = Date.parse(item.createdAt);
    });
    messages.value = res.data;
  } else {
    const res: any = await geiMessages(route.query.id as any);
    res.data.forEach((item: { createdAt: any }) => {
      item.createdAt = Date.parse(item.createdAt);
    });
    messages.value = res.data;
  }
};
// 右侧icon图标
const changeIcon = () => {};
const refund = () => {
  router.go(-1);
};
const setList = () => {
  router.push("/setChat");
};
const goset = () => {
  console.log(route.query);

  router.push({
    path: "userSet",
    query: { id: route.query.id, name: route.query.name, url: route.query.url },
  });
};
const changeSend = () => {
  emoji.value = false;
  let time = new Date().getTime();
let msg = {
    text: value.value,
    createdAt: time,
    userId: userId.id,
    contactId: route.query.id,
    groupId: route.query.id,
    username: userId.username,
    groupName: "" as any,
    groupHead: "",
    id: Math.random(),
    playing: false,
    width: 0,
    audioTime: "",
    audio: null,
    avatarUrl: userId.avatarUrl,
    badge: 1,
    $type: "",
    imgUrl:null as any,
    videoUrl: null as any
  }
  if (route.query.info == "group" && value.value != "") {
    msg.$type = "group";
    msg.groupName = route.query.name;
    msg.groupHead = groupImg.value;
    // msg.$type = 'GROUP-MESSAGE'
    send(`group/${route.query.id}`, JSON.stringify(msg));
  }
  if (route.query.info == "user" && value.value != "") {
    console.log(msg);
    msg.groupId = "";
    send(`private/${route.query.id}`, JSON.stringify(msg));
    messages.value.push(msg);
  }
  value.value = "";
  isImg.value = true;
};

watch(
  newState,
  (val, news) => {
    const valLen = JSON.parse(val);
    const newLen = JSON.parse(news);
    // console.log(valLen.length);
    // console.log(newLen.length)

    nextTick(() => {
      if (valLen.length != newLen.length) {
        room.value.lastElementChild.lastElementChild
          .getElementsByTagName("div")[1]
          .scrollIntoView(false);
      }
    });
  },
  { deep: true }
);
// watch(
//   () => isCollapse.value,
//   (val) => {-
//     nextTick(() => {
//       if (val) {
//         room.value.style.height = 57 + "vh";
//         room.value.lastElementChild
//           .getElementsByTagName("div")[1]
//           .scrollIntoView(false);
//       } else {
//         room.value.style.height = 81 + "vh";
//       }
//     });
//   },
//   { deep: true }
// );

onMounted(() => {
  chatInfo();
  historyChat();
  messages.value = [];
});
</script>

<style lang="scss">
.tab-container{
  width: 33% !important;
  left: 68.1%;
}
.pollup {
  right: -80px !important;
}

.scroller {
  height: 100%;
}

.pageChat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  // height: calc(100vh - 180px);
  overflow: hidden;
  .header {
    padding: 30px 21px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000;
    background-color: #fff;

    .title {
      display: flex;
      align-items: center;
    }

    span {
      margin-left: 10px;
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    touch-action: none;
    .ovImg {
      width: 132px;
      height: 132px;
      margin-bottom: 66px;
      margin-top: 214px;
  
    }

    .ovImg1 {
      margin-top: 32px;
      width: 100%;
   
     pointer-events: none
    }
  }
  .content {
    flex: 1;
    // height: calc(100% - 44px - 58px);
    background-color: #f3f5f8ff;

    overflow-y: auto;

    .chat {
      height: 80%;
      padding-left: 1rem;
      padding-right: 1rem;
      padding-bottom: 1rem;
      padding-top: 16px;

      /* 时间 */
      .dt {
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        padding-left: 0.6rem;
        padding-right: 0.6rem;
        border-radius: 0.2rem;
        color: white;
        background-color: #d4d4d4;
        display: inline-block;
        margin-left: 50%;
        margin-top: 2rem;
        margin-bottom: 1rem;
        transform: translateX(-50%);
      }

      .chat-send,
      .chat-recv {
        display: flex;
      }

      .chat-send {
        flex-direction: row-reverse;
      }

      .chat-recv {
        margin-inline-start: 0px;
        flex-direction: row;
      }
    .document-message{
      width: 400px;
     padding: 30px;
      background-color: #fff;
    
      .document_wpr{
      height: 100%;
      }
    }
      /* 消息 */
      .user_msg,
      .row_msg {
        display: inline-block;
        font-size: 16px;
        padding: 15px 30px;
        font-weight: 400;
        word-break: break-all;
      }

      .right_text {
        margin-right: 24px;
      }

      .user_msg {
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        background-color: #ffffffff;
        border-radius: 24px 24px 0px 24px;
        margin-right: 16px;
        color: #000000ff;
      }

      .row_msg {
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        background-color: #3e78feff;
        border-radius: 0px 24px 24px 24px;
        margin-left: 16px;
        color: #fff;
      }

      .row_name {
        margin-left: 10px;
        font-size: 18px;
        color: #a5a8b6ff;
      }
      .audio_img {
        width: 20px;
        height: 30px;
        moz-transform: rotate(-180deg);
        -webkit-transform: rotate(-180deg);
      }
    }
  }
  .van-cell {
    background: #eee;
  }

  .van-field__control {
    border-radius: 10px;
  }

  .van-grid-item__content {
    background-color: #f6f6f6ff;
  }

  .footer {
    // position: fixed;
    // bottom: 0;
    // left: 0;
    // background-color: #fff;
    //  width: 100%;
    .isAudio {
      width: 44px;
      height: 34px;
      margin-left: 30px;
    }

    .changeSend {
      width: 60px;
      height: 60px;
      background-color: #f40;
    }

    .img {
      width: 35px;
      height: 40px;
    }
  }
  .foot_send {
    height: 194px;
    img {
      width: 58px;
      height: 58px;
    }
  }
}

.item_text {
  padding: 20px 8px;
}
</style>
