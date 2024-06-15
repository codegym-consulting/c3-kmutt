<script lang="ts" setup>
import { Level, levelLabel } from '~/models/common'
const levels = [
  {
    title: `Level 1: ${levelLabel[Level.BEGINNER]}`,
    description: 'Beginners who needs close instruction and guideline.',
  },
  {
    title: `Level 2: ${levelLabel[Level.BEGINNER]}`,
    description: 'Some experience, basic understanding.',
  },
  {
    title: `Level 3: ${levelLabel[Level.COMPETENT]}`,
    description: 'Solid grasp, adaptability, achieve tasks with own judgement.',
  },
  {
    title: `Level 4: ${levelLabel[Level.PROFICIENT]}`,
    description: 'High skill level, deep understanding, intuition.',
  },
  {
    title: `Level 5: ${levelLabel[Level.EXPERT]}`,
    description: 'Mastery, innovation, complex decision making.',
  },
]

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <Modal :model-value="props.modelValue" @update:model-value="updateValue">
    <template #title>
      <NuxtIcon
        class="text-[56px] [&_path]:stroke-gray-10"
        name="c3/info"
        filled
      />
    </template>
    <template #subTitle>
      <span class="text-2xl leading-7 font-bold text-gray-10 mt-4"
        >Level information</span
      >
    </template>
    <template #default>
      <ol class="mt-10 flex flex-col gap-y-6 items-start">
        <li v-for="level in levels" :key="level.title">
          <h5 class="font-medium text-lg leading-[22px] text-gray-10">
            {{ level.title }}
          </h5>
          <p class="mt-2 text-base leading-5 text-gray-10 text-left">
            {{ level.description }}
          </p>
        </li>
      </ol>
    </template>
  </Modal>
</template>
