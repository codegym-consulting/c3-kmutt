<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
  title: string
  subTitle: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'remove'): void
}>()

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <Modal
    :title="props.title"
    :sub-title="props.subTitle"
    :model-value="props.modelValue"
    @update:model-value="updateValue"
  >
    <div class="flex flex-col gap-y-4 md:gap-y-10">
      <TemplateRow class="justify-end">
        <UButton
          class="bg-giants-orange !flex-none w-[180px]"
          label="Delete"
          @click="emit('remove')"
        />
      </TemplateRow>
    </div>
  </Modal>
</template>
