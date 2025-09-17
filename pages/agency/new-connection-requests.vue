<script setup>
import { ref, computed } from "vue";

useHead({
    meta: [{ name: "viewport", content: "width=1300" }],
});
const isToggleOn = ref(true); // toggle state
const isModalOpen = ref(false); // popup state

function toggleSwitch() {
    isToggleOn.value = !isToggleOn.value;
}

function openModal() {
    isModalOpen.value = true;
}
function closeModal() {
    isModalOpen.value = false;
}
// ------------------- Customer Filters -------------------
const customerFilters = ref({
    name: "",
    surname: "",
    mobile: "",
    email: "",
    country: "",
    gender: "",
    birthDay: "",
    dateOfBirth: "",
});

const countryOptions = [
    { value: "Malta", label: "Malta" },
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
];


const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
];

// ------------------- Property Filters -------------------
const propertyFilters = ref({
    propertyId: "",
    propertyType: "",
    requestDate: "",
});

const propertyTypeOption = [
    { value: "sale", label: "Sale" },
    { value: "rental", label: "Rental" },
];

// ------------------- Customers Table Data -------------------
const customers = ref([
    {
        id: 7023,
        fullName: "Kathryn Murphy",
        customerCountry: "Malta",
        number: "+356 79 394 592",
        type: "sale",
        date: "2025-08-28",
        numberMatches: "yes",
        action: ["accept", "reject"],
    },
    {
        id: 7024,
        fullName: "John Smith",
        customerCountry: "USA",
        number: "+1 234 567 890",
        type: "rental",
        date: "2025-09-01",
        numberMatches: "no",
        action: ["accept", "reject"],
    },
]);

// Table column configuration
const tableColumns = ref([
    { key: "id", label: "Property ID" },
    { key: "fullName", label: "Name & Surname", sortable: true },
    { key: "customerCountry", label: "Customer Country", sortable: true },
    { key: "number", label: "Mobile Number" },
    { key: "type", label: "Type", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "numberMatches", label: "Mobile Number matches system?", sortable: true },
    { key: "action", label: "Actions", sortable: true },
]);

// Event handlers
const handleSortChange = (sortData) => {
    console.log("Sort changed:", sortData);
};

const handlePageChange = (page) => {
    console.log("Page changed:", page);
};

// ------------------- Active Filters -------------------
const customerActiveFilters = computed(() => {
    const result = [];
    if (customerFilters.value.name) result.push({ key: "name", label: `Name: ${customerFilters.value.name}` });
    if (customerFilters.value.surname) result.push({ key: "surname", label: `Surname: ${customerFilters.value.surname}` });
    if (customerFilters.value.mobile) result.push({ key: "mobile", label: `Mobile: ${customerFilters.value.mobile}` });
    if (customerFilters.value.email) result.push({ key: "email", label: `Email: ${customerFilters.value.email}` });
    if (customerFilters.value.country) result.push({ key: "country", label: `Country: ${customerFilters.value.country}` });
    if (customerFilters.value.gender) result.push({ key: "gender", label: `Gender: ${customerFilters.value.gender}` });
    if (customerFilters.value.birthDay) result.push({ key: "birthDay", label: `Birth Day: ${customerFilters.value.birthDay}` });
    if (customerFilters.value.dateOfBirth) result.push({ key: "dateOfBirth", label: `Date of Birth: ${customerFilters.value.dateOfBirth}` });
    return result;
});

const propertyActiveFilters = computed(() => {
    const result = [];
    if (propertyFilters.value.propertyId) result.push({ key: "propertyId", label: `Property ID: ${propertyFilters.value.propertyId}` });
    if (propertyFilters.value.propertyType) result.push({ key: "propertyType", label: `Property Type: ${propertyFilters.value.propertyType}` });
    if (propertyFilters.value.requestDate) result.push({ key: "requestDate", label: `Request Date: ${propertyFilters.value.requestDate}` });
    return result;
});

// ------------------- Remove Filter Functions -------------------
function removeCustomerFilter(key) {
    customerFilters.value[key] = "";
}

function removePropertyFilter(key) {
    propertyFilters.value[key] = "";
}

// ------------------- Final Filtered Customers -------------------
const filteredCustomers = computed(() => {
    return customers.value.filter((item) => {
        // Customer Filters
        if (customerFilters.value.name && !item.fullName.toLowerCase().includes(customerFilters.value.name.toLowerCase())) return false;
        if (customerFilters.value.surname && !item.fullName.toLowerCase().includes(customerFilters.value.surname.toLowerCase())) return false;
        if (customerFilters.value.email && (!item.email || !item.email.toLowerCase().includes(customerFilters.value.email.toLowerCase()))) return false;
        if (customerFilters.value.mobile && !item.number.includes(customerFilters.value.mobile)) return false;
        if (customerFilters.value.country && item.customerCountry !== customerFilters.value.country) return false;
        if (customerFilters.value.gender && item.gender !== customerFilters.value.gender) return false;

        // Property Filters
        if (propertyFilters.value.propertyId && !String(item.id).includes(propertyFilters.value.propertyId)) return false;
        if (propertyFilters.value.propertyType && item.type !== propertyFilters.value.propertyType) return false;
        if (propertyFilters.value.requestDate && item.date !== propertyFilters.value.requestDate) return false;

        return true;
    });
});
</script>


<template>
    <div class="p-6 bg-gray-50">
        <!-- Header -->
        <div class="flex items-center justify-between w-full mb-4">
            <!-- Left side Heading -->
            <h1 class="text-2xl font-semibold text-gray-900">
                New Connection Requests
            </h1>


            <!-- Right side Toggle Section -->

            <!-- Right side Toggle Section -->
            <div class="flex items-center justify-between gap-2">
                <!-- Red circle icon (opens modal) -->
                <button @click="openModal"
                    class="w-5 h-5 flex items-center justify-center border border-red-500 text-red-500 rounded-full text-xs">
                    i
                </button>


                <div class="flex items-center justify-between border rounded-full px-2 py-1.5">
                    <!-- Label text -->
                    <span class="text-sm font-medium text-gray-700 mr-3">
                        Accept Requests Automatically
                    </span>

                    <!-- Toggle -->
                    <button @click="toggleSwitch" :class="[
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none',
                        isToggleOn ? 'bg-green-500' : 'bg-gray-300'
                    ]">
                        <span :class="[
                            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                            isToggleOn ? 'translate-x-6' : 'translate-x-1'
                        ]"></span>
                    </button>
                </div>

            </div>
        </div>
        <!-- Popup Tooltip -->
        <div v-if="isModalOpen" @mouseleave="closeModal"
            class="absolute top-16 right-[300px] bg-white shadow-xl rounded-2xl p-4 w-96  border border-gray-200 z-50">

            <!-- Arrow -->
            <div class="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>

            <!-- Red icon + Title -->
            <div
                class="w-6 h-6 flex items-center justify-center border border-red-500 text-red-500 rounded-full text-sm">
                i
            </div>

            <h3 class="text-base font-semibold text-gray-900 py-2">
                Accept Requests Automatically?
            </h3>

            <!-- Description -->
            <p class="text-xs text-[#767676] leading-relaxed">
                When automatic requests are enabled, any request from a property owner whose mobile number registered
                with the Agency matches the one registered with MyPropertyStatus, will be accepted automatically.
            </p>
        </div>


        <div class="grid grid-cols-2 gap-4 mt-6 ">
            <!-- Customer Filters -->
            <div class="mb-2">
                <div class="bg-white rounded-xl p-5">
                    <h3 class="text-base mb-3 font-semibold">Customer Filters</h3>
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Name</label>
                            <input v-model="customerFilters.name" type="text" placeholder="Type Name.."
                                class="text-sm w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] focus:bg-white focus:ring-1 focus:ring-[#0F4841]" />
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Surname</label>
                            <input v-model="customerFilters.surname" type="text" placeholder="Type Surname.."
                                class="text-sm w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] focus:bg-white focus:ring-1 focus:ring-[#0F4841]" />
                        </div>
                    </div>
                    <div class="flex gap-4 mt-2">

                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Mobile Number</label>
                            <div class="flex items-center w-full border border-gray-300 rounded-full bg-[#F8F8F8] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] px-3"
                                style="height: 38px;">
                                <select class="bg-transparent outline-none text-gray-600 text-sm mr-2">
                                    <option>+356</option>
                                    <option>+91</option>
                                    <option>+92</option>
                                </select>
                                <input v-model="customerFilters.mobile" type="number" placeholder="Type Mobile Number.."
                                    class="text-sm w-full outline-none bg-transparent border-l border-gray-300 pl-2" />
                            </div>
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Email</label>
                            <input v-model="customerFilters.email" type="email" placeholder="Type Email.."
                                class="text-sm w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] focus:bg-white focus:ring-1 focus:ring-[#0F4841]" />
                        </div>
                    </div>
                    <div class="flex gap-4 mt-2">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Country</label>
                            <Tailwinddropdown v-model="customerFilters.country" button-class="py-2 bg-[#F8F8F8]"
                                placeholder="Select Country" :options="countryOptions" />
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Gender</label>
                            <Tailwinddropdown v-model="customerFilters.gender" button-class="py-2 bg-[#F8F8F8]"
                                placeholder="Select Gender" :options="genderOptions" />

                        </div>
                    </div>

                </div>

                <!-- Active Filters -->
                <div class="mt-3">
                    <div class="flex items-center flex-wrap gap-2">
                        <span class="text-sm font-medium text-black">Filtered by:</span><br>
                        <div v-for="filter in customerActiveFilters" :key="filter.key"
                            class="inline-flex items-center gap-2 px-2 py-1 bg-white rounded-full text-xs border border-[#D9D9D9]">
                            <!-- Optional indicator based on filter key -->
                            <span v-if="filter.key === 'country'" class="w-2 h-2 bg-red-500 rounded-full"></span>
                            <span v-else-if="filter.key === 'gender'" class="w-2 h-2 bg-blue-500 rounded-full"></span>

                            <span class="text-[#595959]">{{ filter.label }}</span>
                            <button @click="removeCustomerFilter(filter.key)" class="text-gray-500 hover:text-gray-700">
                                <NuxtImg src="filter-cros-Icon.svg" width="14" height="14" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Property Filters -->
            <div class="mb-2">
                <div class="bg-white rounded-xl p-5 h-[290px]">
                    <h3 class="text-base mb-3 font-semibold">Property Filters</h3>


                    <div class="flex gap-4 mt-2">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Property ID</label>
                            <input v-model="propertyFilters.propertyId" type="number" placeholder="Type Property ID.."
                                class="text-sm w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] focus:bg-white focus:ring-1 focus:ring-[#0F4841]" />
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Property Type</label>
                            <Tailwinddropdown v-model="propertyFilters.propertyType" button-class="py-2 bg-[#F8F8F8]"
                                placeholder="Select Property Type" :options="propertyTypeOption" />
                        </div>
                    </div>
                    <div class="flex gap-4 mt-2">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Request Date</label>
                            <input v-model="propertyFilters.requestDate" type="date" style="height: 38px;"
                                :class="propertyFilters.requestDate === '' ? 'text-[#BCBCBC]' : 'text-black'" class="text-sm w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8]
  focus:bg-white focus:ring-1 focus:ring-[#0F4841]" />

                        </div>
                    </div>
                </div>

                <!-- Active Filters -->
                <div class="mt-3">
                    <div class="flex items-center flex-wrap gap-2">
                        <span class="text-sm font-medium text-black">Filtered by:</span><br>
                        <div v-for="filter in propertyActiveFilters" :key="filter.key"
                            class="inline-flex items-center gap-2 px-2 py-1 bg-white rounded-full text-xs border border-[#D9D9D9]">
                            <!-- Indicator based on type -->
                            <span v-if="filter.key === 'agencyCountry'" class="w-2 h-2 bg-red-500 rounded-full"></span>
                            <span v-else-if="filter.key === 'agencyName'"
                                class="w-2 h-2 bg-blue-500 rounded-full"></span>

                            <span class="text-[#595959]">{{ filter.label }}</span>
                            <button @click="removePropertyFilter(filter.key)" class="text-gray-500 hover:text-gray-700">
                                <NuxtImg src="filter-cros-Icon.svg" width="14" height="14" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class=" my-5">
            <p class="text-sm text-[#0F4841] font-semibold">{{ filteredCustomers.length }} Results</p>
        </div>
        <DataTable :data="filteredCustomers" :columns="tableColumns" :initial-items-per-page="10"
            @sort-change="handleSortChange" @page-change="handlePageChange">
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

    </div>
</template>
