<script lang="ts" setup>
const props = defineProps<{
  email: string
  name: string
  avatar: string
}>()
</script>

<template>
  <div class="flex items-center gap-x-4 bg-gray-1 rounded-2xl p-6">
    <img class="w-10 h-10 rounded-full" :src="props.avatar" alt="avatar" >
    <div class="flex flex-col">
      <span class="text-base leading-5 font-bold text-gray-10">{{
        props.name
      }}</span>
      <span class="text-base leading-5 text-gray-7">{{ props.email }}</span>
    </div>
  </div>
</template>
