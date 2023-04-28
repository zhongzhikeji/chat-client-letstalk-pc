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
                    <van-collapse-item title="群成员" name="1">
                        <div class="list" v-for="(item, index) in userList" :key="index">
                            <div
                                style="display: flex; align-items: center; margin-left: 10px border-bottom: 1px solid #000;">
                                <van-image width="36" height="36"
                                    :src="item.avatarUrl" round />
                                <span style="margin-left: 24px">{{ item.username }}</span>
                            </div>
                            <div style="margin-right: 10px">
                                <van-checkbox-group v-model="checked" ref="checkboxGroup">
                                    <van-checkbox :name="item" @click="toggle"></van-checkbox>
                                </van-checkbox-group>
                            </div>
                        </div>
                    </van-collapse-item>
                </van-collapse>
            </div>
            <div class="btn">
                <van-button block :disabled="btn" :color="keys == false ? '#7b7d83' : '#07c160'" size="small"
                    @click="infoSet">确定</van-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref ,computed,onMounted} from "vue"
import { findMyFriends, findGroup ,getBoID,botInfo,findGroupMember} from "@/request/http.api.ts";
const onClickLeft = () => history.back();
let imgSrc = ref("/src/assets/image/66680.png")
const change = function () {
    if (imgSrc.value == "/src/assets/image/21974.png") {
        imgSrc.value = "/src/assets/image/66680.png"
    } else {
        imgSrc.value = "/src/assets/image/21974.png"
    }
}
const keys = ref(false);
const btn = ref(true);
const btnColor = ref("#");
const checked = ref([]);
const checkboxGroup = ref(null);
const pushList = ref([]);
const friend = computed(() => {
  return store.friendListgroup
})
let obj
const toggle =async () => {
 
  if (checked.value) {
    
    pushList.value = checked.value
  }
  if (checked.value.length > 0) {
    keys.value = true;
    btn.value = false;
  } else {
    keys.value = false;
  }
  console.log(pushList.value);
  let targetIds=[]
  let sourceIds=[]
  pushList.value.forEach(item=>{
    console.log(item);
    if(item.id){
        sourceIds.push(item.id)
    }else{
        sourceIds.push(item.groupId)
    }
  })
  console.log(targetIds,sourceIds);
   obj={
    sourceIds,
    groupId:localStorage.getItem("groupId")
  }
 let res= await getBoID(localStorage.getItem("groupId"))
 obj.id=res.data.id

};
const infoSet = function () {
  botInfo(obj).then(res => {
    console.log(res);
  })
  history.back()
}
const activeNames = ref(['1']);
const userList = ref([])
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

            .list {
                display: flex;
                justify-content: space-between;
                padding-bottom: 18px;
                margin-bottom: 18px;
                border-bottom: 1px solid #e3e3e333;
            }

            .user {
                width: 100%;
                background-color: #eee;
                position: absolute;
                bottom: 100px;

                .list_user {
                    padding: 15px;
                    display: flex;

                    .item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-left: 20px;
                    }
                }
            }

            .list_user {
                padding: 15px;
                display: flex;
                background-color: #fff;

                .item {
                    display: flex;
                    align-items: center;
                    margin-left: 10px;
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
        position: fixed;

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
    .btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    margin-left: -35px;
    .van-button {
      height: 50px;
    }
  }
}
</style>
