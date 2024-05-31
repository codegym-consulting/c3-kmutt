<script lang="ts" setup>
const { $classes } = useNuxtApp();
const affixRef = ref();
</script>

<template>
  <div
    id="page-container"
    ref="affixRef"
    :class="
      $classes(
        'relative',
        `after:content-[''] after:block after:absolute`,
        'after:inset-0 after:w-full after:h-full after:opacity-10',
        'after:bg-[url(~/public/landing/noise.webp)] after:bg-repeat after:bg-cover after:z-[-1]'
      )
    "
  >
    <UContainer>
      <Navbar :relative-element="affixRef" />
    </UContainer>
    <slot />
    <div class="bg-white">
      <UContainer>
        <AppFooter />
      </UContainer>
    </div>
  </div>
</template>
