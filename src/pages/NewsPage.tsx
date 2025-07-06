import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Newspaper, Calendar, User, Star } from 'lucide-react'
import { Navigation } from '../components/Navigation'
import { useGame } from '../context/GameContext'

export const NewsPage = () => {
  const { news } = useGame()

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'achievement': return 'bg-green-100 text-green-800'
      case 'competition': return 'bg-blue-100 text-blue-800'
      case 'announcement': return 'bg-purple-100 text-purple-800'
      case 'record': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'achievement': return 'Постижение'
      case 'competition': return 'Състезание'
      case 'announcement': return 'Обявление'
      case 'record': return 'Рекорд'
      default: return 'Общо'
    }
  }

  const featuredNews = news.filter(article => Number(article.featured) > 0)
  const regularNews = news.filter(article => Number(article.featured) === 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Новини
          </h1>
          <p className="text-xl text-gray-600">
            Най-актуалните новини от спортния свят
          </p>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-600" />
              Главни новини
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredNews.map((article) => (
                <Card key={article.id} className="border-yellow-200 bg-yellow-50 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-xl leading-tight">{article.title}</CardTitle>
                      <Badge className={getCategoryColor(article.category)}>
                        {getCategoryText(article.category)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 leading-relaxed">{article.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.published_at).toLocaleDateString('bg-BG')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular News */}
        {regularNews.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Всички новини
            </h2>
            <div className="space-y-6">
              {regularNews.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <Badge className={getCategoryColor(article.category)}>
                        {getCategoryText(article.category)}
                      </Badge>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {article.content}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.published_at).toLocaleDateString('bg-BG')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {news.length === 0 && (
          <Card className="text-center py-16">
            <CardContent>
              <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Няма новини в момента
              </h3>
              <p className="text-gray-600">
                Новините ще бъдат добавени скоро
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}