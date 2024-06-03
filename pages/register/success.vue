<script lang="ts" setup>
definePageMeta({
  layout: 'blank',
  validate() {
    const register = useRegisterStore()
    return register.isRegisterationSuccess
  },
})

const register = useRegisterStore()

onMounted(() => {
  register.setIsRegisterationSuccess(false)
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
    ></div>
    <UContainer class="flex justify-center absolute inset-0 h-fit m-auto">
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
          class="max-w-[820px] mx-auto text-center w-full flex flex-col items-center gap-y-14"
        >
          <figure class="hidden md:block">
            <img src="/logo/logo_full.svg" alt="3c_logo" />
          </figure>
          <div class="flex flex-col items-center gap-y-6">
            <UIcon name="prime:thumbs-up" class="w-12 h-12 text-gray-10" />
            <h1 class="heading-label">Registration complete!</h1>
            <p class="text-gray-10 text-base leading-5">
              You have successfully registered. You can also
              <UButton variant="inline-link" to="/resume/create"
                >create an online resume</UButton
              >
              to<br />
              showcase your skills and experiences.
            </p>
          </div>
          <NuxtLink
            :to="'/workspace'"
            class="round-icon-btn w-[72px] h-[72px] [&_svg]:w-8 [&_svg]:h-8"
            ><UIcon name="material-symbols:arrow-forward"
          /></NuxtLink>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
