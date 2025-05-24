import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center">
      <div className="text-center space-y-8 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 font-heading">Welcome to MediQuick</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Choose your experience: explore our landing page or dive straight into the health app.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/landing">
            <Button className="bg-emerald-500 hover:bg-emerald-600 h-12 px-8">
              View Landing Page
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="/app">
            <Button variant="outline" className="h-12 px-8">
              Try the App
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
