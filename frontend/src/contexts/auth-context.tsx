import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api } from '@/lib/api'

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  roles: string[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  plainPassword: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          // Set the token in the API instance
          api.setToken(token)
          
          // Fetch current user data
          const response = await api.get('/me')
          setUser(response.data)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        // Clear token if invalid
        localStorage.removeItem('token')
        api.removeToken()
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth', { email, password })
      const { token } = response.data
      
      // Store token
      localStorage.setItem('token', token)
      api.setToken(token)
      
      // Fetch user data
      const userResponse = await api.get('/me')
      setUser(userResponse.data)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      await api.post('/register', userData)
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    api.removeToken()
    setUser(null)
  }

  const isAuthenticated = !!user
  const isAdmin = user?.roles?.includes('ROLE_ADMIN') == true
  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated,
      isAdmin,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

