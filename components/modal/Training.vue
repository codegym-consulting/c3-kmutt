<script lang="ts" setup>
import { isEmpty } from '~/utils/validator'
import type { Training } from '~/utils/repositories/resume/model'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'save', value: Training): void
}>()

const training = defineModel<Training>('training')
const canSave = computed(() => {
  const _training = { ...training.value }
  delete _training.date
  return _training && Object.values(_training).some((value) => !isEmpty(value))
})

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
const onSave = () => {
  if (!canSave.value) return
  emit('update:modelValue', false)
  training.value && emit('save', training.value)
}

watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      training.value = {
        course: '',
        date: '',
      }
    }
  },
)
</script>

<template>
  <Modal
    v-if="training"
    title="Training and mentoring"
    sub-title="Add information about classes, courses, or workshops you have attended."
    :model-value="props.modelValue"
    @update:model-value="updateValue"
  >
    <div class="flex flex-col gap-y-4 md:gap-y-10">
      <TemplateRow>
        <Input
          v-model="training.course"
          label="Class/Course/Workshop"
          name="course"
        />
      </TemplateRow>
      <TemplateRow>
        <InputDatePicker
          v-model="training.date"
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
