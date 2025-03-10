import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Calendar, Plus } from 'lucide-react'
import { EmotionSummary } from '@/components/emotion-summary'
import { RecentEmotions } from '@/components/recent-emotions'
import { useAuth } from '@/contexts/auth-context'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { toast } from "sonner"
interface Emotion {
  id: number
  creationDate: string
  emotion: {
    label: string
    color: string
  }
  note: string
  date: string
}
export default function DashboardPage() {
  const {user} = useAuth()
  const [emotions, setEmotions] = useState<Emotion[]>([])
  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        // In a real app, this would fetch from your API
        
        const response = await api.get('/trackers?creator=' + user?.id)
        setEmotions(response.data)
        
      } catch (error) {
        console.error('Failed to fetch emotions:', error)
        toast.error('Erreur', {
          description: 'Impossible de charger les émotions'
        })
      }
    }

    fetchEmotions()
  }, [toast])
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Bonjour, {user?.firstName || 'Utilisateur'}
        </h1>
        <Link to="/dashboard/journal/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle entrée
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Entrées ce mois</CardTitle>
            <CardDescription>Nombre total d'entrées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{emotions.length}</div>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Émotion dominante</CardTitle>
            <CardDescription>Cette semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Calme</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Niveau de stress</CardTitle>
            <CardDescription>Moyenne sur 7 jours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Modéré</div>
          </CardContent>
        </Card> */}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Résumé des émotions</CardTitle>
              <CardDescription>7 derniers jours</CardDescription>
            </div>
            <Link to="/dashboard/reports">
              <Button variant="outline" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Voir les rapports
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <EmotionSummary emotions={emotions} />
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Entrées récentes</CardTitle>
              <CardDescription>Vos dernières entrées</CardDescription>
            </div>
            <Link to="/dashboard/journal">
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                Voir le journal
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <RecentEmotions emotions={emotions}/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

