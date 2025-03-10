import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { BarChart3, FileText, Home, LogOut, Menu, Settings, Smile, Users, User } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/contexts/auth-context'

export default function AdminLayout() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background py-2">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex flex-col gap-4 pt-4">
                <Link to="/admin" className="flex items-center gap-2 font-semibold text-lg">
                    <img src="/logo.png" alt="CESIZen Logo" className="h-20 w-20" />
                    CESIZen Administration
                  </Link>
                  <Link to="/admin">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Home className="h-5 w-5" />
                      Tableau de bord
                    </Button>
                  </Link>
                  <Link to="/admin/users">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Users className="h-5 w-5" />
                      Utilisateurs
                    </Button>
                  </Link>
                  <Link to="/admin/emotions">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Smile className="h-5 w-5" />
                      Émotions
                    </Button>
                  </Link>
                  <Link to="/admin/content">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <FileText className="h-5 w-5" />
                      Contenu
                    </Button>
                  </Link>
                  <Link to="/admin/reports">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Rapports
                    </Button>
                  </Link>
                  <Link to="/admin/settings">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Settings className="h-5 w-5" />
                      Paramètres
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                  <Button variant="ghost" className="w-full justify-start gap-2 bg-green-500 text-white hover:bg-green-600">
                    <User className="h-5 w-5" />
                    Mon compte
                  </Button>
                 </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/admin" className="flex items-center gap-2 font-semibold text-lg">
                    <img src="/logo.png" alt="CESIZen Logo" className="h-20 w-20" />
                    CESIZen Administration
                  </Link>
                  <Link to="/info/about" className="flex items-center gap-2 text-lg">
                    Informations
                  </Link>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="hidden md:inline text-sm">
                {user.firstName} {user.lastName}
              </span>
            )}
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <div className="sticky top-16 overflow-auto p-4 h-[calc(100vh-4rem)]">
            <nav className="flex flex-col gap-2">
              <Link to="/admin">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Home className="h-5 w-5" />
                  Tableau de bord
                </Button>
              </Link>
              <Link to="/admin/users">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Users className="h-5 w-5" />
                  Utilisateurs
                </Button>
              </Link>
              <Link to="/admin/emotions">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Smile className="h-5 w-5" />
                  Émotions
                </Button>
              </Link>
              <Link to="/admin/content">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <FileText className="h-5 w-5" />
                  Contenu
                </Button>
              </Link>
              <Link to="/admin/reports">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Rapports
                </Button>
              </Link>
              <Link to="/admin/settings">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Settings className="h-5 w-5" />
                  Paramètres
                </Button>
              </Link>
              <Link to="/dashboard">
                  <Button variant="ghost" className="w-full justify-start gap-2 bg-green-500 text-white hover:bg-green-600">
                    <User className="h-5 w-5" />
                    Mon compte
                  </Button>
                 </Link>
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

