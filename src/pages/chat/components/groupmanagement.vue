<template>
    <div class="editor">
        <div class="top">
            <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
            <span>群聊管理</span>
           
        </div>
        <div class="center">
            <div class="manager">
                <div class="mTop">
                    <span>管理员</span>
                    <span class="text">
                        共{{userList.length}}名管理员
                        <van-icon name="arrow" style="margin-left: 10px;" />
                    </span>
                </div>
                <div class="mCenter">
                    <div class="item" v-for="(item, index) in userList" :key="index">
                        <van-image round width="32" height="32" :src="item.avatarUrl"
                            style="margin-left: 18px; margin-bottom: 2px;"  />
                        <p>{{ item.username }}</p>
                    </div>

                </div>
            </div>
            <div class="group">
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="设置禁言" name="1" @click="toGag">
                        <template #right-icon>
                            <van-icon name="arrow" style="margin-top: 5px;" />
                        </template>
                    </van-collapse-item>
                <!--     <van-collapse-item title="发言频率限制" name="1">
                        <template #right-icon>
                            <van-icon name="arrow" style="margin-top: 5px; margin-left: 5px;" />
                        </template>
                        <template #value>
                            <span style="font-size: 12px;">不限制发言</span>
                        </template>
                    </van-collapse-item> -->
                 <!--    <van-collapse-item title="成员权限" name="1" @click="toAuthority">
                        <template #right-icon>
                            <van-icon name="arrow" style="margin-top: 5px;" />
                        </template>
                    </van-collapse-item> -->
                  <!--   <van-collapse-item title="群管理员" name="1" @click="router.push('groupMan')">
                        <template #right-icon>
                            <van-icon name="arrow" style="margin-top: 5px;" />
                        </template>
                    </van-collapse-item> -->
                </van-collapse>
            </div>
           <!--  <p class="centerText">加群设置</p> -->
        <!--     <div class="group">
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="加群自动审批" name="1">
                        <template #right-icon>
                            <van-icon name="arrow" style="margin-top: 5px;" />
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="加群方式" name="1">
                        <template #right-icon>
                            <van-icon name="arrow" style="margin-top: 5px; margin-left: 5px;" />
                        </template>
                        <template #value>
                            <span style="font-size: 12px;position: relative; top: 5px;">需要发送验证信息</span>
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="查找方式" name="1">
                        <template #right-icon>
                            <van-icon name="arrow" style="margin-top: 5px; margin-left: 5px;" />
                        </template>
                        <template #value>
                            <span style="font-size: 12px;">通过群号或关键词</span>
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="群转让" name="1">
                        <template #right-icon>
                            <van-icon name="arrow" style="margin-top: 5px;" />
                        </template>
                    </van-collapse-item>
                </van-collapse>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router";
import { findGroupMember } from "../../../request/http.api";
const router = useRouter();
const onClickLeft = () => history.back();
//跳转禁言
const toGag = () => {
    router.push("/estoppel");
}
const toAuthority = () => {
    router.push("/permissions");
}
//成员列表
const userList = ref([]);
console.log(localStorage.getItem("groupId"), "1111111111111");
const list = async () => {
    let Arr = []
    let res = await findGroupMember({ groupId: localStorage.getItem("groupId") });
    console.log(res);
    res.data.forEach(item => {
        if (item.isAdmin == true) {
            Arr.push(item)
        }
    })
    console.log(Arr);
    userList.value = Arr
    console.log(userList.value);
};

onMounted(() => {
    list();
});
</script>

<style lang="scss" scoped>
.editor {
    background-color: #F6F6F6;
    width: 100vw;
    height: 100vh;

    .top {
        width: 750px;
        height: 120px;
        display: flex;
        align-items: center;
        padding: 50px 36px 28px 36px;
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
}
</style>
