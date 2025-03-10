import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">À propos de CESIZen</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Notre mission</CardTitle>
          <CardDescription>
            Aider chacun à mieux comprendre et gérer son stress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
          CESIZen est né d'une vision simple : créer un outil accessible qui aide les personnes à suivre, comprendre et gérer leurs émotions et leur stress au quotidien.
          </p>
          <p>
            Dans notre monde moderne où le stress est omniprésent, nous croyons qu'une meilleure compréhension de nos émotions est la première étape vers une vie plus équilibrée et épanouissante.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notre approche</CardTitle>
          <CardDescription>
            Une méthode basée sur la science et l'expérience utilisateur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Notre application combine les dernières recherches en psychologie et en neurosciences avec une expérience utilisateur intuitive pour vous offrir un outil efficace de gestion du stress.
          </p>
          <p>
            Nous croyons en la puissance de la prise de conscience émotionnelle et en l'importance de suivre régulièrement ses émotions pour identifier les tendances et les déclencheurs de stress.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notre équipe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-muted mb-4 overflow-hidden">
                <img
                  src="/placeholder.svg?height=96&width=96"
                  alt="Photo de profil"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium">Grégoire ROBERT</h3>
              <p className="text-sm text-muted-foreground">Apprenti en conception et développement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

