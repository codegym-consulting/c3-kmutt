<script lang="ts" setup>
import { isEmpty } from '~/utils/validator'
import type { Experience } from '~/utils/repositories/register/model'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'save', value: Experience): void
}>()

const experience = defineModel<Experience>('experience')
const isEndDateValid = computed(() => {
  if (!experience.value) return true
  return (
    !experience.value.end ||
    !experience.value.start ||
    new Date(experience.value.start) < new Date(experience.value.end)
  )
})
const canSave = computed(() => {
  const _experience = { ...experience.value }
  delete _experience.start
  delete _experience.end
  return (
    _experience &&
    Object.values(_experience).some((value) => !isEmpty(value)) &&
    isEndDateValid.value
  )
})

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
const onSave = () => {
  if (!canSave.value) return
  emit('update:modelValue', false)
  experience.value && emit('save', experience.value)
}

watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      experience.value = {
        job: '',
        company: '',
        location: '',
        start: '',
        end: '',
      }
    }
  },
)
</script>

<template>
  <Modal
    v-if="experience"
    title="Experience"
    sub-title="Add details about your professional experience."
    :model-value="props.modelValue"
    @update:model-value="updateValue"
  >
    <div class="flex flex-col gap-y-4 md:gap-y-10">
      <TemplateRow>
        <Input v-model="experience.job" label="Job title" name="job" />
      </TemplateRow>
      <TemplateRow>
        <Input
          v-model="experience.company"
          label="Company/Organization"
          name="company"
        />
      </TemplateRow>
      <TemplateRow>
        <Input v-model="experience.location" label="Location" name="location" />
      </TemplateRow>
      <TemplateRow>
        <InputDatePicker
          v-model="experience.start"
          label="Start date"
          name="start"
          placeholder="Select start date"
        />
        <InputDatePicker
          v-model="experience.end"
          label="End date"
          name="end"
          placeholder="Select end date"
          :error="!isEndDateValid ? 'End date must be after start date.' : ''"
        />
      </TemplateRow>
      <TemplateRow class="justify-end">
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
