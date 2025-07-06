export interface Country {
  id: string
  name: string
  flag: string
  code: string
}

export interface Sport {
  id: string
  name: string
  type: 'summer' | 'winter'
  category: string
  description: string
  icon: string
}

export interface Athlete {
  id: string
  name: string
  age: number
  sport_id: string
  country_id: string
  user_id: string
  level: AthleteLevel
  experience: number
  stamina: number
  strength: number
  speed: number
  technique: number
  mental: number
  created_at: string
  biography?: string
  achievements: Achievement[]
}

export type AthleteLevel = 'amateur' | 'advanced' | 'professional' | 'olympian' | 'titan'

export interface Achievement {
  id: string
  title: string
  description: string
  type: 'medal' | 'record' | 'title'
  competition_level: CompetitionLevel
  date: string
  medal_type?: 'gold' | 'silver' | 'bronze'
}

export type CompetitionLevel = 'regional' | 'continental' | 'world' | 'olympic'

export interface Competition {
  id: string
  name: string
  level: CompetitionLevel
  sport_id: string
  season: string
  start_date: string
  end_date: string
  host_country_id: string
  status: 'upcoming' | 'ongoing' | 'finished'
  participants: string[]
  results?: CompetitionResult[]
}

export interface CompetitionResult {
  athlete_id: string
  position: number
  score: number
  medal?: 'gold' | 'silver' | 'bronze'
  time?: string
  notes?: string
}

export interface User {
  id: string
  email: string
  display_name: string
  country_id: string
  created_at: string
  level: number
  experience: number
  reputation: number
  hosting_rights: string[]
}

export interface NewsItem {
  id: string
  title: string
  content: string
  author: string
  published_at: string
  category: 'achievement' | 'competition' | 'announcement' | 'record'
  featured: boolean
  image_url?: string
}

export interface MedalCount {
  country_id: string
  gold: number
  silver: number
  bronze: number
  total: number
}

export interface Training {
  id: string
  athlete_id: string
  type: 'stamina' | 'strength' | 'speed' | 'technique' | 'mental'
  duration: number
  intensity: number
  cost: number
  date: string
  result: number
}