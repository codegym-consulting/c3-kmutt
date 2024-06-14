<script lang="ts" setup>
import type { FixedLengthArray } from '~/models/common'
import type { ButtonType } from '~/components/register/ActionFooter.vue'
import type { ResumeFillInStepOne } from '~/models/register'
import { isEmpty } from '~/utils/validator'

definePageMeta({
  layout: 'register',
  middleware: 'auth',
})

const pageSubtitle = [
  'Add your resume to enhance your profile.',
  'Upload your resume file for submission.',
  'Enter your resume details directly into the provided fields.',
  'Enter your resume details directly into the provided fields.',
  'Enter your resume details directly into the provided fields.',
]

const { setRegisterNavbarFullSize } = useRegisterStore()
const step = ref(1)
const fillInStep = ref(1)
const stepOneState = reactive<{
  method: '' | 'upload' | 'fill-in'
}>({
  method: '',
})
const stepTwoState = ref<File[] | null>(null)
const validate = reactive({
  1: false,
  2: false,
  3: true,
  4: true,
  5: true,
})

const fillInStepOneState = reactive<ResumeFillInStepOne>({
  nickname: '',
  email: '',
  phone: '',
  education: [],
  experience: [],
  avatar: undefined,
})

const actionButton = computed<FixedLengthArray<[ButtonType, ButtonType]>>(
  () => {
    if (step.value === 1) {
      return ['', 'continue']
    }
    if (step.value === 2) {
      return ['back', 'done']
    }
    if (step.value === 3 || step.value === 4) {
      return ['back', 'next']
    }
    if (step.value === 5) {
      return ['back', 'done']
    }
    return ['', '']
  },
)

watch(
  () => stepOneState.method,
  (value) => {
    setRegisterNavbarFullSize(!value)
    validate[1] = !!value
  },
)
watch(stepTwoState, (value) => {
  validate[2] = !isEmpty(value)
})

const onClickNext = () => {
  if (step.value === 1 && stepOneState.method === 'upload') {
    step.value = 2
    return
  }

  if (step.value === 1 && stepOneState.method === 'fill-in') {
    fillInStep.value = 1
    step.value = 3
    return
  }

  if (step.value >= 3 && step.value < 5 && stepOneState.method === 'fill-in') {
    fillInStep.value += 1
    step.value += 1
  }
}

const onClickBack = () => {
  if (step.value === 2) {
    step.value = 1
  }

  if (step.value === 3) {
    step.value = 1
  }

  if (step.value >= 4) {
    fillInStep.value -= 1
    step.value -= 1
  }
}
</script>

<template>
  <div class="flex flex-col h-full flex-1 relative">
    <div
      class="flex flex-col justify-end sticky top-0 bg-white z-10 flex-shrink-0 h-[124px] -mt-10 -translate-y-10"
    >
      <h2
        class="text-2xl leading-7 md:text-[32px] md:leading-10 font-bold text-gray-10"
      >
        Input Resume
      </h2>
      <p class="text-base leading-5 text-gray-7 mt-2 mb-4">
        {{ pageSubtitle[step - 1] }}
      </p>
    </div>
    <Stepper v-if="step >= 3" v-model="fillInStep" :step="3" />
    <ResumeStepSelectMethod v-if="step === 1" v-model="stepOneState" />
    <ResumeStepUpload v-if="step === 2" v-model="stepTwoState" />
    <ResumeStepFillInOne v-if="step === 3" v-model="fillInStepOneState" />
    <ResumeStepFillInTwo v-if="step === 4" />
    <ResumeStepFillInThree v-if="step === 5" />
    <RegisterActionFooter
      :buttons="actionButton"
      :disabled-next="!validate[step as 1 | 2 | 3 | 4 | 5]"
      :disabled-back="false"
      @click-back="onClickBack"
      @click-next="onClickNext"
    />
  </div>
</template>
