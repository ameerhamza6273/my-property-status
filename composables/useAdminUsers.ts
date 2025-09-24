// composables/useAdminUsers.ts
export const useAdminUsers = () => {
  const config = useRuntimeConfig()

  // Fetch admin users
  const getAdminUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await $fetch('/admin/users', {
        baseURL: config.public.apiBase,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      console.log("Admin Users response:", response)
      return response
    } catch (error) {
      console.error("Admin Users fetch error:", error)
      throw error
    }
  }

  // Fetch permissions/modules
  const getAdminModules = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await $fetch('/admin/permissions/modules', {
        baseURL: config.public.apiBase,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      console.log("Admin Modules response:", response)
      return response
    } catch (error) {
      console.error("Admin Modules fetch error:", error)
      throw error
    }
  }

  return { getAdminUsers, getAdminModules }
}
