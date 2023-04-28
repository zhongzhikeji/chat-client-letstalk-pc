<template>
  <div class="forward">
    <div class="header">
      <div @click="toPage">关闭</div>
      <div>选择一个聊天</div>
      <div v-show="!isComplete">多选</div>
      <div v-show="isComplete" class="btn" @click="sendMsg">完成({{ checked.length }})</div>
    </div>
    <div>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        shape="round"
        background="#F3F5F8FF"
      />
    </div>
    <div class="recently">
      <div>最近转发</div>
      <div class="z-flex">
        
        <div class="item" v-for="item in wardList">
          <van-badge color="#4a8aff" >
            <van-image
            round
            width="36"
            height="36"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
      <div class="text">{{ item.remark }}</div>
  <template #content>
    <van-icon name="success"  />
  </template>
</van-badge>
     
         
        </div>
      </div>
    </div>
    <div class="rendList">
      <div>
        <div class="title">最近聊天</div>
        <div>
          <van-checkbox-group v-model="checked" @change="changeChe">
          
              <van-cell v-for="item in recentList">
            <template #icon>
              <van-checkbox :name="item" @click.stop  />
            </template>
            <template #title>
              <div class="z-flex-align-center content">
            
                <van-image
                  round
                  width="36"
                  height="36"
                  :src="item.avatarUrl?item.avatarUrl:item.groupHead?item.groupHead:'static/20230407163657.png'"
                />
                <div class="text" v-if="item.username">{{ item.username }}</div>
                <div class="text" v-else>{{ item.groupName }}</div>
              </div>
            </template>
          </van-cell> 
        
          </van-checkbox-group>
        
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import {GetRecent,setForwardTime,getForwardList} from "@/request/http.api";
import appStore from "@/store/index";
import { storeToRefs } from "pinia";
import {  useRoute,useRouter } from "vue-router";
import { Toast } from 'vant';
const store = appStore();
const { send } = store;
const value = ref("");
const checked = ref([])
const recentList = ref([])
const route= useRoute();
const router = useRouter()
const wardList = ref([])

const list = {
  id:[],
  groupId:[]
}
const Recent = async () => {
  const res = await GetRecent()
  recentList.value = res.data
  
}
//更新最近转发人
const setForward =async ()=>{

await setForwardTime(list)
}
const getForward = async ()=>{
 const res =  await getForwardList()
 wardList.value = res.data
 console.log(res.data);
}
const isComplete = ref(false)
const toPage = ()=>{
  history.back();
}
const changeChe = ()=>{
  if(checked.value != ''){
    isComplete.value = true
  }else{
    isComplete.value = false
  }
}

const sendMsg = ()=>{
  let msg= ref(JSON.parse(route.params.value)) ;

  msg.value = msg.value.sort((a,b)=> a.createdAt - b.createdAt)
    console.log(msg.value);
  checked.value.forEach((item)=>{
       
    if(item.username != null){
        list.id.push(item.contactId)
        setForward()
      // msg.value.forEach(i=>{
      //    i.$type = ''
      //   send(`private/${item.contactId}`, JSON.stringify(i));
      //   Toast.success('转发成功')
      //   setTimeout(()=>{
      //      history.back()
      //   },300)
      // })
    }else{
      list.groupId.push(item.groupId)
      setForward()
      msg.value.forEach(i=>{
        i.$type = 'GROUP-MESSAGE'
         send(`group/${item.groupId}`, JSON.stringify(i));
         Toast.success('转发成功')
        setTimeout(()=>{
          history.back()
        },300)
      })
    }
  
  })
}
onMounted(()=>{
  Recent()
  getForward()
})
</script>

<style lang="scss">
.forward {
  .van-search__content--round {
    background: #fff;
  }
  .van-badge__wrapper{
    // width: 35px;
  }
  background-color: #f3f5f8ff;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 55px 36px 36px 36px;
    .btn{
      background-color: #3E78FEFF;
      padding: 8px 18px;
      color: #fff;
      font-size: 24px;
    }
  }
  .header div:nth-child(2) {
    font-size: 32px;
    font-weight: 500;
  }
  .recently {
    padding: 55px 36px 36px 36px;
    .item {
      margin-top: 32px;
      margin-right: 72px;
      .text {
        font-size: 24px;
        width: 70px;
        word-wrap: break-word;
      }
    }
  }
  .rendList {
    border-radius: 24px 24px 0px 0px;
    background-color: #fff;
    .content {
      margin-left: 14px;
    }
    .title {
      padding-top: 20px;
      margin-left: 36px;
      margin-bottom: 16px;
    }
    .text {
      font-size: 24px;
      padding-left: 24px;
    }
  }

}
</style>
