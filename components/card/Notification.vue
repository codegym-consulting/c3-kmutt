<script lang="ts" setup>
const props = defineProps<{ data: NotificationData }>()

const notification = computed(() => props.data)
const timeAgoLabel = computed(() => timeAgo(notification.value.createdAt))
</script>

<template>
  <article
    class="relative flex flex-col md:flex-row items-start md:items-center gap-2 py-2 pl-2 pr-4 rounded-lg bg-white z-[1]"
  >
    <a
      :href="notification.externalUrl"
      target="_blank"
      class="absolute w-full h-full top-0 left-0 cursor-pointer"
    />
    <img
      :src="notification.thumbnailUrl || '/common/thumbnail.svg'"
      alt="image"
      class="w-10 h-10 rounded-lg"
    />
    <div>
      <h4 class="text-base text-gray-10 leading-5 font-medium break-words">
        {{ notification.title }}
      </h4>
      <p class="break-words text-sm text-gray-7 leading-[18px]">
        “{{ notification.content }}”
      </p>
    </div>
    <time
      class="mt-2 mb-2 md:mb-0 md:mt-0 md:ml-auto md:self-end font-bai-jamjuree text-xs text-gray-6 font-medium flex-shrink-0"
      :date="notification.createdAt"
      >{{ timeAgoLabel }}</time
    >
  </article>
</template>
