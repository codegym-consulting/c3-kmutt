<script lang="ts" setup>
import type { Option } from '~/models/common'
import { isEmpty } from '~/utils/validator'
import { occupations, expertises, subUnits } from '~/configs/common'
import { registerStepTwoSchema } from '~/models/register'

type StepTwoState = {
  occupation: Option
  teachingExperience: string
  expertise: Option[]
  organization: Option
  subUnit: Option
  areaOfInterest: Option[]
}

const props = defineProps<{
  modelValue: StepTwoState
}>()

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
  (event: 'touched'): void
  (event: 'focus'): void
  (event: 'validate', vakue: boolean): void
}>()

const onTouch = (field: string) => {
  touchedField.value = field
  validate()
  emit('touched')
}

watch(
  () => state.value,
  (value) => {
    const allRequiredFieldAreFilled =
      !isEmpty(value.occupation) &&
      !isEmpty(value.expertise) &&
      !isEmpty(value.organization) &&
      !isEmpty(value.subUnit) &&
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
      <div class="row">
        <Select
          v-model="state.occupation"
          label="Occupation"
          name="occupation"
          placeholder="Select occupation"
          required
          :error="errors.occupation"
          :options="occupations"
          @focus="emit('focus')"
          @touched="onTouch('occupation')"
        />
      </div>
      <div class="row">
        <UFormGroup label="Teaching experience">
          <ul class="flex flex-col gap-y-4">
            <li v-for="exp in experiences" :key="exp.name">
              <CardExperience v-bind="exp" />
            </li>
          </ul>
        </UFormGroup>
      </div>
      <div class="row">
        <SelectMultipleWithSearch
          v-model="state.expertise"
          label="Expertise"
          name="expertise"
          placeholder="Select expertise"
          required
          :error="errors.expertise"
          :options="expertises"
          @focus="emit('focus')"
          @touched="onTouch('expertise')"
        />
      </div>
      <div class="row">
        <Select
          v-model="state.organization"
          label="Organization"
          name="organization"
          placeholder="Select organization"
          required
          :error="errors.organization"
          :options="occupations"
          @focus="emit('focus')"
          @touched="onTouch('organization')"
        />
        <Select
          v-model="state.subUnit"
          label="Sub unit (Organization)"
          name="subUnit"
          placeholder="Select sub unit"
          required
          :error="errors.subUnit"
          :options="subUnits"
          @focus="emit('focus')"
          @touched="onTouch('subUnit')"
        />
      </div>
      <div class="row">
        <SelectMultipleWithSearch
          v-model="state.areaOfInterest"
          label="Area of interest"
          name="areaOfInterest"
          placeholder="Select area of interest"
          required
          :error="errors.areaOfInterest"
          :options="expertises"
          @focus="emit('focus')"
          @touched="onTouch('areaOfInterest')"
        />
      </div>
    </div>
  </UForm>
</template>

<style lang="postcss" scoped>
.row {
  @apply flex gap-4 flex-col md:flex-row [&>*]:flex-1;
}
</style>
