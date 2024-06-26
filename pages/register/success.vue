<script lang="ts" setup>
definePageMeta({
  layout: 'blank',
  validate() {
    const register = useRegisterStore()
    return register.isRegisterationSuccess
  },
})

const register = useRegisterStore()

onMounted(() => {
  register.setIsRegisterationSuccess(false)
})
</script>

<template>
  <TemplateSuccess title="Registration complete!">
    <template #description>
      You have successfully registered. You can also
      <UButton variant="inline-link" to="/resume/create"
        >create an online resume</UButton
      >
      to<br >
      showcase your skills and experiences.
    </template>
  </TemplateSuccess>
</template>
