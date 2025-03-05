"use client"

import { useState, useEffect } from "react"

export interface ExternalEmotion {
  id: string
  label: string
  color: string
}

export function useExternalEmotions() {
  const [emotions, setEmotions] = useState<ExternalEmotion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // URL de l'API externe qui fournit les émotions
  const API_URL = "https://localhost/api/emotions"

  useEffect(() => {
    fetchEmotions()
  }, [])

  const fetchEmotions = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(API_URL, {
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
      setEmotions(data)

    } catch (err) {
      console.error("Erreur lors de la récupération des émotions externes:", err)
      setError("Impossible de charger les émotions. Utilisation des émotions par défaut.")

      // Données de démonstration en cas d'erreur
      setEmotions([
        { id: "1", label: "Joie", color: "#FFC107" },
        { id: "2", label: "Tristesse", color: "#2196F3" },
        { id: "3", label: "Colère", color: "#F44336" },
        { id: "4", label: "Peur", color: "#9C27B0" },
        { id: "5", label: "Dégoût", color: "#4CAF50" },
        { id: "6", label: "Surprise", color: "#FF9800" },
        { id: "7", label: "Amour", color: "#E91E63" },
        { id: "8", label: "Gratitude", color: "#8BC34A" },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return {
    externalEmotions: emotions,
    isLoadingExternalEmotions: isLoading,
    externalEmotionsError: error,
    fetchExternalEmotions: fetchEmotions,
  }
}

