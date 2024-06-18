<script lang="ts" setup>
import { isEmpty } from '~/utils/validator'
import { typeOfSources } from '~/data/common'
import { type Publication } from '~/models/register'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'save', value: Publication): void
}>()

const publication = defineModel<Publication>('publication')
const canSave = computed(() => {
  const _publication = { ...publication.value }
  delete _publication.year
  delete _publication.type
  return (
    _publication && Object.values(_publication).some((value) => !isEmpty(value))
  )
})

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
const onSave = () => {
  if (!canSave.value) return
  emit('update:modelValue', false)
  publication.value && emit('save', publication.value)
}
const onAddAuthor = () => {
  if (publication.value) {
    publication.value.author = [...publication.value.author, '']
  }
}
const onUpdateAuthor = (index: number, value: string) => {
  if (publication.value) {
    publication.value.author = [
      ...publication.value.author.slice(0, index),
      value,
      ...publication.value.author.slice(index + 1),
    ]
  }
}

watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      publication.value = {
        type: undefined,
        author: [''],
        year: '',
        city: '',
        publisher: '',
      }
    }
  },
)
</script>

<template>
  <Modal
    v-if="publication"
    title="Publication"
    sub-title="Add information about your academic publications and scholarly works."
    :model-value="props.modelValue"
    @update:model-value="updateValue"
  >
    <div class="flex flex-col gap-y-4 md:gap-y-10">
      <TemplateRow>
        <Select
          v-model="publication.type"
          label="Type of source"
          name="type"
          placeholder="Select type of source"
          :options="typeOfSources"
        />
      </TemplateRow>
      <template v-if="publication.type?.value">
        <TemplateRow>
          <Input v-model="publication.city" label="City" name="city" />
          <div />
        </TemplateRow>
        <TemplateRow>
          <div class="flex justify-between items-center gap-x-2">
            <div class="font-medium text-base text-gray-10">
              Author of publication
            </div>
            <ButtonAdd label="Add" @click="onAddAuthor" />
          </div>
        </TemplateRow>
        <TemplateRow
          v-for="row in Math.ceil(publication.author.length / 2)"
          :key="'author-row' + row"
          :class="row === 1 ? 'md:-mt-6' : ''"
        >
          <template
            v-for="(author, index) in publication.author.slice(
              (row - 1) * 2,
              row * 2,
            )"
            :key="'author' + index"
          >
            <Input
              :model-value="author"
              :label="'Author ' + (index + 1 + (row - 1) * 2)"
              :name="'author' + index"
              @update:model-value="($event) => onUpdateAuthor(index, $event)"
            />
            <div
              v-if="publication.author.slice((row - 1) * 2, row * 2).length < 2"
            />
          </template>
        </TemplateRow>
        <TemplateRow>
          <Input
            v-model="publication.publisher"
            label="Publisher"
            name="publisher"
          />
          <InputDatePicker
            v-model="publication.year"
            label="Year"
            name="year"
            placeholder="Select year"
            year-picker
          />
        </TemplateRow>
        <TemplateRow>
          <div></div>
          <UButton
            class="!flex-none w-[180px]"
            label="Save"
            :disabled="!canSave"
            @click="onSave"
          />
        </TemplateRow>
      </template>
    </div>
  </Modal>
</template>
