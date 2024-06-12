<script lang="ts" setup>
definePageMeta({ 
    layout: 'default',
    middleware: 'auth'
})

const { user, session, clear, loggedIn } = useUserSession()

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo('/login')
  }
})

const logout = async () => {
  clear()
  await navigateTo('/')
}
</script>

<template>
   <div
    :class="
      $classes(
        'flex flex-col',
        'bg-[url(~/public/about/bg_mobile.webp)] md:bg-[url(~/public/about/bg_tablet.webp)] lg:bg-[url(~/public/about/bg.webp)]',
        'bg-no-repeat bg-[size:100%_80%] bg-[center_bottom]',
      )
    "
  >
    <UContainer id="heading-section" class="py-12">
    <h1>This is workspace page (must login first)</h1>
    <UCard>
    <template #header>
      <h3 class="text-lg font-semibold leading-6">
        User Info
      </h3>
        <p>{{session}}</p>
        <hr class="dark:border-gray-700">
        <p>{{ user }}</p>
    </template>
    <UButton v-if="user" color="red" icon="i-heroicons-arrow-left-on-rectangle" :trailing="false" label="Logout" @click="logout" />
  </UCard>
</UContainer>
</div>
</template>
