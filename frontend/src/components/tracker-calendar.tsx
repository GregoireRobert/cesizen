"use client"

import * as React from "react"
import { format, isSameDay, getMonth, getYear } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { SelectSingleEventHandler } from "react-day-picker"
import type { Tracker } from "@/types/emotion"
// Type pour les événements


interface TrackerCalendarProps {
  trackers: Tracker[]
  className?: string
}

export function EventCalendar({ trackers, className }: TrackerCalendarProps) {
  const [date, setDate] = React.useState<Date>(new Date())
  const [selectedDay, setSelectedDay] = React.useState<Date | null>(null)
  
  // Référence au mois courant
  const currentMonth = getMonth(date)
  const currentYear = getYear(date)

  // Obtenir les événements pour un jour spécifique
  const getTrackersForDay = (day: Date) => {
    if (!day || !(day instanceof Date) || isNaN(day.getTime())) {
      return []
    }
    return trackers.filter((tracker) => {
      const trackDate = Date.parse(tracker.creationDate)
      if (!trackDate) {
        
        return false
      }
      return isSameDay(day, tracker.creationDate)
    })
  }

  // Gestionnaire pour la sélection de date
  const handleSelect: SelectSingleEventHandler = (day) => {
    setSelectedDay(day || null)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{format(date, "MMMM yyyy", { locale: fr })}</h2>
      </div> */}

      <Calendar
        mode="single"
        selected={selectedDay || undefined}
        onSelect={handleSelect}
        month={date}
        onMonthChange={setDate}
        className="border rounded-md p-3"
        locale={fr}
        modifiersClassNames={{
          outside: "text-muted-foreground opacity-50",
        }}
        components={{
          Day: ({ date, ...props }) => {
            // Vérifier si day est une date valide
            if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
              return <div className="h-9 w-9 p-0" {...props} />
            }

            const dayTrackers = getTrackersForDay(date)
            const isSelected = selectedDay ? isSameDay(date, selectedDay) : false

            // Vérifier si le jour est en dehors du mois courant
            const dayMonth = getMonth(date)
            const dayYear = getYear(date)
            const isOutsideMonth = dayMonth !== currentMonth || dayYear !== currentYear

            return (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "h-9 w-9 p-0 font-normal aria-selected:opacity-100 relative",
                      isSelected ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                      isOutsideMonth ? "text-muted-foreground opacity-50" : "",
                    )}
                    {...props}
                  >
                    {/* Numéro du jour - toujours au même endroit */}
                    <div className="absolute top-1 right-1 text-xs">{format(date, "d")}</div>

                    {/* Conteneur pour les événements */}
                    {dayTrackers.length > 0 && (
                      <div className="relative mt-4 mx-auto" style={{ width: "20px", height: "20px" }}>
                        {/* Pile de symboles avec décalage */}
                        {dayTrackers.length === 1 ? (
                          // Un seul événement - pas de pile
                          <div
                            className={cn(
                              "absolute inset-0 flex items-center justify-center w-5 h-5 rounded-full",
                              isOutsideMonth ? "opacity-50" : "",
                            )}
                            style={{ backgroundColor: dayTrackers[0].emotion.color }}
                          >
                            {dayTrackers[0].symbol}
                          </div>
                        ) : (
                          // Plusieurs événements - créer une pile
                          <>
                            {/* Afficher jusqu'à 3 symboles en pile avec décalage */}
                            {dayTrackers.slice(0, Math.min(3, dayTrackers.length)).map((tracker, index) => (
                              <div
                                key={tracker.id}
                                className={cn(
                                  "absolute flex items-center justify-center w-5 h-5 rounded-full",
                                  isOutsideMonth ? "opacity-50" : "",
                                )}
                                style={{
                                  backgroundColor: tracker.emotion.color,
                                  top: `${index * 1}px`,
                                  left: `${index * 1}px`,
                                  zIndex: 10 - index,
                                }}
                              >
                                {index === 0 && dayTrackers.length > 1 ? (
                                  // Badge pour le nombre d'événements
                                  <div className="absolute -top-2 -right-2 flex items-center justify-center w-3.5 h-3.5 bg-primary text-[10px] text-primary-foreground font-bold rounded-full z-20">
                                    +{dayTrackers.length}
                                  </div>
                                ) : null}
                                {index === 0 ? tracker.symbol : null}
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </button>
                </PopoverTrigger>
                {dayTrackers.length > 0 && (
                  <PopoverContent className="w-80 p-0" align="start">
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{format(date, "EEEE d MMMM yyyy", { locale: fr })}</h3>
                      <div className="space-y-2">
                        {dayTrackers.map((tracker) => (
                          <div key={tracker.id} className="flex items-center p-2 rounded-md border">
                            <div
                              className="flex items-center justify-center w-8 h-8 rounded-full mr-3"
                              style={{ backgroundColor: tracker.emotion.color }}
                            >
                              {tracker.symbol}
                            </div>
                            <div>
                              <div className="font-medium">{tracker.emotion.label}</div>
                              {tracker.note && (
                                <div className="text-sm text-muted-foreground">{tracker.note}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                )}
              </Popover>
            )
          },
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
        }}
      />
    </div>
  )
}

