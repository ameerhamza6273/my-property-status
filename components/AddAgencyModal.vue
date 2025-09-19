<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="closeModal"></div>

        <!-- Modal -->
        <div class="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <!-- Header -->
            <div class="flex items-center justify-between p-4">
                <h2 class="text-lg font-bold text-[#292929] max-w-[80%]">
                    Add a New Agency
                </h2>
                <button @click="closeModal" class="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <NuxtImg src="close-icon.svg" width="24" height="24" />
                </button>
            </div>

            <!-- Step Indicator -->
            <div class="flex items-center bg-[#F8F8F8] px-5 py-3">
                <div class="flex items-center space-x-8">
                    <!-- Step 1 -->
                    <div class="flex items-center">
                        <div :class="[
                            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border',
                            currentStep === 1
                                ? 'bg-[#0F4841] text-white border-[#0F4841]'
                                : currentStep > 1
                                    ? 'bg-white text-[#0F4841] border'
                                    : 'bg-gray-200 text-black border',
                        ]">
                            1
                        </div>
                        <span class="ml-2 text-sm font-medium text-gray-700">
                            Agency Details
                        </span>
                    </div>

                    <!-- Step 2 -->
                    <div class="flex items-center">
                        <div :class="[
                            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border',
                            currentStep === 2
                                ? 'bg-[#0F4841] text-white border-[#0F4841]'
                                : 'bg-white text-black border',
                        ]">
                            2
                        </div>
                        <span class="ml-2 text-sm font-medium text-gray-700">
                            Agency Users
                        </span>
                    </div>
                </div>

            </div>

            <!-- Step 1: Agency Details -->
            <div v-if="currentStep === 1" class="p-4">
                <div class="grid grid-cols-2 gap-5">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Agency Name
                        </label>
                        <input id="agencyName" type="text" v-model="formData.agencyName"
                            class="text-sm w-full px-4 py-2 border border-gray-300 h-[38px] rounded-full bg-white focus:bg-white focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
                            placeholder="Type Agency Name.." />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Agency Country
                        </label>
                        <Tailwinddropdown v-model="formData.agencyCountry" :options="profileOptions"
                            button-class="bg-white px-3 py-2" dropdownMinWidth="min-w-[140px]" />
                    </div>
                </div>

                <!-- Image Upload + Preview -->
                <div class="grid grid-cols-5 gap-4 items-center mt-3">
                    <div class="col-span-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Upload Agency Logo (200x200px)
                        </label>
                        <div
                            class="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl bg-[#F8F8F8] cursor-pointer hover:border-[#0F4841] transition-colors">
                            <input type="file" accept="image/*" class="hidden" @change="handleFileUpload"
                                ref="fileInput" />
                            <button type="button" class="flex flex-col items-center font-medium text-sm text-[#0F4841]"
                                @click="$refs.fileInput.click()">
                                <NuxtImg src="add-image-icon.svg" width="36" height="36" />
                                Upload Image
                            </button>
                        </div>
                    </div>

                    <!-- Preview -->
                    <div class="flex flex-col">
                        <span class="block text-sm font-medium text-gray-700 mb-2">
                            Logo Preview
                        </span>
                        <div class="w-full h-24 border rounded-lg overflow-hidden flex items-center justify-center">
                            <img v-if="formData.logoPreview" :src="formData.logoPreview" alt="Preview"
                                class="object-cover w-full h-full" />
                            <span v-else class="text-xs text-gray-400">No Image</span>
                        </div>
                    </div>
                </div>

                <!-- API Key -->
                <div class="mt-3">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        API Key
                    </label>
                    <input v-model="formData.apiKey" placeholder="API_KEY_QWERTY123456"
                        class="w-full px-3 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#0F4841] focus:border-transparent outline-none" />
                </div>

                <!-- Next Button -->
                <div class="flex justify-end pt-4">
                    <button @click="nextStep" :disabled="!canProceedToStep2" :class="[
                        'px-10 py-1 rounded-full text-base bg-[#0F4841] text-white font-medium transition-colors',
                        canProceedToStep2 ? 'hover:bg-teal-700' : 'cursor-not-allowed',
                    ]">
                        Next
                    </button>
                </div>
            </div>

            <!-- Step 2: Agency Users -->
            <div v-if="currentStep === 2" class="p-4">
                <div class="flex gap-4">
                    <div class="flex-1">
                        <label for="name" class="block text-sm font-medium text-[#767676] mb-2">
                            Name
                        </label>
                        <input id="name" type="text" v-model="formData.contactName" required
                            class="text-sm w-full px-4 py-2 border border-gray-300 rounded-full bg-white focus:bg-white focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
                            placeholder="Type Name.." style="height: 42px" />
                    </div>
                    <div class="flex-1">
                        <label for="surname" class="block text-sm font-medium text-[#767676] mb-2">
                            Surname
                        </label>
                        <input id="surname" type="text" v-model="formData.contactSurname" required
                            class="text-sm w-full px-4 py-2 border border-gray-300 rounded-full bg-white focus:bg-white focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
                            placeholder="Type Surname.." style="height: 42px" />
                    </div>
                </div>

                <div class="flex gap-4 mt-3">
                    <!-- Mobile Number -->
                    <div class="flex-1">
                        <label for="number" class="block text-sm font-medium text-[#767676] mb-2">
                            Mobile Number
                        </label>
                        <div class="flex items-center w-full border border-gray-300 rounded-full bg-white focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4841] focus-within:border-[#0F4841] transition-colors px-3"
                            style="height: 42px">
                            <select class="bg-transparent outline-none text-gray-600 text-sm mr-2"
                                v-model="formData.countryCode">
                                <option>+356</option>
                                <option>+91</option>
                                <option>+92</option>
                            </select>
                            <input id="number" type="number" placeholder="Type Mobile Number.."
                                v-model="formData.contactPhone"
                                class="text-sm w-full outline-none bg-transparent border-l border-gray-300 pl-2" />
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="flex-1">
                        <label for="email" class="block text-sm font-medium text-[#767676] mb-2">
                            Email
                        </label>
                        <input id="email" type="email" v-model="formData.contactEmail" required
                            class="text-sm w-full px-4 py-2 border border-gray-300 rounded-full bg-white focus:bg-white focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
                            placeholder="Type Email.." style="height: 42px" />
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-between pt-4">
                    <button @click="previousStep"
                        class="px-10 py-1 rounded-full text-base border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                        Back
                    </button>
                    <button @click="submitForm" :disabled="!canSubmit" :class="[
                        'px-10 py-1 rounded-full text-base bg-[#0F4841] text-white font-medium transition-colors',
                        canSubmit ? 'hover:bg-teal-700' : 'cursor-not-allowed',
                    ]">
                        Add New User
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    isOpen: { type: Boolean, default: false },
});

const emit = defineEmits(["close", "submit"]);

const currentStep = ref(1);
const fileInput = ref(null);

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            formData.value.logoPreview = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const formData = ref({
    agencyName: "",
    agencyCountry: "",
    apiKey: "",
    contactName: "",
    contactSurname: "",
    contactEmail: "",
    contactPhone: "",
    countryCode: "+356",
    logoPreview: null,
});

const profileOptions = [
    { value: "malta", label: "Malta", img: "Spanish.svg" },
    { value: "italy", label: "Italy", img: "Spanish.svg" },
    { value: "france", label: "France", img: "Spanish.svg" },
    { value: "germany", label: "Germany", img: "Spanish.svg" },
];

const canProceedToStep2 = computed(() => {
    return formData.value.agencyName && formData.value.agencyCountry;
});

const canSubmit = computed(() => {
    return (
        formData.value.contactName &&
        formData.value.contactSurname &&
        formData.value.contactEmail
    );
});

const nextStep = () => {
    if (canProceedToStep2.value) currentStep.value = 2;
};

const previousStep = () => {
    currentStep.value = 1;
};

const closeModal = () => {
    currentStep.value = 1;
    formData.value = {
        agencyName: "",
        agencyCountry: "",
        apiKey: "",
        contactName: "",
        contactSurname: "",
        contactEmail: "",
        contactPhone: "",
        countryCode: "+356",
        logoPreview: null,
    };
    emit("close");
};

const submitForm = () => {
    if (canSubmit.value) {
        emit("submit", formData.value);
        closeModal();
    }
};
</script>
