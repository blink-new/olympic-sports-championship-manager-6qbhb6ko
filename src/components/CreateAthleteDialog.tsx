import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { useGame } from '../context/GameContext'
import { useAuth } from '../context/AuthContext'
import { blink } from '../blink/client'
import { toast } from 'react-hot-toast'

interface CreateAthleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateAthleteDialog = ({ open, onOpenChange }: CreateAthleteDialogProps) => {
  const { sports, refreshAthletes } = useGame()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sport_id: '',
    biography: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    if (!formData.name || !formData.age || !formData.sport_id) {
      toast.error('Моля попълнете всички задължителни полета')
      return
    }

    setLoading(true)
    try {
      const athleteData = {
        id: `athlete_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: formData.name,
        age: parseInt(formData.age),
        sport_id: formData.sport_id,
        country_id: user.country_id || 'bg',
        user_id: user.id,
        level: 'amateur',
        experience: 0,
        stamina: 50,
        strength: 50,
        speed: 50,
        technique: 50,
        mental: 50,
        biography: formData.biography || null,
        created_at: new Date().toISOString()
      }

      await blink.db.athletes.create(athleteData)
      await refreshAthletes()
      toast.success('Атлетът е създаден успешно!')
      
      setFormData({
        name: '',
        age: '',
        sport_id: '',
        biography: ''
      })
      onOpenChange(false)
    } catch (error) {
      console.error('Error creating athlete:', error)
      toast.error('Грешка при създаване на атлет')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Създай нов атлет</DialogTitle>
          <DialogDescription>
            Създайте нов атлет и започнете неговото развитие към олимпийска слава
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Име на атлета *</Label>
            <Input
              id="name"
              placeholder="Въведете име на атлета"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Възраст *</Label>
            <Input
              id="age"
              type="number"
              min="16"
              max="45"
              placeholder="Въведете възраст"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sport">Спорт *</Label>
            <Select value={formData.sport_id} onValueChange={(value) => setFormData(prev => ({ ...prev, sport_id: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Изберете спорт" />
              </SelectTrigger>
              <SelectContent>
                {sports.map((sport) => (
                  <SelectItem key={sport.id} value={sport.id}>
                    {sport.name} ({sport.type === 'summer' ? 'Летен' : 'Зимен'})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="biography">Биография (опционално)</Label>
            <Textarea
              id="biography"
              placeholder="Въведете кратка биография на атлета"
              value={formData.biography}
              onChange={(e) => setFormData(prev => ({ ...prev, biography: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отказ
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Създаване...' : 'Създай атлет'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}