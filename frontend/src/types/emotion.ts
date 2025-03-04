export interface Emotion {
  id?: number
  label: string
  color: string
}

export interface Tracker {
  id?: number
  emotionId: number
  emotionLabel: string
  emotionColor: string
  date: string // Format ISO
  note?: string
}

