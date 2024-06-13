<script lang="ts" setup>
import { loginSchema } from '~/models/login'
import { watchDebounced } from '@vueuse/core'

definePageMeta({
  layout: 'register',
})

const register = useRegisterStore()

const email = ref('')
const password = ref('')
const formValid = ref(false)

const { error: emailError, validate: validateEmail } = useFieldValidation(
  loginSchema.shape.email,
  email,
)
const { error: passwordError, validate: validatePassword } = useFieldValidation(
  loginSchema.shape.password,
  password,
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
watchDebounced(
  password,
  () => {
    validatePassword()
  },
  { debounce: 500 },
)
watch(
  () => [email, password, emailError, passwordError],
  ([_email, _password, _emailError, _passwordError]) => {
    formValid.value =
      !_emailError.value &&
      !_passwordError.value &&
      !!_email.value &&
      !!_password.value
  },
  { deep: true },
)
</script>

<template>
  <div class="flex flex-col h-full flex-1">
    <h2
      class="flex justify-between gap-x-2 text-2xl leading-7 md:text-[32px] md:leading-10 font-bold text-gray-10"
    >
      Continue with email
      <NuxtLink
        class="text-xs md:text-base text-chrysler-blue underline font-normal"
        to="/login/forgot-password"
        >Forgot Password</NuxtLink
      >
    </h2>
    <p class="text-base leading-5 text-gray-7 mt-2 mb-4">
      Sign in with your registered email address and password.
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
      <Input
        v-model="password"
        label="Enter your password"
        name="password"
        type="password"
        :error="passwordError"
        @focus="onFocus"
        @touched="validatePassword"
      />
    </div>
    <RegisterActionFooter
      :buttons="['', 'done']"
      :disabled-next="!formValid"
      @click-next="() => {}"
    />
  </div>
</template>
