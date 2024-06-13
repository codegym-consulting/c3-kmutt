<script lang="ts" setup>
const props = defineProps<{
  file: File
}>()

const emit = defineEmits<{
  (event: 'remove', file: File): void
}>()

const fileSizeMB = computed(() => {
  const sizeInMB = props.file.size / (1024 * 1024)
  return sizeInMB.toFixed(2)
})
</script>

<template>
  <div>
    <div class="flex items-center gap-x-2">
      <UIcon
        class="text-chrysler-blue text-[22px] flex-shrink-0"
        name="material-symbols:check-circle-outline-rounded"
      />
      <div
        class="flex gap-x-2 w-[90%] pt-[3px] text-sm leading-[18px] md:text-base md:leading-5 text-gray-10"
      >
        <span class="truncate">{{ props.file.name }}</span>
        {{ fileSizeMB }}MB
      </div>
    </div>
    <div class="mt-2 flex items-center gap-x-6">
      <div class="flex-1 h-1 rounded-[20px] bg-chrysler-blue"/>
      <UIcon
        class="cursor-pointer"
        name="humbleicons:times"
        @click="emit('remove', props.file)"
      />
    </div>
  </div>
</template>
