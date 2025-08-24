<template>
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            @click="$emit('close')">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden" @click.stop>
                <!-- Modal Header -->
                <div class="flex items-center justify-between px-5 py-4">
                    <h2 class="text-base font-medium text-gray-900 max-w-[80%]">{{ modalData.title }}</h2>
                    <button @click="$emit('close')" class="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <NuxtImg src="close-icon.svg" width="24" height="24" />
                    </button>
                </div>

                <!-- Updated tab navigation -->
                <div v-if="modalData.tabs" class="px-5">
                    <div class="inline-flex border border-[#D9D9D9] rounded-full">
                        <button v-for="tab in modalData.tabs" :key="tab.key" @click="activeTab = tab.key" :class="[
                            'py-2 px-6 text-sm font-medium rounded-full transition-colors',
                            activeTab === tab.key
                                ? 'bg-[#0F4841] text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-200'
                        ]">
                            {{ tab.label }}
                        </button>
                    </div>
                </div>


                <!-- Modal Content -->
                <div class="px-5 pb-5" :class="modalData.tabs ? 'pt-4' : ''">
                    <!-- Updated table header to support three columns for agency view -->
                    <div v-if="currentTabData.headers?.middle"
                        class="flex justify-between items-center py-2 px-3 bg-[#F8F8F8] rounded-t-xl text-xs font-medium text-gray-600 border">
                        <span class="flex-1">{{ currentTabData.headers.left }}</span>
                        <span class="flex-1 text-center">{{ currentTabData.headers.middle }}</span>
                        <span class="flex-1 text-right">{{ currentTabData.headers.right }}</span>
                    </div>
                    <div v-else
                        class="flex justify-between items-center py-2 px-3 bg-[#F8F8F8] rounded-t-xl text-xs font-medium text-gray-600 border">
                        <span>{{ currentTabData.headers?.left || 'Country' }}</span>
                        <span>{{ currentTabData.headers?.right || 'Customers' }}</span>
                    </div>

                    <!-- Updated table content to support three-column layout -->
                    <div class="bg-white border border-[#D9D9D9] rounded-b-xl max-h-80 overflow-y-auto">
                        <div v-for="(item, index) in currentTabData.data" :key="(item.country || item.name) + index"
                            class="flex items-center justify-between py-3 px-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-25">
                            <!-- Three column layout for agency view -->
                            <div v-if="currentTabData.headers?.middle" class="flex items-center justify-between w-full">
                                <div class="flex items-center space-x-3 flex-1">
                                    <NuxtImg src="Spanish.svg" width="20" height="20" />
                                    <span class="text-sm text-gray-900">{{ item.country || item.name }}</span>
                                </div>
                                <div class="flex items-center space-x-2 flex-1 justify-center">
                                    <span v-if="item.agencyLogo" class="text-base">{{ item.agencyLogo }}</span>
                                    <span class="text-sm text-gray-900">{{ item.agency }}</span>
                                </div>
                                <div class="flex-1 text-right">
                                    <span class="text-sm font-medium text-gray-900">{{ (item.customers || item.count ||
                                        item.value).toLocaleString() }}</span>
                                </div>
                            </div>
                            <!-- Two column layout for country view -->
                            <template v-else>
                                <div class="flex items-center space-x-3">
                                    <NuxtImg src="Spanish.svg" width="20" height="20" />
                                    <span class="text-sm text-gray-900">{{ item.country || item.name }}</span>
                                </div>
                                <span class="text-sm font-medium text-gray-900">{{ (item.customers || item.count ||
                                    item.value).toLocaleString() }}</span>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    modalData: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['close'])

const activeTab = ref('')

watch(() => props.modalData, (newData) => {
    if (newData.tabs && newData.tabs.length > 0) {
        activeTab.value = newData.tabs[0].key
    }
}, { immediate: true })

const currentTabData = computed(() => {
    if (!props.modalData.tabs) {
        return {
            data: props.modalData.data || [],
            headers: null
        }
    }

    const currentTab = props.modalData.tabs.find(tab => tab.key === activeTab.value)
    return currentTab || { data: [], headers: null }
})
</script>
