<script lang="ts" setup>
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
})

const classes = computed(() => {
  return {
    primary: {
      active: 'font-bold',
      inActive: 'transition-all text-gray-10 hover:text-white font-medium',
    },
    secondary: {
      active: 'font-bold text-gray-6',
      inActive: 'transition-all text-gray-6 hover:text-gray-10 font-medium',
    },
  }[props.variant]
})

interface Props {
  to: string
  label: string
  variant?: 'primary' | 'secondary'
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
