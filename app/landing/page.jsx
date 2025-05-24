import { LandingHeader } from "@/components/landing/landing-header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeatureSection } from "@/components/landing/feature-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { TestimonialSection } from "@/components/landing/testimonial-section"
import { FaqSection } from "@/components/landing/faq-section"
import { CtaSection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <main>
        <HeroSection />
        <FeatureSection />
        <HowItWorksSection />
        <TestimonialSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
