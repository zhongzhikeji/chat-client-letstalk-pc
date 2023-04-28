<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back" style="float: left; margin-top: 17px;" />
        </div>
        <div class="center">
            <div class="avator">
                <van-image :src="avator ? avator : 'static/group.png'" position="right" />
            </div>
            <p class="name"> {{ groupName }}</p>
            <p class="count">群成员{{ groupUserSize }}人</p>
            <p class="herf" @click="copy">{{ herf }}</p>
            <div class="btn" @click="add">加入群聊</div>
        </div>

    </div>
</template>
  
<script setup>
import { ref } from "vue"
import { useRouter, useRoute } from 'vue-router';
import { findName, addgroup } from "@/request/http.api";
import moment from "moment"
import { areaList } from '@vant/area-data';
import { Toast } from "vant";
import clipboard3 from "vue-clipboard3";
const { toClipboard } = clipboard3();
const router = useRouter()
const route = useRoute()
const back = function () {
    router.go(-1)
}
const avator = ref('')
const groupUserSize = ref('')
const groupName = ref('')
const herf = ref('')
herf.value = window.location.href
findName({ groupId: localStorage.getItem("groupId") }).then(res => {
    console.log(res);
    avator.value = res.data.groupHead
    groupUserSize.value = res.data.groupUserSize
    groupName.value = res.data.groupName
})
let arr = []
if (localStorage.getItem("token")) {
    console.log('token123');
    arr = [JSON.parse(localStorage.getItem("info")).id]
    console.log(route.query.groupId, arr);
} else {
    router.push({ path: 'login', query: { groupID: route.query.groupId } });
}
const add = function () {
    addgroup({ gid: route.query.groupId, uids: arr }).then(res => {
        Toast("加群成功")

    }).catch(err => {
        Toast(err.response.data)

    })
    router.push("/contact")
}
const copy = async () => {
    try {
        await toClipboard(`https://foxim.lvyanhui.com/#/jumpToGroupId?groupId=${route.query.groupID}`);
        Toast.success("复制成功");
    } catch (error) {
        console.log(error);
    }
};

</script>
  
<style lang="scss" scoped>
.bgc {
    box-sizing: border-box;
    padding: 18px;



    .top {
        height: 3rem;
        font-size: 5vw;
        line-height: 4rem;

        text-align: center;
    }

    .center {
        background-color: #fff;
        border-radius: 2rem 2rem 0 0;
        padding: 1rem;

        .avator {
            width: 200px;
            height: 200px;
            border-radius: 24px;
            overflow: hidden;
            margin: 0 auto;
        }

        .name {
            text-align: center;
            font-size: 32px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #000000;
            margin-top: 24px;
            margin-bottom: 16px;
        }

        .count {
            font-size: 24px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #939395;
            text-align: center;
            margin-bottom: 28px;
        }

        .herf {
            width: 444px;
            height: 82px;
            background: #F3F5F8;
            border-radius: 22px 22px 22px 22px;
            opacity: 1;
            margin: 0 auto;
            text-align: center;
            line-height: 82px;
            margin-bottom: 112px;
            overflow-x: scroll;
            padding: 10px;
        }

        .btn {
            width: 542px;
            height: 82px;
            background: #4A8AFF;
            border-radius: 20px 20px 20px 20px;
            opacity: 1;
            text-align: center;
            line-height: 82px;
            color: #fff;
            font-size: 32px;
            margin: 0 auto;

        }
    }
}
</style>