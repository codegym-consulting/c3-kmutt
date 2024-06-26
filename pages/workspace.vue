<script lang="ts" setup>
definePageMeta({
  layout: 'workspace',
  middleware: 'auth',
})

const { user, session, clear, loggedIn } = useUserSession()

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo('/login')
  }
})

const logout = async () => {
  await clear()
  navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen">
    <h1>This is workspace page (must login first)</h1>
  </div>
</template>
