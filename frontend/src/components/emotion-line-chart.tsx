import { useEffect, useRef } from 'react'

interface EmotionLineChartProps {
  period: string
}

export function EmotionLineChart({ period }: EmotionLineChartProps) {
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
      labels: period === "week" 
        ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
        : period === "month"
        ? ["Sem 1", "Sem 2", "Sem 3", "Sem 4"]
        : period === "quarter"
        ? ["Jan", "Fév", "Mar"]
        : ["T1", "T2", "T3", "T4"],
      datasets: [
        {
          label: "Calme",
          data: [3, 4, 2, 3, 4, 5, 4],
          color: "#4ade80", // green
        },
        {
          label: "Stressé",
          data: [2, 3, 4, 5, 3, 2, 1],
          color: "#f87171", // red
        },
        {
          label: "Heureux",
          data: [4, 3, 3, 2, 4, 5, 5],
          color: "#60a5fa", // blue
        },
      ],
    }

    // Chart dimensions
    const chartWidth = canvas.width - 100
    const chartHeight = canvas.height - 100
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

    // Draw x-axis labels
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillStyle = "#666"
    const xStep = chartWidth / (data.labels.length - 1)
    data.labels.forEach((label, index) => {
      const x = 50 + index * xStep
      ctx.fillText(label, x, chartHeight + 55)
    })

    // Draw lines for each dataset
    data.datasets.forEach((dataset) => {
      ctx.beginPath()
      dataset.data.forEach((value, index) => {
        const x = 50 + index * xStep
        const y = chartHeight + 50 - (value / maxValue) * chartHeight
        
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.strokeStyle = dataset.color
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Draw points
      dataset.data.forEach((value, index) => {
        const x = 50 + index * xStep
        const y = chartHeight + 50 - (value / maxValue) * chartHeight
        
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, 2 * Math.PI)
        ctx.fillStyle = dataset.color
        ctx.fill()
      })
    })
    
    // Draw legend
    const legendY = 20
    const legendX = canvas.width - 150
    
    data.datasets.forEach((dataset, index) => {
      const y = legendY + index * 25
      
      // Draw line
      ctx.beginPath()
      ctx.moveTo(legendX, y)
      ctx.lineTo(legendX + 20, y)
      ctx.strokeStyle = dataset.color
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Draw point
      ctx.beginPath()
      ctx.arc(legendX + 10, y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = dataset.color
      ctx.fill()
      
      // Draw label
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillStyle = "#333"
      ctx.fillText(dataset.label, legendX + 30, y)
    })
    
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

