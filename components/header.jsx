import Link from "next/link"
import { Stethoscope } from "lucide-react"

export function MediQuickHeader() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-md">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-heading font-semibold text-slate-800">MediQuick</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <button className="text-sm text-slate-600 hover:text-emerald-600">Dashboard</button>
            <button className="text-sm text-slate-600 hover:text-emerald-600">History</button>
            <Link href="/profile" legacyBehavior>
              <a className="text-sm text-slate-600 hover:text-emerald-600">Profile</a>
            </Link>
            <button className="bg-emerald-500 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-emerald-600 transition-colors">
              Emergency
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
