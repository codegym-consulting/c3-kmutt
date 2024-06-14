<script lang="ts" setup generic="T">
import { isEmpty } from '~/utils/validator'

const props = defineProps<{
  id: string
  title: string
  addLabel: string
  modelValue: T
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: T): void
  (event: 'add'): void
}>()

const hasValue = computed(() => !isEmpty(props.modelValue))
</script>

<template>
  <div>
    <div class="border-b-[1.5px] border-gray-2">
      <h3
        class="h-7 block font-medium dark:text-gray-200 text-base text-gray-10"
      >
        {{ props.title }}
      </h3>
      <ClientOnly>
        <Teleport :to="`#add-${props.id}`" :disabled="hasValue">
          <button
            class="text-chrysler-blue text-base leading-5 font-medium"
            type="button"
            @click="emit('add')"
          >
            <UIcon class="text-xl mr-2" name="humbleicons:plus" />
            <span class="inline-block translate-y-[2px]">{{
              !hasValue ? props.addLabel : 'Add'
            }}</span>
          </button>
        </Teleport>
      </ClientOnly>
    </div>
    <div>
      <div :id="`add-${props.id}`" class="mt-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
