import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { blink } from '../blink/client'
import { User, Athlete, Competition, NewsItem, Country } from '../types/game'

interface GameContextType {
  user: User | null
  athletes: Athlete[]
  competitions: Competition[]
  news: NewsItem[]
  countries: Country[]
  loading: boolean
  refreshData: () => Promise<void>
  setUser: (user: User | null) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)

  const refreshData = async () => {
    try {
      setLoading(true)

      // Ensure user is authenticated before fetching protected data
      if (!blink.auth.isAuthenticated()) {
        // Not logged in yet – skip fetching until auth completes
        setUser(null)
        setAthletes([])
        setCompetitions([])
        setNews([])
        setCountries([])
        setLoading(false)
        return
      }

      // Load user data
      const authUser = await blink.auth.me()
      if (authUser) {
        // Ensure the users table exists by performing an upsert
        try {
          await blink.db.users.upsertMany([
            {
              id: authUser.id,
              email: authUser.email ?? '',
              display_name: authUser.email ?? 'Player',
              country_id: '',
              created_at: new Date().toISOString(),
              level: 1,
              experience: 0,
              reputation: 0,
              hosting_rights: []
            }
          ])
        } catch (err) {
          // Ignore table not found error if SDK still initialising – it will be created on first upsert
          console.warn('Upsert users table warning:', err)
        }

        let profile: User | null = null
        try {
          const list = await blink.db.users.list({ where: { id: authUser.id }, limit: 1 })
          profile = list.length ? list[0] : null
        } catch (err) {
          console.warn('Fetch user profile failed:', err)
        }

        const baseUser = profile ?? {
          id: authUser.id,
          email: authUser.email ?? '',
          display_name: authUser.email ?? 'Player',
          country_id: '',
          created_at: new Date().toISOString(),
          level: 1,
          experience: 0,
          reputation: 0,
          hosting_rights: []
        }

        setUser(baseUser as User)
      }

      // Load athletes
      const athletesData = await blink.db.athletes.list({
        where: { user_id: authUser?.id },
        orderBy: { created_at: 'desc' }
      })
      setAthletes(athletesData as Athlete[])

      // Load competitions
      const competitionsData = await blink.db.competitions.list({
        orderBy: { start_date: 'desc' },
        limit: 50
      })
      setCompetitions(competitionsData as Competition[])

      // Load news
      const newsData = await blink.db.news.list({
        orderBy: { published_at: 'desc' },
        limit: 20
      })
      setNews(newsData as NewsItem[])

      // Load countries
      const countriesData = await blink.db.countries.list({
        orderBy: { name: 'asc' }
      })
      setCountries(countriesData as Country[])
    } catch (error) {
      console.error('Error loading game data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((user) => {
      if (user) {
        refreshData()
      } else {
        setUser(null)
        setAthletes([])
        setCompetitions([])
        setNews([])
        setCountries([])
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <GameContext.Provider value={{
      user,
      athletes,
      competitions,
      news,
      countries,
      loading,
      refreshData,
      setUser
    }}>
      {children}
    </GameContext.Provider>
  )
}