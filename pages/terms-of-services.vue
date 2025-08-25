<template>
    <div class="p-6 bg-gray-50 h-screen">
        <!-- Header Section -->
        <!-- Header Section -->
        <div class="flex items-center gap-6 mb-6">
            <h1 class="text-2xl font-semibold text-gray-900">Terms Of Service</h1>

            <!-- Edit / Save Button -->
            <button v-if="!isEditing" @click="toggleEdit"
                class="inline-flex items-center gap-1 px-3 py-1 text-base underline text-[#E2522E]">
                <svg class="w-6 h-6" fill="none" stroke="#E2522E" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
            </button>

            <!-- Your custom Save Button -->
            <button v-else @click="toggleEdit"
                class="flex text-sm items-center gap-2 px-3 py-1.5 bg-[#469C52] text-white rounded-full hover:bg-teal-700 transition-colors">
                <NuxtImg src="save-icon.svg" width="16" height="16" />
                Save
            </button>
        </div>


        <!-- Terms Section -->
        <div class="bg-white rounded-2xl p-4 px-6 h-[80vh] overflow-y-auto custom-scroll">
            <div v-for="(section, index) in terms" :key="index" class="mb-6">
                <h3 class="text-base font-semibold text-black">
                    <span v-if="!isEditing">{{ section.title }}</span>
                    <input v-else v-model="section.title" class="border rounded px-2 py-1 text-sm w-full mb-2" />
                </h3>

                <p class="text-base text-[#595959] font-medium mt-1">
                    <span v-if="!isEditing">{{ section.content }}</span>
                    <textarea v-else v-model="section.content" class="border rounded px-2 py-1 text-sm w-full"
                        rows="3"></textarea>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// State to toggle edit mode
const isEditing = ref(false);

// Reactive terms data
const terms = ref([
    {
        title: "Usage",
        content:
            "You may use this app to view and update property status information. Do not misuse the platform or attempt unauthorized access.",
    },
    {
        title: "Data Accuracy",
        content:
            "You are responsible for ensuring that any property data you input is accurate and up to date.",
    },
    {
        title: "Privacy",
        content:
            "We respect your privacy. Any personal or property-related information you provide will be handled as described in our [Privacy Policy].",
    },
    {
        title: "Account Security",
        content:
            "Keep your login credentials secure. You are responsible for all activity under your account.",
    },
    {
        title: "Modifications",
        content:
            "We may update these terms or the app features at any time. Continued use means you accept any changes.",
    },
    {
        title: "Limitation of Liability",
        content:
            "We are not responsible for any loss or damage resulting from the use of this app.",
    },
    {
        title: "Termination",
        content:
            "We reserve the right to suspend or terminate your access if you violate these terms.",
    },
]);

const toggleEdit = () => {
    if (isEditing.value) {
        // When saving, you can send updated data to backend API here
        console.log("Saving updated terms:", terms.value);
    }
    isEditing.value = !isEditing.value;
};
</script>
