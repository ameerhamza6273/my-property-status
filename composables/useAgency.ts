// composables/useAgency.ts
export const useAgency = () => {
  const config = useRuntimeConfig() // ✅ same as useAdminUsers
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

  // ✅ Fetch all agencies
  const getAgencies = async () => {
    try {
      const response = await $fetch("/agency/agencies", {
        baseURL: config.public.apiBase, // ✅ baseURL set
        method: "GET",
        headers: getHeaders()
      })
      console.log("✅ Agencies response:", response)
      return response
    } catch (error: any) {
      console.error("❌ Agencies fetch error:", error?.response?._data || error)
      throw error
    }
  }

  return { getAgencies }
}
