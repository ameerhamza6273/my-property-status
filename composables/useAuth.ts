export const useAuth = () => {
  const config = useRuntimeConfig()

  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch('/admin/auth/login', {
        baseURL: config.public.apiBase,  
        method: 'POST',             
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: {
          email: email,
          password: password
        }
      })

      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  return { login }
}
