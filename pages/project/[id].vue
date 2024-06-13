<script setup lang="ts">
const route = useRoute()

definePageMeta({
    layout: 'default',
    validate: async (route) => {
        // Check if the id is made up of digits
        return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
    }
})
</script>
<template>
    <div>
        This is project detail page of project ID: {{ route.params.id }}
    </div>
</template>