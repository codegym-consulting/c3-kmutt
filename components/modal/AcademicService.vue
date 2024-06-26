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
const academic = defineModel<Research>('academic')
const categorySearch = ref('')
const categorySearchDebounced = refDebounced(categorySearch, 500)
const canSave = computed(() => {
  const _academic = { ...academic.value }
  delete _academic.date
  return _academic && Object.values(_academic).some((value) => !isEmpty(value))
})

const { data: categoryLists } = useAsyncData(
  'expertises',
  () => resumeRepo.getCategories(categorySearchDebounced.value),
  { watch: [categorySearchDebounced] },
)

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
const onSave = () => {
  if (!canSave.value) return
  emit('update:modelValue', false)
  academic.value && emit('save', academic.value)
}

watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      academic.value = {
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
    v-if="academic"
    title="Academic service"
    sub-title="Add details of your involvement in academic service activities."
    :model-value="props.modelValue"
    @update:model-value="updateValue"
  >
    <div class="flex flex-col gap-y-4 md:gap-y-10">
      <TemplateRow>
        <Input
          v-model="academic.topic"
          label="Topic of the academic service"
          name="topic"
        />
      </TemplateRow>
      <TemplateRow>
        <SelectMultipleWithSearch
          v-model:search="categorySearch"
          v-model="academic.category"
          label="Category"
          name="category"
          placeholder="Select category"
          :options="categoryLists ?? []"
        />
      </TemplateRow>
      <TemplateRow>
        <InputDatePicker
          v-model="academic.date"
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
