<template>
  <div class="flex h-screen bg-gray-50">
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <DashboardHeader />
      
      <!-- Dashboard Content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
        <!-- Stats Cards -->
        <StatsCards />
        <StatusCards />
        <OverviewCards />
        <ChartsSection />
      </main>
    </div>
  </div>
</template>

<script setup>
import { definePageMeta } from '#imports';

// Page meta
definePageMeta({
  title: 'Dashboard'
})
</script>
