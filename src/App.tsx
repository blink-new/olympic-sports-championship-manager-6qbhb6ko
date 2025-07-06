import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGame } from './context/GameContext'
import { ThemeProvider } from './components/theme-provider'

function App() {
  const navigate = useNavigate()
  const { loading, refreshData } = useGame()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      // Temporarily bypass authentication for development
      setAuthChecked(true)
      navigate('/dashboard')

      // Original authentication logic (commented out)
      // const authUser = await blink.auth.me()
      // if (authUser) {
      //   await refreshData()
      //   navigate('/dashboard')
      // } else {
      //   navigate('/')
      // }
      // setAuthChecked(true)
    }

    checkAuth()
  }, [navigate, refreshData])

  if (!authChecked || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <div className="text-2xl font-bold text-gray-700">Зареждане...</div>
      </div>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Outlet />
    </ThemeProvider>
  )
}

export default App