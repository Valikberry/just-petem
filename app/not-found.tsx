import Link from 'next/link'
import Footer from '@/components/footer'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-10">
        <div className="w-full max-w-[580px] flex flex-col items-center text-center">

          {/* Breadcrumb */}
          <nav className="w-full mb-8 flex justify-start">
            <ol className="flex items-center gap-2 text-sm text-gray-400 font-medium">
              <li>
                <Link href="/tools" className="hover:text-gray-600 transition-colors">
                  Tools
                </Link>
              </li>
              <li className="text-gray-300">/</li>
              <li className="text-gray-500">404</li>
            </ol>
          </nav>

          {/* Illustration area */}
          <div className="relative w-full flex items-center justify-center" style={{ height: '240px', paddingTop: '30px', marginBottom: '15px' }}>

            {/* Decorative placeholder bars */}
            <div
              className="absolute rounded-full bg-[#E5E7EB]"
              style={{ width: '260px', height: '28px', top: '72px', left: '50%', transform: 'translateX(-38%)' }}
            />
            <div
              className="absolute rounded-full bg-[#E5E7EB]"
              style={{ width: '200px', height: '28px', top: '112px', left: '50%', transform: 'translateX(-60%)' }}
            />
            <div
              className="absolute rounded-full bg-[#E5E7EB]"
              style={{ width: '170px', height: '28px', top: '152px', left: '50%', transform: 'translateX(-20%)' }}
            />

            {/* Plus sign decorations */}
            <PlusSign style={{ top: '28px',  left:  '18%' }} size={14} />
            <PlusSign style={{ top: '66px',  left:  '11%' }} size={10} />
            <PlusSign style={{ top: '115px', left:  '21%' }} size={8}  />
            <PlusSign style={{ top: '42px',  right: '20%' }} size={12} />
            <PlusSign style={{ top: '88px',  right: '11%' }} size={8}  />
            <PlusSign style={{ bottom: '42px', left:  '28%' }} size={10} />
            <PlusSign style={{ bottom: '18px', right: '30%' }} size={12} />
            <PlusSign style={{ bottom: '62px', right: '17%' }} size={8}  />

            {/* ── Broken Plugs SVG (Grayscale) ── */}
            <svg
              viewBox="0 0 340 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 w-[300px] h-auto sm:w-[340px]"
              aria-label="Disconnected power plugs illustration"
            >
              {/* LEFT plug cable — curves in from top-left */}
              <path
                d="M 55 8 C 58 45, 82 55, 96 80 C 108 102, 108 112, 108 124"
                stroke="#333333" strokeWidth="5" strokeLinecap="round" fill="none"
              />
              {/* LEFT plug body */}
              <rect x="87" y="122" width="42" height="54" rx="9" fill="white" stroke="#333333" strokeWidth="4" />
              {/* LEFT plug face dome */}
              <ellipse cx="108" cy="140" rx="13" ry="9" fill="#F3F4F6" stroke="#333333" strokeWidth="2.5" />
              {/* LEFT prongs */}
              <rect x="99"  y="174" width="7" height="22" rx="3.5" fill="#333333" />
              <rect x="112" y="174" width="7" height="22" rx="3.5" fill="#333333" />

              {/* RIGHT plug cable — curves in from bottom-right */}
              <path
                d="M 292 214 C 288 178, 266 168, 248 146 C 232 126, 232 115, 232 103"
                stroke="#333333" strokeWidth="5" strokeLinecap="round" fill="none"
              />
              {/* RIGHT plug body (flipped / socket end) */}
              <g transform="translate(210, 44) rotate(178, 22, 27)">
                <rect x="2" y="0" width="42" height="54" rx="9" fill="white" stroke="#333333" strokeWidth="4" />
                {/* socket holes */}
                <rect x="11" y="16" width="8"  height="14" rx="4" fill="#F3F4F6" stroke="#333333" strokeWidth="2" />
                <rect x="27" y="16" width="8"  height="14" rx="4" fill="#F3F4F6" stroke="#333333" strokeWidth="2" />
                {/* face dome */}
                <ellipse cx="23" cy="40" rx="13" ry="9" fill="#F3F4F6" stroke="#333333" strokeWidth="2" />
              </g>

              {/* Gap spark lines between the two plugs (grayscale) */}
              <line x1="152" y1="162" x2="163" y2="150" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="163" y1="168" x2="177" y2="159" stroke="#D1D5DB" strokeWidth="2"   strokeLinecap="round" />
              <line x1="170" y1="175" x2="182" y2="166" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-7xl sm:text-8xl font-bold text-black leading-tight" style={{ fontSize: '96px', marginBottom: '10px', letterSpacing: '-0.02em' }}>
            404
          </h1>

          {/* Subheading */}
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-[480px]" style={{ margin: '0', padding: '0' }}>
            Oops, that page could not be found. The requested page either doesn&apos;t exist or you don&apos;t have access to it.
          </p>

          {/* CTA */}
          <div className="mt-6">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-black text-white font-semibold text-sm
                         hover:bg-gray-800 active:scale-95 transition-all duration-150"
            >
              Back to Tools
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/* ── Helper: small + decoration ── */
function PlusSign({
  style,
  size = 12,
}: {
  style: React.CSSProperties
  size?: number
}) {
  const t = Math.max(1.5, size * 0.18)
  return (
    <svg
      viewBox="0 0 10 10"
      width={size}
      height={size}
      className="absolute pointer-events-none"
      style={style}
      aria-hidden="true"
    >
      <line x1="5" y1="1" x2="5" y2="9" stroke="#D1D5DB" strokeWidth={t} strokeLinecap="round" />
      <line x1="1" y1="5" x2="9" y2="5" stroke="#D1D5DB" strokeWidth={t} strokeLinecap="round" />
    </svg>
  )
}
