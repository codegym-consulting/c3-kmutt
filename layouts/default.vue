<script lang="ts" setup>
const affixRef = ref();
</script>

<template>
  <div>
    <UContainer id="page-container" ref="affixRef">
      <Navbar :relative-element="affixRef" />
      <slot></slot>
    </UContainer>
    <Footer />
  </div>
</template>
