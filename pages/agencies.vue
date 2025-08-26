<template>
    <div class="p-6 ">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-semibold text-gray-900">Agencies</h1>
            <button
                class="flex text-sm items-center gap-2 px-3 py-2 bg-[#0F4841] text-white rounded-full hover:bg-teal-700 transition-colors">
                <NuxtImg src="plus-circle.svg" width="16" height="16" />
                Add New Agency
            </button>
        </div>


        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 border border-[#D9D9D9] bg-white rounded-xl p-6">
            <!-- Agency Name -->
            <div>
                <label class="block text-sm font-medium text-[#595959] mb-2">
                    Agency Name
                </label>
                <Tailwinddropdown v-model="filters.agencyName" placeholder="Select Country"
                    :options="agencyNameOptions" />

            </div>

            <!-- Agency Country -->
            <div>
                <label class="block text-sm font-medium text-[#595959] mb-2">
                    Agency Country
                </label>
                 <Tailwinddropdown v-model="filters.agencyCountry" placeholder="Select Country"
                    :options="agencyCountryOptions" />
                
            </div>

            <!-- Admin Users -->
            <div>
                <label class="block text-sm font-medium text-[#595959] mb-2">
                    Admin Users
                </label>
                <div
                    class="flex w-full px-2 py-1.5 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <select v-model="filters.adminUsersOperator" class=" px-2 rounded-full ">
                        <option value="=">=</option>
                        <option value=">">></option>
                        <option value="<">
                            < </option>
                    </select>
                    <input v-model="filters.adminUsers" type="number" placeholder="Type Number..."
                        class="flex-1 bg-[#F8F8F8] pl-2 text-sm " />
                </div>
            </div>

            <!-- Total Connected Properties -->
            <div>
                <label class="block text-sm font-medium text-[#595959] mb-2">
                    Total Connected Properties
                </label>
                <div
                    class="flex w-full px-2 py-1.5 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <select v-model="filters.connectedPropertiesOperator" class=" px-2 rounded-full ">
                        <option value="=">=</option>
                        <option value=">">></option>
                        <option value="<">
                            < </option>
                    </select>
                    <input v-model="filters.connectedProperties" type="number" placeholder="Type Number..."
                        class="flex-1 bg-[#F8F8F8] pl-2 text-sm " />
                </div>
            </div>

            <!-- Rental Properties -->
            <div>
                <label class="block text-sm font-medium text-[#595959] mb-2">
                    Rental Properties
                </label>
                <div
                    class="flex w-full px-2 py-1.5 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <select v-model="filters.rentalPropertiesOperator" class=" px-2 rounded-full ">
                        <option value="=">=</option>
                        <option value=">">></option>
                        <option value="<">
                            < </option>
                    </select>
                    <input v-model="filters.rentalProperties" type="number" placeholder="Type Number..."
                        class="flex-1 bg-[#F8F8F8] pl-2 text-sm " />
                </div>
            </div>

            <!-- Sale Properties -->
            <div>
                <label class="block text-sm font-medium text-[#595959] mb-2">
                    Sale Properties
                </label>
                <div
                    class="flex w-full px-2 py-1.5 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <select v-model="filters.salePropertiesOperator" class=" px-2 rounded-full ">
                        <option value="=">=</option>
                        <option value=">">></option>
                        <option value="<">
                            < </option>
                    </select>
                    <input v-model="filters.saleProperties" type="number" placeholder="Type Number..."
                        class="flex-1 bg-[#F8F8F8] pl-2 text-sm " />
                </div>
            </div>
        </div>

        <!-- Active Filters -->
        <div v-if="activeFilters.length > 0">
            <div class="flex items-center flex-wrap gap-2">
                <span class="text-sm font-medium text-gray-700">Filtered by:</span>
                <div v-for="filter in activeFilters" :key="filter.key"
                    class="inline-flex items-center gap-2 px-2 py-1 bg-white rounded-full text-xs border border-[#D9D9D9]">
                    <span v-if="filter.type === 'country'" class="w-2 h-2 bg-red-500 rounded-full "></span>
                    <span v-else-if="filter.type === 'agency'" class="w-2 h-2 bg-blue-500 rounded-full "></span>
                    <span>{{ filter.label }}</span>
                    <button @click="removeFilter(filter.key)" class="text-gray-500 hover:text-gray-700">
                        <NuxtImg src="filter-cros-Icon.svg" width="14" height="14" />
                    </button>
                </div>
            </div>
        </div>



        <!-- Results Count -->
        <div class="my-4">
            <p class="text-sm text-[#0F4841] font-semibold">{{ filteredUsers.length }} Results</p>
        </div>

        <!-- Users Table -->
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full min-w-[900px]">
                    <!-- Table Header -->
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div class="flex items-center gap-1 cursor-pointer" @click="toggleSort('agency')">
                                    <span>Agency</span>
                                    <NuxtImg :src="getSortIcon('agency')" width="16" height="16" />
                                </div>
                            </th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div class="flex items-center gap-1 cursor-pointer"
                                    @click="toggleSort('agencyCountry')">
                                    <span>Agency Country</span>
                                    <NuxtImg :src="getSortIcon('agencyCountry')" width="16" height="16" />
                                </div>
                            </th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div class="flex items-center gap-1 cursor-pointer" @click="toggleSort('adminUsers')">
                                    <span>Admin Users</span>
                                    <NuxtImg :src="getSortIcon('adminUsers')" width="16" height="16" />
                                </div>
                            </th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div class="flex items-center gap-1 cursor-pointer"
                                    @click="toggleSort('totalConnectedProperties')">
                                    <span>Total Connected Properties</span>
                                    <NuxtImg :src="getSortIcon('totalConnectedProperties')" width="16" height="16" />
                                </div>
                            </th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div class="flex items-center gap-1 cursor-pointer"
                                    @click="toggleSort('rentalProperties')">
                                    <span>Rental Properties</span>
                                    <NuxtImg :src="getSortIcon('rentalProperties')" width="16" height="16" />
                                </div>
                            </th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div class="flex items-center gap-1 cursor-pointer"
                                    @click="toggleSort('saleProperties')">
                                    <span>Sale Properties</span>
                                    <NuxtImg :src="getSortIcon('saleProperties')" width="16" height="16" />
                                </div>
                            </th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div class="flex items-center gap-1 cursor-pointer" @click="toggleSort('apiKey')">
                                    <span>API Key</span>
                                    <NuxtImg :src="getSortIcon('apiKey')" width="16" height="16" />
                                </div>
                            </th>
                            <th class="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            </th>
                        </tr>
                    </thead>


                    <!-- Table Body -->
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <div v-for="item in user.agency" :key="item.value"
                                        class="flex items-center space-x-1">
                                        <img :src="item.img" alt="agency" class="w-5 h-5" />
                                        <span class="text-sm font-medium text-black">{{ item.value }}</span>
                                    </div>
                                </div>
                            </td>

                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <div v-for="item in user.agencyCountry" :key="item.value"
                                        class="flex items-center space-x-1">
                                        <img :src="item.img" alt="country" class="w-5 h-5" />
                                        <span class="text-sm font-medium text-black">{{ item.value }}</span>
                                    </div>
                                </div>
                            </td>

                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="text-sm font-medium text-black">{{ user.adminUsers }}</div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="text-sm text-black">{{ user.totalConnectedProperties }}</div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="text-sm text-black">{{ user.rentalProperties }}</div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="text-sm text-black">{{ user.saleProperties }}</div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="text-sm text-black">{{ user.apiKey }}</div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap text-right">
                                <button
                                    class="inline-flex items-center gap-1 px-3 py-1 text-sm text-[#E2522E] hover:text-red-700">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue";

interface User {
    id: number;
    agency: Array<{ img: string; value: string }>;
    agencyCountry: Array<{ img: string; value: string }>;
    adminUsers: number;
    totalConnectedProperties: number;
    rentalProperties: number;
    saleProperties: number;
    apiKey: string;
}

const users = ref<User[]>([
    {
        id: 1,
        agency: [{ img: "Spanish.svg", value: "Remax" }],
        agencyCountry: [{ img: "Spanish.svg", value: "Malta" }],
        adminUsers: 5,
        totalConnectedProperties: 3249,
        rentalProperties: 2000,
        saleProperties: 1249,
        apiKey: "API_KEY_XY12345..",
    },
    {
        id: 2,
        agency: [{ img: "Spanish.svg", value: "Alliance" }],
        agencyCountry: [{ img: "Spanish.svg", value: "Sweden" }],
        adminUsers: 3,
        totalConnectedProperties: 1500,
        rentalProperties: 800,
        saleProperties: 700,
        apiKey: "API_KEY_XY67890..",
    },
    {
        id: 3,
        agency: [{ img: "Spanish.svg", value: "Century 21" }],
        agencyCountry: [{ img: "Spanish.svg", value: "USA" }],
        adminUsers: 6,
        totalConnectedProperties: 2000,
        rentalProperties: 1200,
        saleProperties: 800,
        apiKey: "API_KEY_XY11223..",
    },
    {
        id: 4,
        agency: [{ img: "Spanish.svg", value: "Remax" }],
        agencyCountry: [{ img: "Spanish.svg", value: "Malta" }],
        adminUsers: 5,
        totalConnectedProperties: 3249,
        rentalProperties: 2000,
        saleProperties: 1249,
        apiKey: "API_KEY_XY12345..",
    },
    {
        id: 5,
        agency: [{ img: "Spanish.svg", value: "Alliance" }],
        agencyCountry: [{ img: "Spanish.svg", value: "Sweden" }],
        adminUsers: 3,
        totalConnectedProperties: 1500,
        rentalProperties: 800,
        saleProperties: 700,
        apiKey: "API_KEY_XY67890..",
    }
]);

const agencyCountryOptions = [
    { value: 'Malta', label: 'Malta' },
    { value: 'USA', label: 'USA' },
    { value: 'UK', label: 'UK' }
]
const agencyNameOptions = [
    { value: 'Remax', label: 'Remax' },
    { value: 'Century', label: 'Century' },
    { value: 'Coldwell', label: 'Coldwell' },
]

const filters = ref({
    agencyName: '',
    agencyCountry: '',
    adminUsers: '',
    adminUsersOperator: '=',
    connectedProperties: '',
    connectedPropertiesOperator: '=',
    rentalProperties: '',
    rentalPropertiesOperator: '=',
    saleProperties: '',
    salePropertiesOperator: '='
});

const sortColumn = ref<string | null>(null);
const sortOrder = ref<"asc" | "desc" | null>(null);

const toggleSort = (column: string) => {
    if (sortColumn.value !== column) {
        sortColumn.value = column;
        sortOrder.value = "asc";
    } else {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    }
};



const getSortIcon = (column: string) => {
    if (sortColumn.value !== column || !sortOrder.value) {
        return "switch-vertical.svg"; // Default icon
    }
    return "export-switch-vertical.svg"; // Use different icons if you want for asc/desc
};

// ✅ Apply filters & sorting
const filteredUsers = computed(() => {
    let result = [...users.value];

    // Agency Name filter
    if (filters.value.agencyName) {
        result = result.filter(u => u.agency.some(a => a.value.toLowerCase() === filters.value.agencyName.toLowerCase()));
    }

    // Agency Country filter
    if (filters.value.agencyCountry) {
        result = result.filter(u => u.agencyCountry.some(c => c.value.toLowerCase() === filters.value.agencyCountry.toLowerCase()));
    }

    // Numeric filters with operator
    const applyNumericFilter = (key: keyof User, value: string, operator: string) => {
        if (!value) return;
        const num = Number(value);
        if (operator === "=") result = result.filter(u => u[key] === num);
        else if (operator === ">") result = result.filter(u => u[key] > num);
        else if (operator === "<") result = result.filter(u => u[key] < num);
    };

    applyNumericFilter("adminUsers", filters.value.adminUsers, filters.value.adminUsersOperator);
    applyNumericFilter("totalConnectedProperties", filters.value.connectedProperties, filters.value.connectedPropertiesOperator);
    applyNumericFilter("rentalProperties", filters.value.rentalProperties, filters.value.rentalPropertiesOperator);
    applyNumericFilter("saleProperties", filters.value.saleProperties, filters.value.salePropertiesOperator);

    // Sorting logic
    if (sortColumn.value && sortOrder.value) {
        result.sort((a, b) => {
            let valA: string | number = "";
            let valB: string | number = "";
            if (sortColumn.value === "agency") {
                valA = a.agency[0].value;
                valB = b.agency[0].value;
            } else if (sortColumn.value === "agencyCountry") {
                valA = a.agencyCountry[0].value;
                valB = b.agencyCountry[0].value;
            } else {
                valA = a[sortColumn.value as keyof User] as any;
                valB = b[sortColumn.value as keyof User] as any;
            }

            if (typeof valA === "number" && typeof valB === "number") {
                return sortOrder.value === "asc" ? valA - valB : valB - valA;
            }
            return sortOrder.value === "asc"
                ? String(valA).localeCompare(String(valB))
                : String(valB).localeCompare(String(valA));
        });
    }

    return result;
});

// ✅ Active filters pills
// Active filters pills
const activeFilters = computed(() => {
    const active = [];

    if (filters.value.agencyCountry) {
        active.push({ key: 'agencyCountry', type: 'country', label: filters.value.agencyCountry });
    }
    if (filters.value.agencyName) {
        active.push({ key: 'agencyName', type: 'agency', label: filters.value.agencyName });
    }

    // ✅ Add field name before numeric filters
    if (filters.value.adminUsers) {
        active.push({
            key: 'adminUsers',
            type: 'number',
            label: `Admin Users: ${filters.value.adminUsersOperator} ${filters.value.adminUsers}`
        });
    }
    if (filters.value.connectedProperties) {
        active.push({
            key: 'connectedProperties',
            type: 'number',
            label: `Total Connected Properties: ${filters.value.connectedPropertiesOperator} ${filters.value.connectedProperties}`
        });
    }
    if (filters.value.rentalProperties) {
        active.push({
            key: 'rentalProperties',
            type: 'number',
            label: `Rental Properties: ${filters.value.rentalPropertiesOperator} ${filters.value.rentalProperties}`
        });
    }
    if (filters.value.saleProperties) {
        active.push({
            key: 'saleProperties',
            type: 'number',
            label: `Sale Properties: ${filters.value.salePropertiesOperator} ${filters.value.saleProperties}`
        });
    }

    return active;
});


const removeFilter = (filterKey: string) => {
    filters.value[filterKey as keyof typeof filters.value] = '';
};

// ✅ Expose filters
defineExpose({ filters });

useHead({
  meta: [
    { name: 'viewport', content: 'width=1300' }
  ]
})
</script>
