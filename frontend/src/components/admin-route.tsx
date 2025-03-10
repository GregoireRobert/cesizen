import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/auth-context'

interface AdminRouteProps {
  children: React.ReactNode
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!isAdmin) {
    // Redirect to dashboard if authenticated but not admin
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

