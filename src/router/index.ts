/**
 * 配置说明:
 *  meta:
 * 
 *keepAlive: 是否需要缓存当前路由组件  true: 缓存  false: 不缓存
 *show: 是否需要显示底部tabbar    true: 显示  false: 不显示
 * 
 */

import { createRouter, createWebHashHistory } from "vue-router";
import infoSet from "../pages/set/setting.vue";

const Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //登录
    {
      path: "/login",
      component: () => import("../pages/user/login.vue")
    },
    {
      path: "/audio",
      component: () => import("../pages/chat/components/audio.vue")
    },
    {
      path: "/text",
      component: () => import("../pages/user/text.vue")
    },
    {
      path: "/upLoad",
      component: () => import("../pages/user/upLoad.vue")
    },
    //登录
    {
      path: "/verificationLogin",
      component: () => import("../pages/user/verificationLogin.vue")
    },
    //登录
    {
      path: "/setPerInfo",
      component: () => import("../pages/user/setPerInfo.vue")
    },
    //注册
    {
      path: "/register",
      component: () => import("../pages/user/register.vue")
    },
    //登录
    {
      path: "/phoneLogin",
      component: () => import("../pages/user/phoneLogin.vue")
    },
    //注册
    {
      path: "/phoneRegister",
      component: () => import("../pages/user/phoneRegister.vue")
    },
    {
      path: "/verification",
      component: () => import("../pages/user/verification.vue")
    },
    {
      path: "/lygRegister",
      component: () => import("../pages/user/lygRegister.vue")
    },
    {
      path: "/",
      redirect: "/chat",
    },
    //聊天
    {
      path: "/chat",
      name: "Chat",
      component: () => import("../pages/chat/index.vue"),
      meta: {
        show: true,
      },
    },
    //附近的人
    {
      name: "nearby",
      path: "/nearby",
      component: () => import("../pages/contact/components/nearby.vue"),
    },
    //附近的人
    {
      name: "jumpToGroupId",
      path: "/jumpToGroupId",
      component: () => import("../pages/contact/components/jumpToGroupId.vue"),
    },
    //编辑列表
    {
      name: "editor",
      path: "/editor",
      component: () => import("../pages/chat/components/editor.vue"),
    },
    //新增联络人
    {
      name: "ChatContact",
      path: "/chatContact",
      component: () => import("../pages/chat/components/chatContact.vue"),
    },
    //提醒
    {
      name: "remind",
      path: "/remind",
      component: () => import("../pages/chat/components/remind.vue"),
    },
    //建立群组
    {
      name: "group",
      path: "/group",
      component: () => import("../pages/chat/components/group.vue"),
    },
    //群聊管理
    {
      name: "groupmanagement",
      path: "/groupmanagement",
      component: () => import("../pages/chat/components/groupmanagement.vue"),
    },
    //群聊管理
    {
      name: "removeGroupMan",
      path: "/removeGroupMan",
      component: () => import("../pages/chat/components/removeGroupMan.vue"),
    },
    //群聊管理

    {
      name: "addGroupMan",
      path: "/addGroupMan",
      component: () => import("../pages/chat/components/addGroupMan.vue"),
    },
    //群机器人
    {
      name: "robotics",
      path: "/robotics",
      component: () => import("../pages/chat/components/robotics.vue"),
    },
    //入群欢迎
    {
      name: "welcome",
      path: "/welcome",
      component: () => import("../pages/chat/components/welcome.vue"),
    },
    //定时信息
    {
      name: "timing",
      path: "/timing",
      component: () => import("../pages/chat/components/timing.vue"),
    },
    //自助问答
    {
      name: "selfHelp",
      path: "/selfHelp",
      component: () => import("../pages/chat/components/selfHelp.vue"),
    },
    //自助问答
    {
      name: "speak",
      path: "/speak",
      component: () => import("../pages/chat/components/speak.vue"),
    },
    //群禁言
    {
      name: "estoppel",
      path: "/estoppel",
      component: () => import("../pages/chat/components/estoppel.vue"),
    },
    //群禁言
    {
      name: "groupName",
      path: "/groupName",
      component: () => import("../pages/chat/components/groupName.vue"),
    },
    //群转发
    {
      name: "retransmission",
      path: "/retransmission",
      component: () => import("../pages/chat/components/retransmission.vue"),
    },
    //群转发
    {
      name: "groupMan",
      path: "/groupMan",
      component: () => import("../pages/chat/components/groupMan.vue"),
    },
    //信息源
    {
      name: "information",
      path: "/information",
      component: () => import("../pages/chat/components/information.vue"),
    },
    //转发目标
    {
      name: "target",
      path: "/target",
      component: () => import("../pages/chat/components/target.vue"),
    },
    //成员权限
    {
      name: "permissions",
      path: "/permissions",
      component: () => import("../pages/chat/components/permissions.vue"),
    },
    // 管理设定

    {
      name: "groupSet",
      path: "/groupSet",
      component: () => import("../pages/chat/components/groupSet.vue"),
    },
    // 聊天记录保存
    {
      name: "keepRecords",
      path: "/keepRecords",
      component: () => import("../pages/chat/components/keepRecords.vue"),
    },
    //新增成员
    {
      name: "addMember",
      path: "/addMember",
      component: () => import("../pages/chat/components/addMember.vue"),
    },
    {
      name: "addMembergroup",
      path: "/addMembergroup",
      component: () => import("../pages/chat/components/addMembergroup.vue"),
    },
    {
      name: "remove",
      path: "/remove",
      component: () => import("../pages/contact/components/remove.vue"),
    },
    //建立密聊
    {
      name: "closeChat",
      path: "/closeChat",
      component: () => import("../pages/chat/components/closeChat.vue"),
    },
    //密聊描述
    {
      name: "describe",
      path: "/describe",
      component: () => import("../pages/chat/components/describe.vue"),
    },
    //聊天页面
    {
      name: "setChat",
      path: "/setChat",
      component: () => import("../pages/contact/components/setChat.vue"),

    },
    //好友备注
    {
      name: "userRemarks",
      path: "/userRemarks",
      component: () => import("../pages/contact/components/userRemarks.vue"),

    },
    {
      name: "forward",
      path: "/forward",
      component: () => import("../pages/chat/components/forward.vue"),

    },
    {
      name: "groupmenber",
      path: "/groupmenber",
      component: () => import("../pages/contact/components/groupmenber.vue"),
    },
    //聊天设定
    {
      name: "pageChat",
      path: "/pageChat",
      component: () => import("../pages/chat/components/pageChat.vue"),
    },
    {
      path: "/userSet",
      name: "userSet",
      component: () => import("../pages/contact/components/usersetChat.vue"),
      meta: {
        keepAlive: true,
      },
    },
    //编辑个人资料
    {
      name: "personalData",
      path: "/personalData",
      component: () => import("../pages/chat/components/personalData.vue"),
    },
    //联络人模块
    {
      path: "/contact",
      name: "Contact",
      component: () => import("../pages/contact/index.vue"),
      meta: {
        keepAlive: true,
        show: true,
      },
      beforeEnter: (to, from, next) => {
        next()
      }
    },
    //我的
    {
      path: "/my",
      name: "My",
      component: () => import("../pages/my/index.vue"),
      meta: {
        show: true,
      },
    },
    //设定
    {
      path: "/passwordSet",
      component: () => import('../pages/set/passwordSet.vue'),
    },
    {
      path: "/infoSet",
      component: () => import('../pages/set/setting.vue'),
    },
    {
      path: "/setPassword",
      component: () => import('../pages/set/setPassword.vue'),
    },
    {
      path: "/logout",
      component: () => import('../pages/set/logout.vue'),
    },
    {
      path: "/utify",
      component: () => import('../pages/set/utify.vue'),
    },
    {
      path: "/chatInfo",
      component: () => import('../pages/set/chatInfo.vue'),
    },
    {
      path: "/chartlet",
      component: () => import('../pages/set/chartlet.vue'),
    },
    {
      path: "/contact",
      component: () => import('../pages/set/contact.vue'),
    },
    {
      path: "/safe",
      component: () => import('../pages/set/safe.vue'),
    },
    {
      path: "/appearance",
      component: () => import('../pages/set/appearance.vue'),
    },
    {
      path: "/collect",
      component: () => import('../pages/set/collect.vue'),
    },
    {
      path: "/equipment",
      component: () => import('../pages/set/equipment.vue'),
    },
    {
      path: "/language",
      component: () => import('../pages/set/language.vue'),
    },
    {
      path: "/about",
      component: () => import('../pages/set/about.vue'),
    },
    { 
      path: "/send",
      component: () => import('../pages/set/send.vue'),
    },
    {
      path: "/percenter",
      component: () => import('../pages/set/percenter.vue'),
    },
    {
      path: "/check",
      component: () => import('../pages/set/check.vue'),
    },
    {
      path: '/set',
      component: () => import('../pages/set/index.vue'),
      meta: {
        show: true
      }
    },
    //朋友圈
    {
      path: "/circleFriends",
      component: () => import('../pages/circleFriends/index.vue'),
      meta: {
        show: true,
      },
    },
    //朋友圈
    {
      path: "/circle",
      component: () => import('../pages/circleFriends/friends/circle.vue'),
      meta: {
        show: true
      },
    },
    //发布朋友圈
    {
      path: "/publish",
      component: () => import('../pages/circleFriends/friends/publish.vue'),
    },
    //发布朋友圈
    {
      path: "/someoneCircle",
      component: () => import('../pages/circleFriends/friends/someoneCircle.vue'),
    },
    //添加联系人
    {
      path: "/add",
      component: () => import('../pages/chat/components/addfriends.vue'),
    },
    //添加联系人
    {
      path: "/personInfo",
      component: () => import('../pages/chat/components/personInfo.vue'),
    },
   

  ],
});
let writeList=["/login",'/register',"/phoneLogin","/phoneRegister",'/verification','/setPerInfo','/verificationLogin','/lygRegister','/upLoad','/text','/jumpToGroupId']
Router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    console.log('token123');
    next()
  } else {
    if (writeList.indexOf(to.path)!=-1) {
      next();
    } else {
      next('/login');
    }
  }

})
export default Router;
