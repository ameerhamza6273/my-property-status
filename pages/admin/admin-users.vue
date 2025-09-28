<template>
    <div class="p-6 bg-gray-50">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Admin Users</h1>
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
        <div class="relative min-h-[200px]">
            <div v-if="loading">
                <SnipLoader /> <!-- ✅ sirf yahan loader dikhayenge -->
            </div>
            <DataTable v-else :data="usersData" :columns="tableHeaders" :initial-items-per-page="10" :th-width="100">
                <template #cell-permissions="{ item }">
                    <div class="flex flex-wrap items-center gap-1">
                        <!-- ✅ Agar user ke permissions mein authentication hai, to saare modules -->
                        <span v-for="(module, index) in (item.permissions.includes('authentication')
                            ? permissions
                            : permissions.filter(m => item.permissions.includes(m))
                        ).slice(0, 3)" :key="module"
                            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-[#F8F8F8] text-[#292929] border-[#D9D9D9]">
                            {{ module.charAt(0).toUpperCase() + module.slice(1) }}
                        </span>

                        <!-- ✅ Agar zyada modules hain to +N -->
                        <span v-if="(item.permissions.includes('authentication')
                            ? permissions.length
                            : permissions.filter(m => item.permissions.includes(m)).length
                        ) > 3" class="text-sm font-medium text-[#0F4841]">
                            +{{
                                (item.permissions.includes('authentication')
                                    ? permissions.length
                                    : permissions.filter(m => item.permissions.includes(m)).length
                            ) - 3
                            }}
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
        </div>

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
                        <button @click="saveUser" :disabled="saving"
                            class="text-sm bg-[#0F4841] text-white px-10 py-1 rounded-full hover:bg-teal-700 disabled:opacity-60">
                            {{ saving ? "Saving..." : "Save" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";

const { getAdminUsers, getAdminModules, createAdminUser, updateAdminUser } = useAdminUsers()

const usersData = ref([])
const permissions = ref([]) // reactive and normalized array of strings
const loading = ref(true);
const saving = ref(false);
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
    const val = inputValue.value.trim()
    if (val && !selectedPermissions.value.includes(val)) {
        selectedPermissions.value.push(val)
    }
    inputValue.value = ""
}
const removePermission = (index) => selectedPermissions.value.splice(index, 1)

// ---------------- Helper: normalize modules (permissions) ----------------
const normalizeModules = (modules) => {
    if (!modules) return []
    // modules might be array of strings or array of objects
    return (Array.isArray(modules) ? modules : [])
        .map(m => {
            if (!m) return null
            if (typeof m === "string") return m
            return m.module_name ?? m.name ?? m.attributes?.module_name ?? m.attributes?.name ?? null
        })
        .filter(Boolean)
}

// ---------------- Helper: map users response to UI-friendly shape ----------------
const mapUsers = (usersArray) => {
    if (!Array.isArray(usersArray)) return []
    return usersArray.map(user => {
        const attrs = user.attributes ?? {}
        // roles might be in user.relationships.roles or relationships.roles.data or user.roles
        const rolesRaw = user.relationships?.roles ?? user.relationships?.roles?.data ?? user.roles ?? []
        const roles = Array.isArray(rolesRaw) ? rolesRaw : (rolesRaw?.data ?? [])
        let userPermissions = []

        roles.forEach(role => {
            const permsRaw = role.relationships?.permissions ?? role.relationships?.permissions?.data ?? role.permissions ?? []
            const perms = Array.isArray(permsRaw) ? permsRaw : (permsRaw?.data ?? [])
            perms.forEach(p => {
                if (!p) return
                const moduleName = (typeof p === "string")
                    ? p
                    : (p.module_name ?? p.name ?? p.attributes?.module_name ?? p.attributes?.name)
                if (moduleName) userPermissions.push(moduleName)
            })
        })

        const uniquePermissions = [...new Set(userPermissions)]

        return {
            id: user.id ?? attrs.id,
            name: attrs.name ?? attrs.full_name ?? "",
            email: attrs.email ?? "",
            phone_number: attrs.phone_number ?? attrs.phone ?? "",
            is_active: attrs.is_active ?? 0,
            created_at: attrs.created_at ?? "",
            permissions: uniquePermissions // full list (template will slice for display)
        }
    })
}

// ---------------- Fetch data on mounted ----------------
onMounted(async () => {
    try {
        loading.value = true

        const responseUsers = await getAdminUsers()
        const responseModules = await getAdminModules()

        // modules normalization
        const allModules = responseModules?.data ?? responseModules ?? []
        permissions.value = normalizeModules(allModules)

        // users mapping (handle different response shapes)
        const usersPayload = responseUsers?.data ?? responseUsers ?? []
        usersData.value = mapUsers(Array.isArray(usersPayload) ? usersPayload : [])
    } catch (err) {
        error.value = err?.message || "Failed to fetch admin data"
        console.error("onMounted fetch error:", err)
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
    // optional: password fields (we use defaults if empty)
    password: "",
    password_confirmation: ""
})

const openModal = () => {
    modalMode.value = "add"
    resetForm()
    selectedPermissions.value = []   // ✅ ensure empty on new user
    isModalOpen.value = true
    console.log("Selected perms before save:", selectedPermissions.value)

}


const closeModal = () => {
    isModalOpen.value = false
}

const editUser = (userId) => {
    const user = usersData.value.find(u => u.id === userId)
    if (!user) return

    const [firstName, ...rest] = (user.name || "").split(" ")
    const surname = rest.join(" ")

    const phone = user.phone_number || ""
    let countryCode = "+356"
    let mobile = phone

    if (phone.startsWith("+")) {
        const match = phone.match(/^(\+\d{1,4})(\d+)$/)
        if (match) {
            countryCode = match[1]
            mobile = match[2]
        }
    }

    newUser.value = {
        id: user.id,
        name: firstName,
        surname: surname,
        countryCode,
        mobile,
        email: user.email || "",
        password: "",
        password_confirmation: "",
        is_active: typeof user.is_active !== "undefined" ? user.is_active : 1
    }

    selectedPermissions.value = user.permissions ? [...user.permissions] : []
    modalMode.value = "edit"
    isModalOpen.value = true
}



const saveUser = async () => {
    const fullName = `${newUser.value.name} ${newUser.value.surname}`.trim()

    // ✅ phone_number normalize
    const formattedPhone = `${newUser.value.countryCode.replace("+", "")}${newUser.value.mobile}`.trim()

    if (modalMode.value === "add") {
        saving.value = true
        try {
            const payload = {
                email: newUser.value.email,
                name: fullName,
                password: newUser.value.password && newUser.value.password.length
                    ? newUser.value.password
                    : "11223344",
                password_confirmation:
                    newUser.value.password_confirmation && newUser.value.password_confirmation.length
                        ? newUser.value.password_confirmation
                        : (newUser.value.password && newUser.value.password.length
                            ? newUser.value.password
                            : "11223344"),
                phone_number: formattedPhone,
                permissions: Array.isArray(selectedPermissions.value) ? [...selectedPermissions.value] : [],
                is_active: 1
            }

            const res = await createAdminUser(payload)
            console.log("✅ Create Admin User response:", res)

            // Refresh users list
            const responseUsers = await getAdminUsers()
            const usersPayload = responseUsers?.data ?? responseUsers ?? []
            usersData.value = mapUsers(Array.isArray(usersPayload) ? usersPayload : [])

            closeModal()
            resetForm()
        } catch (err) {
            console.error("Failed to create user:", err, {
                response: err?.response ?? err?.data ?? err?.response?._data
            })
            const serverMessage =
                err?.response?._data?.message ??
                err?.response?._data ??
                err?.data?.message ??
                err?.message
            alert(`Error creating user: ${serverMessage ?? "See console for details"}`)
        } finally {
            saving.value = false
        }
    } else if (modalMode.value === "edit") {
        saving.value = true
        try {
            const payload = {
                name: fullName,
                email: newUser.value.email,
                phone_number: formattedPhone,
                permissions: Array.isArray(selectedPermissions.value) ? [...selectedPermissions.value] : [],
                is_active: 1
            }

            console.log("📤 Update payload:", payload)

            await updateAdminUser(newUser.value.id, payload)

            // Refresh list after update
            const responseUsers = await getAdminUsers()
            const usersPayload = responseUsers?.data ?? responseUsers ?? []
            usersData.value = mapUsers(Array.isArray(usersPayload) ? usersPayload : [])

            closeModal()
            resetForm()
        } catch (err) {
            console.error("Failed to update user:", err, {
                status: err?.response?.status,
                data: err?.response?._data ?? err?.data ?? err
            })
            const serverMessage =
                (err && err.response && err.response._data && err.response._data.message) ||
                (err && err.data && err.data.message) ||
                err.message
            alert(`Error updating user: ${serverMessage || "See console for details"}`)
        } finally {
            saving.value = false
        }
    }

}



const resetForm = () => {
    newUser.value = {
        id: null,
        name: "",
        surname: "",
        countryCode: "+356",
        mobile: "",
        email: "",
        password: "",
        password_confirmation: "",
        is_active: 1
    }
    selectedPermissions.value = []
    inputValue.value = ""
    saving.value = false
}
useHead({
  meta: [
    { name: 'viewport', content: 'width=1330' }
  ]
})
</script>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>