/*
 * @Date: 2024-04-03 23:28:00
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 15:00:03
 * @FilePath: \server-monitor\src\renderer\src\store\openai\index.ts
 * @Description: True or False
 */
import OpenAI from 'openai'
import { getItem, setItem } from '@renderer/utils/store'
import { messageStore } from '@renderer/composables/message'

type ModelType = 'gpt-3.5-turbo' | 'gpt-4'

type ModelConfigItem = {
  model: ModelType | ''
  apikey: string
}

type ModelConfigMap<T extends ModelType> = {
  [key in T]?: ModelConfigItem
}
const useOpenaiStore = defineStore('openai', () => {
  // ----------------- C O N S T A N T ----------------- //

  const MODEL_CONFIG_STORE_KEY_PREFIX = 'openai-model-config-'

  const CHOOSE_MODEL_STORE_KEY = 'openai-choose-model'

  const modelConfigType: ModelType[] = ['gpt-3.5-turbo', 'gpt-4']

  const modelConfigMap = ref<ModelConfigMap<ModelType>>({})

  const chooseModel = ref<ModelType>()

  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: ''
  })

  // ------------------- C I R C L E ------------------- //
  onBeforeMount(() => {
    initModelConfig()
    initChooseModel()
  })

  // ----------------- F U N C T I O N ----------------- //

  const initChooseModel = () => {
    chooseModel.value = getItem(CHOOSE_MODEL_STORE_KEY) || 'gpt-3.5-turbo'
    openai.apiKey = modelConfigMap.value[chooseModel.value]?.apikey || ''
  }

  const initModelConfig = () => {
    modelConfigType.forEach((model) => {
      modelConfigMap.value[model] = {
        model: model,
        apikey: getItem(`${MODEL_CONFIG_STORE_KEY_PREFIX}${model}`) || ''
      }
    })
  }

  const getOpenaiModelConfig = (model: ModelType) => {
    return modelConfigMap.value[model]
  }

  const setOpenaiModelConfig = (model: ModelType, apikey: string) => {
    modelConfigMap.value[model] = {
      model: model,
      apikey: apikey
    }
    openai.apiKey = apikey
    setItem(`${MODEL_CONFIG_STORE_KEY_PREFIX}${model}`, apikey)
  }

  const getChooseModel = () => {
    return chooseModel.value
  }

  const setChooseModel = (model: ModelType) => {
    chooseModel.value = model
    setItem(CHOOSE_MODEL_STORE_KEY, model)
  }

  const checkChooseModel = () => {
    return chooseModel.value && modelConfigType.includes(chooseModel.value)
  }

  const solve = async (
    msg: string,
    onStream?: (chunk: string | undefined | null) => void,
    onEnd?: () => void
  ) => {
    try {
      if (!checkChooseModel()) return
      const res = await openai.chat.completions.create({
        model: chooseModel.value ?? 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: msg
          }
        ],
        stream: true
      })
      for await (const message of res) {
        if (message.choices[0].finish_reason === 'stop') {
          onEnd && onEnd()
          break
        }
        onStream && onStream(message.choices[0].delta.content)
      }
    } catch (error) {
      messageStore.error('openai error!')
      console.error('openai error:', error)
    }
  }

  return {
    chooseModel,
    getOpenaiModelConfig,
    setOpenaiModelConfig,
    getChooseModel,
    setChooseModel,
    solve
  }
})

export { useOpenaiStore }
export type { ModelType, ModelConfigItem }
