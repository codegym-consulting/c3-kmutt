<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    subTitle?: string
    preventClose?: boolean
  }>(),
  {
    title: '',
    subTitle: '',
    preventClose: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <UModal
    :prevent-close="preventClose"
    :model-value="props.modelValue"
    @update:model-value="updateValue"
  >
    <div class="flex items-center justify-between gap-x-4">
      <slot name="title"
        ><h3 v-if="props.title" class="heading-label text-gray-10">
          {{ props.title }}
        </h3></slot
      >
      <UIcon
        class="cursor-pointer text-3xl w-10 h-10"
        name="humbleicons:times"
        @click="updateValue(false)"
      />
    </div>
    <slot name="subTitle"
      ><em
        v-if="props.subTitle"
        class="not-italic text-sm text-gray-7 mt-4 mb-10"
        >{{ props.subTitle }}</em
      ></slot
    >
    <slot />
  </UModal>
</template>
