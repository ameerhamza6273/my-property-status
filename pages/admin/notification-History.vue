<script setup>
import { ref, computed } from "vue";

const activeTab = ref("customPush"); // Default active tab

// ------------------- Columns for DataTable -------------------
const tableColumns = [
  { label: "# Sent", key: "sent", sortable: true },
  { label: "Date", key: "date", sortable: true },
  { label: "Title", key: "title", sortable: false },
  { label: "Description", key: "description", sortable: false }
];

// ------------------- Notifications Data -------------------
const customPushNotifications = ref([
  { sent: 300, date: "25/04/2026", title: "Tips to Sell Faster", description: "Boost your property visibility with our latest expert guide." },
  { sent: 20, date: "24/04/2026", title: "Grow Faster", description: "Engage with customers effectively." },
  { sent: 2, date: "23/04/2026", title: "New Features", description: "Explore new tools in the platform." }
]);

const customEmailNotifications = ref([
  { sent: 150, date: "24/04/2026", title: "Welcome Email", description: "Start your journey with our latest tips." },
  { sent: 100, date: "23/04/2026", title: "Reminder Email", description: "Complete your profile for better experience." }
]);

const systemPushNotifications = ref([
  { sent: 80, date: "22/04/2026", title: "System Update", description: "Your system has been updated successfully." }
]);

const systemEmailNotifications = ref([
  { sent: 50, date: "22/04/2026", title: "System Alert", description: "Please verify your email for security purposes." }
]);

// ------------------- Current Data Based on Active Tab -------------------
const filteredCustomers = computed(() => {
  if (activeTab.value === "customPush") return customPushNotifications.value;
  if (activeTab.value === "customEmail") return customEmailNotifications.value;
  if (activeTab.value === "systemPush") return systemPushNotifications.value;
  if (activeTab.value === "systemEmail") return systemEmailNotifications.value;
  return [];
});

// ------------------- Event Handlers -------------------
const handleSortChange = (sortInfo) => {
  console.log("Sort changed:", sortInfo);
  // If your DataTable handles sorting internally, nothing else needed.
};

const handlePageChange = (pageInfo) => {
  console.log("Page changed:", pageInfo);
};
</script>

<template>
  <div class="p-6 bg-gray-50">
    <!-- Header -->
    <h1 class="text-2xl font-semibold text-gray-900 mb-4">Notification History</h1>

    <!-- Tabs -->
    <div class="inline-flex border border-gray-300 rounded-full bg-white mb-6">
      <button @click="activeTab = 'customPush'" :class="[ 'py-1.5 px-6 text-sm font-medium rounded-full transition-colors', activeTab === 'customPush' ? 'bg-[#0F4841] text-white' : 'bg-white text-gray-600 hover:bg-gray-200']">
        Custom Push Notifications
      </button>
      <button @click="activeTab = 'customEmail'" :class="[ 'py-1.5 px-6 text-sm font-medium rounded-full transition-colors', activeTab === 'customEmail' ? 'bg-[#0F4841] text-white' : 'bg-white text-gray-600 hover:bg-gray-200']">
        Custom Email Notifications
      </button>
      <button @click="activeTab = 'systemPush'" :class="[ 'py-1.5 px-6 text-sm font-medium rounded-full transition-colors', activeTab === 'systemPush' ? 'bg-[#0F4841] text-white' : 'bg-white text-gray-600 hover:bg-gray-200']">
        System Push Notifications
      </button>
      <button @click="activeTab = 'systemEmail'" :class="[ 'py-1.5 px-6 text-sm font-medium rounded-full transition-colors', activeTab === 'systemEmail' ? 'bg-[#0F4841] text-white' : 'bg-white text-gray-600 hover:bg-gray-200']">
        System Email Notifications
      </button>
    </div>

    <!-- Results Count -->
    <div class="mb-4">
        <p class="text-sm text-[#0F4841] font-semibold">{{ filteredCustomers.length }} Results</p>
    </div>

    <!-- Data Table -->
    <DataTable
      :data="filteredCustomers"
      :columns="tableColumns"
      :initial-items-per-page="10"
      @sort-change="handleSortChange"
      @page-change="handlePageChange"
    />
  </div>
</template>
