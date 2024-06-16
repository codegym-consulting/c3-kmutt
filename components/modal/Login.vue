<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
}>()

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <Modal
    title="Login with KMUTT account"
    sub-title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    :model-value="props.modelValue"
    @update:model-value="updateValue"
  >
    Login form over here
  </Modal>
</template>
