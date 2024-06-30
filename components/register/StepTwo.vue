<script lang="ts" setup>
import type { Option } from '~/utils/repositories/common/model'
import { isEmpty } from '~/utils/validator'
import { registerStepTwoSchema } from '~/utils/repositories/register/model'

type StepTwoState = {
  occupation: Option
  teachingExperience: string
  expertise: Option[]
  organization: Option
  faculty: Option
  department: Option
  areaOfInterest: Option[]
}

const props = withDefaults(
  defineProps<{
    modelValue: StepTwoState
    expertises?: Option[]
    areaOfInterests?: Option[]
    occupations?: Option[]
    faculties?: Option[]
    departments?: Option[]
    organizations?: Option[]
  }>(),
  {
    occupations: () => [],
    organizations: () => [],
    expertises: () => [],
    faculties: () => [],
    departments: () => [],
    areaOfInterests: () => [],
  },
)

const isSelectedFaculty = ref(false)
const expertiseSearch = defineModel<string>('expertiseSearch')
const areaOfInterestSearch = defineModel<string>('areaOfInterestSearch')

const state = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// Mock Data
const experiences = [
  {
    name: 'IND 101',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    name: 'IND 102',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
]

const touchedField = ref('')
const { errors, validate } = useFormValidation(
  registerStepTwoSchema,
  state,
  touchedField,
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: StepTwoState): void
  (event: 'touched' | 'focus'): void
  (event: 'validate', value: boolean): void
}>()

const onTouch = (field: string) => {
  touchedField.value = field
  validate()
  emit('touched')
}

watch(
  () => state.value,
  (value) => {
    if (!isEmpty(value.faculty)) {
      isSelectedFaculty.value = true
    }
    const allRequiredFieldAreFilled =
      !isEmpty(value.occupation) &&
      !isEmpty(value.expertise) &&
      !isEmpty(value.organization) &&
      !isEmpty(value.department) &&
      !isEmpty(value.areaOfInterest)

    // Check if all required fields are filled and then validate the form at once
    emit('validate', !!(allRequiredFieldAreFilled && validate()))
  },
  { deep: true },
)
</script>

<template>
  <UForm :schema="registerStepTwoSchema" :state="state" @error="validate">
    <div class="flex flex-col gap-y-6">
      <TemplateRow>
        <Select
          v-model="state.occupation"
          label="Occupation"
          name="occupation"
          placeholder="Select occupation"
          required
          :error="errors.occupation"
          :options="props.occupations"
          @focus="emit('focus')"
          @touched="onTouch('occupation')"
        />
      </TemplateRow>
      <TemplateRow>
        <UFormGroup label="Teaching experience">
          <ul class="flex flex-col gap-y-4">
            <li v-for="exp in experiences" :key="exp.name">
              <CardExperience v-bind="exp" />
            </li>
          </ul>
        </UFormGroup>
      </TemplateRow>
      <TemplateRow>
        <SelectMultipleWithSearch
          v-model:search="expertiseSearch"
          v-model="state.expertise"
          label="Expertise"
          name="expertise"
          placeholder="Select expertise"
          required
          :error="errors.expertise"
          :options="props.expertises"
          @focus="emit('focus')"
          @touched="onTouch('expertise')"
        />
      </TemplateRow>
      <TemplateRow>
        <Select
          v-model="state.organization"
          label="Organization"
          name="organization"
          placeholder="Select organization"
          required
          :error="errors.organization"
          :options="props.organizations"
          @focus="emit('focus')"
          @touched="onTouch('organization')"
        />
      </TemplateRow>
      <TemplateRow class="md:[&>*]:w-[calc(50%-0.5rem)]">
        <Select
          v-model="state.faculty"
          label="Faculty"
          name="faculty"
          placeholder="Select Faculty"
          required
          :error="errors.faculty"
          :options="props.faculties"
          @focus="emit('focus')"
          @touched="onTouch('faculty')"
        />
        <Select
          v-model="state.department"
          label="Department"
          name="department"
          placeholder="Select Department"
          required
          :disabled="!isSelectedFaculty"
          :error="errors.department"
          :options="props.departments"
          @focus="emit('focus')"
          @touched="onTouch('department')"
        />
      </TemplateRow>
      <TemplateRow>
        <SelectMultipleWithSearch
          v-model:search="areaOfInterestSearch"
          v-model="state.areaOfInterest"
          label="Area of interest"
          name="areaOfInterest"
          placeholder="Select area of interest"
          required
          :error="errors.areaOfInterest"
          :options="props.areaOfInterests"
          @focus="emit('focus')"
          @touched="onTouch('areaOfInterest')"
        />
      </TemplateRow>
    </div>
  </UForm>
</template>
