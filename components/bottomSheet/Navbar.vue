<script lang="ts" setup>
import { navigations } from '~/configs/home'
import { formatName } from '~/utils/formatter'

const { user } = useUserSession()

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
  <BottomSheet :model-value="props.modelValue" @update:model-value="updateValue">
    <div class="flex flex-col items-center justify-center gap-y-10 py-8 px-4">
      <NuxtImg preload class="logo" src="/logo/logo_full.svg" alt="3c_logo" width="225" height="46" />
      <ul class="flex flex-col items-center justify-center gap-y-6">
        <li v-for="{ to, label } in navigations" :key="`bottom-sheet-${label}`">
          <NormalLink
            :to="to"
            :label="label"
            @click="() => updateValue(false)"
          />
        </li>
      </ul>
      <UButton v-if="user" :label="formatName(user.name)" to="/workspace">
        <template #leading>
          <UAvatar
            :src="user.photoUrl"
            icon="i-heroicons-photo"
            size="xs"
            img-class="rounded-[8px]"
            alt="avatar"
          />
        </template>
      </UButton>
      <UButton v-else label="Login" to="/login" />
    </div>
  </BottomSheet>
</template>
