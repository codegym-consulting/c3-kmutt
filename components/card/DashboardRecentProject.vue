<script lang="ts" setup></script>

<template>
  <UCard
    as="article"
    class="pt-4 px-4 pb-6 md:pt-6 md:px-6 md:pb-8"
    :ui="{
      strategy: 'override',
      base: 'w-full h-[425px]',
      divide: 'divide-y-0',
      rounded: 'rounded-2xl',
      header: { padding: 'p-0' },
      body: { padding: 'p-0 mt-6 md:mt-[26px]' },
      footer: { padding: 'p-0 mt-6 md:mt-[26px]' },
    }"
  />
</template>
