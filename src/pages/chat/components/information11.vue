<template>
    <div class="editor">
        <div class="top">
            <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
            <span>设置信息源成员</span>
        </div>
        <div class="center">
            <van-search v-model="value" placeholder="搜索" shape="round" right-icon="scan" />
            <div class="group">
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="联络人" name="1" style="font-size: 16px;">
                        <template #right-icon>
                        </template>
                    </van-collapse-item>
                    <div class="list_user"  v-for="(item, index) in userList" :key="index">
                        <div class="item">
                            <van-image width="35" height="35"
                                :src="item.avatarUrl" round />
                            <span style="margin-left: 20px;">{{item.username}}</span>
                            <img width="24" height="24" :src="imgSrc" style="margin-left: 176px;" @click="change" />
                        </div>
                    </div>
                </van-collapse>
            </div>
            <div class="footer">
                <div>确认</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref ,onMounted} from "vue"
import { findGroupMember} from "@/request/http.api.ts";

const onClickLeft = () => history.back();
let imgSrc = ref("/src/assets/image/66680.png")
const change = function () {
    if (imgSrc.value == "/src/assets/image/21974.png") {
        imgSrc.value = "/src/assets/image/66680.png"
    } else {
        imgSrc.value = "/src/assets/image/21974.png"
    }
}
//成员列表
console.log(localStorage.getItem("groupId"), "1111111111111");
const list = async () => {
  let res = await findGroupMember({ groupId: localStorage.getItem("groupId") });
  console.log(res);
    userList.value = res.data;
};

onMounted(() => {
  list();
});
</script>

<style lang="scss" scoped>
.editor {
    background-color: #fff;
    width: 100vw;
    height: 100vh;

    .top {
        width: 750px;
        height: 178px;
        display: flex;
        padding: 102px 36px 28px 36px;
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

        .manager {
            width: 678px;
            background-color: #fff;
            padding: 24px;
            margin-bottom: 24px;
            border-radius: 24px 24px 24px 24px;

            .mTop {
                padding-bottom: 30px;

                span {
                    font-size: 28px;
                    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                }

                .text {

                    font-size: 24px;
                    margin-left: 336px;
                }
            }

            .mCenter {
                display: flex;
                justify-content: left;
                flex-wrap: wrap;

                div {
                    width: 20%;

                    p {
                        text-align: center;
                        font-size: 20px;
                        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                        color: #939395;
                    }
                }
            }
        }

        .group {
            border-radius: 24px;
            overflow: hidden;
            margin-bottom: 24px;

            .list_user {
                padding: 15px;
                display: flex;
                background-color: #fff;

                .item {
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                }
            }
        }

        .centerText {
            font-size: 20px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #939395;
            margin-left: 30px;
            margin-bottom: 14px;
        }
    }

    .footer {
        position: absolute;
        bottom: 10px;
        div {
            width: 678px;
            height: 82px;
            background: #44B5FF;
            border-radius: 20px 20px 20px 20px;
            opacity: 1;
            text-align: center;
            line-height: 82px;
        }
    }
}
</style>
