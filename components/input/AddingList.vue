<script lang="ts" setup generic="T">
import { isEmpty } from '~/utils/validator'

const props = withDefaults(
  defineProps<{
    id: string
    title: string
    addLabel?: string
    modelValue: T
  }>(),
  {
    addLabel: '',
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: T): void
  (event: 'add'): void
}>()

const hasValue = computed(() => !isEmpty(props.modelValue))
</script>

<template>
  <div>
    <div
      class="border-b-[1.5px] border-gray-2 flex justify-between gap-x-2 items-center"
    >
      <h3
        class="h-7 block font-medium dark:text-gray-200 text-base text-gray-10"
      >
        {{ props.title }}
      </h3>
      <ClientOnly>
        <Teleport
          :to="`#add-${props.id}`"
          :disabled="hasValue || !props.addLabel"
        >
          <ButtonAdd
            :label="!hasValue && props.addLabel ? props.addLabel : 'Add'"
            @click="emit('add')"
          />
        </Teleport>
      </ClientOnly>
    </div>
    <div>
      <div
        :id="`add-${props.id}`"
        :class="[
          hasValue ? 'mt-4' : 'mt-2',
          'flex flex-col items-start gap-y-4',
        ]"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
