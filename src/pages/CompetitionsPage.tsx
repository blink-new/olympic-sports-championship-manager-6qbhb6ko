import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Trophy, Calendar, MapPin, Users } from 'lucide-react'
import { Navigation } from '../components/Navigation'
import { useGame } from '../context/GameContext'

export const CompetitionsPage = () => {
  const { competitions, countries, sports } = useGame()

  const getCompetitionLevel = (level: string) => {
    switch (level) {
      case 'regional': return { text: 'Регионално', color: 'bg-blue-100 text-blue-800' }
      case 'continental': return { text: 'Континентално', color: 'bg-green-100 text-green-800' }
      case 'world': return { text: 'Световно', color: 'bg-purple-100 text-purple-800' }
      case 'olympic': return { text: 'Олимпийско', color: 'bg-yellow-100 text-yellow-800' }
      default: return { text: 'Неизвестно', color: 'bg-gray-100 text-gray-800' }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'ongoing': return 'bg-green-100 text-green-800'
      case 'finished': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Предстоящо'
      case 'ongoing': return 'В ход'
      case 'finished': return 'Завършено'
      default: return 'Неизвестно'
    }
  }

  const getCountryName = (countryId: string) => {
    const country = countries.find(c => c.id === countryId)
    return country ? country.name : 'Неизвестна държава'
  }

  const getSportName = (sportId: string) => {
    const sport = sports.find(s => s.id === sportId)
    return sport ? sport.name : 'Неизвестен спорт'
  }

  const upcomingCompetitions = competitions.filter(c => c.status === 'upcoming')
  const ongoingCompetitions = competitions.filter(c => c.status === 'ongoing')
  const finishedCompetitions = competitions.filter(c => c.status === 'finished')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Състезания
          </h1>
          <p className="text-xl text-gray-600">
            Участвайте в регионални, континентални и световни състезания
          </p>
        </div>

        {/* Ongoing Competitions */}
        {ongoingCompetitions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">В ход сега</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ongoingCompetitions.map((competition) => (
                <Card key={competition.id} className="border-green-200 bg-green-50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{competition.name}</CardTitle>
                      <Badge className={getCompetitionLevel(competition.level).color}>
                        {getCompetitionLevel(competition.level).text}
                      </Badge>
                    </div>
                    <CardDescription>
                      {getSportName(competition.sport_id)} • {competition.season}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{getCountryName(competition.host_country_id)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>
                          {new Date(competition.start_date).toLocaleDateString('bg-BG')} - 
                          {new Date(competition.end_date).toLocaleDateString('bg-BG')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>Участници: 0</span>
                      </div>
                      <Badge className={getStatusColor(competition.status)}>
                        {getStatusText(competition.status)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Competitions */}
        {upcomingCompetitions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Предстоящи състезания</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {upcomingCompetitions.map((competition) => (
                <Card key={competition.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{competition.name}</CardTitle>
                      <Badge className={getCompetitionLevel(competition.level).color}>
                        {getCompetitionLevel(competition.level).text}
                      </Badge>
                    </div>
                    <CardDescription>
                      {getSportName(competition.sport_id)} • {competition.season}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{getCountryName(competition.host_country_id)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>
                          {new Date(competition.start_date).toLocaleDateString('bg-BG')} - 
                          {new Date(competition.end_date).toLocaleDateString('bg-BG')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>Участници: 0</span>
                      </div>
                      <Badge className={getStatusColor(competition.status)}>
                        {getStatusText(competition.status)}
                      </Badge>
                    </div>
                    <Button className="w-full mt-4" disabled>
                      Регистрирай атлети
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Finished Competitions */}
        {finishedCompetitions.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Завършени състезания</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {finishedCompetitions.slice(0, 6).map((competition) => (
                <Card key={competition.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{competition.name}</CardTitle>
                      <Badge className={getCompetitionLevel(competition.level).color}>
                        {getCompetitionLevel(competition.level).text}
                      </Badge>
                    </div>
                    <CardDescription>
                      {getSportName(competition.sport_id)} • {competition.season}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{getCountryName(competition.host_country_id)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>
                          {new Date(competition.start_date).toLocaleDateString('bg-BG')} - 
                          {new Date(competition.end_date).toLocaleDateString('bg-BG')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="w-4 h-4 text-gray-500" />
                        <span>Резултати налични</span>
                      </div>
                      <Badge className={getStatusColor(competition.status)}>
                        {getStatusText(competition.status)}
                      </Badge>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Виж резултати
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {competitions.length === 0 && (
          <Card className="text-center py-16">
            <CardContent>
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Няма състезания в момента
              </h3>
              <p className="text-gray-600">
                Състезанията ще бъдат добавени скоро
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}