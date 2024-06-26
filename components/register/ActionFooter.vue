<script lang="ts" setup>
import type { FixedLengthArray } from '~/utils/repositories/common/model'

export type ButtonType = 'next' | 'continue' | 'back' | 'done' | ''

const props = withDefaults(
  defineProps<{
    buttons?: FixedLengthArray<[ButtonType, ButtonType]>
    disabledNext?: boolean
    disabledBack?: boolean
  }>(),
  {
    buttons: () => ['', 'next'],
    disabledNext: true,
    disabledBack: true,
  },
)
const { $classes } = useNuxtApp()

const emit = defineEmits<{
  (event: 'clickNext' | 'clickBack'): void
}>()

const buttonConfig = computed(() => ({
  back: {
    text: 'Back',
    leadingIcon: 'flowbite:angle-left-outline',
    traillingIcon: '',
    disabled: props.disabledBack,
    click: () => emit('clickBack'),
  },
  next: {
    text: 'Next',
    leadingIcon: '',
    traillingIcon: 'flowbite:angle-right-outline',
    disabled: props.disabledNext,
    click: () => emit('clickNext'),
  },
  continue: {
    text: 'Continue',
    leadingIcon: '',
    traillingIcon: 'flowbite:angle-right-outline',
    disabled: props.disabledNext,
    click: () => emit('clickNext'),
  },
  done: {
    text: 'Done',
    leadingIcon: '',
    traillingIcon: 'flowbite:angle-right-outline',
    disabled: props.disabledNext,
    click: () => emit('clickNext'),
  },
}))
</script>

<template>
  <div
    :class="
      $classes(
        'sticky bottom-0 box-content rounded-b-3xl md:rounded-b-[40px] bg-gray-1',
        'flex shrink-0 justify-between items-center w-full h-12 px-4 md:h-16 md:px-10 mt-auto',
        '-translate-x-4 translate-y-6 md:-translate-x-10 md:translate-y-10',
      )
    "
  >
    <template
      v-for="(buttonType, index) in props.buttons"
      :key="buttonType + index"
    >
      <UButton
        v-if="buttonType"
        :padded="false"
        variant="link"
        :disabled="buttonConfig[buttonType].disabled"
        :leading-icon="buttonConfig[buttonType].leadingIcon"
        :trailing-icon="buttonConfig[buttonType].traillingIcon"
        @click="buttonConfig[buttonType].click"
        >{{ buttonConfig[buttonType].text }}</UButton
      >
      <div v-else />
    </template>
  </div>
</template>
