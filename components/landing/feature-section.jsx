import { Bot, Activity, MapPin, Shield, Clock, BarChart4 } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: Bot,
      title: "AI Symptom Analysis",
      description:
        "Our advanced AI analyzes your symptoms and provides personalized health recommendations based on medical guidelines.",
    },
    {
      icon: Activity,
      title: "Smart Triage System",
      description:
        "Get clear guidance on whether your symptoms require self-care, a clinic visit, or emergency attention.",
    },
    {
      icon: MapPin,
      title: "Find Nearby Doctors",
      description: "Quickly locate and connect with healthcare providers in your area based on your specific needs.",
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description: "Your health data is encrypted and protected with enterprise-grade security and HIPAA compliance.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access health guidance anytime, anywhere, without waiting for appointments or office hours.",
    },
    {
      icon: BarChart4,
      title: "Health Tracking",
      description: "Monitor your symptoms and health metrics over time to identify patterns and improvements.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 font-heading mb-4">
            Comprehensive Health Features
          </h2>
          <p className="text-lg text-slate-600 max-w-[800px] mx-auto">
            MediQuick combines AI technology with medical expertise to provide you with reliable health guidance and
            support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-medium text-slate-800 font-heading mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
