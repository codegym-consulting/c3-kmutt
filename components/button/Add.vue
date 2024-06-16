<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    label: string
    class?: string
  }>(),
  {
    class: '',
  },
)

const emit = defineEmits<{
  (event: 'click'): void
}>()
</script>

<template>
  <button
    :class="['add-button', props.class]"
    type="button"
    @click="emit('click')"
  >
    <UIcon class="icon" name="humbleicons:plus" />
    <span class="label">{{ props.label }}</span>
  </button>
</template>

<style lang="pcss" scoped>
.add-button {
    @apply text-chrysler-blue text-base leading-5 font-medium hover:text-bright-chrysler-blue;
    .icon {
        @apply text-xl mr-2;
    }
    .label {
        @apply inline-block translate-y-[2px];
    }
}
</style>
