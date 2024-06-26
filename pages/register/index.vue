<script lang="ts" setup>
import {
  organizations,
  occupations,
  titles,
  academicTitles,
  nationalities,
} from '~/data/common'
import type { Option } from '~/utils/repositories/common/model'
import { refDebounced } from '@vueuse/core'

definePageMeta({
  layout: 'register',
  middleware: 'auth',
})

const { $fetchApi } = useNuxtApp()
const { user } = useUserSession()
const registerRepo = registerRepository($fetchApi)
const router = useRouter()
const register = useRegisterStore()
const step = ref(1)
const expertiseSearch = ref('')
const expertiseSearchDebounced = refDebounced(expertiseSearch, 500)
const areaOfInterestSearch = ref('')
const areaOfInterestSearchDebounced = refDebounced(areaOfInterestSearch, 500)
const userData = reactive({
  email: user.value?.email ?? '',
  photoUrl: user.value?.photoUrl ?? '',
  name: user.value?.name ?? '',
})

const validate = reactive({
  stepOne: false,
  stepTwo: false,
})

const stepOneState = reactive<{
  title: Option | object
  academicTitle: Option | object
  name: string
  surname: string
  nationality: Option | object
}>({
  title: {},
  academicTitle: {},
  name: '',
  surname: '',
  nationality: {
    label: 'Thai',
    value: 'thai',
  },
})

const stepTwoState = reactive<{
  occupation: Option | object
  teachingExperience: string
  expertise: Option[]
  organization: Option | object
  areaOfInterest: Option[]
  faculty: Option | object
  department: Option | object
}>({
  occupation: {},
  teachingExperience: '',
  expertise: [],
  organization: organizations[0],
  faculty: {},
  department: {},
  areaOfInterest: [],
})

const { data: faculties } = useAsyncData('faculties', registerRepo.getFaculties)
const { data: departments } = useAsyncData(
  'departments',
  () => {
    const option = stepTwoState.faculty
    if ('value' in option) {
      return registerRepo.getDepartments(+option.value)
    }
    return registerRepo.getDepartments()
  },
  { watch: [() => stepTwoState.faculty], deep: true },
)
const { data: expertises } = useAsyncData(
  'expertises',
  () => registerRepo.getExpertises(expertiseSearchDebounced.value),
  { watch: [expertiseSearchDebounced] },
)
const { data: areaOfInterests } = useAsyncData(
  'expertises',
  () => registerRepo.getInterests(areaOfInterestSearchDebounced.value),
  { watch: [areaOfInterestSearchDebounced] },
)

const onValidateStep = (value: boolean) => {
  if (step.value === 1) {
    validate.stepOne = value
  }

  if (step.value === 2) {
    validate.stepTwo = value
  }
}

const onClickNext = async () => {
  if (step.value === 1) {
    step.value = 2
    return
  }

  if (step.value === 2) {
    await registerRepo.postRegister(
      {
        email: userData.email,
        title: (stepOneState.title as Option).value.toString(),
        name: stepOneState.name,
        surname: stepOneState.surname,
        academicTitle: (stepOneState.academicTitle as Option).value.toString(),
        nationality: (stepOneState.nationality as Option).value.toString(),
        occupation: (stepTwoState.occupation as Option).value.toString(),
        teachingExperiences: [101, 102],
        expertises: stepTwoState.expertise.map((e) => +e.value),
        organization: (stepTwoState.organization as Option).value.toString(),
        faculty: +(stepTwoState.faculty as Option).value,
        department: +(stepTwoState.department as Option).value,
        areaOfInterests: stepTwoState.areaOfInterest.map((a) => +a.value),
      },
      (status) => {
        if (status === 201) {
          register.setIsRegisterationSuccess(true)
          router.push('/register/success')
        }
      },
    )
  }
}

watch(
  () => stepTwoState.faculty,
  () => {
    stepTwoState.department = {}
  },
  { deep: true },
)

// TODO: handle missing cookie when request API
// onMounted(() => {
//   // Clear the user session beforehand
//   clear()
// })
</script>

<template>
  <div class="flex flex-col h-full relative">
    <div
      class="flex flex-col justify-end sticky top-0 bg-white z-10 flex-shrink-0 h-[124px] -mt-10 -translate-y-10"
    >
      <h2
        class="text-2xl leading-7 md:text-[32px] md:leading-10 font-bold text-gray-10"
      >
        Register
      </h2>
      <p class="text-base leading-5 text-gray-7 mt-2 mb-4">
        Enter your personal details to register.
      </p>
    </div>
    <Stepper v-model="step" :step="2" />
    <div class="mt-6 md:mt-8">
      <RegisterStepOne
        v-if="step === 1"
        v-model="stepOneState"
        :user-data="userData"
        :titles="titles"
        :academic-titles="academicTitles"
        :nationalities="nationalities"
        @validate="onValidateStep"
        @focus="register.setRegisterNavbarFullSize(false)"
      />
      <RegisterStepTwo
        v-if="step === 2"
        v-model="stepTwoState"
        v-model:expertise-search="expertiseSearch"
        v-model:area-of-interest-search="areaOfInterestSearch"
        :expertises="expertises ?? []"
        :area-of-interests="areaOfInterests ?? []"
        :organizations="organizations"
        :occupations="occupations"
        :faculties="faculties ?? []"
        :departments="departments ?? []"
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
