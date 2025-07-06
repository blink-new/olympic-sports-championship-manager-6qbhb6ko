import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Trophy, Users, Medal, Globe, Target, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useGame } from '../context/GameContext'
import { useNavigate } from 'react-router-dom'
import { Navigation } from '../components/Navigation'
import { initializeGameData } from '../data/initializeData'

export const DashboardPage = () => {
  const { user } = useAuth()
  const { athletes, competitions, news } = useGame()
  const navigate = useNavigate()

  useEffect(() => {
    // Initialize game data when dashboard loads
    initializeGameData()
  }, [])

  const stats = [
    {
      title: 'Общо атлети',
      value: athletes.length,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Активни състезания',
      value: competitions.filter(c => c.status === 'ongoing').length,
      icon: Trophy,
      color: 'text-green-600'
    },
    {
      title: 'Спечелени медали',
      value: 0, // Will be calculated from achievements
      icon: Medal,
      color: 'text-yellow-600'
    },
    {
      title: 'Ниво на играч',
      value: user?.level || 1,
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ]

  const recentNews = news.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Добре дошли, {user?.display_name}!
          </h1>
          <p className="text-xl text-gray-600">
            Управлявайте своите атлети и водете държавата си към олимпийска слава.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Управление на атлети
              </CardTitle>
              <CardDescription>
                Създавайте и развивайте вашите атлети
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Имате {athletes.length} атлета. Можете да създавате до 20 атлета за всеки спорт.
                </p>
                <Button 
                  onClick={() => navigate('/athletes')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Отидете към атлетите
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Състезания
              </CardTitle>
              <CardDescription>
                Участвайте в регионални и световни състезания
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  {competitions.filter(c => c.status === 'upcoming').length} предстоящи състезания
                </p>
                <Button 
                  onClick={() => navigate('/competitions')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Вижте състезанията
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent News */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Последни новини
            </CardTitle>
            <CardDescription>
              Актуални новини от спортния свят
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNews.length > 0 ? (
                recentNews.map((article, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-gray-800">{article.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{article.content}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(article.published_at).toLocaleDateString('bg-BG')}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Няма налични новини в момента
                </p>
              )}
              <Button 
                onClick={() => navigate('/news')}
                variant="outline"
                className="w-full"
              >
                Вижте всички новини
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Setup Notice */}
        {!user?.country_id && (
          <Card className="border-yellow-200 bg-yellow-50 hover:shadow-lg transition-shadow duration-300 mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <Globe className="w-5 h-5" />
                Настройка на профила
              </CardTitle>
              <CardDescription className="text-yellow-700">
                Завършете настройката на профила си
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-yellow-800">
                  Изберете държавата си за да започнете да състезавате атлети от нея.
                </p>
                <Button 
                  onClick={() => navigate('/profile')}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  Завършете профила
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}