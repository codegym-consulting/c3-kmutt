<script lang="ts" setup>
definePageMeta({
  layout: 'workspace',
  middleware: 'auth',
})

const { $fetchApi } = useNuxtApp()
const dashboardRepo = dashboardRepository($fetchApi)

const { data: projects } = useAsyncData(
  'highlight-projects',
  dashboardRepo.getRecentProjects,
)
const { data: profile, refresh: refreshProfile } = useAsyncData(
  'dashboard-profile',
  dashboardRepo.getProfile,
)
const { data: noteLists, refresh: refreshNote } = useAsyncData(
  'dashboard-notes',
  dashboardRepo.getNotes,
)

const _profile = computed(() => {
  return {
    ...profile.value,
  }
})
const stat = computed(() => [
  {
    title: 'Your network',
    value: profile.value?.yourNetwork ?? 0,
  },
  {
    title: 'Your projects',
    value: profile.value?.yourProjects ?? 0,
  },
])
const notes = computed<PreviewNote[]>(() => {
  return (
    noteLists.value?.map((note) => {
      const noteImage = note.imageUrl ?? '/note/default-thumbnail.svg'
      return {
        id: note.id,
        title: note.title,
        image: note.type === 'text' ? undefined : noteImage,
        imageUrl:
          note.type === 'text' ? '/note/text-type-thumbnail.svg' : noteImage,
        description: note.content ?? '',
        createdAt: note.createdAt,
      }
    }) ?? []
  )
})
</script>

<template>
  <div class="min-h-screen">
    <div
      class="flex w-full gap-y-7 justify-between mb-4 md:mb-6 flex-col md:flex-row"
    >
      <div class="flex flex-col gap-y-1">
        <h1
          :title="profile?.name + 'workspace'"
          class="text-[32px] leading-10 font-bold text-gray-10"
        >
          Welcome, <span class="block lg:inline">{{ profile?.name }}</span>
        </h1>
        <p class="text-sm leading-[18px] font-normal text-gray-10">
          Keep track of your activities, notes, and
          <span class="block lg:inline"> projects from your workspace.</span>
        </p>
      </div>
      <div class="flex md:items-center flex-col md:flex-row gap-8">
        <ul class="flex gap-x-12">
          <li
            v-for="s in stat"
            :key="s.title"
            class="flex flex-col items-center"
          >
            <div class="text-sm leading-[18px] text-gray-10">
              {{ s.title }}
            </div>
            <div class="text-[48px] leading-[56px] font-bold text-gray-10">
              {{ s.value }}
            </div>
          </li>
        </ul>
        <UButton
          class="rounded-[48px] min-w-[165px] w-[165px]"
          leading-icon="humbleicons:plus"
          label="Add project"
        />
      </div>
    </div>
    <div class="grid gap-5 grid-cols-1 lg:grid-cols-[400px,1fr]">
      <CardDashboardProfile
        :profile="(_profile as ProfileInformation)"
        @update="() => refreshProfile()"
      />
      <CardDashboardActivity />
      <CardDashboardNote
        :notes="notes"
        @create="() => refreshNote()"
        @update="() => refreshNote()"
        @remove="() => refreshNote()"
      />
      <CardDashboardRecentProject :projects="projects ?? []" />
    </div>
  </div>
</template>
