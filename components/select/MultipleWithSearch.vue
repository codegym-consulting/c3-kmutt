<script lang="ts" setup>
import type { Option } from '~/utils/repositories/common/model'

const props = withDefaults(
  defineProps<{
    modelValue: Option[]
    options: Option[]
    label: string
    name?: string
    required?: boolean
    placeholder?: string
    searchPlaceholder?: string
    error?: string
  }>(),
  {
    name: '',
    placeholder: '',
    searchPlaceholder: '',
    required: false,
    error: '',
  },
)

const searchModel = defineModel<string>('search')

const emit = defineEmits<{
  (event: 'update:modelValue', value: Option[]): void
  (event: 'touched' | 'focus'): void
  (event: 'add', value?: string): void
}>()

const isPopper = ref(false)
const tempModelValue = ref<Option[]>([])

watch(
  () => props.modelValue,
  (value) => {
    tempModelValue.value = value
  },
)

const clear = () => {
  tempModelValue.value = []
}

const add = () => {
  emit('add', searchModel.value)
}

const apply = (close: () => void) => {
  updateValue(tempModelValue.value)
  close()
}

const onCheck = (checked: boolean, option: Option) => {
  if (checked) {
    tempModelValue.value = [...tempModelValue.value, option]
  } else {
    tempModelValue.value = [
      ...tempModelValue.value.filter((item) => item.value !== option.value),
    ]
  }
}

const pop = (open: boolean) => {
  isPopper.value = open
  if (!open) {
    searchModel.value = ''
    clear()
    emit('touched')
  } else {
    tempModelValue.value = props.modelValue
    emit('focus')
  }
}

const updateValue = (value: Option[]) => {
  emit('update:modelValue', value)
}

const removeChip = (chip: Option) => {
  const newValue = props.modelValue.filter((item) => item.value !== chip.value)
  isPopper.value = false
  updateValue([...newValue])
}
</script>

<template>
  <UFormGroup
    :label="label"
    :name="name"
    :required="props.required"
    :error="props.error || false"
  >
    <UPopover
      :ui="{
        rounded: 'rounded-[10px]',
        wrapper: isPopper && !props.error ? 'fancy-border' : '',
      }"
      :open="isPopper"
      @update:open="pop"
    >
      <div
        :class="[
          'relative w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 inline-flex items-start text-left cursor-default rounded-lg text-sm gap-x-1.5 p-4 shadow-sm bg-white text-gray-900 ring-1 ring-inset focus:ring-2 pe-9',
          { 'ring-red-500': props.error },
          { 'ring-gray-2': !props.error },
        ]"
      >
        <span
          v-if="!props.modelValue?.length"
          class="block truncate font-bai-jamjuree text-base text-gray-5"
          >{{ props.placeholder }}</span
        >
        <ul v-else class="flex flex-wrap gap-1">
          <li
            v-for="(chip, i) in props.modelValue"
            :key="chip.label + chip.value + i"
          >
            <span
              class="inline-flex gap-x-1 font-bai-jamjuree items-center px-4 py-[7px] text-base text-gray-7 rounded-full bg-gray-2"
            >
              {{ chip.label }}
              <UIcon
                class="flex-shrink-0 transition-all w-4 h-4 cursor-pointer hover:text-gray-10"
                name="humbleicons:times"
                @click.stop="removeChip(chip)"
              />
            </span>
          </li>
        </ul>
        <span
          class="absolute inset-y-0 end-0 flex items-start w-full justify-end pointer-events-none py-4 px-2.5"
        >
          <UIcon
            :class="[
              'icon flex-shrink-0 w-6 h-6',
              { 'text-red-500': props.error },
              { 'text-gray-10': !props.error },
            ]"
            name="i-heroicons-chevron-down-20-solid"
          />
        </span>
      </div>

      <template #panel="{ close }">
        <div class="flex flex-col w-[294px] h-[337px]">
          <div class="p-4 pb-0">
            <Input
              v-model="searchModel"
              placeholder="Type your expertise"
              icon="i-heroicons-magnifying-glass-20-solid"
              :ui="{
                padding: {
                  sm: 'p-3',
                },
              }"
            />
            <div class="overflow-y-auto h-[215px] w-full mt-4">
              <ul v-if="props.options.length" class="flex flex-col">
                <li
                  v-for="option in props.options"
                  :key="option.label + option.value"
                  class="pt-[10px] pb-[17px] border-b border-gray-1"
                >
                  <UCheckbox
                    :id="`${option.value}`"
                    :label="option.label"
                    :model-value="
                      !!tempModelValue.find((o) => o.value === option.value)
                    "
                    :ui="{
                      wrapper: 'items-center',
                      inner: 'flex-1',
                    }"
                    @update:model-value="(checked) => onCheck(checked, option)"
                  />
                </li>
              </ul>
              <div
                v-else
                class="flex justify-between items-start gap-x-2 w-full"
              >
                <p class="break-words w-[220px]">{{ searchModel }}</p>
                <button
                  class="text-button !text-base"
                  type="button"
                  @click="add"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-between px-4 h-12 w-full shadow-[0_-5px_20px_0_#0000000D]"
          >
            <button
              class="text-button"
              type="button"
              :disabled="!tempModelValue.length"
              @click="clear"
            >
              Clear selected
            </button>
            <button
              class="w-20 h-8 rounded-[5px] bg-chrysler-blue text-white font-bai-jamjuree text-xs font-medium cursor-pointer disabled:text-gray-4 disabled:cursor-not-allowed disabled:bg-gray-2"
              type="button"
              @click="apply(close)"
            >
              Apply
            </button>
          </div>
        </div>
      </template>
    </UPopover>
  </UFormGroup>
</template>

<style lang="pcss" scoped>
.text-button {
  @apply font-bai-jamjuree text-xs font-medium text-chrysler-blue cursor-pointer disabled:text-gray-4 disabled:cursor-not-allowed;
}
</style>
