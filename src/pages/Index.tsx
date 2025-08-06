import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Icon from "@/components/ui/icon"

interface Task {
  id: number
  question: string
  answer: string
  subject: string
  topic: string
  explanation: string
}

const sampleTasks: Task[] = [
  {
    id: 1,
    question: "Решите уравнение: 2x + 5 = 13",
    answer: "4",
    subject: "Математика",
    topic: "Линейные уравнения",
    explanation: "Вычитаем 5 из обеих частей: 2x = 8. Делим на 2: x = 4"
  },
  {
    id: 2,
    question: "Найдите корень слова 'подземный'",
    answer: "зем",
    subject: "Русский язык",
    topic: "Морфология",
    explanation: "Корень 'зем' - основная часть слова, означающая землю"
  },
  {
    id: 3,
    question: "Чему равна скорость света в вакууме? (в км/с)",
    answer: "300000",
    subject: "Физика", 
    topic: "Оптика",
    explanation: "Скорость света в вакууме составляет примерно 300 000 км/с или 3×10⁸ м/с"
  }
]

const subjects = [
  {
    name: "Математика",
    icon: "Calculator",
    color: "bg-blue-500",
    image: "/img/27d77fe5-e820-4bb2-ac0d-b1ef0ec22fe1.jpg",
    description: "Алгебра, геометрия, математический анализ",
    tasksCount: 245
  },
  {
    name: "Русский язык", 
    icon: "BookOpen",
    color: "bg-red-500",
    image: "/img/5f7a2c94-a3b0-4b91-afa4-320a37a8d509.jpg",
    description: "Орфография, пунктуация, синтаксис",
    tasksCount: 156
  },
  {
    name: "Физика",
    icon: "Zap",
    color: "bg-purple-500", 
    image: "/img/ea0d8c66-d86b-4ac0-b64e-594a77f1bd45.jpg",
    description: "Механика, термодинамика, электричество",
    tasksCount: 189
  }
]

export default function Index() {
  const [userAnswers, setUserAnswers] = useState<{[key: number]: string}>({})
  const [checkedAnswers, setCheckedAnswers] = useState<{[key: number]: boolean | null}>({})
  const [showExplanations, setShowExplanations] = useState<{[key: number]: boolean}>({})
  const [completedTasks, setCompletedTasks] = useState(0)

  const handleAnswerChange = (taskId: number, value: string) => {
    setUserAnswers(prev => ({...prev, [taskId]: value}))
  }

  const checkAnswer = (taskId: number) => {
    const task = sampleTasks.find(t => t.id === taskId)
    const userAnswer = userAnswers[taskId]?.toLowerCase().trim()
    const correctAnswer = task?.answer.toLowerCase().trim()
    const isCorrect = userAnswer === correctAnswer
    
    setCheckedAnswers(prev => ({...prev, [taskId]: isCorrect}))
    setShowExplanations(prev => ({...prev, [taskId]: true}))
    
    if (isCorrect && checkedAnswers[taskId] !== true) {
      setCompletedTasks(prev => prev + 1)
    }
  }

  const progress = (completedTasks / sampleTasks.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Экзамен.ру</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Прогресс: {Math.round(progress)}%
              </Badge>
              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Подготовка к экзаменам
              <span className="block gradient-bg bg-clip-text text-transparent mt-2">
                стала проще
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Интерактивные задачи, подробная теория и персональная статистика для успешной подготовки к ЕГЭ и ОГЭ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="gradient-bg hover:opacity-90">
                <Icon name="Play" size={20} className="mr-2" />
                Начать обучение
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="BookOpen" size={20} className="mr-2" />
                Посмотреть теорию
              </Button>
            </div>
          </div>

          {/* Progress Section */}
          <Card className="max-w-md mx-auto animate-scale-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Ваш прогресс сегодня</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Progress value={progress} className="h-3" />
                <p className="text-sm text-gray-600">
                  Решено {completedTasks} из {sampleTasks.length} задач
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-16">
        <Tabs defaultValue="tasks" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Icon name="CheckSquare" size={16} />
              Задачи
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center gap-2">
              <Icon name="BookOpen" size={16} />
              Предметы
            </TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Интерактивные задачи</h2>
              <p className="text-gray-600">Проверьте свои знания и получите мгновенную обратную связь</p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {sampleTasks.map((task) => (
                <Card key={task.id} className="hover-scale border-2 hover:border-blue-200 transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="w-fit">
                        {task.subject}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {task.topic}
                      </Badge>
                    </div>
                    <CardTitle className="text-left">{task.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <Input
                        placeholder="Введите ваш ответ..."
                        value={userAnswers[task.id] || ''}
                        onChange={(e) => handleAnswerChange(task.id, e.target.value)}
                        className={`flex-1 ${
                          checkedAnswers[task.id] === true ? 'border-green-500 bg-green-50' :
                          checkedAnswers[task.id] === false ? 'border-red-500 bg-red-50' : ''
                        }`}
                      />
                      <Button 
                        onClick={() => checkAnswer(task.id)}
                        disabled={!userAnswers[task.id]?.trim()}
                        className={`${
                          checkedAnswers[task.id] === true ? 'bg-green-600 hover:bg-green-700' :
                          checkedAnswers[task.id] === false ? 'bg-red-600 hover:bg-red-700' : 
                          'gradient-bg hover:opacity-90'
                        }`}
                      >
                        {checkedAnswers[task.id] === true ? (
                          <Icon name="Check" size={16} />
                        ) : checkedAnswers[task.id] === false ? (
                          <Icon name="X" size={16} />
                        ) : (
                          <Icon name="ArrowRight" size={16} />
                        )}
                      </Button>
                    </div>

                    {showExplanations[task.id] && (
                      <div className={`p-4 rounded-lg animate-fade-in ${
                        checkedAnswers[task.id] ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className="flex items-start gap-3">
                          <Icon 
                            name={checkedAnswers[task.id] ? "CheckCircle" : "AlertCircle"} 
                            size={20}
                            className={checkedAnswers[task.id] ? "text-green-600" : "text-red-600"}
                          />
                          <div className="flex-1">
                            <p className={`font-medium mb-2 ${
                              checkedAnswers[task.id] ? 'text-green-800' : 'text-red-800'
                            }`}>
                              {checkedAnswers[task.id] ? 'Правильно!' : 'Неверно'}
                            </p>
                            <p className="text-sm text-gray-700">
                              <strong>Правильный ответ:</strong> {task.answer}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {task.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subjects Tab */}
          <TabsContent value="subjects" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Предметы</h2>
              <p className="text-gray-600">Изучайте теорию и решайте задачи по разным предметам</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject, index) => (
                <Card key={subject.name} className="hover-scale overflow-hidden group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={subject.image} 
                      alt={subject.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className={`absolute top-4 left-4 w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center`}>
                      <Icon name={subject.icon} size={24} className="text-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{subject.name}</CardTitle>
                      <Badge className="gradient-bg text-white">
                        {subject.tasksCount}
                      </Badge>
                    </div>
                    <CardDescription className="text-left">
                      {subject.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button className="flex-1 gradient-bg hover:opacity-90">
                        <Icon name="Play" size={16} className="mr-2" />
                        Задачи
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Icon name="BookOpen" size={16} className="mr-2" />
                        Теория  
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Экзамен.ру</h3>
              </div>
              <p className="text-gray-400">
                Современная платформа для подготовки к экзаменам с интерактивными задачами и персональной аналитикой.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Предметы</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Математика</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Русский язык</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Физика</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Химия</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Обратная связь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}