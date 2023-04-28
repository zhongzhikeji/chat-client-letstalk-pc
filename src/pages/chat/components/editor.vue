<template>
  <div class="editor">
    <div class="header" style="padding: 50px 20px 15px 20px;">
      <div>
      <van-icon name="cross" color="#fff" @click="onClickLeft"/>
    <span style="margin-left: 10px">通知</span>
      </div>
    </div>
  <div class="z-chat_content ">
   <div style="margin-top: 60px;"></div>
    
  </div>
  </div>
</template>

<script setup>
import {ref,onMounted,computed} from "vue"
import {useRouter,useRoute} from 'vue-router';
import appStore from '@/store/index.ts'
import { newGroup } from "@/request/http.api.ts";
import { Toast  } from 'vant';
const store = appStore()
const value = ref('');
const fileList = ref([]);
const router = useRouter()
const route = useRoute()
const btn = ref(true);
const keys = ref(false);
const friend = computed(()=>{
  return store.friendList
})

const group =async ()=>{
  let obj =  {
     name:value.value,
     usersId:[]
  }
  friend.value.forEach(item=>{
    obj.usersId.push(item.id)
  })
    try {
      let res = await newGroup(obj)
      router.push("/contact")
    store.friendList =[]
    } catch (error) {
      Toast.fail(error)
    }
  }
const onClickLeft = () => history.back();
const toMember = ()=>{
  router.push('/addMember')
}

</script>

<style lang="scss" >
.editor{
  background-image: url("@/assets/image/bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  .van-cell__right-icon{
    color:#000
  }
  .header{
    padding: 50px 50px 50px 30px;
    color: #fff;
    font-size: 1.25rem;
  }

  .van-field__control{
    background: #eee;
    border-radius: 10px;
    height: 35px;
    padding: 5px;
  }


}
</style>
