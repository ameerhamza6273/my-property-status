<template>
  <div class="min-h-screen flex items-center justify-center relative">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img 
        src="/public/login-bg.svg" 
        alt="Modern Property Background" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>
    
    <!-- Login Card -->
    <div class="relative z-10 bg-white rounded-3xl shadow-2xl p-8 pb-7 w-full max-w-[600px]">
      <!-- Logo -->
      <NuxtImg src="Logo.svg" alt="Logo" width="170" />
     
      
      <!-- Header -->
      <div class="my-6">
        <h1 class="text-2xl font-bold text-black mb-1">Admin Portal</h1>
        <p class="text-[#767676] text-sm">Log in to the My Property Status Admin Portal</p>
      </div>
      
      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-black mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
            placeholder="Type email.."
          />
        </div>
        
        <!-- Password Field -->
        <div class="mt-4">
          <label for="password" class="block text-sm font-medium text-black mb-2">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
              placeholder="Type Password.."
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Remember Me -->
        <div class="flex items-center mt-2">
          <input
            id="remember"
            v-model="form.remember"
            type="checkbox"
            class="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
          />
          <label for="remember" class="ml-2 text-sm text-gray-700">
            Remember Me
          </label>
        </div>
        
        <!-- Login Button -->
        <button
          type="submit"
          :disabled="loading"
          class="mt-6 w-full bg-[#0F4841] hover:bg-[#0f4841e6] disabled:bg-[#0f4841e6] text-white font-medium py-2 rounded-full transition-colors duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging in...
          </span>
          <span v-else>Login</span>
        </button>
      </form>
      
      <!-- Footer -->
      <div class="mt-8 text-center">
        <p class="text-xs text-[#626262]">
          © Copyright 2024 by PropertyStatus Ltd. All Rights Reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Reactive form data
const form = reactive({
  email: '',
  password: '',
  remember: false
})

// Component state
const showPassword = ref(false)
const loading = ref(false)

// Login handler
const handleLogin = async () => {
  loading.value = true
  
  try {
    // Add your login logic here
    console.log('Login attempt:', form)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Handle successful login
    // Example: await $router.push('/dashboard')
    
  } catch (error) {
    console.error('Login error:', error)
    // Handle login error
  } finally {
    loading.value = false
  }
}
</script>
