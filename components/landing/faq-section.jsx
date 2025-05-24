import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  const faqs = [
    {
      question: "How accurate is MediQuick's symptom analysis?",
      answer:
        "MediQuick's AI has been trained on extensive medical data and validated by healthcare professionals. While it provides reliable guidance, it's designed to complement, not replace, professional medical advice. Our triage recommendations are conservative, meaning we'll suggest seeking medical care when there's any significant uncertainty.",
    },
    {
      question: "Is my health data secure and private?",
      answer:
        "Absolutely. MediQuick is HIPAA-compliant and uses enterprise-grade encryption to protect your personal health information. We never sell your data to third parties, and you have complete control over your information through our privacy settings.",
    },
    {
      question: "Can MediQuick diagnose medical conditions?",
      answer:
        "MediQuick does not provide medical diagnoses. Instead, it analyzes your symptoms to suggest possible causes and recommend appropriate next steps, such as self-care, visiting a clinic, or seeking emergency care. Always consult with a healthcare professional for official diagnoses.",
    },
    {
      question: "How does the triage system work?",
      answer:
        "Our triage system categorizes your symptoms into three levels of urgency: Green (self-care recommended), Yellow (clinic visit advised), and Red (emergency care needed). This assessment is based on the nature, severity, and duration of your symptoms, along with relevant risk factors.",
    },
    {
      question: "Is MediQuick available internationally?",
      answer:
        "Currently, MediQuick is available in the United States, Canada, United Kingdom, Australia, and New Zealand. We're actively working on expanding to more countries while ensuring compliance with local healthcare regulations and guidelines.",
    },
    {
      question: "Do I need to create an account to use MediQuick?",
      answer:
        "Basic symptom analysis is available without an account. However, creating a free account allows you to save your health history, track symptoms over time, and receive more personalized recommendations based on your profile.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 font-heading mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-[800px] mx-auto">
            Find answers to common questions about MediQuick
          </p>
        </div>

        <div className="max-w-[800px] mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-heading text-slate-800">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-slate-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-2">Still have questions?</p>
          <a href="#" className="text-emerald-600 font-medium hover:text-emerald-700">
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  )
}
