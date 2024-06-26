<script lang="ts" setup>
import { isEmpty } from '~/utils/validator'
import type { Research } from '~/utils/repositories/resume/model'
import { refDebounced } from '@vueuse/core'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'save', value: Research): void
}>()

const { $fetchApi } = useNuxtApp()
const resumeRepo = resumeRepository($fetchApi)
const research = defineModel<Research>('research')
const categorySearch = ref('')
const categorySearchDebounced = refDebounced(categorySearch, 500)
const canSave = computed(() => {
  const _research = { ...research.value }
  delete _research.date
  return _research && Object.values(_research).some((value) => !isEmpty(value))
})

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
const onSave = () => {
  if (!canSave.value) return
  emit('update:modelValue', false)
  research.value && emit('save', research.value)
}

const { data: categoryLists } = useAsyncData(
  'expertises',
  () => resumeRepo.getCategories(categorySearchDebounced.value),
  { watch: [categorySearchDebounced] },
)

watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      research.value = {
        topic: '',
        category: [],
        date: '',
      }
    }
  },
)
</script>

<template>
  <Modal
    v-if="research"
    title="Research project"
    sub-title="Add details about your past research projects and contributions."
    :model-value="props.modelValue"
    @update:model-value="updateValue"
  >
    <div class="flex flex-col gap-y-4 md:gap-y-10">
      <TemplateRow>
        <Input
          v-model="research.topic"
          label="Topic of research"
          name="topic"
        />
      </TemplateRow>
      <TemplateRow>
        <SelectMultipleWithSearch
          v-model:search="categorySearch"
          v-model="research.category"
          label="Category"
          name="category"
          placeholder="Select category"
          :options="categoryLists ?? []"
        />
      </TemplateRow>
      <TemplateRow>
        <InputDatePicker
          v-model="research.date"
          label="Date"
          name="date"
          placeholder="Select date"
        />
        <div/>
      </TemplateRow>
      <TemplateRow>
        <div/>
        <UButton
          class="!flex-none w-[180px]"
          label="Save"
          :disabled="!canSave"
          @click="onSave"
        />
      </TemplateRow>
    </div>
  </Modal>
</template>
