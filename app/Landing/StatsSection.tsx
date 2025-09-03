"use client"

export default function StatsSection() {
  const stats = [
    { value: "$2.4B+", label: "Properties Analyzed" },
    { value: "94%", label: "Prediction Accuracy" },
    { value: "15,000+", label: "Active Investors" },
    { value: "$180M", label: "Returns Generated" },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <p className="text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
