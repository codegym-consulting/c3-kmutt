<template>
  <div
    id="page-container"
    :class="
      $classes(
        'relative min-h-screen',
        `after:content-[''] after:block after:absolute`,
        'after:inset-0 after:w-full after:h-full after:opacity-10',
        'after:bg-[url(~/public/landing/noise.webp)] after:bg-repeat after:bg-cover after:z-[-1]',
      )
    "
  >
    <slot />
  </div>
</template>
