<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modelValue: string | number | Record<string, any> | unknown[]
    options: {
      value: string | number
      label: string
      disabled?: boolean
    }[]
    label: string
    name?: string
    required?: boolean
    placeholder?: string
    error?: string
    disabled?: boolean
  }>(),
  { name: '', placeholder: '', required: false, error: '', disabled: false },
)

const emit = defineEmits<{
  (
    event: 'update:modelValue',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: string | number | Record<string, any> | unknown[],
  ): void
  (event: 'touched' | 'focus'): void
}>()

const isPopper = ref(false)

const updateValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: string | number | Record<string, any> | unknown[],
) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <UFormGroup
    :label="label"
    :name="name"
    :required="props.required"
    :error="props.error"
    :ui="
      props.disabled
        ? {
            label: {
              base: 'text-gray-5',
            },
          }
        : {}
    "
  >
    <USelectMenu
      selected-icon=""
      :model-value="props.modelValue"
      :options="props.options"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :popper="{ offsetDistance: 0 }"
      :ui="{
        rounded:
          'rounded-lg' +
          (isPopper
            ? ' rounded-b-none rounded-t-lg focus:rounded-b-none focus:rounded-t-lg'
            : ''),
        color: {
          white: {
            outline:
              '!ring-gray-2' +
              (isPopper
                ? ' !ring-0 focus:!ring-0 !shadow-[0_0_0_2px_rgb(205_205_205_/_10%)] focus:!shadow-[0_0_0_2px_rgb(205_205_205_/_10%)]'
                : ''),
          },
        },
        padding: {
          sm: 'p-4',
        },
        icon: {
          base: 'text-gray-10',
          size: {
            sm: 'w-6 h-6',
          },
          trailing: {
            wrapper: 'w-full justify-end',
          },
        },
      }"
      :ui-menu="{
        label:
          'font-bai-jamjuree text-base ' +
          (!!props.modelValue && Object.keys(props.modelValue).length
            ? 'text-dark-theme'
            : 'text-gray-5'),
        shadow: 'shadow-md',
        ring: 'ring-0',
        padding: 'p-[10px] pt-0',
        rounded: 'rounded-t-none rounded-b-lg',
        option: {
          selected: 'text-gray-5',
          disabled: 'cursor-not-allowed opacity-100 font-bold',
          base: 'border-t border-gray-1 text-dark-theme relative',
        },
      }"
      @open="
        () => {
          emit('focus')
          isPopper = true
        }
      "
      @close="
        () => {
          emit('touched')
          isPopper = false
        }
      "
      @update:model-value="updateValue"
    >
      <template #option="{ option }">
        <span class="font-bai-jamjuree text-base">{{ option.label }}</span>
      </template>
    </USelectMenu>
  </UFormGroup>
</template>
