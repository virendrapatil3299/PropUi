"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Brain, Building2, TrendingUp, Target } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI Valuation",
      description:
        "Get accurate property valuations using advanced machine learning models trained on millions of transactions.",
      color: "from-purple-500 to-purple-600",
      delay: "0s",
    },
    {
      icon: Building2,
      title: "3D Visualization",
      description:
        "Explore properties in immersive 3D environments with detailed architectural analysis and virtual tours.",
      color: "from-blue-500 to-blue-600",
      delay: "0.2s",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description:
        "Access real-time market trends, neighborhood analytics, and predictive forecasting for informed decisions.",
      color: "from-green-500 to-green-600",
      delay: "0.4s",
    },
    {
      icon: Target,
      title: "Investment Strategy",
      description:
        "Optimize your portfolio with AI-driven investment recommendations and risk assessment tools.",
      color: "from-orange-500 to-orange-600",
      delay: "0.6s",
    },
  ]

  return (
    <section id="features" className="py-20 premium-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-balance text-gradient">
            Powered by Advanced AI Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Our machine learning algorithms analyze millions of data points to provide you with unparalleled market
            insights and investment opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center glass-card hover-lift animate-scale-in border-0 shadow-xl"
              style={{ animationDelay: feature.delay }}
            >
              <CardContent className="pt-8">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
