<script lang="ts" setup>
definePageMeta({
  layout: 'workspace',
  middleware: 'auth',
})

const mockProfile = {
  avatarUrl: '',
  firstName: 'Pitikorn',
  lastName: 'Chulitawong',
  surName: 'Beam',
  occupation: { label: 'Student', value: 'student' },
  organization: { label: 'KMUTT', value: 'kmutt' },
  faculty: { label: 'คณะวิทยาศาสตร์', value: '3' },
  department: { label: 'สายวิชาเทคโนโลยีวัสดุ', value: '35' },
  expertises: [
    { label: '1st gen biofuels', value: '1' },
    { label: '2st gen biofuels', value: '2' },
  ],
}
</script>

<template>
  <div class="min-h-screen">
    <div class="grid gap-5 grid-cols-1 lg:grid-cols-[400px,1fr]">
      <CardDashboardProfile v-bind="mockProfile" />
      <CardDashboardActivity />
      <CardDashboardNote />
      <CardDashboardRecentProject />
    </div>
  </div>
</template>
