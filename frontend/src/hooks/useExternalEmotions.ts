"use client"

import { useState, useEffect } from "react"

export interface ExternalEmotion {
  id: string
  name: string
  color: string
}

export function useExternalEmotions() {
  const [emotions, setEmotions] = useState<ExternalEmotion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // URL de l'API externe qui fournit les émotions
  const API_URL = "http://localhost/api/external-emotions"

  useEffect(() => {
    fetchEmotions()
  }, [])

  const fetchEmotions = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const data = await response.json()
      setEmotions(data)

      // Si l'API ne répond pas, utilisons des données de démonstration
      if (emotions.length === 0) {
        setEmotions([
          { id: "1", name: "Joie", color: "#FFC107" },
          { id: "2", name: "Tristesse", color: "#2196F3" },
          { id: "3", name: "Colère", color: "#F44336" },
          { id: "4", name: "Peur", color: "#9C27B0" },
          { id: "5", name: "Dégoût", color: "#4CAF50" },
          { id: "6", name: "Surprise", color: "#FF9800" },
          { id: "7", name: "Amour", color: "#E91E63" },
          { id: "8", name: "Gratitude", color: "#8BC34A" },
        ])
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des émotions externes:", err)
      setError("Impossible de charger les émotions. Utilisation des émotions par défaut.")

      // Données de démonstration en cas d'erreur
      setEmotions([
        { id: "1", name: "Joie", color: "#FFC107" },
        { id: "2", name: "Tristesse", color: "#2196F3" },
        { id: "3", name: "Colère", color: "#F44336" },
        { id: "4", name: "Peur", color: "#9C27B0" },
        { id: "5", name: "Dégoût", color: "#4CAF50" },
        { id: "6", name: "Surprise", color: "#FF9800" },
        { id: "7", name: "Amour", color: "#E91E63" },
        { id: "8", name: "Gratitude", color: "#8BC34A" },
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

