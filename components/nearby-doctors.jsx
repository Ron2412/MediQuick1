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
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2 font-heading">
          <MapPin className="h-5 w-5 text-emerald-600" />
          Nearby Doctors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="flex gap-4 p-3 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
            >
              <div className="flex-shrink-0">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="h-16 w-16 rounded-full object-cover border-2 border-emerald-100"
                />
              </div>

              <div className="flex-grow">
                <h3 className="text-sm font-medium text-slate-800 font-heading">{doctor.name}</h3>
                <p className="text-xs text-slate-500">{doctor.specialty}</p>

                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-500" />
                    <span className="text-xs text-slate-600">{doctor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-slate-400" />
                    <span className="text-xs text-slate-600">{doctor.patients}+ patients</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <span className="text-xs text-slate-600">{doctor.location}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline" className="text-xs h-8 w-full">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
                <Button size="sm" className="text-xs h-8 w-full bg-emerald-500 hover:bg-emerald-600">
                  Book Now
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full text-xs">
            View All Doctors
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
