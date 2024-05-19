<script lang="ts" setup>
const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

const classes = computed(() => {
  return {
    primary: {
      active: "font-bold",
      inActive: "transition-all text-[#1b1b1b] hover:text-white font-bold",
    },
    secondary: {
      active: "font-semibold text-[#959595]",
      inActive:
        "transition-all text-[#959595] hover:text-[#1b1b1b] font-semibold",
    },
  }[props.variant];
});

interface Props {
  to: string;
  label: string;
  variant?: "primary" | "secondary";
}
</script>

<template>
  <ULink
    :to="props.to"
    :active-class="classes.active"
    :inactive-class="classes.inActive"
    >{{ props.label }}</ULink
  >
</template>
