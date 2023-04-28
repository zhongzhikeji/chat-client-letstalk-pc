<template>
    <div class="container">

        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" :key="route.name" v-if="route.meta.keepAlive"></component>
            </keep-alive>
            <component :is="Component" :key="route.name" v-if="!route.meta.keepAlive"></component>
        </router-view>


    </div>
    <div class="zml-tabbar" v-if="route.meta.show">
        <van-tabbar route placeholder inactive-color="#ccc" active-color="#0ABCE2FF"
        
        >
            <van-tabbar-item icon="chat-o" to="/chat">
                <template #icon="props">
                    <img :src="props.active ? utils.get_img_url('67328 (4).png') : utils.get_img_url('67328 (2).png')"  />
                </template>

                狐狸</van-tabbar-item>
                
            <van-tabbar-item icon="friends-o" to="/contact" @click="kong">联络人
                <template #icon="props">
                    <van-badge :content="infoList.length" v-if="infoList.length"/>
                    <img :src="props.active ? utils.get_img_url('67328 (5).png') : utils.get_img_url('67328 (1).png')"  />
                </template>
            </van-tabbar-item>
         
            <!-- <van-tabbar-item icon="user-circle-o" to="/circle">发现</van-tabbar-item> -->
            <van-tabbar-item icon="setting-o" to="/set">设定
                <template #icon="props">
                    <img :src="props.active ? utils.get_img_url('67328 (6).png') : utils.get_img_url('67328 (3).png')"  />
                </template>
            </van-tabbar-item>
            <!-- <van-tabbar-item icon="search" :url="url" :replace="true">发现
       
            </van-tabbar-item> -->
        </van-tabbar>
        
    </div>
</template>

<script lang="ts" setup>
import { onMounted ,watch,ref} from "vue";
import { useRoute } from 'vue-router';
import appStore from "@/store/index";
import utils from "@/utils";
import { storeToRefs } from "pinia";
import {searchUrl} from '@/request/http.api'
const store = appStore();
const { abc } = storeToRefs(store);
const route = useRoute()
const { connect } = store
const url = ref('')
const searchAdd = async()=>{
const res =await searchUrl()
    url.value = res.data
  
  
}
// window.addEventListener('resize', function() {
//   var bodyHeight = document.documentElement.clientHeight;
//   var screenHeight = window.screen.height;
//   var diff = screenHeight - bodyHeight;
//   if (diff > 0) {
//     document.body.style.paddingBottom = diff + 'px';
//   } else {
//     document.body.style.paddingBottom = '0';
//   }
// });

onMounted(() => {
    connect()
    searchAdd()
})
let infoList=ref([])
watch(
  ()=>abc.value,
  (val)=>{
    console.log(val,1111);
    infoList.value.push(val)
    console.log(infoList.value);
  }
)
const kong=function(){
    infoList.value=[]
}
</script>

<style lang="scss">
.van-badge{
    position: absolute;
    top: -10px;
}
.van-tabbar--fixed{
   width: 30% !important;
   left:35% !important;
   border: 1px solid #eee;
}
.container{
    height: 100vh;
    border: 1px solid #eee;
    width: 30%;
    margin: 0 auto;
}
</style>
