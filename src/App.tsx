import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import { AuthProvider } from './context/AuthContext'
import { LoadingScreen } from './components/LoadingScreen'
import { WelcomePage } from './pages/WelcomePage'
import { DashboardPage } from './pages/DashboardPage'
import { AthleteManagementPage } from './pages/AthleteManagementPage'
import { CompetitionsPage } from './pages/CompetitionsPage'
import { LeaderboardsPage } from './pages/LeaderboardsPage'
import { NewsPage } from './pages/NewsPage'
import { ProfilePage } from './pages/ProfilePage'
import { useAuth } from './context/AuthContext'
import './App.css'
import { Toaster } from 'react-hot-toast'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <WelcomePage />} />
        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/" />} />
        <Route path="/athletes" element={user ? <AthleteManagementPage /> : <Navigate to="/" />} />
        <Route path="/competitions" element={user ? <CompetitionsPage /> : <Navigate to="/" />} />
        <Route path="/leaderboards" element={user ? <LeaderboardsPage /> : <Navigate to="/" />} />
        <Route path="/news" element={user ? <NewsPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <GameProvider>
          <AppContent />
          <Toaster position="top-right" />
        </GameProvider>
      </AuthProvider>
    </Router>
  )
}

export default App