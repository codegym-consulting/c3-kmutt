<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    id?: string | number
    imageUrl?: string
    category?: string
    title?: string
    location?: string
    classes?: string
    size?: 'default' | 'small'
  }>(),
  {
    id: '',
    imageUrl: '',
    category: '',
    title: '',
    location: '',
    classes: '',
    size: 'default',
  },
)
</script>

<template>
  <UCard
    as="article"
    :class="[
      { 'pt-4 px-4 pb-6 md:pt-6 md:px-6 md:pb-8': props.size === 'default' },
      { 'ring-0 shadow-none': props.size === 'small' },
    ]"
    :ui="{
      strategy: 'override',
      base:
        `${
          props.size === 'small'
            ? 'w-[260px] h-[324px]'
            : 'w-[343px] md:w-[394px] h-[471px] md:h-[497px]'
        } ` + classes,
      divide: 'divide-y-0',
      rounded: 'rounded-2xl',
      header: { padding: 'p-0' },
      body: {
        padding: `p-0 ${
          props.size === 'default' ? 'mt-6 md:mt-[26px]' : 'mt-4'
        }`,
      },
      footer: {
        padding: `p-0 ${
          props.size === 'default' ? 'mt-6 md:mt-[26px]' : 'mt-5'
        }`,
      },
    }"
  >
    <template #header>
      <figure>
        <NuxtImg
          :class="[
            'w-full object-cover rounded-lg',
            { 'h-[229px]': props.size === 'default' },
            { 'h-[172px]': props.size === 'small' },
          ]"
          :src="props.imageUrl"
          :alt="props.title"
        />
      </figure>
    </template>

    <div class="flex flex-col gap-y-4">
      <em
        v-if="props.size !== 'small'"
        class="font-bai-jamjuree text-xs text-gray-10 font-medium w-fit not-italic px-2 py-1 border border-gray-10 rounded-[100px]"
        >{{ props.category }}</em
      >
      <NuxtLink :to="'/project/' + props.id + '/'">
        <p
          :class="[
            'transition-all h-[66px] md:h-[72px] text-gray-10 hover:text-chrysler-blue',
            {
              'line-clamp-3 text-lg md:text-xl font-medium leading-[22px] md:leading-6':
                props.size === 'default',
            },
            { 'text-base leading-5 font-medium': props.size === 'small' },
          ]"
        >
          {{ props.title }}
        </p>
      </NuxtLink>
    </div>

    <template #footer>
      <div class="flex gap-x-4 justify-between items-center">
        <address class="not-italic text-xs text-gray-10 font-medium">
          <UIcon name="i-cil-location-pin" class="text-gray-10" />
          {{ props.location }}
        </address>
        <NuxtLink
          :to="'/project/' + props.id + '/'"
          :class="['round-icon-btn', { '!w-9 !h-9': props.size === 'small' }]"
        >
          <UIcon name="material-symbols:arrow-forward" />
        </NuxtLink>
      </div>
    </template>
  </UCard>
</template>
