<script lang="ts" setup>
definePageMeta({
  layout: 'register',
})

const register = useRegisterStore()
</script>

<template>
  <button @click="() => register.setRegisterNavbarFullSize(false)">
    Click This To change navbar size
  </button>
</template>
