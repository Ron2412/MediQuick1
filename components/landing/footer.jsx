import Link from "next/link"
import { Stethoscope, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-500 p-2 rounded-md">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white font-heading">MediQuick</span>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              AI-powered health guidance and symptom analysis for better healthcare decisions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-4 font-heading">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white">
                  Download
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-4 font-heading">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white">
                  Team
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-400 hover:text-white">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-4 font-heading">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@mediquick.com</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (800) 123-4567</span>
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-4 font-heading">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-slate-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-400 hover:text-white">
                    HIPAA Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} MediQuick Health Technologies. All rights reserved.</p>
          <p className="mt-2">
            <span className="font-medium">Important:</span> MediQuick is not a substitute for professional medical
            advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider
            with any questions you may have regarding a medical condition.
          </p>
        </div>
      </div>
    </footer>
  )
}
