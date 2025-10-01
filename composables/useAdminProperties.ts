// composables/useAdminProperties.ts
export const useAdminProperties = () => {
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

  // ✅ Fetch properties list
  const getAdminProperties = async (page: number = 1, perPage: number = 50) => {
    try {
      const response = await $fetch("/admin/properties", {
        baseURL: config.public.apiBase,
        method: "GET",
        headers: getHeaders(),
        params: {
          page,
          per_page: perPage
        }
      })
      return response
    } catch (error: any) {
      console.error("❌ Admin Properties fetch error:", error?.response?._data || error)
      throw error
    }
  }

  return {
    getAdminProperties
  }
}
