<script lang="ts" setup>
const { $classes } = useNuxtApp()
const props = withDefaults(
  defineProps<{
    icon?: string
    c3Icon?: string
    title: string
    subtitle: string
    active?: boolean
    class?: string
  }>(),
  { icon: '', c3Icon: '', active: false, class: '' },
)

const hover = ref(false)

const emit = defineEmits<{
  (event: 'click'): void
}>()
</script>

<template>
  <button
    :class="
      $classes(
        'flex items-center rounded-3xl',
        'p-6 w-full h-[220px] md:h-[200px]',
        props.active
          ? 'bg-chrysler-blue'
          : 'bg-gray-1 hover:bg-mid-chrysler-blue',
        props.active
          ? '[&_.icon]:!text-white'
          : '[&_.icon]:hover:!text-dark-chrysler-blue [&_.icon_path]:hover:!stroke-chrysler-blue',
        props.active
          ? '[&_.title]:!text-white [&_.subtitle]:!text-white'
          : '[&_.title]:hover:!text-dark-chrysler-blue [&_.subtitle]:hover:!text-dark-chrysler-blue',
        props.class,
      )
    "
    type="button"
    @click="emit('click')"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <div class="flex flex-col md:flex-row gap-6 w-full">
      <div class="flex justify-center items-center w-[88px] h-[88px]">
        <slot name="icon" :hover="hover">
          <UIcon
            v-if="props.icon"
            class="icon text-[55px]"
            :name="props.icon"
          />
          <NuxtIcon
            v-if="props.c3Icon"
            :name="props.c3Icon"
            class="icon text-[55px]"
            filled
          />
        </slot>
      </div>
      <div class="flex flex-col gap-y-4 items-start">
        <h3
          class="title text-[22px] leading-[26px] md:text-2xl md:leading-7 font-bold text-gray-10"
        >
          {{ props.title }}
        </h3>
        <p
          class="subtitle text-[14px] text-left leading-[18px] md:text-base md:leading-5 text-gray-6"
        >
          {{ props.subtitle }}
        </p>
      </div>
    </div>
  </button>
</template>
