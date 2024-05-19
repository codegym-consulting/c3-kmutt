<script lang="ts" setup>
const affixRef = ref();
</script>

<template>
  <div>
    <UContainer id="page-container" ref="affixRef">
      <CommonNavbar :relative-element="affixRef" />
      <slot></slot>
    </UContainer>
    <CommonFooter />
  </div>
</template>
