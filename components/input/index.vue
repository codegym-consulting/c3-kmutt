<script lang="ts" setup>
import { nextTick, type VNodeRef } from 'vue'

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
    ui: {},
    inputProps: () => ({}),
  },
)

const input = ref<VNodeRef | null>(null)
const _focus = ref(false)
const forceFocus = ref(false)

const isCalendar = computed(() => props.type === 'calendar')

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'touched' | 'focus'): void
}>()

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}

const clearValue = async () => {
  updateValue('')
  await nextTick()
  setTimeout(() => {
    input.value?.input?.focus?.()
    forceFocus.value = true
  }, 0)
}

// Function to prevent non-numeric input
const onInput = (event: Event) => {
  if (props.type === 'tel') {
    const target = event.target as HTMLInputElement
    const numeric = target.value.replace(/\D/g, '')
    if (numeric.length <= 10) {
      // xxx-xxx-xxxx
      const match = numeric.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
      if (match) {
        target.value = [match[1], match[2], match[3]].filter((x) => x).join('-')
      }
    } else {
      // xxx-xxx-xxx
      let formatted = ''
      for (let i = 0; i < numeric.length; i += 3) {
        if (i > 0) formatted += '-'
        formatted += numeric.substring(i, i + 3)
      }
      target.value = formatted
    }

    updateValue(target.value)
  }
}
</script>

<template>
  <UFormGroup
    :label="props.label"
    :name="name"
    :required="props.required"
    :error="forceFocus || props.focus ? false : error"
  >
    <UInput
      ref="input"
      :icon="props.icon"
      :placeholder="props.placeholder"
      :model-value="props.modelValue"
      :type="props.type"
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
      @input="onInput"
    >
      <template #trailing>
        <UButton
          v-show="props.modelValue && _focus && !isCalendar"
          icon="humbleicons:times"
          class="min-w-5 w-5 h-5 [&_svg]:w-3"
          @mousedown="clearValue"
        />
        <NuxtIcon
          v-show="isCalendar && !props.modelValue"
          class="text-2xl"
          name="c3/calendar"
          filled
        />
      </template>
    </UInput>
  </UFormGroup>
</template>
