<script lang="ts" setup>
import { formatFileSize } from '~/utils/formatter'
import { ALERT_TYPE } from '~/models/common'

const { $alert } = useNuxtApp()

const props = withDefaults(
  defineProps<{
    modelValue: File[] | null
  }>(),
  {},
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: File[] | null): void
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

const handleError = (error: {
  type: 'total' | 'type' | 'size'
  invalidFiles: File[]
}) => {
  const { type, invalidFiles } = error
  const message = {
    total: 'You can only upload up to 3 files',
    type: 'Invalid file type',
    size: 'File size exceed the limit',
  }[type]

  const firstInvalidFiles = invalidFiles[0]
  const content = `${firstInvalidFiles.name} ${formatFileSize(
    firstInvalidFiles.size,
    'MB',
  )}MB`

  $alert({
    title: message,
    content,
    type: ALERT_TYPE.ERROR,
  })
}
</script>

<template>
  <div class="flex flex-col gap-y-4 md:mt-4 lg:mt-6">
    <InputFileUploadBox v-model="state" @error="handleError" />
    <div
      class="mt-4 md:mt-6 flex flex-col gap-y-8 h-full flex-1 overflow-y-auto pb-6"
    >
      <CardFile
        v-for="file in state"
        :key="file.name"
        :file="file"
        @remove="onRemove"
      />
    </div>
  </div>
</template>
