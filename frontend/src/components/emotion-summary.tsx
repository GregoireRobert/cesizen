import { useEffect, useRef } from 'react'
interface EmotionSummaryProps {
  emotions: Emotion[]
}
interface Emotion {
  id: number
  date: string
  emotion: {
    label: string
    color: string
  }
  note: string
}

export function EmotionSummary({ emotions }: EmotionSummaryProps) {
// export function EmotionSummary() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Sample data - in a real app, this would come from your API
    const emotionCounts = emotions.reduce((acc, emotion) => {
      acc[emotion.emotion.label] = (acc[emotion.emotion.label] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    console.error(emotionCounts)
    const data = {
      labels: Object.keys(emotionCounts),
      datasets: [
        {
          data: Object.values(emotionCounts),
          backgroundColor: emotions.map(emotion => emotion.emotion.color),
        },
      ],
    };

    // Draw pie chart
    const total = data.datasets[0].data.reduce((a, b) => a + b, 0)
    let startAngle = 0

    data.datasets[0].data.forEach((value, index) => {
      const sliceAngle = (2 * Math.PI * value) / total
      
      ctx.beginPath()
      ctx.fillStyle = data.datasets[0].backgroundColor[index]
      ctx.moveTo(canvas.width / 2, canvas.height / 2)
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) / 2 - 10,
        startAngle,
        startAngle + sliceAngle
      )
      ctx.closePath()
      ctx.fill()
      
      startAngle += sliceAngle
    })

    // Draw legend
    const legendY = canvas.height + 20
    const itemHeight = 20
    const itemsPerRow = 3
    const itemWidth = canvas.width / itemsPerRow

    data.labels.forEach((label, index) => {
      const row = Math.floor(index / itemsPerRow)
      const col = index % itemsPerRow
      
      const x = col * itemWidth
      const y = legendY + row * itemHeight
      
      ctx.fillStyle = data.datasets[0].backgroundColor[index]
      ctx.fillRect(x, y, 10, 10)
      
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.fillText(label, x + 15, y + 9)
    })
  }, [])

  return (
    <div className="relative h-[300px]">
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={250}
        className="mx-auto"
      />
    </div>
  )
}

