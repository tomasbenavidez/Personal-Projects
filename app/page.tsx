"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  Calendar,
  Globe,
  User,
  Video,
  Users,
  DollarSign,
  TrendingUp,
  Lightbulb,
  Share2,
  Mail,
  Sparkles,
  BarChart3,
  Heart,
  Zap,
  History,
  Trophy,
  Clock,
  Star,
} from "lucide-react"

interface FormData {
  goal: string
  duration: string
  category: string
  country: string
  launch_month: string
  owner_experience: string
  video_included: string
  social_media_score: string
  num_backers: string
}

interface PredictionResult {
  predicted_amount: number
  overfunding_percentage: number
  avg_investment_per_backer: number
  investor_type: string
  insights: string[]
  recommendations: string[]
}

const categories = [
  "Tecnología",
  "Juegos",
  "Diseño",
  "Cine y Video",
  "Música",
  "Arte",
  "Comida",
  "Editorial",
  "Moda",
  "Teatro",
  "Cómics",
  "Danza",
  "Fotografía",
]

const countries = [
  "Estados Unidos",
  "Reino Unido",
  "Canadá",
  "Alemania",
  "Francia",
  "Australia",
  "Países Bajos",
  "Suecia",
  "Italia",
  "España",
  "Japón",
  "Argentina",
  "Brasil",
  "México",
]

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

const successfulCampaigns = [
  {
  id: 1,
  name: "GoChess: AI‑Powered Smart Chess Board",
  category: "Tecnología / Juegos",
  country: "Estados Unidos",
  goal: 20000,
  raised: 2083603,
  backers: 5492,
  success_rate: 10416,
  duration: 28,
  year: 2025,
  description: "Tablero de ajedrez automatizado con IA, movimiento de piezas y coaching en tiempo real.",
  image_color: "from-gray-700 to-white",
  highlights: ["2.08 M recaudados", "IA en movimiento automático", "Coaching en vivo"]  
},
  {
  id: 2,
  name: "Aeke K1 Smart Home Gym",
  category: "Tecnología / Fitness",
  country: "Estados Unidos",
  goal: 500000,
  raised: 1300000,
  backers: 600,
  success_rate: 260,
  duration: 30,
  year: 2025,
  description: "Gimnasio doméstico compacto con análisis biométrico AI y planes personalizados.",
  image_color: "from-green-500 to-blue-500",
  highlights: ["1.3 M recaudados", "Análisis biométrico por IA", "Compacto y plegable"]
},
  {
    id: 3,
    name: "Coolest Cooler",
    category: "Diseño",
    country: "Estados Unidos",
    goal: 50000,
    raised: 13285226,
    backers: 62642,
    success_rate: 26570.5,
    duration: 36,
    year: 2014,
    description: "La hielera del siglo XXI que realmente es más “cool”. Incluye una licuadora integrada, parlante Bluetooth, puertos USB para carga, luces LED internas, ruedas todo terreno, abrelatas, tabla de cortar, platos",
    image_color: "from-green-500 to-emerald-500",
    highlights: ["Diseño Multi-Función", "Perfecta para actividades al aire libre", "Integración de Gadgets novedosos"],
  },
  {
  id: 4,
  name: "Curvilux",
  category: "Tecnología / Hogar",
  country: "Argentina",
  goal: 54500,
  raised: 60505,
  backers: 200,
  success_rate: 111,
  duration: 45,
  year: 2024,
  description: "Mesa de luz con carga inalámbrica, puertos USB, iluminación y audio inteligentes.",
  image_color: "from-purple-200 to-pink-300",
  highlights: ["60 505 US$ recaudados", "Carga inalámbrica y audio integrado", "Lanzamiento en NY"]
},
  {
  id: 5,
  name: "GiFlyBike",
  category: "Movilidad / Tecnología",
  country: "Argentina",
  goal: 140000,
  raised: 795944,
  backers: 800,
  success_rate: 569,
  duration: 60,
  year: 2023,
  description: "Primera bici eléctrica argentina plegable en 10 s, con puertos USB, conectividad IA.",
  image_color: "from-red-400 to-black",
  highlights: ["795 944 US$ recaudados", "Plegado en 10 s", "Ventas internacionales"]
},
  {
  id: 6,
  name: "Bricksave",
  category: "Fintech / Inmobiliario",
  country: "Argentina",
  goal: 500000,
  raised: null,
  backers: null,
  success_rate: null,
  duration: null,
  year: 2024,
  description: "Plataforma de crowdfunding inmobiliario que usa IA para detectar oportunidades de inversión.",
  image_color: "from-blue-400 to-teal-500",
  highlights: ["Algoritmo IA analiza 2 M puntos de datos", "Expansión a EE.UU.", "Valoración > US$ 50 M"]
},
]

export default function CrowdfundingSimulator() {
  const [formData, setFormData] = useState<FormData>({
    goal: "",
    duration: "",
    category: "",
    country: "",
    launch_month: "",
    owner_experience: "",
    video_included: "",
    social_media_score: "",
    num_backers: "",
  })

  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const classifyInvestorType = (overfunding: number, avgInvestment: number, numBackers: number): string => {
    if (numBackers <= 50 && avgInvestment >= 100) {
      return "Familia y amigos"
    } else if (overfunding >= 200 && numBackers >= 500) {
      return "Comunidad grande / Influencers"
    } else if (overfunding >= 120 && avgInvestment >= 50) {
      return "Ángeles"
    } else {
      return "Comunidad"
    }
  }

  const generateInsights = (result: PredictionResult): string[] => {
    const insights = []
    const { overfunding_percentage, avg_investment_per_backer, investor_type } = result

    if (avg_investment_per_backer < 25) {
      insights.push("💝 Campaña con fuerte componente emocional - muchos pequeños contribuyentes")
    }

    if (overfunding_percentage > 150) {
      insights.push("🚀 Alto potencial viral - la campaña podría superar significativamente la meta")
    }

    if (investor_type === "Familia y amigos") {
      insights.push("👨‍👩‍👧‍👦 Perfil de red cercana - ideal para primeras campañas o proyectos personales")
    } else if (investor_type === "Comunidad grande / Influencers") {
      insights.push("📱 Campaña con potencial de alcance masivo - aprovecha las redes sociales")
    }

    if (Number.parseInt(formData.social_media_score) > 10000) {
      insights.push("🌟 Gran alcance en redes sociales - aprovecha tu audiencia existente")
    } else if (Number.parseInt(formData.social_media_score) < 1000) {
      insights.push("📱 Considera construir una audiencia más sólida en redes sociales antes del lanzamiento")
    }

    return insights
  }

  const generateRecommendations = (result: PredictionResult): string[] => {
    const recommendations = []
    const { overfunding_percentage, avg_investment_per_backer, investor_type } = result

    if (overfunding_percentage < 100) {
      recommendations.push("📈 Considera ajustar la meta o mejorar la propuesta de valor")
    }

    if (avg_investment_per_backer < 30) {
      recommendations.push("🎁 Agrega recompensas atractivas para incrementar el ticket promedio")
    }

    if (investor_type === "Familia y amigos") {
      recommendations.push("🌐 Expande tu alcance a comunidades más amplias para mayor impacto")
    }

    recommendations.push("📹 El video es clave - asegúrate de tener contenido visual atractivo")

    return recommendations
  }

  const simulatePrediction = async (): Promise<PredictionResult> => {
    // Simulación de llamada a API - reemplazar con endpoint real
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const goal = Number.parseFloat(formData.goal)
    const numBackers = Number.parseInt(formData.num_backers)
    const socialScore = Number.parseInt(formData.social_media_score)
    const hasVideo = formData.video_included === "yes"
    const experience = Number.parseInt(formData.owner_experience)

    // Lógica de predicción simulada
    let baseSuccess = 0.6
    if (hasVideo) baseSuccess += 0.2
    if (socialScore > 10000) baseSuccess += 0.4
    else if (socialScore > 5000) baseSuccess += 0.3
    else if (socialScore > 1000) baseSuccess += 0.2
    else if (socialScore > 500) baseSuccess += 0.1
    if (experience > 2) baseSuccess += 0.15

    const predictedAmount = goal * Math.min(baseSuccess + Math.random() * 0.4, 2.5)
    const overfundingPercentage = (predictedAmount / goal) * 100
    const avgInvestmentPerBacker = predictedAmount / numBackers

    const investorType = classifyInvestorType(overfundingPercentage, avgInvestmentPerBacker, numBackers)

    const result: PredictionResult = {
      predicted_amount: predictedAmount,
      overfunding_percentage: overfundingPercentage,
      avg_investment_per_backer: avgInvestmentPerBacker,
      investor_type: investorType,
      insights: [],
      recommendations: [],
    }

    result.insights = generateInsights(result)
    result.recommendations = generateRecommendations(result)

    return result
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validación básica
      const requiredFields = Object.entries(formData)
      const emptyFields = requiredFields.filter(([_, value]) => !value.trim())

      if (emptyFields.length > 0) {
        throw new Error("Por favor completa todos los campos")
      }

      const result = await simulatePrediction()
      setPrediction(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en la predicción")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      goal: "",
      duration: "",
      category: "",
      country: "",
      launch_month: "",
      owner_experience: "",
      video_included: "",
      social_media_score: "",
      num_backers: "",
    })
    setPrediction(null)
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CrowdSim</h1>
              <p className="text-purple-300 text-sm">Predicción de Éxito en Campañas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="simulator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-800/50 border border-purple-500/20">
            <TabsTrigger
              value="simulator"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-purple-300"
            >
              <Zap className="h-4 w-4 mr-2" />
              Simulador
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-purple-300"
            >
              <History className="h-4 w-4 mr-2" />
              Campañas Exitosas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simulator">
            {/* Introducción */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Simula el éxito de tu campaña de crowdfunding</h2>
              <p className="text-purple-200 max-w-2xl mx-auto">
                Utiliza inteligencia artificial para predecir el rendimiento financiero de tu proyecto. Ingresa los
                datos de tu campaña y descubre insights personalizados sobre tu potencial de recaudación.
              </p>
            </div>

            {/* Todo el contenido del simulador existente va aquí */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Formulario - mantener todo el código existente */}
              <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-400" />
                    Datos de tu campaña
                  </CardTitle>
                  <CardDescription className="text-purple-200">
                    Completa la información para generar tu predicción
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="goal" className="text-white flex items-center gap-2">
                          <Target className="h-4 w-4 text-purple-400" />
                          Meta de recaudación (USD)
                        </Label>
                        <Input
                          id="goal"
                          type="number"
                          placeholder="50000"
                          value={formData.goal}
                          onChange={(e) => handleInputChange("goal", e.target.value)}
                          className="bg-slate-700/50 border-purple-500/30 text-white placeholder:text-purple-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration" className="text-white flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-400" />
                          Duración (días)
                        </Label>
                        <Input
                          id="duration"
                          type="number"
                          placeholder="30"
                          value={formData.duration}
                          onChange={(e) => handleInputChange("duration", e.target.value)}
                          className="bg-slate-700/50 border-purple-500/30 text-white placeholder:text-purple-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Categoría</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                            <SelectValue placeholder="Selecciona categoría" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-purple-500/30">
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat} className="text-white hover:bg-purple-500/20">
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white flex items-center gap-2">
                          <Globe className="h-4 w-4 text-purple-400" />
                          País
                        </Label>
                        <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                          <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                            <SelectValue placeholder="Selecciona país" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-purple-500/30">
                            {countries.map((country) => (
                              <SelectItem key={country} value={country} className="text-white hover:bg-purple-500/20">
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Mes de lanzamiento</Label>
                        <Select
                          value={formData.launch_month}
                          onValueChange={(value) => handleInputChange("launch_month", value)}
                        >
                          <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                            <SelectValue placeholder="Selecciona mes" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-purple-500/30">
                            {months.map((month) => (
                              <SelectItem key={month} value={month} className="text-white hover:bg-purple-500/20">
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience" className="text-white flex items-center gap-2">
                          <User className="h-4 w-4 text-purple-400" />
                          Experiencia del creador (años)
                        </Label>
                        <Input
                          id="experience"
                          type="number"
                          placeholder="2"
                          value={formData.owner_experience}
                          onChange={(e) => handleInputChange("owner_experience", e.target.value)}
                          className="bg-slate-700/50 border-purple-500/30 text-white placeholder:text-purple-300"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white flex items-center gap-2">
                          <Video className="h-4 w-4 text-purple-400" />
                          ¿Incluye video?
                        </Label>
                        <Select
                          value={formData.video_included}
                          onValueChange={(value) => handleInputChange("video_included", value)}
                        >
                          <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                            <SelectValue placeholder="Selecciona opción" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-purple-500/30">
                            <SelectItem value="yes" className="text-white hover:bg-purple-500/20">
                              Sí
                            </SelectItem>
                            <SelectItem value="no" className="text-white hover:bg-purple-500/20">
                              No
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="social" className="text-white flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-400" />
                          Seguidores en redes sociales
                        </Label>
                        <Input
                          id="social"
                          type="number"
                          placeholder="5000"
                          value={formData.social_media_score}
                          onChange={(e) => handleInputChange("social_media_score", e.target.value)}
                          className="bg-slate-700/50 border-purple-500/30 text-white placeholder:text-purple-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="backers" className="text-white flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-400" />
                        Cantidad estimada de backers
                      </Label>
                      <Input
                        id="backers"
                        type="number"
                        placeholder="200"
                        value={formData.num_backers}
                        onChange={(e) => handleInputChange("num_backers", e.target.value)}
                        className="bg-slate-700/50 border-purple-500/30 text-white placeholder:text-purple-300"
                      />
                    </div>

                    {error && (
                      <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <p className="text-red-300 text-sm">{error}</p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-semibold"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Analizando...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Generar Predicción
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 bg-transparent"
                      >
                        Limpiar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Resultados - mantener todo el código existente */}
              {prediction && (
                <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      Predicción de tu campaña
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      Resultados basados en inteligencia artificial
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Métricas principales */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-green-400" />
                          <span className="text-green-300 text-sm font-medium">Recaudación predicha</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                          ${prediction.predicted_amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                        </p>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-purple-400" />
                          <span className="text-purple-300 text-sm font-medium">Sobrefinanciación</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{prediction.overfunding_percentage.toFixed(1)}%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-cyan-400" />
                          <span className="text-cyan-300 text-sm font-medium">Inversión promedio</span>
                        </div>
                        <p className="text-2xl font-bold text-white">
                          ${prediction.avg_investment_per_backer.toFixed(0)}
                        </p>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="h-4 w-4 text-orange-400" />
                          <span className="text-orange-300 text-sm font-medium">Tipo de inversor</span>
                        </div>
                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                          {prediction.investor_type}
                        </Badge>
                      </div>
                    </div>

                    <Separator className="bg-purple-500/20" />

                    {/* Insights */}
                    <div className="space-y-3">
                      <h3 className="text-white font-semibold flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-400" />
                        Insights personalizados
                      </h3>
                      <div className="space-y-2">
                        {prediction.insights.map((insight, index) => (
                          <div key={index} className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <p className="text-yellow-200 text-sm">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recomendaciones */}
                    <div className="space-y-3">
                      <h3 className="text-white font-semibold flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-400" />
                        Recomendaciones
                      </h3>
                      <div className="space-y-2">
                        {prediction.recommendations.map((rec, index) => (
                          <div key={index} className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <p className="text-blue-200 text-sm">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Botón compartir */}
                    <Button
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: "Mi predicción de crowdfunding",
                            text: `Mi campaña podría recaudar $${prediction.predicted_amount.toLocaleString()} con ${prediction.overfunding_percentage.toFixed(1)}% de sobrefinanciación`,
                            url: window.location.href,
                          })
                        }
                      }}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartir resultados
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history">
            {/* Header de la sección de historial */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Trophy className="h-8 w-8 text-yellow-400" />
                Campañas Legendarias de Crowdfunding
              </h2>
              <p className="text-purple-200 max-w-2xl mx-auto">
                Explora las campañas más exitosas de la historia del crowdfunding. Aprende de los mejores y descubre qué
                las hizo tan especiales.
              </p>
            </div>

            {/* Grid de campañas */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successfulCampaigns.map((campaign) => (
                <Card
                  key={campaign.id}
                  className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className="pb-3">
                    <div
                      className={`w-full h-32 bg-gradient-to-r ${campaign.image_color} rounded-lg mb-4 flex items-center justify-center`}
                    >
                      <Sparkles className="h-12 w-12 text-white opacity-80" />
                    </div>
                    <CardTitle className="text-white text-lg">{campaign.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                        {campaign.category}
                      </Badge>
                      <Badge variant="outline" className="border-cyan-500/30 text-cyan-300">
                        {campaign.year}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-purple-200 text-sm">{campaign.description}</p>

                    {/* Métricas principales */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-center gap-1 mb-1">
                          <Target className="h-3 w-3 text-green-400" />
                          <span className="text-green-300 text-xs">Meta</span>
                        </div>
                        <p className="text-white font-semibold text-sm">${campaign.goal.toLocaleString()}</p>
                      </div>

                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <div className="flex items-center gap-1 mb-1">
                          <DollarSign className="h-3 w-3 text-purple-400" />
                          <span className="text-purple-300 text-xs">Recaudado</span>
                        </div>
                        <p className="text-white font-semibold text-sm">${campaign.raised.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                        <div className="flex items-center gap-1 mb-1">
                          <Users className="h-3 w-3 text-cyan-400" />
                          <span className="text-cyan-300 text-xs">Backers</span>
                        </div>
                        <p className="text-white font-semibold text-sm">{campaign.backers.toLocaleString()}</p>
                      </div>

                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <div className="flex items-center gap-1 mb-1">
                          <TrendingUp className="h-3 w-3 text-yellow-400" />
                          <span className="text-yellow-300 text-xs">Éxito</span>
                        </div>
                        <p className="text-white font-semibold text-sm">
                          {campaign.success_rate > 1000
                            ? `${(campaign.success_rate / 100).toFixed(0)}x`
                            : `${campaign.success_rate.toFixed(0)}%`}
                        </p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <h4 className="text-white text-sm font-medium flex items-center gap-2">
                        <Star className="h-3 w-3 text-yellow-400" />
                        Factores de éxito
                      </h4>
                      <div className="space-y-1">
                        {campaign.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                            <span className="text-purple-200 text-xs">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Información adicional */}
                    <div className="flex items-center justify-between text-xs text-purple-300 pt-2 border-t border-purple-500/20">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{campaign.duration} días</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        <span>{campaign.country}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Estadísticas generales */}
            <div className="mt-12 grid md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">$51M+</p>
                  <p className="text-green-300 text-sm">Total recaudado</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">395K+</p>
                  <p className="text-purple-300 text-sm">Total backers</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">15,847%</p>
                  <p className="text-cyan-300 text-sm">Éxito promedio</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30">
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">6</p>
                  <p className="text-yellow-300 text-sm">Campañas legendarias</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center space-y-4">
        <Separator className="bg-purple-500/20" />
        <div className="pt-8">
          <p className="text-purple-200 mb-2">Proyecto desarrollado por</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple-400" />
              <span>Tomás A. Benavidez</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple-400" />
              <span>Joaquín Szterensus</span>
            </div>
          </div>
          <p className="text-purple-300 text-sm mt-4">
            Simulador de campañas de crowdfunding con inteligencia artificial
          </p>
        </div>
      </div>
    </div>
  )
}
