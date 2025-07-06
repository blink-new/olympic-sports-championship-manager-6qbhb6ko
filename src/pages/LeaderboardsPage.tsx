import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { BarChart3, Trophy, Medal, Home, Globe, Crown, Award } from 'lucide-react'
import { Link } from 'react-router-dom'
import { countries } from '../data/countries'

const LeaderboardsPage = () => {
  const mockCountryMedals = [
    { country_id: 'us', gold: 45, silver: 38, bronze: 33, total: 116 },
    { country_id: 'cn', gold: 38, silver: 32, bronze: 18, total: 88 },
    { country_id: 'gb', gold: 22, silver: 21, bronze: 22, total: 65 },
    { country_id: 'ru', gold: 20, silver: 28, bronze: 23, total: 71 },
    { country_id: 'de', gold: 17, silver: 10, bronze: 15, total: 42 },
    { country_id: 'bg', gold: 3, silver: 5, bronze: 7, total: 15 },
  ]

  const mockTopAthletes = [
    { name: 'Иван Петров', country: 'bg', sport: 'Athletics', medals: 5, level: 'titan' },
    { name: 'Maria Garcia', country: 'es', sport: 'Swimming', medals: 4, level: 'olympian' },
    { name: 'John Smith', country: 'us', sport: 'Basketball', medals: 3, level: 'olympian' },
    { name: 'Li Wei', country: 'cn', sport: 'Gymnastics', medals: 4, level: 'titan' },
    { name: 'Sophie Martin', country: 'fr', sport: 'Tennis', medals: 2, level: 'professional' },
  ]

  const levelColors = {
    amateur: 'bg-gray-100 text-gray-800',
    advanced: 'bg-blue-100 text-blue-800',
    professional: 'bg-green-100 text-green-800',
    olympian: 'bg-amber-100 text-amber-800',
    titan: 'bg-purple-100 text-purple-800'
  }

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
                <BarChart3 className="h-8 w-8 text-blue-500" />
                <h1 className="text-2xl font-bold">Класирания и статистики</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="countries" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="countries">По държави</TabsTrigger>
            <TabsTrigger value="athletes">Най-добри атлети</TabsTrigger>
            <TabsTrigger value="records">Рекорди</TabsTrigger>
          </TabsList>

          {/* Countries Tab */}
          <TabsContent value="countries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  Класиране по държави
                </CardTitle>
                <CardDescription>
                  Общо медали спечелени от всяка държава
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCountryMedals.map((country, index) => {
                    const countryData = countries.find(c => c.id === country.country_id)
                    return (
                      <div key={country.country_id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{countryData?.flag}</span>
                            <div>
                              <div className="font-semibold text-lg">{countryData?.name}</div>
                              <div className="text-sm text-gray-500">{country.total} общо медала</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                              <Crown className="h-3 w-3 text-white" />
                            </div>
                            <span className="font-bold">{country.gold}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                              <Medal className="h-3 w-3 text-white" />
                            </div>
                            <span className="font-bold">{country.silver}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-amber-700 to-amber-800 rounded-full flex items-center justify-center">
                              <Award className="h-3 w-3 text-white" />
                            </div>
                            <span className="font-bold">{country.bronze}</span>
                          </div>
                          <div className="text-xl font-bold text-blue-600 ml-4">
                            {country.total}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Athletes Tab */}
          <TabsContent value="athletes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Най-добри атлети
                </CardTitle>
                <CardDescription>
                  Топ атлети по брой медали и постижения
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTopAthletes.map((athlete, index) => {
                    const countryData = countries.find(c => c.id === athlete.country)
                    return (
                      <div key={athlete.name} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {athlete.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-lg">{athlete.name}</span>
                              <span className="text-lg">{countryData?.flag}</span>
                            </div>
                            <div className="text-sm text-gray-500">{athlete.sport}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={levelColors[athlete.level as keyof typeof levelColors]}>
                            {athlete.level}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Medal className="h-4 w-4 text-amber-500" />
                            <span className="font-bold">{athlete.medals}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  Световни рекорди
                </CardTitle>
                <CardDescription>
                  Най-добри постижения в различните спортове
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Все още няма установени рекорди</p>
                  <p className="text-sm text-gray-500">Станете първия световен рекордьор!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default LeaderboardsPage