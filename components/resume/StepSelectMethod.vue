<script lang="ts" setup>
type StepSelectMethod = {
  method: 'upload' | 'fill-in' | ''
}

const props = withDefaults(
  defineProps<{
    modelValue: StepSelectMethod
  }>(),
  {},
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: StepSelectMethod): void
}>()

const state = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const isUpload = computed(() => state.value.method === 'upload')
const isFillIn = computed(() => state.value.method === 'fill-in')
</script>

<template>
  <div class="flex flex-col gap-y-4 md:mt-4 lg:mt-6">
    <ButtonSheet
      title="Upload file"
      subtitle="Upload your resume file for submission."
      :active="isUpload"
      @click="state.method = 'upload'"
    >
      <template #icon="iconProps">
        <NuxtIcon
          :class="[
            'text-[88px]',
            { '[&_path]:stroke-white': isUpload },
            {
              '[&_path]:stroke-dark-chrysler-blue':
                iconProps.hover && !isUpload,
            },
          ]"
          name="c3/upload"
          filled
        />
      </template>
    </ButtonSheet>
    <ButtonSheet
      title="Fill in template"
      subtitle="Enter your resume details directly into the provided fields."
      :active="isFillIn"
      @click="state.method = 'fill-in'"
    >
      <template #icon="iconProps">
        <NuxtIcon
          :class="[
            'text-[88px]',
            {
              '[&_path]:stroke-white [&_rect]:stroke-white': isFillIn,
            },
            {
              '[&_path]:stroke-dark-chrysler-blue [&_rect]:stroke-dark-chrysler-blue':
                iconProps.hover && !isFillIn,
            },
          ]"
          name="c3/article"
          filled
        />
      </template>
    </ButtonSheet>
  </div>
</template>
