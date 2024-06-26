import { type AlertPayload, ALERT_TYPE } from '~/utils/repositories/common/model'

export default defineNuxtPlugin(() => {
  const alert = useAlertStore()
  return {
    provide: {
      alert: ({
        id = '',
        content = '',
        title = '',
        type = ALERT_TYPE.SUCCESS,
        duration = 5000,
      }: AlertPayload) => {
        alert.showMessage({ id, title, content, type, duration })
      },
    },
  }
})
