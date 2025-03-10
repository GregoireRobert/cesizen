import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import { toast } from "sonner"
// import { api } from '@/lib/api'

const emotionOptions = [
  "Calme",
  "Heureux",
  "Stressé",
  "Anxieux",
  "Fatigué",
  "Énergique",
  "Triste",
  "Frustré",
  "Reconnaissant",
  "Confus",
]



// Sample data - in a real app, this would come from your API
const emotions = [
  {
    id: 1,
    date: new Date(2024, 2, 8, 14, 30).toISOString(),
    emotion: "Calme",
    note: "Journée productive au travail",
  },
  {
    id: 2,
    date: new Date(2024, 2, 7, 19, 15).toISOString(),
    emotion: "Stressé",
    note: "Réunion difficile avec le client",
  },
  {
    id: 3,
    date: new Date(2024, 2, 6, 9, 45).toISOString(),
    emotion: "Heureux",
    note: "Bon petit-déjeuner avec la famille",
  },
]

export default function EditJournalEntryPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  const [formData, setFormData] = useState({
    emotion: "",
    note: "",
    date: new Date().toISOString().slice(0, 16),
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEmotion = async () => {
      try {
        // In a real app, this would fetch from your API
        // const response = await api.get(`/emotions/${id}`)
        // const data = response.data
        
        // For demo purposes, using mock data
        const entry = emotions.find(e => e.id === parseInt(id || '0'))
        
        if (entry) {
          setFormData({
            emotion: entry.emotion,
            note: entry.note,
            date: new Date(entry.date).toISOString().slice(0, 16),
          })
        } else {
          // Handle not found
          toast.error('Erreur', {
            description: 'Entrée non trouvée'
          })
          navigate('/dashboard/journal')
        }
      } catch (error) {
        console.error('Failed to fetch emotion:', error)
        toast.error('Erreur', {
          description: 'Impossible de charger l\'entrée'
        })
        navigate('/dashboard/journal')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchEmotion()
  }, [id, navigate, toast])

  const handleChange = (
    field: string,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would call your API
      // await api.put(`/emotions/${id}`, formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast('Entrée mise à jour', {
        description: 'Votre entrée a été mise à jour avec succès'
      })
      
      // Redirect to journal page on success
      navigate('/dashboard/journal')
    } catch (error) {
      console.error('Error updating emotion entry:', error)
      toast.error('Erreur', {
        description: 'Impossible de mettre à jour l\'entrée'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) {
      try {
        // In a real app, this would call your API
        // await api.delete(`/emotions/${id}`)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        toast('Entrée supprimée', {
          description: 'Votre entrée a été supprimée avec succès'
        })
        
        // Redirect to journal page on success
        navigate('/dashboard/journal')
      } catch (error) {
        console.error('Error deleting emotion entry:', error)
        toast.error('Erreur', {
          description: 'Impossible de supprimer l\'entrée'
        })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Retour</span>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Modifier l'entrée</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Modifier l'entrée du journal</CardTitle>
            <CardDescription>
              Mettez à jour les détails de votre entrée
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date et heure</Label>
              <Input
                id="date"
                type="datetime-local"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emotion">Émotion</Label>
              <Select
                value={formData.emotion}
                onValueChange={(value) => handleChange("emotion", value)}
              >
                <SelectTrigger id="emotion">
                  <SelectValue placeholder="Sélectionnez une émotion" />
                </SelectTrigger>
                <SelectContent>
                  {emotionOptions.map((emotion) => (
                    <SelectItem key={emotion} value={emotion}>
                      {emotion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Notes</Label>
              <Textarea
                id="note"
                placeholder="Décrivez ce que vous ressentez et pourquoi..."
                rows={5}
                value={formData.note}
                onChange={(e) => handleChange("note", e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
            >
              Supprimer
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

