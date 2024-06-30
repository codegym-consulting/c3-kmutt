<script lang="ts" setup>
import type {
  PersonalInformation,
  ProfileInformation,
} from '~/utils/repositories/dashboard/model'

const props = defineProps<{
  profile: ProfileInformation
}>()

const emit = defineEmits<{
  (event: 'update', data: PersonalInformation): void
}>()

const { $fetchApi, $alert } = useNuxtApp()
const registerRepo = registerRepository($fetchApi)

const modal = ref(false)
const editData = ref<PersonalInformation>({ ...props.profile })
const stateData = ref<PersonalInformation>({ ...props.profile })

const edit = () => {
  modal.value = true
}
const save = (data: PersonalInformation) => {
  registerRepo.updateDashboardProfile(data, (status) => {
    if (!status?.toString()?.startsWith('2')) {
      $alert({
        title: 'Failed to update profile',
        content: 'Please try again later',
        type: ALERT_TYPE.ERROR,
      })
    } else {
      emit('update', data)
    }
  })
}
const format = (options?: Option[]) => {
  return options?.length ? options.map((o) => o.label).join(', ') : '-'
}
const avatar = computed(() => props.profile.avatarUrl || '/common/avatar.svg')
const name = computed(() =>
  !props.profile.name && !props.profile.surname
    ? '-'
    : `${props.profile.name} <br /> ${props.profile.surname}`,
)
const _occupation = computed(() => editData.value.occupation?.label ?? '-')
const _organization = computed(() =>
  !editData.value.organization &&
  !editData.value.faculty &&
  !editData.value.department
    ? '-'
    : [
        editData.value.faculty?.label,
        editData.value.department?.label,
        editData.value.organization?.label,
      ]
        .filter(Boolean)
        .join(' • '),
)
const _expertise = computed(() => format(editData.value.expertises))

watch(
  () => props.profile,
  () => {
    editData.value = { ...props.profile }
    stateData.value = { ...props.profile }
  },
  { deep: true },
)
watch(
  () => modal.value,
  (isOpen) => {
    if (!isOpen) {
      stateData.value = { ...editData.value }
    }
  },
)
</script>

<template>
  <div>
    <UCard
      as="article"
      class="p-4"
      :ui="{
        strategy: 'override',
        base: 'w-full h-[323px]',
        divide: 'divide-y-0',
        rounded: 'rounded-2xl',
        header: { padding: 'p-0' },
        body: { padding: 'p-0' },
        footer: { padding: 'p-0' },
      }"
    >
      <div class="flex gap-x-2 md:gap-x-4">
        <figure>
          <img
            class="w-[94px] h-[94px] object-cover rounded-2xl"
            :src="avatar"
            alt="profile"
          >
        </figure>
        <div class="flex flex-col justify-between gap-y-2">
          <h3 class="text-2xl leading-7 text-gray-10 font-bold" v-html="name" />
          <em class="not-italic text-base leading-5 font-bold text-gray-10">{{
            props.profile.nickname || '-'
          }}</em>
        </div>
      </div>
      <div class="mt-6 md:mt-8 flex flex-col gap-y-4">
        <div class="flex gap-x-2 [&>*]:flex-1">
          <CardExperience
            size="md"
            name="Occupation"
            :description="_occupation"
            @edit="edit"
          />
          <CardExperience
            size="md"
            name="Organization"
            :description="_organization"
            @edit="edit"
          />
        </div>
        <CardExperience
          size="md"
          name="Expertise in"
          :description="_expertise"
          @edit="edit"
        />
      </div>
    </UCard>
    <ModalPersonalInformation
      v-model="modal"
      v-model:personal-info="stateData"
      @save="save"
    />
  </div>
</template>
