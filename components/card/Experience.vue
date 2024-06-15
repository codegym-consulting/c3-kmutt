<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    name?: string
    description?: string
  }>(),
  {
    name: '',
    description: '',
  },
)

const emit = defineEmits<{
  (event: 'edit'): void
}>()
</script>

<template>
  <article class="flex gap-x-2">
    <NuxtIcon
      class="cursor-pointer"
      name="c3/edit"
      filled
      @click="emit('edit')"
    />
    <div class="flex flex-col ga-y-1">
      <h3 class="text-base leading-5 font-medium text-gray-10 break-words">
        <slot name="title">{{ props.name }}</slot>
      </h3>
      <p class="text-sm leading-[18px] text-gray-6 break-words">
        <slot name="description">{{ props.description }}</slot>
      </p>
    </div>
  </article>
</template>
