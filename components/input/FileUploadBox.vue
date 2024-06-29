<script lang="ts" setup>
const { $classes } = useNuxtApp()

const props = withDefaults(
  defineProps<{
    name: string
    modelValue: File[] | null | undefined
    maxFileSize?: number
    maxFile?: number
    supportFileLabel?: string
    supportFileTypes?: string[]
    design?: 'default' | 'large'
    previewMode?: boolean // Only work with image file and maxFile = 1
    previewImage?: string
  }>(),
  {
    design: 'default',
    name: 'files',
    maxFile: 3,
    maxFileSize: 20, // MB
    supportFileLabel: 'JPG, PNG, PDF',
    previewImage: '',
    previewMode: false,
    supportFileTypes: () => [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
    ],
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: File[] | null): void
  (
    event: 'error',
    payload: { type: 'size' | 'type' | 'total'; invalidFiles: File[] },
  ): void
  (event: 'clear'): void
}>()

const canPreview = computed(() => {
  return props.previewMode && props.maxFile === 1
})
const _previewImage = computed(() => {
  if (props.modelValue && props.modelValue.length > 0) {
    const file = props.modelValue[0]
    return URL.createObjectURL(file)
  }

  return props.previewImage
})

const clearPreviewImage = () => {
  emit('update:modelValue', null)
  emit('clear')
}
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    const currentFiles =
      props.modelValue && props.maxFile > 1 ? props.modelValue : []
    const newFiles = Array.from(input.files)

    if (
      props.maxFile > 1 &&
      currentFiles.length + newFiles.length > props.maxFile
    ) {
      emit('error', { type: 'total', invalidFiles: newFiles })
      return
    }

    const validNewFiles: File[] = []
    const invalidFileType: File[] = []
    const invalidFileSize: File[] = []

    newFiles.forEach((file) => {
      const fileSizeMB = file.size / (1024 * 1024)
      if (
        props.supportFileTypes.includes(file.type) &&
        fileSizeMB <= props.maxFileSize
      ) {
        validNewFiles.push(file)
      } else {
        if (!props.supportFileTypes.includes(file.type)) {
          invalidFileType.push(file)
        }
        if (fileSizeMB > props.maxFileSize) {
          invalidFileSize.push(file)
        }
      }
    })

    const allFiles = [...currentFiles, ...validNewFiles]

    // Remove duplicates
    const uniqueFiles = allFiles.filter(
      (file, index, self) =>
        index ===
        self.findIndex(
          (f) => f.name === file.name && f.lastModified === file.lastModified,
        ),
    )

    //clear input value
    input.value = ''

    emit('update:modelValue', uniqueFiles.length > 0 ? uniqueFiles : null)
    if (invalidFileType.length > 0) {
      emit('error', { type: 'type', invalidFiles: invalidFileType })
      return
    }
    if (invalidFileSize.length > 0) {
      emit('error', { type: 'size', invalidFiles: invalidFileSize })
    }
  }
}
</script>

<template>
  <div>
    <div v-if="!canPreview || !_previewImage">
      <div
        :class="
          $classes(
            'relative flex gap-x-4 items-center',
            'h-[128px] w-full p-6',
            'rounded-lg border-[2px] border-dashed border-gray-4 bg-gray-2',
            props.design === 'large'
              ? 'h-[397px] justify-center'
              : 'h-[128px] justify-between',
            props.design === 'large' ? 'flex-col' : '',
          )
        "
      >
        <input
          class="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          type="file"
          :multiple="props.maxFile > 1"
          :name="props.name"
          :accept="props.supportFileTypes.join(',')"
          @change="handleFileChange"
        />
        <div
          :class="[
            { 'flex flex-col items-center mb-10': props.design === 'large' },
          ]"
        >
          <UIcon
            :class="[
              'text-chrysler-blue [&_path]:stroke-[2px]',
              {
                'text-[20px]': props.design === 'default',
                'text-[40px]': props.design === 'large',
              },
            ]"
            name="iconoir:cloud-upload"
          />
          <p
            :class="[
              'mt-[10px] text-chrysler-blue',
              {
                'text-base leading-5': props.design === 'large',
                'text-[14px] leading-[18px]': props.design === 'default',
              },
            ]"
          >
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
        :class="
          $classes(
            'mt-2 flex gap-x-2 md:gap-x-4 text-xs md:text-[14px] md:leading-[18px] text-gray-7 [&_strong]:font-medium',
            props.design === 'large' ? 'justify-center' : '',
          )
        "
      >
        <slot name="description">
          <div>
            Max file size: <strong>{{ props.maxFileSize }}MB</strong>
          </div>
          <div>
            Support file types:
            <strong>{{ props.supportFileLabel }}</strong>
          </div>
        </slot>
      </div>
    </div>
    <div v-if="canPreview && _previewImage" class="relative w-full rounded-lg">
      <img
        :src="_previewImage"
        alt="preview-image"
        class="w-full h-auto rounded-lg"
      />
      <button
        class="square-icon-btn -invert transition-all absolute bottom-4 right-4"
        type="button"
        @click="clearPreviewImage"
      >
        <UIcon name="lucide:trash-2" />
      </button>
    </div>
  </div>
</template>
