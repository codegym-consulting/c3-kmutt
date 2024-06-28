<script lang="ts" setup>
definePageMeta({
  layout: 'workspace',
  middleware: 'auth',
})

//@TODO Query profile data from API
const profile = {
  avatarUrl: '',
  firstName: 'Pitikorn',
  lastName: 'Chulitawong',
  surName: 'Beam',
  teachingExperience: '',
  occupation: { label: 'Student', value: 'student' },
  organization: { label: 'KMUTT', value: 'kmutt' },
  faculty: { label: 'คณะวิทยาศาสตร์', value: 3 },
  department: { label: 'สายวิชาเทคโนโลยีวัสดุ', value: 35 },
  expertises: [
    { label: '1st gen biofuels', value: 1 },
    { label: '2st gen biofuels', value: 2 },
  ],
  areaOfInterests: [
    { label: '1st gen biofuels', value: 1 },
    { label: '2st gen biofuels', value: 2 },
  ],
}
//@TODO Query stat data from API
const stat = [
  {
    title: 'Your network',
    value: 152,
  },
  {
    title: 'Your projects',
    value: 12,
  },
]
</script>

<template>
  <div class="min-h-screen">
    <div
      class="flex w-full gap-y-7 justify-between mb-4 md:mb-6 flex-col md:flex-row"
    >
      <div class="flex flex-col gap-y-1">
        <h1
          :title="profile.firstName + 'workspace'"
          class="text-[32px] leading-10 font-bold text-gray-10"
        >
          Welcome, <span class="block lg:inline">{{ profile.firstName }}</span>
        </h1>
        <p class="text-sm leading-[18px] font-normal text-gray-10">
          Keep track of your activities, notes, and
          <span class="block lg:inline"> projects from yourworkspace.</span>
        </p>
      </div>
      <div class="flex md:items-center flex-col md:flex-row gap-8">
        <ul class="flex gap-x-12">
          <li
            v-for="s in stat"
            :key="s.title"
            class="flex flex-col items-center"
          >
            <div class="text-sm leading-[18px] text-gray-10">{{ s.title }}</div>
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
      <CardDashboardProfile :profile="profile" />
      <CardDashboardActivity />
      <CardDashboardNote />
      <CardDashboardRecentProject />
    </div>
  </div>
</template>
