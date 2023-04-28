<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back" style="float: left;" /> 关于狐狸
        </div>
        <div class="center">

           <h3 style="text-align: center;"> 狐狸轻量级即时通讯</h3>
           <p>
            狐狸即时通讯软件是一款高质量的即时通讯解决方案，提供了便捷的SDK和API接入方式，以适应各种应用场景。无论你要构建一个社交媒体应用程序，还是要创建一个在线客服平台，都可以凭借狐狸轻量级即时通讯软件提供的稳定和可靠的即时通讯服务满足你的业务需求。
           </p>
           <p>
            此外，狐狸即时通讯软件是开源的。这意味着你可以自由地使用、修改和分发它的源代码。这为那些想要探索和学习即时通讯技术的开发者提供了一个很好的机会。同时，我们也提供商业版付费，为你提供专业的技术支持和定制化的服务，以满足你的更高需求。
           </p>
           <p>
            如果你需要更高的安全性和数据隐私保护，我们还提供了私有化部署的服务，确保你的数据只能被授权人员访问和使用。总之，狐狸轻量级即时通讯软件是一个强大而灵活的解决方案，可以帮助你实现你的通讯需求。你可以放心地选择我们的服务，我们将竭尽全力为你提供最好的解决方案。
           </p>
           <p>
            狐狸即时通讯软件还提供了多种功能，例如实时语音、视频通话、文件传输等等。我们致力于提供最好的用户体验，为你的业务增添更多的价值。此外，我们的技术团队也会不断优化和升级狐狸即时通讯软件，以适应不断变化的市场需求和技术发展，保证你的通讯服务始终保持领先地位。
           </p>
           <p>
            此外，狐狸即时通讯软件是开源的。这意味着你可以自由地使用、修改和分发它的源代码。这为那些想要探索和学习即时通讯技术的开发者提供了一个很好的机会。同时，我们也提供商业版付费，为你提供专业的技术支持和定制化的服务，以满足你的更高需求。
           </p>
           <p>
            此外，狐狸即时通讯软件是开源的。这意味着你可以自由地使用、修改和分发它的源代码。这为那些想要探索和学习即时通讯技术的开发者提供了一个很好的机会。同时，我们也提供商业版付费，为你提供专业的技术支持和定制化的服务，以满足你的更高需求。
           </p>

        </div>
    </div>
</template>
  
<script setup>
import { } from "vue"
import { useRouter } from 'vue-router';
const router = useRouter()
const back = function () {
    router.push("/set")
}
</script>
  
<style lang="scss" scoped>
.van-switch--on {
    background: linear-gradient(180deg, #14bffd 0%, #69d29a 100%);
}

.bgc {
    font-size: 28px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #000000;
    padding-top: 1.875rem;
    box-sizing: border-box;
    padding-left: 36px;
    padding-top: 52px;
    .top{
        text-align: center;
        margin-bottom: 85px;

    }

    .center {
        background-color: #fff;
        border-radius: 2rem 2rem 0 0;
       padding-bottom: 30px;

        .avator {
            width: 4.6875rem;
            margin: 0 auto;
            margin-top: 1.25rem;
        }

        p {
            width: 100%;
            font-size: 20px;
            color: #000000;
            text-indent: 2em;
            margin-top: 10px;
        }
    }
}
</style>