<template>
  <div>
    <div
      :class="
        $classes(
          'absolute inset-0 m-auto w-full h-full -z-10',
          'bg-[url(~/public/contact/bg_mobile.webp)] md:bg-[url(~/public/contact/bg_tablet.webp)] lg:bg-[url(~/public/contact/bg.webp)]',
          'bg-no-repeat bg-cover bg-center',
        )
      "
    ></div>
    <UContainer
      class="flex justify-center pt-6 pb-8 md:pt-[235px] md:pb-[195px] lg:pt-14 lg:pb-[70px]"
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
          class="max-w-[528px] mx-auto text-center w-full flex flex-col items-center gap-y-[56px]"
        >
          <picture>
            <source
              media="(min-width: 1024px)"
              srcset="/logo/logo_full_vertical.svg"
            />
            <img src="/logo/logo_full.svg" alt="3c_logo" />
          </picture>
          <p
            class="font-bold text-[22px] leading-[26px] md:text-2xl md:leading-7 text-gray-10"
          >
            If you are interested in further details or would like to
            collaborate on research projects, laboratories, or with researchers,
            please contact:
          </p>
          <h1
            class="font-bold text-base leading-5 md:text-[22px] md:leading-[26px] text-gray-10"
          >
            Research, Innovation and Partnerships Office (RIPO)
          </h1>
          <address
            class="not-italic text-sm leading-[18px] lg:text-base lg:leading-5 text-gray-6"
          >
            King Mongkut’s University of Technology Thonburi<br />
            126 Pracha Uthit Rd., Bang Mod, Thung Khru, Bangkok 10140,
            Thailand<br />
            Office Hours: Monday - Friday, 08:30 AM - 04:30 PM
          </address>
          <div class="flex flex-col items-center -mt-2 gap-y-[10px]">
            <figure>
              <img
                class="grayscale"
                src="/contact/line_qr_code.webp"
                alt="LINE QR Code"
              />
            </figure>
            <em class="not-italic text-base leading-5 text-gray-10"
              >LINE ID: @396gmubi</em
            >
          </div>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
