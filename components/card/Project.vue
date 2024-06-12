<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    id?: string | number
    imageUrl?: string
    category?: string
    title?: string
    location?: string
    classes?: string
  }>(),
  {
    id: '',
    imageUrl: '',
    category: '',
    title: '',
    location: '',
    classes: '',
  },
)
</script>

<template>
  <UCard
    as="article"
    class="pt-4 px-4 pb-6 md:pt-6 md:px-6 md:pb-8"
    :ui="{
      strategy: 'override',
      base: 'w-[343px] md:w-[394px] h-[471px] md:h-[497px] ' + classes,
      divide: 'divide-y-0',
      rounded: 'rounded-2xl',
      header: { padding: 'p-0' },
      body: { padding: 'p-0 mt-6 md:mt-[26px]' },
      footer: { padding: 'p-0 mt-6 md:mt-[26px]' },
    }"
  >
    <template #header>
      <figure>
        <img
          class="w-full h-[229px] object-cover rounded-lg"
          :src="props.imageUrl"
          alt="Project Image"
        >
      </figure>
    </template>

    <div class="flex flex-col gap-y-4">
      <em
        class="font-bai-jamjuree text-xs text-gray-10 font-medium w-fit not-italic px-2 py-1 border border-gray-10 rounded-[100px]"
      >{{ props.category }}</em>
      <NuxtLink :to="'/project/' + props.id + '/'">
        <p
          class="transition-all line-clamp-3 text-lg md:text-xl font-medium text-gray-10 leading-[22px] md:leading-6 h-[66px] md:h-[72px] hover:text-chrysler-blue"
        >
          {{ props.title }}
        </p>
      </NuxtLink>
    </div>

    <template #footer>
      <div class="flex gap-x-4 justify-between items-center">
        <address class="not-italic text-xs text-gray-10 font-medium">
          <UIcon
            name="i-cil-location-pin"
            class="text-gray-10"
          />
          {{ props.location }}
        </address>
        <NuxtLink
          :to="'/project/' + props.id + '/'"
          class="round-icon-btn"
        ><UIcon name="material-symbols:arrow-forward" /></NuxtLink>
      </div>
    </template>
  </UCard>
</template>
