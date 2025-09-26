<template>
  <div>
    <div class="my-4"></div>

    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-[900px]">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th v-for="column in columns" :key="column.key" :class="[
                'px-3 py-2 pt-3 text-left text-xs font-medium text-gray-500 tracking-wider'
              ]" :style="{ minWidth: props.thWidth + 'px' }">
                <div v-if="column.sortable" class="flex items-start gap-1 cursor-pointer"
                  @click="toggleSort(column.key)">
                  <span>{{ column.label }}</span>

                  <!-- dynamic icon -->
                  <NuxtImg :src="getSortIcon(column.key)" width="16" height="16" alt="sort icon"
                    class="transition-transform duration-150" />
                </div>
                <span v-else>{{ column.label }}</span>
              </th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-gray-50">
              <td v-for="column in columns" :key="column.key" :class="[
                'p-3 whitespace-nowrap text-sm text-black',
                shouldCenter(getNestedValue(item, column.key), column)
                  ? 'text-center'
                  : ''
              ]">
                <slot :name="`cell-${column.key}`" :item="item" :value="getNestedValue(item, column.key)">
                  <div v-if="column.type === 'array-with-flags'">
                    <div class="flex items-center space-x-2">
                      <div v-for="arrayItem in getNestedValue(item, column.key)" :key="arrayItem.value"
                        class="flex items-center space-x-1">
                        <img v-if="arrayItem.img" :src="arrayItem.img" :alt="arrayItem.value" class="w-4 h-4" />
                        <span v-if="arrayItem.value" class="text-sm font-medium"
                          :class="arrayItem.value === 'Edit' ? 'text-red-600' : 'text-black'">
                          {{ arrayItem.value.length > 12 ? arrayItem.value.slice(0, 12) + '...' : arrayItem.value }}
                        </span>


                      </div>
                    </div>
                  </div>
                  <span v-else>
                    {{
                      typeof getNestedValue(item, column.key) === 'string' && getNestedValue(item, column.key).length > 15
                        ? getNestedValue(item, column.key).slice(0, 15) + '...'
                    : getNestedValue(item, column.key)
                    }}
                  </span>

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
            <button v-if="currentPage > 3" @click="goToPage(1)"
              class="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              1
            </button>

            <span v-if="currentPage > 4" class="px-2 py-1 text-sm text-gray-500">...</span>

            <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="[
              'px-3 py-1 text-sm font-medium rounded-full',
              page === currentPage
                ? 'bg-[#0F4841] text-white'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
            ]">
              {{ page }}
            </button>

            <span v-if="currentPage < totalPages - 3" class="px-2 py-1 text-sm text-gray-500">...</span>

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
          <Tailwinddropdown v-model="itemsPerPage" button-class="py-1 px-3 bg-white" :options="pagValue"
            @update:modelValue="handleItemsPerPageChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  data: { type: Array, required: true, default: () => [] },
  columns: { type: Array, required: true, default: () => [] },
  initialItemsPerPage: { type: Number, default: 10 },
  initialSortColumn: { type: String, default: null },
  initialSortOrder: { type: String, default: "asc" },
  thWidth: { type: [String, Number], default: 20 }
});

const pagValue = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" }
];

const emit = defineEmits(["sort-change", "page-change"]);

const currentPage = ref(1);
const itemsPerPage = ref(props.initialItemsPerPage);
const sortColumn = ref(props.initialSortColumn);
const sortOrder = ref(props.initialSortOrder); // can be "asc" | "desc" | null

const totalResults = computed(() => props.data.length);
const totalPages = computed(() =>
  Math.ceil(totalResults.value / Number(itemsPerPage.value))
);

// helper to decide icon (active vs neutral)
const getSortIcon = (columnKey) => {
  // when this column is active and has order -> show active icon
  if (sortColumn.value === columnKey && sortOrder.value) {
    return "export-switch-vertical.svg";
  }
  // neutral icon
  return "switch-vertical.svg";
};

// ✅ Auto detect sorting (number, date, string)
const sortedData = computed(() => {
  if (!sortColumn.value) return props.data;

  return [...props.data].sort((a, b) => {
    const aVal = getNestedValue(a, sortColumn.value);
    const bVal = getNestedValue(b, sortColumn.value);

    const aValue = Array.isArray(aVal) ? aVal[0]?.value || "" : aVal;
    const bValue = Array.isArray(bVal) ? bVal[0]?.value || "" : bVal;

    let comparison = 0;

    // Number sorting (works with numeric strings too)
    if (!isNaN(aValue) && !isNaN(bValue)) {
      comparison = Number(aValue) - Number(bValue);
    }
    // Date sorting
    else if (!isNaN(Date.parse(aValue)) && !isNaN(Date.parse(bValue))) {
      comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
    }
    // String sorting
    else {
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return sortOrder.value === "asc" ? comparison : -comparison;
  });
});

const shouldCenter = (value, column) => {
  if (typeof value === "number") return true;
  if (column.type === "array-with-flags" && Array.isArray(value)) {
    return onlyImages(value);
  }
  return false;
};

const onlyImages = (array) => array.every((item) => item.img && !item.value);

const paginatedData = computed(() => {
  const perPage =
    typeof itemsPerPage.value === "object"
      ? Number(itemsPerPage.value.value)
      : Number(itemsPerPage.value);

  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  return sortedData.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, currentPage.value + 2);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

const getNestedValue = (obj, path) =>
  path.split(".").reduce((current, key) => current?.[key], obj);

// ✅ toggleSort now cycles: null -> asc -> desc -> null
const toggleSort = (column) => {
  if (sortColumn.value === column) {
    if (sortOrder.value === null) sortOrder.value = "asc";
    else if (sortOrder.value === "asc") sortOrder.value = "desc";
    else {
      // clear sorting
      sortOrder.value = null;
      sortColumn.value = null;
    }
  } else {
    sortColumn.value = column;
    sortOrder.value = "asc";
  }
  emit("sort-change", { column: sortColumn.value, order: sortOrder.value });
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    emit("page-change", page);
  }
};

const handleItemsPerPageChange = (val) => {
  itemsPerPage.value = typeof val === "object" ? val.value : val;
  currentPage.value = 1;
  emit("page-change", 1);
};

watch(
  () => props.data,
  () => {
    currentPage.value = 1;
  }
);
</script>
