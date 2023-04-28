<template>
  <div class="tooltip">
  <div class="tooltip-content">
   
    <div class="mation">
    <div class="ap">
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="ap aps">
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
  </div>
  <div class="tooltip-arrow"></div>
</div>

</template>
<style>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip-content {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  background-color: #fff;
  color: #fff;
  font-size: 14px;
  border-radius: 5px;
  width: 318px;
  height: 150px;
}

.tooltip-arrow {
  position: absolute;
  bottom: -18px;
  left: 50%;
  margin-left: -10px;
  border-top: 20px solid #fff;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
.ap {
  position: relative;
  height: 50px;
  width: 30px;
  margin: 0 auto;
}
.aps {
  transform-origin: center center;
  transform: rotate(180deg);
}
.box div {
  display: inline-block;
  position: absolute;
  bottom: 0;
  width: 10px;
  height: 30px;
  background-color: rgb(78, 176, 255);
  transform-origin: bottom;
  border-radius: 5px 5px 0 0;
}
.aps .box div {
  background-color: rgb(0, 141, 255);
  bottom: 2px;
}
.box div:nth-child(1) {
  left: -60px;
  animation: musicWave 0.5s infinite linear both alternate;
}
.box div:nth-child(2) {
  left: -40px;
  animation: musicWave 0.8s infinite linear both alternate;
}
.box div:nth-child(3) {
  left: -20px;
  animation: musicWave 0.6s infinite linear both alternate;
}
.box div:nth-child(4) {
  left: 0px;
  animation: musicWave 0.7s infinite linear both alternate;
}
.box div:nth-child(5) {
  left: 20px;
  animation: musicWave 0.7s infinite linear both alternate;
}
.box div:nth-child(6) {
  left: 40px;
  animation: musicWave 0.6s infinite linear both alternate;
}
.box div:nth-child(7) {
  left: 60px;
  animation: musicWave 0.8s infinite linear both alternate;
}
.box div:nth-child(8) {
  left: 80px;
  animation: musicWave 0.5s infinite linear both alternate;
}
@keyframes musicWave {
  0% {
    height: 8px;
  }
  100% {
    height: 30px;
  }
}
</style>