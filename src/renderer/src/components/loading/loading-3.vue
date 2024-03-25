<!--
 * @Date: 2024-03-24 15:38:39
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-24 16:21:31
 * @FilePath: \server-monitor\src\renderer\src\components\loading\loading-3.vue
 * @Description: True or False
-->
<template>
  <div class="center-body">
    <div class="loader-spanne-20">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.center-body {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  background: var(--bg-color);
  padding: var(--space-md);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  animation: come-in 0.5s ease forwards;
  z-index: 99999;
  &.come-out {
    animation: come-out 0.5s ease forwards;
  }

  @keyframes come-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes come-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}

.loader-spanne-20 {
  position: relative;
  width: 100px;
  height: 30px;
  padding: 0;
}
.loader-spanne-20 > span {
  position: absolute;
  right: 0;
  width: 3px;
  height: 30px;
  background-color: var(--font-color);
  display: block;
  border-radius: 3px;
  transform-origin: 50% 100%;
  animation: move 2.8s linear infinite;
}
.loader-spanne-20 > span:nth-child(1) {
  animation-delay: -0.4s;
}
.loader-spanne-20 > span:nth-child(2) {
  animation-delay: -0.8s;
}
.loader-spanne-20 > span:nth-child(3) {
  animation-delay: -1.2s;
}
.loader-spanne-20 > span:nth-child(4) {
  animation-delay: -1.6s;
}
.loader-spanne-20 > span:nth-child(5) {
  animation-delay: -2s;
}
.loader-spanne-20 > span:nth-child(6) {
  animation-delay: -2.4s;
}
.loader-spanne-20 > span:nth-child(7) {
  animation-delay: -2.8s;
}
@keyframes move {
  0% {
    opacity: 0;
    transform: translateX(0px) rotate(0deg);
  }
  20% {
    opacity: 1;
  }
  40% {
    transform: translateX(-40px) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: translateX(-50px) rotate(22deg);
  }
  85% {
    opacity: 1;
    transform: translateX(-85px) rotate(60deg);
  }
  100% {
    opacity: 0;
    transform: translateX(-100px) rotate(65deg);
  }
}
</style>
