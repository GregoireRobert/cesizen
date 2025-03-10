import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Plus, Search, Trash2 } from 'lucide-react'
import { toast } from "sonner"
// import { api } from '@/lib/api'

interface Emotion {
  id: number
  name: string
  category: string
  color: string
}

export default function AdminEmotionsPage() {
  const [emotions, setEmotions] = useState<Emotion[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        // In a real app, this would fetch from your API
        // const response = await api.get('/admin/emotions')
        // setEmotions(response.data)
        
        // For demo purposes, using mock data
        setEmotions([
          { id: 1, name: "Calme", category: "Positif", color: "#4ade80" },
          { id: 2, name: "Heureux", category: "Positif", color: "#60a5fa" },
          { id: 3, name: "Stressé", category: "Négatif", color: "#f87171" },
          { id: 4, name: "Anxieux", category: "Négatif", color: "#fbbf24" },
          { id: 5, name: "Fatigué", category: "Neutre", color: "#a78bfa" },
          { id: 6, name: "Énergique", category: "Positif", color: "#34d399" },
          { id: 7, name: "Triste", category: "Négatif", color: "#94a3b8" },
          { id: 8, name: "Frustré", category: "Négatif", color: "#fb923c" },
        ])
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
    if (confirm('Êtes-vous sûr de vouloir supprimer cette émotion ?')) {
      try {
        // In a real app, this would call your API
        // await api.delete(`/admin/emotions/${id}`)
        
        // Update local state
        setEmotions(emotions.filter(emotion => emotion.id !== id))
        
        toast('Supprimé', {
          description: 'L\'émotion a été supprimée avec succès',
        })
      } catch (error) {
        console.error('Failed to delete emotion:', error)
        toast.error('Erreur', {
          description: 'Impossible de supprimer l\'émotion'
        })
      }
    }
  }

  const filteredEmotions = emotions.filter((emotion) =>
    emotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emotion.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        <h1 className="text-3xl font-bold tracking-tight">Gestion des émotions</h1>
        <Link to="/admin/emotions/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle émotion
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des émotions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Couleur</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmotions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">
                      Aucune émotion trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmotions.map((emotion) => (
                    <TableRow key={emotion.id}>
                      <TableCell className="font-medium">{emotion.name}</TableCell>
                      <TableCell>{emotion.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: emotion.color }}
                          />
                          {emotion.color}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/emotions/edit/${emotion.id}`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Modifier</span>
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(emotion.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

