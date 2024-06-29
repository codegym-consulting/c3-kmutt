<script lang="ts" setup>
const { $classes } = useNuxtApp()
const route = useRoute()
const affixRef = ref()
const logoutModal = ref(false)

const menus = [
  {
    icon: 'c3/dashboard',
    to: '/workspace',
    activeRouteName: 'workspace',
  },
  {
    icon: 'c3/user',
    to: '/workspace/profile',
    activeRouteName: 'workspace-profile',
  },
  {
    icon: 'c3/document',
    to: '/workspace/resume',
    activeRouteName: 'workspace-resume',
  },
  {
    icon: 'c3/folder',
    to: '/workspace/my-project',
    activeRouteName: 'workspace-my-project',
  },
  {
    icon: 'c3/group',
    to: '/workspace/network',
    activeRouteName: 'workspace-network',
  },
  {
    icon: 'c3/bookmark',
    to: '/workspace/bookmark',
    activeRouteName: 'workspace-bookmark',
  },
]
</script>

<template>
  <div
    id="page-container"
    ref="affixRef"
    :class="
      $classes(
        'relative min-h-screen',
        `after:content-[''] after:block after:absolute`,
        'after:inset-0 after:w-full after:h-full after:opacity-10',
        'after:bg-[url(~/public/landing/noise.webp)] after:bg-repeat after:bg-cover after:z-[-1]',
      )
    "
  >
    <UContainer>
      <Navbar :relative-element="affixRef" />
    </UContainer>
    <div
      :class="
        $classes(
          'w-full h-full absolute inset-0 -z-[1]',
          'bg-[url(~/public/about/bg_mobile.webp)] md:bg-[url(~/public/about/bg_tablet.webp)] lg:bg-[url(~/public/about/bg.webp)]',
          'bg-no-repeat bg-[size:100%_80%] bg-[center_bottom]',
        )
      "
    />
    <UContainer class="py-12 flex gap-x-0 md:gap-x-8 lg:gap-x-12">
      <div
        class="hidden md:flex flex-col justify-between h-[calc(100vh-70px-96px)] top-[118px] sticky"
      >
        <div class="flex flex-col gap-y-2">
          <NuxtLink
            v-for="menu in menus"
            :key="menu.icon"
            :to="menu.to"
            :title="menu.activeRouteName"
          >
            <NuxtIcon
              :name="menu.icon"
              filled
              :class="[
                'mt-auto round-icon-btn -invert [&_path]:hover:stroke-white [&_circle]:hover:stroke-white',
                {
                  '-active [&_path]:stroke-white [&_circle]:stroke-white':
                    route.name === menu.activeRouteName,
                },
              ]"
            />
          </NuxtLink>
        </div>
        <NuxtIcon
          name="c3/logout"
          filled
          class="mt-auto round-icon-btn -invert [&_path]:hover:stroke-white"
          @click="logoutModal = true"
        />
      </div>
      <div class="w-full">
        <slot />
      </div>
    </UContainer>
    <div class="bg-white">
      <UContainer>
        <AppFooter />
      </UContainer>
    </div>
    <ModalLogout v-model="logoutModal" />
    <Alert />
  </div>
</template>
