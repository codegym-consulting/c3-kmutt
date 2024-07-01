<script lang="ts" setup>
const { $dayjs } = useNuxtApp()
const navigations = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact us' },
  { to: '/search', label: 'Search' },
  { to: '/workspace', label: 'Workspace' },
]
</script>

<template>
  <footer>
    <UContainer class="footer">
      <small>{{ $dayjs().format("YYYY") }} All Right reserved</small>
      <NuxtLink class="flex-shrink-0" to="/">
        <NuxtImg preload src="/footer/footer_logo.svg" alt="3c_logo" width="124" height="32" />
      </NuxtLink>
      <ul>
        <li v-for="{ to, label } in navigations" :key="label">
          <NormalLink :to="to" :label="label" variant="secondary" />
        </li>
      </ul>
    </UContainer>
  </footer>
</template>

<style lang="pcss" scoped>
.footer {
  @apply flex justify-between items-center gap-x-4 h-auto md:h-[128px] lg:h-[82px] bg-white relative;
}
small {
  @apply text-sm font-medium text-gray-6;
}
img {
  @apply absolute inset-0 m-auto;
}
ul {
  @apply flex items-center gap-x-6 lg:gap-x-8 text-sm font-semibold;
}
@media screen and (max-width: 920px) {
  .footer {
    @apply flex-col gap-y-10 h-auto py-8;
  }
  small {
    @apply order-1;
  }
  img {
    @apply relative inset-[unset] m-0;
  }
  ul {
    @apply flex-col gap-y-4;
  }
}
</style>
