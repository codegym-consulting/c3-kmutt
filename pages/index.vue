<script lang="ts" setup>
import type { Swiper } from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'

definePageMeta({
  layout: 'home'
})

const { $classes } = useNuxtApp()
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 500)

const projects = new Array(10).fill(0).map((_, i) => ({
  id: i,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  thumbnail: '/landing/kmutt-smart-house.webp',
  location: 'Bangkok',
  tag: 'Project',
}))

const networks = [
  {
    iconName: 'c3/eye',
    title: 'Researcher hub & Project showcase',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo',
  },
  {
    iconName: 'c3/bullseye',
    title: 'The learning hub & Collaboration center',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo',
  },
  {
    iconName: 'c3/comment',
    title: 'Communicating story to connect & inspire',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo',
  },
  {
    iconName: 'c3/bullseye',
    title: 'Storage your inner spark',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labo',
  },
]

const onSlideChange = (swiper: Swiper) => {
  if (swiper.activeIndex === projects.length) {
    document
      .querySelectorAll('#highlight-projects .swiper-pagination-bullet')
      ?.[swiper.activeIndex - 1]?.classList.add(
        'swiper-pagination-bullet-active',
      )
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      data-aos="fade-up"
      class="flex flex-col justify-center items-center relative h-fit md:h-[650px] mt-16 md:mt-0"
    >
      <picture>
        <source
          media="(min-width: 768px)"
          srcset="/landing/3c_water_mark.svg"
        >
        <img src="/landing/3c_water_mark_mobile.svg" alt="3c_water_mark" >
      </picture>
      <div class="flex flex-col items-center">
        <h1>
          We are a collaborative<br >
          platform for sharing<br >
          knowledge in innovation
        </h1>
        <p
          class="text-sm md:text-lg font-medium max-w-[730px] px-4 text-center text-white"
        >
          built environments, and transformative technologies that shape the
          future of society and the creative economy. Discover, apply, and
          collaborate on groundbreaking projects with industry and community
          partners to drive future economic growth.
        </p>
      </div>
      <UButton
        class="block lg:hidden mt-10 z-10"
        label="Search"
        variant="outline"
        color="white"
      />
    </div>
    <div id="sneak-peak" />
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
            <Teleport :is="'div'" to="#sneak-peak" :disabled="!isMobile">
              <div
                data-aos="fade-up"
                :class="
                  $classes(
                    'mt-[88px] mobile:mt-0',
                    'min-w-[100vw] mobile:min-w-[399px]',
                    'w-[calc(calc(calc(100vw-theme(screens.container)+4rem)/2)+399px)]',
                    'px-4 mobile:pr-0 mobile:pl-[calc(calc(100vw-theme(screens.container)+4rem)/2)]',
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
                <UButton class="mt-6" label="Browse more" to="/search" />
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
              '!left-[max(32px,calc(calc(calc(100vw-theme(screens.container)+4rem)/2)-33px))]',
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
              '!right-[max(32px,calc(calc(calc(100vw-theme(screens.container)+4rem)/2)-33px))]',
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
          'mt-[86px] md:mt-[140px] lg:mt-[160px]',
          'pb-[86px] md:pb-[140px] lg:pb-[160px]',
          'text-center w-full text-dark-theme',
          'bg-[url(~/public/landing/highlight_bg_mobile.webp)] sm:bg-[url(~/public/landing/highlight_bg_tablet.webp)] lg:bg-[url(~/public/landing/highlight_bg.webp)]',
          'bg-[length:100vw_500px] sm:bg-contain bg-[bottom_center] sm:bg-[55%_center] bg-no-repeat',
        )
      "
    >
      <h2
        data-aos="fade-up"
        class="px-4 text-[22px] md:text-2xl lg:text-[32px] leading-[26px] md:leading-7 lg:leading-10 font-bold"
      >
        We’re your launchpad for commercially
        <span
          class="text-[32px] font-bold leading-10 inline-block my-4 md:my-2 lg:m-0 py-1 px-4 text-white bg-[radial-gradient(95.67%_228.37%_at_0.26%_99.57%,#FAB32E_0%,#F96234_49%,#E22E73_78%,#5449FF_100%)]"
          >Viable innovations</span
        ><br >
        blending design, science, tech, and business tailor solutions for
        diverse user needs and lifestyle
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
              'bg-[url(~/public/landing/card_bg.webp)]',
              'bg-no-repeat bg-cover bg-[bottom_center]',
              `after:content-[''] after:block after:absolute`,
              'after:inset-0 after:w-full after:h-full after:opacity-[0.15]',
              'after:bg-[url(~/public/landing/noise.webp)] after:bg-repeat after:bg-cover after:rounded-[32px]',
            )
          "
        >
          <div
            :class="
              $classes(
                'flex flex-col pt-12 px-6 md:px-12 pb-[20%]',
                'w-full h-full mx-auto relative z-[1]',
              )
            "
          >
            <h2 :class="$classes('heading-label', 'text-white')">
              DISCOVER US
            </h2>
            <p
              :class="
                $classes('mt-6 text-sm md:text-lg', 'font-normal text-white')
              "
            >
              Creative Collaborative Community Platform is a digital platform
              for creative &amp; innovation knowledge sharing, designed to collect
              knowledge and exchange experiences in creative innovation, built
              environments, social and cultural innovation, and technologies
              that enhance the future of society and the creative economy.
              Providing KMUTT University with a modern knowledge base in
              innovation and technology, we empower individuals to explore,
              apply knowledge, and collaborate with private sectors and
              community partners on multidisciplinary projects that drive
              economic growth.
            </p>
            <UButton class="w-fit mt-12" label="Know us more" to="/about" />
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
                'bg-[linear-gradient(0deg,rgba(255,255,255,1)_55%,rgba(255,255,255,0)_80%)]',
              )
            "
          />
          <div
            :class="
              $classes(
                'relative',
                `after:content-[''] after:block after:absolute after:z-[1]`,
                'after:inset-0 after:w-full after:h-full after:opacity-20',
                'after:bg-[url(~/public/landing/noise.webp)] after:bg-repeat after:bg-cover after:rounded-t-[32px]',
              )
            "
          >
            <img
              :class="$classes('w-full object-contain rounded-t-[32px]')"
              src="/landing/kmutt-smart-house.webp"
              alt="bg"
            >
          </div>
          <div class="flex relative z-[2] pt-4 pb-[20%]">
            <p
              :class="
                $classes(
                  'self-end h-[60%]',
                  'flex justify-center items-center',
                  'text-base md:text-lg font-normal w-[90%] md:w-[80%] mx-auto',
                  'text-gray-10',
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
          'bg-[url(~/public/footer/footer_bg_mobile.webp)] mobile:bg-[url(~/public/footer/footer_bg.webp)]',
          'bg-no-repeat bg-cover bg-[center_10%] mobile:bg-[bottom_center]',
        )
      "
    >
      <div
        data-aos="fade-up"
        class="px-4 max-w-[852px] w-full mx-auto flex flex-col items-center gap-y-8"
      >
        <h2 class="heading-label text-center whitespace-nowrap">
          Interest in registering?
        </h2>
        <p class="text-sm md:text-xl text-center font-normal text-gray-10">
          Join our community of innovators and gain access to our collaborative
          projects and expert networks. Start your journey with us today and
          make a lasting impact.
        </p>
        <UButton label="Register now" to="/register" />
      </div>
    </section>
  </div>
</template>

<style lang="pcss" scoped>
h1 {
  @apply text-center text-[32px] md:text-[72px] font-bold leading-[40px] md:leading-[76px] text-white;

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
