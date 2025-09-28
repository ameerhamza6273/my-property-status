// composables/useAdminUsers.ts
export const useAdminUsers = () => {
  const config = useRuntimeConfig()
  const getToken = () => localStorage.getItem("token")

  // ✅ Helper: common headers
  const getHeaders = () => {
    const token = getToken()
    if (!token) throw new Error("No auth token found. Please login again.")
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

 // ✅ Fetch admin users
const getAdminUsers = async (page: number = 1, perPage: number = 100) => {
  try {
    const response = await $fetch("/admin/users", {
      baseURL: config.public.apiBase,
      method: "GET",
      headers: getHeaders(),
      params: {
        include: "roles,all_permissions",
        page,
        per_page: perPage, // 👈 yahan jitna chaho
      }
    })
    console.log("✅ Admin Users response:", response)
    return response
  } catch (error: any) {
    console.error("❌ Admin Users fetch error:", error?.response?._data || error)
    throw error
  }
}


  // ✅ Fetch modules (master permission list)
  const getAdminModules = async () => {
    try {
      const response = await $fetch("/admin/permissions/modules", {
        baseURL: config.public.apiBase,
        method: "GET",
        headers: getHeaders()
      })
      console.log("✅ Admin Modules response:", response)
      return response
    } catch (error: any) {
      console.error("❌ Admin Modules fetch error:", error?.response?._data || error)
      throw error
    }
  }

  // ✅ Create new admin user
  const createAdminUser = async (payload: {
    email: string
    name: string
    password: string
    password_confirmation: string
    phone?: string
    permissions?: string[]
    is_active?: number
  }) => {
    try {
      const response = await $fetch("/admin/auth/register-user", {
        baseURL: config.public.apiBase,
        method: "POST",
        body: payload,
        headers: getHeaders()
      })
      console.log("✅ Create Admin User response:", response)
      return response
    } catch (error: any) {
      console.error("❌ Create Admin User fetch error:", {
        status: error?.response?.status,
        data: error?.response?._data
      })
      throw error
    }
  }

  // ✅ Update existing admin user
 // ✅ Update existing admin user
const updateAdminUser = async (
  id: string | number,
  payload: {
    name: string
    email: string
    password: string
    password_confirmation: string
    is_active: boolean
    roles: number[]
    phone_number: string
    sort_order: number
  }
) => {
  try {
    const response = await $fetch(`/admin/users/${id}`, {
      baseURL: config.public.apiBase,
      method: "PUT", // agar ye fail ho to PATCH try karo
      body: payload,
      headers: getHeaders()
    })
    console.log("✅ Update Admin User response:", response)
    return response
  } catch (error: any) {
    console.error("❌ Update Admin User fetch error:", {
      status: error?.response?.status,
      data: error?.response?._data
    })
    throw error
  }
}

  return {
    getAdminUsers,
    getAdminModules,
    createAdminUser,
    updateAdminUser
  }
}
