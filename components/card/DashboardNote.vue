<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    notes?: PreviewNote[]
  }>(),
  {
    notes: () => [],
  },
)

const emit = defineEmits<{
  (event: 'create' | 'remove' | 'update', value: Note): void
}>()

const { $fetchApi, $alert } = useNuxtApp()
const dashboardRepo = dashboardRepository($fetchApi)

const noteModal = ref(false)
const editNoteData = ref<Note & { id?: number }>()

const noNotes = computed(() => isEmpty(props.notes))

const onCreateNote = () => {
  editNoteData.value = undefined
  noteModal.value = true
}
const onEditNote = (note: PreviewNote) => {
  editNoteData.value = {
    id: note.id,
    title: note.title,
    description: note.description,
    image: undefined,
    imageUrl: note.image,
  }
  noteModal.value = true
}
const onRemoveNote = async (note: Note & { id?: number }) => {
  // noteModal.value = false
  if (!note?.id) return
  await dashboardRepo.removeNote(note.id, (status) => {
    if (!status?.toString()?.startsWith('2')) {
      $alert({
        title: 'Failed to remove note',
        content: 'Please try again later',
        type: ALERT_TYPE.ERROR,
      })
    } else {
      emit('remove', note)
    }
  })
}
const onSaveNote = async (note: Note & { id?: number | string }) => {
  await dashboardRepo.createOrUpdateNote(note, (status) => {
    if (!status?.toString()?.startsWith('2')) {
      $alert({
        title: 'Failed to save note',
        content: 'Please try again later',
        type: ALERT_TYPE.ERROR,
      })
    } else {
      noteModal.value = false
      const mode = note.id ? 'update' : 'create'
      emit(mode, note)
    }
  })
}
</script>

<template>
  <div>
    <UCard
      as="article"
      class="p-4"
      :ui="{
        strategy: 'override',
        base: 'w-full h-[244px] lg:h-[425px]',
        divide: 'divide-y-0',
        rounded: 'rounded-2xl',
        header: { padding: 'p-0' },
        body: { padding: 'p-0', base: 'h-full' },
        footer: { padding: 'p-0' },
      }"
    >
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between gap-x-2">
          <div class="flex flex-col">
            <h3 class="text-base leading-5 font-bold text-gray-10">
              Your notes
            </h3>
            <p class="text-sm leading-[18px] text-gray-7">
              Add, edit, or manage your notes.
            </p>
          </div>
          <NuxtIcon
            name="c3/sticky-note"
            filled
            class="mt-auto round-icon-btn -invert -gray [&_path]:hover:stroke-white"
            tabindex="0"
            @click="onCreateNote"
          />
        </div>
        <div
          :class="[
            'flex-1 overflow-x-auto overflow-y-hidden lg:overflow-y-auto lg:overflow-x-hidden',
            { 'flex justify-center items-center': noNotes },
          ]"
        >
          <UButton
            v-if="noNotes"
            class="rounded-[48px] min-w-[147px] w-[147px]"
            leading-icon="humbleicons:plus"
            label="Add note"
            @click="onCreateNote"
          />
          <div class="flex lg:grid lg:grid-cols-2 gap-2 py-4">
            <CardNote
              v-for="(note, i) in notes"
              :key="'note' + i"
              :data="note"
              @click="onEditNote"
            />
          </div>
        </div>
      </div>
    </UCard>
    <ModalNote
      v-model="noteModal"
      v-model:note="editNoteData"
      @save="onSaveNote"
      @update="onSaveNote"
      @remove="onRemoveNote"
    />
  </div>
</template>
