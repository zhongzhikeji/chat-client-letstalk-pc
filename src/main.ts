import { createApp } from 'vue'
import App from './App.vue'
import './styles/zml.scss'
import "vue-virtual-scroller/dist/vue-virtual-scroller.css"
import VueVirtualScroller  from "vue-virtual-scroller" 
import '@/assets/font/font.css'
import 'animate.css' 
import vue3videoPlay from "vue3-video-play"; // 引入组件
import "vue3-video-play/dist/style.css"; // 引入css
// 使用vant
import Vant from 'vant'
import 'vant/lib/index.css'
import {createPinia} from 'pinia'
// 使用router
 import router from './router'

// import webSee from 'web-see';
const app = createApp(App)
// app.use(webSee, {
//   dsn: 'http://localhost:8083/reportData', // 上报的地址
//   apikey: 'project1', // 项目唯一的id
//   userId: '89757', // 用户id
//   repeatCodeError: true, // 开启错误上报去重，重复的代码错误只上报一次
//   silentRecordScreen: false, // 开启录屏
//   silentWhiteScreen: true, // 开启白屏检测
//   skeletonProject: true, // 项目是否有骨架屏
//   whiteBoxElements: ['html', 'body', '#app', '#root'], // 白屏检测的容器列表
//   handleHttpStatus(data) {
//     // 自定义hook, 根据接口返回的 response 判断请求是否正确
//     let { url, response } = data;
//     // code为200，接口正常，反之亦然
//     let { code } = typeof response === 'string' ? JSON.parse(response) : response;
//     if (url.includes('/getErrorList')) {
//       return code === 200 ? true : false;
//     } else {
//       return true;
//     }
//   },
// });
app.use(VueVirtualScroller )
app.use(vue3videoPlay);
 app.use(router)

const pinia = createPinia()
app.use(pinia)
app.use(Vant)
// 加载
app.mount('#app')
