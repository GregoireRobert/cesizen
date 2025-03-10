import { Routes, Route } from 'react-router-dom'
import { Toaster} from '@/components/ui/sonner'
import { AuthProvider } from './contexts/auth-context'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import DashboardLayout from './layouts/dashboard-layout'
import DashboardPage from './pages/dashboard'
import JournalPage from './pages/journal'
import NewJournalEntryPage from './pages/journal/new'
import EditJournalEntryPage from './pages/journal/edit'
import ReportsPage from './pages/reports'
import InfoLayout from './layouts/info-layout'
import AboutPage from './pages/info/about'
import AdminLayout from './layouts/admin-layout'
import AdminUsersPage from './pages/admin/users'
import AdminEmotionsPage from './pages/admin/emotions'
import AdminContentPage from './pages/admin/content'
import ProtectedRoute from './components/protected-route'
import AdminRoute from './components/admin-route'

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Info pages */}
          <Route path="/info" element={<InfoLayout />}>
            <Route path="about" element={<AboutPage />} />
            <Route path="stress" element={<div>Comprendre le stress</div>} />
            <Route path="techniques" element={<div>Techniques de gestion</div>} />
            <Route path="resources" element={<div>Ressources</div>} />
            <Route path="contact" element={<div>Contact</div>} />
          </Route>
          
          {/* Protected user routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="journal" element={<JournalPage />} />
            <Route path="journal/new" element={<NewJournalEntryPage />} />
            <Route path="journal/edit/:id" element={<EditJournalEntryPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="profile" element={<div>Profil</div>} />
            <Route path="settings" element={<div>Paramètres</div>} />
          </Route>
          
          {/* Admin routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
            <Route index element={<div>Tableau de bord admin</div>} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="emotions" element={<AdminEmotionsPage />} />
            <Route path="content" element={<AdminContentPage />} />
            <Route path="reports" element={<div>Rapports admin</div>} />
            <Route path="settings" element={<div>Paramètres admin</div>} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<div>Page non trouvée</div>} />
        </Routes>
      </AuthProvider>
      <Toaster />
    </>
  )
}

export default App

