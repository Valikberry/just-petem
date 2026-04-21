"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://justpetem.com/tools?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://justpetem.com/#webpage",
      "url": "https://justpetem.com",
      "name": "JustPetem — Free Pet Document Generators",
      "description": "Free pet document generators for dog owners, cat owners, and every pet in between. Fill online, download as PDF. No account needed.",
      "isPartOf": {
        "@id": "https://justpetem.com/#website"
      },
      "about": {
        "@id": "https://justpetem.com/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are these tools really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, completely free with no hidden limits and no account required."
          }
        },
        {
          "@type": "Question",
          "name": "What pets do these tools work for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dogs, cats, horses, rabbits, birds, reptiles and more."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to create an account?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No account required. Fill in your pet's details and download your PDF instantly."
          }
        },
        {
          "@type": "Question",
          "name": "How do I save or download my records?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every generator produces a finished PDF you can download instantly."
          }
        }
      ]
    }
  ]
}

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"email" | "verify" | "subscribed">("email")
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setStep("verify")
    setIsLoading(false)
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) return
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setStep("subscribed")
    setIsLoading(false)
  }

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="sr-only">Free Pet Document Generators</h1>
      
      <main className="min-h-screen bg-white flex items-center justify-center p-4 relative">
        <div
          className="absolute inset-0"
          style={{
  backgroundImage: "url('/Petdoddle.jpg')",
  backgroundSize: '400px 400px',
  backgroundRepeat: 'repeat',
  opacity: 0.3,
  mixBlendMode: 'multiply',
}}
        />
        
        <div className="w-full max-w-[420px] flex flex-col gap-3 relative z-10 px-4 sm:px-0">
          <div className="bg-[#f3f3f3] rounded-3xl border-2 border-black/20 py-6 px-6 sm:py-7 text-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3 rounded-full overflow-hidden bg-[#e8e8e8]">
              <Image
                src="/jo-illustration.png"
                alt="Jo, pet lover and founder of JustPetem"
                width={112}
                height={112}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-2xl sm:text-3xl font-bold text-black">
              Jo
            </p>
            
            <p className="text-sm font-normal text-black/70 mt-2">
              Pet lover and founder of JustPetem
            </p>
            
            <p className="text-sm font-normal text-black/80 mt-4 max-w-[320px] mx-auto leading-relaxed">
              JustPetem gives pet owners simple, practical tools that actually work. Free, no signup required. Fill in your pet&apos;s details online and download a finished PDF in seconds.
            </p>
            
            <Button 
              asChild 
              className="w-full mt-5 h-12 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-base"
            >
              <Link href="/tools">Access Free Tools</Link>
            </Button>
          </div>

          <div className="bg-[#f3f3f3] rounded-2xl border-2 border-black/20 p-4">
            {step === "subscribed" ? (
              <div className="flex items-center justify-center gap-2 py-1">
                <span className="text-green-500">✓</span>
                <p className="text-black text-sm font-normal">You&apos;re subscribed!</p>
              </div>
            ) : step === "verify" ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">📬</span>
                  <span className="text-sm font-semibold text-black">Enter verification code</span>
                </div>
                <p className="text-xs font-normal text-black/60">We sent a code to {email}</p>
                <form onSubmit={handleVerify} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="h-10 flex-1 bg-black/5 border-0 text-black placeholder:text-black/40 text-sm tracking-widest"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="h-10 px-5 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium text-sm shrink-0"
                  >
                    {isLoading ? "..." : "Verify"}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">📬</span>
                  <span className="text-sm font-semibold text-black">Stay in the loop</span>
                  <span className="text-xs font-normal text-black/60">Practical tips for pet owners. No spam.</span>
                </div>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 flex-1 bg-black/5 border-0 text-black placeholder:text-black/40 text-sm"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="h-10 px-5 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium text-sm shrink-0"
                  >
                    {isLoading ? "..." : "Subscribe"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
