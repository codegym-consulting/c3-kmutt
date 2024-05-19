<script lang="ts" setup>
import type { VNodeRef } from "vue";

const props = defineProps<{
  relativeElement?: VNodeRef;
}>();
const navigations = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About us" },
  { to: "/contact", label: "Contact us" },
];
</script>

<template>
  <CommonAffix
    :relative-element="props.relativeElement"
    target-name="#page-container"
    :active-class="
      [
        '[&>nav_.show-on-affix]:hidden [&>nav_.show-on-affix]:md:block [&>nav_.hide-on-affix]:hidden',
        '[&>nav]:bg-transparent [&>nav]:md:bg-[linear-gradient(110.72deg,rgba(255,255,255,0.36)_1.21%,rgba(196,196,196,0.06)_100%)]',
        'p-0 [&>nav]:md:py-4 [&>nav]:md:px-4 [&>nav]:lg:pr-6 [&>nav]:lg:pl-16 [&>nav]:rounded-lg',
      ].join(' ')
    "
  >
    <nav>
      <NuxtLink class="flex-shrink-0" to="/">
        <picture class="hide-on-affix">
          <source media="(min-width: 768px)" srcset="/logo_full.svg" />
          <img src="/logo.svg" alt="3c_logo" />
        </picture>
        <img class="show-on-affix" src="/logo.svg" alt="3c_logo" />
      </NuxtLink>
      <ul>
        <li v-for="{ to, label } in navigations" :key="label">
          <CommonLink :to="to" :label="label" />
        </li>
      </ul>
      <div>
        <UButton
          class="hidden lg:inline-flex"
          label="Search"
          variant="outline"
        />
        <UButton label="Login" />
      </div>
      <UButton
        class="inline-flex md:hidden ml-auto"
        icon="i-cil-hamburger-menu"
        variant="icon"
      />
    </nav>
  </CommonAffix>
</template>

<style lang="postcss" scoped>
.show-on-affix {
  @apply hidden;
}
nav {
  @apply mt-6 flex items-center gap-x-4;
}
ul {
  @apply items-center justify-end gap-x-12 flex-none hidden md:flex lg:flex-1 ml-auto lg:ml-0;
}
li {
  @apply flex-shrink-0;
}
div {
  @apply gap-x-2 items-center justify-end flex-none hidden md:flex lg:flex-1;
}
</style>
