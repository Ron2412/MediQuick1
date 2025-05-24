import Link from "next/link"
import { Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-2 rounded-md">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-slate-800 font-heading">MediQuick</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
          >
            Testimonials
          </Link>
          <Link href="#faq" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Log In
          </Button>
          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
