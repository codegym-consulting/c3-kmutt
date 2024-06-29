<script lang="ts" setup>
const props = defineProps<{
  data: PreviewNote
}>()

const emit = defineEmits<{
  (event: 'click', value: PreviewNote): void
}>()

const note = computed(() => props.data)
const _createdAt = computed(() =>
  formatFullDate(note.value.createdAt, 'DD MMM YYYY'),
)
</script>

<template>
  <article
    class="w-[180px] h-[140px] rounded-2xl shadow-[0_4px_10px_0_#0000000D] cursor-pointer"
    @click="emit('click', note)"
  >
    <figure class="bg-white w-full h-[88px] rounded-t-2xl">
      <img
        v-if="note.image"
        :src="note.image"
        class="object-cover rounded-t-2xl w-full h-full"
      />
    </figure>
    <div class="h-[52px] bg-gray-1 py-2 px-4">
      <h4 class="truncate text-sm leading-[18px] font-medium text-gray-10">
        {{ note.title }}
      </h4>
      <time
        :date="note.createdAt"
        class="flex items-center gap-x-1 text-sm leading-[18px] text-gray-6"
      >
        <NuxtIcon
          class="text-base [&_path]:stroke-gray-6"
          name="c3/calendar"
          filled
        />
        {{ _createdAt }}
      </time>
    </div>
  </article>
</template>
