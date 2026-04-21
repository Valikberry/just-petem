# Instructions for Converting Stitch Design to Injected Code

## Context
You have a new Dog Health Record document design from Stitch. This document needs to be converted into React/TypeScript code and injected into: `health-record.org/tools/health-records/dog`

The current website uses this container to display a printable/downloadable health record document. We need to replace the document template with your new design while maintaining all functionality.

---

## What to Ask Claude

When you have your Stitch design ready, provide it to Claude with these exact instructions:

---

### **CLAUDE PROMPT TO GIVE:**

```
I have a new Dog Health Record document design from Stitch. 

I need you to convert this design into production-ready React/TypeScript code that will be injected into my Next.js website.

IMPORTANT: Do NOT design or create the document. I am providing the design. 
Your job is ONLY to:
1. Convert the visual design into clean, semantic React/TypeScript code
2. Create a reusable component that accepts form data as props
3. Ensure it matches exact dimensions and styling
4. Make it work in desktop, mobile, and print modes

## Design Specifications to Follow:
- Container Width: 794px (A4 paper size) on desktop, 100% max-width 580px on mobile
- Internal Padding: 24px on desktop, 16px on mobile
- Background: White (#FFFFFF)
- Print Format: A4 (210mm × 297mm)
- Print Margins: 24px safe content area (no cutoff)

## Code Requirements:

### 1. Component Structure
Create a React component named `DogHealthRecordTemplate` in TypeScript:

```typescript
interface HealthRecordData {
  dogName?: string;
  breed?: string;
  dob?: string;
  sex?: string;
  weight?: string;
  microchip?: string;
  colorMarkings?: string;
  height?: string;
  fixed?: boolean;
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  ownerAddress?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  clinicName?: string;
  clinicPhone?: string;
  emergencyVet?: string;
  emergencyVetPhone?: string;
  currentMedications?: string;
  handlingNotes?: string;
  dogPhoto?: string; // base64 or URL
  vaccinations: Array<{
    name: string;
    dateGiven?: string;
    nextDue?: string;
    status?: 'Current' | 'Due Soon' | 'Overdue';
  }>;
  signature?: string; // base64 image
}

interface DogHealthRecordTemplateProps {
  data: HealthRecordData;
  variant?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'; // Design variant
  showForPrint?: boolean; // Optimize for print layout when true
}

export default function DogHealthRecordTemplate({ 
  data, 
  variant = 'A', 
  showForPrint = false 
}: DogHealthRecordTemplateProps) {
  // Component code here
}
```

### 2. Styling Requirements
- Use **Tailwind CSS v4** for all styling
- NO inline styles except for dynamic sizing (photo dimensions, etc.)
- Use Slate color palette: slate-50, slate-100, slate-200, slate-300, slate-400, slate-500, slate-600, slate-700, slate-800, slate-900
- All spacing must use Tailwind spacing scale (px, 1, 2, 3, 4, 6, 8, 12, 16, 20, 24, etc.)
- Use Tailwind's @media print utilities for print optimization

### 3. Section Structure (must match design):
Each section should be a distinct div with:
- Section header (white text on dark rounded background)
- Content area with proper spacing
- Borders and spacing as shown in design
- Grid layout for multi-column data (2 columns on desktop, 1 on mobile)

### 4. Data Injection Points:
The component must accept ALL form data via props and render it exactly where it appears in the design:
- Dog photo in top-left corner of document
- All dog details in dedicated section
- Owner/client info section
- Vet information section
- Vaccinations table with status badges
- Medications list
- Handling notes
- Owner signature line

### 5. Print Optimization:
- When `showForPrint={true}`, apply `@media print` rules
- Ensure no background colors break on print (use light grays, not full colors)
- Tables must fit on single column on printed page
- Page breaks must not cut through sections
- Text must remain readable at 72dpi

### 6. Mobile Responsiveness:
- On screens < 768px, hide verbose labels (show abbreviations)
- Stack 2-column grids to 1 column
- Reduce padding to 16px
- Tables must scroll horizontally or collapse to stacked view
- Keep section headers and dog photo visible

### 7. Table Styling (for Vaccinations):
- Header row: Dark background (slate-900) with white text, bold, uppercase
- Data rows: Alternating white and slate-50 backgrounds
- Status badges: Green for "Current", Yellow for "Due Soon", Red for "Overdue"
- Dates in MM/DD/YY format
- Columns: VACCINE, DATE GIVEN, NEXT DUE, STATUS

### 8. Design Variants (A-G):
The component must support 7 design variants. For each variant:
- Define any color/layout differences in a variant config object
- Apply variant styles conditionally based on the `variant` prop
- Ensure variant styling does NOT break print or mobile views

### 9. Export Format:
Provide the code as a single `.tsx` file that can be directly copied into a Next.js project:
- File path: `components/dog-health-record/DogHealthRecordTemplate.tsx`
- Include all necessary imports (React, Tailwind classes, icons if needed)
- NO external dependencies beyond React and Tailwind
- Export as a default export

### 10. Output Checklist:
✓ Component accepts all form data via props
✓ Component renders exactly as shown in Stitch design
✓ Mobile responsive (< 768px width)
✓ Print-optimized (@ media print rules)
✓ All 7 variants supported
✓ No hardcoded data - all dynamic
✓ Tailwind-only styling
✓ TypeScript types defined
✓ Ready to copy/paste into project
✓ No external libraries required

---

## What I Will Do With Your Code:

1. Copy your component into: `components/dog-health-record/DogHealthRecordTemplate.tsx`
2. Update the injection point in the page at: `app/tools/health-records/dog/page.tsx`
3. Pass the form data as props to your component
4. Test in desktop, mobile, and print modes
5. Ship to production

---

## Final Notes:

- Focus on CLEAN, SEMANTIC HTML structure
- Prioritize readability and maintainability
- Do NOT include any interactive elements (buttons, inputs) - the parent component handles form
- Do NOT include header/footer/navigation - only the document itself
- Do NOT worry about animations or hover states
- The component should render immediately when mounted with complete data
```

---

## When You're Ready:

1. Finish your Stitch design
2. Take a screenshot or export the design (visual reference)
3. Copy the prompt above
4. Open a new chat with Claude
5. Paste the prompt + share your design screenshot
6. Claude will return production-ready `.tsx` code
7. Provide that code to v0 (me) and I'll inject it into the website

---

## Integration Checklist (What v0 Will Do):

- [ ] Copy component to `/components/dog-health-record/DogHealthRecordTemplate.tsx`
- [ ] Import component in `/app/tools/health-records/dog/page.tsx`
- [ ] Replace current document preview section with new component
- [ ] Pass form data from state to component props
- [ ] Test all variants (A-G) rendering correctly
- [ ] Test mobile responsiveness
- [ ] Test print output
- [ ] Verify download/print functionality works
- [ ] Deploy to production

---

## Support:

If Claude asks for clarification, provide:
- The actual design screenshot/mockup
- Any specific styling questions
- Mobile view reference
- Print output requirements

This prompt contains everything Claude needs to convert your design into production code.
