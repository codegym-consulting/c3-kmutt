<script lang="ts" setup>
const { $classes } = useNuxtApp()

const props = withDefaults(
  defineProps<{
    modelValue: File[] | null
    maxFileSize?: number
    supportFileTypes?: string[]
  }>(),
  {
    maxFileSize: 20, // MB
    supportFileTypes: () => ['JPG', 'PNG', 'PDF'],
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: File[] | null): void
  (event: 'error', invalidFiles: File[]): void
}>()

const supportFileTypes = props.supportFileTypes.map((type) =>
  type.toUpperCase() === 'JPG' ? 'JPEG' : type.toUpperCase(),
)

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    const newFiles = Array.from(input.files)
    const validNewFiles: File[] = []
    const invalidFiles: File[] = []

    newFiles.forEach((file) => {
      const fileType = file.type.split('/').pop()?.toUpperCase() || ''
      const fileSizeMB = file.size / (1024 * 1024)
      if (
        supportFileTypes.includes(fileType) &&
        fileSizeMB <= props.maxFileSize
      ) {
        validNewFiles.push(file)
      } else {
        invalidFiles.push(file)
      }
    })

    const currentFiles = props.modelValue ? props.modelValue : []
    const allFiles = [...currentFiles, ...validNewFiles]

    // Remove duplicates
    const uniqueFiles = allFiles.filter(
      (file, index, self) =>
        index ===
        self.findIndex(
          (f) => f.name === file.name && f.lastModified === file.lastModified,
        ),
    )

    emit('update:modelValue', uniqueFiles.length > 0 ? uniqueFiles : null)
    if (invalidFiles.length > 0) {
      emit('error', invalidFiles)
    }

    //clear input value
    input.value = ''
  }
}
</script>

<template>
  <div>
    <div
      :class="
        $classes(
          'relative flex justify-between gap-x-4 items-center',
          'h-[128px] w-full p-6',
          'rounded-lg border-[2px] border-dashed border-gray-4 bg-gray-2',
        )
      "
    >
      <input
        class="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,application/pdf"
        @change="handleFileChange"
      >
      <div>
        <UIcon
          class="text-[20px] text-chrysler-blue [&_path]:stroke-[2px]"
          name="iconoir:cloud-upload"
        />
        <p class="mt-[10px] text-[14px] leading-[18px] text-chrysler-blue">
          Drag files to upload
        </p>
      </div>
      <UButton
        :ui="{
          base: '!min-w-[109px] !h-[34px] !text-sm !font-normal',
          rounded: '!rounded-[10px]',
          color: {
            primary: {
              solid: 'bg-chrysler-blue text-white',
            },
          },
        }"
        >Browse files</UButton
      >
    </div>
    <div
      class="mt-2 flex gap-x-2 md:gap-x-4 text-xs md:text-[14px] md:leading-[18px] text-gray-7 [&_strong]:font-medium"
    >
      <slot name="description">
        <div>
          Max file size: <strong>{{ props.maxFileSize }}MB</strong>
        </div>
        <div>
          Support file types:
          <strong>{{ props.supportFileTypes.join(', ') }}</strong>
        </div>
      </slot>
    </div>
  </div>
</template>
