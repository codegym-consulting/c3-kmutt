<script lang="ts" setup>
import type { Swiper } from 'swiper'
import { Navigation } from 'swiper/modules'

const props = defineProps<{
  projects: Project[]
}>()
</script>

<template>
  <UCard
    as="article"
    class="p-4 overflow-hidden"
    :ui="{
      strategy: 'override',
      base: 'w-full h-[425px]',
      divide: 'divide-y-0',
      rounded: 'rounded-2xl',
      header: { padding: 'p-0' },
      body: { padding: 'p-0' },
      footer: { padding: 'p-0' },
    }"
  >
    <div class="flex flex-col h-full">
      <div class="mb-3 flex items-center justify-between gap-x-2">
        <div class="flex flex-col">
          <h3 class="text-base leading-5 font-bold text-gray-10">
            Your recent project
          </h3>
          <p class="text-sm leading-[18px] text-gray-7">
            View your recent project updates.
          </p>
        </div>
        <NuxtIcon
          name="c3/keynote"
          filled
          class="mt-auto round-icon-btn -invert -gray [&_path]:hover:stroke-white"
          tabindex="0"
          @click="() => {}"
        />
      </div>
      <div class="flex w-full overflow-x-auto relative">
        <Swiper
          class="w-full"
          :modules="[Navigation]"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          slides-per-view="auto"
          :space-between="8"
        >
          <SwiperSlide
            v-for="project in props.projects"
            :key="project.id"
            class="mobile:!w-fit"
          >
            <CardProject v-bind="project" classes="mx-auto" size="small" />
          </SwiperSlide>
        </Swiper>
        <div class="!hidden md:!block">
          <div
            :class="
              $classes(
                'swiper-button-prev !w-10 !h-10',
                'round-icon-btn -invert -small shadow after:!content-none',
                '!left-0',
              )
            "
          >
            <UIcon name="material-symbols:arrow-back" />
          </div>
          <div
            :class="
              $classes(
                'swiper-button-next !w-10 !h-10',
                'round-icon-btn -invert -small shadow after:!content-none',
                '!right-0',
              )
            "
          >
            <UIcon name="material-symbols:arrow-forward" />
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
