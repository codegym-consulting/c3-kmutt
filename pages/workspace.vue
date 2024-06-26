<script lang="ts" setup>
definePageMeta({
  layout: 'workspace',
  middleware: 'auth',
})
</script>

<template>
  <div class="min-h-screen">
    <h1>This is workspace page (must login first)</h1>
  </div>
</template>
