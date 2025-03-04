"use client"

import * as React from "react"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DateTimePickerProps {
  date: Date
  setDate: (date: Date) => void
  className?: string
}

export function DateTimePicker({ date, setDate, className }: DateTimePickerProps) {
  const minuteOptions = React.useMemo(() => {
    const options = []
    for (let i = 0; i < 60; i += 5) {
      options.push(i)
    }
    return options
  }, [])

  const hourOptions = React.useMemo(() => {
    const options = []
    for (let i = 0; i < 24; i++) {
      options.push(i)
    }
    return options
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP 'à' HH:mm", { locale: fr }) : <span>Choisir une date et une heure</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          initialFocus
          locale={fr}
        />
        <div className="border-t border-border p-3 flex items-end gap-2">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 opacity-70" />
              <span className="text-xs">Heure</span>
            </div>
            <div className="flex gap-2">
              <Select
                value={date.getHours().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(date)
                  newDate.setHours(Number.parseInt(value))
                  setDate(newDate)
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Heure" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {hourOptions.map((hour) => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {hour.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm self-center">:</span>
              <Select
                value={Math.floor(date.getMinutes() / 5) * 5 + ""}
                onValueChange={(value) => {
                  const newDate = new Date(date)
                  newDate.setMinutes(Number.parseInt(value))
                  setDate(newDate)
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Min" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {minuteOptions.map((minute) => (
                    <SelectItem key={minute} value={minute.toString()}>
                      {minute.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

