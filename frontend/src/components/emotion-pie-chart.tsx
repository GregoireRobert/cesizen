"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import { startOfWeek, startOfMonth, startOfQuarter, startOfYear, isWithinInterval } from 'date-fns'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  other: {
    label: "Other",
    color: "#AAAAAA",
  },
} satisfies ChartConfig


interface Emotion {
  id: number
  date: string
  emotion: {
    label: string
    color: string
  }
  note: string
}

interface EmotionPieChartProps {
  period: 'week' | 'month' | 'quarter' | 'year'
  emotions: Emotion[]
}

interface EmotionStat {
  label: string
  count: number
  fill: string
}

function getStartDate(period: 'week' | 'month' | 'quarter' | 'year', date: Date): Date {
  switch (period) {
    case 'week':
      return startOfWeek(date)
    case 'month':
      return startOfMonth(date)
    case 'quarter':
      return startOfQuarter(date)
    case 'year':
      return startOfYear(date)
  }
}

export function EmotionPieChart({ period, emotions }: EmotionPieChartProps) {
  const now = new Date()
  const startDate = getStartDate(period, now)

  const emotionStats: EmotionStat[] = emotions
    .filter(emotion => isWithinInterval(new Date(emotion.date), { start: startDate, end: now }))
    .reduce((stats, emotion) => {
      const existingStat = stats.find(stat => stat.label === emotion.emotion.label);
      if (existingStat) {
        existingStat.count++;
      } else {
        stats.push({
          label: emotion.emotion.label,
          count: 1,
          fill: emotion.emotion.color,
        });
      }
      return stats;
    }, [] as EmotionStat[]);

  const periodLabel = {
    'week': 'Cette semaine',
    'month': 'Ce mois',
    'quarter': 'Ce trimestre',
    'year': 'Cette année'
  }[period]
  console.log(emotions)
  console.log(emotionStats)
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribution des émotions</CardTitle>
        <CardDescription>{periodLabel}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={emotionStats}
              dataKey="count"
              nameKey="label"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
