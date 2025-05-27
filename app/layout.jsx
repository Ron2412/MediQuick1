import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import Head from "next/head"

// Initialize the Inter font for body text
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Initialize the Poppins font for headings
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata = {
  title: "MediQuick - AI-Powered Health Assistant",
  description: "Analyze your symptoms and get quick health recommendations",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />
        <link
          rel="stylesheet"
          as="style"
          onLoad="this.rel='stylesheet'"
          href="https://fonts.googleapis.com/css2?display=swap&family=Manrope:wght@400;500;700;800&family=Noto+Sans:wght@400;500;700;900"
        />
      </Head>
      <body className="min-h-screen bg-[#f8fbfc] font-sans" style={{ fontFamily: 'Manrope, Noto Sans, sans-serif' }}>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden flex flex-col group/design-root">
          {/* Premium blurred background blobs */}
          <div className="absolute top-[-120px] right-[-120px] w-[340px] h-[340px] bg-emerald-100 rounded-full blur-3xl opacity-40 z-0" />
          <div className="absolute bottom-[-120px] left-[-120px] w-[340px] h-[340px] bg-blue-100 rounded-full blur-3xl opacity-40 z-0" />
          <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-500 p-2 rounded-md">
                    {/* Stethoscope icon from lucide-react or SVG inline */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18V7a2 2 0 012-2h8a2 2 0 012 2v11a2 2 0 01-2 2H8a2 2 0 01-2-2z" /></svg>
                  </div>
                  <h1 className="text-xl font-heading font-semibold text-slate-800">Mediquick</h1>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <a href="/" className="text-sm text-slate-600 hover:text-emerald-600">Chat</a>
                  <a href="/profile" className="text-sm text-slate-600 hover:text-emerald-600">Profile</a>
                  <a href="/history" className="text-sm text-slate-600 hover:text-emerald-600">History</a>
                  <a href="/dashboard" className="text-sm text-slate-600 hover:text-emerald-600">Dashboard</a>
                </div>
              </div>
            </div>
          </header>
          <div className="layout-container flex h-full grow flex-col relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
