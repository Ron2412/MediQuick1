import { Button } from "@/components/ui/button"

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Describe Your Symptoms",
      description:
        "Tell our AI chatbot about your symptoms in simple, everyday language. The more details you provide, the more accurate our analysis will be.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      number: "02",
      title: "Get AI Analysis",
      description:
        "Our advanced AI analyzes your symptoms against a vast database of medical knowledge to provide personalized health recommendations.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      number: "03",
      title: "Receive Triage Results",
      description:
        "Based on your symptoms, you'll receive a clear recommendation: self-care at home, visit a clinic, or seek emergency care.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      number: "04",
      title: "Connect with Healthcare",
      description:
        "If needed, find and connect with nearby healthcare providers who specialize in your specific condition.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-emerald-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 font-heading mb-4">How MediQuick Works</h2>
          <p className="text-lg text-slate-600 max-w-[800px] mx-auto">
            Get reliable health guidance in just a few simple steps
          </p>
        </div>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className={`order-2 ${index % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <img src={step.image || "/placeholder.svg"} alt={step.title} className="w-full h-auto rounded-lg" />
                </div>
              </div>

              <div className={`order-1 ${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
                <div className="flex flex-col gap-4">
                  <div className="text-5xl font-bold text-emerald-200 font-heading">{step.number}</div>
                  <h3 className="text-2xl font-bold text-slate-800 font-heading">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-emerald-500 hover:bg-emerald-600 h-12 px-8">Try It Now</Button>
        </div>
      </div>
    </section>
  )
}
