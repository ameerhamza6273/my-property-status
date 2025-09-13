<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9] " >
      <div class="flex items-start justify-center">
        <p class="text-sm font-medium text-[#595959] text-center">Pending Property Status Change Requests
         <br> (Sent by Agency)</p>
        <NuxtImg src="red-arrow.svg" width="16" height="16" class="cursor-pointer" @click="openModal('statusChange')" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">38</p>
    </div>
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9] ">
      <div class="flex items-start justify-center">
        <p class="text-sm font-medium text-[#595959] text-center">Pending Property Addition Requests
          <br>(Sent by Agency)</p>
        <NuxtImg src="red-arrow.svg" width="16" height="16" class="cursor-pointer" @click="openModal('addition')" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">59</p>
    </div>
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9] " >
      <div class="flex items-start justify-center">
        <p class="text-sm font-medium text-[#595959] text-center">Pending Connection Requests
         <br> (Sent by Customer)</p>
        <NuxtImg src="red-arrow.svg" width="16" height="16" class="cursor-pointer" @click="openModal('connection')" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">38</p>
    </div>
     <!-- Modal Component -->
    <DashboardComModalBox 
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

  statusChange: {
    title: 'Pending Property Status Change Requests',
    title2: ' (Sent by Agency)',
    tabs: [
      {
        key: 'by-agency',
        label: 'By Agency',
        headers: { left: 'Agency Country', middle: 'Agency', right: 'Number of Requests' },
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
        headers: { left: 'Agency Country', right: 'Number of Requests' },
        data: [
          { country: 'Spain', flag: '🇪🇸', customers: 180 },
          { country: 'Italy', flag: '🇮🇹', customers: 120 },
          { country: 'France', flag: '🇫🇷', customers: 90 },
          { country: 'Portugal', flag: '🇵🇹', customers: 42 }
        ]
      }
    ]
  },
  addition: {
    title: 'Pending Property Addition Requests',
    title2: ' (Sent by Agency)',
    tabs: [
      {
        key: 'by-agency',
        label: 'By Agency',
        headers: { left: 'Agency Country', middle: 'Agency', right: 'Number of Requests' },
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
        headers: { left: 'Agency Country', right: 'Number of Requests' },
        data: [
          { country: 'Spain', flag: '🇪🇸', customers: 180 },
          { country: 'Italy', flag: '🇮🇹', customers: 120 },
          { country: 'France', flag: '🇫🇷', customers: 90 },
          { country: 'Portugal', flag: '🇵🇹', customers: 42 }
        ]
      }
    ]
  },
  
  connection: {
    title: 'Pending Property Connection Requests ',
    title2: ' (Sent by Customer)',
    tabs: [
      {
        key: 'by-agency',
        label: 'By Agency',
        headers: { left: 'Agency Country', middle: 'Agency', right: 'Number of Requests' },
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
        headers: { left: 'Agency Country', right: 'Number of Requests' },
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
