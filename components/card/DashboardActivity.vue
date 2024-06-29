<script lang="ts" setup>
import type { Swiper } from 'swiper'
import { Pagination } from 'swiper/modules'

const menus = [
  {
    icon: 'c3/notification',
    value: 'notification',
  },
  {
    icon: 'c3/group',
    value: 'activity',
  },
]

//@Todo: Replace with real data
const notifications: NotificationData[] = Array.from({ length: 10 }, () => ({
  imageUrl: 'https://via.placeholder.com/150',
  title: 'Nattaporn S. Has comment on your project',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  createdAt: new Date().toLocaleDateString(),
}))

const activeMenu = ref('notification')
</script>

<template>
  <UCard
    as="article"
    class="p-4"
    :ui="{
      strategy: 'override',
      base: 'w-full h-[339px] md:h-[323px]',
      divide: 'divide-y-0',
      rounded: 'rounded-2xl',
      header: { padding: 'p-0' },
      body: { padding: 'p-0 h-full' },
      footer: { padding: 'p-0' },
    }"
  >
    <div id="dashboard-activity" class="flex flex-col h-full">
      <div class="flex items-center justify-between gap-x-2">
        <div class="flex flex-col">
          <h3 class="text-base leading-5 font-bold text-gray-10">
            Your activities
          </h3>
          <p class="text-sm leading-[18px] text-gray-7">
            Track your recent activities and interactions.
          </p>
        </div>
        <div class="flex gap-x-2 md:gap-x-4">
          <NuxtIcon
            v-for="menu in menus"
            :key="menu.value"
            :name="menu.icon"
            filled
            :class="[
              'relative mt-auto round-icon-btn -invert !bg-white [&_path]:!stroke-gray-10 [&_circle]:!stroke-gray-10 [&_svg]:z-[1]',
              {
                '!bg-gray-1 after:content-[` `] after:absolute after:top-0 after:rounded-t-full after:w-full after:h-[100px] after:bg-gray-1':
                  activeMenu === menu.value,
                'shadow-[0_4px_10px_0_#0000000D]': activeMenu !== menu.value,
              },
            ]"
            @click="activeMenu = menu.value"
          />
        </div>
      </div>
      <div
        v-if="activeMenu === 'notification' && notifications.length"
        class="p-4 md:p-0 overflow-x-hidden overflow-y-hidden md:overflow-y-auto main-bg"
      >
        <div class="hidden md:flex flex-col gap-y-2 p-4 z-10">
          <CardNotification
            v-for="(notification, i) in notifications"
            :key="notification.title + i"
            :data="notification"
          />
        </div>
        <Swiper
          class="md:!hidden w-full p-4"
          key="notification"
          :modules="[Pagination]"
          :slides-per-view="1"
          :space-between="8"
          :pagination="{ clickable: true }"
        >
          <SwiperSlide
            v-for="(notification, i) in notifications"
            :key="notification.title + i + 'swiper'"
          >
            <CardNotification :data="notification" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div
        v-else
        class="flex flex-col gap-y-2 justify-center items-center main-bg"
      >
        <div class="text-gray-6 text-base leading-5 font-bold">
          No Recent Activity
        </div>
        <div class="text-gray-6 text-sm leading-[18px] text-center">
          You haven't performed any activities yet. Start exploring the platform
          to <br />
          see your actions here.
        </div>
      </div>
    </div>
  </UCard>
</template>

<style lang="pcss" scoped>
#dashboard-activity {
  :deep(.swiper) {
    @apply overflow-y-visible;
  }
  :deep(.swiper-pagination) {
    @apply -bottom-8;
  }
}
.main-bg {
  @apply mt-4 w-full h-full bg-gray-1 rounded-2xl flex-1;
}
</style>
