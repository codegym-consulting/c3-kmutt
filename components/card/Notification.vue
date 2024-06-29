<script lang="ts" setup>
const props = defineProps<{ data: NotificationData }>()

const notification = computed(() => props.data)
</script>

<template>
  <article
    class="flex flex-col md:flex-row items-start md:items-center gap-2 py-2 pl-2 pr-4 rounded-lg bg-white z-[1]"
  >
    <img
      :src="notification.imageUrl"
      alt="image"
      class="w-10 h-10 rounded-lg"
    />
    <div>
      <h4 class="text-base text-gray-10 leading-5 font-medium break-words">
        {{ notification.title }}
      </h4>
      <p class="break-words text-sm text-gray-7 leading-[18px]">
        “{{ notification.description }}”
      </p>
    </div>
    <time
      class="mt-2 mb-2 md:mb-0 md:mt-0 md:ml-auto md:self-end font-bai-jamjuree text-xs text-gray-6 font-medium flex-shrink-0"
      :date="notification.createdAt"
      >{{ timeAgo(notification.createdAt) }}</time
    >
  </article>
</template>
