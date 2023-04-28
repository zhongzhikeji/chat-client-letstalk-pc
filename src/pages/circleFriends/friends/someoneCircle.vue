<template>
    <div class="bgc">
        <div class="top">
            <div class="left" @click="goback">
                <img src="../../../assets/image/80597.png" alt="">
            </div>
            <div class="right" @click="goPublish">
                <img src="../../../assets/image/80694.png" alt="">
            </div>
            <div class="avator">
                <img src="../../../assets/image/avator.png" alt="">
                <p>{{ circleList[0].username }}</p>
            </div>
        </div>
        <div class="center">
            <div class="circle">
                <div class="item" v-for="(item, index) in circleList" :key="index">
                    <p class="time">
                        {{ item.createdAt }}
                    </p>
                    <div class="content">
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {findFriendsCircleSomeone } from "../../../request/http.api";
import { useRouter, useRoute } from 'vue-router';
import { log } from 'console';
import { Popup } from 'vant';
const router = useRouter()
const route = useRoute()
const show = ref(false)
let value = ref("")
const id=route.query.id
const circleList: any = ref([])
const find = function () {
    findFriendsCircleSomeone(id).then(res => {
        console.log(res);
        circleList.value = res.data
    })
}
find()


const goback = function () {
    router.go(-1)
}
const goPublish = function () {
    router.push("/publish")
}

</script>

<style scoped lang="scss">
.bgc {
    background-image: url("@/assets/image/22.png");
    background-repeat: no-repeat;
    background-size: 100%;
    box-sizing: border-box;

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
            border-radius: 2rem;
            margin-top: 60px;

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
            background-color: #F5F6FA;
            width: 100%;
            padding-bottom: 3px;

            .item {
                background-color: #fff;
                padding-left: 36px;
                padding-top: 20px;
                padding-bottom: 34px;
                margin-bottom: 20px;
                display: flex;
                .time{
                    width: 30%;
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
            color: #5B6691;
        }
    }

}
</style>