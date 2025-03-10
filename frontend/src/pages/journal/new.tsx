import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import { toast } from "sonner"
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/auth-context'
interface Emotion {
  id: number,
  label: string;
  color: string;
  shades: string[];
  date: string;
  creationDate: string;
  modifDate: string;
}

export default function NewJournalEntryPage() {
  const navigate = useNavigate()
  const {user} = useAuth()
  const [formData, setFormData] = useState({
    emotion: "",
    note: "",
    date: "",
    creator: "/api/users/" + user?.id.toString(),
    creationDate: new Date().toISOString().slice(0, 16),
    modifDate: new Date().toISOString().slice(0, 16),
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emotionOptions, setEmotionOptions] = useState<Emotion[]>([])
  
  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const response = await api.get('/emotions')
        setEmotionOptions(response.data)
      } catch (error) {
        console.error('Error fetching emotions:', error)
        toast.error('Erreur', {
          description: 'Impossible de récupérer la liste des émotions'
        })
      }
    }

    fetchEmotions()
  }, [])

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
      if (formData.emotion) {formData.emotion = "/api/emotions/" + formData.emotion}
      // In a real app, this would call your API
      await api.post('/trackers', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast('Entrée créée', {
        description: 'Votre entrée a été enregistrée avec succès'
      })
      
      // Redirect to journal page on success
      navigate('/dashboard/journal')
    } catch (error) {
      console.error('Error saving emotion entry:', error)
      toast.error('Erreur', {
        description: 'Impossible d\'enregistrer l\'entrée'
      })
    } finally {
      setIsSubmitting(false)
    }
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
        <h1 className="text-3xl font-bold tracking-tight">Nouvelle entrée</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader className="py-2">
            <CardTitle>Ajouter une entrée au journal</CardTitle>
            <CardDescription className="space-y-2">
              Enregistrez votre état émotionnel actuel
            </CardDescription>
          </CardHeader >
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
  value={formData.emotion.toString()}
  onValueChange={(value) => handleChange("emotion", value)}
>
  <SelectTrigger id="emotion">
    <SelectValue placeholder="Sélectionnez une émotion" />
  </SelectTrigger>
  <SelectContent>
    {emotionOptions.map((emotion) => (
      <SelectItem key={emotion.id} value={emotion.id.toString()}>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: emotion.color }}
          />
          {emotion.label}
        </div>
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
          <CardFooter className="flex justify-end gap-2">
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
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
