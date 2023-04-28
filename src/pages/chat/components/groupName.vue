<template>
    <div class="groupSet">
        <div class="header">
            <div>
                <van-icon name="arrow-left" color="black" @click="onClickLeft" />
                <span style="margin-left: 10px">群组管理</span>
            </div>
        </div>
        <div class="center">
            <p style="
                                        font-size: 22px;
                                        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                                        font-weight: 400;
                                        color: #000000;
                                        text-align: center;
                                        margin-top: 50px;">
                修改群聊名称/头像
            </p>
            <p style="
                                    font-size: 14px;
                                    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                                    font-weight: 300;
                                    color: #000000;
                                    text-align: center;
                                    margin-top: 18px;
                                    margin-bottom: 20px;
                                    ">
                修改群聊名称/头像后，将在群内通知其他成员。
            </p>
        </div>
        <van-cell-group inset>
            <div class="avator">
                <van-uploader :after-read="afterRead">
                    <van-image round
                        :src="avator? avator:'static/group.png'"
                        position="right" />
                </van-uploader>
            </div>
            <van-field v-model="value2" clearable :placeholder="route.query.name" />
        </van-cell-group>
        <div class="btn" @click="updateInfo">确认</div>
    </div>
</template>
<script setup>

import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { updateGroupInfo, setGroupAvatarUrl,fileUpload,findName } from "@/request/http.api";
import { Toast } from "vant";
const router = useRouter();
const route = useRoute();
const onClickLeft = () => history.back();
const value2 = ref("")
const updateInfo = function () {
    updateGroupInfo({ groupId: localStorage.getItem("groupId"), name: value2.value }).then(res => {
        console.log(res);
        Toast(`修改为${res.data.name}`)
        router.go(-1)
    })
}
const avator = ref("")
findName({ groupId: localStorage.getItem("groupId")}).then(res=>{
    console.log(res);
    avator.value=res.data.groupHead
})

const afterRead = (file) => {
    // 此时可以自行将文件上传至服务器
    let formData = new FormData();
    formData.append('file', file.file);
    formData.append('groupId', localStorage.getItem("groupId"));
    fileUpload(formData).then(res => {
        console.log(res);
        avator.value = res.data.fileUrl
    })
    //调修改接口
    setGroupAvatarUrl(formData).then(res => {
        console.log(23445);
        console.log(res);
        avator.value = res.data.groupHead
    })

};

</script>
  
<style lang="scss" scoped>
.van-switch--on {
    background: linear-gradient(180deg, #14BFFD 0%, #69D29A 100%);
}

.groupSet {

    .header {
        padding: 45px 50px 45px 30px;
        color: #fff;
        font-size: 1.25rem;
    }

    ::v-deep .van-icon__image {
        width: 50px;
        height: 50px;
    }

    ::v-deep .van-field__body {
        margin-top: 15px;
        margin-left: 5px;
    }
    ::v-deep .van-field__control{
        font-size: 20px;
        margin-top: 12px;

    }

    ::v-deep .van-cell-group {
        display: flex;
    }

    .btn {
        width: 320px;
        height: 80px;
        background: #44B5FF;
        border-radius: 20px 20px 20px 20px;
        opacity: 1;
        color: #fff;
        text-align: center;
        line-height: 80px;
        margin: 0 auto;
        margin-top: 100px;
    }

    .avator {
        height: 200px;
        width: 200px;
        border-radius: 10px;
        overflow: hidden;
        display: inline-block;

        img {
            width: 100%;
            height: 100%;

        }
    }

}</style>
  