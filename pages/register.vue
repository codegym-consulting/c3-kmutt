<script lang="ts" setup>
definePageMeta({
  layout: 'register',
})

const register = useRegisterStore()
const step = ref(1)
</script>

<template>
  <div class="flex flex-col h-full">
    <h2
      class="text-2xl leading-7 md:text-[32px] md:leading-10 font-bold text-gray-10"
    >
      Register
    </h2>
    <p class="text-base leading-5 text-gray-7 mt-2 mb-4">
      Enter your personal details to register.
    </p>
    <Stepper v-model="step" :step="2" />
    <div class="mt-6 md:mt-8">
      <RegisterStepOne />
      <RegisterStepTwo v-if="false" />
    </div>
    <RegisterActionFooter
      :buttons="step === 1 ? ['', 'next'] : ['back', 'done']"
    />
  </div>
</template>
