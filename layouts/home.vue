<script lang="ts" setup>
const affixRef = ref();
</script>

<template>
  <div
    class="bg-[url('/header_bg_mobile.webp')] sm:bg-[url('/header_bg.webp')] bg-[top_center] bg-no-repeat bg-contain"
  >
    <UContainer id="page-container" ref="affixRef">
      <CommonNavbar :relative-element="affixRef" />
      <slot></slot>
    </UContainer>
  </div>
</template>
