<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back" />
        <!--     <van-icon name="share-o" @click="showPopup" class="right" /> -->
        </div>
  <!--       <div class="center">
            <div class="avator">
                <van-image width="10rem" height="10rem" :src="utils.get_img_url('20230403154204.png')" position="right" />
            </div>
            <p>让你的朋友扫描此QR二维码假如你法人LetStalk联络人</p>
        </div>
        <van-share-sheet v-model:show="showShare" :options="options" title="立即分享给好友" description="描述信息" />
        <div class="footer">
            扫描QR图码
        </div>  -->
    </div>
</template>
  
<script setup   >
import { ref } from "vue"
import { useRouter } from 'vue-router';
import QRCode from 'qrcode' 
import utils from "@/utils";
const router = useRouter()
const back = function () {
    router.push("/set")
}
const value = "1111111"
var checked2 = ref(false)
var checked3 = ref(true)
const showPopup = function () {
    showShare.value = true
    console.log(showShare);
}
let showShare = ref(false);
let imgUrl = ref('');
const options = [
    [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' }
    ],
    [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
        { name: '小程序码', icon: 'weapp-qrcode' }
    ],
];
let url = location.href;
console.log(url);
//把当前地址栏的路径放到toDataURL后面，就会生成二维码
QRCode.toDataURL(url)
    .then(img => {
        console.log(img);
        //把生成的二维码赋值给上面定义好的imgUrl 
    imgUrl.value = img;
    })
    //错误返回信息
    .catch(err => {

        console.error(err);
    });
</script>
  
<style lang="scss" scoped>
.bgc {
    
    height: 100vh;
    background-image: url(../../assets/image/qr.png);
    background-size: 100%;
    .top{
        padding:40px
    }

   
}
</style>