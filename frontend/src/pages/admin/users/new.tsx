"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"
import { api } from '@/lib/api'
const AVAILABLE_ROLES = [
  { id: "ROLE_USER", label: "Utilisateur" },
  { id: "ROLE_ADMIN", label: "Administrateur" },
]

export default function NewUserPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    plainPassword: "",
    // creationDate: "",
    roles: ["ROLE_USER"],
    active: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (roleId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      roles: checked ? [...prev.roles, roleId] : prev.roles.filter((r) => r !== roleId),
    }))
  }

  const handleActiveChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, active: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
        // formData["creationDate"] = new Date().toISOString();
      // In a real app, this would call your API
      await api.post('/users', formData)

      // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1000))

      toast("Succès", {
        description: "L'utilisateur a été créé avec succès",
      })

      navigate("/admin/users")
    } catch (error) {
      console.error("Failed to create user:", error)
      toast.error("Erreur", {
        description: "Impossible de créer l'utilisateur",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/admin/users">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Retour</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Nouvel utilisateur</h1>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Informations de l&apos;utilisateur</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="plainPassword"
                name="plainPassword"
                type="password"
                value={formData.plainPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Rôles</Label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {AVAILABLE_ROLES.map((role) => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${role.id}`}
                      checked={formData.roles.includes(role.id)}
                      onCheckedChange={(checked) => handleRoleChange(role.id, checked as boolean)}
                    />
                    <Label htmlFor={`role-${role.id}`} className="cursor-pointer">
                      {role.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="active">Statut du compte</Label>
                <Switch id="active" checked={formData.active} onCheckedChange={handleActiveChange} />
              </div>
              <p className="text-sm text-muted-foreground">{formData.active ? "Compte actif" : "Compte inactif"}</p>
            </div>

            <div className="flex justify-end gap-2">
              <Link to="/admin/users">
                <Button variant="outline" type="button">
                  Annuler
                </Button>
              </Link>
              <Button type="submit" className="gap-2" disabled={isSubmitting}>
                {isSubmitting && (
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                )}
                <Save className="h-4 w-4" />
                Enregistrer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

