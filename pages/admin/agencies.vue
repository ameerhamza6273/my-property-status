<template>
  <div class="p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Agencies</h1>
      <button @click="openAddAgencyModal"
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
        <Tailwinddropdown v-model="filters.agencyName" button-class="py-2 px-3 bg-[#F8F8F8]"
          placeholder="Select Agency " :options="agencyNameOptions" />
      </div>

      <!-- Agency Country -->
      <div>
        <label class="block text-sm font-medium text-[#595959] mb-2">
          Agency Country
        </label>
        <Tailwinddropdown v-model="filters.agencyCountry" button-class="py-2 px-3 bg-[#F8F8F8]"
          placeholder="Select Agency Country" :options="agencyCountryOptions" />
      </div>

      <!-- Number Filters -->
      <div v-for="field in numberFilters" :key="field.key">
        <label class="block text-sm font-medium text-[#595959] mb-2">
          {{ field.label }}
        </label>
        <div
          class="flex items-center w-full border border-gray-300 rounded-full bg-[#F8F8F8] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] px-2 h-[38px]">
          <Tailwinddropdown v-model="filters[field.operator]" button-class="py-0.5 px-2 bg-[#fff] border-white min-w-12"
            :options="operatorOptions" />
          <input v-model="filters[field.key]" type="number" :placeholder="`Type Number...`"
            class="text-sm w-full outline-none bg-transparent ml-2" />
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
      <p class="text-sm text-[#0F4841] font-semibold">
        {{ filteredUsers.length }} Results
      </p>
    </div>
    <!-- Users Table -->
    <DataTable :data="filteredUsers" :columns="tableHeaders" :initial-items-per-page="10" :th-width="100">
      <!-- Edit Column -->
      <template #cell-edit="{ item }">
        <button class="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-[#E2522E]">
          <NuxtImg src="edit-red-icon.svg" width="16" height="16" />
          Edit
        </button>
      </template>
    </DataTable>

    <!-- Modal -->
    <AddAgencyModal :isOpen="isModalOpen" @close="closeAddAgencyModal" @submit="handleAddAgency" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const { getAgencies } = useAgency();

const users = ref([]);
const isModalOpen = ref(false);

// Dropdown options
const agencyCountryOptions = [
  { value: "Malta", label: "Malta" },
  { value: "Sweden", label: "Sweden" },
  { value: "Pakistan", label: "Pakistan" }, // example from API
];

const agencyNameOptions = [
  { value: "Remax", label: "Remax" },
  { value: "Alliance", label: "Alliance" },
  { value: "Ameer Hamza", label: "Ameer Hamza" }, // example from API
];

const operatorOptions = [
  { value: "=", label: "=" },
  { value: ">", label: ">" },
  { value: "<", label: "<" },
];

// Filters
const filters = ref({
  agencyName: "",
  agencyCountry: "",
  adminUsers: "",
  adminUsersOperator: "=",
  connectedProperties: "",
  connectedPropertiesOperator: "=",
  rentalProperties: "",
  rentalPropertiesOperator: "=",
  saleProperties: "",
  salePropertiesOperator: "=",
});

// Number filter config
const numberFilters = [
  { key: "adminUsers", operator: "adminUsersOperator", label: "Admin Users" },
  {
    key: "totalConnectedProperties",
    operator: "connectedPropertiesOperator",
    label: "Total Connected Properties",
  },
  {
    key: "rentalProperties",
    operator: "rentalPropertiesOperator",
    label: "Rental Properties",
  },
  {
    key: "saleProperties",
    operator: "salePropertiesOperator",
    label: "Sale Properties",
  },
];

// Table headers
const tableHeaders = [
  { key: "agency", label: "Agency", type: "array-with-flags", sortable: true },
  { key: "agencyCountry", label: "Agency Country", type: "array-with-flags", sortable: true },
  { key: "adminUsers", label: "Admin Users", sortable: true },
  { key: "totalConnectedProperties", label: "Total Connected Properties", sortable: true },
  { key: "rentalProperties", label: "Rental Properties", sortable: true },
  { key: "saleProperties", label: "Sale Properties", sortable: true },
  { key: "apiKey", label: "API Key" },
  { key: "edit", label: "" },
];

// Fetch agencies and map API response to table format
onMounted(async () => {
  try {
    const data = await getAgencies();
    users.value = data.data.map(item => ({
      id: item.id,
      agency: [{ value: item.attributes.name }],           // no img
      agencyCountry: [{ value: item.attributes.country }], // no img
      adminUsers: item.attributes.admin_id,
      totalConnectedProperties: item.attributes.totalConnectedProperties || 0,
      rentalProperties: item.attributes.rentalProperties || 0,
      saleProperties: item.attributes.saleProperties || 0,
      apiKey: item.attributes.api_key,
    }));
    console.log("Mapped Agencies:", users.value);
  } catch (e) {
    console.error("Error fetching agencies:", e);
  }
});


// Modal controls
const openAddAgencyModal = () => (isModalOpen.value = true);
const closeAddAgencyModal = () => (isModalOpen.value = false);

// Add agency handler
const handleAddAgency = (agencyData) => {
  const newAgency = {
    id: users.value.length + 1,
    agency: [{ value: agencyData.agencyName }],           // no img
    agencyCountry: [{ value: agencyData.agencyCountry }], // no img
    adminUsers: Number(agencyData.adminUsers) || 0,
    totalConnectedProperties: Number(agencyData.totalConnectedProperties) || 0,
    rentalProperties: Number(agencyData.rentalProperties) || 0,
    saleProperties: Number(agencyData.saleProperties) || 0,
    apiKey: agencyData.apiKey || `API_KEY_${Math.random().toString(36).substring(2, 8)}`,
  };
  users.value.push(newAgency);
  isModalOpen.value = false;
};


// Computed filtered users
const filteredUsers = computed(() => {
  let result = [...users.value];

  if (filters.value.agencyName) {
    result = result.filter(u =>
      u.agency.some(a => a.value.toLowerCase() === filters.value.agencyName.toLowerCase())
    );
  }
  if (filters.value.agencyCountry) {
    result = result.filter(u =>
      u.agencyCountry.some(c => c.value.toLowerCase() === filters.value.agencyCountry.toLowerCase())
    );
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

  return result;
});

// Active filters
const activeFilters = computed(() => {
  const active = [];

  if (filters.value.agencyCountry) active.push({ key: "agencyCountry", type: "country", label: filters.value.agencyCountry });
  if (filters.value.agencyName) active.push({ key: "agencyName", type: "agency", label: filters.value.agencyName });
  if (filters.value.adminUsers) active.push({ key: "adminUsers", type: "number", label: `Admin Users: ${filters.value.adminUsersOperator} ${filters.value.adminUsers}` });
  if (filters.value.connectedProperties) active.push({ key: "connectedProperties", type: "number", label: `Total Connected Properties: ${filters.value.connectedPropertiesOperator} ${filters.value.connectedProperties}` });
  if (filters.value.rentalProperties) active.push({ key: "rentalProperties", type: "number", label: `Rental Properties: ${filters.value.rentalPropertiesOperator} ${filters.value.rentalProperties}` });
  if (filters.value.saleProperties) active.push({ key: "saleProperties", type: "number", label: `Sale Properties: ${filters.value.salePropertiesOperator} ${filters.value.saleProperties}` });

  return active;
});

// Remove filter
const removeFilter = (filterKey) => { filters.value[filterKey] = ""; };

defineExpose({ filters });
</script>
