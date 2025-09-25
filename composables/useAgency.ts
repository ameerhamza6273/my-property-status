export const useAgency = () => {
  const config = useRuntimeConfig()
  const getToken = () => localStorage.getItem("token") // ✅ Token fetch

  const getAgencies = async () => {
    try {
      const response = await $fetch("/agency/agencies", {
        baseURL: config.public.apiBase,
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}` // ✅ Token send
        }
      })
      console.log("Agencies response:", response)
      return response
    } catch (error) {
      console.error("Agencies fetch error:", error)
      throw error
    }
  }

  return { getAgencies }
}
