'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-neutral-200 mt-12">
      <div className="mx-auto px-4 py-8">
        {/* Centered layout for all screen sizes */}
        <div className="mb-6 flex flex-col gap-4 text-center mx-auto max-w-2xl">
          <div>
            <p className="text-sm font-semibold text-black">JustPetem.</p>
            <p className="text-sm text-neutral-600 mt-1">
              Free pet document generators. Fill online, download as PDF. No account needed.
            </p>
          </div>
          
          {/* Links - Space separated, no pipes */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/tools" className="text-neutral-700 hover:text-black font-medium">
              All Tools
            </Link>
            <Link href="/about" className="text-neutral-700 hover:text-black font-medium">
              About
            </Link>
            <Link href="/blog" className="text-neutral-700 hover:text-black font-medium">
              Blog
            </Link>
            <Link href="/privacy" className="text-neutral-700 hover:text-black font-medium">
              Privacy
            </Link>
            <Link href="/contact" className="text-neutral-700 hover:text-black font-medium">
              Contact
            </Link>
          </div>
        </div>

        {/* Cookie Notice */}
        <div className="border-t border-neutral-100 pt-4 text-center mx-auto max-w-2xl">
          <p className="text-xs text-neutral-500 leading-relaxed">
            This site uses cookies. By continuing to use it, you agree to our{' '}
            <Link href="#cookie-policy" className="text-neutral-700 hover:text-black underline font-medium">
              cookie policy
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
