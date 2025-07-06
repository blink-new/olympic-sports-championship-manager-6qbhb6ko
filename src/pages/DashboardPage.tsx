import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Trophy, 
  Target, 
  Medal, 
  Users, 
  Calendar, 
  TrendingUp,
  Star,
  Award,

  BarChart3,
  Bell,
  Zap
} from 'lucide-react'
import { useGame } from '../context/GameContext'
import { countries, sports } from '../data/countries'
import { Link } from 'react-router-dom'

const DashboardPage = () => {
  const { user, athletes, loading } = useGame()
  const [activeTab, setActiveTab] = useState('overview')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Зареждане на данните...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Профилът не е намерен</CardTitle>
            <CardDescription>Моля, създайте профил първо</CardDescription>
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
  const userSports = sports.filter(sport => athletes.some(athlete => athlete.sport_id === sport.id))
  const totalMedals = athletes.reduce((sum, athlete) => sum + athlete.achievements.length, 0)
  const averageLevel = athletes.length > 0 ? 
    athletes.reduce((sum, athlete) => {
      const levelValues = { amateur: 1, advanced: 2, professional: 3, olympian: 4, titan: 5 }
      return sum + levelValues[athlete.level]
    }, 0) / athletes.length : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-8 w-8 text-amber-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                  Olympic Champions
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{userCountry?.flag}</span>
                <span className="text-lg font-medium">{userCountry?.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                Ниво {user.level}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {user.experience} опит
              </Badge>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Известия
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Преглед</TabsTrigger>
            <TabsTrigger value="athletes">Атлети</TabsTrigger>
            <TabsTrigger value="competitions">Състезания</TabsTrigger>
            <TabsTrigger value="training">Тренировки</TabsTrigger>
            <TabsTrigger value="statistics">Статистики</TabsTrigger>
            <TabsTrigger value="news">Новини</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Общо атлети</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{athletes.length}</div>
                  <div className="flex items-center gap-2 text-sm opacity-80">
                    <Users className="h-4 w-4" />
                    В {userSports.length} спорта
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Общо медали</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalMedals}</div>
                  <div className="flex items-center gap-2 text-sm opacity-80">
                    <Medal className="h-4 w-4" />
                    Постижения
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Средно ниво</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{averageLevel.toFixed(1)}</div>
                  <div className="flex items-center gap-2 text-sm opacity-80">
                    <TrendingUp className="h-4 w-4" />
                    Развитие
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Репутация</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.reputation}</div>
                  <div className="flex items-center gap-2 text-sm opacity-80">
                    <Star className="h-4 w-4" />
                    Точки
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Управление на атлети
                  </CardTitle>
                  <CardDescription>
                    Тренирайте и развивайте уменията на спортистите си
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/athletes">
                    <Button className="w-full">
                      Към атлетите
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-500" />
                    Състезания
                  </CardTitle>
                  <CardDescription>
                    Участвайте в турнири и шампионати
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/competitions">
                    <Button className="w-full">
                      Към състезанията
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    Статистики
                  </CardTitle>
                  <CardDescription>
                    Преглед на резултатите и класиранията
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/leaderboards">
                    <Button className="w-full">
                      Към статистиките
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Top Athletes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Най-добри атлети
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {athletes.slice(0, 5).map((athlete) => {
                    const sport = sports.find(s => s.id === athlete.sport_id)
                    const levelColors = {
                      amateur: 'bg-gray-100 text-gray-800',
                      advanced: 'bg-blue-100 text-blue-800',
                      professional: 'bg-green-100 text-green-800',
                      olympian: 'bg-amber-100 text-amber-800',
                      titan: 'bg-purple-100 text-purple-800'
                    }
                    
                    return (
                      <div key={athlete.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {athlete.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{athlete.name}</div>
                            <div className="text-sm text-gray-500">{sport?.name}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={levelColors[athlete.level]}>
                            {athlete.level}
                          </Badge>
                          <Badge variant="outline">
                            {athlete.experience} опит
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Athletes Tab */}
          <TabsContent value="athletes">
            <Card>
              <CardHeader>
                <CardTitle>Управление на атлети</CardTitle>
                <CardDescription>
                  Тренирайте и развивайте уменията на спортистите си
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/athletes">
                  <Button>Отвори пълното управление на атлети</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sports Experience */}
          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  Опит по спортове
                </CardTitle>
                <CardDescription>
                  Вашият натрупан опит във всеки избран спорт
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userSports.map(sport => {
                    const sportAthletes = athletes.filter(a => a.sport_id === sport.id)
                    const totalExperience = sportAthletes.reduce((sum, a) => sum + a.experience, 0)
                    const SportIcon = sport.icon

                    return (
                      <Card key={sport.id} className="flex flex-col">
                        <CardHeader className="flex-row items-center justify-between pb-2">
                          <CardTitle className="text-base font-medium flex items-center gap-2">
                            <SportIcon className="h-5 w-5 text-gray-500" />
                            {sport.name}
                          </CardTitle>
                          <Badge variant="outline">{totalExperience} опит</Badge>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-end">
                          <Progress value={(totalExperience / 1000) * 100} className="h-2 mt-2" />
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs placeholder */}
          <TabsContent value="competitions">
            <Card>
              <CardHeader>
                <CardTitle>Състезания</CardTitle>
                <CardDescription>Участвайте в турнири и шампионати</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/competitions">
                  <Button>Към състезанията</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics">
            <Card>
              <CardHeader>
                <CardTitle>Статистики</CardTitle>
                <CardDescription>Преглед на резултатите и класиранията</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/leaderboards">
                  <Button>Към статистиките</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news">
            <Card>
              <CardHeader>
                <CardTitle>Новини</CardTitle>
                <CardDescription>Последни новини и постижения</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/news">
                  <Button>Към новините</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default DashboardPage