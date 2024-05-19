<script lang="ts" setup>
const affixRef = ref();
</script>

<template>
  <UContainer id="page-container" ref="affixRef">
    <CommonNavbar :relative-element="affixRef" />
    <slot></slot>
  </UContainer>
</template>
