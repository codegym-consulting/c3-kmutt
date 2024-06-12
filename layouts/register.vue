<script lang="ts" setup>
const register = useRegisterStore()
const bottomSheet = ref(false)
</script>

<template>
  <div id="page-container">
    <UCard
      :ui="{
        strategy: 'override',
        base:
          'base-card -static' +
          (!register.registerNavbarFullSize ? ' -half' : ''),
        body: {
          base: 'w-full',
          padding: 'p-0',
        },
      }"
    >
      <div class="flex justify-between gap-x-6">
        <picture>
          <source
            media="(min-width: 768px)"
            srcset="/logo/logo_full_vertical.svg"
          >
          <img src="/logo/logo.svg" alt="3c_logo" >
        </picture>
        <UButton
          class="inline-flex md:hidden ml-auto"
          icon="i-cil-hamburger-menu"
          variant="icon"
          @click="bottomSheet = true"
        />
      </div>
      <h1>
        <span>KMUTT</span> network<br >
        knowledge
        <span
          >sharing<br >
          platform</span
        >
      </h1>
    </UCard>
    <UCard
      :ui="{
        strategy: 'override',
        base: 'base-card -content',
        body: {
          base: 'h-full flex-1 flex flex-col',
          padding: 'p-0',
        },
      }"
    >
      <slot />
    </UCard>
    <BottomSheetNavbar v-model="bottomSheet" />
  </div>
</template>

<style lang="pcss" scoped>
#page-container {
  @apply relative flex items-center justify-start lg:justify-center gap-y-2 md:gap-y-6 gap-x-5 min-h-screen bg-gray-3 overflow-y-auto flex-col lg:flex-row pb-8 md:px-14 lg:px-4 lg:py-6;

  :deep(.base-card) {
    @apply flex flex-col transition-all relative max-w-full lg:max-w-[505px] w-full px-4 py-6 md:p-10;

    &.-static {
      @apply overflow-hidden rounded-t-none rounded-b-3xl md:rounded-b-[40px] lg:rounded-[40px] h-[403px] md:h-[502px] lg:h-[784px] bg-[url(~/public/register/bg_mobile_full.webp)] md:bg-[url(~/public/register/bg_tablet_full.webp)] lg:bg-[url(~/public/register/bg.webp)] bg-no-repeat bg-cover md:bg-contain bg-bottom;

      &.-half {
        @apply flex items-end md:block h-[147px] md:h-[206px] lg:h-[784px] bg-cover lg:bg-contain bg-[url(~/public/register/bg_mobile_half.webp)] md:bg-[url(~/public/register/bg_tablet_half.webp)] lg:bg-[url(~/public/register/bg.webp)];

        h1 {
          @apply hidden lg:block;
        }
      }
    }

    &.-content {
      @apply flex-1 lg:flex-none rounded-3xl md:rounded-[40px] lg:h-[784px] max-w-full lg:max-w-[715px] overflow-x-auto;
    }
  }
}

h1 {
  @apply mt-12 md:mt-[88px] text-4xl md:text-[40px] md:leading-[51px] text-dark-theme;

  > span {
    @apply font-bold text-[46px] leading-[48px] md:text-[48px] md:leading-[56px] text-dark-theme;
  }
}
</style>
