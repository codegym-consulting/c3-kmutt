<script lang="ts" setup>
import { formatFullDate } from '~/utils/formatter'
import type {
  ResumeFillInStepThree,
  Research,
  Training,
  Publication,
} from '~/models/register'

type DataType = {
  research: Research
  training: Training
  academicService: Research
  publication: Publication
}

const props = defineProps<{
  modelValue: ResumeFillInStepThree
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: ResumeFillInStepThree): void
}>()

const state = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const modal = reactive({
  research: false,
  training: false,
  academicService: false,
  publication: false,
})
const index = reactive({
  research: -1,
  training: -1,
  academicService: -1,
  publication: -1,
})
const currentData = reactive<DataType>({
  research: {
    topic: '',
    category: [],
    date: '',
  },
  training: {
    course: '',
    date: '',
  },
  academicService: {
    topic: '',
    category: [],
    date: '',
  },
  publication: {
    type: undefined,
    author: [''],
    year: '',
    city: '',
    publisher: '',
  },
})

const onEditItem = <T extends keyof DataType>(
  type: T,
  item: DataType[T],
  i: number,
) => {
  modal[type] = true
  index[type] = i
  currentData[type] = { ...item }
}
const onSaveItem = <T extends keyof DataType>(type: T, item: DataType[T]) => {
  if (index[type] !== -1 && state.value[type]) {
    state.value[type][index[type]] = item
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state.value[type] = [...state.value[type]] as any
    index[type] = -1
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state.value[type] = [...(state.value[type] ?? []), item] as any
}

watch(
  () => modal,
  (_modal) => {
    // loop to check if any modal is closed then reset corresponding index to -1
    Object.entries(_modal).forEach(([key, value]) => {
      if (!value) {
        index[key as keyof typeof index] = -1
      }
    })
  },
  { deep: true },
)
</script>

<template>
  <div class="mt-6 md:mt-8 flex flex-col items-start gap-y-8">
    <TemplateRow>
      <InputAddingList
        id="research"
        title="Research project"
        v-model="state.research"
        @add="modal.research = true"
      >
        <CardExperience
          v-for="(research, index) in state.research"
          :key="`research-${index}`"
          :name="research.topic"
          :description="
            [
              research.category.filter(Boolean).join(', '),
              formatFullDate(research.date),
            ]
              .filter(Boolean)
              .join('\n') ?? ''
          "
          @edit="() => onEditItem('research', research, index)"
        />
      </InputAddingList>
    </TemplateRow>
    <TemplateRow>
      <InputAddingList
        id="training"
        title="Training and mentoring"
        v-model="state.training"
        @add="modal.training = true"
      >
        <CardExperience
          v-for="(training, index) in state.training"
          :key="`training-${index}`"
          :name="training.course"
          :description="formatFullDate(training.date)"
          @edit="() => onEditItem('training', training, index)"
        />
      </InputAddingList>
    </TemplateRow>
    <TemplateRow>
      <InputAddingList
        id="academic-service"
        title="Academic service"
        v-model="state.academicService"
        @add="modal.academicService = true"
      >
        <CardExperience
          v-for="(academic, index) in state.academicService"
          :key="`academic-service-${index}`"
          :name="academic.topic"
          :description="
            [
              academic.category.filter(Boolean).join(', '),
              formatFullDate(academic.date),
            ]
              .filter(Boolean)
              .join('\n') ?? ''
          "
          @edit="() => onEditItem('academicService', academic, index)"
        />
      </InputAddingList>
    </TemplateRow>
    <TemplateRow>
      <InputAddingList
        id="publication"
        title="Publication"
        v-model="state.publication"
        @add="modal.publication = true"
      >
        <CardExperience
          v-for="(publication, index) in state.publication"
          :key="`publication-${index}`"
          :name="publication.type?.label ?? ''"
          :description="
            [
              publication.author.filter(Boolean).join(', '),
              publication.year,
              publication.city,
              publication.publisher,
            ]
              .filter(Boolean)
              .join(' ∙ ')
          "
          @edit="() => onEditItem('publication', publication, index)"
        />
      </InputAddingList>
    </TemplateRow>
    <ModalResearch
      v-model="modal.research"
      v-model:research="currentData.research"
      @save="($event) => onSaveItem('research', $event)"
    />
    <ModalTraining
      v-model="modal.training"
      v-model:training="currentData.training"
      @save="($event) => onSaveItem('training', $event)"
    />
    <ModalAcademicService
      v-model="modal.academicService"
      v-model:academic="currentData.academicService"
      @save="($event) => onSaveItem('academicService', $event)"
    />
    <ModalPublication
      v-model="modal.publication"
      v-model:publication="currentData.publication"
      @save="($event) => onSaveItem('publication', $event)"
    />
  </div>
</template>
