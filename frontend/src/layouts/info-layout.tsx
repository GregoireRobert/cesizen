import { Outlet, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/contexts/auth-context'

export default function InfoLayout() {
  const { isAuthenticated } = useAuth()
  
  const infoPages = [
    { title: "À propos", href: "/info/about" },
    { title: "Comprendre le stress", href: "/info/stress" },
    { title: "Techniques de gestion", href: "/info/techniques" },
    { title: "Ressources", href: "/info/resources" },
    { title: "Contact", href: "/info/contact" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
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
                  <Link to="/" className="font-semibold text-lg mb-4">
                    CESIZen
                  </Link>
                  {infoPages.map((page) => (
                    <Link key={page.href} to={page.href}>
                      <Button variant="ghost" className="w-full justify-start">
                        {page.title}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
                    <img src="/logo.png" alt="CESIZen Logo" className="h-20 w-20" />
                    CESIZen
                  </Link>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button>Tableau de bord</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Se connecter</Button>
                </Link>
                <Link to="/register">
                  <Button>S'inscrire</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <div className="sticky top-16 overflow-auto p-4 h-[calc(100vh-4rem)]">
            <nav className="flex flex-col gap-2">
              {infoPages.map((page) => (
                <Link key={page.href} to={page.href}>
                  <Button variant="ghost" className="w-full justify-start">
                    {page.title}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 CESIZen. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <Link to="/info/about" className="text-sm text-muted-foreground hover:text-foreground">
              À propos
            </Link>
            <Link to="/info/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link to="/info/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

