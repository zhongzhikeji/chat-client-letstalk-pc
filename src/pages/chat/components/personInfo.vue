<template>
    <div class="bgc">
        <div class="top">
            <div class="left" @click="goback">
                <img src="../../../assets/image/80597.png" alt="" />
            </div>
            <div class="right" @click="goPublish">
                <img src="../../../assets/image/80694.png" alt="" />
            </div>
        </div>
        <div class="center">
            <div class="circle">
                <div class="avator">
                    <van-image round width="5rem" height="5rem" fit="cover" position="left" @click="gocenter"
                        :src="info.avatarUrl ? info.avatarUrl :'static/20230407163657.png'" />
                    <div class="text">
                        <p style="font-size: 20px;">{{ info.username }}</p>
                        <p style="font-size: 12px; color: #A5A8B6; margin-top: 25px;">
                            狐狸号:{{ info.foxCode }} <span style="
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
                </div>
                <div class="line" style="
                                                width: 100%;
                                                height: 12px;
                                                background: #F5F6FA;
                                                border-radius: 0px 0px 0px 0px;
                                                opacity: 1;
                                                ">

                </div>
                <div class="circleInfo" style="margin-top: 10px;">
                    <div class="item">
                        <span style="width: 30%;">朋友圈</span>
                        <p style="width: 68%;">
                            <van-image width="50" height="50" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                            <van-image width="50" height="50" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                            <van-image width="50" height="50" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                            <van-image width="50" height="50" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                        </p>
                        <van-icon name="arrow" style="margin-top: 20px;" />
                    </div>
                    <div class="line" style="width: 96%;
                                                                height: 0px;
                                                                opacity: 1;
                                                                border: .5px solid #fffafa;
                                                                margin-top: 10px;"></div>
                    <div class="item">
                        <span style="width: 98%;">更多信息</span>
                        <van-icon name="arrow" style="margin-top: 20px;" />
                    </div>
                </div>
            </div>
            <div class="btn" @click="agree">同意</div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import {
    agreeFri, showInfoBefore
} from "../../../request/http.api";

import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";

const route = useRoute()

const info = ref({})
console.log(route.query.id);
showInfoBefore(route.query.id).then(res => {
    console.log(res, 111);
    info.value = res.data
})

const router = useRouter();
const goback = function () {
    router.go(-1);
};
console.log(route.query.id);
const agree = function () {
 
    
    agreeFri(route.query.id).then(res => {
        console.log(res);
        Toast.success(res.data)
        router.push("/contact")
    }).catch(err => {
        console.log(11111);
        Toast.fail(err.response.data)
        console.log(err.response.data);
    })
};
const goPublish = function () {
    router.push("/publish");
};


onMounted(() => {

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
        border-radius: 1.5rem 1.5rem 0 0;
        position: relative;
        top: -4.875rem;
        height: 38.875rem;
        width: 100%;
        padding-top: 1.5rem;

        .circle {
            background-color: #fff;
            width: 100%;

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
        }

        .circleInfo {
            background-color: #fff;
            width: 100%;
            margin-top: 20px;
            padding: 0 50px;
            padding-right: 20px;

            .item {
                display: flex;
                height: 100px;
                line-height: 100px;

                p {
                    display: flex;
                    gap: 5px;
                }

            }
        }
    }

    .btn {
        width: 90%;
        height: 82px;
        background: #44B5FF;
        border-radius: 20px 20px 20px 20px;
        opacity: 1;
        position: fixed;
        bottom: 60px;
        left: 5%;
        line-height: 82px;
        color: #fff;
        text-align: center;
    }
}
</style>
  