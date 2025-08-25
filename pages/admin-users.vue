<template>
    <div class="p-6 bg-white">
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
            <p class="text-sm text-[#0F4841]">{{ users.length }} Results</p>
        </div>

        <!-- Users Table -->
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <!-- Table Header -->
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div class="flex items-center gap-1 cursor-pointer" @click="toggleSort">
                                    <span>Name & Surname</span>
                                    <NuxtImg :src="sortIcon" width="16" height="16" />
                                </div>
                            </th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mobile Number
                            </th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Permissions
                            </th>
                            <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            </th>
                        </tr>
                    </thead>

                    <!-- Table Body -->
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="text-sm font-medium text-black">{{ user.name }}</div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="text-sm text-black">{{ user.mobile }}</div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
                                <div class="text-sm text-black">{{ user.email }}</div>
                            </td>
                            <td class="px-4 py-3 whitespace-nowrap">
  <div class="flex flex-wrap gap-1">
    <!-- Show first 3 permissions -->
    <span
      v-for="(permission, index) in user.permissions.slice(0, 3)"
      :key="permission"
      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
      :class="getPermissionClass(permission)"
    >
      {{ permission }}
    </span>

    <!-- Show +X if more than 3 permissions -->
    <span
      v-if="user.permissions.length > 3"
      :class="['inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium', getPermissionClass('+' + (user.permissions.length - 3))]"
    >
      +{{ user.permissions.length - 3 }}
    </span>
  </div>
</td>


                            <td class="px-4 py-3 whitespace-nowrap text-right">
                                <button @click="editUser(user.id)"
                                    class="inline-flex items-center gap-1 px-3 py-1 text-sm text-[#E2522E]">
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

        <!-- Add User Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white w-full max-w-xl rounded-xl shadow-lg relative">
                <!-- Modal Header -->
                <div class="flex items-center justify-between px-5 py-3 border-b border-[#D9D9D9]">
                    <h2 class="text-base font-semibold text-[#292929] max-w-[80%]">
                        Add a New Admin User
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
                                class="text-sm w-full px-4 py-2 border border-gray-300 rounded-full bg-white focus:bg-white focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
                                placeholder="Type Name.." style="height: 42px;" />
                        </div>
                        <div class="flex-1">
                            <label for="surname" class="block text-sm font-medium text-[#767676] mb-2">
                                Surname
                            </label>
                            <input id="surname" type="text" v-model="newUser.surname" required
                                class="text-sm w-full px-4 py-2 border border-gray-300 rounded-full bg-white focus:bg-white focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
                                placeholder="Type Surname.." style="height: 42px;" />
                        </div>
                    </div>

                    <!-- Mobile & Email -->
                    <div class="flex gap-4 mt-3">
                        <!-- Mobile Number -->
                        <div class="flex-1">
                            <label for="number" class="block text-sm font-medium text-[#767676] mb-2">
                                Mobile Number
                            </label>
                            <div class="flex items-center w-full border border-gray-300 rounded-full bg-white focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] focus-within:border-[#0F4841] transition-colors px-3"
                                style="height: 42px;">
                                <select class="bg-transparent outline-none text-gray-600 text-sm mr-2"
                                    v-model="newUser.countryCode">
                                    <option>+356</option>
                                    <option>+91</option>
                                    <option>+92</option>
                                </select>
                                <input id="number" type="number" placeholder="Type Mobile Number.."
                                    v-model="newUser.mobile"
                                    class="text-sm w-full outline-none bg-transparent border-l border-gray-300 pl-2" />
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="flex-1">
                            <label for="email" class="block text-sm font-medium text-[#767676] mb-2">
                                Email
                            </label>
                            <input id="email" type="email" v-model="newUser.email" required
                                class="text-sm w-full px-4 py-2 border border-gray-300 rounded-full bg-white focus:bg-white focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
                                placeholder="Type Email.." style="height: 42px;" />
                        </div>
                    </div>

                    <!-- Permissions (Multi-Select) -->
                    <div class="mt-3">
                        <label for="permission" class="block text-sm font-medium text-[#767676] mb-2">
                            Permissions
                        </label>
                        <div class="flex flex-wrap items-center gap-2 w-full px-3 py-1 border border-gray-300 rounded-full bg-white focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] focus-within:border-[#0F4841] transition-colors"
                            style="min-height: 42px;" @click="focusInput">
                            <!-- Selected Permissions -->
                            <span v-for="(perm, index) in selectedPermissions" :key="index"
                                class="flex items-center gap-1 px-2 py-1 bg-[#F8F8F8] rounded-full text-xs border border-[#D9D9D9]">
                                {{ perm }}
                                <button type="button" class="text-gray-500 hover:text-red-500"
                                    @click.stop="removePermission(index)">
                                    &times;
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
                            <span v-for="permission in permissions" :key="permission"
                                @click="selectPermission(permission)"
                                class="px-2.5 py-1 bg-[#F8F8F8] rounded-full cursor-pointer hover:bg-gray-200 text-xs border border-[#D9D9D9]">
                                {{ permission }}
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

<script setup lang="ts">
import { ref, computed } from "vue";

interface User {
    id: number;
    name: string;
    mobile: string;
    email: string;
    permissions: string[];
}

// State for modal
const isModalOpen = ref(false);
const openModal = () => {
    isModalOpen.value = true;
};
const closeModal = () => {
    isModalOpen.value = false;
};

// New user data
const newUser = ref({
    name: "",
    surname: "",
    countryCode: "+356",
    mobile: "",
    email: "",
});

// Permissions
const permissions = [
    "Full Permission",
    "Dashboard",
    "Admin",
    "Agencies",
    "Properties",
    "Customers",
    "Notifications",
    "What's new",
    "Support",
    "Reports",
];

// Selected permissions
const selectedPermissions = ref<string[]>([]);
const inputValue = ref("");
const permissionInput = ref<HTMLInputElement | null>(null);

const focusInput = () => {
    permissionInput.value?.focus();
};

const selectPermission = (permission: string) => {
    if (!selectedPermissions.value.includes(permission)) {
        selectedPermissions.value.push(permission);
    }
    inputValue.value = "";
};

const addPermission = () => {
    if (
        inputValue.value.trim() &&
        !selectedPermissions.value.includes(inputValue.value.trim())
    ) {
        selectedPermissions.value.push(inputValue.value.trim());
    }
    inputValue.value = "";
};

const removePermission = (index: number) => {
    selectedPermissions.value.splice(index, 1);
};

// Sample data
const users = ref<User[]>([
    {
        id: 1,
        name: "Kathryn Murphy",
        mobile: "+356 79 394 592",
        email: "Kathryn@mypropertystatus.com",
        permissions: ["Full Permission"],
    },
    {
        id: 2,
        name: "Ronald Richards",
        mobile: "+356 79 344 232",
        email: "Ronald@mypropertystatus.com",
        permissions: ["Agencies", "Customers", "Support", "Reports"],
    },
    {
        id: 3,
        name: "Courtney Henry",
        mobile: "+356 99 314 342",
        email: "Courtney@mypropertystatus.com",
        permissions: ["Reports"],
    },
    {
        id: 4,
        name: "Cameron Williamson",
        mobile: "+356 79 594 592",
        email: "Cameron@mypropertystatus.com",
        permissions: ["Properties", "Notifications"],
    },
]);

// Save new user
const saveUser = () => {
    const fullName = `${newUser.value.name} ${newUser.value.surname}`;
    users.value.push({
        id: users.value.length + 1,
        name: fullName,
        mobile: `${newUser.value.countryCode} ${newUser.value.mobile}`,
        email: newUser.value.email,
        permissions: [...selectedPermissions.value],
    });
    // Reset
    newUser.value = {
        name: "",
        surname: "",
        countryCode: "+356",
        mobile: "",
        email: "",
    };
    selectedPermissions.value = [];
    inputValue.value = "";
    closeModal();
};

const getPermissionClass = (permission: string) => {
    const baseClasses = "bg-[#F8F8F8] text-black border border-[#D9D9D9]";
    // If permission starts with "+", remove background & border
    return permission.startsWith("+")
        ? "bg-transparent text-black border-none"
        : baseClasses;
};



// Edit action
const editUser = (userId: number) => {
    console.log("Edit user:", userId);
};

// Sorting state
const sortOrder = ref<"asc" | "desc" | null>(null);
const sortIcon = computed(() => {
    return sortOrder.value === null
        ? "switch-vertical.svg"
        : "export-switch-vertical.svg";
});

// Toggle sort logic (three states)
const toggleSort = () => {
    if (sortOrder.value === null) {
        sortOrder.value = "asc";
    } else if (sortOrder.value === "asc") {
        sortOrder.value = "desc";
    } else {
        sortOrder.value = null;
    }
    sortUsers();
};

// Apply sorting or reset
const sortUsers = () => {
    if (sortOrder.value === null) {
        users.value = [...users.value].sort((a, b) => a.id - b.id);
        return;
    }

    users.value.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortOrder.value === "asc"
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
    });
};
</script>
