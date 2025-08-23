<template>
  <div class="flex h-screen">
    <!-- Sidebar: Show only on dashboard routes -->
    <div v-if="showSidebar" class="w-[18%] h-screen">
      <DashboardSidebar />
    </div>
    
    <!-- Main Content -->
    <div :class="showSidebar ? 'w-[82%] h-screen overflow-y-auto' : 'w-full h-screen overflow-y-auto'">
      <NuxtPage />
    </div>
  </div>
</template>
<script setup>
import { useHead, useRoute } from '#app'

useHead({
  title: 'Property Management Dashboard',
  meta: [
    { name: 'description', content: 'Professional property management dashboard' }
  ]
})

const route = useRoute()

// Show sidebar on all pages EXCEPT homepage ("/")
const showSidebar = computed(() => route.path !== '/')
</script>
