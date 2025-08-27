<template>
  <div>
    <!-- Results Count -->

    <!-- Results Count -->
    <div class="my-4">
      <!-- <p class="text-sm text-[#0F4841] font-semibold">{{ totalResults }} Results</p> -->
    </div>
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-[900px]">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th v-for="column in columns" :key="column.key"
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-44">
                <div v-if="column.sortable" class="flex items-start gap-1 cursor-pointer"
                  @click="toggleSort(column.key)">
                  <span>{{ column.label }}</span>
                  <NuxtImg src="switch-vertical.svg" width="16" height="16" />
                </div>
                <span v-else>{{ column.label }}</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-gray-50">
              <td v-for="column in columns" :key="column.key" :class="[
                'p-3 whitespace-nowrap text-sm text-black',
                shouldCenter(getNestedValue(item, column.key), column) ? 'text-center' : ''
              ]">
                <!-- Custom slot for complex data rendering -->
                <slot :name="`cell-${column.key}`" :item="item" :value="getNestedValue(item, column.key)">
                  <!-- Default rendering -->
                  <div v-if="column.type === 'array-with-flags'">
                    <div class="flex items-center justify-center space-x-2">
                      <div v-for="arrayItem in getNestedValue(item, column.key)" :key="arrayItem.value"
                        class="flex items-center space-x-1">
                        <img v-if="arrayItem.img" :src="arrayItem.img" :alt="arrayItem.value" class="w-5 h-5" />
                        <span v-if="arrayItem.value" class="text-sm font-medium text-black">{{ arrayItem.value }}</span>
                      </div>
                    </div>
                  </div>
                  <span v-else>{{ getNestedValue(item, column.key) }}</span>
                </slot>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
            class="px-3 py-1 text-sm font-medium text-gray-500 bg-[#F8F8F8] border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>

          <div class="flex items-center space-x-1">
            <!-- First page -->
            <button v-if="currentPage > 3" @click="goToPage(1)"
              class="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              1
            </button>

            <!-- Ellipsis -->
            <span v-if="currentPage > 4" class="px-2 py-1 text-sm text-gray-500">...</span>

            <!-- Page numbers around current page -->
            <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="[
              'px-3 py-1 text-sm font-medium rounded-full',
              page === currentPage
                ? 'bg-[#0F4841] text-white'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
            ]">
              {{ page }}
            </button>

            <!-- Ellipsis -->
            <span v-if="currentPage < totalPages - 3" class="px-2 py-1 text-sm text-gray-500">...</span>

            <!-- Last page -->
            <button v-if="currentPage < totalPages - 2" @click="goToPage(totalPages)"
              class="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              {{ totalPages }}
            </button>
          </div>

          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
            class="px-3 py-1 text-sm font-medium text-gray-500 bg-[#F8F8F8] border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Next
          </button>
        </div>

        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500">Result per page:</span>
          <select v-model="itemsPerPage" @change="handleItemsPerPageChange"
            class="text-sm border border-gray-300 rounded-full px-2 py-1 bg-white">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  columns: {
    type: Array,
    required: true,
    default: () => []
  },
  initialItemsPerPage: {
    type: Number,
    default: 10
  },
  initialSortColumn: {
    type: String,
    default: null
  },
  initialSortOrder: {
    type: String,
    default: 'asc'
  }
})

// Emits
const emit = defineEmits(['sort-change', 'page-change'])

// Reactive data
const currentPage = ref(1)
const itemsPerPage = ref(props.initialItemsPerPage)
const sortColumn = ref(props.initialSortColumn)
const sortOrder = ref(props.initialSortOrder)

// Computed properties
const totalResults = computed(() => props.data.length)

const totalPages = computed(() => Math.ceil(totalResults.value / itemsPerPage.value))

const sortedData = computed(() => {
  if (!sortColumn.value) return props.data

  return [...props.data].sort((a, b) => {
    const aVal = getNestedValue(a, sortColumn.value)
    const bVal = getNestedValue(b, sortColumn.value)

    // Handle array values (like agency, country)
    const aValue = Array.isArray(aVal) ? aVal[0]?.value || '' : aVal
    const bValue = Array.isArray(bVal) ? bVal[0]?.value || '' : bVal

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue
    }

    const comparison = String(aValue).localeCompare(String(bValue))
    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})
const shouldCenter = (value, column) => {
  if (typeof value === 'number') return true;
  if (column.type === 'array-with-flags' && Array.isArray(value)) {
    return onlyImages(value);
  }
  return false;
};

const onlyImages = (array) => {
  return array.every(item => item.img && !item.value);
};

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedData.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Methods
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

const toggleSort = (column) => {
  if (sortColumn.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortOrder.value = 'asc'
  }

  emit('sort-change', { column: sortColumn.value, order: sortOrder.value })
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    emit('page-change', page)
  }
}

const handleItemsPerPageChange = () => {
  currentPage.value = 1
  emit('page-change', 1)
}

// Watch for data changes to reset pagination
watch(() => props.data, () => {
  currentPage.value = 1
})
</script>
