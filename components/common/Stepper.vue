<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    id?: string
    modelValue: number
    step: number
    clickable?: boolean
  }>(),
  { id: 'stepper', clickable: false },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

const updateValue = (value: number) => {
  if (props.clickable) emit('update:modelValue', value)
}
</script>

<template>
  <div class="flex items-center justify-center gap-x-1 [&>*]:flex-1">
    <button
      v-for="i in step"
      :key="props.id + i"
      type="button"
      :class="[
        'h-1 rounded-[20px] bg-gray-2',
        {
          'bg-[radial-gradient(95.67%_228.37%_at_0.26%_99.57%,#FAB32E_0%,#F96234_49%,#E22E73_78%,#5449FF_100%)]':
            i === props.modelValue,
        },
      ]"
      @click="updateValue(i)"
    />
  </div>
</template>
