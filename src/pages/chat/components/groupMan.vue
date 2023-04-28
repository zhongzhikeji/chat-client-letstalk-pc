<template>
    <div class="editor">
        <div class="top">
            <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
            <span>群管理员</span>
        </div>
        <div class="center">
            <div class="group">
                <div><img src="../../../assets/image/67089.png"
                        alt="">
                </div>
                <p style="text-align: center; font-size: 14px;" class="text">群管理员</p>
                <P style="margin-top: 35px;">
                    群管理员可以拥有以下能力：
                </P>
                <P>
                    1.100人以上群聊修改群聊名称
                </P>
                <P>
                    2.发表群公告
                </P>
                <P>
                    3.设置进群方式，并可确认进群申请
                </P>
                <P>
                    4.移除群成员
                </P>
            </div>
            <div class="manager">
                <div class="mTop">
                    <span>管理员</span>
                    <span class="text">
                        共{{ userList.length }}名管理员
                        <van-icon name="arrow" style="margin-left: 10px;" />
                    </span>
                </div>
                <div class="mCenter">
                    <div class="item" v-for="(item, index) in userList" :key="index">
                        <van-image round width="32" height="32" :src="item.avatarUrl"
                            style="margin-left: 18px; margin-bottom: 2px;" />
                        <p>{{ item.username }}</p>
                    </div>
                    <div class="item" @click="router.push('addGroupMan')">
                        <van-image round width="32" height="32" :src="utils.get_img_url('chatGrop/66790@3x.png')"
                            style="margin-left: 18px; margin-bottom: 2px;" />
                        <p>邀请</p>
                    </div>
                    <div class="item" @click="router.push('removeGroupMan')">
                        <van-image round width="32" height="32" :src="utils.get_img_url('67032.png')"
                            style="margin-left: 18px; margin-bottom: 2px;" />
                        <p>移除</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router";
import { getBoID, findGroupMember } from "@/request/http.api.ts";
import utils from "@/utils";
const router = useRouter();
const onClickLeft = () => history.back();
const toForward = () => {
    console.log(11);
    router.push({ path: '/retransmission', query: { id: id.value } });

}
const id = ref("")
getBoID(localStorage.getItem("groupId")).then(res => {
    console.log(res);
    id.value = res.data.id
})
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
        height: px;
        display: flex;
        padding: 40px 36px 28px 36px;
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

        padding: 36px;

        .group {
            width: 678px;
            height: 620px;
            background: #FFFFFF;
            border-radius: 24px 24px 24px 24px;
            opacity: 1;
            overflow: hidden;

            div {
                width: 146px;
                height: 146px;
                margin: 0 auto;
                margin-top: 100px;
                margin-bottom: 40px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }

            P {
                font-size: 24px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                color: #939395;

                line-height: 45px;
                margin-left: 48px;

            }

            .text {
                margin-left: 0px;
                text-align: center;
                font-size: 16px;
                color: #000000;
            }
        }

        .manager {
            width: 678px;
            height: 420px;
            background-color: #fff;
            padding: 24px;
            margin-bottom: 24px;
            border-radius: 24px 24px 24px 24px;
            margin-top: 20px;

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
    }
}
</style>
