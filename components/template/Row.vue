<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    class?: string
  }>(),
  {
    class: '',
  },
)
</script>

<template>
  <div
    :class="[
      'w-full flex gap-4 flex-col md:flex-row [&>*]:flex-1',
      props.class,
    ]"
  >
    <slot />
  </div>
</template>
