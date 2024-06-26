<script lang="ts" setup>
definePageMeta({
  layout: 'blank',
  validate() {
    const { loggedIn } = useUserSession()
    if (loggedIn.value) {
      return {
        statusCode: 302,
        name: 'workspace',
      }
    }
    return true
  },
})

const route = useRoute()
const terms = ref(false)
const policy = ref(false)

//check hash #privacy-policy and #terms to open modal
const checkHash = () => {
  const hash = route.hash

  if (hash === '#privacy-policy') {
    policy.value = true
  } else if (hash === '#terms') {
    terms.value = true
  }
}

// Watch for changes to the route
watch(
  route,
  () => {
    checkHash()
  },
  { immediate: true },
)

// Also check hash on initial mount
onMounted(() => {
  checkHash()
})
</script>

<template>
  <div>
    <div
      :class="
        $classes(
          'absolute inset-0 m-auto w-full h-full -z-10',
          'bg-[url(~/public/login/bg_mobile.webp)] md:bg-[url(~/public/login/bg_tablet.webp)] lg:bg-[url(~/public/login/bg.webp)]',
          'bg-no-repeat bg-cover bg-center',
        )
      "
    />
    <UContainer
      class="flex justify-center pt-[115px] md:pt-[245px] lg:pt-[95px] pb-16"
    >
      <UCard
        data-aos="fade-up"
        as="article"
        :ui="{
          strategy: 'override',
          base: 'max-w-[820px] w-full',
          divide: 'divide-y-0',
          rounded: 'rounded-2xl',
          body: {
            padding: 'px-4 py-16 md:pt-14 md:pb-[104px]',
          },
        }"
      >
        <div
          class="max-w-[610px] mx-auto text-center w-full flex flex-col items-center gap-y-14"
        >
          <ULink to="/">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcset="/logo/logo_full_vertical.svg"
              >
              <img src="/logo/logo_full.svg" alt="3c_logo" >
            </picture>
          </ULink>
          <h1 class="text-3xl md:text-[40px] md:leading-[50px] text-gray-6">
            <span>KMUTT</span> network<br >
            knowledge <span>sharing platform</span>
          </h1>
          <div class="flex flex-col items-center gap-y-2 [&>*]:w-full">
            <UButton
              id="kmutt-login"
              label="Continue with KMUTT account"
              to="/auth/microsoft"
              external
            >
              <template #leading>
                <NuxtIcon class="icon text-[30px]" name="c3/kmutt" filled />
              </template>
            </UButton>
            <UButton
              id="email-login"
              label="Continue with email"
              to="/login/email/"
            >
              <template #leading>
                <NuxtIcon class="icon text-2xl" name="c3/email" filled />
              </template>
            </UButton>
            <UButton
              id="google-login"
              class="login-button"
              label="Continue with Google"
              to="/auth/google"
              external
            >
              <template #leading>
                <NuxtIcon class="icon text-xl" name="c3/google" filled />
              </template>
            </UButton>
            <p class="mt-2 text-sm leading-[18px] text-gray-7 md:!w-[90%]">
              By clicking “Continue with Google”, you acknowledge that you have
              read, understood, and agree to C3’s
              <span tabindex="0" @click="terms = true"
                >Terms &amp; Conditions</span
              >
              and
              <span tabindex="1" @click="policy = true">Privacy Policy.</span>
            </p>
          </div>
        </div>
      </UCard>
    </UContainer>
    <ModalTerms v-model="terms" />
    <ModalPolicy v-model="policy" />
    <UNotifications />
  </div>
</template>

<style lang="pcss" scoped>
h1 > span {
  @apply font-bold text-4xl md:text-[48px] md:leading-[56px] text-gray-10;
}
p > span {
  @apply underline cursor-pointer;
}
#kmutt-login :deep(.nuxt-icon svg),
#email-login :deep(.nuxt-icon path) {
  @apply transition-all;
}
#kmutt-login:hover :deep(.nuxt-icon svg) {
  @apply brightness-0;
}
#email-login:hover :deep(.nuxt-icon path) {
  @apply stroke-gray-10;
}
</style>
