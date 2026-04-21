"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"

const CATEGORIES = ["All", "Health Records", "Vaccination", "Contracts", "Pet Travel", "Sitter Tips", "Pet Stories"]

const BLOG_POSTS = [
  {
    id: 1,
    title: "What Should Be in a Dog Health Record",
    description: "Everything vets and sitters need, covered in one document.",
    category: "Health Records",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
    url: "/blog/what-should-be-in-a-dog-health-record",
  },
  {
    id: 2,
    title: "How to Keep Your Cat Vaccination Records Organised",
    description: "A simple system that works even if you switch vets.",
    category: "Vaccination",
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800",
    url: "/blog/how-to-keep-cat-vaccination-records",
  },
  {
    id: 3,
    title: "Do You Need a Contract for Pet Sitting",
    description: "What to include and why it protects both sides.",
    category: "Contracts",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800",
    url: "/blog/do-you-need-pet-sitting-contract",
  },
  {
    id: 4,
    title: "Travelling Internationally With Your Dog",
    description: "Health documents, vaccination proof, and what customs actually checks.",
    category: "Pet Travel",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800",
    url: "/blog/travelling-internationally-with-your-dog",
  },
  {
    id: 5,
    title: "What Your Pet Sitter Needs Before You Leave",
    description: "The one document that covers everything your sitter needs to know.",
    category: "Sitter Tips",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
    url: "/blog/what-your-pet-sitter-needs",
  },
  {
    id: 6,
    title: "My Vet Asked for Vaccination Records and I Had Nothing",
    description: "What happened and the system I built so it never happens again.",
    category: "Pet Stories",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800",
    url: "/blog/vet-asked-for-vaccination-records",
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const displayedPosts = selectedCategory === "All" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === selectedCategory)

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
          <span className="text-sm text-neutral-900 font-medium">Blog</span>
        </div>
        
        {/* Hero Section */}
        <section className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-black leading-tight">
            Pet Care Guides and Real Owner Stories
          </h1>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-normal">
            Practical guides, health tips, and real experiences from pet owners and carers.
          </p>
        </section>

        {/* Category Filter */}
        <section className="mb-10">
          <div className="-mx-4 overflow-x-auto px-4 scrollbar-none">
            <div className="flex gap-2 pb-1">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="mb-10">
          <div className="grid grid-cols-2 gap-4">
            {displayedPosts.map((post) => (
              <Link
                key={post.id}
                href={post.url}
                className="group rounded-lg overflow-hidden border border-neutral-200 hover:border-neutral-300 transition-colors"
              >
                {/* Post Image */}
                <div className="relative w-full h-[180px] overflow-hidden bg-neutral-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={260}
                    height={180}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                  />
                </div>
                
                {/* Post Content */}
                <div className="p-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                    {post.category}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-black line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-600 line-clamp-1">
                    {post.description}
                  </p>
                  <p className="mt-2 text-xs font-medium text-neutral-700 group-hover:text-black transition-colors">
                    Read More →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Pet Document Generators */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-black">Related Pet Document Generators</h2>
          
          <div className="space-y-3">
            <Link href="/tools/pet-vaccination-records" className="block p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
              <p className="text-sm font-semibold text-black">Pet Vaccination Record Generator</p>
              <p className="text-xs text-neutral-600 mt-1">Track vaccine dates and upcoming due dates for any pet.</p>
            </Link>
            
            <Link href="/tools/pet-sitter-notes" className="block p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
              <p className="text-sm font-semibold text-black">Pet Sitter Notes Generator</p>
              <p className="text-xs text-neutral-600 mt-1">Give your sitter everything they need before you leave.</p>
            </Link>
            
            <Link href="/tools/pet-emergency-card" className="block p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
              <p className="text-sm font-semibold text-black">Pet Emergency Card Generator</p>
              <p className="text-xs text-neutral-600 mt-1">Keep critical pet info ready for any emergency.</p>
            </Link>
            
            <Link href="/tools/pet-medication-tracker" className="block p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
              <p className="text-sm font-semibold text-black">Pet Medication Tracker Generator</p>
              <p className="text-xs text-neutral-600 mt-1">Log medications, dosage, and refill schedules in one place.</p>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
