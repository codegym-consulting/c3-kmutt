<script lang="ts" setup>
import type { ResumeFillInStepTwo } from '~/models/register'

type Type = 'skill' | 'tool'

const props = defineProps<{
  modelValue: ResumeFillInStepTwo
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: ResumeFillInStepTwo): void
}>()

const state = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const remove = (index: number, type: Type) => {
  if (index) {
    //remove skill
    type === 'skill'
      ? (state.value.skills = state.value.skills.filter((_, i) => i !== index))
      : (state.value.tools = state.value.tools.filter((_, i) => i !== index))
    return
  }

  //index 0 just clear the value

  if (type === 'skill') {
    state.value.skills[0].label = ''
    state.value.skills[0].value = 0
  } else {
    state.value.tools[0].label = ''
    state.value.tools[0].value = 0
  }
}
const add = (type: Type) => {
  if (type === 'skill') {
    state.value.skills = [
      ...state.value.skills,
      {
        label: '',
        value: 0,
      },
    ]
    return
  }

  state.value.tools = [
    ...state.value.tools,
    {
      label: '',
      value: 0,
    },
  ]
}
</script>

<template>
  <div class="mt-6 md:mt-8 flex flex-col gap-y-10">
    <div class="form">
      <TemplateRow
        v-for="(skill, index) in state.skills"
        :key="'skill' + index"
      >
        <div class="input">
          <Input
            v-model="skill.label"
            :label="index === 0 ? 'Skills' : ''"
            :id="'skill-name' + index"
          />
          <UIcon
            :class="[
              'remove-icon transition-all',
              !!skill.label || !!skill.value ? 'w-6' : 'w-0',
              index === 0 ? 'mt-10' : 'mt-0',
            ]"
            name="lucide:trash-2"
            @click="() => remove(index, 'skill')"
          />
        </div>
        <InputLevel
          v-model="skill.value"
          :id="'skill-level' + index"
          :show-label="index === 0"
          :show-info="index === 0"
        />
      </TemplateRow>
      <ButtonAdd
        label="Add new skills"
        class="-mt-4"
        @click="() => add('skill')"
      />
    </div>
    <div class="form">
      <TemplateRow v-for="(tool, index) in state.tools" :key="'tool' + index">
        <div class="input">
          <Input
            v-model="tool.label"
            :label="index === 0 ? 'Skills' : ''"
            :id="'tool-name' + index"
          />
          <UIcon
            :class="[
              'remove-icon transition-all',
              !!tool.label || !!tool.value ? 'w-6' : 'w-0',
              index === 0 ? 'mt-10' : 'mt-0',
            ]"
            name="lucide:trash-2"
            @click="() => remove(index, 'tool')"
          />
        </div>
        <InputLevel
          v-model="tool.value"
          :id="'tool-level' + index"
          :show-label="index === 0"
        />
      </TemplateRow>
      <ButtonAdd
        label="Add new tools"
        class="-mt-4"
        @click="() => add('tool')"
      />
    </div>
  </div>
</template>

<style lang="pcss" scoped>
.form {
    @apply flex flex-col items-start gap-y-4;
}
.input {
    @apply flex gap-x-4 [&>*]:flex-1;
}
.remove-icon {
    @apply h-14 self-start !flex-none cursor-pointer overflow-hidden;
}
</style>
