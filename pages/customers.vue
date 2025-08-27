<script setup>
import { ref, computed } from "vue";

useHead({
    meta: [{ name: "viewport", content: "width=1300" }],
});

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
    agencyName: "",
    agencyCountry: "",
    totalPropertiesOperator: "=",
    totalProperties: "",
    rentalPropertiesOperator: "=",
    rentalProperties: "",
    salePropertiesOperator: "=",
    saleProperties: "",
    sentbyAgencyOperator: "=",
    sentbyAgency: "",
    sentbyCustomerOperator: "=",
    sentbyCustomer: "",
});

const agencyCountryOptions = [
    { value: "Malta", label: "Malta" },
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
];

const agencyNameOptions = [
    { value: "Remax", label: "Remax" },
    { value: "Century", label: "Century" },
    { value: "Coldwell", label: "Coldwell" },
];

// ------------------- Customers Table Data -------------------
const customers = ref([
    {
        id: 1,
        nameAndSurname: "Kathryn Murphy",
        mobileNumber: "+356 99 314 342",
        email: "kathryn@myproperty...",
        customer: { flag: "Spanish.svg", country: "" },
        totalProperties: 54,
        rentalProperties: 4,
        saleProperties: 4,
        pendingRequests: 1,
        pendingRequestsCustomer: 6,
    },
    {
        id: 2,
        nameAndSurname: "Ronald Richards",
        mobileNumber: "+356 99 314 342",
        email: "ronald@myproperty...",
        customer: { flag: "Spanish.svg", country: "" },
        totalProperties: 4,
        rentalProperties: 3,
        saleProperties: 3,
        pendingRequests: 1,
        pendingRequestsCustomer: 4,
    },
    {
        id: 3,
        nameAndSurname: "Courtney Henry",
        mobileNumber: "+356 99 314 342",
        email: "courtney@myproperty...",
        customer: { flag: "Spanish.svg", country: "" },
        totalProperties: 3,
        rentalProperties: 2,
        saleProperties: 2,
        pendingRequests: 1,
        pendingRequestsCustomer: 2,
    },
    {
        id: 4,
        nameAndSurname: "Cameron Williamson",
        mobileNumber: "+356 99 314 342",
        email: "cameron@myproperty...",
        customer: { flag: "Spanish.svg", country: "" },
        totalProperties: 10,
        rentalProperties: 1,
        saleProperties: 1,
        pendingRequests: 1,
        pendingRequestsCustomer: 1,
    },
]);

// Table column configuration
const tableColumns = ref([
    { key: "nameAndSurname", label: "Name & Surname", sortable: true },
    { key: "mobileNumber", label: "Mobile Number", sortable: false },
    { key: "email", label: "Email", sortable: true },
    { key: "customer", label: "Customer", sortable: true },
    { key: "totalProperties", label: "Total Properties", sortable: true },
    { key: "rentalProperties", label: "Rental Properties", sortable: true },
    { key: "saleProperties", label: "Sale Properties", sortable: true },
    { key: "pendingRequests", label: "Pending Requests sent by Agency", sortable: true },
    { key: "pendingRequestsCustomer", label: "Pending Requests sent by Customer", sortable: true },
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
    if (propertyFilters.value.agencyName) result.push({ key: "agencyName", label: `Agency: ${propertyFilters.value.agencyName}` });
    if (propertyFilters.value.agencyCountry) result.push({ key: "agencyCountry", label: `Agency Country: ${propertyFilters.value.agencyCountry}` });
    if (propertyFilters.value.totalProperties) result.push({ key: "totalProperties", label: `Total Properties: ${propertyFilters.value.totalPropertiesOperator} ${propertyFilters.value.totalProperties}` });
    if (propertyFilters.value.rentalProperties) result.push({ key: "rentalProperties", label: `Rental Properties: ${propertyFilters.value.rentalPropertiesOperator} ${propertyFilters.value.rentalProperties}` });
    if (propertyFilters.value.saleProperties) result.push({ key: "saleProperties", label: `Sale Properties: ${propertyFilters.value.salePropertiesOperator} ${propertyFilters.value.saleProperties}` });
    if (propertyFilters.value.sentbyAgency) result.push({ key: "sentbyAgency", label: `Sent by Agency: ${propertyFilters.value.sentbyAgencyOperator} ${propertyFilters.value.sentbyAgency}` });
    if (propertyFilters.value.sentbyCustomer) result.push({ key: "sentbyCustomer", label: `Sent by Customer: ${propertyFilters.value.sentbyCustomerOperator} ${propertyFilters.value.sentbyCustomer}` });
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
        // Customer Filters
        if (customerFilters.value.name && !item.nameAndSurname.toLowerCase().includes(customerFilters.value.name.toLowerCase())) return false;
        if (customerFilters.value.surname && !item.nameAndSurname.toLowerCase().includes(customerFilters.value.surname.toLowerCase())) return false;
        if (customerFilters.value.email && !item.email.toLowerCase().includes(customerFilters.value.email.toLowerCase())) return false;
        if (customerFilters.value.mobile && !item.mobileNumber.includes(customerFilters.value.mobile)) return false;
        if (customerFilters.value.country && item.customer.country !== customerFilters.value.country) return false;
        if (customerFilters.value.gender && item.gender !== customerFilters.value.gender) return false;

        // Property Filters
        if (propertyFilters.value.agencyName && item.agencyName !== propertyFilters.value.agencyName) return false;
        if (propertyFilters.value.agencyCountry && item.agencyCountry !== propertyFilters.value.agencyCountry) return false;

        if (propertyFilters.value.totalProperties && !compare(item.totalProperties, propertyFilters.value.totalProperties, propertyFilters.value.totalPropertiesOperator)) return false;
        if (propertyFilters.value.rentalProperties && !compare(item.rentalProperties, propertyFilters.value.rentalProperties, propertyFilters.value.rentalPropertiesOperator)) return false;
        if (propertyFilters.value.saleProperties && !compare(item.saleProperties, propertyFilters.value.saleProperties, propertyFilters.value.salePropertiesOperator)) return false;
        if (propertyFilters.value.sentbyAgency && !compare(item.pendingRequests, propertyFilters.value.sentbyAgency, propertyFilters.value.sentbyAgencyOperator)) return false;
        if (propertyFilters.value.sentbyCustomer && !compare(item.pendingRequestsCustomer, propertyFilters.value.sentbyCustomer, propertyFilters.value.sentbyCustomerOperator)) return false;

        return true;
    });
});

// Helper function for comparisons
function compare(value, filterValue, operator) {
    value = Number(value);
    filterValue = Number(filterValue);

    if (operator === "=") return value === filterValue;
    if (operator === ">") return value > filterValue;
    if (operator === "<") return value < filterValue;

    return true;
}

</script>

<template>
    <div class="p-6 bg-gray-50">
        <!-- Header -->
        <div class="flex items-center gap-6 mb-4">
            <h1 class="text-2xl font-semibold text-gray-900">Customers</h1>
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
                            <label class="block text-sm font-medium text-[#595959] mb-2">Email</label>
                            <input v-model="customerFilters.email" type="email" placeholder="Type Email.."
                                class="text-sm w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8] focus:bg-white focus:ring-1 focus:ring-[#0F4841]" />
                        </div>
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
                    <div class="flex gap-4 mt-2">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Date of Birth</label>
                            <input v-model="customerFilters.dateOfBirth" type="date" style="height: 38px;"
                                :class="customerFilters.dateOfBirth === '' ? 'text-[#BCBCBC]' : 'text-black'" class="text-sm w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8]
                                focus:bg-white focus:ring-1 focus:ring-[#0F4841]" />
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Birth Date</label>
                            <input v-model="customerFilters.birthDay" type="date" style="height: 38px;"
                                :class="customerFilters.birthDay === '' ? 'text-[#BCBCBC]' : 'text-black'" class="text-sm w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8]
                                focus:bg-white focus:ring-1 focus:ring-[#0F4841]" />
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
                            <label class="block text-sm font-medium text-[#595959] mb-2">
                                Total Properties
                            </label>
                            <div class="flex items-center w-full border border-gray-300 rounded-full bg-[#F8F8F8] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] px-2"
                                style="height: 38px;">
                                <select v-model="propertyFilters.totalPropertiesOperator"
                                    class=" rounded-full px-1 py-0.5 outline-none text-gray-600 text-sm mr-2 ">
                                    <option value="="> = </option>
                                    <option value=">"> > </option>
                                    <option value="<">
                                        < </option>
                                </select>
                                <input v-model="propertyFilters.totalProperties" type="number"
                                    placeholder="Type Number..." class="text-sm w-full outline-none bg-transparent " />
                            </div>
                        </div>
                        <div class="flex-1">
                        </div>
                    </div>
                    <div class="flex gap-4 mt-2">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">
                                Rental Properties
                            </label>
                            <div class="flex items-center w-full border border-gray-300 rounded-full bg-[#F8F8F8] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] px-2"
                                style="height: 38px;">
                                <select v-model="propertyFilters.rentalPropertiesOperator"
                                    class=" rounded-full px-1 py-0.5 outline-none text-gray-600 text-sm mr-2 ">
                                    <option value="="> = </option>
                                    <option value=">"> > </option>
                                    <option value="<">
                                        < </option>
                                </select>
                                <input v-model="propertyFilters.rentalProperties" type="number"
                                    placeholder="Type Number..." class="text-sm w-full outline-none bg-transparent " />
                            </div>
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">
                                Sale Properties
                            </label>
                            <div class="flex items-center w-full border border-gray-300 rounded-full bg-[#F8F8F8] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] px-2"
                                style="height: 38px;">
                                <select v-model="propertyFilters.salePropertiesOperator"
                                    class=" rounded-full px-1 py-0.5 outline-none text-gray-600 text-sm mr-2 ">
                                    <option value="="> = </option>
                                    <option value=">"> > </option>
                                    <option value="<">
                                        < </option>
                                </select>
                                <input v-model="propertyFilters.saleProperties" type="number"
                                    placeholder="Type Number..." class="text-sm w-full outline-none bg-transparent " />
                            </div>
                        </div>

                    </div>
                    <div class="flex gap-4 mt-2">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Agency </label>
                            <Tailwinddropdown v-model="propertyFilters.agencyName" placeholder="Select Country"
                                :options="agencyNameOptions" />

                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Agency Country</label>
                            <Tailwinddropdown v-model="propertyFilters.agencyCountry" placeholder="Select Country"
                                :options="agencyCountryOptions" />
                        </div>
                    </div>
                    <div class="flex gap-4 mt-2">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">
                                Pending Req sent by Agency
                            </label>
                            <div class="flex items-center w-full border border-gray-300 rounded-full bg-[#F8F8F8] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] px-2"
                                style="height: 38px;">
                                <select v-model="propertyFilters.sentbyAgencyOperator"
                                    class=" rounded-full px-1 py-0.5 outline-none text-gray-600 text-sm mr-2 ">
                                    <option value="="> = </option>
                                    <option value=">"> > </option>
                                    <option value="<">
                                        < </option>
                                </select>
                                <input v-model="propertyFilters.sentbyAgency" type="number" placeholder="Type Number..."
                                    class="text-sm w-full outline-none bg-transparent " />
                            </div>
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">
                                Pending Req sent by Customer
                            </label>
                            <div class="flex items-center w-full border border-gray-300 rounded-full bg-[#F8F8F8] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] px-2"
                                style="height: 38px;">
                                <select v-model="propertyFilters.sentbyCustomerOperator"
                                    class=" rounded-full px-1 py-0.5 outline-none text-gray-600 text-sm mr-2 ">
                                    <option value="="> = </option>
                                    <option value=">"> > </option>
                                    <option value="<">
                                        < </option>
                                </select>
                                <input v-model="propertyFilters.sentbyCustomer" type="number"
                                    placeholder="Type Number..." class="text-sm w-full outline-none bg-transparent " />
                            </div>
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
            <!-- Custom slot for customer column with flag -->
            <template #cell-customer="{ item }">
                <div :class="['flex', item.customer.country ? 'items-center space-x-2 justify-start' : 'justify-center']">
                    <img v-if="item.customer.flag" :src="item.customer.flag" :alt="item.customer.country || 'flag'"
                        class="w-5 h-5" />
                    <span v-if="item.customer.country" class="text-sm font-medium text-black"> {{ item.customer.country }} </span>
                </div>
            </template>

        </DataTable>
    </div>
</template>
