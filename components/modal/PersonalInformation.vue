<script lang="ts" setup>
import { organizations, occupations } from '~/data/common'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'save', value: PersonalInformation): void
}>()

const { $fetchApi } = useNuxtApp()
const registerRepo = registerRepository($fetchApi)

const personalInfo = defineModel<PersonalInformation>('personalInfo')
const { cloned, sync } = useCloned(personalInfo, { manual: true })
const expertiseSearch = ref('')
const expertiseSearchDebounced = refDebounced(expertiseSearch, 500)
const areaOfInterestSearch = ref('')
const areaOfInterestSearchDebounced = refDebounced(areaOfInterestSearch, 500)

const canSave = computed(() => {
  return (
    personalInfo.value?.expertises?.length &&
    personalInfo.value?.areaOfInterests?.length &&
    personalInfo.value?.department?.value &&
    personalInfo.value &&
    cloned.value &&
    isObjectDifferece(personalInfo.value, cloned.value)
  )
})

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
const onSave = () => {
  if (!canSave.value) return
  emit('update:modelValue', false)
  personalInfo.value && emit('save', personalInfo.value)
}
const onFacultyChange = (change: Option) => {
  if (
    change.value !== personalInfo.value?.faculty?.value &&
    personalInfo.value?.department
  ) {
    personalInfo.value.department = {} as Option
  }

  if (personalInfo.value?.faculty) {
    personalInfo.value.faculty = { ...change }
  }
}

const { data: faculties } = useAsyncData('faculties', registerRepo.getFaculties)
const { data: departments } = useAsyncData(
  'departments',
  () => {
    const option = personalInfo.value?.faculty
    if (option && 'value' in option) {
      return registerRepo.getDepartments(+option.value)
    }
    return registerRepo.getDepartments()
  },
  { watch: [() => personalInfo.value?.faculty] },
)
const { data: expertises } = useAsyncData(
  'expertises',
  () => registerRepo.getExpertises(expertiseSearchDebounced.value),
  { watch: [expertiseSearchDebounced] },
)
const { data: areaOfInterests } = useAsyncData(
  'interests',
  () => registerRepo.getInterests(areaOfInterestSearchDebounced.value),
  { watch: [areaOfInterestSearchDebounced] },
)

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      sync()
    }
  },
)
</script>

<template>
  <Modal
    v-if="personalInfo"
    title="Personal information"
    sub-title="Add your personal details for profile completion."
    :model-value="props.modelValue"
    @update:model-value="updateValue"
  >
    <div class="flex flex-col gap-y-4 md:gap-y-10">
      <TemplateRow>
        <Select
          v-model="personalInfo.occupation"
          label="Occupation"
          name="occupation"
          placeholder="Select occupation"
          required
          :options="occupations"
        />
        <Input
          v-model="personalInfo.teachingExperience"
          label="Teaching experience"
          name="teachingExperience"
        />
      </TemplateRow>
      <TemplateRow>
        <SelectMultipleWithSearch
          v-model:search="expertiseSearch"
          v-model="personalInfo.expertises"
          label="Expertise"
          name="expertise"
          placeholder="Select expertise"
          required
          :error="!personalInfo.expertises?.length ? 'Required' : ''"
          :options="expertises ?? []"
        />
      </TemplateRow>
      <TemplateRow>
        <Select
          v-model="personalInfo.organization"
          label="Organization"
          name="organization"
          placeholder="Select organization"
          required
          :options="organizations"
        />
      </TemplateRow>
      <TemplateRow>
        <Select
          :model-value="personalInfo.faculty"
          label="Faculty"
          name="faculty"
          placeholder="Select Faculty"
          required
          :options="faculties ?? []"
          @update:model-value="(change) => onFacultyChange(change as Option)"
        />
        <Select
          v-model="personalInfo.department"
          label="Department"
          name="department"
          placeholder="Select Department"
          required
          :disabled="!personalInfo.faculty"
          :error="!personalInfo.department?.value ? 'Required' : ''"
          :options="departments ?? []"
        />
      </TemplateRow>
      <TemplateRow>
        <SelectMultipleWithSearch
          v-model:search="areaOfInterestSearch"
          v-model="personalInfo.areaOfInterests"
          label="Area of interest"
          name="areaOfInterest"
          placeholder="Select area of interest"
          required
          :error="!personalInfo.areaOfInterests?.length ? 'Required' : ''"
          :options="areaOfInterests ?? []"
        />
      </TemplateRow>
      <TemplateRow>
        <div />
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
