import { Star } from "lucide-react"

export function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "MediQuick helped me understand my symptoms when I was feeling anxious about my health. The app recommended I visit a clinic, which turned out to be the right call.",
      author: "Sarah T.",
      role: "Teacher",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "As someone who travels frequently, having MediQuick gives me peace of mind. I used it when I had a fever abroad, and it helped me decide whether I needed to find a doctor.",
      author: "Michael R.",
      role: "Business Consultant",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "The symptom analyzer is incredibly intuitive. It asked relevant follow-up questions and gave me practical advice for managing my chronic condition.",
      author: "Jennifer L.",
      role: "Software Engineer",
      rating: 4,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 font-heading mb-4">What Our Users Say</h2>
          <p className="text-lg text-slate-600 max-w-[800px] mx-auto">
            Thousands of people trust MediQuick for their health guidance needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-slate-200" />
                ))}
              </div>

              <blockquote className="text-slate-600 mb-6">"{testimonial.quote}"</blockquote>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-slate-800">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-emerald-50 rounded-2xl p-8 text-center">
          <div className="text-2xl font-bold text-slate-800 font-heading mb-4">Trusted by Healthcare Professionals</div>
          <p className="text-slate-600 mb-8 max-w-[800px] mx-auto">
            MediQuick's recommendations are developed in collaboration with medical experts and regularly updated based
            on the latest clinical guidelines.
          </p>

          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="bg-white p-4 rounded-lg">
              <img src="/placeholder.svg?height=40&width=120" alt="Medical Association" className="h-8" />
            </div>
            <div className="bg-white p-4 rounded-lg">
              <img src="/placeholder.svg?height=40&width=120" alt="Health Institute" className="h-8" />
            </div>
            <div className="bg-white p-4 rounded-lg">
              <img src="/placeholder.svg?height=40&width=120" alt="Research Center" className="h-8" />
            </div>
            <div className="bg-white p-4 rounded-lg">
              <img src="/placeholder.svg?height=40&width=120" alt="Medical School" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
