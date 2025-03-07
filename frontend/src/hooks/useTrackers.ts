"use client"

import { useState, useEffect } from "react"
import type { Tracker } from "@/types/emotion"

export function useJournalEntries() {
  const [entries, setEntries] = useState<Tracker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_URL = "https://localhost/api/trackers?creator="

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(API_URL + "6", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
        // mode: "no-cors"
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const data = await response.json()
      setEntries(data || [])
    } catch (err) {
      console.error("Erreur lors de la récupération des entrées du journal:", err)
      setError("Impossible de charger les entrées du journal. Veuillez réessayer plus tard.")

      // // Données de démonstration en cas d'erreur
      // setEntries([
      //   {
      //     id: 1,
      //     emotionId: 1,
      //     emotionLabel: "Joie",
      //     emotionColor: "#FFC107",
      //     date: new Date(Date.now() - 86400000).toISOString(), // Hier
      //     note: "Journée parfaite au parc avec des amis.",
      //   },
      //   {
      //     id: 2,
      //     emotionId: 3,
      //     emotionLabel: "Colère",
      //     emotionColor: "#F44336",
      //     date: new Date(Date.now() - 172800000).toISOString(), // Avant-hier
      //     note: "Frustré par les embouteillages ce matin.",
      //   },
      //   {
      //     id: 3,
      //     emotionId: 7,
      //     emotionLabel: "Amour",
      //     emotionColor: "#E91E63",
      //     date: new Date().toISOString(), // Aujourd'hui
      //     note: "Dîner romantique avec mon partenaire.",
      //   },
      // ])
    } finally {
      setIsLoading(false)
    }
  }

  const addEntry = async (entry: Omit<Tracker, "id">) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const newEntry = await response.json()
      setEntries([...entries, newEntry])
      return { success: true, data: newEntry }
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'entrée:", err)
      setError("Impossible de créer l'entrée. Veuillez réessayer plus tard.")

      // Pour la démo, simulons un succès
      const newEntry = {
        ...entry,
        id: Math.max(0, ...entries.map((e) => e.id || 0)) + 1,
      }
      setEntries([...entries, newEntry])
      return { success: true, data: newEntry }
    }
  }

  const deleteEntry = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      setEntries(entries.filter((e) => e.id !== id))
      return { success: true }
    } catch (err) {
      console.error("Erreur lors de la suppression de l'entrée:", err)
      setError("Impossible de supprimer l'entrée. Veuillez réessayer plus tard.")

      // Pour la démo, simulons un succès
      setEntries(entries.filter((e) => e.id !== id))
      return { success: true }
    }
  }

  return {
    entries,
    isLoading,
    error,
    fetchEntries,
    addEntry,
    deleteEntry,
  }
}

