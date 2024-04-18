import { useTcloudStore } from '@renderer/store'
import { getItem, setItem } from '@renderer/utils/store'

const helpLink = 'https://cloud.tencent.com/developer/article/1385239'

const _useLoginBox = () => {
  // -------------------- S T O R E -------------------- //

  const tcloud = useTcloudStore()

  const { apiId, apiKey, region } = storeToRefs(tcloud)

  // ----------------- C O N S T A N T ----------------- //
  const router = useRouter()

  const form_apiId = ref() // apiId

  const form_apiKey = ref() // apiKey

  const form_region = ref() // region

  const submission_error = ref(false) // 登陆错误flag

  const loading = ref(false) // loading

  const rememberMe = ref(getItem('rememberMe') === 'true') // 记住我

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
    if (rememberMe.value) {
      form_apiId.value = apiId.value
      form_apiKey.value = apiKey.value
      form_region.value = region.value
    }

    if (form_apiId.value && form_apiKey.value && form_region.value) {
      console.log('initTcloudInfo', form_apiId.value, form_apiKey.value, form_region.value)
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
      submission_error.value = false
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
    open(helpLink)
  }

  /**
   * @description:  处理记住我
   * @param {boolean} checked
   * @return {*}
   */
  const handleRememberMe = () => {
    if (rememberMe.value) {
      setItem('rememberMe', 'true')
      apiId.value = form_apiId.value
      apiKey.value = form_apiKey.value
      region.value = form_region.value
    } else {
      setItem('rememberMe', '')
      apiId.value = ''
      apiKey.value = ''
      region.value = ''
    }
  }

  return {
    form_apiId,
    form_apiKey,
    form_region,
    submission_error,
    loading,
    rememberMe,
    confirm,
    setSubmissionError,
    clickHelpLink,
    handleRememberMe
  }
}

export default (() => {
  let instance
  return () => {
    return instance || (instance = _useLoginBox())
  }
})()
