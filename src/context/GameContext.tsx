import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { blink } from '../blink/client'
import { Athlete, Competition, NewsItem, Country, Sport } from '../types/game'
import { useAuth } from './AuthContext'

interface GameContextType {
  athletes: Athlete[]
  competitions: Competition[]
  news: NewsItem[]
  countries: Country[]
  sports: Sport[]
  loading: boolean
  refreshData: () => Promise<void>
  refreshAthletes: () => Promise<void>
  refreshCompetitions: () => Promise<void>
  refreshNews: () => Promise<void>
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
  const { user } = useAuth()
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [sports, setSports] = useState<Sport[]>([])
  const [loading, setLoading] = useState(false)

  const refreshAthletes = async () => {
    if (!user) return
    try {
      const athletesData = await blink.db.athletes.list({
        where: { user_id: user.id },
        orderBy: { created_at: 'desc' }
      })
      setAthletes(athletesData as Athlete[])
    } catch (error) {
      console.error('Error loading athletes:', error)
    }
  }

  const refreshCompetitions = async () => {
    try {
      const competitionsData = await blink.db.competitions.list({
        orderBy: { start_date: 'desc' },
        limit: 50
      })
      setCompetitions(competitionsData as Competition[])
    } catch (error) {
      console.error('Error loading competitions:', error)
    }
  }

  const refreshNews = async () => {
    try {
      const newsData = await blink.db.news.list({
        orderBy: { published_at: 'desc' },
        limit: 20
      })
      setNews(newsData as NewsItem[])
    } catch (error) {
      console.error('Error loading news:', error)
    }
  }

  const refreshData = async () => {
    setLoading(true)
    try {
      // Load countries
      const countriesData = await blink.db.countries.list({
        orderBy: { name: 'asc' }
      })
      setCountries(countriesData as Country[])

      // Load sports
      const sportsData = await blink.db.sports.list({
        orderBy: { name: 'asc' }
      })
      setSports(sportsData as Sport[])

      // Load other data
      await Promise.all([
        refreshAthletes(),
        refreshCompetitions(),
        refreshNews()
      ])
    } catch (error) {
      console.error('Error loading game data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      refreshData()
    }
  }, [user])

  return (
    <GameContext.Provider value={{
      athletes,
      competitions,
      news,
      countries,
      sports,
      loading,
      refreshData,
      refreshAthletes,
      refreshCompetitions,
      refreshNews
    }}>
      {children}
    </GameContext.Provider>
  )
}