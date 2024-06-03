<script lang="ts" setup>
import { nextTick, type VNodeRef } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue: string
    name?: string
    placeholder?: string
    type?: string
    required?: boolean
    error?: string
  }>(),
  {
    name: 'noname',
    placeholder: '',
    error: '',
    type: 'text',
    required: false,
  },
)

const input = ref<VNodeRef | null>(null)
const focus = ref(false)
const forceFocus = ref(false)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'touched'): void
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
</script>

<template>
  <UFormGroup
    :label="props.label"
    :name="name"
    :required="props.required"
    :error="forceFocus ? false : error"
  >
    <UInput
      ref="input"
      :placeholder="props.placeholder"
      :modelValue="props.modelValue"
      :type="props.type"
      :class="[{ 'fancy-border': (focus && !error) || forceFocus }]"
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
      }"
      @focus="focus = true"
      @blur="
        () => {
          emit('touched')
          focus = false
          forceFocus = false
        }
      "
      @update:modelValue="updateValue"
    >
      <template #trailing>
        <UButton
          v-show="props.modelValue && focus"
          icon="humbleicons:times"
          class="min-w-5 w-5 h-5 [&_svg]:w-3"
          @mousedown="clearValue"
        />
      </template>
    </UInput>
  </UFormGroup>
</template>
