<template>
  <header class="bg-gray-50 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Left: Greeting -->
      <div>
        <h1 class="text-lg font-bold text-black">
          Good Morning, <span class="text-[#0F4841]">Matt!</span>
        </h1>
        <p class="text-sm text-gray-500">
          Ready to manage or list your properties?
        </p>
      </div>

      <!-- Right: Filters & Profile -->
      <div class="flex items-center space-x-3">
        <!-- Filter By -->
        <div class="flex items-center space-x-2">
          <span class="text-sm text-black">Filter By : </span>
          <div class="relative">
            <Tailwinddropdown
              button-class="py-1 bg-white border border-gray-300 text-sm rounded-full"
              placeholder="Date Period From - To"
              :options="datePeriod"
            />
          </div>
        </div>

        <!-- Filter Buttons -->
        <div class="flex items-center space-x-2">
          <button
            v-for="btn in filterButtons"
            :key="btn.value"
            @click="activeFilter = btn.value"
            class="px-3 py-1 text-sm rounded-full border transition"
            :class="[
              activeFilter === btn.value
                ? 'bg-[#0F4841] text-white border-[#0F4841]'
                : 'bg-white border-gray-300 hover:bg-gray-100 text-black'
            ]"
          >
            {{ btn.label }}
          </button>
        </div>

        <!-- Profile Dropdown -->
        <Tailwinddropdown
          v-model="selectedProfile"
          :options="profileOptions"
          button-class="bg-white p-1"
          dropdownMinWidth="min-w-[140px]"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const datePeriod = [
  { value: "Date Period 5 - 10", label: "Date Period 5 - 10" },
  { value: "Date Period From - To", label: "Date Period From - To" },
];

const profileOptions = [
  { value: "all contories", label: "All Contories", img: "all-cont-icon.svg" },
  { value: "malta", label: "Malta", img: "Spanish.svg" },
  { value: "italy", label: "Italy", img: "Spanish.svg" },
  { value: "france", label: "France", img: "Spanish.svg" },
  { value: "germany", label: "Germany", img: "Spanish.svg" },
];


// ✅ Filter buttons config
const filterButtons = [
  { value: "today", label: "Today" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
  { value: "all", label: "All Time" },
];

// ✅ Active filter state (default: All Time)
const activeFilter = ref("all");

const selectedProfile = ref(profileOptions[0]);
</script>
