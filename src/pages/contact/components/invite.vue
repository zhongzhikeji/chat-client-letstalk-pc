<template>
    <div class="editor">
        <div class="top">
            <van-icon name="arrow-left" color="#000" @click="onClickLeft" />
            <span>邀请新成员</span>
        </div>
        <div class="center">
            <van-search v-model="value" placeholder="搜索" shape="round" right-icon="scan" />
            <div class="group">
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="联络人" name="1" style="font-size: 16px;">
                        <template #right-icon>
                        </template>
                    </van-collapse-item>
                    <div class="list_user">
                        <div class="item">
                            <van-image width="35" height="35" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                                round />
                            <span style="margin-left: 20px;">名字</span>
                        </div>
                        <div style="margin-right: 10px" class="checkbox">
                            <van-checkbox-group v-model="checked">
                                <van-checkbox :name="item" @click="toggle"
                                    checked-color="linear-gradient(180deg, #52AEF7 0%, #60EEB5 100%)"></van-checkbox>
                            </van-checkbox-group>
                        </div>
                    </div>
                </van-collapse>
            </div>
            <div class="btn">
                <van-button block :disabled="btn" :color="keys == false ? '#7b7d83' : '#44B5FFFF'"
                    @click="changeAdd">新增</van-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUpdate, computed } from "vue";
import { findMyFriends, addgroup } from "@/request/http.api.ts";
const onClickLeft = () => history.back();
let imgSrc = ref("/src/assets/image/66680.png")
const keys = ref(false);
const btn = ref(true);
const btnColor = ref("#");
const checked = ref([]);

const userList = ref([]);
const pushList = ref([]);
const friend = computed(() => {
    return store.friendListgroup
})
const toggle = computed(() => {
    if (checked.value) {
        pushList.value = checked.value
    }
    if (checked.value.length > 0) {
        keys.value = true;
        btn.value = false;
    } else {
        keys.value = false;
    }
});
const change = function () {
    if (imgSrc.value == "/src/assets/image/21974.png") {
        imgSrc.value = "/src/assets/image/66680.png"
    } else {
        imgSrc.value = "/src/assets/image/21974.png"
    }
}
const getList = async () => {
    let res = await findMyFriends();
    userList.value = res;
    console.log(1111);
};
console.log(222, userList.value);

const changeAdd = async () => {
    store.friendListgroup = pushList
    let obj = {
        gid: localStorage.getItem("groupId"),
        uids: []
    }
    friend.value.forEach(item => {
        obj.uids.push(item.id)
    })
    console.log(friend.value);
    addgroup(obj).then(res => {
        console.log(res);
        Toast(res);
        router.push("/groupmenber")
    })

};
onMounted(() => {
    getList();
});
</script>

<style lang="scss" scoped>
.van-checkbox__icon--checked .van-icon {
    background: linear-gradient(180deg, #52AEF7 0%, #60EEB5 100%);
    border-color: transparent;
}

.van-button--block {
    border-radius: 12px;
}

.van-search__content {
    border-radius: 10px;
}

.van-tabs__line {
    background: linear-gradient(180deg, #14BFFD 0%, #69D29A 100%) !important;
}

.checkbox {
    margin-top: 10px;
    float: right;
}

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

    .btn {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 36px;

        .van-button {
            height: 41px;
        }
    }
}
</style>
