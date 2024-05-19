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

const bottomSheet = ref(false);
</script>

<template>
  <div>
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
        <ul class="navigation-menu">
          <li v-for="{ to, label } in navigations" :key="label">
            <CommonLink :to="to" :label="label" />
          </li>
        </ul>
        <div class="action-group">
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
          @click="bottomSheet = true"
        />
      </nav>
    </CommonAffix>
    <CommonBottomSheet v-model="bottomSheet">
      <div class="bottom-sheet-menu">
        <img class="logo" src="/logo_full.svg" alt="3c_logo" />
        <ul class="mobile-navigation-menu">
          <li
            v-for="{ to, label } in navigations"
            :key="`bottom-sheet-${label}`"
          >
            <CommonLink :to="to" :label="label" />
          </li>
        </ul>
        <UButton label="Login" />
      </div>
    </CommonBottomSheet>
  </div>
</template>

<style lang="postcss" scoped>
.show-on-affix {
  @apply hidden;
}
.logo {
  @apply w-[229px] h-12;
}
nav {
  @apply mt-6 flex items-center gap-x-4;
}
.bottom-sheet-menu {
  @apply flex flex-col items-center justify-center gap-y-10 py-8 px-4;
}
.navigation-menu {
  @apply items-center justify-end gap-x-12 flex-none hidden md:flex lg:flex-1 ml-auto lg:ml-0;
}
.mobile-navigation-menu {
  @apply flex flex-col items-center justify-center gap-y-6;
}
li {
  @apply flex-shrink-0;
}
.action-group {
  @apply gap-x-2 items-center justify-end flex-none hidden md:flex lg:flex-1;
}
</style>