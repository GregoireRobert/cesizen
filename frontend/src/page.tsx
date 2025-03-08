"use client"

import { EventCalendar } from "@/components/tracker-calendar"

import { Star } from "lucide-react"
import { useJournalEntries } from "./hooks/useTrackers"

export default function Home() {
  // Exemple d'événements
  const { entries} = useJournalEntries()
  const trackers = entries.map(entry => ({
    ...entry,
    symbol: <Star className="h-4 w-4 text-white" />
  }));
//   const entries: CalendarEvent[] = [
//     {
//       id: "1",
//       date: new Date(2025, 2, 5),
//       symbol: <Star className="h-4 w-4 text-white" />,
//       color: "#FFD700",
//       title: "Événement important",
//       description: "Réunion avec l'équipe de direction",
//     },
//     {
//       id: "2",
//       date: new Date(2025, 2, 10),
//       symbol: <Heart className="h-4 w-4 text-white" />,
//       color: "#FF6B6B",
//       title: "Anniversaire",
//       description: "Anniversaire de Marie",
//     },
//     {
//       id: "3",
//       date: new Date(2025, 2, 15),
//       symbol: <Bell className="h-4 w-4 text-white" />,
//       color: "#4CAF50",
//       title: "Rappel",
//       description: "Envoyer le rapport mensuel",
//     },
//     {
//       id: "4",
//       date: new Date(2025, 2, 15),
//       symbol: <Sun className="h-4 w-4 text-white" />,
//       color: "#FF9800",
//       title: "Déjeuner d'équipe",
//       description: "Restaurant Le Gourmet",
//     },
//     {
//       id: "5",
//       date: new Date(2025, 2, 15),
//       symbol: <Moon className="h-4 w-4 text-white" />,
//       color: "#9C27B0",
//       title: "Soirée cinéma",
//       description: "Projection du nouveau film",
//     },
//     {
//       id: "6",
//       date: new Date(2025, 2, 15),
//       symbol: <Cloud className="h-4 w-4 text-white" />,
//       color: "#2196F3",
//       title: "Sauvegarde des données",
//       description: "Sauvegarde automatique programmée",
//     },
//     {
//       id: "7",
//       date: new Date(2025, 2, 20),
//       symbol: <Zap className="h-4 w-4 text-white" />,
//       color: "#FFC107",
//       title: "Réunion éclair",
//       description: "Point rapide sur le projet",
//     },
//     {
//       id: "8",
//       date: new Date(2025, 2, 25),
//       symbol: <Music className="h-4 w-4 text-white" />,
//       color: "#3F51B5",
//       title: "Concert",
//       description: "Concert au théâtre municipal",
//     },
//     {
//       id: "9",
//       date: new Date(2025, 2, 28),
//       symbol: <Coffee className="h-4 w-4 text-white" />,
//       color: "#795548",
//       title: "Pause café",
//       description: "Discussion informelle avec l'équipe",
//     },
//   ]

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Calendrier d'événements</h1>
      <EventCalendar trackers={trackers} />
    </main>
  )
}

