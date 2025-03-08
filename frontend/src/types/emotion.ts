export interface Emotion {
  id?: number
  label: string
  color: string
}

export interface Tracker {
  id?: number
  emotion: {
    label: string
    color: string
  }
  // emotionLabel: string
  // emotionColor: string
  creationDate: string // Format ISO
  note?: string
  symbol: React.ReactNode
}

