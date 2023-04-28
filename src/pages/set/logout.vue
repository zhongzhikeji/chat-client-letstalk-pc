<template>
    <div class="bgc">
        <div class="top">
            <van-icon name="arrow-left" @click="back" /> 注销用户
        </div>
            <p style="text-align: center;margin-top: 30px;">请联系客服</p>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const back = function () {
    router.push("/set")
}
var checked = ref(false)
</script>
  
<style scoped lang="scss">
.van-switch--on {
    background: linear-gradient(180deg, #14bffd 0%, #69d29a 100%);
}

.bgc {
    .van-switch--on {
        background: linear-gradient(180deg, #14bffd 0%, #69d29a 100%);
    }

    padding-top: 1.875rem;
    box-sizing: border-box;

    .top {
        height: 3rem;
        font-size: 5vw;
        line-height: 4rem;
        padding-left: 1rem;
    }

    .center {
        background-color: #fff;
        border-radius: 2rem 2rem 0 0;
        padding: 1rem;
    }
}
</style>
  
  
  
  
  