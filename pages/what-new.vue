<script setup>
import { ref, computed } from "vue";

// Active tab
const activeTab = ref("active");

// ------------------- Data -------------------
const activeArticles = ref([
    {
        id: 1,
        position: 1,
        image: "What-New-Image.svg",
        title: "Tips to Sell Faster",
        description: "Boost your property visibility with our latest expert guide."
    },
    {
        id: 2,
        position: 2,
        image: "What-New-Image.svg",
        title: "Tips to Sell Faster",
        description: "Boost your property visibility with our latest expert guide."
    },
    {
        id: 3,
        position: 3,
        image: "What-New-Image.svg",
        title: "Tips to Sell Faster",
        description: "Boost your property visibility with our latest expert guide."
    }
]);

const archivedArticles = ref([
    {
        id: 6,
        position: 1,
        image: "What-New-Image.svg",
        title: "Old Marketing Tips",
        description: "Previous strategies that were effective in past markets."
    },
    {
        id: 7,
        position: 2,
        image: "What-New-Image.svg",
        title: "Legacy Practices",
        description: "Traditional approaches to property management and sales."
    }
]);

// ------------------- Computed: Current Data -------------------
const currentData = computed(() =>
    activeTab.value === "active" ? activeArticles.value : archivedArticles.value
);

// ------------------- Table Columns -------------------
const tableColumns = [
    { label: "Position", key: "position" },
    { label: "Image", key: "image" },
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "", key: "actions" }
];

// ------------------- Event Handlers -------------------
const handleEdit = (article) => {
    console.log("Edit article:", article);
};

const handleDelete = (article) => {
    console.log("Delete article:", article);
};

const addNewArticle = () => {
    console.log("Add new article");
};
</script>

<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <!-- ✅ Header Section (As You Wanted) -->
        <h1 class="text-2xl font-semibold text-gray-900">What's New</h1>

        <!-- Tabs -->
        <div class="inline-flex border border-gray-300 rounded-full bg-white my-6">
            <button @click="activeTab = 'active'" :class="[
                'py-1.5 px-8 text-sm font-medium rounded-full transition-colors',
                activeTab === 'active' ? 'bg-[#0F4841] text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
            ]">
                Active
            </button>
            <button @click="activeTab = 'archived'" :class="[
                'py-1.5 px-8 text-sm font-medium rounded-full transition-colors',
                activeTab === 'archived' ? 'bg-[#0F4841] text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
            ]">
                Archived
            </button>
        </div>

        <!-- Results Count + Add Button -->
        <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-[#0F4841] font-semibold">{{ currentData.length }} Results</p>
            <button @click="addNewArticle"
                class="flex text-sm items-center gap-2 px-3 py-2 bg-[#0F4841] text-white rounded-full hover:bg-teal-700 transition-colors">
                <NuxtImg src="plus-circle.svg" width="16" height="16" />
                Add New Article
            </button>
        </div>

        <!-- ✅ Data Table Section -->
        <DataTable :data="currentData" :columns="tableColumns" :initial-items-per-page="10">
            <!-- Custom Cell for Image -->
            <template #cell-image="{ item }">
                <img :src="item.image" :alt="item.title"
                    class="w-20 h-15 object-cover rounded-lg border border-gray-200" />
            </template>

            <!-- Custom Cell for Actions -->
            <template #cell-actions="{ item }">
                <div class="flex justify-center gap-2">

                    <button @click="handleEdit(item)"
                        class="inline-flex items-center gap-1 px-3 py-1 text-sm text-[#E2522E] hover:text-red-700">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                    <button @click="handleDelete(item)" class="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete">
                        <NuxtImg src="archive-icon.svg" width="30" height="30" />

                    </button>
                    <button @click="handleDelete(item)" class="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete">
                        <NuxtImg src="delete-icon.svg" width="30" height="30" />

                    </button>
                </div>
            </template>
        </DataTable>
    </div>
</template>
