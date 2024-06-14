import { type AlertPayload, ALERT_TYPE } from '~/models/common'

export const useAlertStore = defineStore('alert', () => {
  const state = {
    id: ref<string>(''),
    title: ref<string>(''),
    content: ref<string>(''),
    type: ref<ALERT_TYPE>(ALERT_TYPE.SUCCESS),
    duration: ref<number>(5000),
  }

  const action = {
    showMessage(payload: AlertPayload) {
      const { id, title, content, type, duration } = payload
      if (id) {
        state.id.value = id
      }
      if (duration) {
        state.duration.value = duration
      }
      state.title.value = title
      state.content.value = content
      state.type.value = type
    },
  }

  return {
    ...state,
    ...action,
  }
})
