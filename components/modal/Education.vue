<script lang="ts" setup>
import { isEmpty } from '~/utils/validator'
import { typeOfDegrees } from '~/data/common';
import type { Education } from '~/utils/repositories/register/model'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'save', value: Education): void
}>()

const education = defineModel<Education>('education')
const canSave = computed(() => {
  const _education = { ...education.value }
  delete _education.graduation
  return (
    _education && Object.values(_education).some((value) => !isEmpty(value))
  )
})

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
const onSave = () => {
  if (!canSave.value) return
  emit('update:modelValue', false)
  education.value && emit('save', education.value)
}

watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      education.value = {
        degree: undefined,
        fieldOfStudy: '',
        school: '',
        graduation: '',
      }
    }
  },
)
</script>

<template>
  <Modal
    v-if="education"
    title="Education"
    sub-title="Add details about your education history."
    :model-value="props.modelValue"
    @update:model-value="updateValue"
  >
    <div class="flex flex-col gap-y-4 md:gap-y-10">
      <TemplateRow>
        <Select
          v-model="education.degree"
          label="Type of degree"
          name="degree"
          placeholder="Select type of degree"
          :options="typeOfDegrees"
        />
      </TemplateRow>
      <TemplateRow>
        <Input
          v-model="education.school"
          label="School/Institute/University"
          name="school"
        />
      </TemplateRow>
      <TemplateRow>
        <Input
          v-model="education.fieldOfStudy"
          label="Field of study"
          name="fieldOfStudy"
        />
      </TemplateRow>
      <TemplateRow>
        <InputDatePicker
          v-model="education.graduation"
          label="Graduation"
          name="graduation"
          placeholder="Select graduation"
          year-picker
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
