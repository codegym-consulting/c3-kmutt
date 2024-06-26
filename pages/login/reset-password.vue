<script lang="ts" setup>
import { resetPasswordSchema } from '~/utils/repositories/login/model'
import { watchDebounced } from '@vueuse/core'

definePageMeta({
  layout: 'register',
})

const register = useRegisterStore()

const newPassword = ref('')
const confirmPassword = ref('')
const formValid = ref(false)

const { error: formError, validate: validateForm } = useFieldValidation(
  resetPasswordSchema,
  { newPassword, confirmPassword },
)

async function onSubmit () {
  // Do something with data
  const result = resetPasswordSchema.parse({ newPassword: newPassword.value, confirmPassword: confirmPassword.value });
  console.log(result)
  // TODO: call api here to reset-password with attach token
}

const onFocus = () => {
  register.setRegisterNavbarFullSize(false)
}

watchDebounced(
  [newPassword, confirmPassword],
  () => {
    console.log('validate newPassword')
    validateForm()
  },
  { debounce: 500 },
)

watch(
  () => [newPassword, formError, confirmPassword],
  ([_newPassword, _formError, _confirmPassword]) => {
    formValid.value = !_formError.value && !!_newPassword.value && !!_confirmPassword.value && _confirmPassword.value === _newPassword.value
  },
  { deep: true },
)

</script>

<template>
  <div class="flex flex-col h-full flex-1">
    <h2 class="flex justify-between gap-x-2 text-2xl leading-7 md:text-[32px] md:leading-10 font-bold text-gray-10">
      Reset Password
    </h2>
    <p class="text-base leading-5 text-gray-7 mt-2 mb-4">
      Enter and confirm your new password to reset it.
    </p>
    <div class="flex flex-col gap-y-6 mt-6 md:mt-8">
      <Input v-model="newPassword" label="Enter your new password" name="newPassword" type="password"
        :error="formError" @focus="onFocus" @touched="validateForm" />
      <Input v-model="confirmPassword" label="Enter password confirmation" name="confirmPassword" type="password"
        :error="formError" @focus="onFocus" @touched="validateForm" />
    </div>
    <RegisterActionFooter :buttons="['', 'done']" :disabled-next="!formValid" @click-next="onSubmit" />
  </div>
</template>
