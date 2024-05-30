<script lang="ts" setup>
const props = withDefaults(defineProps<{
  iconName: string
  iconify?: boolean
  title: string
  description: string
}>(), {
    iconify: false,
})
</script>

<template>
  <article
    class="w-full h-fit py-8 px-6 rounded-[32px] flex flex-col bg-white text-left"
  >
    <div class="text-gray-10 w-16 h-16 text-[40px] flex items-center justify-center">
      <UIcon v-if="props.iconify" :name="props.iconName" />
      <NuxtIcon v-else :name="props.iconName" />
    </div>
    <h3 class="mt-[22px] text-[22px] leading-[26px] font-bold break-words">
      {{ props.title }}
    </h3>
    <p class="font-bai-jamjuree mt-[16px] text-sm font-medium">
      {{ props.description }}
    </p>
  </article>
</template>
