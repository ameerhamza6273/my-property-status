<template>
    <div class="p-6 bg-gray-50">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-semibold text-gray-900">Admin Users</h1>
            <button @click="openModal"
                class="flex text-sm items-center gap-2 px-3 py-2 bg-[#0F4841] text-white rounded-full hover:bg-teal-700 transition-colors">
                <NuxtImg src="plus-circle.svg" width="16" height="16" />
                Add New User
            </button>
        </div>

        <!-- Results Count -->
        <div class="mb-4">
            <p class="text-sm text-[#0F4841] font-semibold">{{ usersData.length }} Results</p>
        </div>

        <DataTable :data="usersData" :columns="tableHeaders" :initial-items-per-page="10" :th-width="100">

            <!-- Permissions Column -->
            <!-- Permissions Column -->
            <template #cell-permissions="{ item }">
                <div class="flex flex-wrap items-center gap-1">
                    <!-- Show first 3 permissions with style -->
                    <span v-for="(perm, index) in item.permissions.slice(0, 3)" :key="perm"
                        class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#F8F8F8] border border-[#D9D9D9]">
                        {{ perm.charAt(0).toUpperCase() + perm.slice(1) }}
                    </span>

                    <!-- Show "+N" if more than 3 without style -->
                    <span v-if="item.permissions.length > 3" class="text-sm font-medium text-[#0F4841]">
                        +{{ item.permissions.length - 3 }}
                    </span>
                </div>
            </template>


            <!-- Edit Column -->
            <template #cell-edit="{ item }">
                <button @click="editUser(item.id)"
                    class="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-[#E2522E]">
                    <NuxtImg src="edit-red-icon.svg" width="16" height="16" />
                    Edit
                </button>
            </template>

        </DataTable>





        <!-- Add User Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white w-full max-w-xl rounded-xl shadow-lg relative">
                <!-- Modal Header -->
                <div class="flex items-center justify-between px-5 py-3 border-b border-[#D9D9D9]">
                    <h2 class="text-base font-semibold text-[#292929] max-w-[80%]">
                        {{ modalMode === 'add' ? 'Add a New Admin User' : 'Edit Admin User' }}
                    </h2>
                    <button @click="closeModal" class="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <NuxtImg src="close-icon.svg" width="24" height="24" />
                    </button>
                </div>

                <!-- Modal Content -->
                <div class="p-4">
                    <!-- Name & Surname -->
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <label for="name" class="block text-sm font-medium text-[#767676] mb-2">
                                Name
                            </label>
                            <input id="name" type="text" v-model="newUser.name" required
                                class="text-sm w-full px-4 py-2 h-[40px] border border-gray-300 rounded-full bg-white focus:bg-white focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
                                placeholder="Type Name.." />
                        </div>
                        <div class="flex-1">
                            <label for="surname" class="block text-sm font-medium text-[#767676] mb-2">
                                Surname
                            </label>
                            <input id="surname" type="text" v-model="newUser.surname" required
                                class="text-sm w-full px-4 py-2 h-[40px] border border-gray-300 rounded-full bg-white focus:bg-white focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
                                placeholder="Type Surname.." />
                        </div>
                    </div>

                    <!-- Mobile & Email -->
                    <div class="flex gap-4 mt-3">
                        <!-- Mobile Number -->
                        <div class="flex-1">
                            <label for="number" class="block text-sm font-medium text-[#767676] mb-2">
                                Mobile Number
                            </label>
                            <div
                                class="flex items-center h-[40px] w-full border border-gray-300 rounded-full bg-white px-3">
                                <input type="text" list="countryCodes" v-model="newUser.countryCode"
                                    class="text-sm outline-none w-14 bg-transparent" placeholder="+356" />
                                <datalist id="countryCodes">
                                    <option value="+356">Malta</option>
                                    <option value="+91">India</option>
                                    <option value="+92">Pakistan</option>
                                    <!-- You can add more common codes -->
                                </datalist>
                                <input id="number" type="number" v-model="newUser.mobile"
                                    class="text-sm w-full outline-none bg-transparent border-l border-gray-300 pl-2"
                                    placeholder="Type Mobile Number.." />
                            </div>


                        </div>

                        <!-- Email -->
                        <div class="flex-1">
                            <label for="email" class="block text-sm font-medium text-[#767676] mb-2">
                                Email
                            </label>
                            <input id="email" type="email" v-model="newUser.email" required
                                class="text-sm w-full px-4 py-2 h-[40px] border border-gray-300 rounded-full bg-white focus:bg-white focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
                                placeholder="Type Email.." />
                        </div>
                    </div>

                    <!-- Permissions (Multi-Select) -->
                    <div class="mt-3">
                        <label for="permission" class="block text-sm font-medium text-[#767676] mb-2">
                            Permissions
                        </label>
                        <div class="flex flex-nowrap items-center h-[40px] gap-2 w-full px-3 py-1 border border-gray-300 rounded-full bg-white focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] focus-within:border-[#0F4841] transition-colors overflow-x-auto scrollbar-hide"
                            @click="focusInput">
                            <!-- Selected Permissions -->
                            <span v-for="(perm, index) in selectedPermissions" :key="index"
                                class="flex items-center gap-1 px-2 py-1 bg-[#F8F8F8] rounded-full text-[#0F4841] text-sm font-medium border border-[#D9D9D9] shrink-0">
                                {{ perm }}
                                <button type="button" class="text-gray-500 hover:text-red-500"
                                    @click.stop="removePermission(index)">
                                    <NuxtImg src="x-circle-red.svg" alt="icon" class="w-[16px] h-[16px]" />
                                </button>
                            </span>

                            <!-- Input -->
                            <input ref="permissionInput" type="text" v-model="inputValue"
                                placeholder="Select Permissions below"
                                class="flex-1 text-sm bg-transparent outline-none min-w-[100px]"
                                @keydown.enter.prevent="addPermission" />
                        </div>

                        <!-- Available Permissions -->
                        <div class="flex flex-wrap gap-2 mt-3">
                            <span v-for="permission in permissions.filter(p => !selectedPermissions.includes(p))"
                                :key="permission" @click="selectPermission(permission)"
                                class="px-2.5 py-1 bg-[#F8F8F8] rounded-full cursor-pointer hover:bg-gray-200 text-xs border border-[#D9D9D9]">
                                {{ permission.charAt(0).toUpperCase() + permission.slice(1) }}
                            </span>
                        </div>


                    </div>

                    <!-- Save Button -->
                    <div class="text-right mt-6">
                        <button @click="saveUser"
                            class="text-sm bg-[#0F4841] text-white px-10 py-1 rounded-full hover:bg-teal-700">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const { getAdminUsers, getAdminModules } = useAdminUsers()

const usersData = ref([])
const permissions = ref([]) // ✅ now reactive and dynamic
const loading = ref(false)
const error = ref(null)

// ---------------- Permissions selected/input ----------------
const selectedPermissions = ref([])
const inputValue = ref("")
const permissionInput = ref(null)
const focusInput = () => permissionInput.value?.focus()
const selectPermission = (permission) => {
    if (!selectedPermissions.value.includes(permission)) {
        selectedPermissions.value.push(permission)
    }
    inputValue.value = ""
}
const addPermission = () => {
    if (inputValue.value.trim() && !selectedPermissions.value.includes(inputValue.value.trim())) {
        selectedPermissions.value.push(inputValue.value.trim())
    }
    inputValue.value = ""
}
const removePermission = (index) => selectedPermissions.value.splice(index, 1)

// ---------------- Fetch data on mounted ----------------
onMounted(async () => {
    loading.value = true
    try {
        // Fetch admin users
        const responseUsers = await getAdminUsers()

        // Fetch backend permissions/modules
        const responseModules = await getAdminModules()
        const allModules = responseModules?.data || []

        usersData.value = responseUsers?.data?.map((user) => {
            const roles = user.relationships?.roles || []
            let userPermissions = []

            roles.forEach(role => {
                const perms = role.relationships?.permissions?.data || []
                userPermissions.push(...perms.map(p => p.module_name))
            })

            // ✅ unique bana do
            const uniquePermissions = [...new Set(userPermissions)]

            return {
                id: user.id,
                name: user.attributes.name,
                email: user.attributes.email,
                phone_number: user.attributes.phone_number,
                is_active: user.attributes.is_active,
                created_at: user.attributes.created_at,
                // ✅ sirf pehla module (index 0) show kare
                permissions: uniquePermissions.length > 0 ? [uniquePermissions[0]] : []
            }
        }) || []



        // Save modules globally for modal selection
        permissions.value = allModules

    } catch (err) {
        error.value = err.message || "Failed to fetch admin data"
        console.error(err)
    } finally {
        loading.value = false
    }
})

const tableHeaders = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'phone_number', label: 'Phone' },
    { key: 'permissions', label: 'Permissions' },
    { key: 'edit', label: '' },
]

// ---------------- Modal logic & user form ----------------
const isModalOpen = ref(false)
const modalMode = ref("add") // "add" or "edit"

const newUser = ref({
    id: null,
    name: "",
    surname: "",
    countryCode: "+356",
    mobile: "",
    email: "",
})

const openModal = () => {
    modalMode.value = "add"
    resetForm()
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const editUser = (userId) => {
    const user = usersData.value.find(u => u.id === userId)
    if (!user) return

    const [firstName, ...rest] = (user.name || "").split(" ")
    const surname = rest.join(" ")

    newUser.value = {
        id: user.id,
        name: firstName,
        surname: surname,
        countryCode: user.phone_number?.split(" ")[0] || "+356",
        mobile: user.phone_number?.split(" ")[1] || "",
        email: user.email || "",
    }

    selectedPermissions.value = user.permissions ? [...user.permissions] : []
    modalMode.value = "edit"
    isModalOpen.value = true
}

const saveUser = () => {
    const fullName = `${newUser.value.name} ${newUser.value.surname}`
    if (modalMode.value === "add") {
        usersData.value.push({
            id: usersData.value.length + 1,
            name: fullName,
            phone_number: `${newUser.value.countryCode} ${newUser.value.mobile}`,
            email: newUser.value.email,
            permissions: [...selectedPermissions.value],
        })
    } else if (modalMode.value === "edit") {
        const idx = usersData.value.findIndex(u => u.id === newUser.value.id)
        if (idx !== -1) {
            usersData.value[idx] = {
                ...usersData.value[idx],
                name: fullName,
                phone_number: `${newUser.value.countryCode} ${newUser.value.mobile}`,
                email: newUser.value.email,
                permissions: [...selectedPermissions.value],
            }
        }
    }
    resetForm()
    closeModal()
}

const resetForm = () => {
    newUser.value = {
        id: null,
        name: "",
        surname: "",
        countryCode: "+356",
        mobile: "",
        email: "",
    }
    selectedPermissions.value = []
    inputValue.value = ""
}

</script>





<style scoped>
/* Hide scrollbar but keep scroll functionality */
.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
}
</style>