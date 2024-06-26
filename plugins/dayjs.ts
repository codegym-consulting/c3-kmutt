import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isBetween from 'dayjs/plugin/isBetween'
import weekday from 'dayjs/plugin/weekday'
import updateLocale from 'dayjs/plugin/updateLocale'
import duration from 'dayjs/plugin/duration'
import th from 'dayjs/locale/th'

export default defineNuxtPlugin(() => {
  dayjs.extend(relativeTime)
  dayjs.extend(isBetween)
  dayjs.extend(weekday)
  dayjs.extend(updateLocale)
  dayjs.extend(duration)
  dayjs.locale(th)

  return {
    provide: {
      dayjs,
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $dayjs: (date?: dayjs.ConfigType) => dayjs.Dayjs
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs
  }
}
