import { useListenerRegister } from '@renderer/composables/listener'
import { messageStore } from '@renderer/composables/message'
import { useOpenaiStore } from '@renderer/store'
import { computed, ref } from 'vue'

const useMessageBox = () => {
  // -------------------- S T O R E -------------------- //
  const { message_list, robot, user } = messageStore

  const { addListener, clearListener } = useListenerRegister()

  // const { solve } = useOpenai()

  const openaiStore = useOpenaiStore()

  // ----------------- C O N S T A N T ----------------- //

  const messsage_list_ref = ref<HTMLElement>()

  const icon_map = {
    info: 'ri-information-line ri-lg info',
    success: 'ri-checkbox-circle-line ri-lg success',
    warning: 'ri-error-warning-line ri-lg warning',
    error: 'ri-error-warning-line ri-lg error',
    robot: 'ri-openai-fill ri-lg info',
    user: 'ri-user-smile-line ri-lg info'
  }

  const messageBoxRef = ref<HTMLElement>()

  const RESIZE_OFFSET = 80

  const ResizeOffsetStyle = computed(() => {
    return `${RESIZE_OFFSET}px`
  })

  const open_chat_win = ref(false)
  const message_box_w = ref('max-content')
  const message_box_h = ref('max-content')

  const user_msg = ref('')
  const robot_msg = ref('')

  const unread_msg_cnt = computed(() => {
    return message_list.value.reduce((acc, cur) => {
      return cur.is_read ? acc : acc + 1
    }, 0)
  })

  // ----------------- F U N C T I O N ----------------- //

  const getMessageListRef = (el) => {
    messsage_list_ref.value = el
  }

  const initListener = () => {
    messageBoxRef.value &&
      addListener({
        el: messageBoxRef.value,
        key: 'keydown',
        listener: ((e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            if (robot_msg.value) return
            submitMsg()
          }
        }) as any
      })
  }

  const toggleChatWin = () => {
    // scroll to bottom
    messsage_list_ref.value &&
      messsage_list_ref.value.scrollTo({
        top: messsage_list_ref.value.scrollHeight,
        behavior: 'smooth'
      })
    open_chat_win.value = !open_chat_win.value
    if (open_chat_win.value) {
      message_box_w.value = '18rem'
      message_box_h.value = '24rem'
      checkUnreadMsg()
    } else {
      message_box_w.value = 'max-content'
      message_box_h.value = 'max-content'
    }
  }

  const checkUnreadMsg = () => {
    message_list.value.forEach((item) => {
      item.is_read = true
    })
  }

  const onStream = (chunk: string | undefined | null) => {
    robot_msg.value += chunk
    // scroll to bottom
    messsage_list_ref.value &&
      messsage_list_ref.value.scrollTo({
        top: messsage_list_ref.value.scrollHeight,
        behavior: 'smooth'
      })
  }

  const onEnd = () => {
    robot(robot_msg.value)
    robot_msg.value = ''
  }

  const submitMsg = async () => {
    if (!user_msg.value) {
      return
    }
    user(user_msg.value)

    openaiStore.solve(user_msg.value, onStream, onEnd)
    user_msg.value = ''
  }

  return {
    icon_map,
    messageBoxRef,
    ResizeOffsetStyle,
    open_chat_win,
    message_box_w,
    message_box_h,
    user_msg,
    robot_msg,
    unread_msg_cnt,
    message_list,
    getMessageListRef,
    initListener,
    toggleChatWin,
    submitMsg,
    clearListener
  }
}

export { useMessageBox }
