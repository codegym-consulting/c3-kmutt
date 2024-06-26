<script lang="ts" setup>
import {
  ALERT_TYPE,
  type FixedLengthArray,
} from '~/utils/repositories/common/model'
import type { ButtonType } from '~/components/register/ActionFooter.vue'
import type {
  ResumeFillInStepOne,
  ResumeFillInStepTwo,
  ResumeFillInStepThree,
} from '~/utils/repositories/resume/model'
import { isEmpty } from '~/utils/validator'
import type { TypeOfDegree, TypeOfSource } from '~/server/api/resume/schema'

definePageMeta({
  layout: 'register',
  middleware: 'auth',
})

const pageSubtitle = [
  'Add your resume to enhance your profile.',
  'Upload your resume file for submission.',
  'Enter your resume details directly into the provided fields.',
]

const { $alert, $fetchApi } = useNuxtApp()
const resumeRepo = resumeRepository($fetchApi)
const { setRegisterNavbarFullSize, setIsCreateResumeSuccess } =
  useRegisterStore()
const step = ref(1)
const fillInStep = ref(1)
const isLoading = ref(false)
const photoUrl = ref('')
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
const fillInStepTwoState = reactive<ResumeFillInStepTwo>({
  skills: [{ label: '', value: 0 }],
  tools: [{ label: '', value: 0 }],
})
const fillInStepThreeState = reactive<ResumeFillInStepThree>({
  research: [],
  training: [],
  academicService: [],
  publication: [],
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

const onClickNext = async () => {
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
    return
  }

  // Step Upload Resume
  if (
    step.value === 2 &&
    stepOneState.method === 'upload' &&
    stepTwoState.value
  ) {
    isLoading.value = true
    await resumeRepo.uploadResume(
      stepTwoState.value,
      () => {
        isLoading.value = false
        setIsCreateResumeSuccess(true)
        return navigateTo('/resume/success?type=upload')
      },
      (error) => {
        isLoading.value = false
        $alert({
          id: new Date().getSeconds().toString(),
          title: 'Cannot upload file',
          content: error,
          type: ALERT_TYPE.ERROR,
        })

        stepTwoState.value = null
      },
    )
    return
  }

  // Step Fill In Resume
  if (step.value === 5 && stepOneState.method === 'fill-in') {
    let isUploadFailed = false
    isLoading.value = true
    if (fillInStepOneState.avatar && !photoUrl.value) {
      await resumeRepo.uploadProfile(
        fillInStepOneState.avatar,
        (urls) => {
          photoUrl.value = urls?.pop?.() ?? ''
        },
        (error) => {
          isUploadFailed = true
          isLoading.value = false
          $alert({
            id: new Date().getSeconds().toString(),
            title: 'Cannot upload profile image',
            content: error,
            type: ALERT_TYPE.ERROR,
          })
        },
      )
    }

    if (isUploadFailed) return

    await resumeRepo.postCreateResume(
      {
        photoUrl: photoUrl.value,
        nickname: fillInStepOneState?.nickname ?? '',
        contactEmail: fillInStepOneState?.email ?? '',
        contactNumber: fillInStepOneState?.phone?.replaceAll?.('-', '') ?? '',
        educations:
          fillInStepOneState.education?.map((e) => ({
            typeOfDegree: (e.degree as Option<TypeOfDegree>)?.value,
            institution: e.school,
            fieldOfStudy: e.fieldOfStudy,
            graduationYear: e.graduation?.toString?.() ?? '',
          })) ?? [],
        experiences:
          fillInStepOneState.experience?.map((e) => ({
            title: e.job,
            company: e.company,
            location: e.location,
            startDate: e.start,
            endDate: e.end,
          })) ?? [],
        skills: fillInStepTwoState.skills
          .filter((s) => s.value)
          .map((s) => ({
            name: s.label,
            level: s.value,
          })),
        tools: fillInStepTwoState.tools
          .filter((s) => s.value)
          .map((t) => ({
            name: t.label,
            level: t.value,
          })),
        research:
          fillInStepThreeState.research?.map((p) => ({
            name: p.topic ?? '',
            categories: p.category?.map((c) => +c.value) ?? [],
            date: p.date,
          })) ?? [],
        trainings:
          fillInStepThreeState.training?.map((t) => ({
            class: t.course ?? '',
            date: t.date,
          })) ?? [],
        academicServices:
          fillInStepThreeState.academicService?.map((a) => ({
            name: a.topic ?? '',
            categories: a.category?.map((c) => +c.value) ?? [],
            date: a.date,
          })) ?? [],
        publications:
          fillInStepThreeState.publication?.map((p) => ({
            typeOfSource: (p.type as Option<TypeOfSource>)?.value,
            city: p.city,
            authors: p.author,
            publisher: p.publisher,
            year: p.year?.toString?.() ?? '',
          })) ?? [],
      },
      (status, data) => {
        isLoading.value = false
        if (status === 201) {
          setIsCreateResumeSuccess(true)
          return navigateTo('/resume/success/?type=fill-in')
        } else {
          if (!!data && 'message' in data) {
            $alert({
              id: new Date().getSeconds().toString(),
              title: 'Cannot create resume',
              content: data.message,
              type: ALERT_TYPE.ERROR,
            })
            return
          }
          $alert({
            id: new Date().getSeconds().toString(),
            title: 'Cannot create resume',
            content: 'please try again later',
            type: ALERT_TYPE.ERROR,
          })
        }
      },
    )
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
        {{ pageSubtitle?.[step - 1] ?? pageSubtitle[pageSubtitle.length - 1] }}
      </p>
    </div>
    <Stepper v-if="step >= 3" v-model="fillInStep" :step="3" />
    <ResumeStepSelectMethod v-if="step === 1" v-model="stepOneState" />
    <ResumeStepUpload v-if="step === 2" v-model="stepTwoState" />
    <ResumeStepFillInOne
      v-if="step === 3"
      v-model="fillInStepOneState"
      @validate="(valid) => (validate[3] = valid)"
    />
    <ResumeStepFillInTwo v-if="step === 4" v-model="fillInStepTwoState" />
    <ResumeStepFillInThree v-if="step === 5" v-model="fillInStepThreeState" />
    <RegisterActionFooter
      :buttons="actionButton"
      :disabled-next="!validate[step as 1 | 2 | 3 | 4 | 5] || isLoading"
      :disabled-back="isLoading"
      @click-back="onClickBack"
      @click-next="onClickNext"
    />
  </div>
</template>
