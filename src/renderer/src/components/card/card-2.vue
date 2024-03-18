<template>
  <div class="card" @click="linkTo">
    <div class="header">
      <div class="circle"></div>
      <div class="header-info">
        <p class="title">{{ title }}</p>
        <p class="title-desc">{{ titleDesc }}</p>
      </div>
    </div>
    <div class="usage">
      <div class="sqrs">
        <div v-for="i in 3" :key="i" class="sqr"></div>
      </div>
      <div class="usage-rt">
        <div class="rate">
          <div
            v-for="(rate_item, idx) in rate_list"
            :key="idx"
            class="rate-code"
            :class="{
              close: rate < Math.pow(10, 2 - idx)
            }"
          >
            {{ rate_item }}
          </div>
          <div class="rate-code">%</div>
        </div>
        <div class="usage-desc">
          <p>{{ rateDesc }}</p>
          <div class="border"></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div v-for="(item, i) in footer" :key="i" class="footer-item">{{ item }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

// -------------------- P R O P S -------------------- //
const props = defineProps({
  rate: {
    type: Number,
    default: 0
  },
  title: {
    type: String
  },
  titleDesc: {
    type: String
  },
  rateDesc: {
    type: String
  },
  footer: {
    type: Array
  },
  color: {
    type: String,
    default: '#888'
  },
  pointColor: {
    type: String,
    default: '#888'
  },
  to: {
    type: String,
    default: ''
  }
})

// ----------------- C O N S T A N T ----------------- //
const router = useRouter()

const rate_list = computed(() => {
  return [((props.rate / 100) | 0) % 10, ((props.rate / 10) | 0) % 10, props.rate % 10]
})

const linkTo = () => {
  console.log('props.to', props.to)
  props.to &&
    router.push({
      name: props.to
    })
}
</script>

<style lang="scss" scoped>
@keyframes color {
  0% {
    background-color: v-bind(color);
  }
  50% {
    background-color: v-bind(pointColor);
  }
  100% {
    background-color: v-bind(color);
  }
}

.card {
  --bg-color-anim-duration: 5s;
  --base-size: 1rem;
  background-color: var(--card-bg-color);
  height: calc(var(--base-size) * 15);
  aspect-ratio: 1.32;
  align-self: flex-start;
  border-radius: calc(var(--base-size) * 1.25);
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  padding-top: calc(var(--base-size) * 1);
  gap: calc(var(--base-size) * 1);
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 8px;
  transition: var(--transition);
  border: 1px solid transparent;
  cursor: po;
  &:hover {
    border-color: var(--border-color);
  }
  .header {
    margin-inline: calc(var(--base-size) * 1.5);
    display: flex;
    gap: 1rem;
    .circle {
      width: calc(var(--base-size) * 3.75);
      height: calc(var(--base-size) * 3.75);
      border-radius: 50%;
      background-color: v-bind(color);
      animation: color var(--bg-color-anim-duration) ease infinite;
    }
    .header-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: calc(var(--base-size) * 0.5);
      .title {
        font-weight: 800;
        color: var(--font-color);
        font-size: calc(var(--base-size) * 1.25);
      }
      .title-desc {
        font-size: calc(var(--base-size) * 0.75);
        color: var(--font-color-2);
      }
    }
  }

  .usage {
    margin-inline: calc(var(--base-size) * 1.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sqrs {
      display: flex;
      flex-direction: column;
      gap: calc(var(--base-size) * 0.5);
      height: max-content;
      .sqr {
        // align-self: flex-start;
        width: calc(var(--base-size) * 0.75);
        min-height: calc(var(--base-size) * 0.75);
        height: calc(var(--base-size) * 0.75);
        background-color: v-bind(color);
        animation: color var(--bg-color-anim-duration) ease infinite;
      }
    }
    .usage-rt {
      .rate {
        display: flex;
        font-family: 'Roboto', sans-serif;
        font-weight: 900;
        .rate-code {
          font-size: calc(var(--base-size) * 3.875);
          color: var(--font-color);
          animation: come-in 0.5s ease forwards;
          &:nth-child(1) {
            animation-delay: -0.3s;
          }
          &:nth-child(2) {
            animation-delay: -0.15s;
          }
          &.close {
            color: var(--font-color-3);
          }
          @keyframes come-in {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(0);
            }
          }
        }
      }
      .usage-desc {
        p {
          text-align: center;
          color: var(--font-color-3);
          font-size: calc(var(--base-size) * 0.6);
        }
        .border {
          background-color: v-bind(color);
          animation: color var(--bg-color-anim-duration) ease infinite;
          height: calc(var(--base-size) * 0.25);
        }
      }
    }
  }

  .footer {
    display: flex;
    flex-grow: 1;
    background-color: v-bind(color);
    animation: color var(--bg-color-anim-duration) ease infinite;
    .footer-item {
      width: 100%;
      border-top: 1px solid var(--bg-color);
      border-right: 1px solid var(--bg-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--card-footer-font-color);
      font-weight: 100;
      position: relative;
      &::before {
        position: absolute;
        content: '';
        width: calc(var(--base-size) * 1.5);
        height: calc(var(--base-size) * 1.5);
        top: 0;
        transform: translateY(-50%);
        border-radius: 50%;
        background-color: var(--card-bg-color);
      }
      &::after {
        position: absolute;
        content: '';
        width: calc(var(--base-size) * 0.75);
        height: calc(var(--base-size) * 0.75);
        top: 0;
        transform: translateY(-50%);
        background-color: v-bind(pointColor);
        animation: color var(--bg-color-anim-duration) ease infinite;
        border-radius: 50%;
      }
      &:nth-child(3) {
        border-right: none;
      }
    }
  }
}
</style>
