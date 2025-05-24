import { Button } from "@/components/ui/button"
import { ArrowRight, Apple, Smartphone } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-20 bg-emerald-600 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-heading mb-4">Take Control of Your Health Today</h2>
            <p className="text-emerald-50 mb-8 text-lg">
              Download the MediQuick app and get instant access to AI-powered health guidance, personalized
              recommendations, and peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50 h-12 px-6">
                <Apple className="mr-2 h-5 w-5" />
                App Store
              </Button>
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50 h-12 px-6">
                <Smartphone className="mr-2 h-5 w-5" />
                Google Play
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-2">
              <div className="text-sm text-emerald-50">Already have an account?</div>
              <a href="#" className="text-sm font-medium text-white hover:underline flex items-center">
                Sign in
                <ArrowRight className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto">
            <div className="relative bg-emerald-500 rounded-2xl p-8 max-w-[400px]">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-500 p-2 rounded-md">
                    <Smartphone className="h-5 w-5 text-white" />
                  </div>
                  <div className="font-heading font-medium text-slate-800">MediQuick Mobile</div>
                </div>

                <div className="space-y-4">
                  <div className="bg-emerald-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-slate-800 mb-1">24/7 Health Guidance</div>
                    <div className="text-xs text-slate-600">Get reliable health recommendations anytime, anywhere.</div>
                  </div>

                  <div className="bg-emerald-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-slate-800 mb-1">Personalized Care</div>
                    <div className="text-xs text-slate-600">
                      Recommendations tailored to your health profile and history.
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-slate-800 mb-1">Connect with Doctors</div>
                    <div className="text-xs text-slate-600">
                      Find and book appointments with qualified healthcare providers.
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Download Now</Button>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-full px-4 py-2 shadow-lg">
                <div className="text-xs font-medium text-emerald-600">Free Download</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
