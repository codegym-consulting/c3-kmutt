<script setup lang="ts">
import { ALERT_TYPE } from '~/models/common'

const alertStore = useAlertStore()

const state = reactive<State>({
  show: false,
  title: '',
  message: '',
  type: ALERT_TYPE.SUCCESS,
  duration: 5000,
  timeout: null,
  id: '',
})

const resolveColor = computed(() => {
  return {
    [ALERT_TYPE.SUCCESS]: 'bg-giants-orange',
    [ALERT_TYPE.ERROR]: 'bg-giants-orange',
    [ALERT_TYPE.INFO]: 'bg-giants-orange',
  }[state.type]
})
const resolveIcon = computed(() => {
  return {
    [ALERT_TYPE.SUCCESS]: 'c3/file-error',
    [ALERT_TYPE.ERROR]: 'c3/file-error',
    [ALERT_TYPE.INFO]: 'c3/file-error',
  }[state.type]
})

// Created Life cycle
;(() => {
  alertStore.$subscribe((mutation, _state) => {
    if (mutation.storeId === 'alert') {
      state.timeout && clearTimeout(state.timeout)
      state.title = _state.title
      state.message = _state.content
      state.type = _state.type
      state.duration = _state.duration
      state.id = _state.id
      state.show = true
      state.timeout = setTimeout(() => {
        state.duration = 0
        state.show = false
      }, state.duration)
    }
  })
})()

const close = () => {
  state.show = false
  state.timeout && clearTimeout(state.timeout)
  state.duration = 0
}

interface State {
  show: boolean
  title: string
  message: string
  type: ALERT_TYPE
  duration: number
  timeout: NodeJS.Timeout | null
  id: string
}
</script>

<template>
  <div :class="['alert-wrapper', `-${state.type}`]">
    <Transition name="slide-fade">
      <div v-if="state.show" :class="['alert-box', resolveColor]">
        <div class="alert-content">
          <div class="alert-title">
            <NuxtIcon class="text-2xl" :name="resolveIcon" filled />
            <span>{{ state.title }}</span>
          </div>
          <div class="alert-message">{{ state.message }}</div>
        </div>
        <div class="alert-close">
          <UIcon
            class="text-3xl text-white"
            name="humbleicons:times"
            @click="close"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="postcss" scoped>
.alert-wrapper {
  @apply max-w-[400px] w-full h-fit mt-auto mx-auto fixed inset-0 bottom-[10%]
  flex items-end justify-center z-[100] p-4;
}

.alert-box {
  @apply flex items-center gap-x-2 p-4 rounded-2xl;
}

.alert-content > * {
  @apply text-white;
}

.alert-title {
  @apply flex items-center gap-x-2 text-base leading-5 font-medium;
}

.alert-close {
  @apply cursor-pointer relative w-10 h-10 flex items-center justify-center;
}

.alert-message {
  @apply mt-1 text-xs leading-4 font-bai-jamjuree font-medium;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  @apply opacity-0 translate-y-[30px];
}
</style>
