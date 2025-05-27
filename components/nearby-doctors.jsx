import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NearbyDoctors() {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "General Practitioner",
      location: "HealthFirst Clinic, 2.3 miles away",
      rating: 4.8,
      patients: 1200,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Internal Medicine",
      location: "City Medical Center, 3.1 miles away",
      rating: 4.7,
      patients: 950,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Family Medicine",
      location: "Wellness Medical Group, 1.8 miles away",
      rating: 4.9,
      patients: 1450,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section className="w-full bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg p-6 md:p-8 mb-2 transition-all duration-300 border border-white/20">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-5 w-5 text-emerald-600" />
        <h2 className="text-lg md:text-xl font-bold text-[#0d181b] font-heading tracking-tight">Nearby Doctors</h2>
      </div>
      <div className="flex flex-col gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-stretch bg-white/30 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-md"
          >
            <div className="flex-shrink-0">
              <img
                src={doctor.image || "/placeholder.svg"}
                alt={doctor.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-emerald-100 shadow-md"
              />
            </div>

            <div className="flex-grow flex flex-col justify-center">
              <h3 className="text-base font-semibold text-slate-800 font-heading mb-1">{doctor.name}</h3>
              <p className="text-xs text-slate-500 mb-1">{doctor.specialty}</p>
              <div className="flex items-center gap-4 mb-1">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-500" />
                  <span className="text-xs text-slate-600">{doctor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-slate-400" />
                  <span className="text-xs text-slate-600">{doctor.patients}+ patients</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-600">{doctor.location}</span>
              </div>
            </div>
            <div className="flex flex-row md:flex-col gap-2 md:justify-center md:items-end mt-2 md:mt-0">
              <Button size="sm" variant="outline" className="text-xs h-8 w-full md:w-auto px-4">
                <Phone className="h-3 w-3 mr-1" />
                Call
              </Button>
              <Button size="sm" className="text-xs h-8 w-full md:w-auto px-4 bg-emerald-500 hover:bg-emerald-600">
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Button variant="outline" className="text-xs px-6 py-2 rounded-xl bg-white/40 hover:bg-white/60 transition-all duration-200 shadow-sm">
          View All Doctors
        </Button>
      </div>
    </section>
  )
}
