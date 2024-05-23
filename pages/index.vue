<script lang="ts" setup>
import type { Swiper } from "swiper";
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
  thumbnail: "/kmutt-smart-house.webp",
  location: "Bangkok",
  tag: "Project",
}));

const networks = [
  {
    iconName: "streamline:eye-optic",
    title: "Researcher hub & Project showcase",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo",
  },
  {
    iconName: "clarity:bullseye-line",
    title: "The learning hub & Collaboration center",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo",
  },
  {
    iconName: "uil:comment-message",
    title: "Communicating story to connect & inspire",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo",
  },
  {
    iconName: "clarity:bullseye-line",
    title: "Storage your inner spark",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo",
  },
];

const onSlideChange = (swiper: Swiper) => {
  if (swiper.activeIndex === projects.length) {
    document
      .querySelectorAll("#highlight-projects .swiper-pagination-bullet")
      ?.[swiper.activeIndex - 1]?.classList.add(
        "swiper-pagination-bullet-active"
      );
  }
};
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      data-aos="fade-up"
      class="flex flex-col justify-center items-center relative h-fit md:h-[650px] mt-16 md:mt-0"
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
      class="relative overflow-x-hidden w-screen mt-6 mobile:mt-[140px]"
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
        @slide-change-transition-end="onSlideChange"
      >
        <SwiperSlide class="!hidden mobile:!block mobile:!w-fit">
          <ClientOnly>
            <Teleport to="#sneak-peak" :is="'div'" :disabled="!isMobile">
              <div
                data-aos="fade-up"
                :class="
                  $classes(
                    'mt-[88px] mobile:mt-0',
                    'min-w-[100vw] mobile:min-w-[399px]',
                    'w-[calc(calc(calc(100vw-theme(screens.container)+4rem)/2)+399px)]',
                    'px-4 mobile:pr-0 mobile:pl-[calc(calc(100vw-theme(screens.container)+4rem)/2)]'
                  )
                "
              >
                <h2 class="heading-label md:pr-6 text-white">
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
          <div class="flex items-center h-[471px] md:h-[497px]">
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
          </div>
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
    <section
      :class="
        $classes(
          'heading-label',
          'mt-[86px] md:mt-[140px] lg:mt-[160px]',
          'pb-[86px] md:pb-[140px] lg:pb-[160px]',
          'text-center w-full text-dark-theme',
          'bg-[url(/highlight_bg_mobile.webp)] sm:bg-[url(/highlight_bg_tablet.webp)] lg:bg-[url(/highlight_bg.webp)]',
          'bg-[length:100vw_500px] sm:bg-contain bg-[bottom_center] sm:bg-[55%_center] bg-no-repeat'
        )
      "
    >
      <h2 data-aos="fade-up" class="px-4">
        we pick the networks we
        <span
          class="inline-block py-1 px-4 text-white bg-[radial-gradient(95.67%_228.37%_at_0.26%_99.57%,#FAB32E_0%,#F96234_49%,#E22E73_78%,#5449FF_100%)]"
          >support</span
        ><br />
        meticulously, jump in early and know them inside-out
      </h2>
      <UContainer data-aos="fade-up" class="mt-16 overflow-x-auto no-scrollbar">
        <ul
          class="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-x-6 w-[1240px] md:w-auto"
        >
          <li
            v-for="(network, i) in networks"
            :key="network.title"
            :class="[{ 'p-0 md:pt-8': i % 2 === 0 }]"
          >
            <CardNetwork v-bind="network" />
          </li>
        </ul>
      </UContainer>
    </section>
    <section>
      <UContainer class="flex gap-x-4 gap-y-6 flex-col md:flex-row">
        <article
          data-aos="fade-up"
          :class="
            $classes(
              'relative flex-1 rounded-[32px] bg-white',
              'bg-[url(/card_bg.webp)]',
              'bg-no-repeat bg-cover bg-[bottom_center]',
              `after:content-[''] after:block after:absolute`,
              'after:inset-0 after:w-full after:h-full after:opacity-[0.15]',
              'after:bg-[url(/noise.webp)] after:bg-repeat after:bg-cover after:rounded-[32px]'
            )
          "
        >
          <div
            :class="
              $classes(
                'flex flex-col pt-12 px-6 md:px-12 pb-[20%]',
                'w-full h-full mx-auto relative z-[1]'
              )
            "
          >
            <h2 :class="$classes('heading-label', 'text-white')">
              DISCOVER US
            </h2>
            <p
              :class="
                $classes(
                  'mt-6 text-base md:text-lg font-medium',
                  'font-bold text-white'
                )
              "
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut.
            </p>
            <UButton class="w-fit mt-12" label="Know us more" />
          </div>
        </article>
        <article
          data-aos="fade-up"
          class="relative flex-1 rounded-[32px] bg-white"
        >
          <div
            :class="
              $classes(
                'z-[2] absolute inset-0 w-full h-full rounded-[32px]',
                'bg-[linear-gradient(0deg,rgba(255,255,255,1)_55%,rgba(255,255,255,0)_80%)]'
              )
            "
          ></div>
          <div
            :class="
              $classes(
                'relative',
                `after:content-[''] after:block after:absolute after:z-[1]`,
                'after:inset-0 after:w-full after:h-full after:opacity-20',
                'after:bg-[url(/noise.webp)] after:bg-repeat after:bg-cover after:rounded-t-[32px]'
              )
            "
          >
            <img
              :class="$classes('w-full object-contain rounded-t-[32px]')"
              src="/kmutt-smart-house.webp"
              alt="bg"
            />
          </div>
          <div class="flex relative z-[2] pt-4 pb-[20%]">
            <p
              :class="
                $classes(
                  'self-end h-[60%]',
                  'flex justify-center items-center',
                  'text-base md:text-lg font-medium w-[90%] md:w-[80%] mx-auto',
                  'text-gray-10'
                )
              "
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
            </p>
          </div>
        </article>
      </UContainer>
    </section>
    <section
      :class="
        $classes(
          'pt-[120px] pb-20 md:pb-[120px] lg:pb-[210px]',
          'w-full',
          'bg-[url(/footer_bg_mobile.webp)] mobile:bg-[url(/footer_bg.webp)]',
          'bg-no-repeat bg-cover bg-[center_10%] mobile:bg-[bottom_center]'
        )
      "
    >
      <div
        data-aos="fade-up"
        class="px-4 max-w-[852px] w-full mx-auto flex flex-col items-center gap-y-8"
      >
        <h2 class="heading-label">Interest in registering?</h2>
        <p class="text-sm md:text-base font-semibold text-gray-10">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <UButton label="Register now" />
      </div>
    </section>
  </div>
</template>

<style lang="postcss" scoped>
h1 {
  @apply text-center text-4xl md:text-[75px] font-medium leading-[47px] md:leading-[100px] text-white;
  > span {
    @apply text-[45px] md:text-[96px] font-bold;
  }
}
picture {
  @apply absolute inset-0 m-auto;
  > * {
    @apply mx-auto h-full object-contain;
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
  :deep(.swiper-pagination-bullet:last-of-type) {
    @apply hidden;
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
