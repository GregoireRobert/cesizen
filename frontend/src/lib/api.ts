import axios from "axios"

// Create an axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/ld+json, application/json",
  },
})

// Add a request interceptor to add the auth token to requests
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor to handle common errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export const api = {
  get: (url: string, params = {}) => instance.get(url, { params }),
  post: (url: string, data = {}) => instance.post(url, data),
  put: (url: string, data = {}) => instance.put(url, data),
  delete: (url: string) => instance.delete(url),

  // Mise à jour de la méthode patch pour utiliser application/merge-patch+json
  patch: (url: string, data = {}) =>
    instance.patch(url, data, {
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
    }),

  setToken: (token: string) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`
  },
  removeToken: () => {
    delete instance.defaults.headers.common.Authorization
  },
}

