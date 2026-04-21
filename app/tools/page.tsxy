import Link from "next/link"
import Script from "next/script"
import { ChevronRight, Syringe, PawPrint, Heart, FileText, ClipboardList, Award } from "lucide-react"
import Footer from "@/components/footer"

export const metadata = {
  title: "Free Pet Document Generators — JustPetem",
  description: "Free pet document generators for dogs, cats, horses and more. Fill online, download as PDF instantly. No account needed.",
  alternates: {
    canonical: "https://justpetem.com/tools",
  },

  openGraph: {
    title: "Free Pet Document Generators — JustPetem",
    description: "Free pet document generators for dogs, cats, horses and more. Fill online, download as PDF instantly. No account needed.",
    url: "https://justpetem.com/tools",
    siteName: "JustPetem",
    images: [
      {
        url: "https://justpetem.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "JustPetem — Free Pet Document Generators",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Pet Document Generators — JustPetem",
    description: "Free pet document generators for dogs, cats, horses and more. Fill online, download as PDF instantly. No account needed.",
    images: ["https://justpetem.com/og-image.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://justpetem.com/#organization",
      "name": "JustPetem",
      "url": "https://justpetem.com",
      "description": "Free pet document generators. Fill in your pet's details online and download a finished PDF instantly.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://justpetem.com/logo.png"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://justpetem.com/#website",
      "url": "https://justpetem.com",
      "name": "JustPetem",
      "publisher": {
        "@id": "https://justpetem.com/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://justpetem.com/tools#webpage",
      "url": "https://justpetem.com/tools",
      "name": "Free Pet Document Generators — JustPetem",
      "description": "Free pet document generators for dogs, cats, horses and more. Fill online, download as PDF instantly. No account needed.",
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
          }
        ]
      }
    },
    {
      "@type": "ItemList",
      "name": "Pet Document Generators",
      "description": "Free pet document generators for every pet type and situation.",
      "numberOfItems": 21,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Pet Health Record Generators", "url": "https://justpetem.com/tools/pet-health-records" },
        { "@type": "ListItem", "position": 2, "name": "Pet Vaccination Record Generators", "url": "https://justpetem.com/tools/pet-vaccination-records" },
        { "@type": "ListItem", "position": 3, "name": "Pet Medication Tracker Generator", "url": "https://justpetem.com/tools/pet-medication-tracker" },
        { "@type": "ListItem", "position": 4, "name": "Pet Care Planner Generator", "url": "https://justpetem.com/tools/pet-care-planner" },
        { "@type": "ListItem", "position": 5, "name": "Pet Care Log Generator", "url": "https://justpetem.com/tools/pet-care-log" },
        { "@type": "ListItem", "position": 6, "name": "Vet Visit Tracker Generator", "url": "https://justpetem.com/tools/vet-visit-tracker" },
        { "@type": "ListItem", "position": 7, "name": "Feeding Schedule Generator", "url": "https://justpetem.com/tools/feeding-schedule" },
        { "@type": "ListItem", "position": 8, "name": "Pet Sitter Notes Generator", "url": "https://justpetem.com/tools/pet-sitter-notes" },
        { "@type": "ListItem", "position": 9, "name": "Pet Emergency Card Generator", "url": "https://justpetem.com/tools/pet-emergency-card" },
        { "@type": "ListItem", "position": 10, "name": "Pet Contracts Generator", "url": "https://justpetem.com/tools/pet-contracts" },
        { "@type": "ListItem", "position": 11, "name": "Pet Profile Generator", "url": "https://justpetem.com/tools/pet-profile" },
        { "@type": "ListItem", "position": 12, "name": "Pet Passport Generator", "url": "https://justpetem.com/tools/pet-passport" },
        { "@type": "ListItem", "position": 13, "name": "Pet Planner Generator", "url": "https://justpetem.com/tools/pet-planner" },
        { "@type": "ListItem", "position": 14, "name": "Pet Report Card Generator", "url": "https://justpetem.com/tools/pet-report-card" },
        { "@type": "ListItem", "position": 15, "name": "Pet Grooming Forms Generator", "url": "https://justpetem.com/tools/pet-grooming-forms" },
        { "@type": "ListItem", "position": 16, "name": "Pet Expense Tracker Generator", "url": "https://justpetem.com/tools/pet-expense-tracker" },
        { "@type": "ListItem", "position": 17, "name": "Pet Memorial Generator", "url": "https://justpetem.com/tools/pet-memorial" },
        { "@type": "ListItem", "position": 18, "name": "Pet Adoption Certificate Generator", "url": "https://justpetem.com/tools/pet-adoption-certificate" },
        { "@type": "ListItem", "position": 19, "name": "Pet Resume Generator", "url": "https://justpetem.com/tools/pet-resume" },
        { "@type": "ListItem", "position": 20, "name": "Quality of Life Tracker Generator", "url": "https://justpetem.com/tools/pet-quality-of-life-tracker" },
        { "@type": "ListItem", "position": 21, "name": "Reptile and Exotic Care Generator", "url": "https://justpetem.com/tools/reptile-pet-care" }
      ]
    }
  ]
}

const FEATURE_CARDS = [
  {
    icon: PawPrint,
    title: "Dog Health Record Generator",
    description: "Complete health tracking for your dog. Vet info, vaccines, medications and more.",
    bgColor: "bg-violet-500",
    iconBg: "bg-violet-400",
    url: "/tools/dog-health-record-generator",
  },
  {
    icon: Syringe,
    title: "Dog Vaccination Record Generator",
    description: "Track every vaccine, due date and status for your dog.",
    bgColor: "bg-teal-500",
    iconBg: "bg-teal-400",
    url: "/tools/dog-vaccination-record-generator",
  },
  {
    icon: Heart,
    title: "Cat Health Record Generator",
    description: "Complete health history for your cat in one finished PDF.",
    bgColor: "bg-orange-500",
    iconBg: "bg-orange-400",
    url: "/tools/cat-health-record-generator",
  },
  {
    icon: FileText,
    title: "Dog Sitting Contract Generator",
    description: "Generate a professional dog sitting agreement instantly.",
    bgColor: "bg-cyan-500",
    iconBg: "bg-cyan-400",
    url: "/tools/dog-sitting-contract-generator",
  },
  {
    icon: ClipboardList,
    title: "Dog Sitter Instructions Generator",
    description: "Give your sitter everything they need in one document.",
    bgColor: "bg-pink-500",
    iconBg: "bg-pink-400",
    url: "/tools/dog-sitter-instructions-generator",
  },
  {
    icon: Award,
    title: "Dog Adoption Certificate Generator",
    description: "Generate a printable adoption certificate for your dog.",
    bgColor: "bg-lime-500",
    iconBg: "bg-lime-400",
    url: "/tools/dog-adoption-certificate-generator",
  },
]

const ALL_ARTICLES = [
  { label: "01", title: "Pet Health Record Generators", description: "Generate health records for your dog, cat, horse and more.", url: "/tools/pet-health-records" },
  { label: "02", title: "Pet Vaccination Record Generators", description: "Track vaccine dates and upcoming due dates for your pet.", url: "/tools/pet-vaccination-records" },
  { label: "03", title: "Pet Medication Tracker Generator", description: "Log your pet's medications, dosage, and refill schedules in one place.", url: "/tools/pet-medication-tracker" },
  { label: "04", title: "Pet Care Planner Generator", description: "Plan and organise your pet's daily care, routines and schedules.", url: "/tools/pet-care-planner" },
  { label: "05", title: "Pet Care Log Generator", description: "Record your pet's daily care activities, feeding, and health observations.", url: "/tools/pet-care-log" },
  { label: "06", title: "Vet Visit Tracker Generator", description: "Log every vet appointment, diagnosis, and follow-up note for your pet.", url: "/tools/vet-visit-tracker" },
  { label: "07", title: "Feeding Schedule Generator", description: "Build a clear feeding plan for your pet at any life stage.", url: "/tools/feeding-schedule" },
  { label: "08", title: "Pet Sitter Notes Generator", description: "Give your sitter everything they need to care for your pet.", url: "/tools/pet-sitter-notes" },
  { label: "09", title: "Pet Emergency Card Generator", description: "Keep your pet's critical info ready for any emergency situation.", url: "/tools/pet-emergency-card" },
  { label: "10", title: "Pet Contracts Generator", description: "Generate sitting, walking, boarding and grooming agreements for your pet.", url: "/tools/pet-contracts" },
  { label: "11", title: "Pet Profile Generator", description: "Create a complete profile with your pet's key info and contacts.", url: "/tools/pet-profile" },
  { label: "12", title: "Pet Passport Generator", description: "Organise travel health records and documentation for your pet.", url: "/tools/pet-passport" },
  { label: "13", title: "Pet Planner Generator", description: "Plan your pet's vet visits, medications, and care milestones all in one place.", url: "/tools/pet-planner" },
  { label: "14", title: "Pet Report Card Generator", description: "Generate daycare, boarding and grooming report cards for your pet instantly.", url: "/tools/pet-report-card" },
  { label: "15", title: "Pet Grooming Forms Generator", description: "Create grooming agreements, client forms and service records.", url: "/tools/pet-grooming-forms" },
  { label: "16", title: "Pet Expense Tracker Generator", description: "Track your pet's vet bills, food costs and care spending over time.", url: "/tools/pet-expense-tracker" },
  { label: "17", title: "Pet Memorial Generator", description: "Create certificates, memory books and loss documents for your pet.", url: "/tools/pet-memorial" },
  { label: "18", title: "Pet Adoption Certificate Generator", description: "Generate adoption certificates for your dog, cat and more.", url: "/tools/pet-adoption-certificate" },
  { label: "19", title: "Pet Resume Generator", description: "Build a pet resume for rental applications and new homes.", url: "/tools/pet-resume" },
  { label: "20", title: "Quality of Life Tracker Generator", description: "Monitor your senior pet's daily wellbeing and symptom changes.", url: "/tools/pet-quality-of-life-tracker" },
  { label: "21", title: "Reptile and Exotic Care Generator", description: "Track habitat, feeding and health records for your exotic pet.", url: "/tools/reptile-pet-care" },
]

export default function HubPage() {
  return (
    <div className="min-h-screen bg-white">

      <Script
        id="json-ld-tools"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b border-neutral-100 py-4 px-6">
        <div className="mx-auto max-w-[580px]">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="9" cy="4.5" rx="2" ry="2.5" fill="#e03434"/>
              <ellipse cx="15" cy="4.5" rx="2" ry="2.5" fill="#e03434"/>
              <ellipse cx="5.5" cy="9" rx="1.8" ry="2.2" fill="#e03434"/>
              <ellipse cx="18.5" cy="9" rx="1.8" ry="2.2" fill="#e03434"/>
              <path d="M12 9c-3.5 0-6 2-6 4.5 0 1.5 1 3 2.5 3.5.5.2 1 .5 1.5 1 .5.4.8.5 2 .5s1.5-.1 2-.5c.5-.5 1-.8 1.5-1C17 16.5 18 15 18 13.5 18 11 15.5 9 12 9z" fill="#e03434"/>
            </svg>
            <span className="text-black text-[20px] sm:text-[20px] leading-none tracking-tight">
              <span className="font-normal">Just</span>
              <span className="font-bold">Petem</span>
            </span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[580px] px-4 pt-4 pb-8 sm:pb-10">

        <div className="mb-6 flex items-center gap-1.5">
          <Link href="/" className="text-[11px] text-neutral-500 hover:text-black transition-colors">
            Home
          </Link>
          <span className="text-[11px] text-neutral-400">/</span>
          <span className="text-[11px] text-neutral-700 font-medium">All Tools</span>
        </div>

        <section className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-black leading-tight">
            Free Pet Document Generators
          </h1>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-normal max-w-[460px] mx-auto text-center">
            Instant personalized pet documents. Fill online, download as PDF, email to your vet. No sign up, no fees ever.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-black">Top Tools Right Now</h2>
          <div className="grid grid-cols-2 gap-3">
            {FEATURE_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.url}
                className={`rounded-xl p-4 transition-opacity hover:opacity-90 ${card.bgColor} text-white block`}
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg}`}>
                  <card.icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold leading-tight">{card.title}</h3>
                <p className="mt-1.5 text-[12px] leading-snug text-white/85">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-2 text-lg font-semibold text-black">All Pet Document Generators</h2>
          <p className="text-base leading-relaxed text-neutral-700 font-normal mb-4">
            Your pet's paperwork sorted. Pick a category and generate the document your pet needs in seconds.
          </p>
          <div className="overflow-hidden rounded-lg border border-neutral-200">
            {ALL_ARTICLES.map((article, index) => (
              <Link
                key={article.label}
                href={article.url}
                className={`block px-4 py-3 transition-colors hover:bg-neutral-50 ${
                  index !== ALL_ARTICLES.length - 1 ? "border-b border-neutral-100" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      {article.label}
                    </p>
                    <p className="mt-1 text-base font-semibold text-black">{article.title}</p>
                    <p className="mt-1 text-sm font-normal text-neutral-600">{article.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-neutral-300 ml-2" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-black">Simple Pet Documents for Busy Owners</h2>
          <p className="text-base leading-relaxed text-neutral-700 font-normal">
            Managing your pet's health means tracking medications, vaccines, vet visits, and care instructions. Most owners rely on scattered notes or memory. That works until you need the info fast. These tools give you one place to organise what matters for your pet.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-black">Who Uses These</h2>
          <div className="rounded-2xl border-2 border-black p-4 space-y-4">
            {[
              { case: "USE CASE 1", title: "New pet owners setting up routines" },
              { case: "USE CASE 2", title: "Owners with pets on daily medication" },
              { case: "USE CASE 3", title: "Anyone boarding or traveling with pets" },
              { case: "USE CASE 4", title: "Pet sitters who want clear instructions" },
              { case: "USE CASE 5", title: "People without printers who fill online and email directly" },
            ].map((item, index) => (
              <div key={item.case} className={`${index !== 4 ? "border-b border-neutral-100 pb-4" : ""}`}>
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                  {item.case}
                </p>
                <p className="mt-1 text-base font-normal text-black">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-black">Why It Works</h2>
          <ol className="space-y-2">
            {[
              "Each pet document is built for one job",
              "No extra features, no clutter",
              "Fill online from any device",
              "Download as PDF or send to your inbox",
              "No app to install",
              "No account required",
            ].map((item, index) => (
              <li key={index} className="text-base leading-relaxed text-neutral-700 font-normal">
                <span className="font-semibold">{index + 1}.</span> {item}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-10">
          <div className="rounded-2xl border border-neutral-200 p-5 flex flex-col gap-5 items-center text-center sm:flex-row sm:items-start sm:text-left">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-neutral-100 shrink-0 mx-auto sm:mx-0">
              <img
                src="/jo-illustration.png"
                alt="Jo, pet lover and founder of JustPetem"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-base leading-relaxed text-neutral-700 font-normal">
                JustPetem gives pet owners simple, practical tools that actually work. Free, no signup required. Fill in your pet's details online and download a finished PDF in seconds.
              </p>
              <p className="mt-3 text-sm font-semibold text-black">Jo</p>
              <p className="text-xs text-neutral-500">Pet lover and founder of JustPetem</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-black">Frequently Asked Questions</h2>
          <div className="rounded-2xl border-2 border-black p-4 space-y-4">
            {[
              { q: "Are these pet documents free?", a: "Yes. No payment, no account, no hidden fees." },
              { q: "What format do I get?", a: "PDF. Opens on any device, prints clean, easy to share." },
              { q: "Can I use this for multiple pets?", a: "Yes. Generate a separate document for each pet." },
              { q: "Do I need a printer?", a: "No. Fill online, save digitally, email directly." },
              { q: "Is my data saved?", a: "No. Your data stays on your device unless you email yourself a copy." },
              { q: "Why use digital pet documents?", a: "Less paper, less clutter, less hassle. Update anytime. Share instantly." },
            ].map((item, index) => (
              <div key={item.q} className={`${index !== 5 ? "border-b border-neutral-100 pb-4" : ""}`}>
                <h3 className="text-base font-semibold text-black">{item.q}</h3>
                <p className="mt-1 text-sm font-normal text-neutral-600">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
      <Footer />
    </div>
  )
}
