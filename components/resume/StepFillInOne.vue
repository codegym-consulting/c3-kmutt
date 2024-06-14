<script lang="ts" setup>
import {
  type ResumeFillInStepOne,
  resumeFillInStepOneSchema,
} from '~/models/register'

const firstName = 'Nattaporn'
const surName = 'Sae-lim'

const props = defineProps<{
  modelValue: ResumeFillInStepOne
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: ResumeFillInStepOne): void
  (event: 'touched' | 'focus'): void
  (event: 'validate', value: boolean): void
}>()

const { width } = useWindowSize()

const isMobile = computed(() => width.value < 768)
const state = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const {
  error: emailError,
  validate,
  clear,
} = useFieldValidation(resumeFillInStepOneSchema.shape.email, state.value.email)

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
  <div class="mt-6 md:mt-8 flex flex-col gap-y-4 md:gap-y-6">
    <div class="row">
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
    </div>
    <div class="row">
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
    </div>
    <div class="row">
      <InputAddingList
        id="education"
        title="Education"
        add-label="Add new education"
        v-model="state.education"
      />
    </div>
    <div class="row mt-2">
      <InputAddingList
        id="experience"
        title="Experience"
        add-label="Add new experience"
        v-model="state.experience"
      />
    </div>
  </div>
</template>

<style lang="pcss" scoped>
.row {
  @apply flex gap-4 flex-col md:flex-row [&>*]:flex-1;
}
</style>
