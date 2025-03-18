"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { api } from "@/lib/api"
import { useAuth } from "@/contexts/auth-context"

interface Emotion {
  id: number
  creationDate: string
  emotion: {
    label: string
    color: string
  }
  date: string
  note: string
}

export default function JournalPage() {
  const { user } = useAuth()
  const [emotions, setEmotions] = useState<Emotion[]>([])
  const [emotionOptions, setEmotionOptions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEmotion, setFilterEmotion] = useState("all")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedEmotion, setSelectedEmotion] = useState<string>("")

  const [formData, setFormData] = useState({
    emotion: "",
    note: "",
    date: new Date().toISOString().slice(0, 16),
    creator: "/api/users/" + user?.id.toString(),
    creationDate: new Date().toISOString().slice(0, 16),
    modifDate: new Date().toISOString().slice(0, 16),
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [emotionsResponse, trackersResponse] = await Promise.all([
          api.get("/emotions"),
          api.get("/trackers?creator=" + user?.id),
        ])
        setEmotionOptions(emotionsResponse.data)
        setEmotions(trackersResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast.error("Erreur", {
          description: "Impossible de charger les données",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user?.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const dataToSubmit = {
        ...formData,
        emotion: selectedEmotion ? "/api/emotions/" + selectedEmotion : "",
      }

      await api.post("/trackers", dataToSubmit)

      // Refresh the emotions list
      const response = await api.get("/trackers?creator=" + user?.id)
      setEmotions(response.data)

      // Reset form
      setFormData({
        ...formData,
        note: "",
        date: new Date().toISOString().slice(0, 16),
      })
      setSelectedEmotion("")

      toast.success("Entrée créée", {
        description: "Votre entrée a été enregistrée avec succès",
      })
    } catch (error) {
      console.error("Error saving emotion entry:", error)
      toast.error("Erreur", {
        description: "Impossible d'enregistrer l'entrée",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette entrée ?")) {
      try {
        await api.delete(`/trackers/${id}`)
        setEmotions(emotions.filter((emotion) => emotion.id !== id))
        toast.success("Supprimé", {
          description: "L'entrée a été supprimée avec succès",
        })
      } catch (error) {
        console.error("Failed to delete emotion:", error)
        toast.error("Erreur", {
          description: "Impossible de supprimer l'entrée",
        })
      }
    }
  }

  const filteredEmotions = emotions.filter((entry) => {
    const matchesSearch =
      entry.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.emotion.label.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEmotion = filterEmotion === "all" || entry.emotion.label === filterEmotion
    return matchesSearch && matchesEmotion
  })

  const uniqueEmotions = Array.from(new Set(emotions.map((entry) => entry.emotion)))

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Journal des émotions</h1>

      <Card>
        <CardHeader>
          <CardTitle>Nouvelle entrée</CardTitle>
          <CardDescription>Enregistrez votre état émotionnel actuel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Sélectionnez votre émotion</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {emotionOptions.map((emotion) => (
                  <Button
                    key={emotion.id}
                    type="button"
                    variant={selectedEmotion === emotion.id.toString() ? "default" : "outline"}
                    className="h-auto py-2 px-4 flex flex-col items-center gap-2"
                    style={{
                      borderColor: emotion.color,
                      backgroundColor: selectedEmotion === emotion.id.toString() ? emotion.color : "transparent",
                      color: selectedEmotion === emotion.id.toString() ? "white" : "inherit",
                    }}
                    onClick={() => setSelectedEmotion(emotion.id.toString())}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: emotion.color }} />
                    <span>{emotion.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date et heure</Label>
              <Input
                id="date"
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Notes</Label>
              <Textarea
                id="note"
                placeholder="Décrivez ce que vous ressentez et pourquoi..."
                rows={3}
                value={formData.note}
                onChange={(e) => setFormData((prev) => ({ ...prev, note: e.target.value }))}
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting || !selectedEmotion}>
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Filtrer les entrées</CardTitle>
          <CardDescription>Recherchez et filtrez vos entrées de journal</CardDescription>
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
                      {format(new Date(entry.date), "PPP 'à' p", { locale: fr })}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id)}>
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

