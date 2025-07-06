import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { Plus, Users, Trophy, Target, TrendingUp } from 'lucide-react'
import { Navigation } from '../components/Navigation'
import { useGame } from '../context/GameContext'
// import { useAuth } from '../context/AuthContext'
import { CreateAthleteDialog } from '../components/CreateAthleteDialog'

export const AthleteManagementPage = () => {
  const { athletes, sports } = useGame()
  // const { } = useAuth()
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'amateur': return 'bg-gray-100 text-gray-800'
      case 'advanced': return 'bg-blue-100 text-blue-800'
      case 'professional': return 'bg-green-100 text-green-800'
      case 'olympian': return 'bg-purple-100 text-purple-800'
      case 'titan': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelText = (level: string) => {
    switch (level) {
      case 'amateur': return 'Аматьор'
      case 'advanced': return 'Напреднал'
      case 'professional': return 'Професионалист'
      case 'olympian': return 'Олимпиец'
      case 'titan': return 'Титан'
      default: return 'Неизвестно'
    }
  }

  const getAthleteStats = (athlete: { stamina?: number; strength?: number; speed?: number; technique?: number; mental?: number }) => {
    const stats = [
      { label: 'Издръжливост', value: athlete.stamina || 50 },
      { label: 'Сила', value: athlete.strength || 50 },
      { label: 'Скорост', value: athlete.speed || 50 },
      { label: 'Техника', value: athlete.technique || 50 },
      { label: 'Психика', value: athlete.mental || 50 }
    ]
    return stats
  }

  const getSportName = (sportId: string) => {
    const sport = sports.find(s => s.id === sportId)
    return sport ? sport.name : 'Неизвестен спорт'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Управление на атлети
            </h1>
            <p className="text-xl text-gray-600">
              Създавайте и развивайте вашите атлети до олимпийска слава
            </p>
          </div>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Създай атлет
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общо атлети</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{athletes.length}</div>
              <p className="text-xs text-muted-foreground">
                от максимум {sports.length * 20}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Олимпийци</CardTitle>
              <Trophy className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {athletes.filter(a => a.level === 'olympian' || a.level === 'titan').length}
              </div>
              <p className="text-xs text-muted-foreground">
                elit атлети
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Средно ниво</CardTitle>
              <Target className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {athletes.length > 0 ? Math.round(athletes.reduce((acc, a) => acc + (a.experience || 0), 0) / athletes.length) : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                опит точки
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активни спортове</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(athletes.map(a => a.sport_id)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                различни спорта
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Athletes Grid */}
        {athletes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {athletes.map((athlete) => (
              <Card key={athlete.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{athlete.name}</CardTitle>
                    <Badge className={getLevelColor(athlete.level)}>
                      {getLevelText(athlete.level)}
                    </Badge>
                  </div>
                  <CardDescription>
                    {getSportName(athlete.sport_id)} • {athlete.age} години
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Опит</span>
                        <span>{athlete.experience || 0} точки</span>
                      </div>
                      <Progress value={Math.min((athlete.experience || 0) / 10, 100)} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {getAthleteStats(athlete).map((stat, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-600">{stat.label}:</span>
                          <span className="font-medium">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Няmate атлети все още
              </h3>
              <p className="text-gray-600 mb-6">
                Създайте първия си атлет и започнете пътуването към олимпийска слава
              </p>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Създай първия атлет
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Create Athlete Dialog */}
        <CreateAthleteDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
        />
      </div>
    </div>
  )
}