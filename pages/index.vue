<script lang="ts" setup>
import { Navigation, Pagination } from "swiper/modules";
definePageMeta({
  layout: "home",
});

const { $classes } = useNuxtApp();
const { width } = useWindowSize();
const isMobile = computed(() => width.value < 500);

const projects = new Array(10).fill(0).map((_, i) => ({
  id: i,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  thumbnail: "/header_bg.webp",
  location: "Bangkok",
  tag: "Project",
}));
</script>

<template>
  <div class="flex flex-col items-center min-h-[2500px]">
    <div
      data-aos="fade-up"
      class="flex flex-col justify-center items-center relative"
    >
      <picture>
        <source media="(min-width: 768px)" srcset="/3c_water_mark.svg" />
        <img src="/3c_water_mark_mobile.svg" alt="3c_water_mark" />
      </picture>
      <h1>
        <span>KMUTT</span> network<br />
        knowledge <span>sharing</span><br />
        <span>platform</span>
      </h1>
      <UButton
        class="block lg:hidden mt-10 z-10"
        label="Search"
        variant="outline"
        color="white"
      />
    </div>
    <div id="sneak-peak"></div>
    <section
      id="highlight-projects"
      class="relative overflow-x-hidden w-screen mt-6 mobile:mt-[120px]"
    >
      <Swiper
        :modules="[Navigation, Pagination]"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :slides-per-view="1"
        :space-between="16"
        :breakpoints="{
          500: { slidesPerView: 'auto' },
        }"
        :pagination="{ clickable: true }"
      >
        <SwiperSlide class="!hidden mobile:!block mobile:!w-fit">
          <ClientOnly>
            <Teleport to="#sneak-peak" :is="'div'" :disabled="!isMobile">
              <div
                :class="
                  $classes(
                    'mt-[88px] mobile:mt-0',
                    'min-w-[100vw] mobile:min-w-[399px]',
                    'w-[calc(calc(calc(100vw-theme(screens.container)+4rem)/2)+399px)]',
                    'px-4 mobile:pr-0 mobile:pl-[calc(calc(100vw-theme(screens.container)+4rem)/2)]'
                  )
                "
              >
                <h2
                  class="text-[32px] md:text-[48px] md:pr-6 font-bold leading-10 md:leading-[56px] text-white"
                >
                  SNEAK PEAK OUR PROJECTS
                </h2>
                <p
                  class="text-sm md:text-base leading-5 text-white font-semibold"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do
                  eiusmod tempor incididunt ut labore et.
                </p>
                <UButton class="mt-6" label="Browse more" />
              </div>
            </Teleport>
          </ClientOnly>
        </SwiperSlide>
        <SwiperSlide
          v-for="project in projects"
          :key="project.id"
          class="mobile:!w-fit"
        >
          <CardProject v-bind="project" classes="mx-auto" />
        </SwiperSlide>
        <SwiperSlide class="mobile:!w-fit self-center">
          <NuxtLink
            to="/projects/"
            class="flex items-center gap-x-2 pl-6 pr-[calc(calc(100vw-theme(screens.container)+4rem)/2)]"
          >
            <span class="font-semibold text-xl text-white">View more</span>
            <div
              class="round-icon-btn -invert hover:!bg-white hover:!text-chrysler-blue"
            >
              <UIcon name="material-symbols:arrow-forward" />
            </div>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
      <div class="!hidden mobile:!block">
        <div
          :class="
            $classes(
              'swiper-button-prev',
              'round-icon-btn -invert -big shadow after:!content-none',
              '!left-[max(32px,calc(calc(calc(100vw-theme(screens.container)+4rem)/2)-33px))]'
            )
          "
        >
          <UIcon name="material-symbols:arrow-back" />
        </div>
        <div
          :class="
            $classes(
              'swiper-button-next',
              'round-icon-btn -invert -big shadow after:!content-none',
              '!right-[max(32px,calc(calc(calc(100vw-theme(screens.container)+4rem)/2)-33px))]'
            )
          "
        >
          <UIcon name="material-symbols:arrow-forward" />
        </div>
      </div>
    </section>
    <section>
      <h2>
        we pick the networks we <span>support</span> meticulously, jump in early
        and know them inside-out
      </h2>
    </section>
  </div>
</template>

<style lang="postcss" scoped>
h1 {
  @apply mt-[136px] md:mt-[200px] text-center text-4xl md:text-[75px] font-medium leading-[47px] md:leading-[100px] text-white;
  > span {
    @apply text-[45px] md:text-[96px] font-bold;
  }
}
picture {
  @apply absolute inset-0 m-auto mt-[50px] md:mt-0;
  > * {
    @apply mx-auto;
  }
}
#highlight-projects {
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    @apply !top-[40%];
  }
  :deep(.swiper-wrapper) {
    @apply pb-4;
  }
  :deep(.swiper-button-disabled) {
    @apply !hidden;
  }
  :deep(.swiper) {
    @apply pb-2;
  }
  :deep(.swiper-pagination) {
    @apply bottom-0 hidden justify-center;
  }
}
@media screen and (max-width: 1264px) {
  #highlight-projects :deep(.swiper) {
    @apply px-8;
  }
}
@media screen and (max-width: 1024px) {
  #highlight-projects :deep(.swiper) {
    @apply px-6;
  }
}
@media screen and (max-width: 768px) {
  #highlight-projects :deep(.swiper) {
    @apply px-4;
  }
}
@media screen and (max-width: 500px) {
  #highlight-projects {
    :deep(.swiper article) {
      @apply !w-full;
    }
    :deep(.swiper-pagination) {
      @apply flex;
    }
  }
}
</style>
