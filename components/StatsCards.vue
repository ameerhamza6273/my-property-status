import { NuxtImg } from '../.nuxt/components';
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]">
      <div class="flex items-center justify-center">
        <p class="text-sm font-medium text-[#595959]">Total Customers</p>
        <NuxtImg src="red-arrow.svg" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">6004</p>
    </div>
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]">
      <div class="flex items-center justify-center">
        <p class="text-sm font-medium text-[#595959]">Total Properties</p>
        <NuxtImg src="red-arrow.svg" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">25342</p>
    </div>
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]">
      <div class="flex items-center justify-center">
        <p class="text-sm font-medium text-[#595959]">Rental Properties</p>
        <NuxtImg src="red-arrow.svg" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">4235</p>
    </div>
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9]">
      <div class="flex items-center justify-center">
        <p class="text-sm font-medium text-[#595959]">Sale Properties</p>
        <NuxtImg src="red-arrow.svg" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">432</p>
    </div>
  </div>
</template>
