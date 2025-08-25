<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9] cursor-pointer" @click="openModal('customers')">
      <div class="flex items-center justify-center">
        <p class="text-sm font-medium text-[#595959]">Total Customers</p>
        <NuxtImg src="red-arrow.svg" width="16" height="16" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">6004</p>
    </div>
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9] cursor-pointer" @click="openModal('properties')">
      <div class="flex items-center justify-center">
        <p class="text-sm font-medium text-[#595959]">Total Properties</p>
        <NuxtImg src="red-arrow.svg" width="16" height="16" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">25342</p>
    </div>
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9] cursor-pointer" @click="openModal('rental')">
      <div class="flex items-center justify-center">
        <p class="text-sm font-medium text-[#595959]">Rental Properties</p>
        <NuxtImg src="red-arrow.svg" width="16" height="16" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">4235</p>
    </div>
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9] cursor-pointer" @click="openModal('sale')">
      <div class="flex items-center justify-center">
        <p class="text-sm font-medium text-[#595959]">Sale Properties</p>
        <NuxtImg src="red-arrow.svg" width="16" height="16" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">432</p>
    </div>
      <!-- Modal Component -->
    <DashboardModal 
      :is-open="isModalOpen" 
      :modal-data="currentModalData"
      @close="closeModal"
    />
  </div>
</template>


<script setup>
import { ref } from 'vue'

const isModalOpen = ref(false)
const currentModalData = ref({})

const modalData = {
  customers: {
    title: 'Total Customer Demographics',
    data: [
      { country: 'Malta', flag: '🇲🇹', customers: 4500 },
      { country: 'Sweden', flag: '🇸🇪', customers: 2310 },
      { country: 'Italy', flag: '🇮🇹', customers: 1243 },
      { country: 'Spain', flag: '🇪🇸', customers: 12405 },
      { country: 'France', flag: '🇫🇷', customers: 8920 },
      { country: 'Germany', flag: '🇩🇪', customers: 15670 },
      { country: 'Portugal', flag: '🇵🇹', customers: 3450 }
    ]
  },
  properties: {
    title: 'Total Properties',
    tabs: [
      {
        key: 'by-agency',
        label: 'By Agency',
        headers: { left: 'Agency Country', middle: 'Agency', right: 'Property Listings' },
        data: [
          { country: 'Malta', flag: '🇲🇹', agency: 'Remax', agencyLogo: '🏢', customers: 4500 },
          { country: 'Sweden', flag: '🇸🇪', agency: 'Alliance', agencyLogo: '🏛️', customers: 2310 },
          { country: 'Italy', flag: '🇮🇹', agency: 'Quicklets', agencyLogo: '🏠', customers: 1243 },
          { country: 'Spain', flag: '🇪🇸', agency: 'Remax', agencyLogo: '🏢', customers: 12405 },
          { country: 'Spain', flag: '🇪🇸', agency: 'Remax', agencyLogo: '🏢', customers: 12405 },
          { country: 'Spain', flag: '🇪🇸', agency: 'Remax', agencyLogo: '🏢', customers: 12405 },
          { country: 'Spain', flag: '🇪🇸', agency: 'Remax', agencyLogo: '🏢', customers: 12405 },
          { country: 'Spain', flag: '🇪🇸', agency: 'Remax', agencyLogo: '🏢', customers: 12405 }
        ]
      },
      {
        key: 'by-country',
        label: 'By Country',
        headers: { left: 'Country', right: 'Properties' },
        data: [
          { country: 'Malta', flag: '🇲🇹', customers: 4500 },
          { country: 'Sweden', flag: '🇸🇪', customers: 2310 },
          { country: 'Italy', flag: '🇮🇹', customers: 1243 },
          { country: 'Spain', flag: '🇪🇸', customers: 12405 },
          { country: 'Spain', flag: '🇪🇸', customers: 12405 },
          { country: 'Spain', flag: '🇪🇸', customers: 12405 },
          { country: 'Spain', flag: '🇪🇸', customers: 12405 },
          { country: 'Spain', flag: '🇪🇸', customers: 12405 }
        ]
      }
    ]
  },
  rental: {
    title: 'Rental Properties',
    tabs: [
      {
        key: 'by-agency',
        label: 'By Agency',
        headers: { left: 'Agency Country', middle: 'Agency', right: 'Property Listings' },
        data: [
          { country: 'Spain', flag: '🇪🇸', agency: 'Prime Rentals', agencyLogo: '🏢', customers: 800 },
          { country: 'Italy', flag: '🇮🇹', agency: 'Elite Properties', agencyLogo: '🏛️', customers: 650 },
          { country: 'France', flag: '🇫🇷', agency: 'Urban Living', agencyLogo: '🏠', customers: 420 },
          { country: 'Portugal', flag: '🇵🇹', agency: 'Coastal Homes', agencyLogo: '🏖️', customers: 280 }
        ]
      },
      {
        key: 'by-country',
        label: 'By Country',
        headers: { left: 'Country', right: 'Properties' },
        data: [
          { country: 'Spain', flag: '🇪🇸', customers: 1800 },
          { country: 'Italy', flag: '🇮🇹', customers: 1200 },
          { country: 'France', flag: '🇫🇷', customers: 900 },
          { country: 'Portugal', flag: '🇵🇹', customers: 335 }
        ]
      }
    ]
  },
  sale: {
    title: 'Sale Properties',
    tabs: [
      {
        key: 'by-agency',
        label: 'By Agency',
        headers: { left: 'Agency Country', middle: 'Agency', right: 'Property Listings' },
        data: [
          { country: 'Spain', flag: '🇪🇸', agency: 'Luxury Sales', agencyLogo: '💎', customers: 150 },
          { country: 'Italy', flag: '🇮🇹', agency: 'Premium Estates', agencyLogo: '🏛️', customers: 120 },
          { country: 'France', flag: '🇫🇷', agency: 'Elite Realty', agencyLogo: '🏢', customers: 95 },
          { country: 'Portugal', flag: '🇵🇹', agency: 'Prestige Properties', agencyLogo: '🏠', customers: 67 }
        ]
      },
      {
        key: 'by-country',
        label: 'By Country',
        headers: { left: 'Country', right: 'Properties' },
        data: [
          { country: 'Spain', flag: '🇪🇸', customers: 180 },
          { country: 'Italy', flag: '🇮🇹', customers: 120 },
          { country: 'France', flag: '🇫🇷', customers: 90 },
          { country: 'Portugal', flag: '🇵🇹', customers: 42 }
        ]
      }
    ]
  },
}

const openModal = (type) => {
  currentModalData.value = modalData[type]
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  currentModalData.value = {}
}
</script>
