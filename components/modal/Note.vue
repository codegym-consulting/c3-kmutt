<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'save' | 'remove', value: Note): void
}>()

const { $alert } = useNuxtApp()
const note = defineModel<Note>('note')

const mode = ref(1)
const confirmRemoveModal = ref(false)
const state = reactive<Note>({
  title: '',
  description: '',
  image: undefined,
  imageUrl: '',
})

const hasImageToPreview = computed(() => !!state.image || !!state.imageUrl)

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
const onSave = () => {
  emit('update:modelValue', false)
  emit('save', { ...state, title: state.title ?? 'Untitled' })
}
const handleFileError = (error: {
  type: 'total' | 'type' | 'size'
  invalidFiles: File[]
}) => {
  const { type, invalidFiles } = error
  const message = {
    total: '',
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
const clear = () => {
  state.imageUrl = ''
  state.image = undefined
}
const remove = () => {
  emit('update:modelValue', false)
  confirmRemoveModal.value = false
}

watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      mode.value = 1
      state.title = ''
      state.description = ''
      state.image = undefined
      state.imageUrl = ''
      confirmRemoveModal.value = false
    }
    if (value && !isEmpty(note.value)) {
      mode.value = note.value?.image ? 3 : 2
      if (note.value) {
        state.title = note.value?.title ?? ''
        state.description = note.value?.description ?? ''
        state.image = note.value?.image
        state.imageUrl = note.value?.imageUrl ?? ''
        if (state.title || state.description) {
          mode.value = state.image || note.value.imageUrl ? 3 : 2
        }
      }
    }
  },
)
</script>

<template>
  <div>
    <Modal
      title="New note"
      sub-title="Record your thoughts and ideas"
      :model-value="props.modelValue"
      @update:model-value="updateValue"
    >
      <div class="flex flex-col gap-y-4">
        <div
          v-if="mode === 1"
          class="flex flex-col md:flex-row gap-2 [&>*]:flex-1"
        >
          <ButtonSheet
            c3-icon="c3/plain-document"
            title="Add text note"
            subtitle="Create simple text notes"
            class="bg-white"
            @click="mode = 2"
          />
          <ButtonSheet
            c3-icon="c3/image"
            title="Add picture note"
            subtitle="Add images with captions"
            class="bg-white"
            @click="mode = 3"
          />
        </div>
        <template v-if="mode === 2">
          <TemplateRow>
            <Input v-model="state.title" label="Title" name="title" />
          </TemplateRow>
          <TemplateRow>
            <InputTextArea
              v-model="state.description"
              name="description"
              placeholder="Add your new note here"
            />
          </TemplateRow>
          <TemplateRow class="justify-between md:items-center">
            <div
              v-if="!isEmpty(note)"
              tabindex="0"
              class="transition-all flex items-center gap-x-2 text-giants-orange text-base leading-5 font-medium cursor-pointer hover:text-giants-orange/70"
              @click="confirmRemoveModal = true"
            >
              <UIcon name="lucide:trash-2" class="-translate-y-[2px]" />
              Delete note
            </div>
            <div v-else/>
            <UButton
              class="!flex-none w-[180px]"
              label="Save"
              @click="onSave"
            />
          </TemplateRow>
        </template>
        <template v-if="mode === 3">
          <TemplateRow v-if="hasImageToPreview">
            <Input v-model="state.title" label="Title" name="title" />
          </TemplateRow>
          <TemplateRow>
            <InputFileUploadBox
              v-model="state.image"
              support-file-label="JPG, PNG"
              design="large"
              name="image"
              preview-mode
              :max-file="1"
              :max-file-size="5"
              :preview-image="state.imageUrl"
              :support-file-types="['image/jpeg', 'image/png', 'image/webp']"
              @error="handleFileError"
              @clear="clear"
            />
          </TemplateRow>
          <TemplateRow v-if="hasImageToPreview">
            <InputTextArea
              v-model="state.description"
              name="description"
              placeholder="Add your new note here"
              :rows="2"
            />
          </TemplateRow>
          <TemplateRow class="justify-between md:items-center">
            <div
              v-if="!isEmpty(note)"
              tabindex="0"
              class="transition-all flex items-center gap-x-2 text-giants-orange text-base leading-5 font-medium cursor-pointer hover:text-giants-orange/70"
              @click="confirmRemoveModal = true"
            >
              <UIcon name="lucide:trash-2" class="-translate-y-[2px]" />
              Delete note
            </div>
            <div v-else/>
            <UButton
              class="!flex-none w-[180px]"
              label="Save"
              @click="onSave"
            />
          </TemplateRow>
        </template>
      </div>
    </Modal>
    <ModalConfirmRemove
      v-model="confirmRemoveModal"
      title="Delete note"
      sub-title="Are you sure you want to delete this note?"
      @remove="remove"
    />
  </div>
</template>
