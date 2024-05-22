<script lang="ts" setup>
const props = defineProps<{
  iconName: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <article
    class="w-full h-fit py-8 px-6 rounded-[32px] flex flex-col bg-white text-left"
  >
    <div class="text-gray-10 w-16 h-16 flex items-center justify-center">
      <UIcon :name="props.iconName" />
    </div>
    <h3 class="mt-[22px] text-[22px] leading-[26px] font-bold break-words">
      {{ props.title }}
    </h3>
    <p class="mt-[16px] text-sm font-medium">{{ props.description }}</p>
  </article>
</template>
