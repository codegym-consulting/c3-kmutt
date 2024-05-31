<script setup lang="ts">
const { $classes } = useNuxtApp()
const networks = [
  {
    iconName: 'c3/comment',
    title: 'For researcher and Innovators',
    description:
      'Access our database to create portfolios of research works or group projects that feature innovative products and technology solutions with commercial potential, fostering dissemination and collaboration. Additionally, you can utilize our platform to find partnerships or expert teams to enhance the development of your projects in all comprehensive aspects.',
  },
  {
    iconName: 'c3/bullseye',
    title: 'For private, public, and community organizations',
    description:
      'Connect with research teams or solutions for innovation development through our platform. Use our database to search for expert researchers skilled in science, technology, engineering, and creativity, or explore projects that contribute to the advancement of both industries and communities.',
  },
]
</script>

<template>
  <div
    data-aos="fade-up"
    :class="
      $classes(
        'flex flex-col',
        'bg-[url(~/public/about/bg_mobile.webp)] md:bg-[url(~/public/about/bg_tablet.webp)] lg:bg-[url(~/public/about/bg.webp)]',
        'bg-no-repeat bg-[size:100%_80%] bg-[center_bottom]',
      )
    "
  >
    <UContainer id="heading-section">
      <h1
        :class="
          $classes(
            'font-bold text-gray-10 text-[32px] leading-10 md:text-[72px] md:leading-[76px]',
            'mr-auto lg:m-0',
          )
        "
      >
        Creative<br />
        Collaborative<br />
        Community<br />
        Platform
      </h1>
      <div class="flex flex-col gap-y-12 ml-auto lg:m-0">
        <p>
          is a digital platform for creative & innovation knowledge sharing,
          designed to collect knowledge and exchange experiences in creative
          innovation, sustainable environments, social and cultural innovation,
          and technologies that enhance the future of society and the creative
          economy.
        </p>
        <p>
          Providing KMUTT University with a modern knowledge base in innovation
          and technology, we empower individuals to explore, apply knowledge,
          and collaborate with private sectors and community partners on
          multidisciplinary projects that drive economic growth.
        </p>
      </div>
    </UContainer>
    <UContainer
      :class="
        $classes(
          'mb-14 md:mb-[112px] lg:mb-[124px] mt-[30px] md:mt-[94px] lg:mt-[112px]',
          'w-full flex justify-between gap-x-[82px] flex-col lg:flex-row',
        )
      "
    >
      <ul
        :class="
          $classes(
            'flex gap-y-4 gap-x-6 w-full lg:w-full',
            'flex-col md:flex-row',
          )
        "
      >
        <li
          v-for="(network, i) in networks"
          :key="network.title"
          :class="['flex-1', { 'p-0 md:pt-32': i % 2 !== 0 }]"
        >
          <CardNetwork v-bind="network" />
        </li>
      </ul>
      <article class="shrink-0 mt-10 md:mt-0 w-full md:w-[400px]">
        <h2 class="heading-label text-white mb-4">Contribution</h2>
        <p
          class="text-sm md:text-base leading-[18px] md:leading-5 text-white font-medium"
        >
          Our platform serves as a valuable resource and channel for various
          learning and teaching fields, especially those involving creative
          innovation. By collecting knowledge from activities and collaborative
          research, this platform effectively expands networks and enhances
          innovation projects.
        </p>
        <UButton class="mt-6" label="Explore now" to="/search" />
      </article>
    </UContainer>
  </div>
</template>

<style lang="postcss" scoped>
#heading-section {
  @apply flex items-end flex-col lg:flex-row gap-x-16 mt-[34px] md:mt-[64px] lg:mt-[104px];

  > * {
    @apply w-[80%] md:w-[70%] lg:w-fit;
  }

  p {
    @apply text-gray-10 font-medium text-sm md:text-base;
  }
}
</style>
