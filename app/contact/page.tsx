'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageHeader from '@/components/page-header'
import { Mail, MessageCircle } from 'lucide-react'
import Footer from '@/components/footer'

export default function ContactPage() {
  const [step, setStep] = useState<'form' | 'verification' | 'success'>('form')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [verificationCode, setVerificationCode] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate sending verification code to email
    setUserEmail(formData.email)
    setStep('verification')
  }

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate code verification
    if (verificationCode.length > 0) {
      setStep('success')
      setTimeout(() => {
        setStep('form')
        setFormData({ name: '', email: '', message: '' })
        setVerificationCode('')
      }, 3000)
    }
  }

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
          <span className="text-sm text-neutral-900 font-medium">Contact</span>
        </div>
        
        {/* Hero Section */}
        <section className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Get In Touch</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-black leading-tight">
            Contact JustPetem
          </h1>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-normal">
            Questions, feedback, or partnership enquiries. We read everything.
          </p>
        </section>

        {/* Contact Options */}
        <section className="mb-10">
          <div className="space-y-3">
            {/* Email Card */}
            <Link href="mailto:hello@justpetem.com" className="block p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Email</p>
              <p className="mt-2 text-sm font-semibold text-black">hello@justpetem.com</p>
              <p className="mt-1 text-xs text-neutral-600">For general questions and feedback.</p>
            </Link>

            {/* WhatsApp Card */}
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">WhatsApp</p>
              <p className="mt-2 text-sm font-semibold text-black">Message us on WhatsApp</p>
              <p className="mt-1 text-xs text-neutral-600">Quick questions answered fast.</p>
            </a>

            {/* Kekka Marketing Card */}
            <Link href="https://kekkamarketing.com" target="_blank" rel="noopener noreferrer" className="block p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Built By</p>
              <p className="mt-2 text-sm font-semibold text-black">Kekka Marketing</p>
              <p className="mt-1 text-xs text-neutral-600">Agency enquiries and partnerships.</p>
            </Link>
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-black">Send us a Message</h2>
          
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Your name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Your email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Your message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-neutral-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}

          {step === 'verification' && (
            <form onSubmit={handleVerification} className="space-y-4">
              <p className="text-sm text-neutral-700">
                We&apos;ve sent a verification code to <span className="font-semibold">{userEmail}</span>. Enter it below to verify your email.
              </p>
              
              <div>
                <label className="block text-sm font-medium text-black mb-2">Verification code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-center text-lg tracking-widest"
                  placeholder="Enter code"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-neutral-800 transition-colors"
              >
                Verify and Send
              </button>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full px-4 py-2 rounded-lg border border-neutral-200 text-black font-medium hover:bg-neutral-50 transition-colors"
              >
                Back
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm font-semibold text-green-900">Email verified successfully!</p>
              <p className="text-sm text-green-800 mt-1">Your message has been sent. We&apos;ll get back to you soon.</p>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  )
}
