<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
  <USlideover
    :ui="{
      base: 'relative flex-1 flex flex-col w-full focus:outline-none rounded-t-[40px] overflow-y-auto',
      wrapper: 'inset-[unset] top-[50%] bottom-0',
      width: 'max-w-full',
      overlay: {
        background: 'bg-gray-9/80',
      },
      translate: {
        base: 'translate-y-0 translate-x-0',
        right:
          'translate-y-full rtl:-translate-y-full translate-x-0 rtl:-translate-x-0',
      },
    }"
    :model-value="props.modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <slot></slot>
  </USlideover>
</template>
