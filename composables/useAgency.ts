export const useAgency = () => {
  const config = useRuntimeConfig()

  const getAgencies = async () => {
    try {
      const token = localStorage.getItem('token') // ✅ auth token
      const response = await $fetch('/agency/agencies', {
        baseURL: config.public.apiBase,   // https://naetar.com/mps
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

    //   console.log("Agencies response:", response) // ✅ console log
      return response
    } catch (error) {
      console.error("Agencies fetch error:", error)
      throw error
    }
  }

  return { getAgencies }
}
