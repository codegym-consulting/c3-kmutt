<script lang="ts" setup>
const props = defineProps<Props>();

interface Props {
  to: string;
  label: string;
}
</script>

<template>
  <ULink
    :to="props.to"
    active-class="font-bold"
    inactive-class="transition-all text-[#1b1b1b] hover:text-white font-bold"
    >{{ props.label }}</ULink
  >
</template>
