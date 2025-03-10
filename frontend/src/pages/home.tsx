import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-20 items-center justify-between">
          <div className="container flex h-20 items-center">
              <img src="/logo.png" alt="CESIZen Logo" className="h-20 w-20" />
              <div className="font-semibold text-lg">CESIZen</div>
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
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Gérez votre stress et vos émotions
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Notre application vous aide à suivre vos émotions quotidiennes et à mieux comprendre vos déclencheurs de stress.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    <Button size="lg" className="gap-2">
                      {isAuthenticated ? "Accéder au tableau de bord" : "Commencer maintenant"} <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/info/about">
                    <Button size="lg" variant="outline">
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/logo_grand_cesizen.png"
                  height="200"
                  width="300"
                  alt="Application de gestion du stress"
                  className="aspect-video object-cover w-full"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter">
                Fonctionnalités principales
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Suivi des émotions</h3>
                <p className="text-muted-foreground">
                  Enregistrez vos émotions quotidiennes et suivez leur évolution au fil du temps.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Rapports détaillés</h3>
                <p className="text-muted-foreground">
                  Visualisez des rapports sur vos émotions par semaine, mois, trimestre ou année.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Ressources sur le stress</h3>
                <p className="text-muted-foreground">
                  Accédez à des informations et des conseils pour mieux gérer votre stress.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
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

