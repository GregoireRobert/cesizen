"use client"

import { useState, useEffect } from "react"

interface Emotion {
  id?: number
  label: string
  color: string
}

export function useEmotions() {
  const [emotions, setEmotions] = useState<Emotion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_URL = "http://localhost/api/emotions"

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
      setEmotions(data["hydra:member"] || [])
    } catch (err) {
      console.error("Erreur lors de la récupération des émotions:", err)
      setError("Impossible de charger les émotions. Veuillez réessayer plus tard.")
    } finally {
      setIsLoading(false)
    }
  }

  const addEmotion = async (emotion: Emotion) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emotion),
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const newEmotion = await response.json()
      setEmotions([...emotions, newEmotion])
      return { success: true, data: newEmotion }
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'émotion:", err)
      setError("Impossible de créer l'émotion. Veuillez réessayer plus tard.")
      return { success: false, error: err }
    }
  }

  const updateEmotion = async (emotion: Emotion) => {
    if (!emotion.id) return { success: false, error: "ID manquant" }

    try {
      const response = await fetch(`${API_URL}/${emotion.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emotion),
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const updatedEmotion = await response.json()
      setEmotions(emotions.map((e) => (e.id === emotion.id ? updatedEmotion : e)))
      return { success: true, data: updatedEmotion }
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'émotion:", err)
      setError("Impossible de mettre à jour l'émotion. Veuillez réessayer plus tard.")
      return { success: false, error: err }
    }
  }

  const deleteEmotion = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      setEmotions(emotions.filter((e) => e.id !== id))
      return { success: true }
    } catch (err) {
      console.error("Erreur lors de la suppression de l'émotion:", err)
      setError("Impossible de supprimer l'émotion. Veuillez réessayer plus tard.")
      return { success: false, error: err }
    }
  }

  return {
    emotions,
    isLoading,
    error,
    fetchEmotions,
    addEmotion,
    updateEmotion,
    deleteEmotion,
  }
}

