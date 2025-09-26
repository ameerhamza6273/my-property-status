<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div class="bg-white rounded-3xl shadow-lg p-6 w-[90%] max-w-sm text-center">

      <!-- ✅ Icon/Image -->
      <div class="flex justify-center mb-4">
        <img v-if="icon" :src="icon" alt="icon" class="w-16 h-16" />
      </div>

      <!-- ✅ Title -->
      <h2 class="text-lg font-bold text-gray-800">{{ title }}</h2>

      <!-- ✅ Description -->
      <p class="text-[#767676] text-sm mt-2">{{ description }}</p>

      <!-- ✅ Buttons -->
      <div class="flex justify-center space-x-3 mt-5">
        <button @click="$emit('confirm')" :class="[
          'px-4 py-2 text-base text-white w-full rounded-full',
          confirmText === 'Add' ? 'bg-[#00743C] hover:bg-green-700' : 'bg-[#C03D3A] hover:bg-red-700'
        ]">
          {{ confirmText }}
        </button>

        <button @click="$emit('cancel')"
          class="px-4 py-2 bg-gray-100 text-base text-gray-700 w-full rounded-full hover:bg-gray-300">
          {{ cancelText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  icon?: string
}>()

defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>
