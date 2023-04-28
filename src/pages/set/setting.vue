<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back" style="float: left; margin-top: 7px;" /> 个人资料
        </div>
        <div class="center">
            <div class="avator">
                <van-uploader :after-read="afterRead">
                    <van-image round width="5rem" height="5rem" :src="avatul ? avatul :'static/20230407163657.png'" position="right" />
                      <!--   src="../../../20230407163657.png"  -->
                </van-uploader>
            </div>
            <p style="font-size: 16px;">狐狸号: {{ foxCode }}</p>
        </div>
        <div class="list">
            <van-cell title="姓名" icon="manager-o" :value="name" is-link @click="showPopup1" />
            <van-cell title="个性签名" icon="bullhorn-o" :value="bio" is-link @click="showPopup" />
            <van-cell title="性别" icon="chat-o" :value="sex" is-link @click="showPicker = true" name="picker" />
            <van-cell title="地区" icon="friends-o" :value="region" is-link @click="showArea = true" />
            <van-cell title="手机号" icon="friends-o" :value="mobile" is-link />
        </div>
        <van-popup v-model:show="show" position="bottom" :style="{ height: '20%' }">
            <p style="text-align: center; margin-bottom: 20px; ">修改个性签名</p>
            <van-field v-model="value2" clearable label="签名" placeholder="请输入您的签名" />
            <van-button type="primary" block round @click="setQian">确定</van-button>
        </van-popup>
        <van-popup v-model:show="show1" position="bottom" :style="{ height: '20%' }">
            <p style="text-align: center; margin-bottom: 20px; ">修改昵称</p>
            <van-field v-model="value3" clearable label="昵称" placeholder="请输入您的昵称" />
            <van-button type="primary" block round @click="setNi">确定</van-button>
        </van-popup>
        <van-popup v-model:show="showPicker" position="bottom">
            <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
        <van-popup v-model:show="showArea" position="bottom">
            <van-area :area-list="areaList" @confirm="onConfirm2" @cancel="showArea = false" />
        </van-popup>
    </div>
</template>
  
<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router';
import { setUserInfo, fileUpload, setUserAvatarUrl } from "@/request/http.api";
import moment from "moment"
import { areaList } from '@vant/area-data';
const router = useRouter()
const back = function () {
    router.go(-1)
}
let foxCode = ref("")
foxCode.value = JSON.parse(localStorage.getItem("info")).foxCode
//信息
let name = ref("")
name.value = JSON.parse(localStorage.getItem('info')).displayName ? JSON.parse(localStorage.getItem('info')).displayName : "未设置"
let bio = ref("")
bio.value = JSON.parse(localStorage.getItem('info')).bio ? JSON.parse(localStorage.getItem('info')).bio : "未设置"
let mobile = ref("")
mobile.value = JSON.parse(localStorage.getItem('info')).mobile ? JSON.parse(localStorage.getItem('info')).mobile : "未设置"
let sex = ref("")
sex.value = JSON.parse(localStorage.getItem('info')).sex ? JSON.parse(localStorage.getItem('info')).sex : "未设置"
let region = ref("")
region.value = JSON.parse(localStorage.getItem('info')).region ? JSON.parse(localStorage.getItem('info')).region : "未设置"
let exp = ref("")
exp.value = JSON.parse(localStorage.getItem('info')).exp ? JSON.parse(localStorage.getItem('info')).exp : "未设置"
let birth = ref("")
birth.value = JSON.parse(localStorage.getItem('info')).birth ? JSON.parse(localStorage.getItem('info')).birth : "未设置"

const show = ref(false)
const show1 = ref(false)
const show2 = ref(false)
const result = ref('');
const showPicker = ref(false);
const showPicker1 = ref(false);
const columns = [
    { text: '女', value: 'woman' },
    { text: '男', value: 'man' },
];

const onConfirm = (selectedOptions) => {
    console.log(selectedOptions.text);
    result.value = selectedOptions[0]?.text;
    setUserInfo({ sex: selectedOptions.text }).then(res => {
        console.log(res);
        show1.value = false
        localStorage.setItem("info", JSON.stringify(res.data))
        sex.value = res.data.sex
    })
    showPicker.value = false;

};
const onConfirm1 = (selectedValues) => {
    let str = moment(new Date(selectedValues)).format("YYYY-MM-DD")

    setUserInfo({ birth: str }).then(res => {
        console.log(res);
        birth.value = res.data.birth
        localStorage.setItem("info", JSON.stringify(res.data))
    })

    showPicker1.value = false;

};
const showArea = ref(false);
const onConfirm2 = (selectedOptions) => {

    console.log(selectedOptions);
    let str = ""
    selectedOptions.forEach(ele => {
        console.log(ele.name);
        str = str + ele.name
    });
    setUserInfo({ region: str }).then(res => {
        console.log(res);
        localStorage.setItem("info", JSON.stringify(res.data))
        region.value = res.data.region
    })
    showArea.value = false;
};
const showPopup = function () {
    show.value = true
}
const showPopup1 = function () {
    show1.value = true
}
const showPopup2 = function () {
    show2.value = true
}
//个性签名
const value2 = ref("")
const setQian = function () {
    setUserInfo({ bio: value2.value }).then(res => {
        console.log(res);
        show.value = false
        localStorage.setItem("info", JSON.stringify(res.data))
        bio.value = res.data.bio
    })

}
//昵称
const value3 = ref("")
const setNi = function () {
    setUserInfo({ username: value3.value }).then(res => {
        console.log(res);
        localStorage.setItem("info", JSON.stringify(res.data))
        name.value = res.data.username
        show1.value = false

    })
}
let avatul = ref("")
avatul.value = JSON.parse(localStorage.getItem("info")).avatarUrl
const fileList = ref([
    { url: avatul.value, isImage: true },
    // Uploader 根据文件后缀来判断是否为图片文件
    // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
]);

const afterRead = (file) => {
    // 此时可以自行将文件上传至服务器
    let formData = new FormData();
    formData.append('file', file.file);
    console.log(file.file, 11111);
    fileUpload(formData).then(res => {
        avatul.value = res.data.fileUrl
    })
    //调修改接口
    setUserAvatarUrl(formData).then(res => {
        console.log(23445);
        console.log(res);
        res.data.avatarUrl += '?width=128&height=128'
        localStorage.setItem("info", JSON.stringify(res.data))
        avatul.value = res.data.avatarUrl
    })

};

</script>
  
<style lang="scss" scoped>
.bgc {
    box-sizing: border-box;
    padding: 18px;

    .van-switch--on {
        background: linear-gradient(180deg, #14bffd 0%, #69d29a 100%);
    }

    ::v-deep .van-popup {
        padding: 10px 20px 30px 20px;
        box-sizing: border-box;
        overflow: hidden;
    }

    ::v-deep .van-button:before {
        background-color: red;
    }

    .top {
     
        font-size: 20px;
        line-height: 30px;
      

        text-align: center;
    }

    .center {
        background-color: #fff;
        border-radius: 2rem 2rem 0 0;
        padding: 1rem;

        .avator {
            width: 4.6875rem;
            margin: 0 auto;
            margin-top: 1.25rem;
        }

        p {
            width: 23.4375rem !important;
            text-align: center;
            font-size: 20px;
            margin-top: .625rem;
            color: gray;
        }

    }
}
</style>