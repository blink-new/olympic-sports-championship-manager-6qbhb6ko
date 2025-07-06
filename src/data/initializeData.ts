import { blink } from '../blink/client'
import { countries } from './countries'
import { sports } from './sports'

export const initializeGameData = async () => {
  try {
    // Initialize countries
    console.log('Initializing countries...')
    try {
      const existingCountries = await blink.db.countries.list({ limit: 1 })
      
      if (existingCountries.length === 0) {
        const countryData = countries.map(country => ({
          id: country.code.toLowerCase(),
          name: country.name,
          code: country.code,
          flag: country.flag
        }))
        
        for (const country of countryData) {
          await blink.db.countries.create(country)
        }
        console.log('Countries initialized successfully')
      }
    } catch (error) {
      console.log('Countries table might not exist yet, skipping...', error)
    }

    // Initialize sports
    console.log('Initializing sports...')
    try {
      const existingSports = await blink.db.sports.list({ limit: 1 })
      
      if (existingSports.length === 0) {
        const sportsData = sports.map(sport => ({
          id: sport.id,
          name: sport.name,
          type: sport.type,
          category: sport.category,
          description: sport.description,
          icon: sport.icon
        }))
        
        for (const sport of sportsData) {
          await blink.db.sports.create(sport)
        }
        console.log('Sports initialized successfully')
      }
    } catch (error) {
      console.log('Sports table might not exist yet, skipping...', error)
    }

    // Initialize sample competitions
    console.log('Initializing sample competitions...')
    const existingCompetitions = await blink.db.competitions.list({ limit: 1 })
    
    if (existingCompetitions.length === 0) {
      const sampleCompetitions = [
        {
          id: 'olympic-2024-summer',
          name: 'Paris 2024 Summer Olympics',
          level: 'olympic',
          sport_id: 'athletics',
          season: '2024',
          start_date: '2024-07-26',
          end_date: '2024-08-11',
          host_country_id: 'fr',
          status: 'finished'
        },
        {
          id: 'world-athletics-2024',
          name: 'World Athletics Championships 2024',
          level: 'world',
          sport_id: 'athletics',
          season: '2024',
          start_date: '2024-09-01',
          end_date: '2024-09-15',
          host_country_id: 'us',
          status: 'finished'
        },
        {
          id: 'olympic-2026-winter',
          name: 'Milano Cortina 2026 Winter Olympics',
          level: 'olympic',
          sport_id: 'skiing',
          season: '2026',
          start_date: '2026-02-06',
          end_date: '2026-02-22',
          host_country_id: 'it',
          status: 'upcoming'
        }
      ]
      
      await blink.db.competitions.createMany(sampleCompetitions)
      console.log('Sample competitions initialized successfully')
    }

    // Initialize sample news
    console.log('Initializing sample news...')
    const existingNews = await blink.db.news.list({ limit: 1 })
    
    if (existingNews.length === 0) {
      const sampleNews = [
        {
          id: 'welcome-news',
          title: 'Welcome to Olympic Sports Championship Manager!',
          content: 'Start your journey as a sports manager. Create and develop athletes, compete in championships, and lead your country to Olympic glory!',
          author: 'System',
          published_at: new Date().toISOString(),
          category: 'announcement',
          featured: 1,
          image_url: null
        },
        {
          id: 'olympics-approaching',
          title: 'Next Olympic Games Approaching',
          content: 'The Winter Olympics are coming soon! Make sure your athletes are ready to compete at the highest level.',
          author: 'Olympic Committee',
          published_at: new Date().toISOString(),
          category: 'competition',
          featured: 1,
          image_url: null
        }
      ]
      
      await blink.db.news.createMany(sampleNews)
      console.log('Sample news initialized successfully')
    }

    console.log('Game data initialization complete!')
  } catch (error) {
    console.error('Error initializing game data:', error)
  }
}