<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="$emit('close')"
    >
      <div
        class="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-5 py-4">
          <h2 class="text-base font-semibold text-[#292929] max-w-[80%]">
            {{ modalData.title }}
          </h2>
          <button
            @click="$emit('close')"
            class="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <NuxtImg src="close-icon.svg" width="24" height="24" />
          </button>
        </div>

        <!-- Tabs Navigation -->
        <div v-if="modalData.tabs" class="px-5">
          <div class="inline-flex border border-[#D9D9D9] rounded-full">
            <button
              v-for="tab in modalData.tabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'py-2 px-6 text-sm font-medium rounded-full transition-colors',
                activeTab === tab.key
                  ? 'bg-[#0F4841] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-200'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="px-5 pb-5" :class="modalData.tabs ? 'pt-4' : ''">
          <!-- Table Header -->
          <div
            v-if="currentTabData.headers?.middle"
            class="flex justify-between items-center py-2 px-3 bg-[#F8F8F8] rounded-t-xl text-xs font-medium text-gray-600 border"
          >
            <button
              class="flex items-center gap-1 flex-1 text-left"
              @click="toggleSort('left')"
            >
              <span>{{ currentTabData.headers.left }}</span>
              <NuxtImg :src="getIcon('left')" width="14" height="14" />
            </button>
            <button
              class="flex items-center gap-1 flex-1 justify-start"
              @click="toggleSort('middle')"
            >
              <span>{{ currentTabData.headers.middle }}</span>
              <NuxtImg :src="getIcon('middle')" width="14" height="14" />
            </button>
            <button
              class="flex items-center gap-1 flex-1 justify-center"
              @click="toggleSort('right')"
            >
              <span>{{ currentTabData.headers.right }}</span>
              <NuxtImg :src="getIcon('right')" width="14" height="14" />
            </button>
          </div>

          <div
            v-else
            class="flex justify-between items-center py-2 px-3 bg-[#F8F8F8] rounded-t-xl text-xs font-medium text-gray-600 border"
          >
            <button
              class="flex items-center gap-1 flex-1 text-left"
              @click="toggleSort('left')"
            >
              <span>{{ currentTabData.headers?.left || 'Country' }}</span>
              <NuxtImg :src="getIcon('left')" width="14" height="14" />
            </button>
            <button
              class="flex items-center gap-1 flex-1 justify-center"
              @click="toggleSort('right')"
            >
              <span>{{ currentTabData.headers?.right || 'Customers' }}</span>
              <NuxtImg :src="getIcon('right')" width="14" height="14" />
            </button>
          </div>

          <!-- Table Content -->
          <div
            class="bg-white border border-[#D9D9D9] rounded-b-xl max-h-80 overflow-y-auto"
          >
            <div
              v-for="(item, index) in sortedData"
              :key="(item.country || item.name) + index"
              class="flex items-center justify-between py-3 px-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-25"
            >
              <!-- Three column layout -->
              <div
                v-if="currentTabData.headers?.middle"
                class="flex items-center justify-between w-full"
              >
                <div class="flex items-center space-x-3 flex-1">
                  <NuxtImg src="Spanish.svg" width="20" height="20" />
                  <span class="text-sm text-gray-900">{{
                    item.country || item.name
                  }}</span>
                </div>
                <div class="flex items-center space-x-2 flex-1 justify-start">
                  <span v-if="item.agencyLogo" class="text-base">{{
                    item.agencyLogo
                  }}</span>
                  <span class="text-sm text-black">{{ item.agency }}</span>
                </div>
                <div class="flex-1 text-center">
                  <span class="text-sm font-medium text-gray-900">{{
                    (item.customers || item.count || item.value).toLocaleString()
                  }}</span>
                </div>
              </div>

              <!-- Two column layout -->
              <template v-else>
                <div class="flex items-center space-x-3 flex-1">
                  <NuxtImg src="Spanish.svg" width="20" height="20" />
                  <span class="text-sm text-gray-900 text-center">{{
                    item.country || item.name
                  }}</span>
                </div>
                <div class="flex-1 text-center">
                  <span class="text-sm font-medium text-black">{{
                    (item.customers || item.count || item.value).toLocaleString()
                  }}</span>
                </div>
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
  isOpen: { type: Boolean, default: false },
  modalData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['close'])

const activeTab = ref('')
const sortState = ref({ column: null, order: null }) // null means no sort

watch(
  () => props.modalData,
  (newData) => {
    if (newData.tabs && newData.tabs.length > 0) {
      activeTab.value = newData.tabs[0].key
    }
  },
  { immediate: true }
)

const currentTabData = computed(() => {
  if (!props.modalData.tabs) {
    return { data: props.modalData.data || [], headers: null }
  }
  const currentTab = props.modalData.tabs.find((tab) => tab.key === activeTab.value)
  return currentTab || { data: [], headers: null }
})

const sortedData = computed(() => {
  const data = [...(currentTabData.value.data || [])]
  if (!sortState.value.column || !sortState.value.order) return data

  const column = sortState.value.column
  const order = sortState.value.order

  return data.sort((a, b) => {
    let valA, valB
    if (column === 'left') {
      valA = a.country || a.name || ''
      valB = b.country || b.name || ''
    } else if (column === 'middle') {
      valA = a.agency || ''
      valB = b.agency || ''
    } else {
      valA = a.customers || a.count || a.value || 0
      valB = b.customers || b.count || b.value || 0
    }

    if (typeof valA === 'string') {
      valA = valA.toLowerCase()
      valB = valB.toLowerCase()
    }

    if (valA < valB) return order === 'asc' ? -1 : 1
    if (valA > valB) return order === 'asc' ? 1 : -1
    return 0
  })
})

const toggleSort = (column) => {
  if (sortState.value.column === column) {
    if (sortState.value.order === 'asc') {
      sortState.value.order = 'desc'
    } else if (sortState.value.order === 'desc') {
      // reset to no sort on third click
      sortState.value.column = null
      sortState.value.order = null
    } else {
      sortState.value.order = 'asc'
    }
  } else {
    sortState.value.column = column
    sortState.value.order = 'asc'
  }
}

const getIcon = (column) => {
  return sortState.value.column === column ? 'export-switch-vertical.svg' : 'switch-vertical.svg'
}
</script>
