<template>
    <div class="flex h-screen bg-gray-50">
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Header -->
            <DashboardComAgencyHeader />

            <!-- Dashboard Content -->
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                <!-- Stats Cards -->
                <DashboardComAgencyStats />

                <div class="flex items-center justify-between mb-4 mt-6">
                    <h2 class="text-xl font-semibold text-[#0F4841]">New Connection Requests (10)</h2>
                    <button class="text-base  px-3 py-2 font-medium  text-[#0F4841] ">
                        View All
                    </button>
                </div>
                <!-- DataTable Component -->
                <DataTable :data="tickets" :columns="tableColumns" :th-width="100">
                    <template #cell-action="{ row }">
                        <div class="flex gap-2">
                            <button class="bg-[#469C52] text-white px-3 py-1 rounded-full hover:bg-green-600"
                                @click="handleAction(row, 'accept')">
                                Accept
                            </button>
                            <button class=" text-[#E2522E] px-3 py-1 " @click="handleAction(row, 'reject')">
                                Reject
                            </button>
                        </div>
                    </template>
                </DataTable>

            </main>
        </div>
    </div>
</template>

<script setup>
import { DashboardComAgencyStats } from '#components';
import { definePageMeta } from '#imports';

// Page meta
definePageMeta({
    title: 'Dashboard'
})
useHead({
    meta: [
        { name: 'viewport', content: 'width=1330' }
    ]
})
const tableColumns = [
    { key: 'id', label: 'Property ID' },
    { key: 'fullName', label: 'Name & Surname', sortable: true },
    { key: 'customerCountry', label: 'Customer Country', sortable: true, type: "array-with-flags", },
    { key: 'number', label: 'Mobile Number', },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'numberMatches', label: 'Mobile  Number matches system?', sortable: true },
    { key: 'action', label: '' }
];

const tickets = ref([
    {
        id: 7023,
        fullName: 'Kathryn Murphy',
        customerCountry: [{ img: "/Spanish.svg", value: "Malta" }],
        number: '+356 79 394 592',
        type: 'Sale',
        date: '2025-08-28',
        numberMatches: 'Yes',
        action: ['accept', 'reject']
    },
    {
        id: 7023,
        fullName: 'Kathryn Murphy',
        customerCountry: [{ img: "/Spanish.svg", value: "Malta" }],
        number: '+356 79 394 592',
        type: 'Sale',
        date: '2025-08-28',
        numberMatches: 'Yes',
        action: ['accept', 'reject']
    },
    {
        id: 7023,
        fullName: 'Kathryn Murphy',
        customerCountry: [{ img: "/Spanish.svg", value: "Malta" }],
        number: '+356 79 394 592',
        type: 'Sale',
        date: '2025-08-28',
        numberMatches: 'Yes',
        action: ['accept', 'reject']
    },
    {
        id: 7023,
        fullName: 'Kathryn Murphy',
        customerCountry: [{ img: "/Spanish.svg", value: "Malta" }],
        number: '+356 79 394 592',
        type: 'Sale',
        date: '2025-08-28',
        numberMatches: 'Yes',
        action: ['accept', 'reject']
    }

]);

</script>
