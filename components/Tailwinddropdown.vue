<template>
  <div class="relative" ref="dropdownWrapper">
    <button
      @click="toggleDropdown"
      @blur="handleBlur"
      class="w-full text-sm px-3 border border-[#D9D9D9] rounded-full text-left flex items-center justify-between focus:bg-white focus:ring-1 focus:ring-[#0F4841]"
      :class="selectedOption ? 'text-black' : 'text-[#BCBCBC]', buttonClass"
    >
      <!-- Button label -->
      <span class="flex items-center space-x-2">
        <template v-if="selectedOption">
          <NuxtImg
            v-if="selectedOption.img"
            :src="selectedOption.img"
            class="w-5 h-5"
            alt="flag"
          />
          <span>{{ selectedOption.label }}</span>
        </template>
        <template v-else>
          {{ placeholder }}
        </template>
      </span>

      <!-- Dropdown icon -->
      <NuxtImg
        src="/dropdown-icon.svg"
        width="14"
        height="14"
        :class="{ 'rotate-180': isOpen }"
        class="transition-transform duration-200"
      />
    </button>

    <!-- Options list -->
    <div
      v-show="isOpen"
      class="absolute p-1 z-10 bg-white border border-[#D9D9D9] rounded-xl max-h-60 overflow-auto"
      :class="[
        dropdownMinWidth ? dropdownMinWidth : 'w-full',
        openUpward ? 'bottom-full mb-1' : 'mt-1 top-full',
        openLeft ? 'right-0' : 'left-0'
      ]"
    >
      <div
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="px-3 py-2 text-xs cursor-pointer hover:bg-[#F8F8F8] hover:text-[#0F4841] rounded-full transition-colors duration-150 flex items-center space-x-2"
        :class="selectedOption?.value === option.value ? 'bg-[#F8F8F8] text-[#0F4841]' : 'text-gray-900'"
      >
        <NuxtImg
          v-if="option.img"
          :src="option.img"
          class="w-5 h-5"
          alt="flag"
        />
        <span>{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: "",
  },
  placeholder: {
    type: String,
    default: "Select an option",
  },
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  buttonClass: { type: String, default: "" },
  dropdownMinWidth: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const openUpward = ref(false);
const openLeft = ref(false);
const dropdownWrapper = ref(null);

const selectedOption = ref(
  typeof props.modelValue === "object"
    ? props.modelValue
    : props.options.find((opt) => opt.value === props.modelValue) || null
);

const toggleDropdown = async () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    await nextTick();
    adjustDropdownPosition();
  }
};

const adjustDropdownPosition = () => {
  if (!dropdownWrapper.value) return;

  const rect = dropdownWrapper.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const dropdownHeight = 240; // ~max-h-60
  const dropdownWidth = 250; // approx dropdown width, agar alag ho to yahan adjust karo

  // Agar niche space kam hai → upar open kare
  openUpward.value = viewportHeight - rect.bottom < dropdownHeight;

  // Agar right side space kam hai → left align kare
  openLeft.value = viewportWidth - rect.left < dropdownWidth;
};

const selectOption = (option) => {
  selectedOption.value = option;
  emit("update:modelValue", option);
  isOpen.value = false;
};

const handleBlur = () => {
  setTimeout(() => {
    isOpen.value = false;
  }, 150);
};

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value =
      typeof newValue === "object"
        ? newValue
        : props.options.find((opt) => opt.value === newValue) || null;
  }
);
</script>
