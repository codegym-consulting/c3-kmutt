<script lang="ts" setup>
const affixRef = ref();
</script>

<template>
  <div
    id="page-container"
    ref="affixRef"
    class="bg-[url('/header_bg_mobile.webp')] sm:bg-[url('/header_bg_tablet.webp')] lg:bg-[url('/header_bg.webp')] bg-[top_center] bg-no-repeat bg-contain"
  >
    <UContainer>
      <Navbar :relative-element="affixRef" />
    </UContainer>
    <slot></slot>
    <UContainer>
      <AppFooter />
    </UContainer>
  </div>
</template>
