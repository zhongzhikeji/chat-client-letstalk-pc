<template>
  <div class="bgc">
    <div class="top">
      <div class="left" @click="goback">
        <img src="../../../assets/image/80597.png" alt="" />
      </div>
      <div class="right" @click="goPublish">
        <img src="../../../assets/image/80694.png" alt="" />
      </div>
      <div class="avator">
        <img :src="avatul" alt="" />
        <p>{{ name }}</p>
      </div>
    </div>
    <div class="center">
      <div class="circle">
        <div class="item" v-for="(item, index) in circleList" :key="index">
          <div class="topItem">
            <div class="avator" @click="lookSomeOne(item.userId)">
              <img :src="item.avatarUrl" alt="" />
            </div>
            <div class="name">
              <p>{{ item.username }}</p>
              <p class="time">
                {{ item.createdAt }}
              </p>
            </div>
          </div>
          <div class="content">
            <p>
              {{ item.text }}
            </p>
        
           
                <VanGrid :border="false" column-num="3" >
            
             <VanGridItem v-for="(i,k) in item.imageUrls">
                    <VanImage
                    :src="i"
                    @click="getImg(item.imageUrls,k)"
                    />
                  </VanGridItem>
          
                
                </VanGrid>
           
       
            <video
              :src="item.videoUrls"
              controls
              style="width: 300px; height: 164px"
              v-if="item.videoUrls != ''"
            ></video>
          </div>
          <div class="bottonItem">
            <div>
              <img :src="item.srcImg" alt="" @click="thumbs(item)" />
              <img
                src="../../../assets/image/66750.png"
                @click="showPopup(item)"
              />
              <img src="../../../assets/image/66751.png" alt="" />
            </div>
          </div>
          <div
            class="thumbs"
            v-if="item.likeArr.length"
            style="margin-bottom: 10px"
          >
            <img src="../../../assets/image/66756.png" alt="" />
            <span
              v-for="item1 in item.likeArr"
              style="margin-left: 5px; margin-right: 5px"
            >
              {{ item1.username }}</span
            >
            <span v-if="item.likeArr.length > 5"
              >等{{ item.likeArr.length }}人觉得很赞</span
            >
          </div>
          <div class="reply" v-if="item.replyArr.length">
            <p v-for="item1 in item.replyArr">
              <span class="display">{{ item1.username }} : </span
              >{{ item1.replyText }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <VanPopup v-model:show="show" position="bottom">
      <div class="footer">
        <div style="display: flex; align-items: center">
          <VanCellGroup inset style="width: 80%">
            <VanField v-model="value" placeholder="请输入评论" />
          </VanCellGroup>
          <img
            src="@/assets/image/13595.png"
            class="img"
            @click="reply"
            style="margin-right: 10px"
          />
        </div>
      </div>
    </VanPopup>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import {
  findFriendsCircle,
  likeTimeFriendsCircle,
  replyFriendsCircle,
  findFriendsCircleSomeone,
} from "../../../request/http.api";

import { useRouter, useRoute } from "vue-router";
import { ImagePreview    } from "vant";
const videoPlayer = ref(null);
const show = ref(false);
let value = ref("");
const circleList: any = ref([]);
const getImg = (img,index)=>{
    console.log(img);
    
    ImagePreview({
        images: img,
        showIndex: true,
        loop: false,
        startPosition: index
    })
}
const find = function () {
  findFriendsCircle().then((res) => {
    console.log(res);
    res.data.forEach(
      (item: {
        likeArr: any[];
        replyArr: any[];
        srcImg: string;
        replies: any[];
      }) => {
        item.likeArr = [];
        item.replyArr = [];
        item.srcImg = "/src/assets/image/66752.png";
        console.log(item.replies);
        item.replies.forEach((item1) => {
          if (!item1.replyText && !item1.authorId) {
            item.likeArr.push(item1);
          }
          if (item1.replyText && !item1.authorId) {
            item.replyArr.push(item1);
          }
          console.log(item.likeArr, 7890);
          item.likeArr.forEach((item2) => {
            if (
              item2.username ==
              JSON.parse(localStorage.getItem("info")).username
            ) {
              item.srcImg = "/src/assets/image/66753.png";
            }
          });
        });
      },
    //   ImagePreview (res.data.imageUrls)
    );
    circleList.value = res.data;
  });
};

const name = JSON.parse(localStorage.getItem("info")).username;
const router = useRouter();
const goback = function () {
  router.go(-1);
};
const goPublish = function () {
  router.push("/publish");
};
//点赞
const thumbs = function (item: {
  userId: any;
  avatarUrl: any;
  username: any;
  id: any;
  srcImg: string;
}) {
  console.log(localStorage.getItem("info").username, 34567899);

  likeTimeFriendsCircle({
    authorId: item.userId,
    avatarUrl: item.avatarUrl,
    username: name,
    timelineId: item.id,
  }).then((res) => {
    console.log(res);
    if (res.data == "点赞成功") {
      item.srcImg = "/src/assets/image/66753.png";
    } else {
      item.srcImg = "/src/assets/image/66752.png";
    }
    find();
  });
};
//pinglun
let replyItem: { userId: any; avatarUrl: any; username: any; id: any };
const showPopup = function (item: {
  userId: any;
  avatarUrl: any;
  username: any;
  id: any;
}) {
  show.value = true;
  replyItem = item;
};
//回复
const reply = function () {
  replyFriendsCircle({
    authorId: replyItem.userId,
    avatarUrl: replyItem.avatarUrl,
    timelineId: replyItem.id,
    text: value.value,
    username: name,
  }).then((res) => {
    console.log(res);
    show.value = false;
    find();
  });
};
//查看某人的朋友圈
const lookSomeOne = function (id: any) {
  router.push({ path: "/someoneCircle", query: { id: id } });
};
onMounted(() => {
  find();
});
let avatul = ref("");
avatul.value = JSON.parse(localStorage.getItem("info")).avatarUrl;
</script>

<style scoped lang="scss">
.bgc {
    background-image: url("@/assets/image/22.png");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 100%;

  .top {
    height: 13.5625rem;
    font-size: 5vw;
    padding: 40px 36px;
    color: #fff;
    line-height: 3rem;

    .right {
      float: right;
    }

    .left {
      float: left;
    }

    .avator {
      width: 132px;
      height: 132px;
      margin: 0 auto;
      border-radius: 50%;
      margin-top: 60px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      p {
        text-align: center;
        margin-top: -1.25rem;
      }
    }
  }

  .center {
    background-color: #fff;
    border-radius: 1.5rem 1.5rem 0 0;
    position: relative;
    top: -1.875rem;
    height: 38.875rem;
    width: 100%;
    padding-top: 1.5rem;

    .circle {
      background-color: #f5f6fa;
      width: 100%;

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

            img {
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
          }

          .name {
            flex: 1;
            margin-left: 16px;
            line-height: 36px;
            margin-top: 8px;

            .time {
              font-size: 24px;
              color: #a5a8b6;
              margin-top: 4px;
            }
          }
        }

        .content {
          margin-top: 24px;
          margin-right: 18px;
          font-size: 28px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #000000;
          line-height: 42px;
          letter-spacing: 6px;
          padding-bottom: 20px;
        }

        .bottonItem {
          div {
            margin-right: 30px;
            margin-top: 20px;
            margin-left: 484px;

            img {
              margin-left: 10px;
            }
          }
        }

        .thumbs {
          font-size: 12px;
        }
      }
    }
  }

  .footer {
    background-color: #fff;
    padding: 20px 0 20px 0;

    .img {
      width: 60px;
      height: 60px;
    }

    .van-cell {
      background: #eee;
    }

    .van-field__control {
      border-radius: 10px;
    }
  }

  .reply {
    font-size: 26px;
    line-height: 36px;

    .display {
      font-size: 12px;
      color: #5b6691;
    }
  }
}
</style>
