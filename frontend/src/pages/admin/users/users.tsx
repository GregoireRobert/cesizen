import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Edit, Plus, Search, Trash2 } from 'lucide-react'
import { toast } from "sonner"
import { api } from '@/lib/api'

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  roles: string[]
  active: boolean
  creationDate: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // In a real app, this would fetch from your API
        const response = await api.get('/users')
        console.log(response.data)
        setUsers(response.data)
        
        // For demo purposes, using mock data
        // setUsers([
        //   { 
        //     id: 1, 
        //     firstName: "Jean", 
        //     lastName: "Dupont", 
        //     email: "jean.dupont@example.com", 
        //     role: "user", 
        //     status: "active",
        //     createdAt: "2024-01-15" 
        //   },
        //   { 
        //     id: 2, 
        //     firstName: "Marie", 
        //     lastName: "Martin", 
        //     email: "marie.martin@example.com", 
        //     role: "user", 
        //     status: "active",
        //     createdAt: "2024-01-20" 
        //   },
        //   { 
        //     id: 3, 
        //     firstName: "Pierre", 
        //     lastName: "Bernard", 
        //     email: "pierre.bernard@example.com", 
        //     role: "admin", 
        //     status: "active",
        //     createdAt: "2024-01-10" 
        //   },
        //   { 
        //     id: 4, 
        //     firstName: "Sophie", 
        //     lastName: "Petit", 
        //     email: "sophie.petit@example.com", 
        //     role: "user", 
        //     status: "inactive",
        //     createdAt: "2024-02-05" 
        //   },
        //   { 
        //     id: 5, 
        //     firstName: "Thomas", 
        //     lastName: "Dubois", 
        //     email: "thomas.dubois@example.com", 
        //     role: "admin", 
        //     status: "active",
        //     createdAt: "2024-01-05" 
        //   },
        // ])
      } catch (error) {
        console.error('Failed to fetch users:', error)
        toast.error('Erreur', {
          description: 'Impossible de charger les utilisateurs'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [toast])
  const formatISODate = (isoString: string): string => {
    const date = new Date(isoString);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        // In a real app, this would call your API
        await api.delete(`/users/${id}`)
        
        // Update local state
        setUsers(users.filter(user => user.id !== id))
        
        toast('Supprimé', {
          description: 'L\'utilisateur a été supprimé avec succès'
        })
      } catch (error) {
        console.error('Failed to delete user:', error)
        toast.error('Erreur', {
          description: 'Impossible de supprimer l\'utilisateur'
        })
      }
    }
  }

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-3xl font-bold tracking-tight">Gestion des utilisateurs</h1>
        <Link to="/admin/users/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvel utilisateur
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des utilisateurs</CardTitle>
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
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      Aucun utilisateur trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.roles.includes("ROLE_ADMIN") ? "default" : "outline"}>
                          {user.roles.includes("ROLE_ADMIN") ? "Administrateur" : "Utilisateur"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.active ? "default" : "secondary"}>
                          {user.active ? "Actif" : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatISODate(user.creationDate)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/users/edit/${user.id}`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Modifier</span>
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(user.id)}
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

