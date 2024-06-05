<script lang="ts" setup>
import type { Option } from '~/models/common'
import { isEmpty } from '~/utils/validator'
import { titles, academicTitles, nationalities } from '~/data/common'
import { registerStepOneSchema } from '~/models/register'

type StepOneState = {
  title: Option
  academicTitle: Option
  name: string
  surname: string
  nationality: Option
}

const props = defineProps<{
  modelValue: StepOneState
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: StepOneState): void
  (event: 'touched' | 'focus'): void
  (event: 'validate', vakue: boolean): void
}>()

const state = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const touchedField = ref('')
const { errors, validate } = useFormValidation(
  registerStepOneSchema,
  state,
  touchedField,
)

const onTouch = (field: string) => {
  touchedField.value = field
  validate()
  emit('touched')
}

watch(
  () => state.value,
  (value) => {
    const allRequiredFieldAreFilled =
      !isEmpty(value.title) &&
      value.name &&
      value.surname &&
      !isEmpty(value.nationality)

    // Check if all required fields are filled and then validate the form at once
    emit('validate', !!(allRequiredFieldAreFilled && validate()))
  },
  { deep: true },
)
</script>

<template>
  <UForm :schema="registerStepOneSchema" :state="state" @error="validate">
    <CardEmailProfile
      v-bind="{
        avatar: '/landing/card_bg.webp',
        email: 'beam@gmail.com',
        name: 'Pitikorn Chulitawong',
      }"
    />
    <div class="flex flex-col gap-y-6 mt-[60px] md:mt-8 lg:mt-10">
      <div class="row">
        <Select
          v-model="state.title"
          label="Title"
          name="title"
          placeholder="Select title"
          required
          :error="errors.title"
          :options="titles"
          @focus="emit('focus')"
          @touched="onTouch('title')"
        />
        <Select
          v-model="state.academicTitle"
          label="Academic title"
          name="academicTitle"
          placeholder="Select academic title"
          :options="academicTitles"
          @focus="emit('focus')"
          @touched="onTouch('academicTitle')"
        />
      </div>
      <div class="row">
        <Input
          v-model="state.name"
          label="Name"
          name="name"
          required
          :error="errors.name"
          @focus="emit('focus')"
          @touched="onTouch('name')"
        />
        <Input
          v-model="state.surname"
          label="Surname"
          name="surname"
          required
          :error="errors.surname"
          @focus="emit('focus')"
          @touched="onTouch('surname')"
        />
      </div>
      <div class="row">
        <Select
          v-model="state.nationality"
          label="Nationality"
          name="nationality"
          required
          :options="nationalities"
          @focus="emit('focus')"
          @touched="onTouch('nationality')"
        />
        <div></div>
      </div>
    </div>
  </UForm>
</template>

<style lang="postcss" scoped>
.row {
  @apply flex gap-4 flex-col md:flex-row [&>*]:flex-1;
}
</style>