"use client"

import { useState } from "react"
import { format, formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { PlusCircle, Trash2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ModeToggle } from "@/components/mode-toggle"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { useExternalEmotions } from "@/hooks/useExternalEmotions"
import { useJournalEntries } from "@/hooks/useTrackers"
import type { Tracker } from "@/types/emotion"

export default function EmotionJournal() {
  const { externalEmotions, isLoadingExternalEmotions } = useExternalEmotions()

  const { entries, isLoading, error, addEntry, deleteEntry } = useJournalEntries()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [entryToDelete, setEntryToDelete] = useState<Tracker | null>(null)

  const [selectedEmotionId, setSelectedEmotionId] = useState<string>("")
  const [entryDate, setEntryDate] = useState<Date>(new Date())
  const [note, setNote] = useState<string>("")

  const handleAddEntry = () => {
    setSelectedEmotionId("")
    setEntryDate(new Date())
    setNote("")
    setIsDialogOpen(true)
  }

  const handleDeleteEntry = (entry: Tracker) => {
    setEntryToDelete(entry)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!entryToDelete?.id) return

    await deleteEntry(entryToDelete.id)
    setIsDeleteDialogOpen(false)
    setEntryToDelete(null)
  }

  const handleSubmit = async () => {
    if (!selectedEmotionId) {
      return
    }

    const selectedEmotion = externalEmotions.find((e) => e.id === selectedEmotionId)
    if (!selectedEmotion) return

    const newEntry: Omit<Tracker, "id"> = {
      // emotionId: Number.parseInt(selectedEmotion.id),
      emotion: selectedEmotion,
      // emotionColor: selectedEmotion.color,
      creationDate: entryDate.toISOString(),
      note: note.trim() || undefined,
    }

    await addEntry(newEntry)
    setIsDialogOpen(false)
  }

  const formatEntryDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)

    // Si c'est aujourd'hui
    if (date.toDateString() === now.toDateString()) {
      return `Aujourd'hui à ${format(date, "HH:mm")}`
    }

    // Si c'est hier
    if (date.toDateString() === yesterday.toDateString()) {
      return `Hier à ${format(date, "HH:mm")}`
    }

    // Si c'est dans les 7 derniers jours
    if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return formatDistanceToNow(date, { addSuffix: true, locale: fr })
    }

    // Sinon, format complet
    return format(date, "PPP à HH:mm", { locale: fr })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Journal des Émotions</h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button onClick={handleAddEntry}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle entrée
          </Button>
        </div>
      </div>

      {error && <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-6">{error}</div>}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-16"></CardHeader>
              <CardContent className="p-6 h-32"></CardContent>
              <CardFooter className="h-10"></CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Aucune entrée dans votre journal pour le moment.</p>
              <Button onClick={handleAddEntry} variant="outline" className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter votre première entrée
              </Button>
            </div>
          ) : (
            entries
              .sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
              .map((entry) => (
                <Card key={entry.id} className="overflow-hidden">
                  <div className="h-2" style={{ backgroundColor: entry.emotion.color }}></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: entry.emotion.color }}></div>
                        <CardTitle className="text-lg">{entry.emotion.label}</CardTitle>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteEntry(entry)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {entry.note ? (
                      <p className="text-sm">{entry.note}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">Aucune note</p>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatEntryDate(entry.creationDate)}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter une entrée au journal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="emotion">Comment vous sentez-vous ?</Label>
              <Select value={selectedEmotionId} onValueChange={setSelectedEmotionId}>
                <SelectTrigger id="emotion">
                  <SelectValue placeholder="Sélectionnez une émotion" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingExternalEmotions ? (
                    <SelectItem value="loading" disabled>
                      Chargement des émotions...
                    </SelectItem>
                  ) : (
                    externalEmotions.map((emotion) => (
                      <SelectItem key={emotion.id} value={emotion.id}>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: emotion.color }}></div>
                          {emotion.label}
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Quand avez-vous ressenti cette émotion ?</Label>
              <DateTimePicker date={entryDate} setDate={setEntryDate} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Note (optionnelle)</Label>
              <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Décrivez ce qui vous a fait ressentir cette émotion..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} disabled={!selectedEmotionId}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera définitivement cette entrée de votre journal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

