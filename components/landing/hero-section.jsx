import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Download } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-800 font-heading">
                AI-Powered Health Assistance in Your Pocket
              </h1>
              <p className="mt-4 text-lg text-slate-600 max-w-[600px]">
                MediQuick analyzes your symptoms, provides personalized health recommendations, and connects you with
                healthcare professionals when needed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button className="bg-emerald-500 hover:bg-emerald-600 h-12 px-6">
                <Download className="mr-2 h-4 w-4" />
                Download App
              </Button>
              <Button variant="outline" className="h-12 px-6">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <div className="text-sm text-slate-600 font-medium">Trusted by thousands of users</div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-slate-600">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-slate-600">Medically Reviewed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-slate-600">24/7 Availability</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto md:ml-auto">
            <div className="relative w-full max-w-[400px] rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="/placeholder.svg?height=600&width=300"
                alt="MediQuick App Interface"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-xs font-medium text-slate-800">Self Care Recommended</span>
              </div>
              <p className="text-xs text-slate-600">Your symptoms suggest rest and hydration. Monitor for 24 hours.</p>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <span className="text-xs font-medium text-slate-800">Clinic Visit Advised</span>
              </div>
              <p className="text-xs text-slate-600">Consider scheduling an appointment within 48 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
