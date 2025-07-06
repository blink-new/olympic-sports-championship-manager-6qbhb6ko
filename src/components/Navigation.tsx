import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Trophy, Users, Medal, Newspaper, User, LogOut, Home } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export const Navigation = () => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const navigationItems = [
    { to: '/dashboard', icon: Home, label: 'Начало' },
    { to: '/athletes', icon: Users, label: 'Атлети' },
    { to: '/competitions', icon: Trophy, label: 'Състезания' },
    { to: '/leaderboards', icon: Medal, label: 'Класации' },
    { to: '/news', icon: Newspaper, label: 'Новини' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <span className="hidden md:block">Olympic Manager</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.to)
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {user?.display_name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium text-sm">{user?.display_name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="w-4 h-4" />
                  Профил
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="flex items-center gap-2 cursor-pointer">
                <LogOut className="w-4 h-4" />
                Излизане
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  isActive(item.to)
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}