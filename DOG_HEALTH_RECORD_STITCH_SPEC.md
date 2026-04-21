# Dog Health Record Document - Stitch Design Specification

## Overview
This document specifies the exact layout constraints, dimensions, and design system for the Dog Health Record template. This spec is designed for use with Stitch AI to create a design that can be injected directly into the web application.

---

## 1. DOCUMENT CONTAINER DIMENSIONS

### Desktop View (Live Preview)
- **Container Width**: 794px (A4 standard)
- **Max Width**: 794px (pinned)
- **Padding**: 16px (p-4) on all sides
- **Inner Content Width**: 762px (794px - 32px padding)
- **Inner Content Height**: Flexible/scrollable
- **Border Radius**: 8px (rounded-lg)
- **Background**: White (#FFFFFF)
- **Border**: 1px solid #E2E8F0 (slate-200)
- **Shadow**: None (or light shadow for web context)

### Mobile View (Live Preview)
- **Container Width**: 100% of viewport (with 16px padding)
- **Max Width**: 580px (typical mobile max-width)
- **Padding**: 16px (p-4) on mobile, 24px (p-6) on md+
- **Inner Content Width**: 548px (580px - 32px padding)
- **Responsive Breakpoint**: 768px (md:)

### Print/PDF View (Hidden Render)
- **Container Width**: 794px (A4 standard width)
- **Print Padding**: 24px on all sides
- **Safe Content Area**: 746px (794px - 48px print padding)
- **Paper Size**: A4 (210mm × 297mm)
- **Position**: Fixed absolute positioning during print
- **Visibility**: Hidden from DOM until print action triggered
- **Background**: White (#FFFFFF) - no padding background

---

## 2. DOCUMENT STRUCTURE & SECTIONS

### Header Section
- **Height**: ~80px (flexible)
- **Layout**: Flex column, items-start
- **Spacing**: gap-4

**Elements:**
1. **Title**
   - Font Size: 22px - 24px
   - Font Weight: Bold (700)
   - Line Height: 1.2
   - Letter Spacing: -0.02em
   - Margin Bottom: 12px (mb-3)
   - Text: "Dog Health Record" or variant-based title
   - Color: Slate-900 (#0F172A)

2. **Subtitle** (conditional by variant)
   - Font Size: 12px
   - Font Weight: 500
   - Color: Slate-500 (#64748B)
   - Text: "Printable owner summary" or "Printable clinic summary"
   - Display: Only for variants A, B, E, F

3. **Photo Container** (top-right, positioned absolutely or in flex row)
   - Position: Top right of header
   - Dimensions: Variant-dependent
     - Variant A: 64px × 64px, border-radius-full
     - Variant B: 176px × 176px, border-radius-none
     - Variant C: 64px × 64px, border-radius-md
     - Variant D: 80px × 80px, border-radius-xl (2px border, amber-600)
     - Variant E: 144px × 144px, border-radius-2xl
     - Variant F: 80px × 80px, border-radius-xl (2px border, slate-500)
     - Variant G: 64px × 64px, border-radius-full
   - Background: Slate-100 (#F1F5F9)
   - Object Fit: cover
   - Fallback: "No photo" text (12px, slate-400)

---

## 3. CONTENT AREA STRUCTURE (Main Body)

### Wrapper
- **Padding**: 16px (p-4) on mobile, 20px (p-5) on md+
- **Gap**: 20px (space-y-5)
- **Background**: White
- **Layout**: Flex column

### Standard Section Block
- **Margin Bottom**: 20px (space-y-5)
- **Padding**: 16px (p-4)
- **Border Radius**: 8px - 12px (rounded-lg to rounded-xl)
- **Border**: 1px solid #E2E8F0 (slate-200)
- **Background**: White

---

## 4. TYPOGRAPHY SYSTEM

### Heading Styles
- **Large Title** (24px): font-bold, tracking-tight, text-slate-900
- **Medium Title** (20px): font-bold, tracking-tight, text-slate-900
- **Small Title** (16px): font-bold, text-slate-900
- **Label/Header** (12px): font-bold, uppercase, tracking-[0.12em], text-slate-500

### Body Text
- **Primary Body** (14px): font-normal, text-slate-900
- **Secondary Body** (13px): font-normal, text-slate-600
- **Small Text** (12px): font-normal, text-slate-500
- **Minimum Text** (11px): font-normal, text-slate-400

### Line Heights
- **Headings**: 1.2
- **Body**: 1.5 (leading-relaxed)
- **Dense**: 1.4

### Letter Spacing
- **Tight**: -0.02em (headings)
- **Normal**: 0
- **Relaxed**: 0.08em
- **Section Headers**: 0.12em - 0.18em (uppercase text)

---

## 5. SPACING & GRID SYSTEM

### Base Unit: 4px (Tailwind spacing)
- **Mobile Padding**: 16px (p-4) = 4 units
- **Section Padding**: 16px-20px (p-4 to p-5) = 4-5 units
- **Gap Between Elements**: 12px-20px (space-y-3 to space-y-5)

### Section Spacing
- **Between Sections**: 20px (space-y-5)
- **Between Fields**: 12px (space-y-3)
- **Between Rows**: 12px-16px
- **List/Item Gap**: 8px-12px

### Mobile vs Desktop
- **Mobile**: Tighter spacing (12px-16px)
- **Desktop (md+)**: Standard spacing (16px-20px)
- **Print**: Print padding 24px on all sides

---

## 6. COLOR PALETTE

### Primary Colors
- **Slate-900**: #0F172A (text, dark elements)
- **Slate-800**: #1E293B (secondary text)
- **Slate-700**: #334155 (tertiary text)
- **Slate-600**: #475569 (body text)
- **Slate-500**: #64748B (labels, secondary)
- **Slate-400**: #94A3B8 (borders, dividers)
- **Slate-300**: #CBD5E1 (light borders)
- **Slate-200**: #E2E8F0 (card borders)
- **Slate-100**: #F1F5F9 (backgrounds)
- **Slate-50**: #F8FAFC (light backgrounds)

### Accent Colors
- **Emerald-500**: #10B981 (success, status)
- **Amber-600**: #D97706 (warning)
- **Red-500**: #EF4444 (error/critical)
- **Blue-500**: #3B82F6 (information)
- **Cyan-50**: #CFFAFE (row backgrounds)

### Section Header Colors
- **Dark Backgrounds**: Slate-900, Indigo-900, etc.
- **Text on Dark**: White (#FFFFFF)
- **Light Backgrounds**: Slate-50, Cyan-50, Orange-50, Pink-50

---

## 7. TABLE SPECIFICATIONS

### Table Wrapper
- **Width**: 100%
- **Border Collapse**: collapse
- **Font Size**: 14px (text-sm)
- **Overflow**: x-auto (on mobile for horizontal scroll)

### Table Header (thead)
- **Background**: Indigo-900 (#312E81) or Slate-900
- **Text Color**: White (#FFFFFF)
- **Padding**: 12px (px-3 py-3)
- **Font Size**: 11px (text-[11px])
- **Font Weight**: Bold (700)
- **Text Transform**: Uppercase
- **Letter Spacing**: 0.14em (tracking-[0.14em])
- **Border**: 1px solid #CBD5E1 (slate-300)

### Table Body (tbody)
- **Row Padding**: 12px (px-3 py-3)
- **Border**: 1px solid #CBD5E1 (slate-300)
- **Background Alternating**: 
  - Cyan-50 (#CFFAFE) for idx % 3 === 0
  - Orange-50 (#FFEDD5) for idx % 3 === 1
  - Pink-50 (#FCE7F3) for idx % 3 === 2
- **Text Color**: Slate-900 (#0F172A)
- **Font Size**: 14px

### Cell Specifications
- **Min Height**: 40px (min-h-10)
- **Padding**: 12px horizontal (px-3)
- **Vertical Align**: center

---

## 8. FORM FIELD SPECIFICATIONS

### Label
- **Font Size**: 11px (text-[11px])
- **Font Weight**: Bold (700)
- **Text Transform**: Uppercase
- **Letter Spacing**: 0.12em (tracking-[0.12em])
- **Color**: Slate-500 (#64748B)
- **Margin Bottom**: 4px (mb-1)

### Input Field
- **Min Height**: 24px (min-h-6)
- **Border Bottom**: 1px solid #CBD5E1 (slate-300)
- **Border Radius**: 0 (no radius for underline style)
- **Padding**: 0 (no padding on underline fields)
- **Font Size**: 14px (text-sm)
- **Color**: Slate-900 (#0F172A)
- **Background**: Transparent
- **Focus State**: Border color change to slate-400

### Field Group Spacing
- **Between Fields**: 12px (space-y-3)
- **Between Groups**: 20px (space-y-5)

---

## 9. CARD COMPONENT SPECIFICATIONS

### Card Container
- **Border**: 1px - 2px solid #E2E8F0 (slate-200) or #64748B (slate-500)
- **Border Radius**: 8px (rounded-lg) to 20px (rounded-[20px])
- **Padding**: 16px (p-4)
- **Background**: White (#FFFFFF) or Slate-50 (#F8FAFC)
- **Gap**: 12px (space-y-3 between fields)

### Card Header
- **Font Size**: 14px - 16px (text-base)
- **Font Weight**: Bold (700)
- **Text Align**: center (text-center)
- **Color**: Slate-700 (#334155) or Slate-900
- **Margin Bottom**: 12px (mb-3)

---

## 10. SECTION HEADER (Dark Bars)

### Section Header Container
- **Background**: Slate-900 (#0F172A)
- **Text Color**: White (#FFFFFF)
- **Padding**: 12px 12px (px-3 py-2)
- **Border Radius**: 9999px (rounded-full)
- **Font Size**: 11px (text-[11px])
- **Font Weight**: Bold (700)
- **Text Transform**: Uppercase
- **Letter Spacing**: 0.18em (tracking-[0.18em])
- **Margin Bottom**: 12px (mb-3)

---

## 11. RESPONSIVE BEHAVIOR

### Breakpoints
- **Mobile**: < 768px (default)
- **Tablet (md)**: 768px+
- **Desktop (lg)**: 1024px+

### Mobile Adjustments
1. **Padding**: 16px (p-4) instead of 20px (p-5)
2. **Gap**: Reduced by 4px
3. **Font Sizes**: Use -1 size on mobile if needed
4. **Tables**: Add horizontal scroll container (overflow-x-auto)
5. **Columns**: Stack to 1 column layout
6. **Photo Size**: Reduce by 20-30% on mobile

### Desktop Adjustments
1. **Padding**: 20px (p-5) or 24px (p-6)
2. **Gap**: Increased spacing
3. **Columns**: Multi-column layouts (e.g., md:grid-cols-2)
4. **Max Width**: Locked at 794px for printing

---

## 12. GRID LAYOUTS

### Two-Column Grid (Desktop)
```
grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5
```
- **Mobile**: 1 column
- **Desktop**: 2 columns
- **Gap**: 16px mobile, 20px desktop

### Three-Column Grid (Variant C - Vaccines)
```
grid grid-cols-2 gap-3
```
- **Mobile**: 2 columns
- **Desktop**: 2-3 columns (vaccine cards side by side)
- **Gap**: 12px

---

## 13. BORDER & DIVIDER SPECIFICATIONS

### Section Divider
- **Type**: Horizontal line
- **Color**: #CBD5E1 (border-slate-300) or #E2E8F0 (slate-200)
- **Width**: 1px
- **Margin**: 12px-16px top/bottom

### Card Border
- **Color**: #E2E8F0 (slate-200) or #64748B (slate-500)
- **Width**: 1px - 2px
- **Radius**: 8px - 12px

### Field Underline (Form Fields)
- **Color**: #CBD5E1 (slate-300)
- **Width**: 1px
- **Height**: Bottom border only

---

## 14. PRINT SPECIFICATIONS

### Print Sheet Dimensions
- **Width**: 794px (A4 standard)
- **Paper Size**: A4 (210mm × 297mm)
- **Print Padding**: 24px (1 inch margin on all sides)
- **Safe Content Area**: 746px × 249mm (794px - 48px padding)

### Print Styles
```css
@media print {
  body * {
    visibility: hidden;
  }
  .print-sheet,
  .print-sheet * {
    visibility: visible;
  }
  .print-sheet {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: white;
    padding: 24px;
    margin: 0;
  }
}
```

### Print Page Break Rules
- **Avoid Break Inside**: Add `break-inside: avoid;` to sections
- **Page Breaks**: Not enforced in current design (single-page layout)
- **Margins**: 1 inch (24px) on all sides for standard printing

### Print Colors
- **Use**: Only solid colors (no gradients)
- **Text**: Black (#000000) or very dark colors
- **Backgrounds**: Light grays or whites only
- **Avoid**: Yellow, light colors (hard to print)

---

## 15. VARIANT-SPECIFIC OVERRIDES

### Variant A (Minimal)
- **Title**: Italic (italic class)
- **Title Font Size**: 22px
- **Photo Size**: 64px × 64px, rounded-full
- **Layout**: Compact, minimal spacing

### Variant B (Large Photo)
- **Photo Size**: 176px × 176px
- **Photo Position**: Full width at top
- **Layout**: Photo-first design

### Variant C (Colorful Table)
- **Section Headers**: Colored backgrounds (blue, orange, pink)
- **Table Rows**: Alternating colored backgrounds (cyan, orange, pink)
- **Header Text Color**: White on colored backgrounds

### Variant D (Compact)
- **Title Font Size**: 20px
- **Header Style**: Rounded-full dark background
- **Layout**: Dense, vertical stack
- **Max Width Inner**: 448px (max-w-md)

### Variant E (Right-Aligned Photo)
- **Grid**: Two-column (1fr 170px)
- **Photo**: Right-aligned, 150px × 150px
- **Card Background**: Slate-50
- **Card Border Radius**: 20px

### Variant F (Card-Based)
- **Card Borders**: 2px solid slate-500
- **Card Spacing**: space-y-3
- **Title**: text-base font-bold
- **Layout**: Vertically stacked cards

### Variant G (Amber Theme)
- **Title Color**: Amber-700 (#B45309)
- **Title Font**: 22px medium weight
- **Section Headers**: Amber-700 text
- **Accents**: Amber colors throughout

---

## 16. INSTRUCTIONS FOR STITCH

### Export Format
- **Export as**: React/JSX component
- **Component Name**: DogHealthRecordDocument
- **Props to Accept**:
  - `form`: object with dog, owner, vet, vaccination data
  - `variant`: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  - `mode`: 'owner' | 'clinic'
  - `printMode`: boolean

### Integration Points
1. **Container**: Must support max-width 794px
2. **Photo**: Must accept image URL via form.photoUrl
3. **Data Binding**: Map form fields to display areas
4. **Responsive**: Must work at 580px mobile to 1024px desktop
5. **Print**: Must render cleanly when print action triggered

### CSS Requirements
- Use Tailwind CSS classes where possible
- Support dark borders (slate-500, slate-900)
- Support light backgrounds (slate-50, cyan-50)
- Include all color variants mentioned above
- Ensure print-friendly colors (no light yellows, etc.)

### No External Dependencies
- Avoid: React icons, external libraries
- Use: Inline SVG or emoji for icons
- Use: Native HTML table, div elements

---

## 17. QUALITY CHECKLIST

Before finalizing Stitch design, verify:
- [ ] Container width is exactly 794px for desktop
- [ ] Print padding is 24px on all sides
- [ ] Mobile max-width is 580px
- [ ] All typography sizes and weights match spec
- [ ] All colors use the specified hex codes or Tailwind classes
- [ ] Spacing (gaps, padding) matches the 4px grid
- [ ] Table styling includes proper borders and alternating row colors
- [ ] Form fields have underline-only borders
- [ ] Section headers have dark background with white text
- [ ] Photo containers match variant-specific dimensions
- [ ] Responsive breakpoints at 768px work correctly
- [ ] Print styles hide everything except .print-sheet
- [ ] All variants (A-G) render with their specific overrides

---

## 18. INJECTION INSTRUCTIONS

Once Stitch design is complete:

1. **Export the component** as a React JSX file
2. **Place file** at: `/app/tools/health-records/dog/components/DogHealthRecordPreview.tsx`
3. **Update imports** in main page.tsx to use new component
4. **Replace current PreviewSection** with new Stitch-designed component
5. **Map form data** to component props
6. **Test all variants** A-G in live preview
7. **Test print** functionality to ensure PDF output
8. **Test mobile** responsiveness at 375px, 768px, 1024px

---

## Notes
- This spec is designed for exact replication in Stitch
- All measurements are in pixels (px) for web, with print equivalents
- Maintain 1:1 pixel accuracy for production-ready design
- Consider future scalability for adding more document types
