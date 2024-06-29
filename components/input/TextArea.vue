<script lang="ts" setup>
import type { VNodeRef } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    name?: string
    placeholder?: string
    type?: string
    required?: boolean
    error?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ui?: any
    icon?: string
    focus?: boolean
    inputProps?: Record<string, unknown>
    rows?: number
  }>(),
  {
    label: '',
    icon: '',
    name: 'noname',
    placeholder: '',
    error: '',
    type: 'text',
    required: false,
    focus: false,
    rows: 10,
    ui: {},
    inputProps: () => ({}),
  },
)

const input = ref<VNodeRef | null>(null)
const _focus = ref(false)
const forceFocus = ref(false)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'touched' | 'focus'): void
}>()

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <UFormGroup
    :label="props.label"
    :name="name"
    :required="props.required"
    :error="forceFocus || props.focus ? false : error"
  >
    <UTextarea
      ref="input"
      :icon="props.icon"
      :placeholder="props.placeholder"
      :model-value="props.modelValue"
      :type="props.type"
      :rows="props.rows"
      :class="[
        { 'fancy-border': (_focus && !error) || forceFocus || props.focus },
      ]"
      :ui="{
        base: '!font-bai-jamjuree !text-base !text-dark-theme !bg-white',
        placeholder: '!placeholder-gray-5',
        rounded: 'rounded-lg',
        color: {
          white: {
            outline: '!ring-gray-2 focus:!ring-0',
          },
        },
        padding: {
          sm: 'p-4',
        },
        icon: {
          trailing: {
            wrapper: '!pointer-events-auto',
          },
        },
        ...props.ui,
      }"
      v-bind="props.inputProps"
      @focus="
        () => {
          emit('focus')
          _focus = true
        }
      "
      @blur="
        () => {
          emit('touched')
          _focus = false
          forceFocus = false
        }
      "
      @update:model-value="updateValue"
    />
  </UFormGroup>
</template>
