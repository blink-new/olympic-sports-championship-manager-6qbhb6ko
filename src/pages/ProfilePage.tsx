import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { User, Globe, Trophy, Save, Calendar } from 'lucide-react'
import { Navigation } from '../components/Navigation'
import { useAuth } from '../context/AuthContext'
import { useGame } from '../context/GameContext'
import { blink } from '../blink/client'
import { toast } from 'react-hot-toast'

export const ProfilePage = () => {
  const { user } = useAuth()
  const { countries, refreshData } = useGame()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    display_name: user?.display_name || '',
    country_id: user?.country_id || ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      await blink.db.users.update(user.id, {
        display_name: formData.display_name,
        country_id: formData.country_id
      })
      
      await refreshData()
      toast.success('Профилът е актуализиран успешно!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Грешка при актуализиране на профила')
    } finally {
      setLoading(false)
    }
  }

  const getCountryFlag = (countryId: string) => {
    const country = countries.find(c => c.id === countryId)
    return country ? country.flag : '🏳️'
  }

  const getCountryName = (countryId: string) => {
    const country = countries.find(c => c.id === countryId)
    return country ? country.name : 'Неизвестна държава'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Профил
          </h1>
          <p className="text-xl text-gray-600">
            Управлявайте настройките на вашия профил
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Основна информация
              </CardTitle>
              <CardDescription>
                Актуализирайте вашата основна информация
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="display_name">Име за показване</Label>
                  <Input
                    id="display_name"
                    placeholder="Въведете вашето име"
                    value={formData.display_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Имейл адрес</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">
                    Имейл адресът не може да бъде променен
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Държава</Label>
                  <Select 
                    value={formData.country_id} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, country_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Изберете държава" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.id} value={country.id}>
                          <div className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Запазване...' : 'Запази промените'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Profile Statistics */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Статистики
                </CardTitle>
                <CardDescription>
                  Вашите постижения и статистики
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ниво на играч:</span>
                    <span className="font-bold text-lg">{user?.level || 1}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Опит:</span>
                    <span className="font-bold text-lg">{user?.experience || 0} точки</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Репутация:</span>
                    <span className="font-bold text-lg">{user?.reputation || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Права за домакинство:</span>
                    <span className="font-bold text-lg">
                      {user?.hosting_rights ? JSON.parse(user.hosting_rights).length : 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Информация за държавата
                </CardTitle>
                <CardDescription>
                  Държавата която представявате
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user?.country_id ? (
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{getCountryFlag(user.country_id)}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{getCountryName(user.country_id)}</h3>
                      <p className="text-gray-600">
                        Представявате тази държава в състезанията
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-4">
                    Изберете държава за да започнете да състезавате атлети
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Профил информация
                </CardTitle>
                <CardDescription>
                  Детайли за вашия профил
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Създаден на:</span>
                    <span className="font-medium">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString('bg-BG') : 'Неизвестно'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">ID на играч:</span>
                    <span className="font-mono text-sm">{user?.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}