<script setup>
import { ref, computed } from "vue";

const activeTab = ref("push"); // Default active tab

// ------------------- Table Columns -------------------
const tableColumns = [
  { label: "Notification Name", key: "notificationName", sortable: true },
  { label: "Title", key: "title", sortable: true },
  { label: "Description", key: "description", sortable: false }
];

// ------------------- Data -------------------
const pushNotifications = ref([
  { notificationName: "Welcome Notification", title: "Tips to Sell Faster", description: "Boost your property visibility with our latest expert guide." },
  { notificationName: "Sending Code", title: "Grow Faster", description: "Engage with customers effectively." },
  { notificationName: "Sending Code", title: "New Features", description: "Explore new tools in the platform." },
  { notificationName: "Sending Code", title: "Market Insights", description: "Stay ahead with the latest trends." },
  { notificationName: "Sending Code", title: "Quick Tips", description: "Simple ways to improve your listing." }
]);

const emailNotifications = ref([
  { notificationName: "Email Welcome", title: "Start Your Journey", description: "Thank you for joining! Here’s what you need to know." },
  { notificationName: "Reminder Email", title: "Complete Your Profile", description: "Fill in your profile to get the best experience." }
]);

// ------------------- Computed: Current Data -------------------
const currentData = computed(() => {
  return activeTab.value === "push" ? pushNotifications.value : emailNotifications.value;
});

// ------------------- Event Handlers (Optional) -------------------
const handleSortChange = (sortInfo) => {
  console.log("Sort changed:", sortInfo);
};

const handlePageChange = (pageInfo) => {
  console.log("Page changed:", pageInfo);
};
</script>

<template>
  <div class="p-6 bg-gray-50">
    <!-- Header -->
    <h1 class="text-2xl font-semibold text-gray-900 mb-4">System Notifications</h1>

    <!-- Tabs -->
    <div class="inline-flex border border-gray-300 rounded-full bg-white mb-6">
      <button
        @click="activeTab = 'push'"
        :class="[
          'py-1.5 px-8 text-sm font-medium rounded-full transition-colors',
          activeTab === 'push' ? 'bg-[#0F4841] text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
        ]"
      >
        Push Notifications
      </button>
      <button
        @click="activeTab = 'email'"
        :class="[
          'py-1.5 px-8 text-sm font-medium rounded-full transition-colors',
          activeTab === 'email' ? 'bg-[#0F4841] text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
        ]"
      >
        Email Notifications
      </button>
    </div>

     <!-- Results Count -->
        <div class="mb-4">
            <p class="text-sm text-[#0F4841] font-semibold">{{ currentData.length }} Results</p>
        </div>

    <!-- Data Table -->
    <DataTable
      :data="currentData"
      :columns="tableColumns"
      :initial-items-per-page="10"
      @sort-change="handleSortChange"
      @page-change="handlePageChange"
    />
  </div>
</template>
