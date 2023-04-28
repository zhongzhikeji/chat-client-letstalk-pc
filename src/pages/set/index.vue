<template>
  <div class="bgc">
    <div class="top">
      <div class="qrFlex">
        <div class="qr">
        <img src="../../assets/image/80844@2x.png" alt="" class="fir"  @click="go">
        <img src="../../assets/image/82048@2x.png" alt="" @click="showNew=true">
      </div>
      </div>
   
      <van-popup v-model:show="showNew" position="bottom">
      <div class="z-t-c btn_text" style="padding-top: 10px" @click="dislogin">
        切换账号
      </div>
      <van-divider />
      <div class="z-t-c btn_text" @click="dislogin">退出登录</div>
      <van-divider />
    
      <div class="z-t-c" @click="showNew=false" style="color: #a5a8b6ff; padding-bottom: 15px;font-size: 16px;">
        取消
      </div>
    </van-popup>
      <div class="info">
        <div class="avatral" @click="router.push('/infoSet')">
          <img :src="avatul? avatul :'static/20230407163657.png'" alt="">
        <!--   src="../../../public/20230407163657.png"  -->
     
        </div>
        <div class="name">
          <p class="bold">{{ name }} </p>
          <p>狐狸号:{{ foxCode }} </p>
        </div>
      </div>
    </div>
    <div class="list">
      <!--     <div class="avator">

        <van-image round width="3rem" height="3rem" fit="cover" position="left" @click="gocenter" :src="avatul" />
        <div class="text">
          <p style="font-size: 18px;">{{ name }} <img src="../../assets/image/set/66802.png" alt=""
              style="margin-top: 4px;"></p>
          <p style="font-size: 12px; color: #A5A8B6; margin-top: 2px;">
            狐狸号:{{ foxCode }} <span style="
                    padding: 3px;
                    height: 26px;
                    background: linear-gradient(180deg, #14BFFC 0%, #69D29B 100%);
                    border-radius: 4px;
                    opacity: 1;
                    color: azure;
                    font-weight: 700;
                    ">lv.23</span>
          </p>

        </div>

        <div class="avatoeIcon">
          <van-icon name="qr" @click="go" />
        </div>
      </div> -->
      <div class="img">
        <img src="../../assets/image/51@2x.png" alt="">
      </div>
      <div class="center">
        <div class="cell" @click="router.push('/infoSet')">
          <img src="../../assets/image/67321@3x.png" alt="" class="label">
          <p>个人中心</p>
          <img src="../../assets/image/82075@2x.png" alt="" class="load">
        </div>
        <div class="cell" @click="router.push('/safe')">
          <img src="../../assets/image/67320@3x.png" alt="" class="label">
          <p>账户安全</p>
          <img src="../../assets/image/82075@2x.png" alt="" class="load">
        </div>
        <div class="cell" @click="router.push('/about')">
          <img src="../../assets/image/67319@3x.png" alt="" class="label">

          <p>关于狐狸</p>
          <img src="../../assets/image/82075@2x.png" alt="" class="load">
        </div>
        <div class="cell" @click="dislogin">
          <img src="../../assets/image/67318@3x.png" alt="" class="label">
          <p>登出狐狸</p>
          <img src="../../assets/image/82075@2x.png" alt="" class="load">
        </div>
      </div>
  <!--     <van-cell title="个人中心" is-link to="infoSet" icon="@/assets/image/set/13597.png">
        <template #icon>
          <img src="../../assets/image/67290@2x.png" alt="">
        </template>
      </van-cell> -->
      <!--      <van-cell title="收藏" is-link to="collect" icon="@/assets/image/set/13597.png">
        <template #icon>
          <img src="../../assets/image/set/66618.png" alt="" style="width: 24px;">
        </template>
      </van-cell>
      <van-cell title="表情" is-link to="chartlet" icon="@/assets/image/set/13597.png">
        <template #icon>
          <img src="../../assets/image/set/66621.png" alt="">
        </template>
      </van-cell>
      <van-cell title="外观" is-link to="appearance" icon="@/assets/image/set/13597.png">
        <template #icon>
          <img src="../../assets/image/set/66626.png" alt="">
        </template>
      </van-cell>
      <van-cell title="设备" is-link to="equipment" icon="@/assets/image/set/13597.png">
        <template #icon>
          <img src="../../assets/image/set/66628.png" alt="">
        </template>
      </van-cell>
      <van-cell title="语言设定" is-link to="language" icon="@/assets/image/set/13597.png">
        <template #icon>
          <img src="../../assets/image/set/66630.png" alt="">
        </template>
      </van-cell> -->
     <!--  <van-cell title="账号安全" is-link to="safe" icon="@/assets/image/set/13597.png">
        <template #icon>
          <img src="../../assets/image/67291@2x.png" alt="">
        </template>
      </van-cell> -->
      <!--    <van-cell title="隐私权限" is-link to="safe" icon="@/assets/image/set/13597.png">
        <template #icon>
          <img src="../../assets/image/set/66623.png" alt="">
        </template>
      </van-cell>
      <van-cell title="分享狐狸" is-link icon="@/assets/image/set/13597.png" @click="showPopup">
        <template #icon>
          <img src="../../assets/image/set/66631.png" alt="">
        </template>
      </van-cell> -->

      <!-- <van-cell title="关于狐狸" is-link to="about" icon="@/assets/image/set/13597.png">
        <template #icon>
          <img src="../../assets/image/67272@2x.png" alt="">
        </template>
      </van-cell> -->
      <!--   <van-cell title="帮助与反馈" is-link to="send" icon="@/assets/image/set/13597.png">
        <template #icon>
          <img src="../../assets/image/set/66636.png" alt="">
        </template>
      </van-cell> -->
    <!--   <van-cell title="登出狐狸" is-link to="setting" icon="@/assets/image/set/13597.png" @click="dislogin">
        <template #icon>
          <img src="../../assets/image/67293@2x.png" alt="">
        </template>
      </van-cell> -->
      <!--    <van-cell title="账号注销" is-link to="logout" icon="@/assets/image/set/13597.png">
        <template #icon>
          <img src="../../assets/image/set/80818.png" alt="">
        </template>
      </van-cell> -->
    </div>

    <van-share-sheet v-model:show="showShare" :options="options" title="立即分享给好友" description="描述信息" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter()
let showShare = ref(false);
let flag = ref(false)
let showNew = ref(false)
if (localStorage.getItem("token")) {
  flag.value = true
}
let avatul = ref("")
avatul.value = JSON.parse(localStorage.getItem("info")).avatarUrl

console.log(avatul.value, 1111111);
let foxCode = ref("")
foxCode.value = JSON.parse(localStorage.getItem("info")).foxCode

console.log(avatul.value, 123454645647);
const options = [
  [
    { name: '微信', icon: 'wechat' },
    { name: '朋友圈', icon: 'wechat-moments' },
    { name: '微博', icon: 'weibo' },
    { name: 'QQ', icon: 'qq' }
  ],
  [
    { name: '复制链接', icon: 'link' },
    { name: '分享海报', icon: 'poster' },
    { name: '二维码', icon: 'qrcode' },
    { name: '小程序码', icon: 'weapp-qrcode' }
  ],
];

let bio = ref("")
bio.value = JSON.parse(localStorage.getItem('info')).bio ? JSON.parse(localStorage.getItem('info')).bio : "未设置"
const showPopup = function () {
  showShare.value = true
  console.log(showShare);
}
const go = function () {
  router.push("/percenter")

}
const gocenter = function () {
  router.push("/infoSet")
}
let name = ref("")
if (flag) {
  name = JSON.parse(localStorage.getItem("info")).username
} else {
  name = "请登录"
}
console.log(JSON.parse(localStorage.getItem("info")).username);
const dislogin = function () {
  console.log(1111);
  localStorage.clear()
  location.reload()
}
</script>

<style lang="scss" scoped>
.bgc {

  background-image: url("../../assets/image/67275@2x.png");
  background-repeat: no-repeat;
  background-size: 100%;

  .top {
    padding-top: 30px;
    margin-right: 20px;
   
  .qrFlex{
    display: flex;
    flex-direction: row-reverse;
    .qr {
      width: 182px;
      height: 72px;
      background: #F2F3F7;
      border-radius: 36px 36px 36px 36px;
      opacity: 1;
      padding-left: 32px;
      padding-top: 16px;

      img {
        width: 37.33px;
        height: 40px;
      }

      .fir {
        margin-right: 40px;
      }
    }
  }
   

    .info {
      height: 120px;
      padding-top: 20px;
     margin-left: 20px;
      display: flex;

      .avatral {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      .name {

        font-size: 16px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #7E7E7E;
        margin-left: 10px;

        .bold {
          font-size:25px;
         
          font-weight: bold;
          color: #000000;

        }
      }
    }

  }

  .list {
    width: 100%;
    border-radius: 1.5rem 1.5rem 0 0;
    background-color: #fff;



    .img {
     

      img {
        width: 100%;
      }
    }

    .avator {
      padding: 1.25rem 1rem 1rem 1rem;
      display: flex;
      gap: 1rem;
      line-height: 3.4375rem;

      .text {
        width: 70%;

        p {
          line-height: 1.5625rem;
          font-size: .75rem;
        }
      }
    }

    .center {
      padding: 20px 25px;
      .cell {
        display: flex;
        height: 74px;
        margin-bottom: 50px;
        .label{
          width: 84px;
          height: 84px;
        }

        img {
          width: 74px;
          height: 74px;
        }

        p {
          font-size: 18px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #000000;
          line-height: 74px;
          flex: 1;
          margin-left: 38px;
        }

        .load {
          width: 14px;
          height: 18px;
          margin-top: 20px;
        }
      }
    }

    .van-cell {
      padding: 10px 18px;

      img {
        width: 36px;
        height: 36px;
      }

      ::v-deep .van-cell__title {
        font-size: 16px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #000000;

        span {
          position: relative;
          top: 20px;
        }
      }
    }

    .layout {
      padding-left: 1rem;
      color: red;
      font-size: 16px;
      line-height: 2rem;
    }
  }

  ::v-deep .van-cell__title {
    margin-left: 16px;
    font-size: 1rem;
  }
}</style>
<style>
  .van-popup--bottom{
    width: 30%;
    left: auto;
  }
  .van-overlay{
    width: 30%;
    left: auto;
  }
  .btn_text {

  font-size: 16px;
}
</style>
