<template>
  <div class="top">
    <span @click="goback">取消</span>
    <span class="submitBtn" @click="publish">发表</span>
  </div>
  <div class="content">
    <textarea
      name="sign"
      rows="5"
      cols="30"
      placeholder="这一刻的想法..."
      v-model="pubText"
    ></textarea>
  </div>
  <div class="pic">
    <van-uploader
      v-model="fileList"
      multiple
      preview-size="100"
      :deletable="true"
      :after-read="afterRead"
      :before-read="beforeRead"
      :max-count="count"
    />
  </div>
  <div class="bottom">
    <van-collapse>
      <van-collapse-item :border="false">
        <template #title>
          <div>
            <img
              src="../../../assets/image/66779.png"
              alt=""
              style="position: relative; top: 6px; margin-right: 22px"
            />
            所在位置
          </div>
        </template>
        <template #right-icon>
          <img
            src="../../../assets/image/80548.png"
            alt=""
            style="
              height: 0.7944rem;
              width: 0.4506rem;
              position: relative;
              top: 0.625rem;
            "
          />
        </template>
      </van-collapse-item>
    </van-collapse>
    <van-collapse>
      <van-collapse-item :border="false">
        <template #title>
          <div>
            <img
              src="../../../assets/image/66780.png"
              alt=""
              style="position: relative; top: 6px; margin-right: 22px"
            />
            提醒谁看
          </div>
        </template>
        <template #right-icon>
          <img
            src="../../../assets/image/80548.png"
            alt=""
            style="
              height: 0.7944rem;
              width: 0.4506rem;
              position: relative;
              top: 0.625rem;
            "
          />
        </template>
      </van-collapse-item>
    </van-collapse>
    <van-collapse>
      <van-collapse-item :border="false">
        <template #title>
          <div>
            <img
              src="../../../assets/image/66781.png"
              alt=""
              style="position: relative; top: 6px; margin-right: 22px"
            />
            谁可以看
          </div>
        </template>
        <template #right-icon>
          <img
            src="../../../assets/image/80548.png"
            alt=""
            style="
              height: 0.7944rem;
              width: 0.4506rem;
              position: relative;
              top: 0.625rem;
            "
          />
        </template>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { publishFriendsCircle, fileUpload } from "../../../request/http.api";
import { Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const fileList = ref([]);
const count = ref(1)
const upLoader = async (params: any) => {
  const res: any = await fileUpload(params);

  console.log(res);
  fileList.value.forEach((item) => {
    if (item.file.name === res.data.fileName) {
      item.url = res.data.fileUrl;
    }
  });
  console.log(fileList.value);
};
const afterRead = (file: any) => {
    if(file.file.type.indexOf('mp4') != -1){
        count.value = 1
    }else{
        count.value = 6
    }
  let formdata = new FormData();
  formdata.append("file", file.file);
  upLoader(formdata);
};
const beforeRead = (file: any) => {
  if (!file.type.startsWith("image") && !file.type.startsWith("video")) {
    Toast("请上传图片或视频");
    return false;
  }
  return true;
};
const goback = function () {
  router.go(-1);
};
const pubText = ref("");
const publish = function () {
  let arr: any = [];
  let video = "";
  fileList.value.forEach((item) => {
    item.file.name.indexOf("mp4") != -1
      ? (video = item.url)
      : arr.push(item.url);
  });

  publishFriendsCircle({
    text: pubText.value,
    imageUrls: arr,
    videoUrls: video,
  }).then((res) => {
    console.log(res);
    router.push("/circle");
  });
};
</script>

<style scoped lang="scss">
.top {
  font-size: 32px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #000000;
  display: flex;
  padding: 120px 40px 0 40px;

  span {
    width: 85%;
  }

  .submitBtn {
    display: block;
    width: 104px;
    height: 58px;
    background: #44b5ff;
    border-radius: 12px 12px 12px 12px;
    opacity: 1;
    color: #fff;
    text-align: center;
    line-height: 58px;
    flex: 1;
  }
}

.content {
  padding: 62px 68px 0 84px;

  textarea {
    border: #fff;
    width: 100%;
  }
}

.pic {
  padding-left: 68px;
}

.bottom {
  padding: 68px;
}
</style>
