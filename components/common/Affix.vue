<script lang="ts" setup>
import type { VNodeRef } from 'vue'

const props = withDefaults(
  defineProps<{
    relativeElement?: VNodeRef
    targetName?: string
    offSetY?: number
    activeClass?: string
    activeStyle?: string
  }>(),
  {
    relativeElement: () => ({}),
    targetName: '',
    activeClass: '',
    activeStyle: '',
    offSetY: 100,
  },
)
const affixRef = ref()
const affixTeleport = ref<HTMLElement>()
const targetIsVisible = ref<boolean>(false)
const isTeleport = computed<boolean>((): boolean => targetIsVisible.value)
const affixTelportHeight = ref<string>('auto')
const resolvedTelportHeight = ref<string>('auto')

watch(isTeleport, function () {
  const _height = affixTelportHeight.value
  resolvedTelportHeight.value = _height
})
if (import.meta.client) {
  window.addEventListener('scroll', handleScroll)
}
function handleScroll() {
  if (!props?.relativeElement) return
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { y, height } = useElementBounding(props?.relativeElement as any)
  const positionElement = height.value - props.offSetY
  targetIsVisible.value = y.value < 0
  if (y.value < -Math.abs(positionElement)) targetIsVisible.value = false
}

onMounted(() => {
  setTimeout(() => {
    const _height = affixTeleport.value?.clientHeight
    affixTelportHeight.value = _height ? `${_height}px` : 'auto'
  }, 300)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <ClientOnly>
    <div
      ref="affixTeleport"
      class="affix"
      :style="{ 'min-height': resolvedTelportHeight }"
    >
      <div
        ref="affixRef"
        class="affix__ref"
      />
      <Teleport
        :disabled="!isTeleport"
        :to="props.targetName"
      >
        <div
          :class="`affix__teleport ${
            isTeleport ? `${props.activeClass} -active` : ''
          }`"
          :style="isTeleport ? props.activeStyle : ''"
        >
          <slot />
        </div>
      </Teleport>
    </div>
  </ClientOnly>
</template>

<style lang="pcss" scoped>
.affix {
  @apply flex flex-col;
  .affix__ref {
    @apply w-full h-full;
  }
}
.affix__teleport.-active {
  @apply top-0 left-0 z-50 fixed w-full;
}
</style>
