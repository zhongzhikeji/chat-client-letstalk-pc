<template>
    <div class="editor">
        <div class="top">
            <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
            <span>成员权限</span>
        </div>
        <div class="center">
            <div class="group">
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="允许成员私聊" name="1" style="font-size: 16px;">
                        <template #right-icon>
                            <van-switch v-model="checked1"
                                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)"
                                inactive-color="#dcdee0" />
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="允许提醒他人" name="1" style="font-size: 16px;">
                        <template #right-icon>
                            <van-switch v-model="checked2"
                                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)"
                                inactive-color="#dcdee0" />
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="上传文件" name="1" style="font-size: 16px;">
                        <template #right-icon>
                            <van-switch v-model="checked3"
                                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)"
                                inactive-color="#dcdee0" />
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="上传相册" name="1" style="font-size: 16px;">
                        <template #right-icon>
                            <van-switch v-model="checked4"
                                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)"
                                inactive-color="#dcdee0" />
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="更改群头像" name="1" style="font-size: 16px;">
                        <template #right-icon>
                            <van-switch v-model="checked5"
                                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)"
                                inactive-color="#dcdee0" />
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="更改群昵称" name="1" style="font-size: 16px;">
                        <template #right-icon>
                            <van-switch v-model="checked6"
                                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)"
                                inactive-color="#dcdee0" />
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="邀请成员" name="1" style="font-size: 16px;">
                        <template #right-icon>
                            <van-switch v-model="checked7"
                                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)"
                                inactive-color="#dcdee0" />
                        </template>
                    </van-collapse-item>
                    <van-collapse-item title="移除成员" name="1" style="font-size: 16px;">
                        <template #right-icon>
                            <van-switch v-model="checked8"
                                active-color="linear-gradient(180deg, #14BFFD 0%, #69D29A 100%)"
                                inactive-color="#dcdee0" />
                        </template>
                    </van-collapse-item>

                </van-collapse>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
const onClickLeft = () => history.back();
const checked1 = ref(true);
const checked2 = ref(true);
const checked3 = ref(true);
const checked4 = ref(false);
const checked5 = ref(true);
const checked6 = ref(true);
const checked7 = ref(true);
const checked8 = ref(false);
</script>

<style lang="scss" scoped>
.editor {
    background-color: #F6F6F6;
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



   .center{
    padding: 24px 36px 0;
    .group {
        border-radius: 24px;
        overflow: hidden;
        margin-bottom: 24px;
       
        .van-switch--on {
            background: linear-gradient(180deg, #14BFFD 0%, #69D29A 100%);
        }
        ::v-deep .van-cell__title{
            margin-top: 5px;
        }

    }
   }
}
</style>
