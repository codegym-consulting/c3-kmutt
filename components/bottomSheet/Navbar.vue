<script lang="ts" setup>
import { navigations } from '~/configs/home'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <BottomSheet :modelValue="props.modelValue" @update:modelValue="updateValue">
    <div class="flex flex-col items-center justify-center gap-y-10 py-8 px-4">
      <img class="logo" src="/logo/logo_full.svg" alt="3c_logo" />
      <ul class="flex flex-col items-center justify-center gap-y-6">
        <li v-for="{ to, label } in navigations" :key="`bottom-sheet-${label}`">
          <NormalLink
            :to="to"
            :label="label"
            @click="() => updateValue(false)"
          />
        </li>
      </ul>
      <UButton label="Login" to="/login" />
    </div>
  </BottomSheet>
</template>
