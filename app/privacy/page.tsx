import Footer from "@/components/footer"
import Link from "next/link"
import PageHeader from "@/components/page-header"

export const metadata = {
  title: "Privacy Policy | JustPetem",
  description: "Our privacy policy - how we collect and protect your information.",
}

export default function PrivacyPage() {
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
          <span className="text-sm text-neutral-900 font-medium">Privacy</span>
        </div>
        
        {/* Header Section */}
        <section className="mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-2">
            Privacy Policy
          </p>
          <h1 className="text-4xl font-bold text-black mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Last updated April 2026
          </p>
        </section>

        {/* Content Section */}
        <section className="space-y-6 mb-10">
          
          <div>
            <p className="text-sm font-semibold text-black mb-2">
              Information We Collect
            </p>
            <p className="text-base leading-relaxed text-neutral-700 font-normal">
              JustPetem is a free pet document generator. This page explains what information we collect, how we use it, and how we protect it. When you use our generators we do not require you to create an account or provide personal information. All information you enter into the generator stays on your device unless you choose to download or email your document.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-black mb-2">
              Contact Information
            </p>
            <p className="text-base leading-relaxed text-neutral-700 font-normal">
              If you contact us by email or through our contact form we collect your name and email address to respond to your enquiry. We do not add you to any mailing list without your explicit consent. We use standard web analytics to understand how visitors use the site. This includes pages visited, time spent on pages, and device type. No personally identifiable information is collected through analytics.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-black mb-2">
              Cookies
            </p>
            <p className="text-base leading-relaxed text-neutral-700 font-normal">
              JustPetem uses cookies to improve your experience on the site. By continuing to use the site you agree to our use of cookies. You can disable cookies in your browser settings at any time.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-black mb-2">
              How We Use Your Information
            </p>
            <p className="text-base leading-relaxed text-neutral-700 font-normal">
              We use the information we collect to improve the site and respond to enquiries. We do not sell, rent, or share your personal information with third parties for marketing purposes.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-black mb-2">
              Data Storage
            </p>
            <p className="text-base leading-relaxed text-neutral-700 font-normal">
              Documents you generate are not stored on our servers. Your pet's information exists only in your browser session and in any files you choose to download. We do not have access to the information you enter into our generators.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-black mb-2">
              Third Party Links
            </p>
            <p className="text-base leading-relaxed text-neutral-700 font-normal">
              JustPetem may contain links to third party websites. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies directly.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-black mb-2">
              Children
            </p>
            <p className="text-base leading-relaxed text-neutral-700 font-normal">
              JustPetem is not directed at children under the age of 13. We do not knowingly collect personal information from children.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-black mb-2">
              Changes to This Policy
            </p>
            <p className="text-base leading-relaxed text-neutral-700 font-normal">
              We may update this policy from time to time. The date at the top of this page will reflect the most recent update. Continued use of the site after changes are posted means you accept the updated policy.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-black mb-2">
              Contact
            </p>
            <p className="text-base leading-relaxed text-neutral-700 font-normal">
              If you have questions about this privacy policy contact us at hello@justpetem.com
            </p>
          </div>

        </section>
      </div>
      <Footer />
    </div>
  )
}
