# DOG HEALTH RECORDS PAGE - COMPLETE DESIGN SPECIFICATION

## PAGE OVERVIEW
This is a multi-step dog health record generator form that allows users to fill in pet information step-by-step and download a printable PDF. The page has two modes (Pet Owner or Clinic) with different form flows.

---

## PAGE STRUCTURE & LAYOUT

### OUTER CONTAINER
```
Wrapper: Fragment (<>...</>)
  └─ Return statement wraps everything
      ├─ Style tag (print CSS)
      └─ Main container: <main> tag
```

### MAIN CONTAINER SPECS
- **Tag**: `<main>`
- **Min-height**: Full screen (bg-stone-100 - light stone gray background)
- **Padding**: 
  - Mobile (sm): px-4 py-6
  - Desktop (md): px-6 py-8
- **Background Color**: `bg-stone-100` (light beige/tan)

---

## PAGE HEADER SECTION (Fixed at Top)

### Header Component
- **Component**: `<PageHeader />`
- **Position**: Very top of page
- **Styling**: Built-in component with minimal header styling
- **Content**: "JustPetem" logo/title

### Header Styling Details
- Has a border-bottom separator line
- Very tight padding (compact)
- Responsive sizing on text

---

## BREADCRUMB NAVIGATION

### Breadcrumb Location
Inside the main content area, immediately after PageHeader

### Breadcrumb Structure
```
<div className="mb-6 flex items-center gap-2">
  <Link href="/tools">Tools</Link>
  <span>/</span>
  <span>Dog Health Record</span>
</div>
```

### Breadcrumb Styling
- **Margin-bottom**: mb-6 (creates 24px gap before next section)
- **Display**: Flex with items-center
- **Gap between items**: gap-2 (8px)
- **First link (Tools)**: text-sm text-neutral-600 with hover state
- **Separator**: text-neutral-400 (light gray slash)
- **Current page text**: text-sm font-medium text-neutral-900 (bold dark text)

---

## MAIN CONTENT WRAPPER

### Wrapper Container
```
<div className="mx-auto w-full max-w-[580px]">
  ... all sections go inside this ...
</div>
```

### Wrapper Specs
- **Margin**: mx-auto (centers horizontally)
- **Width**: w-full (100% on mobile)
- **Max-width**: max-w-[580px] (580px max - standard reading width)
- **This contains**: All 4 main sections below

---

## 4 MAIN SECTIONS (Inside Wrapper)

### 1. HEADER SECTION (HeaderSection Component)
**Location**: First inside wrapper
**Container**: `<section className="text-center">`

**Content Order**:
1. **Main Title**
   - Text: "Free Dog Health Record Generator"
   - Classes: text-3xl sm:text-4xl font-bold text-black leading-tight
   - Size increases on larger screens

2. **Subtitle**
   - Text: "Answer a few questions about your dog. Get a complete, printable health record instantly."
   - Classes: mt-3 text-sm text-neutral-600 leading-relaxed font-normal
   - Light gray color, normal weight

3. **Trust Indicators Row**
   - Margin-top: mt-4
   - Display: flex flex-wrap justify-center gap-4
   - 3 bullet point items displayed horizontally and centered
   - Text-size: text-xs (very small)
   - Each item: "• [stat]"

**Trust Indicators Content**:
- "6,000+ records generated"
- "4,200+ downloads"
- "100% free, no account needed"

---

### 2. CONTROLS SECTION (ControlsSection Component)
**Location**: After HeaderSection
**Container**: `<section className="mt-6 flex items-center justify-between gap-4">`

**Margin-top**: mt-6 (24px from previous section)

**Content**: 
- Mode toggle buttons (Owner / Clinic)
- Design variant preview selector (A-G options)
- Both aligned horizontally with gap-4 (16px between)

---

### 3. WIZARD SECTION (WizardSection Component)
**Location**: After ControlsSection
**Purpose**: Multi-step form that progresses through 20 steps

**Contains**:
- Current step form field
- Progress bar showing step completion
- Next/Previous buttons
- Input fields (text, date, select, file upload, checkboxes, textarea)

---

### 4. PREVIEW SECTION (PreviewSection Component)
**Location**: After WizardSection
**Purpose**: Live preview of the generated PDF document

**Variants**: 7 different preview designs (A through G)

**Contains**:
- Dog photo (if uploaded)
- Dog details in table format
- Health alerts
- Owner/Vet information
- Vaccination history
- Medication log
- Handling notes

---

## HIDDEN ELEMENTS

### Print Sheet (for PDF download)
```
<div className="print-sheet absolute -left-[99999px] top-0 w-[794px] bg-white">
```
- Position: Absolute, off-screen to the left
- Width: 794px (A4 document width)
- Only visible when printing

### Expanded View Modal
```
{viewOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
```
- Position: Fixed overlay over entire page
- Z-index: 50 (above other content)
- Background: Semi-transparent dark overlay (slate-900/50)
- Shows full A4 preview when user clicks "View Full" button

---

## FOOTER/UTILITY SECTIONS

### Footer Helper Row
**Position**: mt-4 (16px gap)
**Content**: 
- "Tip: switch owner or clinic mode to change the 20-step flow."
- "Reset form" button

**Styling**:
- Text: text-xs text-slate-500
- Flex: items-center justify-between
- Max-width: 580px (same as content)

---

## INFORMATION SECTIONS (Below Main Wizard)

### 1. WHO USES THIS SECTION
**Position**: mt-16 from previous (64px gap)
**Title**: "Who Uses This"
**Title Styling**: text-lg font-semibold text-black mb-4

**Content Grid**: 
- 6 cards in vertical stack (space-y-2 = 8px between)
- Each card:
  - Background: bg-neutral-50
  - Border: 1px solid border-neutral-100
  - Padding: p-4
  - Rounded: Default border radius

**Card Content**:
- **Bold Title** (text-sm font-semibold text-black)
- **Description** (text-sm text-neutral-600 font-normal with mt-2 margin)

---

### 2. WHAT'S INCLUDED SECTION
**Position**: mt-10 from previous
**Title**: "What Your Dog Health Record Includes"
**Subtitle text**: Explain what's in the record (text-sm text-neutral-600)

**Content Container**:
- Border: 2px solid black (thick black border)
- Rounded: rounded-2xl (large rounded corners)
- Padding: p-4
- Space-y: space-y-4 (16px between items)

**Items in Container** (8 items):
- Each item has:
  - Label/Section (uppercase, small text, light gray)
  - Description (normal size, darker gray)
  - Border-bottom between items (except last one)

---

### 3. FAQ SECTION
**Position**: mt-10 from previous
**Title**: "Frequently Asked Questions"

**Content Container**:
- Same styling as "What's Included"
- Border: 2px solid black
- Rounded: rounded-2xl
- Padding: p-4
- Space-y: space-y-4

**Items** (8 Q&A pairs):
- **Question** (text-base font-semibold text-black)
- **Answer** (text-sm text-neutral-600 with mt-1 margin)
- Border-bottom between items (except last)

---

### 4. RELATED TOOLS SECTION
**Position**: mt-10 from previous, mb-10 at bottom
**Title**: "Related Pet Document Generators"

**Content**: 
- Space-y-2 container (8px between links)
- Each item is a Link component
- **Layout**: flex items-center justify-between (title left, arrow right)
- **Background**: bg-neutral-50 hover:bg-neutral-100 (darker on hover)
- **Border**: border-neutral-100 hover:border-neutral-200
- **Padding**: p-4
- **Rounded**: rounded-lg

**Link Content**:
- **Left side**:
  - Title (text-sm font-semibold text-black)
  - Description (text-xs text-neutral-600)
- **Right side**:
  - ChevronRight icon (h-4 w-4 text-neutral-300)

---

## SPACING & GAPS REFERENCE

### Vertical Spacing Between Major Sections
- Header to Controls: mt-6 (24px)
- Controls to Wizard: Standard (no explicit gap)
- Wizard to Preview: Standard (no explicit gap)
- Preview to Footer Helper: mt-4 (16px)
- Footer Helper to Who Uses: mt-16 (64px)
- Who Uses to What's Included: mt-10 (40px)
- What's Included to FAQ: mt-10 (40px)
- FAQ to Related Tools: mt-10 (40px)
- Related Tools bottom margin: mb-10 (40px)

### Internal Spacing Within Sections
- Items within containers: space-y-2 (8px) or space-y-4 (16px)
- Text margins: mt-2, mt-3, mt-4, mt-1 (8px, 12px, 16px, 4px)

---

## COLOR PALETTE

### Background Colors
- Page background: `bg-stone-100` (light tan/beige)
- Card backgrounds: `bg-neutral-50` or `bg-white`
- Text backgrounds: Transparent

### Text Colors
- Primary headings: `text-black` or `text-neutral-900`
- Secondary text: `text-neutral-600` (medium gray)
- Light text: `text-neutral-500` or `text-neutral-400`
- Links: `text-neutral-600` with hover state

### Border Colors
- Section borders: `border-neutral-100` or `border-neutral-200`
- Thick borders on info sections: `border-black`

### Status Colors (in Preview)
- Success: `bg-emerald-50 text-emerald-700 border-emerald-200`
- Warning: `bg-amber-50 text-amber-700 border-amber-200`
- Danger: `bg-rose-50 text-rose-700 border-rose-200`

---

## TYPOGRAPHY

### Headings
- H1 (Main title): `text-3xl sm:text-4xl font-bold` (responsive size)
- H2 (Section titles): `text-lg font-semibold`
- H3 (Subsections): `text-base font-semibold`
- Labels/Meta: `text-xs uppercase tracking-wider`

### Body Text
- Standard: `text-sm` to `text-[15px]`
- Small: `text-xs`
- All: `font-normal` unless specified as bold

---

## RESPONSIVE DESIGN

### Mobile (default)
- Padding: px-4 py-6
- Title size: text-3xl
- Single column layout

### Small (sm breakpoint)
- Title size: text-4xl
- Flex layouts adjust

### Medium+ (md breakpoint)
- Padding: px-6 py-8
- All layouts fully optimized

---

## KEY FEATURES PRESERVED

1. **Multi-step form wizard** - Users progress through 20 steps
2. **Live preview** - Shows document as it's being built
3. **Modal expansion** - Full-screen A4 view available
4. **Print/PDF download** - Hidden print sheet renders for download
5. **Two modes** - Pet Owner vs Clinic/Vet different form fields
6. **Design variants** - 7 different preview designs (A-G)
7. **Trust indicators** - Social proof elements
8. **SEO content** - FAQ, Who Uses, What's Included sections

---

## FOOTER

- `<Footer />` component at very end
- Positioned after all main content

---

## END OF SPECIFICATION

This design maintains consistent spacing, clear hierarchy, responsive behavior, and accessible color contrast throughout. All sections are max-width constrained to 580px for optimal readability on mobile and desktop.
