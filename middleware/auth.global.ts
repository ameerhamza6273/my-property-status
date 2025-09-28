// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return

  const token = localStorage.getItem("token")

  if (!token && to.path !== "/") {
    // ✅ reload ke sath home page pe bhejo
    window.location.href = "/"
  }
})
