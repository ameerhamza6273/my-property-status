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
            <select
              class="appearance-none border border-gray-300 rounded-full pl-3 pr-6 py-1 text-sm text-gray-600 focus:outline-none"
            >
              <option>Date Period From - To</option>
            </select>

             <NuxtImg src="/dropdown-icon.svg" width="14" height="14" class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <!-- Filter Buttons -->
        <div class="flex items-center space-x-2">
          <button
            class="px-3 py-1 text-sm rounded-full bg-white border border-gray-300 hover:bg-gray-100"
          >
            Today
          </button>
          <button
            class="px-3 py-1 text-sm rounded-full bg-white border border-gray-300 hover:bg-gray-100"
          >
            This Month
          </button>
          <button
            class="px-3 py-1 text-sm rounded-full bg-white border border-gray-300 hover:bg-gray-100"
          >
            This Year
          </button>
          <button
            class="px-3 py-1 text-sm rounded-full bg-[#0F4841] text-white"
          >
            All Time
          </button>
        </div>

        <!-- Profile Dropdown -->
        <div class="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-100 p-1 text-sm rounded-full">
          <span
            class="inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-full text-xs"
          >
            9
          </span>
          <div class="relative">
            <button
              class="flex items-center space-x-1 text-gray-700 text-sm font-medium"
            >
              <span>Matt</span>
              <NuxtImg src="/dropdown-icon.svg" width="14" height="14" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
