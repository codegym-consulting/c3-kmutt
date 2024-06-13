<script lang="ts" setup>
import {
  getExpertises,
  getInterests,
  getFaculties,
  getDepartments,
  postRegister,
} from '~/services/register'
import {
  organizations,
  occupations,
  titles,
  academicTitles,
  nationalities,
} from '~/data/common'
import type { Option } from '~/models/common'
import { watchDebounced } from '@vueuse/core'

definePageMeta({
  layout: 'register',
  middleware: 'auth'
})

const { user, clear } = useUserSession()
const router = useRouter()
const register = useRegisterStore()
const step = ref(1)
const expertiseSearch = ref('')
const areaOfInterestSearch = ref('')
const userData = reactive({
  email: user.value?.email ?? '',
  photoUrl: user.value?.photoUrl ?? '',
  name: user.value?.name ?? '',
})
const options = reactive<{
  expertises: Option[]
  areaOfInterests: Option[]
  faculties: Option[]
  departments: Option[]
}>({
  expertises: [],
  areaOfInterests: [],
  faculties: [],
  departments: [],
})

const validate = reactive({
  stepOne: false,
  stepTwo: false,
})

const stepOneState = reactive<{
  title: Option | {}
  academicTitle: Option | {}
  name: string
  surname: string
  nationality: Option | {}
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
  occupation: Option | {}
  teachingExperience: string
  expertise: Option[]
  organization: Option | {}
  areaOfInterest: Option[]
  faculty: Option | {}
  department: Option | {}
}>({
  occupation: {},
  teachingExperience: '',
  expertise: [],
  organization: organizations[0],
  faculty: {},
  department: {},
  areaOfInterest: [],
})

const queryFaculties = async () => {
  const { data: faculties } = await getFaculties()
  options.faculties = faculties?.value ?? []
}

const queryDepartments = async (facultyId?: number) => {
  const { data: departments } = await getDepartments(facultyId)
  stepTwoState.department = {}
  options.departments = departments?.value ?? []
}

const queryExpertises = async (search?: string) => {
  const { data: expertises } = await getExpertises(search)
  options.expertises = expertises?.value ?? []
}

const queryAreaOfInterests = async (search?: string) => {
  const { data: areaOfInterests } = await getInterests(search)
  options.areaOfInterests = areaOfInterests?.value ?? []
}

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
    const res = await postRegister({
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
      subUnit: +(stepTwoState.department as Option).value,
      areaOfInterests: stepTwoState.areaOfInterest.map((a) => +a.value),
    })

    if (res.status.value === 'success') {
      register.setIsRegisterationSuccess(true)
      router.push('/register/success')
    }
  }
}

watchDebounced(
  expertiseSearch,
  (value) => {
    queryExpertises(value)
  },
  { debounce: 500 },
)

watchDebounced(
  areaOfInterestSearch,
  (value) => {
    queryAreaOfInterests(value)
  },
  { debounce: 500 },
)

watch(
  () => stepTwoState.faculty,
  (option: Option | {}) => {
    if ('value' in option) {
      queryDepartments(+option.value)
    }
  },
  { deep: true },
)

await queryExpertises()
await queryAreaOfInterests()
await queryFaculties()
await queryDepartments()

onMounted(() => {
  // Clear the user session beforehand
  clear()
})
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
        :expertises="options.expertises"
        :area-of-interests="options.areaOfInterests"
        :organizations="organizations"
        :occupations="occupations"
        :faculties="options.faculties"
        :departments="options.departments"
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
