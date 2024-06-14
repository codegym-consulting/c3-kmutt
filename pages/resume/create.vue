<script lang="ts" setup>
import { isEmpty } from '~/utils/validator'

definePageMeta({
  layout: 'register',
  // middleware: 'auth',
})

const pageSubtitle = [
  'Add your resume to enhance your profile.',
  'Upload your resume file for submission.',
  'Enter your resume details directly into the provided fields.',
]

const { setRegisterNavbarFullSize } = useRegisterStore()
const step = ref(1)
const stepOneState = reactive<{
  method: '' | 'upload' | 'fill-in'
}>({
  method: '',
})
const stepTwoState = ref<File[] | null>(null)
const validate = reactive({
  stepOne: false,
  stepTwo: false,
})

watch(
  () => stepOneState.method,
  (value) => {
    setRegisterNavbarFullSize(!value)
    validate.stepOne = !!value
  },
)
watch(stepTwoState, (value) => {
  validate.stepTwo = !isEmpty(value)
})

const onClickNext = () => {
  if (step.value === 1 && stepOneState.method === 'upload') {
    step.value = 2
  }

  if (step.value === 1 && stepOneState.method === 'fill-in') {
    step.value = 3
  }
}

const onClickBack = () => {
  if (step.value === 2) {
    step.value = 1
  }

  if (step.value === 3) {
    step.value = 1
  }
}
</script>

<template>
  <div class="flex flex-col h-full flex-1">
    <h2
      class="text-2xl leading-7 md:text-[32px] md:leading-10 font-bold text-gray-10"
    >
      Input Resume
    </h2>
    <p class="text-base leading-5 text-gray-7 mt-2 mb-4">
      {{ pageSubtitle[step - 1] }}
    </p>
    <ResumeStepSelectMethod v-if="step === 1" v-model="stepOneState" />
    <ResumeStepUpload v-if="step === 2" v-model="stepTwoState" />
    <RegisterActionFooter
      :buttons="step === 1 ? ['', 'continue'] : ['back', 'done']"
      :disabled-next="step === 1 ? !validate.stepOne : !validate.stepTwo"
      :disabled-back="false"
      @click-back="onClickBack"
      @click-next="onClickNext"
    />
  </div>
</template>
