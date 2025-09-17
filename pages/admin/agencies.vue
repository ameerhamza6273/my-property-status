<template>
    <div class="p-6">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-semibold text-gray-900">Agencies</h1>
            <button
                class="flex text-sm items-center gap-2 px-3 py-2 bg-[#0F4841] text-white rounded-full hover:bg-teal-700 transition-colors">
                <NuxtImg src="plus-circle.svg" width="16" height="16" />
                Add New Agency
            </button>
        </div>

        <!-- Filters Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 border border-[#D9D9D9] bg-white rounded-xl p-6">
            <!-- Agency Name -->
            <div>
                <label class="block text-sm font-medium text-[#595959] mb-2">
                    Agency Name
                </label>
                <Tailwinddropdown v-model="filters.agencyName" button-class="py-2 bg-[#F8F8F8]"
                    placeholder="Select Agency " :options="agencyNameOptions" />
            </div>

            <!-- Agency Country -->
            <div>
                <label class="block text-sm font-medium text-[#595959] mb-2">
                    Agency Country
                </label>
                <Tailwinddropdown v-model="filters.agencyCountry" button-class="py-2 bg-[#F8F8F8]"
                    placeholder="Select Agency Country" :options="agencyCountryOptions" />
            </div>

            <!-- Admin Users -->
            <div>
                <label class="block text-sm font-medium text-[#595959] mb-2">
                    Admin Users
                </label>

                <div class="flex items-center w-full border border-gray-300 rounded-full bg-[#F8F8F8] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] px-2"
                    style="height: 38px;">
                    <!-- <Tailwinddropdown v-model="filters.adminUsersOperator" button-class="py-1 bg-[#fff]"
                     :options="adminUsersOperatorOptions" /> -->
                    <select v-model="filters.adminUsersOperator"
                        class="rounded-full px-1 py-0.5 outline-none text-gray-600 text-sm mr-2">
                        <option value="=">=</option>
                        <option value=">"> ></option>
                        <option value="<">
                            < </option>
                    </select>
                    <input v-model="filters.adminUsers" type="number" placeholder="Type Number..."
                        class="text-sm w-full outline-none bg-transparent" />
                </div>
            </div>

            <!-- Total Connected Properties -->
            <div>
                <label class="block text-sm font-medium text-[#595959] mb-2">
                    Total Connected Properties
                </label>
                <div class="flex items-center w-full border border-gray-300 rounded-full bg-[#F8F8F8] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] px-2"
                    style="height: 38px;">
                    <select v-model="filters.connectedPropertiesOperator"
                        class="rounded-full px-1 py-0.5 outline-none text-gray-600 text-sm mr-2">
                        <option value="=">=</option>
                        <option value=">"> ></option>
                        <option value="<">
                            < </option>
                    </select>
                    <input v-model="filters.connectedProperties" type="number" placeholder="Type Number..."
                        class="text-sm w-full outline-none bg-transparent" />
                </div>
            </div>

            <!-- Rental Properties -->
            <div>
                <label class="block text-sm font-medium text-[#595959] mb-2">
                    Rental Properties
                </label>
                <div class="flex items-center w-full border border-gray-300 rounded-full bg-[#F8F8F8] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] px-2"
                    style="height: 38px;">
                    <select v-model="filters.rentalPropertiesOperator"
                        class="rounded-full px-1 py-0.5 outline-none text-gray-600 text-sm mr-2">
                        <option value="=">=</option>
                        <option value=">"> ></option>
                        <option value="<">
                            < </option>
                    </select>
                    <input v-model="filters.rentalProperties" type="number" placeholder="Type Number..."
                        class="text-sm w-full outline-none bg-transparent" />
                </div>
            </div>

            <!-- Sale Properties -->
            <div>
                <label class="block text-sm font-medium text-[#595959] mb-2">
                    Sale Properties
                </label>
                <div class="flex items-center w-full border border-gray-300 rounded-full bg-[#F8F8F8] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] px-2"
                    style="height: 38px;">
                    <select v-model="filters.salePropertiesOperator"
                        class="rounded-full px-1 py-0.5 outline-none text-gray-600 text-sm mr-2">
                        <option value="=">=</option>
                        <option value=">"> ></option>
                        <option value="<">
                            < </option>
                    </select>
                    <input v-model="filters.saleProperties" type="number" placeholder="Type Number..."
                        class="text-sm w-full outline-none bg-transparent" />
                </div>
            </div>
        </div>

        <!-- Active Filters -->
        <div v-if="activeFilters.length > 0">
            <div class="flex items-center flex-wrap gap-2">
                <span class="text-sm font-medium text-gray-700">Filtered by:</span>
                <div v-for="filter in activeFilters" :key="filter.key"
                    class="inline-flex items-center gap-2 px-2 py-1 bg-white rounded-full text-xs border border-[#D9D9D9]">
                    <span v-if="filter.type === 'country'" class="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span v-else-if="filter.type === 'agency'" class="w-2 h-2 bg-blue-500 rounded-full"></span>
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
        <DataTable :data="filteredUsers" :columns="tableHeaders" :initial-items-per-page="10" :th-width="100" />

    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const users = ref([
    {
        id: 1,
        agency: [{ img: "/Spanish.svg", value: "Remax" }],
        agencyCountry: [{ img: "/Spanish.svg", value: "Malta" }],
        adminUsers: 5,
        totalConnectedProperties: 3249,
        rentalProperties: 2000,
        saleProperties: 1249,
        apiKey: "API_KEY_XY12345..",
        edit: [{ img: "/edit-red-icon.svg", value: "Edit" }],

    },
    {
        id: 2,
        agency: [{ img: "/Spanish.svg", value: "Alliance" }],
        agencyCountry: [{ img: "/Spanish.svg", value: "Sweden" }],
        adminUsers: 3,
        totalConnectedProperties: 1500,
        rentalProperties: 800,
        saleProperties: 700,
        apiKey: "API_KEY_XY67890..",
        edit: [{ img: "/edit-red-icon.svg", value: "Edit" }],

    },
    {
        id: 3,
        agency: [{ img: "/Spanish.svg", value: "Remax" }],
        agencyCountry: [{ img: "/Spanish.svg", value: "Malta" }],
        adminUsers: 5,
        totalConnectedProperties: 3249,
        rentalProperties: 2000,
        saleProperties: 1249,
        apiKey: "API_KEY_XY12345..",
        edit: [{ img: "/edit-red-icon.svg", value: "Edit" }],

    },
    {
        id: 4,
        agency: [{ img: "/Spanish.svg", value: "Alliance" }],
        agencyCountry: [{ img: "/Spanish.svg", value: "Sweden" }],
        adminUsers: 3,
        totalConnectedProperties: 1500,
        rentalProperties: 800,
        saleProperties: 700,
        apiKey: "API_KEY_XY67890..",
        edit: [{ img: "/edit-red-icon.svg", value: "Edit" }],

    }
]);

const agencyCountryOptions = [
    { value: 'Malta', label: 'Malta' },
    { value: 'USA', label: 'USA' },
    { value: 'UK', label: 'UK' }
];

const agencyNameOptions = [
    { value: 'Remax', label: 'Remax' },
    { value: 'Century', label: 'Century' },
    { value: 'Coldwell', label: 'Coldwell' },
];
const adminUsersOperatorOptions = [
    { value: '=', label: '=' },
    { value: '>', label: '>' },
    { value: '<', label: '<' },
];

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

const sortColumn = ref(null);
const sortOrder = ref(null);

const tableHeaders = [
    { key: 'agency', label: 'Agency', type: 'array-with-flags', sortable: true },
    { key: 'agencyCountry', label: 'Agency Country', type: 'array-with-flags', sortable: true },
    { key: 'adminUsers', label: 'Admin Users', sortable: true },
    { key: 'totalConnectedProperties', label: 'Total Connected Properties', sortable: true },
    { key: 'rentalProperties', label: 'Rental Properties', sortable: true },
    { key: 'saleProperties', label: 'Sale Properties', sortable: true },
    { key: 'apiKey', label: 'API Key' },
    { key: 'edit', label: '', type: 'array-with-flags' },
];

const toggleSort = (column) => {
    if (sortColumn.value !== column) {
        sortColumn.value = column;
        sortOrder.value = "asc";
    } else {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    }
};

const getSortIcon = (column) => {
    if (sortColumn.value !== column || !sortOrder.value) {
        return "switch-vertical.svg";
    }
    return "export-switch-vertical.svg";
};

const filteredUsers = computed(() => {
    let result = [...users.value];

    if (filters.value.agencyName) {
        result = result.filter(u => u.agency.some(a => a.value.toLowerCase() === filters.value.agencyName.toLowerCase()));
    }

    if (filters.value.agencyCountry) {
        result = result.filter(u => u.agencyCountry.some(c => c.value.toLowerCase() === filters.value.agencyCountry.toLowerCase()));
    }

    const applyNumericFilter = (key, value, operator) => {
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

    if (sortColumn.value && sortOrder.value) {
        result.sort((a, b) => {
            let valA = "";
            let valB = "";
            if (sortColumn.value === "agency") {
                valA = a.agency[0].value;
                valB = b.agency[0].value;
            } else if (sortColumn.value === "agencyCountry") {
                valA = a.agencyCountry[0].value;
                valB = b.agencyCountry[0].value;
            } else {
                valA = a[sortColumn.value];
                valB = b[sortColumn.value];
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

const activeFilters = computed(() => {
    const active = [];

    if (filters.value.agencyCountry) {
        active.push({ key: 'agencyCountry', type: 'country', label: filters.value.agencyCountry });
    }
    if (filters.value.agencyName) {
        active.push({ key: 'agencyName', type: 'agency', label: filters.value.agencyName });
    }

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

const removeFilter = (filterKey) => {
    filters.value[filterKey] = '';
};

defineExpose({ filters });
</script>
