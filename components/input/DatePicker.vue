<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = withDefaults(
  defineProps<{
    modelValue: string | number | Date
    name: string
    label: string
    modelType?: string
    placeholder?: string
    yearPicker?: boolean
    enableTimePicker?: boolean
    error?: string
  }>(),
  {
    modelType: '',
    placeholder: '',
    error: '',
    yearPicker: false,
    enableTimePicker: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number | Date): void
}>()
</script>

<template>
  <div :class="['vue-datepicker', { '-error': !!props.error }]">
    <VueDatePicker
      :model-value="props.modelValue"
      :year-picker="props.yearPicker"
      :enable-time-picker="props.enableTimePicker"
      :model-type="modelType"
      :max-date="new Date()"
      :year-range="[new Date().getFullYear() - 30, new Date().getFullYear()]"
      auto-apply
      reverse-years
      hide-offset-dates
      prevent-min-max-navigation
      @update:model-value="emit('update:modelValue', $event)"
    >
      <template
        #dp-input="{
          value,
          onInput,
          onEnter,
          onTab,
          onClear,
          onBlur,
          onKeypress,
          onPaste,
          isMenuOpen,
        }"
      >
        <Input
          type="calendar"
          :model-value="value"
          :placeholder="props.placeholder"
          :label="props.label"
          :name="props.name"
          :error="props.error"
          :focus="isMenuOpen"
          @blur="onBlur"
          @input="onInput"
          @keypress="onKeypress"
          @paste="onPaste"
          @keydown.enter="onEnter"
          @keydown.tab="onTab"
          @clear="onClear"
        />
      </template>
    </VueDatePicker>
  </div>
</template>

<style lang="pcss" scoped>
.vue-datepicker {
  :deep(.dp__theme_light) {
    --dp-primary-color: #5549ff;
  }
  :deep(.dp__clear_icon) {
    @apply top-[70%] focus:outline-none focus-visible:outline-0
    disabled:cursor-not-allowed disabled:opacity-75
    flex-shrink-0 justify-center transition-all rounded-lg
    text-base font-medium gap-x-2 box-border p-1 bg-gray-10 text-white
    hover:bg-white hover:text-gray-10  mx-4
    inline-flex items-center min-w-5 w-5 h-5 [&_svg]:w-3;
  }
  &.-error {
    :deep(.dp__clear_icon) {
      @apply top-[55%];
    }
  }
}
</style>
