<script lang="ts" setup>
import { nationalities, organizations } from '~/configs/common'

definePageMeta({
  layout: 'register',
})

const router = useRouter()
const register = useRegisterStore()
const step = ref(1)

const validate = reactive({
  stepOne: false,
  stepTwo: false,
})

const stepOneState = reactive({
  title: {},
  academicTitle: {},
  name: '',
  surname: '',
  nationality: nationalities[0],
})

const stepTwoState = reactive({
  occupation: {},
  teachingExperience: '',
  expertise: [],
  organization: organizations[0],
  subUnit: {},
  areaOfInterest: [],
})

const onValidateStep = (value: boolean) => {
  if (step.value === 1) {
    validate.stepOne = value
  }

  if (step.value === 2) {
    validate.stepTwo = value
  }
}

const onClickNext = () => {
  if (step.value === 1) {
    step.value = 2
    return
  }

  if (step.value === 2) {
    //Done
    register.setIsRegisterationSuccess(true)
    router.push('/register/success')
  }
}
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
      <RegisterStepOne
        v-if="step === 1"
        v-model="stepOneState"
        @validate="onValidateStep"
        @focus="register.setRegisterNavbarFullSize(false)"
      />
      <RegisterStepTwo
        v-if="step === 2"
        v-model="stepTwoState"
        @validate="onValidateStep"
      />
    </div>
    <RegisterActionFooter
      :buttons="step === 1 ? ['', 'next'] : ['back', 'done']"
      :disabled-next="step === 1 ? !validate.stepOne : !validate.stepTwo"
      :disabled-back="false"
      @click-back="step--"
      @click-next="onClickNext"
    />
  </div>
</template>
