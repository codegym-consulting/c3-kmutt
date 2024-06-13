<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: File[] | null
  }>(),
  {},
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: File[] | null): void
  (event: 'error', value: File[]): void
}>()

const state = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const onRemove = (file: File) => {
  const files = state.value ? state.value : []
  const newFiles = files.filter((f) => f.name !== file.name)
  emit('update:modelValue', newFiles.length > 0 ? newFiles : null)
}
</script>

<template>
  <div class="flex flex-col gap-y-4 md:mt-4 lg:mt-6">
    <InputFileUploadBox
      v-model="state"
      @error="(files) => emit('error', files)"
    />
    <div
      class="mt-4 md:mt-6 flex flex-col gap-y-8 h-full flex-1 overflow-y-auto pb-6"
    >
      <CardFile
        v-for="file in state"
        :file="file"
        :key="file.name"
        @remove="onRemove"
      />
    </div>
  </div>
</template>
