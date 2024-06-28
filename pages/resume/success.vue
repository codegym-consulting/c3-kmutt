<script lang="ts" setup>
definePageMeta({
  layout: 'blank',
  validate() {
    const register = useRegisterStore()
    return register.isCreateResumeSuccess
  },
})

const template = {
  upload: {
    title: 'Resume uploaded!',
    description: 'Your resume has been successfully uploaded.',
  },
  'fill-in': {
    title: 'Resume successfully created!',
    description:
      'Your resume template has been successfully created. Start showcasing your professional journey!',
  },
}

const route = useRoute()
const register = useRegisterStore()
const templateData = template?.[route.query.type as keyof typeof template] ?? template.upload

onMounted(() => {
  register.setIsCreateResumeSuccess(false)
})
</script>

<template>
  <TemplateSuccess v-bind="templateData" />
</template>
