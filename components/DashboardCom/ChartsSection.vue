<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="bg-white rounded-2xl shadow-sm p-3 pb-10 border border-gray-200">
      <div class="flex items-center justify-between mb-6 pb-3 border-b border-[#D9D9D9]">
        <h3 class="text-lg font-semibold text-gray-900">Listings Overview</h3>
        <select class="border border-[#D9D9D9] rounded-full px-2 py-1 text-sm bg-white focus:ring-1 focus:ring-gray-500 focus:border-gray-500">
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>
      
      <!-- Chart Container -->
      <div class="relative h-64">
        <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
          <span>25</span>
          <span>20</span>
          <span>15</span>
          <span>10</span>
          <span>5</span>
          <span>0</span>
        </div>
        <div class="ml-8 h-full flex items-end justify-between space-x-1">
          <div v-for="(value, index) in listingsData" :key="index" 
               class="bg-[#0F4841] rounded-full transition-all duration-300 hover:bg-teal-700 flex-1 max-w-[24px]" 
               :style="`height: ${(value / 25) * 100}%`">
          </div>
        </div>
        <div class="ml-8 mt-2 flex justify-between text-xs text-gray-500">
          <span v-for="month in months" :key="month">{{ month }}</span>
        </div>
      </div>
    </div>
    
   <div class="bg-white rounded-2xl shadow-sm p-3 pb-10 border border-gray-200">
      <div class="flex items-center justify-between mb-6 pb-3 border-b border-[#D9D9D9]">
        <h3 class="text-lg font-semibold text-gray-900">Customers Overview</h3>
        <select class="border border-[#D9D9D9] rounded-full px-2 py-1 text-sm bg-white  focus:ring-1 focus:ring-gray-500 focus:border-gray-500">
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>     
      
      <!-- Chart Container -->
      <div class="relative h-64">
        <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
          <span>25</span>
          <span>20</span>
          <span>15</span>
          <span>10</span>
          <span>5</span>
          <span>0</span>
        </div>
        <div class="ml-8 h-full flex items-end justify-between space-x-1">
          <div v-for="(value, index) in customersData" :key="index" 
               class="bg-[#E2522E] rounded-full transition-all duration-300 hover:bg-red-600 flex-1 max-w-[24px]" 
               :style="`height: ${(value / 25) * 100}%`">
          </div>
        </div>
        
        <div class="ml-8 mt-2 flex justify-between text-xs text-gray-500">
          <span v-for="month in months" :key="month">{{ month }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Month labels
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const listingsData = ref([18, 19, 22, 18, 24, 13, 20, 11, 23, 12, 15, 20]);
const customersData = ref([17, 18, 22, 18, 25, 14, 20, 23, 13, 16, 20, 19]);
</script>
