<template>
    <div class="grid grid-cols-12 gap-4 mb-4">
        <div class="col-span-8">
            <div class="grid grid-cols-4 gap-3">
                <div class="col-span-1">
                    <div class="bg-white   rounded-2xl py-5 px-4 border border-[#D9D9D9] cursor-pointer"
                        @click="openModal('customers')">
                        <div class="flex items-center justify-center">
                            <p class="text-sm font-medium text-[#595959]">Total Customers</p>
                            <NuxtImg src="red-arrow.svg" width="16" height="16" />
                        </div>
                        <p class="text-2xl font-bold text-black text-center mt-4">6004</p>
                    </div>

                </div>
                <div class="col-span-1">
                    <div class="bg-white   rounded-2xl p-5 border border-[#D9D9D9] cursor-pointer">
                        <div class="flex items-center justify-center">
                            <p class="text-sm font-medium text-[#595959]">Total Properties</p>
                            
                        </div>
                        <p class="text-2xl font-bold text-black text-center mt-4">25342</p>
                    </div>
                </div>
                <div class="col-span-1">
                    <div class="bg-white   rounded-2xl p-5 border border-[#D9D9D9] cursor-pointer">
                        <div class="flex items-center justify-center">
                            <p class="text-sm font-medium text-[#595959]">Rental Properties</p>
                        </div>
                        <p class="text-2xl font-bold text-black text-center mt-4">4235</p>
                    </div>
                </div>
                <div class="col-span-1">
                    <div class="bg-white   rounded-2xl p-5 border border-[#D9D9D9] cursor-pointer">
                        <div class="flex items-center justify-center">
                            <p class="text-sm font-medium text-[#595959]">Sale Properties</p>
                        </div>
                        <p class="text-2xl font-bold text-black text-center mt-4">432</p>
                    </div>
                </div>
                <div class="col-span-2">
                    <div class="bg-white   rounded-2xl p-5 px-4 border border-[#D9D9D9] cursor-pointer"
                        @click="openModal('sale')">
                        <div class="flex items-center justify-center">
                            <p class="text-sm font-medium text-[#595959]">Pending Property Status Change Requests</p>
                            <NuxtImg src="red-arrow.svg" width="16" height="16" />
                        </div>
                        <p class="text-2xl font-bold text-black text-center mt-4">38</p>
                    </div>
                </div>
                <div class="col-span-2">
                    <div class="bg-white   rounded-2xl p-5 border border-[#D9D9D9] cursor-pointer"
                        @click="openModal('addition')">
                        <div class="flex items-center justify-center">
                            <p class="text-sm font-medium text-[#595959]">Pending Property  Addition Requests</p>
                            <NuxtImg src="red-arrow.svg" width="16" height="16" />
                        </div>
                        <p class="text-2xl font-bold text-black text-center mt-4">59</p>
                    </div>
                </div>

            </div>

        </div>

        <div class="border-l col-span-4 border-[#D9D9D9] pl-4">
            <div class="bg-white rounded-2xl  p-4 border border-[#D9D9D9]">
                <p class="text-sm font-medium text-[#595959] text-center mb-2">Rental Properties Overview</p>
                <div class="grid grid-cols-2 gap-4">
                    <div class="text-center">
                        <p class="text-2xl font-bold text-gray-900">45</p>
                        <p class="text-xs text-[#595959]">Available</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-bold text-gray-900">21</p>
                        <p class="text-xs text-[#595959]">Rented</p>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-2xl  p-4 px-2 border border-[#D9D9D9] mt-3">
                <p class="text-sm font-medium text-[#595959] text-center mb-2">Sale Properties Overview</p>
                <div class="grid grid-cols-3 gap-4">
                    <div class="text-center">
                        <p class="text-2xl font-bold text-gray-900">45</p>
                        <p class="text-xs text-[#595959]">Available</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-bold text-gray-900">21</p>
                        <p class="text-xs text-[#595959]">Promise of Sale</p>
                    </div>
                    <div class="text-center">
                        <p class="text-2xl font-bold text-gray-900">24</p>
                        <p class="text-xs text-[#595959]">Sold</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Component -->
        <DashboardComModalBox :is-open="isModalOpen" :modal-data="currentModalData" @close="closeModal" />
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

    sale: {
        title: 'Pending Property Status Change Requests',
        tabs: [
            {
                key: 'rental',
                label: 'Rental',
                headers: { left: 'Agency Country', middle: 'Agency', right: 'Property Listings' },
                data: [
                    { country: 'Spain', flag: '🇪🇸', agency: 'Luxury Sales', agencyLogo: '💎', customers: 150 },
                    { country: 'Italy', flag: '🇮🇹', agency: 'Premium Estates', agencyLogo: '🏛️', customers: 120 },
                    { country: 'France', flag: '🇫🇷', agency: 'Elite Realty', agencyLogo: '🏢', customers: 95 },
                    { country: 'Portugal', flag: '🇵🇹', agency: 'Prestige Properties', agencyLogo: '🏠', customers: 67 }
                ]
            },
            {
                key: 'sale',
                label: 'Sale',
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
    addition: {
        title: 'Pending Property Addition Requests',
        tabs: [
            {
                key: 'rental',
                label: 'Rental',
                headers: { left: 'Agency Country', middle: 'Agency', right: 'Property Listings' },
                data: [
                    { country: 'Spain', flag: '🇪🇸', agency: 'Luxury Sales', agencyLogo: '💎', customers: 150 },
                    { country: 'Italy', flag: '🇮🇹', agency: 'Premium Estates', agencyLogo: '🏛️', customers: 120 },
                    { country: 'France', flag: '🇫🇷', agency: 'Elite Realty', agencyLogo: '🏢', customers: 95 },
                    { country: 'Portugal', flag: '🇵🇹', agency: 'Prestige Properties', agencyLogo: '🏠', customers: 67 }
                ]
            },
            {
                key: 'sale',
                label: 'Sale',
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
