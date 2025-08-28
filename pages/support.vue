<template>
    <div class="p-6">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-semibold text-gray-900">Support</h1>
        </div>

        <!-- Tab Navigation -->
        <div class="inline-flex items-center bg-white gap-1 mb-6 border border-gray rounded-full ">
            <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value" :class="[
                'px-5 py-1.5 text-sm font-medium rounded-full transition-colors',
                activeTab === tab.value
                    ? 'bg-[#0F4841] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-200'
            ]">
                {{ tab.label }}
            </button>
        </div>

        <!-- Customer Filters Section -->
        <div class="mb-4">
            <div class="bg-white rounded-xl p-5">
                <h3 class="text-base mb-3 font-semibold">Customer Filters</h3>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 ">
                    <!-- Name -->
                    <div>
                        <label class="block text-sm font-medium text-[#595959] mb-2">Name</label>
                        <input v-model="filters.name" type="text" placeholder="Type Name..."
                            class="w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] text-sm" />
                    </div>

                    <!-- Surname -->
                    <div>
                        <label class="block text-sm font-medium text-[#595959] mb-2">Surname</label>
                        <input v-model="filters.surname" type="text" placeholder="Type Surname..."
                            class="w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] text-sm" />
                    </div>

                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-medium text-[#595959] mb-2">Email</label>
                        <input v-model="filters.email" type="email" placeholder="Type Email..."
                            class="w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] text-sm" />
                    </div>

                    <!-- Country -->
                    <div>
                        <label class="block text-sm font-medium text-[#595959] mb-2">Country</label>
                        <Tailwinddropdown v-model="filters.country" placeholder="Select Country"
                            :options="countryOptions" />

                    </div>

                    <!-- Mobile Number -->
                    <div>
                        <label class="block text-sm font-medium text-[#595959] mb-2">Mobile Number</label>
                        <div class="flex items-center w-full border border-gray-300 rounded-full bg-[#F8F8F8] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] px-3"
                            style="height: 38px;">
                            <select v-model="filters.countryCode"
                                class="bg-transparent outline-none text-gray-600 text-sm mr-2">
                                <option>+356</option>
                                <option>+91</option>
                                <option>+92</option>
                            </select>
                            <input v-model="filters.mobileNumber" type="number" placeholder="Type Mobile Number.."
                                class="text-sm w-full outline-none bg-transparent border-l border-gray-300 pl-2" />
                        </div>

                    </div>

                    <!-- Gender -->
                    <div>
                        <label class="block text-sm font-medium text-[#595959] mb-2">Gender</label>
                        <Tailwinddropdown v-model="filters.gender" placeholder="Select Country"
                            :options="genderOptions" />
                    </div>

                    <!-- DOB -->
                    <div>
                        <label class="block text-sm font-medium text-[#595959] mb-2">DOB (dd/mm/yyyy)</label>
                        <input v-model="filters.dob" type="date"
                            class="w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] text-sm" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Filtering Section -->
        <div class="mb-6">
            <div class="flex items-center flex-wrap gap-2">
                <span class="text-sm font-medium text-black">Filtered by:</span>

                <div v-for="filter in activeFilters" :key="filter.key"
                    class="inline-flex items-center gap-2 px-2 py-1 bg-white rounded-full text-xs border border-[#D9D9D9]">
                    <!-- Optional color indicators based on key -->
                    <span v-if="filter.key === 'country'" class="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span v-else-if="filter.key === 'gender'" class="w-2 h-2 bg-blue-500 rounded-full"></span>

                    <!-- Filter Label -->
                    <span class="text-[#595959]">{{ filter.label }}</span>

                    <!-- Filter Count -->
                    <span v-if="filter.count"
                        class="bg-[#F2F2F2] text-[#595959] px-1 rounded-full text-[10px] font-medium">
                        {{ filter.count }}
                    </span>

                    <!-- Remove Button -->
                    <button @click="removeFilter(filter.key)" class="text-gray-500 hover:text-gray-700">
                        <NuxtImg src="filter-cros-Icon.svg" width="14" height="14" />
                    </button>
                </div>
            </div>
        </div>


        <!-- Results Count -->
        <div class="mb-4">
            <p class="text-sm text-[#0F4841] font-semibold">{{ filteredTickets.length }} Results</p>
        </div>

        <!-- DataTable Component -->
        <DataTable :data="filteredTickets" :columns="tableColumns" :initial-items-per-page="10"
            @sort-change="handleSortChange" @page-change="handlePageChange" />
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const activeTab = ref('new');

const tabs = [
    { value: 'new', label: 'New' },
    { value: 'open', label: 'Open' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'all', label: 'All' }
];
const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
];


const tickets = ref([
    {
        id: 7023,
        name: 'Kathryn',
        surname: 'Murphy',
        fullName: 'Kathryn Murphy',
        subject: 'Login not working after password reset',
        status: 'New',
        date: '2025-08-28',
        openedBy: 'Sarah M.',
        email: 'kathryn@example.com',
        country: 'Malta',
        mobile: '+356 99123456',
        gender: 'female',
        dob: '1990-05-15'
    },
    {
        id: 7024,
        name: 'Ronald',
        surname: 'Richards',
        fullName: 'Ronald Richards',
        subject: 'Error 500 when uploading product images',
        status: 'New',
        date: '2025-08-28',
        openedBy: 'Ahmed K.',
        email: 'ronald@example.com',
        country: 'USA',
        mobile: '+1 555123456',
        gender: 'male',
        dob: '1985-12-03'
    },
    {
        id: 7025,
        name: 'Courtney',
        surname: 'Henry',
        fullName: 'Courtney Henry',
        subject: 'Unable to generate monthly sales report',
        status: 'New',
        date: '2025-08-28',
        openedBy: 'John D.',
        email: 'courtney@example.com',
        country: 'UK',
        mobile: '+44 7123456789',
        gender: 'female',
        dob: '1992-08-20'
    },
    {
        id: 7026,
        name: 'Cameron',
        surname: 'Williamson',
        fullName: 'Cameron Williamson',
        subject: 'Malignment issue on mobile checkout page',
        status: 'New',
        date: '2025-08-28',
        openedBy: 'Emily R.',
        email: 'cameron@example.com',
        country: 'Canada',
        mobile: '+1 416123456',
        gender: 'male',
        dob: '1988-03-10'
    }
]);

const countryOptions = [
    { value: 'Malta', label: 'Malta' },
    { value: 'USA', label: 'USA' },
    { value: 'UK', label: 'UK' },
    { value: 'Canada', label: 'Canada' }
];

const filters = ref({
    name: '',
    surname: '',
    email: '',
    country: '',
    countryCode: '+356',
    mobileNumber: '',
    gender: '',
    dob: ''
});

const tableColumns = [
    { key: 'id', label: 'Ticket ID', sortable: true },
    { key: 'fullName', label: 'Name & Surname', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'openedBy', label: 'Opened by', sortable: true }
];

const filteredTickets = computed(() => {
    let result = [...tickets.value];

    // Filter by tab
    if (activeTab.value !== 'all') {
        const statusMap = {
            'new': 'New',
            'open': 'Open',
            'resolved': 'Resolved'
        };
        result = result.filter(ticket => ticket.status === statusMap[activeTab.value]);
    }

    // Apply customer filters
    if (filters.value.name) {
        result = result.filter(ticket =>
            ticket.name.toLowerCase().includes(filters.value.name.toLowerCase())
        );
    }

    if (filters.value.surname) {
        result = result.filter(ticket =>
            ticket.surname.toLowerCase().includes(filters.value.surname.toLowerCase())
        );
    }

    if (filters.value.email) {
        result = result.filter(ticket =>
            ticket.email.toLowerCase().includes(filters.value.email.toLowerCase())
        );
    }

    if (filters.value.country) {
        result = result.filter(ticket => ticket.country === filters.value.country);
    }

    if (filters.value.mobileNumber) {
        result = result.filter(ticket =>
            ticket.mobile.includes(filters.value.mobileNumber)
        );
    }

    if (filters.value.gender) {
        result = result.filter(ticket => ticket.gender === filters.value.gender);
    }

    if (filters.value.dob) {
        result = result.filter(ticket => ticket.dob === filters.value.dob);
    }

    return result;
});

const activeFilters = computed(() => {
    const active = [];

    if (filters.value.name) {
        active.push({
            key: 'name',
            label: `Name: ${filters.value.name}`,
            count: filteredTickets.value.length
        });
    }

    if (filters.value.country) {
        active.push({
            key: 'country',
            label: `Country: ${filters.value.country}`,
            count: filteredTickets.value.length
        });
    }

    if (filters.value.gender) {
        active.push({
            key: 'gender',
            label: `Gender: ${filters.value.gender}`,
            count: filteredTickets.value.length
        });
    }

    return active;
});

const removeFilter = (filterKey) => {
    filters.value[filterKey] = '';
};

const handleSortChange = (sortData) => {
    console.log('[v0] Sort changed:', sortData);
    // Handle sorting logic here
};

const handlePageChange = (pageData) => {
    console.log('[v0] Page changed:', pageData);
    // Handle pagination logic here
};

defineExpose({ filters, activeTab });
</script>
