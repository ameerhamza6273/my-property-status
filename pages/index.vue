<template>
  <div class="min-h-screen flex items-center justify-center relative">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img src="/public/login-bg.svg" alt="Modern Property Background" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>

    <!-- Login Card -->
    <div
      class="relative z-10 bg-white rounded-3xl shadow-2xl p-5 md:p-8 pb-7 w-full max-w-[320px] sm:max-w-[400px] md:max-w-[600px] ">
      <!-- Logo -->
      <NuxtImg src="Logo.svg" alt="Logo" width="170" />

      <!-- Header -->
      <div class="my-4 md:my-6">
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
          <input id="email" v-model="form.email" type="email" required
            class="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
            placeholder="Type email.." />
        </div>

        <!-- Password Field -->
        <div class="mt-4">
          <label for="password" class="block text-sm font-medium text-black mb-2">
            Password
          </label>
          <div class="relative w-full">
            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required class="w-full px-4 pr-10 py-2 border border-gray-300 rounded-full 
           focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] 
           outline-none transition-colors" placeholder="Type Password.." />

            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">

              <!-- 👁 Eye (Show password) -->
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 
           4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 
           .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

              <!-- 🚫 Eye Slash (Hide password) -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.09 
           7.244 19 12 19c1.712 0 3.33-.386 4.746-1.07m2.9-2.523
           A10.45 10.45 0 0022.066 12c-1.292-4.09-5.31-7-10.066-7
           -.856 0-1.683.107-2.463.308M9.88 9.88a3 3 0 
           104.24 4.24" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
              </svg>

            </button>
          </div>

        </div>

        <!-- Remember Me -->
        <div class="flex items-center mt-3">
          <input id="remember" v-model="form.remember" type="checkbox" class="appearance-none w-5 h-5 border border-gray-300 rounded-md 
           checked:bg-emerald-800 checked:border-emerald-800
           checked:after:content-['✔'] checked:after:flex 
           checked:after:items-center checked:after:justify-center
           checked:after:text-white checked:after:text-sm" />
          <label for="remember" class="ml-2 text-sm text-gray-700">
            Remember Me
          </label>
        </div>

        <!-- Login Button -->
        <button type="submit" :disabled="loading"
          class="mt-6 w-full bg-[#0F4841] hover:bg-[#0F4841] disabled:bg-[#0f4841e6] text-white font-medium py-2 rounded-full transition-colors duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            Logging in...
          </span>
          <span v-else>Login</span>
        </button>
      </form>

      <!-- Footer -->
      <div class="mt-8 text-center">
        <p class="text-xs text-[#626262]">
          © Copyright 2025 MyPropertyStatus. All Rights Reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const form = reactive({
  email: '',
  password: '',
  remember: false
})

const showPassword = ref(false)
const loading = ref(false)

// ✅ Updated Login Logic (Role Auto-Detect)
const handleLogin = async () => {
  loading.value = true
  try {
    const { email, password } = form

    // Fake role-based login
    if (email === 'admin@test.com' && password === 'admin123') {
      localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }))
      router.push('/admin/dashboard')
    } else if (email === 'agency@test.com' && password === 'agency123') {
      localStorage.setItem('user', JSON.stringify({ email, role: 'agency' }))
      router.push('/agency/dashboard')
    } else {
      alert('Invalid credentials!')
    }
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>

<!--  
<template>
  <div class="min-h-screen flex items-center justify-center relative">
    <div class="absolute inset-0 z-0">
      <img src="/public/login-bg.svg" alt="Modern Property Background" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>

    <div
      class="relative z-10 bg-white rounded-3xl shadow-2xl p-5 md:p-8 pb-7 w-full max-w-[320px] sm:max-w-[400px] md:max-w-[600px] ">
      <NuxtImg src="Logo.svg" alt="Logo" width="170" />

      <div class="my-4 md:my-6">
        <h1 class="text-2xl font-bold text-black mb-1">Admin Portal</h1>
        <p class="text-[#767676] text-sm">Log in to the My Property Status Admin Portal</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block text-sm font-medium text-black mb-2">
            Email
          </label>
          <input id="email" v-model="form.email" type="email" required
            class="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] outline-none transition-colors"
            placeholder="Type email.." />
        </div>

        <div class="mt-4">
          <label for="password" class="block text-sm font-medium text-black mb-2">
            Password
          </label>
          <div class="relative w-full">
            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required
              class="w-full px-4 pr-10 py-2 border border-gray-300 rounded-full 
           focus:ring-1 focus:ring-[#0F4841] focus:border-[#0F4841] 
           outline-none transition-colors" placeholder="Type Password.." />

            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">

              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 
           4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 
           .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.09 
           7.244 19 12 19c1.712 0 3.33-.386 4.746-1.07m2.9-2.523
           A10.45 10.45 0 0022.066 12c-1.292-4.09-5.31-7-10.066-7
           -.856 0-1.683.107-2.463.308M9.88 9.88a3 3 0 
           104.24 4.24" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
              </svg>

            </button>
          </div>

        </div>

        <div class="flex items-center mt-3">
          <input id="remember" v-model="form.remember" type="checkbox" class="appearance-none w-5 h-5 border border-gray-300 rounded-md 
           checked:bg-emerald-800 checked:border-emerald-800
           checked:after:content-['✔'] checked:after:flex 
           checked:after:items-center checked:after:justify-center
           checked:after:text-white checked:after:text-sm" />
          <label for="remember" class="ml-2 text-sm text-gray-700">
            Remember Me
          </label>
        </div>

        <button type="submit" :disabled="loading"
          class="mt-6 w-full bg-[#0F4841] hover:bg-[#0F4841] disabled:bg-[#0f4841e6] text-white font-medium py-2 rounded-full transition-colors duration-200 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            Logging in...
          </span>
          <span v-else>Login</span>
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-xs text-[#626262]">
          © Copyright 2025 MyPropertyStatus. All Rights Reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login } = useAuth()

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const showPassword = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    // ✅ API call
    const res: any = await login(form.email, form.password)
    console.log('API Response:', res)

    // ✅ access_token save karna hai, token nahi
    if (res.access_token) {
      localStorage.setItem('token', res.access_token)
    }

    // ✅ Role check (agar roles array hai to)
    const roles = res.user?.relationships?.roles || []
    if (roles.some((r: any) => r.name === 'admin')) {
      router.push('/admin/dashboard')
    } else if (roles.some((r: any) => r.name === 'agency')) {
      router.push('/agency/dashboard')
    } else {
      router.push('/')
    }

  } catch (error: any) {
    alert(error?.data?.message || 'Login failed!')
  } finally {
    loading.value = false
  }
}

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>
-->