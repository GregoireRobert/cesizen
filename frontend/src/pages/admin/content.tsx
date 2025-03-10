import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Edit, Eye, FileText, Plus, Search, Trash2 } from 'lucide-react'
import { toast } from "sonner"
// import { api } from '@/lib/api'

interface Page {
  id: number
  title: string
  slug: string
  category: string
  status: string
  updatedAt: string
}

export default function AdminContentPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPages = async () => {
      try {
        // In a real app, this would fetch from your API
        // const response = await api.get('/admin/pages')
        // setPages(response.data)
        
        // For demo purposes, using mock data
        setPages([
          { 
            id: 1, 
            title: "À propos", 
            slug: "about", 
            category: "Informations", 
            status: "published",
            updatedAt: "2024-02-15" 
          },
          { 
            id: 2, 
            title: "Comprendre le stress", 
            slug: "stress", 
            category: "Éducation", 
            status: "published",
            updatedAt: "2024-02-10" 
          },
          { 
            id: 3, 
            title: "Techniques de gestion", 
            slug: "techniques", 
            category: "Éducation", 
            status: "published",
            updatedAt: "2024-02-05" 
          },
          { 
            id: 4, 
            title: "Ressources", 
            slug: "resources", 
            category: "Informations", 
            status: "published",
            updatedAt: "2024-01-25" 
          },
          { 
            id: 5, 
            title: "Contact", 
            slug: "contact", 
            category: "Informations", 
            status: "published",
            updatedAt: "2024-01-20" 
          },
          { 
            id: 6, 
            title: "Méditation guidée", 
            slug: "meditation", 
            category: "Éducation", 
            status: "draft",
            updatedAt: "2024-02-18" 
          },
        ])
      } catch (error) {
        console.error('Failed to fetch pages:', error)
        toast.error('Erreur', {
          description: 'Impossible de charger les pages'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPages()
  }, [toast])

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) {
      try {
        // In a real app, this would call your API
        // await api.delete(`/admin/pages/${id}`)
        
        // Update local state
        setPages(pages.filter(page => page.id !== id))
        
        toast.success('Supprimé', {
          description: 'La page a été supprimée avec succès'
        })
      } catch (error) {
        console.error('Failed to delete page:', error)
        toast.error('Erreur', {
          description: 'Impossible de supprimer la page'
        })
      }
    }
  }

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-3xl font-bold tracking-tight">Gestion du contenu</h1>
        <Link to="/admin/content/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle page
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Pages d'information</CardTitle>
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
                  <TableHead>Titre</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dernière mise à jour</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      Aucune page trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {page.title}
                        </div>
                      </TableCell>
                      <TableCell>{page.slug}</TableCell>
                      <TableCell>{page.category}</TableCell>
                      <TableCell>
                        <Badge variant={page.status === "published" ? "default" : "secondary"}>
                          {page.status === "published" ? "Publié" : "Brouillon"}
                        </Badge>
                      </TableCell>
                      <TableCell>{page.updatedAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Link to={`/info/${page.slug}`} target="_blank">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Voir</span>
                            </Button>
                          </Link>
                          <Link to={`/admin/content/edit/${page.id}`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Modifier</span>
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(page.id)}
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

