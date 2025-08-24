<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9] cursor-pointer" @click="openModal('statusChange')">
      <div class="flex items-start justify-center">
        <p class="text-sm font-medium text-[#595959] text-center">Pending Property Status Change Requests
          (Sent by Agency)</p>
        <NuxtImg src="red-arrow.svg" width="16" height="16" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">38</p>
    </div>
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9] cursor-pointer" @click="openModal('addition')">
      <div class="flex items-start justify-center">
        <p class="text-sm font-medium text-[#595959] text-center">Pending Property Addition Requests
          (Sent by Agency)</p>
        <NuxtImg src="red-arrow.svg" width="16" height="16" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">59</p>
    </div>
    <div class="bg-white rounded-2xl p-4 border border-[#D9D9D9] cursor-pointer" @click="openModal('connection')">
      <div class="flex items-start justify-center">
        <p class="text-sm font-medium text-[#595959] text-center">Pending Connection Requests
          (Sent by Customer)</p>
        <NuxtImg src="red-arrow.svg" width="16" height="16" />
      </div>
      <p class="text-2xl font-bold text-black text-center mt-2">38</p>
    </div>
     <!-- Modal Component -->
    <DemographicsModal 
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
    title: 'Pending Status Change Requests',
    data: [
      { country: 'Spain', flag: '🇪🇸', customers: 15 },
      { country: 'Italy', flag: '🇮🇹', customers: 12 },
      { country: 'France', flag: '🇫🇷', customers: 8 },
      { country: 'Portugal', flag: '🇵🇹', customers: 3 }
    ]
  },
  addition: {
    title: 'Pending Addition Requests',
    data: [
      { country: 'Spain', flag: '🇪🇸', customers: 25 },
      { country: 'Italy', flag: '🇮🇹', customers: 18 },
      { country: 'France', flag: '🇫🇷', customers: 12 },
      { country: 'Portugal', flag: '🇵🇹', customers: 4 }
    ]
  },
  connection: {
    title: 'Pending Connection Requests',
    data: [
      { country: 'Spain', flag: '🇪🇸', customers: 16 },
      { country: 'Italy', flag: '🇮🇹', customers: 11 },
      { country: 'France', flag: '🇫🇷', customers: 8 },
      { country: 'Portugal', flag: '🇵🇹', customers: 3 }
    ]
  }
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
