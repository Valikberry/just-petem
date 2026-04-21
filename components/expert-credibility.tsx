'use client'

import Image from 'next/image'

export default function ExpertCredibility() {
  return (
    <section className="mb-8 bg-gradient-to-br from-neutral-50 to-white rounded-3xl p-8 md:p-10">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-center">
        {/* Portrait - Centered on mobile, Left Side on desktop */}
        <div className="flex-shrink-0 w-40 h-40 md:w-48 md:h-48 mx-auto md:mx-0">
          <div className="w-full h-full rounded-2xl bg-neutral-100 flex items-center justify-center border border-neutral-200">
            <Image
              src="/images/expert-portrait.jpg"
              alt="Dr. Sarah Chen, Pet Health Expert"
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Content - Centered on mobile, Right Side on desktop */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <blockquote className="mb-6">
            <p className="text-base md:text-lg font-medium text-black leading-relaxed">
              After 25+ years helping pet owners manage their animals' health, I realized they needed a simple, organized system. That's why I created these tools to give every pet the care documentation they deserve.
            </p>
          </blockquote>

          <div>
            <p className="text-sm font-semibold text-black">Dr. Sarah Chen</p>
            <p className="text-xs text-neutral-600 mt-1">Pet Health Specialist & Founder</p>
          </div>
        </div>
      </div>
    </section>
  )
}
