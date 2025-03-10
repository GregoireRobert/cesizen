import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { toast } from "sonner"
// import { useState, useEffect } from 'react'
import { api } from '@/lib/api'

interface Emotion {
  id: number
  date: string
  emotion: {
    label: string
    color: string
  }
  note: string
}
interface RecentEmotionsProps {
  emotions: Emotion[]
}

export function RecentEmotions({ emotions }: RecentEmotionsProps) {
  // const [emotions, setEmotions] = useState<Emotion[]>([])
  // const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   const fetchEmotions = async () => {
  //     try {
  //       // In a real app, this would fetch from your API
  //       const response = await api.get('/trackers?limit=3')
  //       // setEmotions(response.data)
        
  //       // For demo purposes, using mock data
  //       setEmotions([
  //         {
  //           id: 1,
  //           date: new Date(2024, 2, 8, 14, 30).toISOString(),
  //           emotion: "Calme",
  //           intensity: 4,
  //           note: "Journée productive au travail",
  //         },
  //         {
  //           id: 2,
  //           date: new Date(2024, 2, 7, 19, 15).toISOString(),
  //           emotion: "Stressé",
  //           intensity: 3,
  //           note: "Réunion difficile avec le client",
  //         },
  //         {
  //           id: 3,
  //           date: new Date(2024, 2, 6, 9, 45).toISOString(),
  //           emotion: "Heureux",
  //           intensity: 5,
  //           note: "Bon petit-déjeuner avec la famille",
  //         },
  //       ])
  //     } catch (error) {
  //       console.error('Failed to fetch emotions:', error)
  //       toast.error('Erreur', {
  //         description: 'Impossible de charger les émotions récentes',
  //       })
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchEmotions()
  // }, [toast])

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

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center py-4">
  //       <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
  //     </div>
  //   )
  // }

  return (
    <div className="space-y-4">
      {emotions.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          Aucune entrée récente
        </div>
      ) : (
        <div className="space-y-4">
          {emotions.map((entry) => (
            <div
              key={entry.id}
              className="flex items-start justify-between p-3 border rounded-lg"
            >
              <div className="space-y-1">
                <div className="font-medium">
                <span
            className="inline-block h-4 w-4 rounded-full"
            style={{ backgroundColor: entry.emotion.color }}
          ></span> {entry.emotion.label}</div>
                <div className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(entry.date), { addSuffix: true, locale: fr })}
                </div>
                <div className="text-sm">{entry.note}</div>
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
          ))}
        </div>
      )}
    </div>
  )
}

