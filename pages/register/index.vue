<script lang="ts" setup>
import {
  getExpertises,
  getInterests,
  getSubUnits,
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
})

const router = useRouter()
const register = useRegisterStore()
const step = ref(1)
const expertiseSearch = ref('')
const areaOfInterestSearch = ref('')
const options = reactive<{
  expertises: Option[]
  areaOfInterests: Option[]
  subUnits: Option[]
}>({
  expertises: [],
  areaOfInterests: [],
  subUnits: [],
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
  subUnit: Option | {}
  areaOfInterest: Option[]
}>({
  occupation: {},
  teachingExperience: '',
  expertise: [],
  organization: organizations[0],
  subUnit: {},
  areaOfInterest: [],
})

const queryExpertises = async (search?: string) => {
  const { data: expertises } = await getExpertises(search)
  options.expertises = expertises?.value ?? []
}

const queryAreaOfInterests = async (search?: string) => {
  const { data: areaOfInterests } = await getInterests(search)
  options.areaOfInterests = areaOfInterests?.value ?? []
}

const querySubUnits = async (search?: string) => {
  const { data: subUnits } = await getSubUnits(search)
  options.subUnits = subUnits?.value ?? []
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
      email: 'pitikorn.chu@gmail.com',
      title: (stepOneState.title as Option).value.toString(),
      name: stepOneState.name,
      surname: stepOneState.surname,
      academicTitle: (stepOneState.academicTitle as Option).value.toString(),
      nationality: (stepOneState.nationality as Option).value.toString(),
      occupation: (stepTwoState.occupation as Option).value.toString(),
      teachingExperiences: [101, 102],
      expertises: stepTwoState.expertise.map((e) => +e.value),
      organization: (stepTwoState.organization as Option).value.toString(),
      subUnit: +(stepTwoState.subUnit as Option).value,
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

await queryExpertises()
await queryAreaOfInterests()
await querySubUnits()
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
        :sub-units="options.subUnits"
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
