<script lang="ts" setup>
import type { Level} from '~/utils/repositories/common/model';
import { levelLabel } from '~/utils/repositories/common/model'

const props = withDefaults(
  defineProps<{
    id?: string
    modelValue?: Level | 0
    showLabel?: boolean
    showInfo?: boolean
  }>(),
  {
    id: '',
    showLabel: false,
    showInfo: false,
    modelValue: undefined,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: Level): void
}>()

const hoverIndex = ref<Level | 0>(0)
const modalLevel = ref(false)
</script>

<template>
  <div class="flex flex-col items-start gap-y-1">
    <div
      v-if="props.showLabel"
      class="flex items-center gap-x-1 mb-3 text-base text-gray-10 font-medium"
    >
      Level
      <NuxtIcon
        v-if="props.showInfo"
        class="text-base cursor-pointer"
        name="c3/info"
        filled
        @click="modalLevel = true"
      />
    </div>
    <div class="flex gap-x-1">
      <button
        v-for="i in 5"
        :key="id + 'input-level' + i"
        :class="[
          'w-14 h-14 rounded-lg border border-gray-2',
          { 'bg-white': hoverIndex === 0 && i > (props.modelValue ?? 0) },
          {
            'bg-mid-chrysler-blue':
              i <= hoverIndex && i > (props.modelValue ?? 0),
          },
          { '!bg-bright-chrysler-blue': i <= (props.modelValue ?? 0) },
        ]"
        type="button"
        @mouseover="hoverIndex = i"
        @mouseleave="hoverIndex = 0"
        @click="emit('update:modelValue', i === props.modelValue ? 0 : i)"
      />
    </div>
    <em
      :class="[
        'text-xs h-4 font-bai-jamjuree font-medium leading-4 text-bright-chrysler-blue not-italic',
        { invisible: hoverIndex === 0 },
      ]"
      >{{ levelLabel[hoverIndex as Level] }}</em
    >
    <ModalLevelInfo v-if="props.showInfo" v-model="modalLevel" />
  </div>
</template>
