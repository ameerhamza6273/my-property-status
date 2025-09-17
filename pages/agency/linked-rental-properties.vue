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
    { value: "available", label: "Available" },
    { value: "rented", label: "Rented" },
];

// ------------------- Customers Table Data -------------------
const customers = ref([
    {
        id: 7023,
        fullName: "Kathryn Murphy",
        number: "+356 79 394 592",
        type: "available",
        date: "2025-08-28",
        inAppAction: "Deleted",
        action: "View Details",
    },
    {
        id: 7024,
        fullName: "John Smith",
        number: "+1 234 567 890",
        type: "rented",
        date: "2025-09-01",
        inAppAction: "Active",
        action: "View Details",
    },
    {
        id: 7024,
        fullName: "John Smith",
        number: "+1 234 567 890",
        type: "rented",
        date: "2025-09-01",
        inAppAction: "Archived",
        action: "View Details",
    },
    {
        id: 7024,
        fullName: "John Smith",
        number: "+1 234 567 890",
        type: "rented",
        date: "2025-09-01",
        inAppAction: "Archived",
        action: "View Details",
    },
    {
        id: 7024,
        fullName: "John Smith",
        number: "+1 234 567 890",
        type: "rented",
        date: "2025-09-01",
        inAppAction: "Archived",
        action: "View Details",
    },
    {
        id: 7024,
        fullName: "John Smith",
        number: "+1 234 567 890",
        type: "rented",
        date: "2025-09-01",
        inAppAction: "Archived",
        action: "View Details",
    },
]);

// Table column configuration
const tableColumns = ref([
    { key: "id", label: "Property ID" },
    { key: "fullName", label: "Name & Surname", sortable: true },
    { key: "number", label: "Mobile Number" },
    { key: "type", label: "Property Status", sortable: true },
    { key: "date", label: "Date Available" },
    { key: "inAppAction", label: "In- App Action", sortable: true },
    { key: "action", label: "Actions", sortable: true },
]);

// Event handlers
const handleSortChange = (sortData) => {
    console.log("Sort changed:", sortData);
};

const handlePageChange = (page) => {
    console.log("Page changed:", page);
};
const activeTab = ref("all"); // default active tab (can be "all", "customer", "agency")

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

const filteredCustomers = computed(() => {
    return customers.value.filter((item) => {
        // ------------------- Tabs Filter -------------------
        if (activeTab.value !== "all" && item.inAppAction.toLowerCase() !== activeTab.value.toLowerCase()) {
            return false;
        }

        // ------------------- Customer Filters -------------------
        if (
            customerFilters.value.name &&
            !item.fullName.toLowerCase().includes(customerFilters.value.name.toLowerCase())
        )
            return false;

        if (
            customerFilters.value.surname &&
            !item.fullName.toLowerCase().includes(customerFilters.value.surname.toLowerCase())
        )
            return false;

        if (
            customerFilters.value.email &&
            (!item.email || !item.email.toLowerCase().includes(customerFilters.value.email.toLowerCase()))
        )
            return false;

        if (customerFilters.value.mobile && !item.number.includes(customerFilters.value.mobile))
            return false;

        if (customerFilters.value.country && item.customerCountry !== customerFilters.value.country)
            return false;

        if (customerFilters.value.gender && item.gender !== customerFilters.value.gender)
            return false;

        // ------------------- Property Filters -------------------
        if (
            propertyFilters.value.propertyId &&
            !String(item.id).includes(propertyFilters.value.propertyId)
        )
            return false;

        if (propertyFilters.value.propertyType && item.type !== propertyFilters.value.propertyType)
            return false;

        if (propertyFilters.value.requestDate && item.date !== propertyFilters.value.requestDate)
            return false;

        return true;
    });
});

</script>


<template>
    <div class="p-6 bg-gray-50">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-semibold text-gray-900">Linked Rental Properties</h1>
            <button
                class="flex text-sm items-center gap-2 px-3 py-2 bg-[#0F4841] text-white rounded-full hover:bg-teal-700 transition-colors">
                <NuxtImg src="plus-circle.svg" width="16" height="16" />
                Add New Rental Property
            </button>
        </div>

        <!-- Tabs -->
        <div class="inline-flex border border-[#D9D9D9] rounded-full bg-white">
            <button @click="activeTab = 'all'" :class="[
                'py-1.5 px-8 text-sm font-medium rounded-full transition-colors',
                activeTab === 'all'
                    ? 'bg-[#0F4841] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-200'
            ]">
                All
            </button>
            <button @click="activeTab = 'active'" :class="[
                'py-1.5 px-8 text-sm font-medium rounded-full transition-colors',
                activeTab === 'active'
                    ? 'bg-[#0F4841] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-200'
            ]">
                Active
            </button>
            <button @click="activeTab = 'archived'" :class="[
                'py-1.5 px-8 text-sm font-medium rounded-full transition-colors',
                activeTab === 'archived'
                    ? 'bg-[#0F4841] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-200'
            ]">
                Archived
            </button>
            <button @click="activeTab = 'deleted'" :class="[
                'py-1.5 px-8 text-sm font-medium rounded-full transition-colors',
                activeTab === 'deleted'
                    ? 'bg-[#0F4841] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-200'
            ]">
                Deleted
            </button>
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
                            <label class="block text-sm font-medium text-[#595959] mb-2">Property Status</label>
                            <Tailwinddropdown v-model="propertyFilters.propertyType" button-class="py-2 bg-[#F8F8F8]"
                                placeholder="Select Property Status" :options="propertyTypeOption" />
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
            <!-- In App Action -->
            <template #cell-inAppAction="{ item }">
                <span :class="item.inAppAction === 'Active' ? 'text-green-800' : 'text-red-800'"
                    class="px-2 py-1 rounded-full text-sm font-medium">
                    {{ item.inAppAction }}
                </span>
            </template>

            <!-- Type Status Badge -->
            <template #cell-type="{ value }">
                <div class="inline-flex items-center rounded-full p-1 px-2" :class="[
                    value.trim().toLowerCase() === 'available'
                        ? 'bg-green-100'
                        : value.trim().toLowerCase() === 'promise of sale'
                            ? 'bg-yellow-100'
                            : 'bg-red-100'
                ]">
                    <div class="w-2 h-2 rounded-full mr-2" :class="[
                        value.trim().toLowerCase() === 'available'
                            ? 'bg-green-500'
                            : value.trim().toLowerCase() === 'promise of sale'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                    ]"></div>
                    <span class="text-xs">
                        {{ value }}
                    </span>
                </div>
            </template>

            <!-- Action button -->
            <template #cell-action="{ item }">
                <div>
                    <button class="bg-[#0F4841] text-white px-3 py-1 rounded-full hover:bg-green-600"
                        @click="handleAction(item, 'accept')">
                        View Details
                    </button>
                </div>
            </template>
        </DataTable>

    </div>
</template>
