export const useRegisterStore = defineStore('register', () => {
  const state = {
    registerNavbarFullSize: ref<boolean>(true),
    isRegisterationSuccess: ref<boolean>(false),
    isCreateResumeSuccess: ref<boolean>(false),
  }

  const getters = {
    registerNavbarFullSize: computed(() => {
      return state.registerNavbarFullSize.value
    }),
    isRegisterationSuccess: computed(() => {
      return state.isRegisterationSuccess.value
    }),
    isCreateResumeSuccess: computed(() => {
      return state.isCreateResumeSuccess.value
    }),
  }
  const action = {
    setRegisterNavbarFullSize(flag: boolean) {
      state.registerNavbarFullSize.value = flag
    },
    setIsRegisterationSuccess(flag: boolean) {
      state.isRegisterationSuccess.value = flag
    },
    setIsCreateResumeSuccess(flag: boolean) {
      state.isCreateResumeSuccess.value = flag
    },
  }

  return {
    ...getters,
    ...action,
  }
})
