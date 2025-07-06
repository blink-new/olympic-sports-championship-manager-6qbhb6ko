import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Calendar, Trophy, Medal, Home, Globe, Users, Star, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { sports } from '../data/countries'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

const CompetitionsPage = () => {
  const { user, refreshData } = useGame()
  const [isCreating, setIsCreating] = useState(false)
  const [newCompetitionName, setNewCompetitionName] = useState('')
  const [newCompetitionSport, setNewCompetitionSport] = useState('')

  const handleCreateCompetition = async () => {
    if (!user || !newCompetitionName || !newCompetitionSport) return

    try {
      setIsCreating(true)
      await blink.db.competitions.create({
        name: newCompetitionName,
        level: 'regional',
        sport_id: newCompetitionSport,
        season: new Date().getFullYear().toString(),
        start_date: new Date().toISOString(),
        end_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
        host_country_id: user.country_id,
        status: 'upcoming',
        participants: [],
        results: []
      })
      await refreshData()
      setNewCompetitionName('')
      setNewCompetitionSport('')
    } catch (error) {
      console.error('Error creating competition:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const upcomingCompetitions = [
    {
      id: 1,
      name: "Европейско първенство по атлетика",
      level: "continental",
      sport: "Athletics",
      date: "2024-06-15",
      location: "Париж, Франция",
      prize: "Златни, сребърни и бронзови медали",
      requirements: "Професионално ниво или по-високо"
    },
    {
      id: 2,
      name: "Световно първенство по плуване",
      level: "world",
      sport: "Swimming",
      date: "2024-07-22",
      location: "Токио, Япония",
      prize: "Световни титли и квалификации за Олимпиада",
      requirements: "Олимпийско ниво"
    },
    {
      id: 3,
      name: "Зимни олимпийски игри",
      level: "olympic",
      sport: "Multi-sport",
      date: "2024-02-08",
      location: "Милано, Италия",
      prize: "Олимпийски медали",
      requirements: "Титан ниво"
    }
  ]

  const levelColors = {
    regional: "bg-green-100 text-green-800",
    continental: "bg-blue-100 text-blue-800",
    world: "bg-purple-100 text-purple-800",
    olympic: "bg-amber-100 text-amber-800"
  }

  const levelIcons = {
    regional: <Users className="h-4 w-4" />,
    continental: <Globe className="h-4 w-4" />,
    world: <Trophy className="h-4 w-4" />,
    olympic: <Medal className="h-4 w-4" />
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
                <Calendar className="h-8 w-8 text-blue-500" />
                <h1 className="text-2xl font-bold">Състезания</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {upcomingCompetitions.length} предстоящи
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Competition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-green-500" />
                  Организирай състезание
                </CardTitle>
                <CardDescription>
                  Създайте свой собствен шампионат и поканете други играчи
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Създай ново състезание
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ново състезание</DialogTitle>
                      <DialogDescription>
                        Попълнете информацията, за да създадете нов шампионат
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="competitionName">Име на състезанието</Label>
                        <Input 
                          id="competitionName" 
                          value={newCompetitionName} 
                          onChange={(e) => setNewCompetitionName(e.target.value)} 
                          placeholder="Напр. Национален шампионат по лека атлетика"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="competitionSport">Спорт</Label>
                        <Select value={newCompetitionSport} onValueChange={setNewCompetitionSport}>
                          <SelectTrigger id="competitionSport">
                            <SelectValue placeholder="Изберете спорт" />
                          </SelectTrigger>
                          <SelectContent>
                            {sports.map(sport => (
                              <SelectItem key={sport.id} value={sport.id}>
                                <div className="flex items-center gap-2">
                                  <sport.icon className="h-4 w-4" />
                                  {sport.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleCreateCompetition} disabled={isCreating} className="w-full">
                        {isCreating ? 'Създаване...' : 'Създай'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Upcoming Competitions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Предстоящи състезания
                </CardTitle>
                <CardDescription>
                  Участвайте в турнири и шампионати за да спечелите медали и слава
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingCompetitions.map((competition) => (
                    <Card key={competition.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{competition.name}</h3>
                              <Badge className={levelColors[competition.level as keyof typeof levelColors]}>
                                {levelIcons[competition.level as keyof typeof levelIcons]}
                                <span className="ml-1 capitalize">{competition.level}</span>
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{competition.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                <span>{competition.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Trophy className="h-4 w-4" />
                                <span>{competition.prize}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                <span>{competition.requirements}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button size="sm" disabled>
                              Регистрация
                            </Button>
                            <Button size="sm" variant="outline" disabled>
                              Детайли
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Competition History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-blue-500" />
                  История на състезанията
                </CardTitle>
                <CardDescription>
                  Вашите минали участия и постижения
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Все още не сте участвали в състезания</p>
                  <p className="text-sm text-gray-500">Развийте атлетите си и участвайте в първия си турнир!</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Competition Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  Изисквания за участие
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">
                      <Users className="h-3 w-3 mr-1" />
                      Регионално
                    </Badge>
                    <span className="text-sm">Напреднал+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      <Globe className="h-3 w-3 mr-1" />
                      Континентално
                    </Badge>
                    <span className="text-sm">Професионалист+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-800">
                      <Trophy className="h-3 w-3 mr-1" />
                      Световно
                    </Badge>
                    <span className="text-sm">Олимпиец+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-100 text-amber-800">
                      <Medal className="h-3 w-3 mr-1" />
                      Олимпиада
                    </Badge>
                    <span className="text-sm">Титан</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-blue-500" />
                  Следващи стъпки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Тренирайте атлетите си</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Достигнете необходимото ниво</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Регистрирайте се за състезания</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Спечелете медали и слава!</span>
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

export default CompetitionsPage