# Project URLs Reference - Complete List

## Overview
This document contains a comprehensive list of all accessible URLs/routes within the JustPetem project.

---

## STATIC PAGES (Public Routes)

### Main Navigation
- **`/`** - Homepage (Landing page)
- **`/tools`** - All Tools Hub (Main tools directory)
- **`/blog`** - Blog Listing (All blog posts)
- **`/about`** - About Page
- **`/contact`** - Contact Page
- **`/privacy`** - Privacy Policy Page

---

## DYNAMIC PAGES

### Blog Routes
- **`/blog/[slug]`** - Individual Blog Post (Dynamic route)
  - Example: `/blog/how-to-create-dog-health-records`
  - Parameters: `[slug]` = blog post slug/identifier

---

## TOOLS SECTION ROUTES

### Health Records Tools Hub
- **`/tools/health-records`** - Health Records Main Hub
- **`/tools/pet-health-records`** - Pet Health Records Hub

### Dog Health Records
- **`/tools/dog-health-record-generator`** - Dog Health Record Generator
  - **`/tools/health-records/dog`** - Dog Health Records Detailed View

---

## ERROR PAGES

- **`/not-found`** - 404 Not Found Page (Catch-all for missing routes)
- **Global Error Handler** - `global-error.tsx` (Fallback error page)

---

## DIRECTORY STRUCTURE MAPPING

```
/
├── page.tsx                              → /
├── layout.tsx                            → Root layout wrapper
├── global-error.tsx                      → Global error handler
├── not-found.tsx                         → /not-found (404 page)
│
├── about/
│   └── page.tsx                          → /about
│
├── blog/
│   ├── page.tsx                          → /blog
│   └── [slug]/
│       └── page.tsx                      → /blog/[slug]
│
├── contact/
│   └── page.tsx                          → /contact
│
├── privacy/
│   └── page.tsx                          → /privacy
│
└── tools/
    ├── page.tsx                          → /tools
    ├── dog-health-record-generator/
    │   └── page.tsx                      → /tools/dog-health-record-generator
    ├── pet-health-records/
    │   └── page.tsx                      → /tools/pet-health-records
    └── health-records/
        ├── page.tsx                      → /tools/health-records
        └── dog/
            ├── page.tsx                  → /tools/health-records/dog
            └── components/               → (Internal components only)
                ├── DogHealthRecord.tsx
                └── DogHealthRecordDocument.tsx
```

---

## COMPONENT-ONLY FILES (NOT Routable)

These are reusable components and utilities that are imported into pages but do NOT create their own routes:

### Layout Components
- `components/page-header.tsx` - Header component used on all pages
- `components/footer.tsx` - Footer component
- `components/theme-provider.tsx` - Theme provider wrapper

### UI Components Library
- `components/ui/` - 60+ shadcn/ui components (buttons, cards, dialogs, forms, etc.)

### Feature Components
- `components/expert-credibility.tsx` - Credibility section component

---

## API ROUTES

**Status:** No API routes currently defined in the project.
- No `/api/` directory found
- All data handling appears to be client-side or handled via external integrations

---

## DYNAMIC ROUTE PARAMETERS

### Blog Routes
| Route | Parameter | Type | Example |
|-------|-----------|------|---------|
| `/blog/[slug]` | `slug` | string | `how-to-prepare-dog-health-records` |

---

## COMPLETE URL LIST (Quick Reference)

### Public URLs
1. `/` - Homepage
2. `/tools` - Tools Hub
3. `/tools/pet-health-records` - Pet Health Records Hub
4. `/tools/health-records` - Health Records Hub
5. `/tools/dog-health-record-generator` - Dog Generator
6. `/tools/health-records/dog` - Dog Health Records
7. `/blog` - Blog Listing
8. `/blog/[slug]` - Individual Blog Posts (dynamic)
9. `/about` - About Page
10. `/contact` - Contact Page
11. `/privacy` - Privacy Policy
12. `/not-found` - 404 Error Page

---

## NAVIGATION HIERARCHY

```
Home (/)
├── Tools (/tools)
│   ├── Pet Health Records (/tools/pet-health-records)
│   ├── Health Records (/tools/health-records)
│   │   └── Dog Records (/tools/health-records/dog)
│   └── Dog Generator (/tools/dog-health-record-generator)
├── Blog (/blog)
│   └── Individual Posts (/blog/[slug])
├── About (/about)
├── Contact (/contact)
└── Privacy (/privacy)
```

---

## NOTES

- All pages include the **PageHeader component** (except homepage)
- All pages use consistent header with "JustPetem" logo
- Breadcrumb navigation: "Home / [Page Name]"
- Footer component appears on all pages
- The project uses Next.js 16 App Router with dynamic routes
- No API routes defined (backend functionality not visible in this structure)

---

**Last Updated:** 2026-04-16
**Project:** JustPetem Pet Health Records
