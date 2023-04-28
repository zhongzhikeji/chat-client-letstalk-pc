<template>
    <div class="editor">
        <div class="top">
            <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
            <span>定时信息</span>
        </div>
        <div class="center">
            <div class="group">
                <van-tabs v-model:active="activeName" title-active-color="#0ABCE2" line-width="30px">
                    <van-tab title="普通消息" name="a">

                        <div class="item">
                            <p class="text">请填写消息主题</p>
                            <div class="content">
                                <textarea name="sign" rows="5" cols="30" placeholder="@全体成员" v-model="pubText"></textarea>
                                <div style="border-top: 0.5px solid rgb(248 241 241); padding-top: 10px; padding-right: 10px;">
                                    <span style="float: right; font-size: 11px;
                                    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                                    font-weight: 400;
                                    color: #939395;">首次编辑</span>
                                </div>
                            </div>
                            <van-cell title="提醒时间" is-link style=" border-radius: 10px 10px 0 0"/>
                            <van-cell title="重复" is-link style=" border-radius:0 0 10px 10px"/>
                        </div>


                    </van-tab>
                    <van-tab title="通话预定" name="b">
                        <div class="item">
                            <p class="text">请填写消息主题</p>
                            <div class="content">
                                <textarea name="sign" rows="5" cols="30" placeholder="@全体成员" v-model="pubText"></textarea>
                                <div style="border-top: 0.5px solid rgb(248 241 241); padding-top: 10px; padding-right: 10px;">
                                    <span style="float: right; font-size: 11px;
                                                            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                                                            font-weight: 400;
                                                            color: #939395;
                                    ">首次编辑</span>
                                </div>
                            </div>
                            <van-cell title="提醒时间" is-link style=" border-radius: 10px 10px 0 0"/>
                            <van-cell title="重复" is-link style=" border-radius:0 0 10px 10px"/>
                            <van-cell title="开始前提醒" is-link style="margin-top: 10px; border-radius: 10px"/>
                        </div>
                    </van-tab>
                </van-tabs>
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
                height: 352px;
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
                }
            }
        }
    }
}
</style>
