import { defineStore } from "pinia";
import mqtt from 'precompiled-mqtt'
import { Loading,Toast } from "vant";
import { login,findGroup } from "../request/http.api"
import jwt_decode from "jwt-decode";

let client: any;

const appStore = defineStore("app", {
  state: () => ({
    user: null,
    info:'',
    messages: [] as any,
    friendList: [] as any,
    groupAuthority:{
      groupHead:"",
      changeGroupName:'false',
      addGroupUser:'false',
      editorialPost:'false',
      remindOthers:'false',
      groupCall:'false',
      privateMemberChat:'false',
      openBots:'false',
      name:'',
      IdArr:[],
      usersId:[],
      
    }, //创建群权限
    friendListgroup:[],
    obj:{},
    abc:{},
    token: localStorage.getItem("token") || "",
    groupId:"",
    LoadingShow:false
  }),
  actions: {
 
    connect() {
    
    const info= JSON.parse(localStorage.getItem('info')|| '{}')
      if (!info.id) return
   
    
      client = mqtt.connect(`${window.location.origin}/mqtt`.replace('https','wss'),{
        clientId:info.id,
        username:info.id,
        password:this.token,
         clean: false
      })
      console.log(client);
      
      client.on('connect', () => {
        console.log("连接成功");
        
        this.subscribe(`private/${info.id}`)
        this.subscribe(`private/${info.id}/#`)
        this.subscribe(`my-group/${info.id}`)
     
     
      })

      client.on('message', (topic:string, payload:any) => {
        const message = JSON.parse(payload.toString())
        console.log('message',message);
        this.obj = message
        if(message.$type== ''){
          this.isUserList(this.messages,message)  
        }else if(message.$type === 'BURN'){
          this.isUserList(this.messages,message)
        } else if(message.$type=== 'GROUP-MESSAGE'){
           this.isIdList(this.messages,message)  
        }else if(message.type== 'addFriend'){
          // this.obj = message
          this.abc = message
        }
        
        // else if(message.$type== 'recall'){
           
        // }else if(message.$type == 'group'){
         
        // }
        // if(!message.__ignore){
      
        // }
        // else if(message.$type== 'FORWARD'){
        //   this.isIdList(this.messages,message)  
        // }

        // else{
        //   if(topic.indexOf('group') != -1 ){
        //     this.isIdList(this.messages,message)  
        //   }else{
        //     this.messages.push(message)
        //   }
       
        // }
      })
      client.on('error', console.log)
      client.on('reconnect', console.log)
      client.on('disconnect', console.log) // mqtt5 ?
      client.on('offline', console.log)
    },
    subscribe(topic: string) {
      client.subscribe(topic,{qos:1})
    },
    unsubscribe(topic: string) {
      client.unsubscribe(topic)
    },
    send(topic: string, msg:any) {
      client.publish(topic, msg, { qos: 1 })

    },
     isIdList(list: { groupId: string; }[],data: { groupId: string; }){
      
       
      const ide = list.findIndex((i: { groupId: string; })=>i.groupId=== data.groupId)
      if(list.length ==0){
        list.push(data)
        list.forEach(item=>{
         item.createdAt = Date.parse(item.createdAt)
        })
      }
      if(ide != -1){
       list.push(data)
      } 
     },
     isUserList(list: { userId: string; }[],data: { userId: string; }){
      const ide = list.findIndex((i: { userId: string; })=>i.userId=== data.userId)
      if(ide != -1){
       list.push(data)
      } 
     },

    login(userInfo: { token?: string; password: string; account?: string; }) {
      console.log("userInfo", userInfo);
      const { account, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          account: account,
          password: password,
        }).then((res:any) => {
          console.log("返回登录结果 res", typeof res);
            this.token = res.data
           let decoded  = jwt_decode(res.data)
            localStorage.setItem("token", res.data)
            JSON.stringify(localStorage.setItem("info", JSON.stringify(decoded)))
          resolve(res);
        }).catch(err=>{
          Toast(err.response.data)
         
        })
      });
    },
  }
});
export default appStore;
