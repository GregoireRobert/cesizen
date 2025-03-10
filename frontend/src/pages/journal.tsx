import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarIcon, Edit, Plus, Search, Trash2 } from 'lucide-react'
import { toast } from "sonner"
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/auth-context'
interface Emotion {
  id: number
  creationDate: string
  emotion: {
    label: string
    color: string
  }
  note: string
}

export default function JournalPage() {
  const [emotions, setEmotions] = useState<Emotion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEmotion, setFilterEmotion] = useState('all')
  const {user} = useAuth()

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        // In a real app, this would fetch from your API
        
        const response = await api.get('/trackers?creator=' + user?.id)
        setEmotions(response.data)
        
        // For demo purposes, using mock data
        // setEmotions([
        //   {
        //     id: 1,
        //     date: new Date(2024, 2, 8, 14, 30).toISOString(),
        //     emotion: "Calme",
        //     note: "Journée productive au travail",
        //   },
        //   {
        //     id: 2,
        //     date: new Date(2024, 2, 7, 19, 15).toISOString(),
        //     emotion: "Stressé",
        //     note: "Réunion difficile avec le client",
        //   },
        //   {
        //     id: 3,
        //     date: new Date(2024, 2, 6, 9, 45).toISOString(),
        //     emotion: "Heureux",
        //     note: "Bon petit-déjeuner avec la famille",
        //   },
        //   {
        //     id: 4,
        //     date: new Date(2024, 2, 5, 16, 20).toISOString(),
        //     emotion: "Anxieux",
        //     note: "Présentation à venir",
        //   },
        //   {
        //     id: 5,
        //     date: new Date(2024, 2, 4, 21, 10).toISOString(),
        //     emotion: "Fatigué",
        //     note: "Longue journée de travail",
        //   },
        // ])
      } catch (error) {
        console.error('Failed to fetch emotions:', error)
        toast.error('Erreur', {
          description: 'Impossible de charger les émotions'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmotions()
  }, [toast])

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) {
      try {
        // In a real app, this would call your API
        await api.delete(`/trackers/${id}`)
        
        // Update local state
        // setEmotions(emotions.filter(emotion => emotion.id !== id))
        
        toast.success('Supprimé', {
          description: 'L\'entrée a été supprimée avec succès'
        })
      } catch (error) {
        console.error('Failed to delete emotion:', error)
        toast.error('Erreur', {
          description: 'Impossible de supprimer l\'entrée'
        })
      }
    }
  }

  const filteredEmotions = emotions.filter((entry) => {
    const matchesSearch = entry.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.emotion.label.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEmotion = filterEmotion === 'all' || entry.emotion.label === filterEmotion
    return matchesSearch && matchesEmotion
  })

  const uniqueEmotions = Array.from(new Set(emotions.map(entry => entry.emotion)))

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Journal des émotions</h1>
        <Link to="/dashboard/journal/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle entrée
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtrer les entrées</CardTitle>
          <CardDescription>
            Recherchez et filtrez vos entrées de journal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterEmotion} onValueChange={setFilterEmotion}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par émotion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les émotions</SelectItem>
                {uniqueEmotions.map((emotion) => (
                  <SelectItem key={emotion.label} value={emotion.label}>
                    {emotion.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredEmotions.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            Aucune entrée ne correspond à vos critères de recherche
          </div>
        ) : (
          filteredEmotions.map((entry) => (
<Card key={entry.id}>
  <CardHeader className="pb-2">
    <div className="flex items-start justify-between">
      <div>
        <CardTitle className="text-lg flex items-center gap-2">
          <span
            className="inline-block h-4 w-4 rounded-full"
            style={{ backgroundColor: entry.emotion.color }}
          ></span>
          {entry.emotion.label}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <CalendarIcon className="h-3 w-3" />
          {format(new Date(entry.creationDate), "PPP 'à' p", { locale: fr })}
        </CardDescription>
      </div>
      <div className="flex space-x-2">
        <Link to={`/dashboard/journal/edit/${entry.id}`}>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Modifier</span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(entry.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
          <span className="sr-only">Supprimer</span>
        </Button>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <p className="text-sm">{entry.note}</p>
    </div>
  </CardContent>
</Card>
          ))
        )}
      </div>
    </div>
  )
}

