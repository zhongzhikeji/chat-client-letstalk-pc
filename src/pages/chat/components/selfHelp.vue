<template>
    <div class="editor">
        <div class="top">
            <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
            <span>自助问答</span>
        </div>
        <div class="center">
            <div class="group">
                        <div class="item">
                            <p class="text">问题</p>
                            <div class="content" style="height: 52px;">
                                <textarea name="sign" rows="5" cols="30" v-model="pubText"></textarea>
                            </div>
                        </div>
                        <div class="item">
                            <p class="text">答案</p>
                            <div class="content">
                                <textarea name="sign" rows="5" cols="30" v-model="pubText"></textarea>
                            </div>
                            <p class="text">当前不支持在答案中填入链接</p>
                            <p class="text" style="margin-top: 10px;">设置关键词</p>
                            <p class="text" style="margin-top: 10px;">添加关键词后，群成员@群管家+关键词，同样能触发答案。</p>
                        </div>
                        
             
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { findMyFriends, findGroup, getBoID, botInfo } from "@/request/http.api.ts";
const onClickLeft = () => history.back();
const activeName = ref('a');
</script>

<style lang="scss" scoped>
.editor {

    background: #F6F6F6;
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


    .group {
        border-radius: 24px;
        overflow: hidden;
        margin-bottom: 24px;

        ::v-deep .van-tabs__line {
            background-color: #0ABCE2;
        }

        .item {
            padding: 40px;

            .text {
                font-size: 12px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                color: #939395;
            }

            .content {

                width: 678px;
                height: 243px;
                background: #FFFFFF;
                border-radius: 24px 24px 24px 24px;
                opacity: 1;
                border: none;
                margin: 16px auto;

                textarea {
                    width: 98%;
                    border-radius: 24px 24px 24px 24px;
                    border: none;
                    padding: 20px;
                    box-sizing: border-box;
                    height: 100%;
                }
            }
        }
    }
}
</style>
