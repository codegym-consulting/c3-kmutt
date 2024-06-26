<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const { clear } = useUserSession()

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}

const logout = async () => {
  clear()
  await navigateTo('/login')
}
</script>

<template>
  <Modal
    title="Logout"
    sub-title="Are you sure you want to log out?"
    :model-value="props.modelValue"
    @update:model-value="updateValue"
  >
    <div class="flex flex-col gap-y-4 md:gap-y-10">
      <TemplateRow class="justify-end">
        <UButton
          class="bg-giants-orange !flex-none w-[180px]"
          label="Log out"
          @click="logout"
        />
      </TemplateRow>
    </div>
  </Modal>
</template>
