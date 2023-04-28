<template>
  <div class="group">
    <div class="header">
      <div>
        <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
        <span style="margin-left: 10px;color: black;">建立群聊</span>
      </div>
    </div>
    <div class="z-chat_content content1">

      <div class="z-flex-align-center imgName">
        <van-uploader v-model="fileList" multiple :max-count="1" :after-read="afterRead" />
        <van-field v-model="groupAuthority.name" size="large" :center="true" type="textarea" maxlength="30"
          placeholder="群聊名称" show-word-limit />
      </div>

      <div>
        <van-cell :border="false" title="群组管理" is-link to="groupSet" />
      </div>

      <div class="personnel">成员 ({{ groupAuthority.IdArr.length > 0 ? groupAuthority.IdArr.length : 0}})</div>

      <van-grid :border="false" :column-num="5">
        <van-grid-item v-for="(item,index) in groupAuthority.IdArr" :key="index">
          <van-image :src="item.avatarUrl ? item.avatarUrl :'static/20230407163657.png'" width="35" height="35" round />
          <div class="grid_text">{{ item.username }}</div>
        </van-grid-item>
        <van-grid-item @click="toMember">
          <van-image width="35" height="35" round :src="utils.get_img_url('66986.png')" />
          <div class="grid_text" style="color:#4A8AFF;">新增</div>
        </van-grid-item>
      </van-grid>

      <div class="footer">
        <van-button block :disabled="groupAuthority.IdArr.length < 1 ? true : false"
          :color="groupAuthority.IdArr.length < 1 ? '#7b7d83' : '#4A8AFF'" style="height: 41px;"
          @click="group">创建群聊</van-button>
        
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRouter, useRoute } from 'vue-router';
import appStore from '@/store/index.ts'
import { newGroup ,fileUpload} from "@/request/http.api.ts";
import { Toast } from 'vant';
import utils from "@/utils";
import { storeToRefs } from "pinia";
const store = appStore()
const { groupAuthority } = storeToRefs(store);
const message = ref("");
const value = ref('');
const fileList = ref([]);
const router = useRouter()
const route = useRoute()
const btn = ref(true);
const keys = ref(false);
const avator = ref("")
const afterRead = (file) => {
  let formData = new FormData();
  formData.append('file', file.file);
  formData.append('groupId', localStorage.getItem("groupId"));
  fileUpload(formData).then(res => {
    console.log(res.data.fileUrl);
    groupAuthority.value.groupHead=res.data.fileUrl
    console.log(groupAuthority.value);
  })
};
const group = async () => {
 
  console.log(groupAuthority.value);
  try {
   await newGroup(groupAuthority.value)
  
    router.push("/contact")
    groupAuthority.value = {
      groupHead:"",
      changeGroupName: 'false',
      addGroupUser: 'false',
      editorialPost: 'false',
      remindOthers: 'false',
      groupCall: 'false',
      privateMemberChat: 'false',
      openBots: 'false',
      name: '',
      IdArr: [],
      usersId:[],
    }
  } catch (error) {
    Toast.fail(error.response.data)
  }

}
// Toast("群聊需要至少两名群成员")
const onClickLeft = () => {
  router.push("/chat")
  groupAuthority.value = {
    groupHead:"",
    changeGroupName: 'false',
    addGroupUser: 'false',
    editorialPost: 'false',
    remindOthers: 'false',
    groupCall: 'false',
    privateMemberChat: 'false',
    openBots: 'false',
    name: '',
    IdArr: [],
    usersId:[],
  }
}
const toMember = () => {
  router.push('/addMember')
}

</script>

<style lang="scss" >
.group {

 background-color: #fff;

  .van-cell__right-icon {
    color: #000
  }

  .van-button--block {
    border-radius: 12px;
  }

  .header {
    padding: 40px 50px 45px 30px;
    color: #fff;
    font-size: 1.25rem;
  }

  .van-uploader__upload {
    border-radius: 50%;
  }

  .van-uploader__preview-image {
    border-radius: 50%;
  }

  .van-cell-group--inset {
    margin: 0;
  }

  .van-field__control {
    background: #eee;
    border-radius: 10px;
    height: 35px;
    padding: 5px;
  }

  .content1 {
    .imgName {
      padding: 50px 20px;

      // margin: 0 8px;
      .van-cell {
        padding: 0;
        background: transparent;
        border-bottom: 1px solid #A5A8B6FF;
      }

      .van-field__value {
        height: 30px;
        display: flex;
        justify-content: space-between;
      }

      .van-field__body {
        width: 85%;
      }

      .van-uploader__upload {
        height: 60px;
        width: 65px;
      }

      .van-field__control--min-height {
        min-height: 0 !important;
        height: 30px;
        background: transparent;
        padding: 2px;
      }
    }

    .grid_text {
      margin-top: 24px;
    }

    .personnel {
      font-size: 24px;
      margin-left: 30px;
      color: #eee;
    }

    .add {
      color: #4A8AFF;
      margin: 25px;

      div {
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }

  .btn {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .footer {
    width: 33%;
    position: absolute;
    left: 33.5%;
    right: 0;
    bottom: 0;
    padding: 36px;
  }
}
</style>
