<template>
  <div class="">
    <van-nav-bar :border="false" @click-left="onClickLeft">
      <template #left>
        <van-icon name="arrow-left" size="18" color="#000000FF" />
      </template>
    </van-nav-bar>
    <div class="wrapper">
      <div class="remarks">设置好友备注</div>
      <div class="z-flex-justify-center">
        <van-image
          width="50"
          height="50"
          :src="route.query.url ? route.query.url :'static/20230407163657.png'"
          fit="cover"
          round
        />
        <van-field
          v-model="value"
        
          :clearable="true"
        />
      </div>
      <van-divider />
    </div>
    <div class="btn" @click="addRanks">
      <van-button type="primary" style="width: 160px;height: 40px;border-radius: 10px;">确定</van-button>
    </div>
  </div>
</template>

<script setup  lang="ts">
import { ref,onMounted } from "vue";
import { useRoute,useRouter } from "vue-router";
import {  contactTop } from "@/request/http.api";
const value = ref("");
const route = useRoute();
const router = useRouter()
const onClickLeft = () => {
  history.back();
};
const findTop = async ()=>{
  const res  = await contactTop({ 
      contactId:route.query.id,
      remark:value.value
    
  
  })
  console.log(res);
}
const addRanks = ()=>{
  findTop()
  router.go(-2)
}

onMounted(()=>{
  value.value = route.query.name
})
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 100px;
  margin: 100px 52px 0 36px;
  .remarks {
    font-size: 44px;
    text-align: center;
    margin-bottom: 30px;
  }
}
.btn{
  text-align: center;
  margin-top: 320px;
}
</style>
