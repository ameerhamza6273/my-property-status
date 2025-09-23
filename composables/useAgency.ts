export const useAgency = () => {
  const config = useRuntimeConfig()

  const getAgencies = async () => {
    try {
      const token = localStorage.getItem('token')

      const response: any = await $fetch('/agency/agencies', {
        baseURL: config.public.apiBase,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      console.log('Agencies:', response.data)

    } catch (error) {
      console.error('Error fetching agencies:', error)
    }
  }


  return { getAgencies }
}
