import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { blink } from '../blink/client'
import { User } from '../types/game'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const login = () => {
    blink.auth.login()
  }

  const logout = () => {
    blink.auth.logout()
  }

  const initializeUser = async (authUser: { id: string; email?: string }) => {
    try {
      // Try to get existing user profile
      const existingUsers = await blink.db.users.list({ 
        where: { id: authUser.id }, 
        limit: 1 
      })

      if (existingUsers.length > 0) {
        setUser(existingUsers[0] as User)
      } else {
        // Create new user profile
        const newUser = {
          id: authUser.id,
          email: authUser.email || '',
          display_name: authUser.email?.split('@')[0] || 'Player',
          country_id: '',
          created_at: new Date().toISOString(),
          level: 1,
          experience: 0,
          reputation: 0,
          hosting_rights: JSON.stringify([])
        }

        await blink.db.users.create(newUser)
        setUser(newUser as User)
      }
    } catch (error) {
      console.error('Error initializing user:', error)
    }
  }

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged(async (authState) => {
      if (authState.user) {
        await initializeUser(authState.user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}