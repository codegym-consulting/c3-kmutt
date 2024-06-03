<script lang="ts" setup>
import { titles, academicTitles, nationalities } from '~/configs/common'
import { registerStepOneSchema } from '~/models/register'

const state = reactive({
  title: {},
  academicTitle: {},
  name: '',
  surname: '',
  nationality: nationalities[0],
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
}

async function onSubmit() {
  if (validate()) {
    // Submit the form data
  }
}
</script>

<template>
  <UForm
    :schema="registerStepOneSchema"
    :state="state"
    @submit="onSubmit"
    @error="validate"
  >
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
          @touched="onTouch('title')"
        />
        <Select
          v-model="state.academicTitle"
          label="Academic title"
          name="academicTitle"
          placeholder="Select academic title"
          :options="academicTitles"
        />
      </div>
      <div class="row">
        <Input
          v-model="state.name"
          label="Name"
          name="name"
          required
          :error="errors.name"
          @touched="onTouch('name')"
        />
        <Input
          v-model="state.surname"
          label="Surname"
          name="surname"
          required
          :error="errors.surname"
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
