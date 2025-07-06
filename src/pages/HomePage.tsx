import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Trophy, Target, Medal, Globe, Users, Calendar, TrendingUp, Sun, Snowflake } from 'lucide-react'
import { countries, sports } from '../data/countries'
import { blink } from '../blink/client'
import { useGame } from '../context/GameContext'

const HomePage = () => {
  const navigate = useNavigate()
  const { refreshData } = useGame()
  const [selectedCountry, setSelectedCountry] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [selectedSports, setSelectedSports] = useState<string[]>([])
  const [isCreating, setIsCreating] = useState(false)

  const handleSportToggle = (sportId: string) => {
    setSelectedSports(prev => 
      prev.includes(sportId) 
        ? prev.filter(id => id !== sportId)
        : [...prev, sportId]
    )
  }

  const handleCreateProfile = async () => {
    if (!selectedCountry || !displayName || selectedSports.length === 0) {
      return
    }

    try {
      setIsCreating(true)
      
      // Get current user
      const authUser = await blink.auth.me()
      if (!authUser) return

      // Create user profile
      await blink.db.users.upsertMany([
        {
          id: authUser.id,
          email: '', // Email is no longer required
          display_name: displayName,
          country_id: selectedCountry,
          created_at: new Date().toISOString(),
          level: 1,
          experience: 0,
          reputation: 0,
          hosting_rights: []
        }
      ])

      // Create initial athletes for selected sports
      const athletePromises = selectedSports.map(sportId => 
        blink.db.athletes.upsertMany([
          {
            id: `${authUser.id}-${sportId}-${Math.random().toString(36).substr(2, 9)}`,
            name: `${displayName} ${Math.random().toString(36).substr(2, 4)}`,
            age: Math.floor(Math.random() * 10) + 18,
            sport_id: sportId,
            country_id: selectedCountry,
            user_id: authUser.id,
            level: 'amateur',
            experience: 0,
            stamina: Math.floor(Math.random() * 20) + 40,
            strength: Math.floor(Math.random() * 20) + 40,
            speed: Math.floor(Math.random() * 20) + 40,
            technique: Math.floor(Math.random() * 20) + 40,
            mental: Math.floor(Math.random() * 20) + 40,
            created_at: new Date().toISOString(),
            achievements: []
          }
        ])
      )

      await Promise.all(athletePromises)
      
      // Refresh data and navigate
      await refreshData()
      navigate('/dashboard')
    } catch (error) {
      console.error('Error creating profile:', error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-amber-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex justify-center items-center gap-4 mb-6">
                <Trophy className="h-16 w-16 text-amber-500" />
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                  Olympic Champions
                </h1>
                <Medal className="h-16 w-16 text-blue-500" />
              </div>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                Създайте своя спортен империи! Развивайте атлети, участвайте в шампионати и станете олимпийски шампион.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            >
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200 hover:border-blue-300 transition-colors">
                <CardHeader className="text-center">
                  <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Развитие на атлети</CardTitle>
                  <CardDescription>Тренирайте и развивайте уменията на спортистите си</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:border-green-300 transition-colors">
                <CardHeader className="text-center">
                  <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Международни състезания</CardTitle>
                  <CardDescription>Участвайте в регионални, континентални и световни шампионати</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-amber-200 hover:border-amber-300 transition-colors">
                <CardHeader className="text-center">
                  <Calendar className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Олимпийски игри</CardTitle>
                  <CardDescription>Достигнете върха и участвайте в Олимпийските игри</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 hover:border-purple-300 transition-colors">
                <CardHeader className="text-center">
                  <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">Статистики и рекорди</CardTitle>
                  <CardDescription>Следете постиженията си и класиранията по страни</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Registration Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center items-center gap-2 mb-4">
                <Globe className="h-8 w-8 text-blue-500" />
                <CardTitle className="text-3xl">Започнете вашето пътуване</CardTitle>
              </div>
              <CardDescription className="text-lg">
                Изберете страната си и спортовете, в които искате да се състезавате
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Name */}
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-sm font-medium">
                  Потребителско име
                </Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Въведете вашето потребителско име"
                  className="h-12"
                />
              </div>

              {/* Country Selection */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">
                  Държава
                </Label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger id="country" className="h-12">
                    <SelectValue placeholder="Изберете държава" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country.id} value={country.id}>
                        <div className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          {country.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sports Selection */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">
                  Изберете спортове
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Summer Sports */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                      <Sun className="h-5 w-5" />
                      Летни спортове
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {sports.filter(sport => sport.type === 'summer').map((sport) => (
                        <Button
                          key={sport.id}
                          variant={selectedSports.includes(sport.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleSportToggle(sport.id)}
                          className="h-auto p-2 text-xs"
                        >
                          {sport.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Winter Sports */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                      <Snowflake className="h-5 w-5" />
                      Зимни спортове
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {sports.filter(sport => sport.type === 'winter').map((sport) => (
                        <Button
                          key={sport.id}
                          variant={selectedSports.includes(sport.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleSportToggle(sport.id)}
                          className="h-auto p-2 text-xs"
                        >
                          {sport.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleCreateProfile} disabled={isCreating} className="w-full h-12 text-lg">
                {isCreating ? 'Създаване на профил...' : 'Започнете играта'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage
