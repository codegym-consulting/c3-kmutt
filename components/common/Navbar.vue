<script lang="ts" setup>
import type { VNodeRef } from 'vue'
import { navigations } from '~/configs/home'
import { formatName } from '~/utils/formatter'

const { user } = useUserSession()
const { $classes } = useNuxtApp()
const bottomSheet = ref(false)
const props = defineProps<{
  relativeElement?: VNodeRef
}>()

</script>

<template>
  <div>
    <Affix
      target-name="#page-container"
      :relative-element="props.relativeElement"
      :off-set-y="0"
      :active-class="
        $classes(
          `px-4 lg:px-8 lg:max-w-[calc(theme(screens.container)+4rem)] lg:m-auto lg:right-0`,
          '[&>nav_.show-on-affix]:hidden [&>nav_.show-on-affix]:md:block [&>nav_.hide-on-affix]:hidden',
          '[&>nav]:bg-transparent [&>nav]:md:bg-[linear-gradient(110.72deg,rgba(255,255,255,0.36)_1.21%,rgba(196,196,196,0.06)_100%)] [&>nav]:md:backdrop-blur-lg',
          'p-0 [&>nav]:md:py-4 [&>nav]:md:px-4 [&>nav]:lg:pr-6 [&>nav]:lg:pl-8 [&>nav]:rounded-lg',
        )
      "
    >
      <nav>
        <NuxtLink class="flex-shrink-0" to="/">
          <picture class="hide-on-affix">
            <source media="(min-width: 768px)" srcset="/logo/logo_full.svg" height="46" width="225">
            <NuxtImg preload src="/logo/logo.svg" alt="3c_logo" height="46" width="46" />
          </picture>
          <NuxtImg preload class="show-on-affix" src="/logo/logo.svg" alt="3c_logo" height="46" width="46" />
        </NuxtLink>
        <ul class="navigation-menu">
          <li v-for="{ to, label } in navigations" :key="label">
            <NormalLink :to="to" :label="label" />
          </li>
        </ul>
        <div class="action-group">
          <UButton
            class="hidden lg:inline-flex"
            label="Search"
            variant="outline"
            to="/search"
          />
          <UButton v-if="user" :label="formatName(user.name)" to="/workspace">
            <template #leading>
              <UAvatar
                :src="user.photoUrl"
                icon="i-heroicons-photo"
                size="xs"
                img-class="rounded-[8px]"
                alt="avatar"
              />
            </template>
          </UButton>
          <UButton v-else label="Login" to="/login" />
        </div>
        <UButton
          class="inline-flex md:hidden ml-auto"
          icon="i-cil-hamburger-menu"
          variant="icon"
          @click="bottomSheet = true"
        />
      </nav>
    </Affix>
    <BottomSheetNavbar v-model="bottomSheet" />
  </div>
</template>

<style lang="pcss" scoped>
.show-on-affix {
  @apply hidden;
}

.logo {
  @apply w-[229px] h-12;
}

nav {
  @apply mt-6 flex items-center gap-x-4;
}

.navigation-menu {
  @apply items-center justify-end gap-x-12 flex-none hidden md:flex lg:flex-1 ml-auto lg:ml-0;
}

li {
  @apply flex-shrink-0;
}

.action-group {
  @apply gap-x-2 items-center justify-end flex-none hidden md:flex lg:flex-1;
}
</style>
