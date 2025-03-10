import { useEffect, useRef } from 'react'

interface EmotionBarChartProps {
  period: string
}

export function EmotionBarChart({ period }: EmotionBarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sample data - in a real app, this would come from your API based on the period
    const data = {
      labels: ["Calme", "Heureux", "Stressé", "Anxieux", "Fatigué", "Énergique"],
      values: [3.5, 4.2, 2.8, 3.1, 2.5, 3.8],
    }

    // Chart dimensions
    const chartWidth = canvas.width - 100
    const chartHeight = canvas.height - 100
    const barWidth = chartWidth / data.labels.length - 20
    const maxValue = 5 // Maximum intensity value

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(50, 50)
    ctx.lineTo(50, chartHeight + 50)
    ctx.lineTo(chartWidth + 50, chartHeight + 50)
    ctx.strokeStyle = "#ccc"
    ctx.stroke()

    // Draw y-axis labels
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#666"
    for (let i = 0; i <= maxValue; i++) {
      const y = chartHeight + 50 - (i / maxValue) * chartHeight
      ctx.fillText(i.toString(), 45, y)
      
      // Draw horizontal grid lines
      ctx.beginPath()
      ctx.moveTo(50, y)
      ctx.lineTo(chartWidth + 50, y)
      ctx.strokeStyle = "#eee"
      ctx.stroke()
    }

    // Draw bars and x-axis labels
    data.labels.forEach((label, index) => {
      const x = 50 + index * (chartWidth / data.labels.length) + 10
      const barHeight = (data.values[index] / maxValue) * chartHeight
      const y = chartHeight + 50 - barHeight
      
      // Draw bar
      ctx.fillStyle = getColorForEmotion(label)
      ctx.fillRect(x, y, barWidth, barHeight)
      
      // Draw x-axis label
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillStyle = "#666"
      ctx.fillText(label, x + barWidth / 2, chartHeight + 55)
      
      // Draw value on top of bar
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"
      ctx.fillStyle = "#333"
      ctx.fillText(data.values[index].toString(), x + barWidth / 2, y - 5)
    })
    
    // Draw title
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillStyle = "#333"
    ctx.font = "16px Arial"
    ctx.fillText("Intensité moyenne par émotion", canvas.width / 2, 20)
    
  }, [period])

  // Helper function to get color based on emotion
  const getColorForEmotion = (emotion: string): string => {
    const colors: Record<string, string> = {
      "Calme": "#4ade80", // green
      "Heureux": "#60a5fa", // blue
      "Stressé": "#f87171", // red
      "Anxieux": "#fbbf24", // amber
      "Fatigué": "#a78bfa", // purple
      "Énergique": "#34d399", // emerald
    }
    
    return colors[emotion] || "#cbd5e1" // Default to slate-300
  }

  return (
    <canvas 
      ref={canvasRef} 
      width={800} 
      height={400}
      className="w-full h-full"
    />
  )
}

