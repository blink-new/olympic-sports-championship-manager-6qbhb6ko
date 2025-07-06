import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { 
  Trophy, 
  Target, 
  Medal, 
  Users, 
  Zap,
  Activity,
  BarChart3,

  Star,
  TrendingUp,
  Clock,
  Home
} from 'lucide-react'
import { useGame } from '../context/GameContext'
import { countries, sports } from '../data/countries'
import { Link } from 'react-router-dom'
import { blink } from '../blink/client'

const AthleteManagementPage = () => {
  const { user, athletes, refreshData } = useGame()

  const [trainingType, setTrainingType] = useState<'stamina' | 'strength' | 'speed' | 'technique' | 'mental'>('stamina')
  const [isTraining, setIsTraining] = useState(false)

  const handleTraining = async (athleteId: string, type: 'stamina' | 'strength' | 'speed' | 'technique' | 'mental') => {
    if (!user) return
    
    try {
      setIsTraining(true)
      
      const athlete = athletes.find(a => a.id === athleteId)
      if (!athlete) return

      // Calculate training results
      const baseImprovement = Math.floor(Math.random() * 5) + 1
      const improvement = Math.min(baseImprovement, 100 - athlete[type])
      
      // Update athlete stats
      const updatedStats = {
        ...athlete,
        [type]: athlete[type] + improvement,
        experience: athlete.experience + 10
      }

      // Check for level up
      const experienceThresholds = {
        amateur: 100,
        advanced: 300,
        professional: 600,
        olympian: 1000,
        titan: 2000
      }

      let newLevel = athlete.level
      if (updatedStats.experience >= experienceThresholds.olympian && athlete.level === 'professional') {
        newLevel = 'olympian'
      } else if (updatedStats.experience >= experienceThresholds.professional && athlete.level === 'advanced') {
        newLevel = 'professional'
      } else if (updatedStats.experience >= experienceThresholds.advanced && athlete.level === 'amateur') {
        newLevel = 'advanced'
      } else if (updatedStats.experience >= experienceThresholds.titan && athlete.level === 'olympian') {
        newLevel = 'titan'
      }

      // Update athlete in database
      await blink.db.athletes.update(athleteId, {
        ...updatedStats,
        level: newLevel
      })

      // Create training record
      await blink.db.training.create({
        athlete_id: athleteId,
        type,
        duration: 2,
        intensity: 75,
        cost: 50,
        date: new Date().toISOString(),
        result: improvement
      })

      // Refresh data
      await refreshData()
      
    } catch (error) {
      console.error('Training error:', error)
    } finally {
      setIsTraining(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Трябва да влезете в профила си</CardTitle>
            <CardDescription>Моля, влезте в профила си за да управлявате атлетите</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/">
              <Button className="w-full">Обратно към началото</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const userCountry = countries.find(c => c.id === user.country_id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80">
                <Home className="h-6 w-6 text-blue-600" />
                <span className="text-blue-600">Начало</span>
              </Link>
              <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-blue-500" />
                <h1 className="text-2xl font-bold">Управление на атлети</h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{userCountry?.flag}</span>
                <span className="text-lg font-medium">{userCountry?.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {athletes.length} атлета
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Athletes List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Вашите атлети
                </CardTitle>
                <CardDescription>
                  Управлявайте и развивайте уменията на спортистите си
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {athletes.map((athlete) => {
                    const sport = sports.find(s => s.id === athlete.sport_id)
                    const levelColors = {
                      amateur: 'bg-gray-100 text-gray-800',
                      advanced: 'bg-blue-100 text-blue-800',
                      professional: 'bg-green-100 text-green-800',
                      olympian: 'bg-amber-100 text-amber-800',
                      titan: 'bg-purple-100 text-purple-800'
                    }
                    
                    const averageSkill = (athlete.stamina + athlete.strength + athlete.speed + athlete.technique + athlete.mental) / 5
                    
                    return (
                      <Card key={athlete.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {athlete.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium text-lg">{athlete.name}</div>
                                <div className="text-sm text-gray-500">{sport?.name} • {athlete.age} години</div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={levelColors[athlete.level]} variant="secondary">
                                    {athlete.level}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {athlete.experience} опит
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-blue-600">{averageSkill.toFixed(0)}</div>
                              <div className="text-xs text-gray-500">Средна оценка</div>
                            </div>
                          </div>
                          
                          {/* Skills */}
                          <div className="mt-4 space-y-2">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span>Издръжливост</span>
                                  <span className="font-medium">{athlete.stamina}</span>
                                </div>
                                <Progress value={athlete.stamina} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span>Сила</span>
                                  <span className="font-medium">{athlete.strength}</span>
                                </div>
                                <Progress value={athlete.strength} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span>Скорост</span>
                                  <span className="font-medium">{athlete.speed}</span>
                                </div>
                                <Progress value={athlete.speed} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span>Техника</span>
                                  <span className="font-medium">{athlete.technique}</span>
                                </div>
                                <Progress value={athlete.technique} className="h-2" />
                              </div>
                            </div>
                            <div className="w-full">
                              <div className="flex justify-between mb-1">
                                <span>Ментално състояние</span>
                                <span className="font-medium">{athlete.mental}</span>
                              </div>
                              <Progress value={athlete.mental} className="h-2" />
                            </div>
                          </div>

                          {/* Training Actions */}
                          <div className="mt-4 flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" className="flex-1">
                                  <Zap className="h-4 w-4 mr-2" />
                                  Тренировка
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Тренировка за {athlete.name}</DialogTitle>
                                  <DialogDescription>
                                    Изберете тип тренировка за подобряване на уменията
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-2">
                                    <Button
                                      variant={trainingType === 'stamina' ? 'default' : 'outline'}
                                      onClick={() => setTrainingType('stamina')}
                                      className="flex flex-col gap-2 h-auto p-4"
                                    >
                                      <Activity className="h-5 w-5" />
                                      <span>Издръжливост</span>
                                      <span className="text-xs opacity-70">{athlete.stamina}/100</span>
                                    </Button>
                                    <Button
                                      variant={trainingType === 'strength' ? 'default' : 'outline'}
                                      onClick={() => setTrainingType('strength')}
                                      className="flex flex-col gap-2 h-auto p-4"
                                    >
                                      <Target className="h-5 w-5" />
                                      <span>Сила</span>
                                      <span className="text-xs opacity-70">{athlete.strength}/100</span>
                                    </Button>
                                    <Button
                                      variant={trainingType === 'speed' ? 'default' : 'outline'}
                                      onClick={() => setTrainingType('speed')}
                                      className="flex flex-col gap-2 h-auto p-4"
                                    >
                                      <Zap className="h-5 w-5" />
                                      <span>Скорост</span>
                                      <span className="text-xs opacity-70">{athlete.speed}/100</span>
                                    </Button>
                                    <Button
                                      variant={trainingType === 'technique' ? 'default' : 'outline'}
                                      onClick={() => setTrainingType('technique')}
                                      className="flex flex-col gap-2 h-auto p-4"
                                    >
                                      <Star className="h-5 w-5" />
                                      <span>Техника</span>
                                      <span className="text-xs opacity-70">{athlete.technique}/100</span>
                                    </Button>
                                  </div>
                                  <Button
                                    variant={trainingType === 'mental' ? 'default' : 'outline'}
                                    onClick={() => setTrainingType('mental')}
                                    className="flex justify-between items-center w-full h-auto p-4"
                                  >
                                    <div className="flex items-center gap-2">
                                      <BarChart3 className="h-5 w-5" />
                                      <span>Ментално състояние</span>
                                    </div>
                                    <span className="text-xs opacity-70">{athlete.mental}/100</span>
                                  </Button>
                                  <Button
                                    onClick={() => handleTraining(athlete.id, trainingType)}
                                    disabled={isTraining}
                                    className="w-full"
                                  >
                                    {isTraining ? 'Трениране...' : 'Започни тренировка'}
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="outline" disabled>
                              <Medal className="h-4 w-4 mr-2" />
                              Състезания
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Статистики
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{athletes.length}</div>
                    <div className="text-sm text-gray-500">Общо атлети</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">
                      {athletes.reduce((sum, athlete) => sum + athlete.achievements.length, 0)}
                    </div>
                    <div className="text-sm text-gray-500">Постижения</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {athletes.length > 0 ? 
                      ((athletes.reduce((sum, athlete) => sum + athlete.stamina + athlete.strength + athlete.speed + athlete.technique + athlete.mental, 0) / (athletes.length * 5)).toFixed(1)) : 
                      '0'
                    }
                  </div>
                  <div className="text-sm text-gray-500">Средна оценка</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Последна активност
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {athletes.slice(0, 3).map((athlete) => (
                    <div key={athlete.id} className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {athlete.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{athlete.name}</div>
                        <div className="text-gray-500">Създаден</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AthleteManagementPage