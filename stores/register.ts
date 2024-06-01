export const useRegisterStore = defineStore('register', () => {
  const state = {
    registerNavbarFullSize: ref<boolean>(true),
  }

  const getters = {
    registerNavbarFullSize: computed(() => {
      return state.registerNavbarFullSize.value
    }),
  }
  const action = {
    setRegisterNavbarFullSize(flag: boolean) {
      state.registerNavbarFullSize.value = flag
    },
  }

  return {
    ...getters,
    ...action,
  }
})
