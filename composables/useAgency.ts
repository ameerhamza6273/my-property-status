export const useAgency = () => {
  const getToken = () => localStorage.getItem("token")

  const getAgencies = async () => {
    try {
      const response = await $fetch("/api/agency/agencies", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${getToken()}`
        }
      })
      // console.log("Agencies response:", response)
      return response
    } catch (error) {
      console.error("Agencies fetch error:", error)
      throw error
    }
  }

  return { getAgencies }
}
