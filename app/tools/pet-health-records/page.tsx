import Link from "next/link"
import Script from "next/script"
import { ChevronRight, Syringe, Heart, FileText, ClipboardList } from "lucide-react"
import Footer from "@/components/footer"

export const viewport = {
  width: "device-width",
  initialScale: 0.9,
}

export const metadata = {
  title: "Free Pet Health Record Generators — JustPetem",
  description: "Free pet health record generators for dogs, cats, horses and more. Fill online, download as PDF instantly. No account needed.",
  alternates: {
    canonical: "https://justpetem.com/tools/pet-health-records",
  },
  openGraph: {
    title: "Free Pet Health Record Generators — JustPetem",
    description: "Free pet health record generators for dogs, cats, horses and more. Fill online, download as PDF instantly. No account needed.",
    url: "https://justpetem.com/tools/pet-health-records",
    siteName: "JustPetem",
    images: [
      {
        url: "https://justpetem.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Pet Health Record Generators — JustPetem",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Pet Health Record Generators — JustPetem",
    description: "Free pet health record generators for dogs, cats, horses and more. Fill online, download as PDF instantly. No account needed.",
    images: ["https://justpetem.com/og-image.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://justpetem.com/tools/pet-health-records#webpage",
      "url": "https://justpetem.com/tools/pet-health-records",
      "name": "Free Pet Health Record Generators — JustPetem",
      "description": "Free pet health record generators for dogs, cats, horses and more. Fill online, download as PDF instantly. No account needed.",
      "isPartOf": {
        "@id": "https://justpetem.com/#website"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://justpetem.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "All Tools",
            "item": "https://justpetem.com/tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Pet Health Records",
            "item": "https://justpetem.com/tools/pet-health-records"
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a free pet health record generator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An online tool that builds your finished pet health record as you fill in the details. You download a complete formatted PDF, not a blank form."
          }
        },
        {
          "@type": "Question",
          "name": "How is this different from downloading a blank form?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Blank forms require you to fill them in offline and format them yourself. This generator builds the document live as you type and downloads it complete and ready to use."
          }
        },
        {
          "@type": "Question",
          "name": "What format does the finished record download in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PDF. Opens on any device, prints cleanly, and is easy to email to vets or pet sitters."
          }
        },
        {
          "@type": "Question",
          "name": "Can I generate records for multiple pets?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Select each pet type, fill in their details, and download a separate PDF for each one."
          }
        },
        {
          "@type": "Question",
          "name": "Is this the same as an official vet record?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Your vet maintains their own clinical records. This generator creates a complete owner summary that you control and can share with anyone who cares for your pet."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between a health record and a vaccination record?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A vaccination record tracks shots and due dates only. A pet health record is the complete picture including medications, allergies, vet contacts, medical history, and handling notes."
          }
        }
      ]
    }
  ]
}

const TOOLS = [
  {
    petType: "Dog Health Record Generator",
    emoji: "🐕",
    description: "Complete health tracking for your dog.",
    url: "/tools/dog-health-record-generator",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
  },
  {
    petType: "Cat Health Record Generator",
    emoji: "🐈",
    description: "Health history for your cat in one document.",
    url: "/tools/cat-health-record-generator",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  },
  {
    petType: "Puppy Health Record Generator",
    emoji: "🐾",
    description: "Start your puppy's health record from day one.",
    url: "/tools/puppy-health-record-generator",
    color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
  },
  {
    petType: "Horse Health Record Generator",
    emoji: "🐴",
    description: "Equine health, vaccination, and vet history.",
    url: "/tools/horse-health-record-generator",
    color: "bg-amber-50 border-amber-200 hover:bg-amber-100",
  },
  {
    petType: "Kitten Health Record Generator",
    emoji: "🐱",
    description: "Health records for your kitten from the start.",
    url: "/tools/kitten-health-record-generator",
    color: "bg-rose-50 border-rose-200 hover:bg-rose-100",
  },
]

const WHATS_INCLUDED = [
  { section: "Pet Details", covers: "Name, breed, date of birth, sex, weight, and microchip number" },
  { section: "Critical Alerts", covers: "Drug allergies, food allergies, and chronic conditions shown first" },
  { section: "Owner Information", covers: "Your name, phone, email, address, and emergency contact" },
  { section: "Vet Information", covers: "Primary clinic, veterinarian name, phone, and emergency vet contact" },
  { section: "Vaccination History", covers: "Each vaccine, date given, next due date, and current status" },
  { section: "Medication Log", covers: "Current medications, dosage, frequency, and prescribing vet" },
  { section: "Handling Notes", covers: "Behaviour around strangers, known fears, and special instructions" },
  { section: "Medical History", covers: "Past surgeries, illnesses, procedures, and hospitalisation notes" },
]

const USE_CASES = [
  { case: "USE CASE 1", title: "New puppy and kitten owners setting up their first pet health record" },
  { case: "USE CASE 2", title: "Owners switching vet clinics who need a complete portable summary" },
  { case: "USE CASE 3", title: "Pet owners travelling internationally with vaccination and health history" },
  { case: "USE CASE 4", title: "Pet sitters and dog walkers who need client health records before taking responsibility" },
  { case: "USE CASE 5", title: "Multi-pet households managing one digital pet health record per animal" },
  { case: "USE CASE 6", title: "Rescue and foster carers building intake records for every incoming animal" },
]

const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Pick your pet type",
    body: "Select which animal you are creating a pet health record for.",
  },
  {
    number: "02",
    title: "Fill in the details online",
    body: "Enter your pet's name, breed, vaccinations, medications, and vet contacts. The record builds live in the preview panel as you type.",
  },
  {
    number: "03",
    title: "Download your finished PDF",
    body: "One click downloads a professionally formatted pet health record ready to share with vets, sitters, or carers.",
  },
]

const FAQS = [
  {
    question: "What is a free pet health record generator?",
    answer: "An online tool that builds your finished pet health record as you fill in the details. You download a complete formatted PDF, not a blank form.",
  },
  {
    question: "How is this different from downloading a blank form?",
    answer: "Blank forms require you to fill them in offline and format them yourself. This generator builds the document live as you type and downloads it complete and ready to use.",
  },
  {
    question: "What format does the finished record download in?",
    answer: "PDF. Opens on any device, prints cleanly, and is easy to email to vets or pet sitters.",
  },
  {
    question: "Can I generate records for multiple pets?",
    answer: "Yes. Select each pet type, fill in their details, and download a separate PDF for each one.",
  },
  {
    question: "Is this the same as an official vet record?",
    answer: "No. Your vet maintains their own clinical records. This generator creates a complete owner summary that you control and can share with anyone who cares for your pet.",
  },
  {
    question: "Can I request my pet's medical records from my vet?",
    answer: "Yes. You have the right to request copies from your vet clinic. Use those to fill in this generator and download a portable pet health record you can carry and share.",
  },
  {
    question: "How do I update my pet's health record when something changes?",
    answer: "Return to the generator, fill in the updated details, and download a new PDF.",
  },
  {
    question: "What is the difference between a health record and a vaccination record?",
    answer: "A vaccination record tracks shots and due dates only. A pet health record is the complete picture including medications, allergies, vet contacts, medical history, and handling notes.",
  },
]

const RELATED_TOOLS = [
  {
    label: "Pet Vaccination Record Generators",
    description: "Track vaccine dates and upcoming due dates for your pet.",
    url: "/tools/pet-vaccination-records",
    emoji: "💉",
    color: "bg-teal-500",
    iconBg: "bg-teal-400",
  },
  {
    label: "Pet Sitter Notes Generator",
    description: "Give your sitter everything they need before you leave.",
    url: "/tools/pet-sitter-notes",
    emoji: "📋",
    color: "bg-pink-500",
    iconBg: "bg-pink-400",
  },
  {
    label: "Pet Emergency Card Generator",
    description: "Keep your pet's critical info ready for any emergency.",
    url: "/tools/pet-emergency-card",
    emoji: "🚨",
    color: "bg-orange-500",
    iconBg: "bg-orange-400",
  },
  {
    label: "Pet Medication Tracker Generator",
    description: "Log medications, dosage, and refill schedules in one place.",
    url: "/tools/pet-medication-tracker",
    emoji: "💊",
    color: "bg-violet-500",
    iconBg: "bg-violet-400",
  },
]

export default function PetHealthRecordsHubPage() {
  return (
    <div className="min-h-screen bg-white">
      <Script
        id="json-ld-pet-health-records"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b border-neutral-100 py-4">
        <div className="mx-auto max-w-[580px] px-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="9" cy="4.5" rx="2" ry="2.5" fill="#e03434"/>
              <ellipse cx="15" cy="4.5" rx="2" ry="2.5" fill="#e03434"/>
              <ellipse cx="5.5" cy="9" rx="1.8" ry="2.2" fill="#e03434"/>
              <ellipse cx="18.5" cy="9" rx="1.8" ry="2.2" fill="#e03434"/>
              <path d="M12 9c-3.5 0-6 2-6 4.5 0 1.5 1 3 2.5 3.5.5.2 1 .5 1.5 1 .5.4.8.5 2 .5s1.5-.1 2-.5c.5-.5 1-.8 1.5-1C17 16.5 18 15 18 13.5 18 11 15.5 9 12 9z" fill="#e03434"/>
            </svg>
            <span className="text-black text-[20px] leading-none tracking-tight">
              <span className="font-normal">Just</span>
              <span className="font-bold">Petem</span>
            </span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[580px] px-4 pt-4 pb-8 sm:pb-10">

        <div className="mb-6 flex items-center gap-1.5">
          <Link href="/tools" className="text-[11px] text-neutral-500 hover:text-black transition-colors">
            All Tools
          </Link>
          <span className="text-[11px] text-neutral-400">/</span>
          <span className="text-[11px] text-neutral-700 font-medium">Pet Health Records</span>
        </div>

        <section className="mb-10 text-center">
          <h1 className="text-3xl sm:text-3xl font-bold text-black leading-tight">
            Free Pet Health Record Generators
          </h1>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-normal max-w-[460px] mx-auto">
            Fill in your pet's health record online. Watch it build live and download a finished PDF in seconds.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-neutral-500 font-normal">
            <span>Free — no account needed</span>
            <span className="text-neutral-300">•</span>
            <span>Download as PDF instantly</span>
            <span className="text-neutral-300">•</span>
            <span>Works for any pet type</span>
          </div>
        </section>

        <section className="mb-10">
          <p className="text-base leading-relaxed text-neutral-700 font-normal">
            Most pet owners store digital pet health records across scattered notes, old texts, and forgotten folders. That works until your vet needs the full history, your sitter needs the allergy list, or you are crossing a border with your dog. This free pet health record generator builds a complete document as you fill it in. No blank forms. No account. Just a finished PDF ready when you need it.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-black mb-2">Generate a Pet Health Record</h2>
          <p className="text-sm text-neutral-600 font-normal mb-4">
            Pick your pet type and your free pet health record builds instantly online.
          </p>
          <div className="space-y-2">
            {TOOLS.map((tool) => (
              <div
                key={tool.url}
                className={`flex items-center gap-3 p-4 rounded-lg border cursor-default ${tool.color.split(' ').filter(c => !c.startsWith('hover:')).join(' ')}`}
              >
                <span className="text-xl">{tool.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-black">{tool.petType}</p>
                  <p className="text-xs text-neutral-600">{tool.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-neutral-300" />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-black mb-2">What Your Record Includes</h2>
          <p className="text-sm text-neutral-600 font-normal mb-4">
            Every pet health record covers the information vets, sitters, and carers actually need.
          </p>
          <div className="rounded-2xl border-2 border-black p-4 space-y-4">
            {WHATS_INCLUDED.map((item, index) => (
              <div
                key={item.section}
                className={`${index !== WHATS_INCLUDED.length - 1 ? "border-b border-neutral-200 pb-4" : ""}`}
              >
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">{item.section}</p>
                <p className="text-sm text-neutral-700 font-normal mt-1">{item.covers}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-black mb-4">Who Uses These</h2>
          <div className="rounded-2xl border-2 border-black p-4 space-y-4">
            {USE_CASES.map((item, index) => (
              <div
                key={item.case}
                className={`${index !== USE_CASES.length - 1 ? "border-b border-neutral-100 pb-4" : ""}`}
              >
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">{item.case}</p>
                <p className="mt-1 text-base font-normal text-black">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-black mb-4">How It Works</h2>
          <div className="space-y-4">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.number} className="flex gap-4">
                <span className="text-sm font-semibold text-neutral-400 shrink-0 w-6">{step.number}</span>
                <div>
                  <p className="text-sm font-semibold text-black">{step.title}</p>
                  <p className="text-sm text-neutral-600 font-normal mt-1">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-black">Frequently Asked Questions</h2>
          <div className="rounded-2xl border-2 border-black p-4 space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={faq.question}
                className={`${index !== FAQS.length - 1 ? "border-b border-neutral-200 pb-4" : ""}`}
              >
                <h3 className="text-base font-semibold text-black">{faq.question}</h3>
                <p className="mt-1 text-sm font-normal text-neutral-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-black mb-4">Related Pet Document Generators</h2>
          <div className="space-y-2">
            {RELATED_TOOLS.map((tool) => (
              <div
                key={tool.url}
                className="flex items-center gap-3 p-4 rounded-lg bg-neutral-50 border border-neutral-100 cursor-default"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-black">{tool.emoji} {tool.label}</p>
                  <p className="text-xs text-neutral-600 mt-0.5">{tool.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-neutral-300 shrink-0" />
              </div>
            ))}
          </div>
        </section>

      </div>
      <Footer />
    </div>
  )
}
