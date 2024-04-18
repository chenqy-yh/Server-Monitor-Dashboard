<!--
 * @Date: 2024-04-05 23:00:59
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 23:05:40
 * @FilePath: \Spirit-client\src\renderer\src\views\login\components\login-box\login-box.vue
 * @Description: True or False
-->
<!-- <template>
  <div class="login-box">
    <div class="title">{{ i18n.global.t('login.title') }}</div>
    <el-form ref="loginForm" @submit.prevent>
      <el-form-item prop="username">
        <el-input v-model="form_apiId" placeholder="ApiID" :spellcheck="false"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form_apiKey"
          :spellcheck="false"
          show-password
          placeholder="ApiKey"
        ></el-input>
      </el-form-item>
      <el-form-item prop="region">
        <el-input v-model="form_region" :spellcheck="false" placeholder="Region"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="login-help">
          <el-checkbox v-model="rememberMe">{{ i18n.global.t('login.remme') }}</el-checkbox>
          <span class="login-validate-info" :class="{ active: submission_error }"
            >{{ i18n.global.t('login.login-fail') }}
          </span>
          <el-tooltip content="How to get this key?" placement="top">
            <el-button text circle @click="clickHelpLink">
              <i class="ri-question-line ri-lg"></i>
            </el-button>
          </el-tooltip>
        </div>
      </el-form-item>
      <el-form-item>
        <LoginButton
          v-button-loading="loading"
          :label="i18n.global.t('login.start')"
          @click="confirm"
        ></LoginButton>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import LoginButton from '@renderer/components/button/login-button.vue'

import { useTcloudStore } from '@renderer/store'
import { getItem, setItem } from '@renderer/utils/store'
import { i18n } from '@renderer/plugins/i18n'
// -------------------- S T O R E -------------------- //
const tcloud = useTcloudStore()

// ----------------- C O N S T A N T ----------------- //
const router = useRouter()

const form_apiId = ref() // apiId

const form_apiKey = ref() // apiKey

const form_region = ref() // region

const submission_error = ref(false) // 提交错误flag

const loading = ref(false) // loading

const rememberMe = ref(false) // 记住我

// ------------------- C I R C L E ------------------- //

onMounted(() => {
  initTcloudInfo()
})

// ----------------- F U N C T I O N ----------------- //

/**
 * @description:  初始化tcloud信息
 * @return {*}
 */
const initTcloudInfo = () => {
  const tcloudInfo = getItem('tcloud') as { apiId: string; apiKey: string; region: string }
  if (tcloudInfo) {
    form_apiId.value = tcloudInfo.apiId
    form_apiKey.value = tcloudInfo.apiKey
    form_region.value = tcloudInfo.region
    rememberMe.value = true
    confirm()
  }
}

/**
 * @description:  提交表单
 * @return {*}
 */
const confirm = async () => {
  loading.value = true
  const login_status = await tcloud.login(form_apiId.value, form_apiKey.value, form_region.value)
  loading.value = false
  handleRememberMe()
  if (login_status) {
    // 获取当前路由
    const currentRoute = router.currentRoute.value
    currentRoute.name === 'Login' &&
      router.push({
        name: 'instances'
      })
  } else {
    setSubmissionError(true)
  }
}

/**
 * @description:   设置提交错误flag
 * @param {boolean} status
 * @return {*}
 */
const setSubmissionError = (status: boolean) => {
  submission_error.value = status
}

/**
 * @description:  点击帮助链接
 * @return {*}
 */
const clickHelpLink = () => {
  open('https://cloud.tencent.com/developer/article/1385239')
}

/**
 * @description:  处理记住我
 * @param {boolean} checked
 * @return {*}
 */
const handleRememberMe = () => {
  if (rememberMe.value) {
    setItem('tcloud', {
      apiId: form_apiId.value,
      apiKey: form_apiKey.value,
      region: form_region.value
    })
  } else {
    setItem('tcloud', null)
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  padding: var(--space-lg);
  // padding-bottom: none;
  color: var(--font-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  width: 400px;
  min-width: 400px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  background-color: var(--bg-color);
  .title {
    font-size: var(--font-size-title);
    font-weight: 800;
  }
}

.login-help {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .login-validate-info {
    color: var(--error-color);
    display: none;
    &.active {
      display: block;
    }
  }
}
</style> -->
<template>
  <div class="login-box">
    <div class="title">{{ i18n.global.t('login.title') }}</div>
    <el-form ref="loginForm" @submit.prevent>
      <el-form-item prop="username">
        <el-input v-model="form_apiId" placeholder="ApiID" :spellcheck="false"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form_apiKey"
          :spellcheck="false"
          show-password
          placeholder="ApiKey"
        ></el-input>
      </el-form-item>
      <el-form-item prop="region">
        <el-input v-model="form_region" :spellcheck="false" placeholder="Region"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="login-help">
          <el-checkbox v-model="rememberMe">{{ i18n.global.t('login.remme') }}</el-checkbox>
          <span class="login-validate-info" :class="{ active: submission_error }"
            >{{ i18n.global.t('login.login-fail') }}
          </span>
          <el-tooltip content="How to get this key?" placement="top">
            <el-button text circle @click="clickHelpLink">
              <i class="ri-question-line ri-lg"></i>
            </el-button>
          </el-tooltip>
        </div>
      </el-form-item>
      <el-form-item>
        <LoginButton
          v-button-loading="loading"
          :label="i18n.global.t('login.start')"
          @click="confirm"
        ></LoginButton>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import LoginButton from '@renderer/components/button/login-button.vue'

import { useTcloudStore } from '@renderer/store'
import { getItem, setItem } from '@renderer/utils/store'
import { i18n } from '@renderer/plugins/i18n'
import useLoginBox from './index'

// -------------------- S T O R E -------------------- //

const {
  form_apiId,
  form_apiKey,
  form_region,
  submission_error,
  loading,
  rememberMe,
  clickHelpLink,
  confirm,
  setSubmissionError,
  handleRememberMe
} = useLoginBox()
</script>

<style lang="scss" scoped>
.login-box {
  padding: var(--space-lg);
  // padding-bottom: none;
  color: var(--font-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  width: 400px;
  min-width: 400px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  background-color: var(--bg-color);
  .title {
    font-size: var(--font-size-title);
    font-weight: 800;
  }
}

.login-help {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .login-validate-info {
    color: var(--error-color);
    display: none;
    &.active {
      display: block;
    }
  }
}
</style>
