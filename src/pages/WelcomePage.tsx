import React from 'react'
import { Trophy, Users, Medal, Globe, Target, TrendingUp } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useAuth } from '../context/AuthContext'

export const WelcomePage = () => {
  const { login } = useAuth()

  const features = [
    {
      icon: Users,
      title: 'Управление на атлети',
      description: 'Създавайте и развивайте до 20 атлета на спорт'
    },
    {
      icon: Trophy,
      title: 'Състезания',
      description: 'Участвайте в регионални, континентални и световни шампионати'
    },
    {
      icon: Medal,
      title: 'Олимпийски игри',
      description: 'Водете спортистите си до олимпийска слава'
    },
    {
      icon: Globe,
      title: 'Световни държави',
      description: 'Изберете държава и представете я на световната сцена'
    },
    {
      icon: Target,
      title: 'Развитие на уменията',
      description: 'Тренирайте атлетите от аматьори до титани на спорта'
    },
    {
      icon: TrendingUp,
      title: 'Статистики и рекорди',
      description: 'Следете постиженията и създавайте нови рекорди'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-amber-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="relative mb-8">
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto animate-pulse" />
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6">
            Olympic Sports Championship Manager
          </h1>
          <p className="text-2xl text-white/90 mb-8 max-w-4xl mx-auto">
            Създайте своята спортна империя! Управлявайте атлети, печелете медали и водете държавата си към олимпийска слава.
          </p>
          <Button 
            onClick={login}
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xl px-12 py-6 rounded-xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Започнете играта
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/80 text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Как функционира играта?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  1. Регистрация и избор на държава
                </h3>
                <p className="text-white/90">
                  Създайте профил, изберете държавата си и започнете да строите спортна династия.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  2. Създаване на атлети
                </h3>
                <p className="text-white/90">
                  Създайте до 20 атлета за всеки спорт и започнете да ги развивате.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  3. Тренировки и развитие
                </h3>
                <p className="text-white/90">
                  Тренирайте атлетите си от аматьори до титани на спорта.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  4. Състезания и медали
                </h3>
                <p className="text-white/90">
                  Участвайте в шампионати, печелете медали и домакинствайте игри.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}