import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/footer'
import PageHeader from '@/components/page-header'
import { Instagram, Tv, Facebook, Youtube } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader />
      <div className="mx-auto max-w-[580px] px-4 pt-2 pb-8 sm:pb-10">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-1 text-sm text-neutral-600 hover:text-black transition-colors">
            Home
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="text-sm text-neutral-900 font-medium">About</span>
        </div>
        
        {/* Hero Section */}
        <section className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Our Story</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-black leading-tight">
            Built for pet owners who are tired of losing important records
          </h1>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-normal">
            JustPetem started with one simple problem. Too many pet owners showed up to the vet with nothing.
          </p>
        </section>

        {/* Founder Story */}
        <section className="mb-10">
          <div className="p-4 rounded-lg border border-neutral-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-black">Dr. Sarah Chen</p>
                <p className="text-xs text-neutral-600">Pet Health Specialist and Founder</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-neutral-700 leading-relaxed font-normal">
              After 25 years working with pet owners and veterinary clinics, the same problem kept coming up. Owners had no organised record of their pet&apos;s health history. Vaccination dates were forgotten. Medication names were written on scraps of paper. Emergency contacts were saved in old text messages. JustPetem was built to fix that. Every generator on this site exists because a real pet owner needed that document and had nowhere to get it for free.
            </p>
          </div>
        </section>

        {/* What We Built */}
        <section className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">What This Is</p>
          <h2 className="mt-2 text-lg font-semibold text-black">
            Free pet document generators for every situation
          </h2>
          <p className="mt-3 text-sm text-neutral-700 leading-relaxed font-normal">
            Every tool on JustPetem is free. You fill in your pet&apos;s details online, watch the document build live, and download a finished PDF instantly. No account needed. No fees. No blank forms to format yourself.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-10">
          <div className="rounded-2xl border-2 border-black p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-black">6,000+</p>
                <p className="text-xs text-neutral-600 mt-1">records generated</p>
              </div>
              <div>
                <p className="text-lg font-bold text-black">4,200+</p>
                <p className="text-xs text-neutral-600 mt-1">downloads</p>
              </div>
              <div>
                <p className="text-lg font-bold text-black">21+</p>
                <p className="text-xs text-neutral-600 mt-1">document categories</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Find Us</p>
          <h2 className="mt-2 text-lg font-semibold text-black mb-4">
            Follow JustPetem
          </h2>
          
          <div className="space-y-2">
            <a href="https://instagram.com/justpetem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
              <Instagram className="w-5 h-5 text-neutral-700" />
              <div>
                <p className="text-sm font-semibold text-black">Instagram</p>
                <p className="text-xs text-neutral-600">@justpetem</p>
              </div>
            </a>

            <a href="https://tiktok.com/@justpetem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
              <Tv className="w-5 h-5 text-neutral-700" />
              <div>
                <p className="text-sm font-semibold text-black">TikTok</p>
                <p className="text-xs text-neutral-600">@justpetem</p>
              </div>
            </a>

            <a href="https://facebook.com/justpetem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
              <Facebook className="w-5 h-5 text-neutral-700" />
              <div>
                <p className="text-sm font-semibold text-black">Facebook</p>
                <p className="text-xs text-neutral-600">JustPetem</p>
              </div>
            </a>

            <a href="https://youtube.com/@justpetem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
              <Youtube className="w-5 h-5 text-neutral-700" />
              <div>
                <p className="text-sm font-semibold text-black">YouTube</p>
                <p className="text-xs text-neutral-600">JustPetem</p>
              </div>
            </a>
          </div>
        </section>

        {/* Brand Credit */}
        <section className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Behind The Product</p>
          <p className="mt-2 text-sm text-neutral-700">
            Built in partnership with <Link href="https://kekkamarketing.com" target="_blank" rel="noopener noreferrer" className="text-black font-semibold hover:underline">Kekka Marketing</Link>
          </p>
        </section>
      </div>
      <Footer />
    </div>
  )
}
