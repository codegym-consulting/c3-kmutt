import { mergeClasses } from '~/utils/style'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      classes: mergeClasses,
    },
  }
})
