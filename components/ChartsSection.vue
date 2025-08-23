<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Listings Overview</h3>
        <select class="border border-gray-300 rounded-md px-3 py-1 text-sm">
          <option>2019</option>
        </select>
      </div>
      <div class="h-64 flex items-end justify-between space-x-2">
        <!-- Simple bar chart representation -->
        <div v-for="(height, index) in chartData1" :key="index" 
             class="bg-teal-600 rounded-t" 
             :style="`height: ${height}%; width: 8%;`">
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Customers Overview</h3>
        <select class="border border-gray-300 rounded-md px-3 py-1 text-sm">
          <option>2019</option>
        </select>
      </div>
      <div class="h-64 flex items-end justify-between space-x-2">
        <!-- Simple bar chart representation -->
        <div v-for="(height, index) in chartData2" :key="index" 
             class="bg-red-500 rounded-t" 
             :style="`height: ${height}%; width: 8%;`">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Sample chart data
const chartData1 = ref([60, 80, 90, 70, 85, 75, 95, 65, 80, 70, 60, 85])
const chartData2 = ref([70, 85, 95, 80, 90, 75, 85, 70, 95, 80, 75, 90])
</script>
