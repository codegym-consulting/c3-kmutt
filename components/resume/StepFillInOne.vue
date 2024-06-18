<script lang="ts" setup>
import {
  type ResumeFillInStepOne,
  type Education,
  type Experience,
  resumeFillInStepOneSchema,
} from '~/models/register'
import { isEmpty } from '~/utils/validator'

const firstName = 'Nattaporn'
const surName = 'Sae-lim'

const { $dayjs } = useNuxtApp()

const props = defineProps<{
  modelValue: ResumeFillInStepOne
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: ResumeFillInStepOne): void
  (event: 'touched' | 'focus'): void
  (event: 'validate', value: boolean): void
}>()

const { width } = useWindowSize()
const educationModal = ref(false)
const editEducationIndex = ref(-1)
const currentEducationData = ref<Education>({
  degree: undefined,
  fieldOfStudy: '',
  school: '',
  graduation: '',
})
const experienceModal = ref(false)
const editExperienceIndex = ref(-1)
const currentExperienceData = ref<Experience>({
  job: '',
  company: '',
  location: '',
  start: '',
  end: '',
})

const isMobile = computed(() => width.value < 768)
const state = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
const email = ref(state.value.email)

const {
  error: emailError,
  validate,
  clear,
} = useFieldValidation(resumeFillInStepOneSchema.shape.email, email)

const onSaveEducation = (value: Education) => {
  if (editEducationIndex.value !== -1 && state.value.education) {
    state.value.education[editEducationIndex.value] = value
    state.value.education = [...state.value.education]
    editEducationIndex.value = -1
    return
  }
  state.value.education = [...(state.value?.education ?? []), value]
}
const onEditEducation = (value: Education, index: number) => {
  educationModal.value = true
  editEducationIndex.value = index
  currentEducationData.value = { ...value }
}
const onSaveExperience = (value: Experience) => {
  if (editExperienceIndex.value !== -1 && state.value.experience) {
    state.value.experience[editExperienceIndex.value] = value
    state.value.experience = [...state.value.experience]
    editExperienceIndex.value = -1
    return
  }
  state.value.experience = [...(state.value?.experience ?? []), value]
}
const onEditExperience = (value: Experience, index: number) => {
  experienceModal.value = true
  editExperienceIndex.value = index
  currentExperienceData.value = { ...value }
}
const formatExperienceDateRange = (startDate?: string, endDate?: string) => {
  if (!startDate && !endDate) return ''
  const format = 'MMMM YYYY'
  const start = startDate
    ? $dayjs(startDate).locale('en').format(format)
    : 'unknown'
  const end = endDate ? $dayjs(endDate).locale('en').format(format) : 'Present'
  return `${start} - ${end}`
}

watch(educationModal, (value) => {
  if (!value) editEducationIndex.value = -1
})
watch(experienceModal, (value) => {
  if (!value) editExperienceIndex.value = -1
})
watch(
  () => state.value.email,
  (value) => {
    email.value = value
  },
)
watch(emailError, (error) => {
  emit('validate', !error)
})
watchDebounced(
  () => state.value.email,
  (value) => {
    if (!value) {
      clear()
      return
    }
    validate()
  },
  { debounce: 500 },
)
</script>

<template>
  <div>
    <div class="mt-6 md:mt-8 flex flex-col gap-y-4 md:gap-y-6">
      <TemplateRow>
        <div class="flex flex-col gap-y-6">
          <div id="upload-box" class="flex gap-x-2 justify-between">
            <div
              class="text-[22px] leading-[26px] md:text-2xl md:leading-7 text-gray-10 font-bold"
            >
              {{ firstName }} <br />
              {{ surName }}
            </div>
          </div>
          <Input v-model="state.nickname" label="Nickname" name="nickname" />
        </div>
        <ClientOnly>
          <Teleport to="#upload-box" :disabled="!isMobile">
            <div class="flex justify-end">
              <InputAvatarUpload v-model="state.avatar" />
            </div>
          </Teleport>
        </ClientOnly>
      </TemplateRow>
      <TemplateRow>
        <Input
          v-model="state.email"
          label="Contact email"
          name="email"
          type="email"
          :error="emailError"
        />
        <Input
          v-model="state.phone"
          label="Contact number"
          name="phone"
          type="tel"
        />
      </TemplateRow>
      <TemplateRow>
        <InputAddingList
          id="education"
          title="Education"
          add-label="Add new education"
          v-model="state.education"
          @add="educationModal = true"
        >
          <CardExperience
            v-for="(edu, index) in state.education"
            :key="`education-${index}`"
            :description="
              [edu.school, edu.graduation].filter(Boolean).join(' ∙ ')
            "
            @edit="() => onEditEducation(edu, index)"
          >
            <template #title
              >{{ edu.fieldOfStudy }}
              <span v-show="!isEmpty(edu.degree)"
                >({{ edu.degree?.label }})</span
              ></template
            >
          </CardExperience>
        </InputAddingList>
      </TemplateRow>
      <TemplateRow class="mt-2">
        <InputAddingList
          id="experience"
          title="Experience"
          add-label="Add new experience"
          v-model="state.experience"
          @add="experienceModal = true"
        >
          <CardExperience
            v-for="(exp, index) in state.experience"
            :key="`experience-${index}`"
            :name="exp.job"
            :description="
              [
                exp.company,
                exp.location,
                formatExperienceDateRange(exp.start, exp.end),
              ]
                .filter(Boolean)
                .join(' ∙ ')
            "
            @edit="() => onEditExperience(exp, index)"
          />
        </InputAddingList>
      </TemplateRow>
    </div>
    <ModalEducation
      v-model="educationModal"
      v-model:education="currentEducationData"
      @save="onSaveEducation"
    />
    <ModalExperience
      v-model="experienceModal"
      v-model:experience="currentExperienceData"
      @save="onSaveExperience"
    />
  </div>
</template>
