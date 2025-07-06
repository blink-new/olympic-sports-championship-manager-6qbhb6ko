import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Newspaper, Home, Calendar, User, Trophy, Medal, TrendingUp, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const NewsPage = () => {
  const mockNews = [
    {
      id: 1,
      title: "Нов световен рекорд в плуването!",
      content: "Атлетът John Smith постави нов световен рекорд в дисциплината 100м свободен стил с време 46.86 секунди. Това е изключително постижение, което ще остане в историята на спорта.",
      author: "Спортен репортер",
      published_at: "2024-01-20T10:30:00Z",
      category: "record",
      featured: true,
      image_url: "/api/placeholder/400/200"
    },
    {
      id: 2,
      title: "България спечели 3 медала на Европейското първенство",
      content: "Българските атлети се представиха отлично на Европейското първенство по атлетика, спечелвайки общо 3 медала - 1 златен, 1 сребърен и 1 бронзов. Поздравления за всички участници!",
      author: "БНР Спорт",
      published_at: "2024-01-19T15:45:00Z",
      category: "achievement",
      featured: true
    },
    {
      id: 3,
      title: "Предстоящи състезания през март",
      content: "Приближават се няколко важни състезания през месец март. Всички атлети, достигнали необходимото ниво, могат да се регистрират за участие до края на февруари.",
      author: "Организационен комитет",
      published_at: "2024-01-18T09:15:00Z",
      category: "announcement",
      featured: false
    },
    {
      id: 4,
      title: "Нови правила за олимпийските квалификации",
      content: "Международният олимпийски комитет обяви нови правила за квалификации за предстоящите Олимпийски игри. Всички атлети трябва да се запознаят с новите изисквания.",
      author: "МОК",
      published_at: "2024-01-17T14:20:00Z",
      category: "announcement",
      featured: false
    },
    {
      id: 5,
      title: "Интервю с шампиона Maria Garcia",
      content: "Ексклузивно интервю с олимпийската шампионка Maria Garcia, която сподели своите тайни за успеха и планове за бъдещето в спорта.",
      author: "Спортен журналист",
      published_at: "2024-01-16T11:00:00Z",
      category: "achievement",
      featured: false
    }
  ]

  const categoryColors = {
    achievement: 'bg-green-100 text-green-800',
    competition: 'bg-blue-100 text-blue-800',
    announcement: 'bg-amber-100 text-amber-800',
    record: 'bg-purple-100 text-purple-800'
  }

  const categoryIcons = {
    achievement: <Trophy className="h-4 w-4" />,
    competition: <Medal className="h-4 w-4" />,
    announcement: <AlertCircle className="h-4 w-4" />,
    record: <TrendingUp className="h-4 w-4" />
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80">
                <Home className="h-6 w-6 text-blue-600" />
                <span className="text-blue-600">Начало</span>
              </Link>
              <div className="flex items-center gap-2">
                <Newspaper className="h-8 w-8 text-blue-500" />
                <h1 className="text-2xl font-bold">Новини и събития</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {mockNews.length} статии
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured News */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-amber-500" />
                Актуални новини
              </h2>
              {mockNews.filter(news => news.featured).map((news) => (
                <Card key={news.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={categoryColors[news.category as keyof typeof categoryColors]}>
                            {categoryIcons[news.category as keyof typeof categoryIcons]}
                            <span className="ml-1 capitalize">{news.category}</span>
                          </Badge>
                          {news.featured && (
                            <Badge variant="default" className="bg-red-100 text-red-800">
                              Важно
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-bold text-xl mb-2">{news.title}</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed">{news.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{news.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(news.published_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Regular News */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-blue-500" />
                Всички новини
              </h2>
              {mockNews.filter(news => !news.featured).map((news) => (
                <Card key={news.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={categoryColors[news.category as keyof typeof categoryColors]} variant="secondary">
                            {categoryIcons[news.category as keyof typeof categoryIcons]}
                            <span className="ml-1 capitalize">{news.category}</span>
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{news.title}</h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">{news.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{news.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(news.published_at)}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Прочети повече
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  Категории
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Trophy className="h-4 w-4 mr-2" />
                    Постижения
                    <Badge variant="secondary" className="ml-auto">2</Badge>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Medal className="h-4 w-4 mr-2" />
                    Състезания
                    <Badge variant="secondary" className="ml-auto">0</Badge>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Обяви
                    <Badge variant="secondary" className="ml-auto">2</Badge>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Рекорди
                    <Badge variant="secondary" className="ml-auto">1</Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Статистики
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <div className="text-sm text-gray-500">Общо новини</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">23</div>
                    <div className="text-sm text-gray-500">Тази седмица</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">8</div>
                    <div className="text-sm text-gray-500">Важни новини</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Archive */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  Архив
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Януари 2024
                  <Badge variant="secondary" className="ml-auto">15</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Декември 2023
                  <Badge variant="secondary" className="ml-auto">12</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Ноември 2023
                  <Badge variant="secondary" className="ml-auto">18</Badge>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsPage