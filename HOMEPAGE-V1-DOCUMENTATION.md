# JustPetem Homepage V1 - Complete Documentation

> **Version**: 1.0 (Locked)  
> **Last Updated**: April 2026  
> **Purpose**: Reference document for homepage structure, SEO optimization, and code patterns

---

## Table of Contents

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Design System](#design-system)
4. [SEO Implementation](#seo-implementation)
5. [Component Architecture](#component-architecture)
6. [Code Reference](#code-reference)
7. [Customization Guide](#customization-guide)

---

## Overview

### What This Page Does
- **Hero section** with personal branding (avatar, name, tagline, body copy)
- **Primary CTA** button linking to tools page
- **Newsletter signup** with email verification flow
- **Full SEO optimization** with JSON-LD structured data

### Visual Layout
```
[Black background with dot pattern]
    ┌─────────────────────────────┐
    │      [Avatar with ring]      │
    │       Sarah Bennett 🐾       │
    │  Pet Health Specialist...    │
    │                              │
    │   Body copy about JustPetem  │
    │                              │
    │    [Access Free Tools]       │
    └─────────────────────────────┘
    ┌─────────────────────────────┐
    │ 📬 Stay in the loop         │
    │ [email input] [Subscribe]    │
    └─────────────────────────────┘
```

---

## File Structure

```
app/
├── layout.tsx      # Root layout with metadata (SEO tags)
├── page.tsx        # Homepage component with JSON-LD schema
├── globals.css     # Global styles and Tailwind config
└── tools/
    └── page.tsx    # Tools page (CTA destination)
```

---

## Design System

### Colors
| Usage | Value | Tailwind Class |
|-------|-------|----------------|
| Background | Black | `bg-black` |
| Card Background | Light gray | `bg-[#f3f3f3]` |
| Primary CTA | Green | `bg-[#22c55e]` hover:`bg-[#16a34a]` |
| Secondary CTA | Orange | `bg-[#f97316]` hover:`bg-[#ea580c]` |
| Text Primary | Black | `text-black` |
| Text Secondary | Black 60% | `text-black/60` |
| Text Body | Black 85% | `text-black/85` |
| Avatar Ring | Green gradient | `from-green-400 to-green-600` |

### Typography
| Element | Size | Weight | Class |
|---------|------|--------|-------|
| H1 (Name) | 28px | Bold | `text-2xl sm:text-[28px] font-bold` |
| Tagline | 13px | Medium | `text-[13px] font-medium` |
| Body Copy | 15px | Medium | `text-sm sm:text-[15px] font-medium` |
| Button | 16px | Semibold | `text-base font-semibold` |

### Spacing
- Card padding: `py-6 px-6 sm:py-7`
- Card gap: `gap-3`
- Card border radius: `rounded-3xl` (hero), `rounded-2xl` (newsletter)
- Button height: `h-12` (primary), `h-10` (secondary)

### Visual Effects
- Dot pattern overlay: `radial-gradient(circle, white 1px, transparent 1px)` at `28px 28px`
- Dot opacity: `opacity-20`

---

## SEO Implementation

### Meta Tags (layout.tsx)

```typescript
export const metadata: Metadata = {
  // Primary
  title: 'Free Pet Health Tools & Trackers | JustPetem',
  description: 'Free practical pet health tools for pet owners...',
  
  // Keywords
  keywords: ['free pet health tools', 'pet health record', ...],
  
  // Authorship
  authors: [{ name: 'JustPetem' }],
  creator: 'JustPetem',
  publisher: 'JustPetem',
  
  // Indexing
  robots: { index: true, follow: true },
  
  // Canonical
  metadataBase: new URL('https://justpetem.com'),
  alternates: { canonical: '/' },
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://justpetem.com',
    siteName: 'JustPetem',
    title: '...',
    description: '...',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: '...',
    description: '...',
    images: ['/og-image.png'],
  },
}
```

### JSON-LD Schema (page.tsx)

The page includes structured data for:

1. **Organization** - Brand entity
2. **WebSite** - Site-level info with SearchAction
3. **WebPage** - Page-specific metadata
4. **FAQPage** - FAQ rich results

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://justpetem.com/#organization",
      "name": "JustPetem",
      "url": "https://justpetem.com",
      "description": "...",
      "logo": { "@type": "ImageObject", "url": "https://justpetem.com/logo.png" }
    },
    {
      "@type": "WebSite",
      "@id": "https://justpetem.com/#website",
      "url": "https://justpetem.com",
      "name": "JustPetem",
      "publisher": { "@id": "https://justpetem.com/#organization" },
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
      "name": "Free Pet Health Tools & Trackers | JustPetem",
      "description": "...",
      "isPartOf": { "@id": "https://justpetem.com/#website" },
      "about": { "@id": "https://justpetem.com/#organization" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are these tools really free?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free..." }
        },
        // ... more FAQs
      ]
    }
  ]
}
```

### SEO Checklist

- [x] Title tag with primary keyword + brand
- [x] Meta description with value proposition
- [x] Keywords array
- [x] Canonical URL
- [x] Open Graph tags (title, description, image, url, site_name)
- [x] Twitter Card tags
- [x] JSON-LD Organization schema
- [x] JSON-LD WebSite schema with SearchAction
- [x] JSON-LD WebPage schema
- [x] JSON-LD FAQPage schema
- [x] Descriptive image alt text
- [x] Semantic HTML (main, h1)
- [x] robots: index, follow
- [x] theme-color meta

---

## Component Architecture

### State Management
```typescript
const [email, setEmail] = useState("")
const [step, setStep] = useState<"email" | "verify" | "subscribed">("email")
const [isLoading, setIsLoading] = useState(false)
const [code, setCode] = useState("")
```

### Newsletter Flow
1. **email** - Initial state, shows email input
2. **verify** - After submit, shows code verification
3. **subscribed** - After verification, shows success message

### Component Structure
```
<>
  <Script id="json-ld" />
  <main>
    <div className="dot-pattern" />
    <div className="container">
      <div className="hero-card">
        <Image /> (avatar)
        <h1 /> (name)
        <p /> (tagline)
        <p /> (body copy)
        <Button /> (CTA)
      </div>
      <div className="newsletter-card">
        {conditional rendering based on step}
      </div>
    </div>
  </main>
</>
```

---

## Code Reference

### Full page.tsx Structure

```typescript
"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// JSON-LD structured data
const jsonLd = { /* ... */ }

export default function HomePage() {
  // State
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"email" | "verify" | "subscribed">("email")
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState("")

  // Handlers
  const handleSubscribe = async (e: React.FormEvent) => { /* ... */ }
  const handleVerify = async (e: React.FormEvent) => { /* ... */ }

  return (
    <>
      <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-black flex items-center justify-center p-4 relative">
        {/* Dot pattern */}
        {/* Container */}
        {/* Hero Card */}
        {/* Newsletter Card */}
      </main>
    </>
  )
}
```

---

## Customization Guide

### To Adapt for Another Niche

1. **Update SEO in layout.tsx:**
   - Change `title` to `[Your Keyword] | [Brand]`
   - Update `description` with your value proposition
   - Replace `keywords` array
   - Update `metadataBase` URL
   - Replace `og:image` path

2. **Update JSON-LD in page.tsx:**
   - Change Organization name, url, description
   - Update WebSite name and SearchAction target
   - Update WebPage name and description
   - Modify FAQ questions/answers for your niche

3. **Update Visual Content:**
   - Replace avatar image `src`
   - Update avatar `alt` text
   - Change H1 name
   - Update tagline
   - Modify body copy
   - Change CTA link destination

4. **Update Colors (if needed):**
   - Primary CTA: `bg-[#22c55e]` (green)
   - Secondary CTA: `bg-[#f97316]` (orange)
   - Avatar ring: `from-green-400 to-green-600`

### Required Assets
- `/og-image.png` (1200x630px) - Social sharing image
- `/logo.png` - Brand logo for schema
- `/icon-light-32x32.png` - Favicon (light mode)
- `/icon-dark-32x32.png` - Favicon (dark mode)
- `/icon.svg` - SVG favicon
- `/apple-icon.png` - Apple touch icon
- Avatar image (external URL or local)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | April 2026 | Initial locked version with full SEO |

---

**This document serves as the complete reference for rebuilding or customizing the JustPetem homepage.**
