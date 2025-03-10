import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EmotionBarChart } from '@/components/emotion-bar-chart'
import { EmotionLineChart } from '@/components/emotion-line-chart'
import { EmotionPieChart } from '@/components/emotion-pie-chart'
import { api } from '@/lib/api'
import { toast } from "sonner"
import { useAuth } from '@/contexts/auth-context'
interface Emotion {
  id: number
  creationDate: string
  emotion: {
    label: string
    color: string
  }
  note: string
}


export default function ReportsPage() {
  const [period, setPeriod] = useState("week")
  const [emotions, setEmotions] = useState<Emotion[]>([])

  // const [filterEmotion, setFilterEmotion] = useState('all')
  const {user} = useAuth()

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        
        const response = await api.get('/trackers?creator=' + user?.id)
        setEmotions(response.data)
        

      } catch (error) {
        console.error('Failed to fetch emotions:', error)
        toast.error('Erreur', {
          description: 'Impossible de charger les émotions'
        })
      } 
    }

    fetchEmotions()
  }, [toast])
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Rapports d'émotions</h1>
        <div className="w-full sm:w-48">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Semaine</SelectItem>
              <SelectItem value="month">Mois</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Année</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full sm:w-[400px]">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="intensity">Intensité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribution des émotions</CardTitle>
              <CardDescription>
                Répartition de vos émotions sur la {period === "week" ? "semaine" : period === "month" ? "mois" : period === "quarter" ? "trimestre" : "année"}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <EmotionPieChart period={period} emotions={emotions} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendances émotionnelles</CardTitle>
              <CardDescription>
                Évolution de vos émotions au fil du temps
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <EmotionLineChart period={period} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="intensity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intensité des émotions</CardTitle>
              <CardDescription>
                Niveau d'intensité par type d'émotion
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <EmotionBarChart period={period} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

