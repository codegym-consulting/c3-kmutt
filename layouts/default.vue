<script lang="ts" setup>
const affixRef = ref();
</script>

<template>
  <div id="page-container" ref="affixRef">
    <UContainer>
      <Navbar :relative-element="affixRef" />
    </UContainer>
    <slot></slot>
    <UContainer>
      <AppFooter />
    </UContainer>
  </div>
</template>
