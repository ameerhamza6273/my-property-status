<script setup>
import { ref, computed } from "vue";

useHead({
    meta: [
        { name: 'viewport', content: 'width=1300' }
    ]
})

const activeTab = ref("all"); // default active tab (can be "all", "customer", "agency")

// ------------------- Customer Filters -------------------
const customerFilters = ref({
    name: "",
    surname: "",
    mobile: "",
    email: "",
    country: "",
    gender: "",
});
const countryOptions = [
    { value: 'Malta', label: 'Malta' },
    { value: 'USA', label: 'USA' },
    { value: 'UK', label: 'UK' }
]
const agencyCountriesOptions = [
    { value: 'Malta', label: 'Malta' },
    { value: 'USA', label: 'USA' },
    { value: 'UK', label: 'UK' }
]
const agencyNameOptions = [
    { value: 'Remax', label: 'Remax' },
    { value: 'Century', label: 'Century' },
    { value: 'Coldwell', label: 'Coldwell' },
]
const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
]

const propertyTypeOptions = [
    { value: 'Appartment', label: 'Appartment' },
    { value: 'Villa', label: 'Villa' },
]

// ------------------- Property Filters -------------------
const propertyFilters = ref({
    agencyName: "",
    agencyCountries: "",
    mpsId: "",
    agencyPropertyId: "",
    propertyType: "",
    dateofContract: "",
    adminUsers: "",
    adminUsersOperator: "=",
    connectedProperties: "",
    connectedPropertiesOperator: "=",
    rentalProperties: "",
    rentalPropertiesOperator: "=",
    saleProperties: "",
    salePropertiesOperator: "="
});

// ------------------- Users Table Data -------------------
const users = ref([
    {
        id: 1,
        agencyImages: [
            { value: "Remax", img: "Spanish.svg" },
            { value: "Century", img: "Spanish.svg" }
        ],
        agencyCountries: [
            { value: "Malta", img: "Spanish.svg" },
            { value: "USA", img: "Spanish.svg" },
            { value: "UK", img: "Spanish.svg" }
        ],
        MPSPropertyID: 876543,
        nameAndSurname: "Savannah Nguyen",
        propertyStatus: "Promise of Sale",
        inAppAction: "Archived",
        dateofContract: "25/04/2026",
        sentBy: "Agency",
    },
    {
        id: 2,
        agencyImages: [
            { value: "Coldwell", img: "Spanish.svg" },
            { value: "Remax", img: "Spanish.svg" }
        ],
        agencyCountries: [
            { value: "Malta", img: "Spanish.svg" },
            { value: "USA", img: "Spanish.svg" }
        ],
        MPSPropertyID: 23546,
        nameAndSurname: "Arlene McCoy",
        propertyStatus: "Sold",
        inAppAction: "Deleted",
        dateofContract: "25/04/2026",
        sentBy: "Customer",
    },
    {
        id: 3,
        agencyImages: [
            { value: "Century", img: "Spanish.svg" },
            { value: "Coldwell", img: "Spanish.svg" }
        ],
        agencyCountries: [
            { value: "UK", img: "Spanish.svg" },
            { value: "USA", img: "Spanish.svg" },
            { value: "Malta", img: "Spanish.svg" }
        ],
        MPSPropertyID: 56789,
        nameAndSurname: "Cody Fisher",
        propertyStatus: "Available",
        inAppAction: "Active",
        dateofContract: "25/04/2026",
        sentBy: "Agency",
    }
]);


// ------------------- Sorting Logic -------------------
const sortColumn = ref(null);
const sortOrder = ref(null);

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

// ------------------- Filtered Users Computed -------------------
const filteredUsers = computed(() => {
    let result = [...users.value];

   if (propertyFilters.value.agencyName) {
    result = result.filter(u =>
        u.agencyImages.some(a => a.value.toLowerCase() === propertyFilters.value.agencyName.toLowerCase())
    );
}
if (propertyFilters.value.agencyCountries) {
    result = result.filter(u =>
        u.agencyCountries.some(c => c.value.toLowerCase() === propertyFilters.value.agencyCountries.toLowerCase())
    );
}


    // Numeric property filters
    const applyNumericFilter = (key, value, operator) => {
        if (!value) return;
        const num = Number(value);
        if (operator === "=") result = result.filter(u => u[key] === num);
        else if (operator === ">") result = result.filter(u => u[key] > num);
        else if (operator === "<") result = result.filter(u => u[key] < num);
    };

    applyNumericFilter("adminUsers", propertyFilters.value.adminUsers, propertyFilters.value.adminUsersOperator);
    applyNumericFilter("totalConnectedProperties", propertyFilters.value.connectedProperties, propertyFilters.value.connectedPropertiesOperator);
    applyNumericFilter("rentalProperties", propertyFilters.value.rentalProperties, propertyFilters.value.rentalPropertiesOperator);
    applyNumericFilter("saleProperties", propertyFilters.value.saleProperties, propertyFilters.value.salePropertiesOperator);

    // Sorting
    if (sortColumn.value && sortOrder.value) {
        result.sort((a, b) => {
            let valA = "";
            let valB = "";
            if (sortColumn.value === "agency") {
                valA = a.agency[0].value;
                valB = b.agency[0].value;
            } else if (sortColumn.value === "agencyCountries") {
                valA = a.agencyCountries[0].value;
                valB = b.agencyCountries[0].value;
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

// ------------------- Chips for Active Filters -------------------
const customerActiveFilters = computed(() => {
    const result = [];
    if (customerFilters.value.name) result.push({ key: "name", label: `Name: ${customerFilters.value.name}` });
    if (customerFilters.value.surname) result.push({ key: "surname", label: `Surname: ${customerFilters.value.surname}` });
    if (customerFilters.value.mobile) result.push({ key: "mobile", label: `Mobile: ${customerFilters.value.mobile}` });
    if (customerFilters.value.email) result.push({ key: "email", label: `Email: ${customerFilters.value.email}` });
    if (customerFilters.value.country) result.push({ key: "country", label: `Country: ${customerFilters.value.country}` });
    if (customerFilters.value.gender) result.push({ key: "gender", label: `Gender: ${customerFilters.value.gender}` });
    return result;
});

const propertyActiveFilters = computed(() => {
    const result = [];
    if (propertyFilters.value.agencyName) result.push({ key: "agencyName", label: `Agency: ${propertyFilters.value.agencyName}` });
    if (propertyFilters.value.agencyCountries) result.push({ key: "agencyCountries", label: `Agency Country: ${propertyFilters.value.agencyCountries}` });
    if (propertyFilters.value.mpsId) result.push({ key: "mpsId", label: `MPS ID: ${propertyFilters.value.mpsId}` });
    if (propertyFilters.value.agencyPropertyId) result.push({ key: "agencyPropertyId", label: `Agency Property ID: ${propertyFilters.value.agencyPropertyId}` });
    if (propertyFilters.value.propertyType) result.push({ key: "propertyType", label: `Property Type: ${propertyFilters.value.propertyType}` });
    if (propertyFilters.value.dateofContract) result.push({ key: "dateofContract", label: `Date: ${propertyFilters.value.dateofContract}` });
    if (propertyFilters.value.adminUsers) result.push({ key: "adminUsers", label: `Admin Users: ${propertyFilters.value.adminUsersOperator} ${propertyFilters.value.adminUsers}` });
    if (propertyFilters.value.connectedProperties) result.push({ key: "connectedProperties", label: `Connected Properties: ${propertyFilters.value.connectedPropertiesOperator} ${propertyFilters.value.connectedProperties}` });
    if (propertyFilters.value.rentalProperties) result.push({ key: "rentalProperties", label: `Rental Properties: ${propertyFilters.value.rentalPropertiesOperator} ${propertyFilters.value.rentalProperties}` });
    if (propertyFilters.value.saleProperties) result.push({ key: "saleProperties", label: `Sale Properties: ${propertyFilters.value.salePropertiesOperator} ${propertyFilters.value.saleProperties}` });
    return result;
});

// ------------------- Remove Filter Functions -------------------
function removeCustomerFilter(key) {
    customerFilters.value[key] = "";
}

function removePropertyFilter(key) {
    propertyFilters.value[key] = "";
}

// Function to get status dot color class
const getStatusDotClass = (status) => {
    switch (status?.toLowerCase()) {
        case 'available':
            return 'bg-green-500'
        case 'sold':
            return 'bg-red-500'
        case 'promise of sale':
            return 'bg-yellow-500'
        default:
            return 'bg-gray-400'
    }
}

</script>


<template>
    <div class="p-6 bg-gray-50">
        <!-- Header -->
        <div class="flex items-center gap-6 mb-4">
            <h1 class="text-2xl font-semibold text-gray-900">Sale Properties</h1>
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


        <div class="grid grid-cols-2 gap-4 mt-6">
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
                            <Tailwinddropdown v-model="customerFilters.country" placeholder="Select Country"
                                :options="countryOptions" />
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Gender</label>
                            <Tailwinddropdown v-model="customerFilters.gender" placeholder="Select Country"
                                :options="genderOptions" />

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
                <div class="bg-white rounded-xl p-5">
                    <h3 class="text-base mb-3 font-semibold">Property Filters</h3>
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Agency Name</label>
                            <Tailwinddropdown v-model="propertyFilters.agencyName" placeholder="Select Country"
                                :options="agencyNameOptions" />

                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Agency Country</label>
                            <Tailwinddropdown v-model="propertyFilters.agencyCountries" placeholder="Select Country"
                                :options="agencyCountriesOptions" />
                        </div>
                    </div>
                    <div class="flex gap-4 mt-2">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">MPS Property ID</label>
                            <input v-model="propertyFilters.mpsId" type="number" placeholder="Type MPS Property ID.."
                                class="text-sm w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] focus:bg-white focus:ring-1 focus:ring-[#0F4841]" />
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Agency Property ID</label>
                            <input v-model="propertyFilters.agencyPropertyId" type="number"
                                placeholder="Type Agency Property ID.."
                                class="text-sm w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] focus:bg-white focus:ring-1 focus:ring-[#0F4841]" />
                        </div>
                    </div>
                    <div class="flex gap-4 mt-2">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Property Type</label>
                            <Tailwinddropdown v-model="propertyFilters.propertyType" placeholder="Select Country"
                                :options="propertyTypeOptions" />

                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Request Date</label>
                            <input v-model="propertyFilters.dateofContract" type="date" style="height: 38px;"
                                :class="propertyFilters.dateofContract === '' ? 'text-[#BCBCBC]' : 'text-black'" class="text-sm w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8]
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
                            <span v-if="filter.key === 'agencyCountries'"
                                class="w-2 h-2 bg-red-500 rounded-full"></span>
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

        <!-- Results Count -->
        <div class="my-4">
            <p class="text-sm text-[#0F4841] font-semibold">{{ filteredUsers.length }} Results</p>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full min-w-[900px]">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>

                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                MPS Property ID</th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div class="flex items-center gap-1 cursor-pointer"
                                    @click="toggleSort('nameAndSurname')">
                                    <span>Name & Surname</span>
                                    <NuxtImg :src="getSortIcon('nameAndSurname')" width="14" height="14" />
                                </div>
                            </th>

                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div>
                                    <span>Agency Listings</span>
                                </div>
                            </th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div>
                                    <span>Agency Countries</span>
                                </div>
                            </th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div class="flex items-center cursor-pointer" @click="toggleSort('propertyStatus')">
                                    <span>Property Status</span>
                                    <NuxtImg :src="getSortIcon('propertyStatus')" width="14" height="14" />
                                </div>
                            </th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date of Contract</th>
                            <th class="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div class="flex items-center gap-1 cursor-pointer" @click="toggleSort('sentBy')">
                                    <span>In-App Action</span>
                                    <NuxtImg :src="getSortIcon('sentBy')" width="14" height="14" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">


                            <td class="px-4 py-3 whitespace-nowrap text-sm text-black">{{ user.MPSPropertyID }}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-black">{{ user.nameAndSurname }}</td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <!-- First 3 images -->
                                    <div v-for="(item, index) in user.agencyImages.slice(0, 3)" :key="index"
                                        class="flex items-center space-x-1">
                                        <NuxtImg :src="item.img" alt="agency" class="w-5 h-5 rounded-full" />
                                    </div>

                                    <!-- If more than 3, show +X -->
                                    <div v-if="user.agencyImages.length > 3" class="text-xs font-medium text-gray-600">
                                        +{{ user.agencyImages.length - 3 }}
                                    </div>
                                </div>
                            </td>

                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <!-- First 3 images -->
                                    <div v-for="(item, index) in user.agencyCountries.slice(0, 3)" :key="index"
                                        class="flex items-center space-x-1">
                                        <NuxtImg :src="item.img" alt="country" class="w-5 h-5 rounded-full" />
                                    </div>

                                    <!-- If more than 3, show +X -->
                                    <div v-if="user.agencyCountries.length > 3"
                                        class="text-xs font-medium text-gray-600">
                                        +{{ user.agencyCountries.length - 3 }}
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm">
                                <div class="inline-flex items-center rounded-full p-1 px-2" 
                                    :class="user.propertyStatus.trim().toLowerCase() === 'available' ? 'bg-green-100'
                                    : user.propertyStatus.trim().toLowerCase() === 'promise of sale' ? 'bg-yellow-100' : 'bg-red-100'">
                                    <div :class="getStatusDotClass(user.propertyStatus)"
                                        class="w-2 h-2 rounded-full mr-2"></div>
                                    <span class="text-xs">
                                        {{ user.propertyStatus }}
                                    </span>
                                </div>
                            </td>

                            <!-- Date of Contract Column (no conditional styling) -->
                            <td class="px-4 py-3 whitespace-nowrap text-sm text-black">
                                {{ user.dateofContract }}
                            </td>

                            <!-- In-App Action Column with conditional styling -->
                            <td class="px-4 py-3 whitespace-nowrap text-sm">
                                <span :class="user.inAppAction === 'Archived' ? 'text-green-800' : 'text-red-800'"
                                    class="px-2 py-1 rounded-full text-xs font-medium">
                                    {{ user.inAppAction }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
