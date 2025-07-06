import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Trophy, Medal, Users, Crown, Star } from 'lucide-react'
import { Navigation } from '../components/Navigation'
import { useGame } from '../context/GameContext'

export const LeaderboardsPage = () => {
  const { athletes, countries } = useGame()

  const getCountryName = (countryId: string) => {
    const country = countries.find(c => c.id === countryId)
    return country ? country.name : 'Неизвестна държава'
  }

  const getCountryFlag = (countryId: string) => {
    const country = countries.find(c => c.id === countryId)
    return country ? country.flag : '🏳️'
  }

  // Mock medal data - in real app this would come from competition results
  const medalStandings = [
    { country_id: 'us', gold: 12, silver: 8, bronze: 15, total: 35 },
    { country_id: 'ru', gold: 10, silver: 12, bronze: 8, total: 30 },
    { country_id: 'de', gold: 8, silver: 10, bronze: 12, total: 30 },
    { country_id: 'cn', gold: 7, silver: 6, bronze: 9, total: 22 },
    { country_id: 'fr', gold: 6, silver: 8, bronze: 7, total: 21 },
    { country_id: 'bg', gold: 2, silver: 3, bronze: 4, total: 9 }
  ]

  // Top athletes by level and experience
  const topAthletes = [...athletes]
    .sort((a, b) => {
      const levelOrder = { titan: 5, olympian: 4, professional: 3, advanced: 2, amateur: 1 }
      const levelDiff = (levelOrder[b.level] || 0) - (levelOrder[a.level] || 0)
      if (levelDiff !== 0) return levelDiff
      return (b.experience || 0) - (a.experience || 0)
    })
    .slice(0, 10)

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'titan': return <Crown className="w-4 h-4 text-yellow-600" />
      case 'olympian': return <Star className="w-4 h-4 text-purple-600" />
      case 'professional': return <Trophy className="w-4 h-4 text-green-600" />
      case 'advanced': return <Medal className="w-4 h-4 text-blue-600" />
      default: return <Users className="w-4 h-4 text-gray-600" />
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

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `${position}.`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Класации
          </h1>
          <p className="text-xl text-gray-600">
            Следете водещите държави, атлети и постижения
          </p>
        </div>

        <Tabs defaultValue="medals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="medals">Медали по държави</TabsTrigger>
            <TabsTrigger value="athletes">Топ атлети</TabsTrigger>
            <TabsTrigger value="records">Рекорди</TabsTrigger>
          </TabsList>

          <TabsContent value="medals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Класация по медали
                </CardTitle>
                <CardDescription>
                  Общо медали спечелени от всяка държава
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medalStandings.map((country, index) => (
                    <div key={country.country_id} className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold w-8">
                          {getRankIcon(index + 1)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getCountryFlag(country.country_id)}</span>
                          <div>
                            <h3 className="font-semibold">{getCountryName(country.country_id)}</h3>
                            <p className="text-sm text-gray-600">Общо: {country.total} медала</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-600 font-bold">🥇 {country.gold}</span>
                          <span className="text-gray-400 font-bold">🥈 {country.silver}</span>
                          <span className="text-amber-600 font-bold">🥉 {country.bronze}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="athletes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Топ атлети
                </CardTitle>
                <CardDescription>
                  Най-успешните атлети по ниво и опит
                </CardDescription>
              </CardHeader>
              <CardContent>
                {topAthletes.length > 0 ? (
                  <div className="space-y-4">
                    {topAthletes.map((athlete, index) => (
                      <div key={athlete.id} className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold w-8">
                            {getRankIcon(index + 1)}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{getCountryFlag(athlete.country_id)}</span>
                            <div>
                              <h3 className="font-semibold">{athlete.name}</h3>
                              <p className="text-sm text-gray-600">{athlete.age} години</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className="bg-blue-100 text-blue-800">
                            {athlete.sport_id}
                          </Badge>
                          <div className="flex items-center gap-2">
                            {getLevelIcon(athlete.level)}
                            <span className="font-medium">{getLevelText(athlete.level)}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{athlete.experience || 0} опит</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Няма атлети все още
                    </h3>
                    <p className="text-gray-600">
                      Създайте атлети за да ги видите в класацията
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Световни рекорди
                </CardTitle>
                <CardDescription>
                  Най-добрите постижения в различните спортове
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Рекордите ще бъдат добавени
                  </h3>
                  <p className="text-gray-600">
                    Участвайте в състезания за да създавате нови рекорди
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}