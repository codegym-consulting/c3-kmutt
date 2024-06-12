<script lang="ts" setup>
import { loginSchema } from '~/models/login'
import { watchDebounced } from '@vueuse/core'

definePageMeta({
  layout: 'register',
})

const register = useRegisterStore()

const email = ref('')
const formValid = ref(false)

const { error: emailError, validate: validateEmail } = useFieldValidation(
  loginSchema.shape.email,
  email,
)

const onFocus = () => {
  register.setRegisterNavbarFullSize(false)
}
watchDebounced(
  email,
  () => {
    console.log('validate email')
    validateEmail()
  },
  { debounce: 500 },
)
watch(
  () => [email, emailError],
  ([_email, _emailError]) => {
    formValid.value = !_emailError.value && !!_email.value 
  },
  { deep: true },
)

</script>

<template>
  <div class="flex flex-col h-full flex-1">
    <h2
      class="flex justify-between gap-x-2 text-2xl leading-7 md:text-[32px] md:leading-10 font-bold text-gray-10"
    >
      Forgot Password
    </h2>
    <p class="text-base leading-5 text-gray-7 mt-2 mb-4">
        Please enter your email address to receive a password reset link.
    </p>
    <div class="flex flex-col gap-y-6 mt-6 md:mt-8">
      <Input
        v-model="email"
        label="Enter your email"
        name="email"
        type="email"
        :error="emailError"
        @focus="onFocus"
        @touched="validateEmail"
      />
    </div>
    <RegisterActionFooter
      :buttons="['', 'done']"
      :disabled-next="!formValid"
      @click-next="() => {}"
    />
  </div>
</template>
