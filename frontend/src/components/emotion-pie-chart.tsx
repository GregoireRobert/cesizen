import { useEffect, useRef } from 'react'
interface Emotion {
  id: number
  creationDate: string
  emotion: {
    label: string
    color: string
  }
  note: string
}
interface EmotionPieChartProps {
  period: string
  emotions: Emotion[]
}

export function EmotionPieChart({ period, emotions }: EmotionPieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Process emotions data
    const emotionCounts: { [key: string]: number } = {}
    emotions.forEach(emotion => {
      const label = emotion.emotion.label
      emotionCounts[label] = (emotionCounts[label] || 0) + 1
    })

    const data = {
      labels: Object.keys(emotionCounts),
      values: Object.values(emotionCounts),
      colors: emotions.map(emotion => emotion.emotion.color)
    }
    // Calculate total
    const total = data.values.reduce((sum, value) => sum + value, 0)
    
    // Draw pie chart
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2 - 20
    const radius = Math.min(centerX, centerY) - 50
    
    let startAngle = 0
    
    data.values.forEach((value, index) => {
      const sliceAngle = (2 * Math.PI * value) / total
      
      // Draw slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fillStyle = data.colors[index]
      ctx.fill()
      
      // Draw label line and text if slice is big enough
      if (value / total > 0.05) {
        const midAngle = startAngle + sliceAngle / 2
        const labelRadius = radius * 0.7
        const labelX = centerX + Math.cos(midAngle) * labelRadius
        const labelY = centerY + Math.sin(midAngle) * labelRadius
        
        ctx.fillStyle = "#fff"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = "bold 14px Arial"
        ctx.fillText(`${Math.round(value / total * 100)}%`, labelX, labelY)
      }
      
      startAngle += sliceAngle
    })
    
    // Draw legend
    const legendY = canvas.height - 80
    const itemsPerRow = 3
    const itemWidth = canvas.width / itemsPerRow
    const itemHeight = 25
    
    data.labels.forEach((label, index) => {
      const row = Math.floor(index / itemsPerRow)
      const col = index % itemsPerRow
      
      const x = col * itemWidth + 20
      const y = legendY + row * itemHeight
      
      // Draw color box
      ctx.fillStyle = data.colors[index]
      ctx.fillRect(x, y, 15, 15)
      
      // Draw label
      ctx.fillStyle = "#333"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.font = "14px Arial"
      ctx.fillText(label, x + 25, y + 7)
    })
    
    // Draw title
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillStyle = "#333"
    ctx.font = "16px Arial"
    ctx.fillText("Distribution des émotions", canvas.width / 2, 20)
    
  }, [period])

  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={400}
      className="w-full h-full"
    />
  )
}

