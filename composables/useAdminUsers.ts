// composables/useAdminUsers.ts
export const useAdminUsers = () => {
  const config = useRuntimeConfig()
  const getToken = () => localStorage.getItem("token")

  // ✅ Fetch admin users
  const getAdminUsers = async () => {
    try {
      const response = await $fetch("/admin/users?include=roles,all_permissions", {
        baseURL: config.public.apiBase,
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`
        }
      })
      console.log("Admin Users response:", response)
      return response
    } catch (error) {
      console.error("Admin Users fetch error:", error)
      throw error
    }
  }

  // ✅ Fetch modules (master permission list)
  const getAdminModules = async () => {
    try {
      const response = await $fetch("/admin/permissions/modules", {
        baseURL: config.public.apiBase,
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`
        }
      })
      console.log("Admin Modules response:", response)
      return response
    } catch (error) {
      console.error("Admin Modules fetch error:", error)
      throw error
    }
  }



  return {
    getAdminUsers,
    getAdminModules,
   
  }
}
