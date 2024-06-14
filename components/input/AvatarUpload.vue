<script lang="ts" setup>
const props = defineProps<{
  modelValue: File | null
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: File | null): void
}>()

const previewImage = computed(() => {
  if (props.modelValue) {
    return URL.createObjectURL(props.modelValue)
  }
  return ''
})

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    const file = input.files[0]
    emit('update:modelValue', file)
    input.value = ''
  }
}

const clearFile = () => {
  emit('update:modelValue', null)
}
</script>

<template>
  <div class="relative w-[120px] h-[120px] rounded-3xl bg-gray-1">
    <input
      class="opacity-0 z-10 absolute inset-0 w-full h-full cursor-pointer"
      type="file"
      accept="image/jpeg,image/png,image/webp"
      @change="handleFileChange"
    />
    <div
      v-if="!previewImage"
      class="w-full h-full flex flex-col justify-center items-center gap-y-[10px]"
    >
      <UIcon name="ph:upload-simple-bold" class="text-2xl text-chrysler-blue" />
      <div
        class="text-center text-sm leading-[18px] text-chrysler-blue underline"
      >
        Upload <br />
        resume photo
      </div>
    </div>
    <div
      v-else
      class="w-full h-full pt-4 pb-1 px-2 relative flex flex-col items-center justify-between"
    >
      <img
        :src="previewImage"
        alt="preview avatar"
        class="absolute pointer-events-none inset-0 w-full h-full object-cover rounded-3xl"
      />
      <UIcon
        name="lucide:trash-2"
        class="text-2xl text-chrysler-blue z-20 relative ml-auto"
        @click="clearFile"
      />
      <UButton
        :ui="{
          base: '!min-w-20 w-20 !h-[34px] !text-sm !font-normal relative',
          rounded: '!rounded-[10px]',
          color: {
            primary: {
              solid: 'bg-chrysler-blue text-white',
            },
          },
        }"
        >Edit <NuxtIcon class="[&_*]:stroke-white" name="c3/edit" filled
      /></UButton>
    </div>
  </div>
</template>
