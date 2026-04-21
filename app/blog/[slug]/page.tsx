import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Eye, Globe } from 'lucide-react'
import Footer from '@/components/footer'
import PageHeader from '@/components/page-header'

// Blog post data - indexed by slug
const BLOG_POSTS_DATA = {
  'what-should-be-in-a-dog-health-record': {
    author: 'Written by Sarah Bennett',
    title: 'What Should Be in a Dog Health Record',
    intro: 'Everything vets, sitters, and carers need to know about your dog, covered in one document. A complete dog health record helps you organize critical information and share it quickly when it matters most.',
    meta: [
      { label: 'March 10, 2025', icon: CalendarDays },
      { label: '2,845 views', icon: Eye },
      { label: 'Health Records', icon: Globe },
    ],
    heroImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        heading: 'Why a dog health record matters',
        paragraphs: [
          'A complete dog health record centralizes all the information that matters for your dog\'s care. When you need it fast—switching vets, traveling, dealing with an emergency—having everything in one place saves time and prevents critical details from being missed.',
          'Vets rely on complete information to make good decisions. Pet sitters need to know allergies and medications. Emergency clinics need your dog\'s history. One organized record makes everyone\'s job easier and keeps your dog safer.',
        ],
      },
      {
        heading: 'Dog details section',
        paragraphs: [
          'Start with basic identification: your dog\'s name, breed, date of birth, sex, weight, and microchip number. Include color and markings so your dog can be identified by anyone caring for them. This section is quick to fill but essential for clarity.',
          'Weight changes over time, so update this annually. Microchip numbers and registration details should be accurate and current. These details might seem simple, but they\'re often what emergency vets need first.',
        ],
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80',
      },
      {
        heading: 'Critical alerts section',
        paragraphs: [
          'List any drug allergies, food allergies, or chronic conditions at the top of your record. Pet sitters, vets, and carers should see these immediately—before they give any medication or food.',
          'Include reactions your dog has had in the past. Some dogs have seasonal allergies, some are sensitive to certain antibiotics, others have conditions like epilepsy or heart disease that need to be front-and-center. This section is life-critical information.',
        ],
      },
      {
        heading: 'Vaccination and medical history',
        paragraphs: [
          'Track all vaccinations with dates given and when boosters are due. Include rabies, DHPP, Bordetella, Leptospirosis, and any other vaccines your vet recommends. Note if your dog had any adverse reactions.',
          'Add past surgeries, illnesses, treatments, and hospitalizations. Include the dates and outcomes. This gives any new vet context about your dog\'s health trends and helps them make informed decisions about future care.',
        ],
        image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
      },
      {
        heading: 'Medication and handling notes',
        paragraphs: [
          'If your dog takes medications, list each one with the dosage, frequency, and prescribing vet. Include any special instructions—take with food, refrigerate, check for side effects.',
          'Add handling notes for pet sitters and carers: how your dog reacts to strangers, known fears, what calms them down, whether they\'re friendly with other pets. These practical details make a huge difference in keeping your dog comfortable and safe in new hands.',
        ],
      },
      {
        heading: 'Vet and emergency contact information',
        paragraphs: [
          'Include your regular vet\'s name, clinic name, phone number, and hours. Add your emergency vet clinic information too. Include your own contact details, emergency contact information, and owner name.',
          'When you need this information, you need it immediately. Having it organized in one place means no searching for business cards or scrolling through old emails. Just open your dog\'s health record and dial.',
        ],
      },
    ],
  },
}

interface MetaItemProps {
  item: {
    label: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  }
}

function MetaItem({ item }: MetaItemProps) {
  const Icon = item.icon

  return (
    <div className="flex items-center gap-2 text-[12px] text-black/55">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.05] text-black/65">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <span>{item.label}</span>
    </div>
  )
}

interface ArticleSectionProps {
  section: {
    heading: string
    paragraphs: string[]
    image?: string
  }
}

function ArticleSection({ section }: ArticleSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-black">
        {section.heading}
      </h2>

      <div className="space-y-4 text-[15px] leading-7 text-black/78">
        {section.paragraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {section.image && (
        <div className="overflow-hidden rounded-[16px] border border-black/8 bg-[#f3f3f3]">
          <Image
            src={section.image}
            alt={section.heading}
            width={560}
            height={220}
            className="h-[220px] w-full object-cover"
          />
        </div>
      )}
    </section>
  )
}

interface ArticleContentPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ArticleContentPage({ params }: ArticleContentPageProps) {
  const { slug } = await params
  const article = BLOG_POSTS_DATA[slug as keyof typeof BLOG_POSTS_DATA]

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <PageHeader />
        <div className="mx-auto max-w-[560px] px-4 pt-2 pb-6 sm:pb-8">
          <div className="mb-6 flex items-center gap-2">
            <Link href="/tools" className="text-sm text-neutral-600 hover:text-black transition-colors">
              Tools
            </Link>
            <span className="text-neutral-400">/</span>
            <Link href="/blog" className="text-sm text-neutral-600 hover:text-black transition-colors">
              Blog
            </Link>
          </div>
          <p className="text-center text-neutral-600">Blog post not found.</p>
          <div className="mt-4 text-center">
            <Link href="/blog" className="text-sm font-semibold text-black hover:text-neutral-700">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <PageHeader />
      <div className="mx-auto w-full max-w-[560px] px-4 pt-2 pb-8 sm:pb-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2">
          <Link href="/tools" className="text-sm text-neutral-600 hover:text-black transition-colors">
            Tools
          </Link>
          <span className="text-neutral-400">/</span>
          <Link href="/blog" className="text-sm text-neutral-600 hover:text-black transition-colors">
            Blog
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="text-sm text-neutral-900 font-medium truncate">{article.title}</span>
        </div>

        <article>
          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/45">
              {article.author}
            </p>

            <h1 className="mt-4 text-[30px] font-extrabold leading-[1.02] tracking-[-0.03em] text-black">
              {article.title}
            </h1>

            <p className="mt-4 text-[15px] leading-7 text-black/72">
              {article.intro}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-black/8 pb-5">
            {article.meta.map((item) => (
              <MetaItem key={item.label} item={item} />
            ))}
          </div>

          <div className="mt-5 overflow-hidden rounded-[18px] border border-black/8 bg-[#f3f3f3]">
            <Image
              src={article.heroImage}
              alt={article.title}
              width={560}
              height={240}
              className="h-[240px] w-full object-cover"
            />
          </div>

          <div className="mt-8 space-y-8">
            {article.sections.map((section) => (
              <ArticleSection key={section.heading} section={section} />
            ))}
          </div>

          {/* Related Posts or Tools */}
          <div className="mt-12 border-t border-neutral-200 pt-8">
            <h3 className="text-lg font-semibold text-black mb-4">Related Health Record Tools</h3>
            <div className="space-y-3">
              <Link
                href="/tools/dog-health-record-generator"
                className="block p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
              >
                <p className="text-sm font-semibold text-black">Dog Health Record Generator</p>
                <p className="text-xs text-neutral-600 mt-1">Create a complete dog health record in minutes.</p>
              </Link>
              <Link
                href="/tools/pet-health-records"
                className="block p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
              >
                <p className="text-sm font-semibold text-black">All Pet Health Record Generators</p>
                <p className="text-xs text-neutral-600 mt-1">Health records for dogs, cats, horses, and more.</p>
              </Link>
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  )
}
