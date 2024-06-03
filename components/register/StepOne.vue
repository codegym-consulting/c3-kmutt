<script lang="ts" setup>
import { isEmpty } from '~/utils/validator'
import { titles, academicTitles, nationalities } from '~/configs/common'
import { registerStepOneSchema } from '~/models/register'

const state = reactive({
  title: {},
  academicTitle: {},
  name: '',
  surname: '',
  nationality: nationalities[0],
})

const props = defineProps<{
  modelValue: typeof state
}>()

const touchedField = ref('')
const { errors, validate } = useFormValidation(
  registerStepOneSchema,
  state,
  touchedField,
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: typeof state): void
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
  () => state,
  () => {
    emit('update:modelValue', state)
    const allRequiredFieldAreFilled =
      !isEmpty(state.title) &&
      state.name &&
      state.surname &&
      !isEmpty(state.nationality)

    // Check if all required fields are filled and then validate the form at once
    emit('validate', allRequiredFieldAreFilled && validate())
  },
  { deep: true },
)

onMounted(() => {
  state.title = props.modelValue?.title ?? {}
  state.academicTitle = props.modelValue?.academicTitle ?? {}
  state.name = props.modelValue?.name ?? ''
  state.surname = props.modelValue?.surname ?? ''
  state.nationality = props.modelValue?.nationality ?? nationalities[0]
})
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
