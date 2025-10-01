<script setup>
import { ref, computed } from "vue";

useHead({
  meta: [
    { name: 'viewport', content: 'width=1300' }
  ]
})

const activeTab = ref("all"); // default active tab

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
  { value: 'Rented', label: 'Rented' },
  { value: 'Available', label: 'Available' },
]

// ------------------- Property Filters -------------------
const propertyFilters = ref({
  agencyName: "",
  agencyCountries: "",
  mpsId: "",
  propertyType: "",
  dateofContract: "",
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
    propertyStatus: "Rented",
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
    propertyStatus: "Available",
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

// ------------------- Filtered Users Computed -------------------
const filteredUsers = computed(() => {
  let result = [...users.value];

  // ---------------- Customer Filters ----------------
  if (customerFilters.value.name) {
    result = result.filter(u =>
      u.nameAndSurname.toLowerCase().includes(customerFilters.value.name.toLowerCase())
    );
  }
  if (customerFilters.value.surname) {
    result = result.filter(u =>
      u.nameAndSurname.toLowerCase().split(" ")[1]?.includes(customerFilters.value.surname.toLowerCase())
    );
  }
  if (customerFilters.value.mobile) {
    result = result.filter(u =>
      u.mobile?.toString().includes(customerFilters.value.mobile.toString())
    );
  }
  if (customerFilters.value.email) {
    result = result.filter(u =>
      u.email?.toLowerCase().includes(customerFilters.value.email.toLowerCase())
    );
  }
  if (customerFilters.value.country) {
    result = result.filter(u =>
      u.agencyCountries.some(c => c.value.toLowerCase() === customerFilters.value.country.toLowerCase())
    );
  }
  if (customerFilters.value.gender) {
    result = result.filter(u =>
      u.gender?.toLowerCase() === customerFilters.value.gender.toLowerCase()
    );
  }

  // ---------------- Property Filters ----------------
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
  if (propertyFilters.value.mpsId) {
    result = result.filter(u =>
      u.MPSPropertyID.toString().includes(propertyFilters.value.mpsId.toString())
    );
  }
  if (propertyFilters.value.propertyType) {
    result = result.filter(u =>
      u.propertyStatus.toLowerCase() === propertyFilters.value.propertyType.toLowerCase()
    );
  }
  if (propertyFilters.value.dateofContract) {
    result = result.filter(u =>
      u.dateofContract === propertyFilters.value.dateofContract
    );
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
  if (propertyFilters.value.propertyType) result.push({ key: "propertyType", label: `Property Type: ${propertyFilters.value.propertyType}` });
  if (propertyFilters.value.dateofContract) result.push({ key: "dateofContract", label: `Date: ${propertyFilters.value.dateofContract}` });
  return result;
});

// ------------------- Remove Filter Functions -------------------
function removeCustomerFilter(key) {
  customerFilters.value[key] = "";
}

function removePropertyFilter(key) {
  propertyFilters.value[key] = "";
}


const { getAdminProperties } = useAdminProperties()

// ✅ table headers
const tableHeaders = [
  { key: "id", label: "MPS Property ID", sortable: true },
  { key: "name", label: "Name & Surname", sortable: true },
  { key: "agencyListings", label: "Agency Listings", sortable: true },
  { key: "agencyCountries", label: "Agency Countries", sortable: true },
  { key: "status", label: "Property Status", sortable: true },
  { key: "dateAvailable", label: "Date Available", sortable: false },
  { key: "actions", label: "In-App Action", sortable: false },
]

const tableData = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await getAdminProperties(1, 50)
    console.log("✅ Properties API raw response:", res)

    // ✅ map API data to table format
    tableData.value = res.data.map(item => {
      const attrs = item.attributes || {}

      return {
        id: item.id,
        name: attrs.owner_name || attrs.full_name || "-",
        agencyListings: attrs.agency_listings || 0,
        agencyCountries: (attrs.agency_countries || []).join(", "),
        status: attrs.type || "-",
        dateAvailable: attrs.date_available || "-",
        actions: "..." // custom action buttons here
      }
    })

    console.log("✅ Table Data mapped:", tableData.value)
  } catch (err) {
    console.error("❌ Error loading properties:", err)
  } finally {
    loading.value = false
  }
})

</script>



<template>
    <div class="p-6 bg-gray-50">
        <!-- Header -->
        <div class="flex items-center gap-6 mb-4">
            <h1 class="text-2xl font-semibold text-gray-900">Rental Properties</h1>
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
                            <Tailwinddropdown v-model="customerFilters.country" button-class="py-2 px-3 bg-[#F8F8F8]"
                                placeholder="Select Country" :options="countryOptions" />
                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Gender</label>
                            <Tailwinddropdown v-model="customerFilters.gender" button-class="py-2 px-3 bg-[#F8F8F8]"
                                placeholder="Select Gender" :options="genderOptions" />

                        </div>
                    </div>
                </div>

                <!-- Active Filters -->
                <div class="mt-3">
                    <div class="text-sm font-medium text-black mb-1">Filtered by:</div>
                    <div class="flex items-center flex-wrap gap-2">
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
                            <Tailwinddropdown v-model="propertyFilters.agencyName" button-class="py-2 px-3 bg-[#F8F8F8]"
                                placeholder="Agency Name" :options="agencyNameOptions" />

                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Agency Country</label>
                            <Tailwinddropdown v-model="propertyFilters.agencyCountries"
                                button-class="py-2 px-3 bg-[#F8F8F8]" placeholder="Select Agency Country"
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
                            <label class="block text-sm font-medium text-[#595959] mb-2">Property Status</label>
                            <Tailwinddropdown v-model="propertyFilters.propertyType"
                                button-class="py-2 px-3 bg-[#F8F8F8]" placeholder="Select Property Status"
                                :options="propertyTypeOptions" />

                        </div>
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-[#595959] mb-2">Date Available</label>
                            <div class="relative w-full">
                                <input v-model="propertyFilters.dateofContract" type="date" class="peer text-sm w-full px-3 py-2 border border-[#D9D9D9] rounded-full bg-[#F8F8F8]
                                focus:bg-white focus:ring-1 focus:ring-[#0F4841]" />
                                <!-- Fake placeholder -->
                                <span class="absolute left-3 top-3 text-[#BCBCBC] bg-[#F8F8F8] text-sm pointer-events-none
                                peer-focus:hidden" v-if="!propertyFilters.dateofContract">
                                    Select Request Date
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Active Filters -->
                <div class="mt-3">
                    <div class="text-sm font-medium text-black mb-1">Filtered by:</div>
                    <div class="flex items-center flex-wrap gap-2">
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

        <DataTable  v-if="!loading"  :data="tableData" :columns="tableHeaders" :initial-items-per-page="10" :th-width="100"/>
        <!--
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full min-w-[900px]">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>

                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                                MPS Property ID</th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                                <div class="flex items-center gap-1 cursor-pointer"
                                   >
                                    <span>Name & Surname</span>
                                    
                                </div>
                            </th>

                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                                <div>
                                    <span>Agency Listings</span>
                                </div>
                            </th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                                <div>
                                    <span>Agency Countries</span>
                                </div>
                            </th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                                <div class="flex items-center cursor-pointer" >
                                    <span>Property Status</span>
                                </div>
                            </th>
                            <th class="px-3 py-3 text-left text-xs font-medium text-gray-500  tracking-wider">
                                Date Available</th>
                            <th class="px-3 py-3 text-xs font-medium text-gray-500  tracking-wider">
                                <div class="flex items-center gap-1 cursor-pointer" >
                                    <span>In-App Action</span>
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
                                    <div v-for="(item, index) in user.agencyImages.slice(0, 3)" :key="index"
                                        class="flex items-center space-x-1">
                                        <NuxtImg :src="item.img" alt="agency" class="w-5 h-5 rounded-full" />
                                    </div>

                                    <div v-if="user.agencyImages.length > 3" class="text-xs font-medium text-gray-600">
                                        +{{ user.agencyImages.length - 3 }}
                                    </div>
                                </div>
                            </td>

                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <div v-for="(item, index) in user.agencyCountries.slice(0, 3)" :key="index"
                                        class="flex items-center space-x-1">
                                        <NuxtImg :src="item.img" alt="country" class="w-5 h-5 rounded-full" />
                                    </div>

                                    <div v-if="user.agencyCountries.length > 3"
                                        class="text-xs font-medium text-gray-600">
                                        +{{ user.agencyCountries.length - 3 }}
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap text-sm">
                                <div class="inline-flex items-center rounded-full p-1 px-2"
                                    :class="user.propertyStatus.trim().toLowerCase() === 'available' ? 'bg-green-100' : 'bg-red-100'">
                                    <div :class="user.propertyStatus.trim().toLowerCase() === 'available' ? 'bg-green-500' : 'bg-red-500'"
                                        class="w-2 h-2 rounded-full mr-2"></div>
                                    <span class="text-xs">
                                        {{ user.propertyStatus }}
                                    </span>
                                </div>
                            </td>

                            <td class="px-4 py-3 whitespace-nowrap text-sm text-black">
                                {{ user.dateofContract }}
                            </td>

                            <td class="px-4 py-3 whitespace-nowrap text-sm">
                                <span :class="user.inAppAction === 'Archived' ? 'text-green-800' : 'text-red-800'"
                                    class="px-2 py-1 rounded-full text-sm font-medium">
                                    {{ user.inAppAction }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>-->
    </div>
</template>
