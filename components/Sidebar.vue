<template>
  <div class="bg-white border-r border-gray-200 flex flex-col h-screen">
    <!-- Header -->
    <div class="p-5 border-b border-gray-100">
      <NuxtImg src="Logo.svg" alt="Logo" width="150" />
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 px-3 overflow-y-auto custom-scroll">
      <ul class="space-y-1">
        <li v-for="item in menuItems" :key="item.label" class="relative" @click.stop>
          <!-- Parent -->
          <NuxtLink :to="item.to || '#'"
            class="group flex items-center justify-between px-3 py-2 rounded-full transition-colors duration-200"
            :class="isActiveParent(item)
                ? 'bg-[#0F4841] text-white'
                : 'text-gray-600 hover:bg-[#0F4841] hover:text-white'
              " @click="handleClick(item, $event)">
            <div class="flex items-center space-x-1">
              <NuxtImg :src="item.icon" :alt="item.label" width="20" class="transition-all duration-200" :class="isActiveParent(item)
                  ? 'filter brightness-[4.5]'
                  : 'group-hover:filter group-hover:brightness-[4.5]'
                " />
              <span class="text-sm transition-colors duration-200" :class="isActiveParent(item)
                  ? 'text-white'
                  : 'text-[#595959] group-hover:text-white'
                ">
                {{ item.label }}
              </span>
            </div>

            <!-- Arrow -->
            <NuxtImg v-if="item.children" src="/dropdown-icon.svg" alt="Dropdown" class="w-4 h-4 transition-transform"
              :class="[
                isDropdownOpen(item) ? 'rotate-180' : '',
                isActiveParent(item)
                  ? 'filter brightness-[4.5]'
                  : 'group-hover:filter group-hover:brightness-[4.5]'
              ]" />
          </NuxtLink>

          <!-- Dropdown Items -->
          <transition name="fade">
            <ul v-if="item.children && isDropdownOpen(item)" class="pl-4 mt-2 space-y-1">
              <li v-for="child in item.children" :key="child.to" class="flex items-center">
                <NuxtLink :to="child.to" class="flex items-center space-x-2 text-sm transition-colors w-full pt-1"
                  :class="isActive(child.to)
                      ? 'font-semibold text-[#0F4841]'
                      : 'text-[#595959] hover:text-[#0F4841]'
                    " @click="openDropdown = null">
                  <NuxtImg src="/before-icon.svg" alt="icon" width="18" height="30" class="mt-[-20px]" />
                  <span>{{ child.label }}</span>
                </NuxtLink>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </nav>

    <!-- User Profile Section -->
    <div class="p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-medium">
              {{name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}}
            </span>
          </div>
          <span class="text-gray-700 font-medium">
            {{ name || 'User' }}
          </span>

        </div>
        <button @click="open = true" class="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" title="Logout">
          <NuxtImg src="user-red-icon.svg" alt="Logout" width="20" />
        </button>
      </div>
    </div>
    <ConfirmModal
    :show="open"
    title="Log Out"
    description="Are you sure you want to log out?"
    confirm-text="Log Out"
    cancel-text="Cancel"
    icon="/logout-icon.svg"
    @confirm="handleLogout"
    @cancel="open = false"
  />
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from '#app'

const route = useRoute()
const router = useRouter()
const open = ref(false)
const openDropdown = ref(null)
const role = ref(null)
const name = ref(null)

onMounted(() => {
  const savedRole = localStorage.getItem('role')
  if (savedRole) role.value = savedRole

  const savedName = localStorage.getItem('name')
  if (savedName) name.value = savedName

})

const handleLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("role")
  localStorage.removeItem("name")

  open.value = false
  router.push("/")
}

// ✅ Admin & Agency Menus
const adminMenu = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '/dashboard-icon.svg' },
  {
    label: 'Admin',
    icon: 'admin-icon.svg',
    children: [
      { to: '/admin/admin-users', label: 'Admin Users' },
      { to: '/admin/terms-of-services', label: 'Terms Of Services' }
    ]
  },
  { to: '/admin/agencies', label: 'Agencies', icon: 'agencies-icon.svg' },
  {
    label: 'Properties',
    icon: 'properties-icon.svg',
    children: [
      { to: '/admin/new-connection-requests', label: 'New Connection Requests' },
      { to: '/admin/rental-properties', label: 'Rental Properties' },
      { to: '/admin/sale-properties', label: 'Sale Properties' }
    ]
  },
  { to: '/admin/customers', label: 'Customers', icon: 'customers-icon.svg' },
  {
    label: 'Notifications',
    icon: 'notifications-icon.svg',
    children: [
      { to: '/admin/send-push-notification', label: 'Send Push Notification' },
      { to: '/admin/send-email-notification', label: 'Send Email Notification' },
      { to: '/admin/system-notifications', label: 'System Notifications' },
      { to: '/admin/notification-history', label: 'Notification History' }
    ]
  },
  { to: '/admin/what-new', label: 'What’s New', icon: '/whatsnew-icon.svg' },
  { to: '/admin/support', label: 'Support', icon: '/support-icon.svg' },
  { to: '/admin/reports', label: 'Reports', icon: '/reports-icon.svg' }
]

const agencyMenu = [
  { to: '/agency/dashboard', label: 'Dashboard', icon: '/dashboard-icon.svg' },
  { to: '/agency/new-connection-requests', label: 'New Connection Requests', icon: '/admin-icon.svg' },
  { to: '/agency/linked-rental-properties', label: 'Linked Rental Properties', icon: '/Linked-icon.svg' },
  { to: '/agency/linked-sale-properties', label: 'Linked Sale Properties', icon: '/Linked-Sale.svg' }
]

// ✅ Dynamic Menu based on role
// ✅ Dynamic Menu based on role
const menuItems = computed(() => {
  if (!role.value) return []

  if (role.value === 'super_admin') {
    // Admin menu clone karke agency ke items merge karenge
    // Lekin agency dashboard skip karenge
    const mergedMenus = [
      ...adminMenu,
      ...agencyMenu.filter(item => item.label !== 'Dashboard')
    ]
    return mergedMenus
  }

  return role.value === 'admin' ? adminMenu : agencyMenu
})


// ✅ Active State Checks
const isActiveParent = (item) => {
  if (item.children) {
    return item.children.some((child) => route.path.startsWith(child.to))
  }
  return item.to && route.path.startsWith(item.to)
}

const isActive = (path) => route.path === path

// ✅ Handle Dropdown Click Toggle
const handleClick = (item, event) => {
  if (item.children) {
    event.preventDefault()
    openDropdown.value =
      openDropdown.value === item.label ? null : item.label
  } else {
    openDropdown.value = null
  }
}

// ✅ Dropdown open condition
const isDropdownOpen = (item) => {
  return openDropdown.value === item.label || isActiveParent(item)
}

// ✅ Close dropdown on route change
watch(
  () => route.path,
  () => {
    openDropdown.value = null
  }
)

// ✅ Close all dropdowns on outside click
const closeAllDropdowns = () => {
  openDropdown.value = null
}

onMounted(() => {
  document.addEventListener('click', closeAllDropdowns)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeAllDropdowns)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} 
</style>
