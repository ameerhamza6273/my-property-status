<template>
    <div class="relative ">
        <button @click="toggleDropdown" @blur="handleBlur"
            class="w-full text-sm px-3 border border-[#D9D9D9] rounded-full  text-left flex items-center justify-between focus:bg-white focus:ring-1 focus:ring-[#0F4841]"
            :class="selectedValue === '' ? 'text-[#BCBCBC]' : 'text-black', buttonClass">
            <span>{{ selectedValue === '' ? placeholder : selectedValue }}</span>
            <NuxtImg src="/dropdown-icon.svg" width="14" height="14" :class="{ 'rotate-180': isOpen }"
                class="transition-transform duration-200" />
        </button>

        <div v-show="isOpen"
            class="absolute p-1 z-10 w-full mt-1 bg-white border border-[#D9D9D9] rounded-xl max-h-60 overflow-auto">
            <div v-for="option in options" :key="option.value" @click="selectOption(option)"
                class="px-3 py-2 text-xs cursor-pointer hover:bg-[#F8F8F8] hover:text-[#0F4841] rounded-full transition-colors duration-150"
                :class="selectedValue === option.value ? 'bg-[#F8F8F8] text-[#0F4841]' : 'text-gray-900'">
                {{ option.label }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Select an option'
    },
    options: {
        type: Array,
        required: true,
        default: () => []
    },
    buttonClass: { type: String, default: '' } 

})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedValue = ref(props.modelValue)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const selectOption = (option) => {
    selectedValue.value = option.value
    emit('update:modelValue', option.value)
    isOpen.value = false
}

const handleBlur = () => {
    // Small delay to allow click events to register
    setTimeout(() => {
        isOpen.value = false
    }, 150)
}

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
    selectedValue.value = newValue
})
</script>