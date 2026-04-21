"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";

/**
 * DESIGN SYSTEM
 * -----------------------------------------------------------------------------
 * Color palette (Tailwind)
 * - Page background: bg-stone-100
 * - Primary surface: bg-white
 * - Secondary surface: bg-slate-50
 * - Primary text: text-slate-900
 * - Secondary text: text-slate-600 / text-slate-500
 * - Borders: border-slate-200 / border-slate-300
 * - Active / dark accent: bg-slate-900 text-white
 * - Success: bg-emerald-50 text-emerald-700 border-emerald-200
 * - Warning: bg-amber-50 text-amber-700 border-amber-200
 * - Danger: bg-rose-50 text-rose-700 border-rose-200
 *
 * Spacing scale used
 * - Page/container: px-4 py-6 md:px-6 md:py-8
 * - Card padding: p-4 md:p-5
 * - Gaps: gap-2 gap-3 gap-4 gap-5 gap-6
 * - Vertical rhythm: mt-2 mt-3 mt-4 mt-5 mt-6 mt-8 mt-10
 *
 * Typography
 * - H1: text-3xl md:text-4xl font-extrabold
 * - H2: text-xl md:text-2xl font-bold
 * - H3: text-lg font-bold
 * - Body: text-sm md:text-[15px]
 * - Labels/meta: text-[11px] uppercase tracking-[0.14em]
 */

type Mode = "owner" | "clinic";
type Variant = "A" | "B" | "C" | "D" | "E" | "F" | "G";

type FormState = {
  photoUrl: string | null;
  photoName: string;
  name: string;
  breed: string;
  dob: string;
  sex: string;
  fixed: string;
  weight: string;
  microchip: string;
  colorMarkings: string;
  bloodType: string;
  idMarks: string;
  owner: string;
  ownerPhone: string;
  ownerEmail: string;
  ownerAddress: string;
  emergencyContact: string;
  emergencyPhone: string;
  vetClinic: string;
  vetPhone: string;
  emergencyVet: string;
  emergencyVetPhone: string;
  drugAllergies: string;
  foodAllergies: string;
  conditions: string;
  meds: string;
  handlingMuzzle: boolean;
  handlingAnxiety: boolean;
  handlingFearBiter: boolean;
  handlingEscape: boolean;
  handlingSedation: boolean;
  handlingTwoPerson: boolean;
};

type BaseStep = {
  label: string;
  helper?: string;
};

type FileStep = BaseStep & {
  type: "file";
  key: "photoUrl";
  accept?: string;
};

type TextStep = BaseStep & {
  type: "text" | "email" | "tel" | "date";
  key: keyof FormState;
  placeholder?: string;
};

type SelectStep = BaseStep & {
  type: "select";
  key: keyof FormState;
  options: string[];
  placeholder?: string;
};

type TextareaStep = BaseStep & {
  type: "textarea";
  key: keyof FormState;
  rows?: number;
  placeholder?: string;
};

type CheckboxGroupStep = BaseStep & {
  type: "checkbox-group";
  options: { key: keyof FormState; label: string }[];
};

type StepDefinition = FileStep | TextStep | SelectStep | TextareaStep | CheckboxGroupStep;

const initialForm: FormState = {
  photoUrl: null,
  photoName: "",
  name: "",
  breed: "",
  dob: "",
  sex: "",
  fixed: "",
  weight: "",
  microchip: "",
  colorMarkings: "",
  bloodType: "",
  idMarks: "",
  owner: "",
  ownerPhone: "",
  ownerEmail: "",
  ownerAddress: "",
  emergencyContact: "",
  emergencyPhone: "",
  vetClinic: "",
  vetPhone: "",
  emergencyVet: "",
  emergencyVetPhone: "",
  drugAllergies: "",
  foodAllergies: "",
  conditions: "",
  meds: "",
  handlingMuzzle: false,
  handlingAnxiety: false,
  handlingFearBiter: false,
  handlingEscape: false,
  handlingSedation: false,
  handlingTwoPerson: false,
};

const ownerSteps: StepDefinition[] = [
  { type: "file", key: "photoUrl", label: "Upload dog image", helper: "Add a dog photo or skip for now.", accept: "image/*" },
  { type: "text", key: "name", label: "Dog name", placeholder: "e.g. Charlie" },
  { type: "text", key: "breed", label: "Breed", placeholder: "e.g. Golden Retriever" },
  { type: "date", key: "dob", label: "Date of birth" },
  { type: "select", key: "sex", label: "Sex", placeholder: "Select sex", options: ["Male", "Female"] },
  { type: "select", key: "fixed", label: "Fixed / neutered", placeholder: "Select option", options: ["Yes", "No"] },
  { type: "text", key: "weight", label: "Current weight", placeholder: "e.g. 28 kg" },
  { type: "text", key: "microchip", label: "Microchip number", placeholder: "Optional" },
  { type: "text", key: "colorMarkings", label: "Color / markings", placeholder: "e.g. Black / Tan" },
  { type: "text", key: "owner", label: "Primary owner name", placeholder: "e.g. John Doe" },
  { type: "tel", key: "ownerPhone", label: "Primary owner phone", placeholder: "+1 (555) 000-0000" },
  { type: "email", key: "ownerEmail", label: "Owner email", placeholder: "you@email.com" },
  { type: "text", key: "ownerAddress", label: "Owner address", placeholder: "Street address" },
  { type: "text", key: "emergencyContact", label: "Emergency contact", placeholder: "Full name" },
  { type: "tel", key: "emergencyPhone", label: "Emergency contact phone", placeholder: "Phone number" },
  { type: "text", key: "vetClinic", label: "Primary vet clinic", placeholder: "Clinic name" },
  { type: "tel", key: "vetPhone", label: "Primary vet phone", placeholder: "Clinic phone" },
  { type: "text", key: "emergencyVet", label: "24/7 emergency vet", placeholder: "Emergency clinic name" },
  { type: "tel", key: "emergencyVetPhone", label: "24/7 emergency vet phone", placeholder: "Emergency clinic phone" },
  {
    type: "checkbox-group",
    label: "Behavioral / handling risks",
    helper: "Mark any handling risks your vet or sitter should know.",
    options: [
      { key: "handlingMuzzle", label: "Muzzle required" },
      { key: "handlingAnxiety", label: "High anxiety" },
      { key: "handlingFearBiter", label: "Fear biter" },
      { key: "handlingEscape", label: "Escape risk" },
      { key: "handlingSedation", label: "Sedation required" },
      { key: "handlingTwoPerson", label: "Two-person restraint" },
    ],
  },
];

const clinicSteps: StepDefinition[] = [
  { type: "file", key: "photoUrl", label: "Upload dog image", helper: "Add a patient image or skip for now.", accept: "image/*" },
  { type: "text", key: "name", label: "Patient name", placeholder: "Dog name" },
  { type: "text", key: "breed", label: "Breed", placeholder: "e.g. Golden Retriever" },
  { type: "date", key: "dob", label: "DOB / Age" },
  { type: "select", key: "sex", label: "Sex status", placeholder: "Select sex", options: ["M", "F", "M/N", "F/S"] },
  { type: "text", key: "weight", label: "Weight", placeholder: "e.g. 28 kg" },
  { type: "text", key: "microchip", label: "Microchip #", placeholder: "15-digit chip number" },
  { type: "select", key: "bloodType", label: "Blood type", placeholder: "Select blood type", options: ["DEA 1.1+", "DEA 1.1-", "Unknown"] },
  { type: "text", key: "idMarks", label: "ID marks", placeholder: "Distinctive marks" },
  { type: "text", key: "owner", label: "Primary owner", placeholder: "Owner full name" },
  { type: "tel", key: "ownerPhone", label: "Owner phone", placeholder: "Primary contact" },
  { type: "email", key: "ownerEmail", label: "Owner email", placeholder: "Email address" },
  { type: "text", key: "ownerAddress", label: "Owner address", placeholder: "Street address" },
  { type: "text", key: "emergencyContact", label: "Emergency contact", placeholder: "Full name" },
  { type: "tel", key: "emergencyPhone", label: "Emergency phone", placeholder: "Phone number" },
  { type: "text", key: "vetClinic", label: "Clinic name", placeholder: "Clinic / hospital" },
  { type: "tel", key: "vetPhone", label: "Clinic phone", placeholder: "Clinic phone" },
  { type: "textarea", key: "drugAllergies", label: "Known allergies", rows: 3, placeholder: "Drug / food / environmental" },
  { type: "textarea", key: "conditions", label: "Medical alerts", rows: 3, placeholder: "Critical conditions, handling notes" },
  {
    type: "checkbox-group",
    label: "Handling risks / notes",
    helper: "Mark any handling flags staff should know.",
    options: [
      { key: "handlingMuzzle", label: "Muzzle required" },
      { key: "handlingAnxiety", label: "High anxiety" },
      { key: "handlingFearBiter", label: "Fear biter" },
      { key: "handlingEscape", label: "Escape risk" },
      { key: "handlingSedation", label: "Sedation required" },
      { key: "handlingTwoPerson", label: "Two-person restraint" },
    ],
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function prettyDate(value: string) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return value;
  }
}

function StatusPill({ status }: { status: string }) {
  const style =
    status === "Current"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : status === "Due Soon"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-rose-200 bg-rose-50 text-rose-700";

  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold", style)}>
      {status}
    </span>
  );
}

function PreviewVariantWrapper({
  variant,
  children,
}: {
  variant: Variant;
  children: React.ReactNode;
}) {
  const styles: Record<Variant, string> = {
    A: "border-slate-200 bg-white",
    B: "border-slate-300 bg-white",
    C: "border-slate-300 bg-white",
    D: "border-slate-300 bg-white",
    E: "border-slate-300 bg-white",
    F: "border-slate-300 bg-white",
    G: "border-slate-300 bg-white",
  };

  return <div className={cn("border shadow-sm", styles[variant])}>{children}</div>;
}

export default function DogHealthRecordWizardPage() {
  const [mode, setMode] = useState<Mode>("owner");
  const [variant, setVariant] = useState<Variant>("A");
  const [step, setStep] = useState(1);
  const [viewOpen, setViewOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);

  const steps = mode === "owner" ? ownerSteps : clinicSteps;
  const currentStep = steps[step - 1];
  const progress = useMemo(() => Math.round((step / steps.length) * 100), [step, steps.length]);

  useEffect(() => {
    setStep(1);
  }, [mode]);

  useEffect(() => {
    return () => {
      if (form.photoUrl) URL.revokeObjectURL(form.photoUrl);
    };
  }, [form.photoUrl]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (form.photoUrl) {
      URL.revokeObjectURL(form.photoUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setForm((prev) => ({
      ...prev,
      photoUrl: objectUrl,
      photoName: file.name,
    }));
  }

  function handleNext() {
    setStep((prev) => Math.min(prev + 1, steps.length));
  }

  function handleBack() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  function handleReset() {
    if (form.photoUrl) URL.revokeObjectURL(form.photoUrl);
    setForm(initialForm);
    setStep(1);
  }

  function handlePrint() {
    window.print();
  }

  const detailRows =
    mode === "owner"
      ? [
          ["Name", form.name || "—"],
          ["Breed", form.breed || "—"],
          ["DOB", prettyDate(form.dob)],
          ["Sex", form.sex || "—"],
          ["Fixed", form.fixed || "—"],
          ["Weight", form.weight || "—"],
          ["Microchip", form.microchip || "—"],
          ["Color / Markings", form.colorMarkings || "—"],
        ]
      : [
          ["Name", form.name || "—"],
          ["Breed", form.breed || "—"],
          ["DOB / Age", prettyDate(form.dob)],
          ["Sex", form.sex || "—"],
          ["Weight", form.weight || "—"],
          ["Microchip", form.microchip || "—"],
          ["Blood Type", form.bloodType || "—"],
          ["ID Marks", form.idMarks || "—"],
        ];

  const handlingFlags = [
    form.handlingMuzzle && "Muzzle required",
    form.handlingAnxiety && "High anxiety",
    form.handlingFearBiter && "Fear biter",
    form.handlingEscape && "Escape risk",
    form.handlingSedation && "Sedation required",
    form.handlingTwoPerson && "Two-person restraint",
  ].filter(Boolean) as string[];

  const previewTitleByVariant: Record<Variant, string> = {
    A: mode === "owner" ? "Dog Health Record" : "Patient Health Record",
    B: mode === "owner" ? "Pet Health Record" : "Patient Health Record",
    C: "Record Tracker",
    D: "Premium Medical Record",
    E: "Pet Health Record",
    F: "Pet Health Record",
    G: "Medical Record",
  };

  const HeaderSection = () => (
    <section className="text-center bg-white">
      <h1 className="mt-1 text-3xl sm:text-4xl font-bold text-black leading-tight">
        Free Dog Health Record Generator
      </h1>
      <p className="mt-3 px-[50px] mb-1 text-sm text-neutral-600 leading-relaxed font-normal">
        Answer a few questions about your dog. Get a complete, printable health record instantly.
      </p>
      <div className="mt-2 flex justify-center">
        <div className="flex items-center gap-3 text-xs text-neutral-600 font-normal">
          <div className="flex -space-x-2">
            <img src="https://i.pravatar.cc/28?img=1" alt="" className="h-7 w-7 rounded-full border-2 border-white object-cover" />
            <img src="https://i.pravatar.cc/28?img=2" alt="" className="h-7 w-7 rounded-full border-2 border-white object-cover" />
            <img src="https://i.pravatar.cc/28?img=3" alt="" className="h-7 w-7 rounded-full border-2 border-white object-cover" />
          </div>
          <span>500+ people used this</span>
          <span className="text-neutral-300">|</span>
          <span>6,000+ records generated</span>
        </div>
      </div>
    </section>
  );

  const ControlsSection = () => (
    <section className="mt-7 mb-0.5 flex items-center gap-3">
      <span className="text-sm font-medium text-neutral-700 whitespace-nowrap">Templates</span>
      <span className="text-base">👉</span>
      <div className="flex items-center gap-1.5">
        {(["A", "B", "C", "D", "E", "F", "G"] as Variant[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded border text-xs font-bold transition",
              variant === v
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
            )}
            aria-pressed={variant === v}
            aria-label={`Select template ${v}`}
          >
            {v}
          </button>
        ))}
      </div>
    </section>
  );

  const WizardSection = () => (
    <section className="mt-1.5 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-1 w-full overflow-hidden rounded-t-2xl bg-slate-100">
        <div className="h-full bg-slate-900 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Step {step} of {steps.length}
          </div>
          <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
            {progress}% complete
          </div>
        </div>

        <div className="mt-3">
          <label className="flex items-center gap-2 text-lg font-bold text-slate-900">
            {currentStep.label} {currentStep.type === "file" && <span className="text-xl">📷</span>}
          </label>
        </div>

        <div className="mt-4">
          {currentStep.type === "file" && (
            <label className="flex cursor-pointer items-center rounded-xl border border-slate-300 bg-white px-4 py-3 hover:border-slate-400">
              <input type="file" accept={currentStep.accept ?? "image/*"} onChange={handleFileChange} className="hidden" />
              <div className="text-sm font-normal text-slate-600">
                {form.photoName ? `Uploaded: ${form.photoName}` : "Add a dog photo or skip for now [PNG, JPEG, WEBP]"}
              </div>
            </label>
          )}

          {currentStep.type === "text" && (
            <input
              type="text"
              value={String(form[currentStep.key] ?? "")}
              onChange={(e) => updateField(currentStep.key, e.target.value as never)}
              placeholder={currentStep.placeholder}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400"
            />
          )}

          {currentStep.type === "email" && (
            <input
              type="email"
              value={String(form[currentStep.key] ?? "")}
              onChange={(e) => updateField(currentStep.key, e.target.value as never)}
              placeholder={currentStep.placeholder}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400"
            />
          )}

          {currentStep.type === "tel" && (
            <input
              type="tel"
              value={String(form[currentStep.key] ?? "")}
              onChange={(e) => updateField(currentStep.key, e.target.value as never)}
              placeholder={currentStep.placeholder}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400"
            />
          )}

          {currentStep.type === "date" && (
            <input
              type="date"
              value={String(form[currentStep.key] ?? "")}
              onChange={(e) => updateField(currentStep.key, e.target.value as never)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
            />
          )}

          {currentStep.type === "select" && (
            <select
              value={String(form[currentStep.key] ?? "")}
              onChange={(e) => updateField(currentStep.key, e.target.value as never)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
            >
              <option value="">{currentStep.placeholder ?? "Select an option"}</option>
              {currentStep.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {currentStep.type === "textarea" && (
            <textarea
              rows={currentStep.rows ?? 4}
              value={String(form[currentStep.key] ?? "")}
              onChange={(e) => updateField(currentStep.key, e.target.value as never)}
              placeholder={currentStep.placeholder}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400"
            />
          )}

          {currentStep.type === "checkbox-group" && (
            <div className="grid gap-3 sm:grid-cols-2">
              {currentStep.options.map((option) => (
                <label
                  key={option.key}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(form[option.key])}
                    onChange={(e) => updateField(option.key, e.target.checked as never)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-sm font-medium text-slate-800">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className={cn(
              "text-sm font-semibold transition",
              step === 1 ? "cursor-not-allowed text-slate-300" : "text-slate-600 hover:text-slate-900"
            )}
          >
            ← Back
          </button>

          <div className="flex items-center gap-1.5">
            {steps.map((_, index) => (
              <span
                key={index}
                className={cn(
                  "block h-2 rounded-full transition-all",
                  index + 1 === step
                    ? "w-6 bg-slate-900"
                    : index + 1 < step
                      ? "w-2 bg-slate-400"
                      : "w-2 bg-slate-200"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={step === steps.length}
            className={cn(
              "text-sm font-semibold transition",
              step === steps.length ? "cursor-not-allowed text-slate-300" : "text-slate-900 hover:text-slate-600"
            )}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );

  // Live document preview section:
  // Shows the current form data as a printable health record in real time.
  const PreviewSection = ({ printMode = false }: { printMode?: boolean }) => (
    <section>
      {!printMode && (
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Live Preview</span>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setViewOpen(true)} className="text-xs font-semibold text-slate-700 underline">
              👁 View
            </button>
            <button type="button" onClick={handlePrint} className="text-xs font-semibold text-slate-700 underline">
              ⬇ Download
            </button>
          </div>
        </div>
      )}

      <div className={cn("mt-3", printMode ? "mx-auto w-[794px] max-w-full" : "w-full")}>
        <PreviewVariantWrapper variant={variant}>
          <div
            className={cn(
              "border-b px-4 py-4",
              variant === "A" && "bg-gradient-to-r from-emerald-50 via-white to-white",
              variant === "B" && "bg-white",
              variant === "C" && "bg-white",
              variant === "D" && "bg-white",
              variant === "E" && "bg-gradient-to-b from-rose-50 to-white",
              variant === "F" && "bg-rose-50",
              variant === "G" && "bg-white"
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                {variant === "C" ? (
                  <>
                    <div className="text-2xl font-extrabold uppercase tracking-[0.12em] text-slate-900">
                      {mode === "owner" ? "Pet Health" : "Clinic Health"}
                    </div>
                    <div className="text-2xl font-extrabold uppercase tracking-[0.12em] text-slate-900">
                      {previewTitleByVariant[variant]}
                    </div>
                  </>
                ) : variant === "D" ? (
                  <>
                    <div className="text-xl font-extrabold uppercase tracking-[0.18em] text-slate-900">Pet Health</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">{previewTitleByVariant[variant]}</div>
                  </>
                ) : variant === "G" ? (
                  <div className="text-2xl font-medium text-amber-700">{previewTitleByVariant[variant]}</div>
                ) : (
                  <>
                    <div className={cn("text-[22px] font-bold tracking-tight text-slate-900", variant === "A" && "italic")}>
                      {previewTitleByVariant[variant]}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {mode === "owner" ? "Printable owner summary" : "Printable clinic summary"}
                    </div>
                  </>
                )}
              </div>

              <div
                className={cn(
                  "overflow-hidden border bg-slate-100",
                  variant === "A" && "h-16 w-16 rounded-full",
                  variant === "B" && "h-44 w-44 rounded-none",
                  variant === "C" && "h-16 w-16 rounded-md",
                  variant === "D" && "h-20 w-20 rounded-xl border-2 border-amber-600",
                  variant === "E" && "h-36 w-36 rounded-2xl",
                  variant === "F" && "h-20 w-20 rounded-xl border-2 border-slate-500",
                  variant === "G" && "h-16 w-16 rounded-full"
                )}
              >
                {form.photoUrl ? (
                  <img src={form.photoUrl} alt="Dog" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">No photo</div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5 p-4 md:p-5">
            {variant === "C" ? (
              <>
                <div className="mx-auto max-w-[430px] overflow-hidden border border-slate-200">
                  {[
                    ["Primary Vet", form.vetClinic || "—", "bg-blue-500", "bg-cyan-50"],
                    ["Vet Address", form.ownerAddress || "—", "bg-orange-400", "bg-orange-50"],
                    ["Clinic Hours", "Add hours", "bg-pink-500", "bg-pink-50"],
                  ].map(([label, value, leftClass, rightClass], idx) => (
                    <div key={label} className={cn("grid min-h-10 grid-cols-[140px_1fr] text-sm", idx !== 2 && "border-b border-slate-200")}>
                      <div className={cn("flex items-center px-3 font-bold text-white", leftClass)}>{label}</div>
                      <div className={cn("flex items-center px-3 text-slate-800", rightClass)}>{value}</div>
                    </div>
                  ))}
                </div>

                <div className="text-center text-sm font-extrabold uppercase tracking-[0.16em] text-orange-400">
                  Routine & Emergency Visits
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr>
                        {["Reason", "Date / Time", "Medicines Given", "Reaction To Medicine"].map((col) => (
                          <th key={col} className="border border-slate-300 bg-indigo-900 px-3 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 10 }).map((_, idx) => {
                        const rowBg = idx % 3 === 0 ? "bg-cyan-50" : idx % 3 === 1 ? "bg-orange-50" : "bg-pink-50";
                        return (
                          <tr key={idx}>
                            <td className={cn("border border-slate-200 px-3 py-3", rowBg)}>{idx === 0 ? (form.conditions || "Routine visit") : " "}</td>
                            <td className={cn("border border-slate-200 px-3 py-3", rowBg)}>{idx === 0 ? prettyDate(form.dob) : " "}</td>
                            <td className={cn("border border-slate-200 px-3 py-3", rowBg)}>{idx === 0 ? (form.meds || " ") : " "}</td>
                            <td className={cn("border border-slate-200 px-3 py-3", rowBg)}>{idx === 0 ? (form.drugAllergies || " ") : " "}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : variant === "D" ? (
              <>
                <div className="mx-auto max-w-md">
                  <div className="rounded-full bg-slate-900 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                    Pet Information
                  </div>
                  <div className="mt-3 space-y-3">
                    {[
                      ["Pet Name", form.name],
                      ["Species", "Dog / Cat"],
                      ["Breed", form.breed],
                      ["Date of Birth", prettyDate(form.dob)],
                      ["Sex", form.sex],
                      ["Color / Markings", form.colorMarkings],
                      ["Microchip Number", form.microchip],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div>
                        <div className="min-h-6 border-b border-slate-300 text-sm text-slate-900">{value || " "}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-full bg-slate-900 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                    Owner Information
                  </div>
                  <div className="mt-3 space-y-3">
                    {[
                      ["Owner Name", form.owner],
                      ["Address", form.ownerAddress],
                      ["Phone", form.ownerPhone],
                      ["Email", form.ownerEmail],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div>
                        <div className="min-h-6 border-b border-slate-300 text-sm text-slate-900">{value || " "}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : variant === "E" ? (
              <>
                <div className="grid gap-5 md:grid-cols-[1fr_170px]">
                  <div className="space-y-3">
                    {[
                      ["Name", form.name],
                      ["Breed", form.breed],
                      ["Date of Birth", prettyDate(form.dob)],
                      ["Sex", form.sex],
                      ["Microchip No.", form.microchip],
                      ["Color / Markings", form.colorMarkings],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div>
                        <div className="min-h-6 border-b border-slate-300 text-sm text-slate-900">{value || " "}</div>
                      </div>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center text-[110px] opacity-10">🐾</div>
                    <div className="relative mx-auto h-[150px] w-[150px] overflow-hidden rounded-2xl border-2 border-slate-300 bg-white">
                      {form.photoUrl ? (
                        <img src={form.photoUrl} alt="Dog" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">Add photo</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 text-center text-xl font-extrabold text-slate-900">CONTACT INFO</div>
                <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                  {[
                    ["Owner Name", form.owner],
                    ["Phone Number", form.ownerPhone],
                    ["Address", form.ownerAddress],
                    ["Vet Clinic", form.vetClinic],
                    ["Vet Phone", form.vetPhone],
                  ].map(([label, value]) => (
                    <div key={label} className="mb-3 last:mb-0">
                      <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div>
                      <div className="min-h-6 border-b border-slate-300 text-sm text-slate-900">{value || " "}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : variant === "F" ? (
              <>
                <div className="space-y-3">
                  {[
                    {
                      title: "Pet Information",
                      rows: [
                        ["Name", form.name],
                        ["Breed", form.breed],
                        ["Age", prettyDate(form.dob)],
                        ["Sex", form.sex],
                        ["Color / Markings", form.colorMarkings],
                        ["Microchip No.", form.microchip],
                      ],
                    },
                    {
                      title: "Owner Information",
                      rows: [
                        ["Owner's Name", form.owner],
                        ["Address", form.ownerAddress],
                        ["Phone Number", form.ownerPhone],
                        ["Email Address", form.ownerEmail],
                      ],
                    },
                    {
                      title: "Other Information",
                      rows: [
                        ["Emergency Contact Name", form.emergencyContact],
                        ["Phone Number", form.emergencyPhone],
                        ["Veterinarian's Name", form.vetClinic],
                        ["Phone Number", form.vetPhone],
                      ],
                    },
                  ].map((card) => (
                    <div key={card.title} className="rounded-xl border-2 border-slate-500 bg-white p-4">
                      <div className="mb-3 text-center text-base font-bold text-slate-700">{card.title}</div>
                      <div className="space-y-3">
                        {card.rows.map(([label, value]) => (
                          <div key={label}>
                            <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div>
                            <div className="min-h-6 border-b border-slate-300 text-sm text-slate-900">{value || " "}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : variant === "G" ? (
              <>
                <div className="space-y-3">
                  {[
                    ["Body Weight", form.weight],
                    ["Temperature", "38.4°C"],
                    ["Body Condition Score", "5/9"],
                    ["Today", prettyDate(form.dob)],
                    ["We are visiting the clinic of", form.vetClinic],
                    ["For examination", form.conditions],
                    ["Symptom(s)", form.conditions],
                    ["Diagnosis", form.drugAllergies],
                    ["Prescription(s)", form.meds],
                    ["Dietary Restriction", form.foodAllergies],
                    ["Phone", form.vetPhone],
                    ["Email", form.ownerEmail],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div>
                      <div className="min-h-6 border-b border-slate-300 text-sm text-slate-900">{value || " "}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
                    <span>🐾</span>
                    <span>{mode === "owner" ? "Dog details" : "Patient details"}</span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {detailRows.map(([label, value]) => (
                      <div key={label} className="grid grid-cols-[120px_1fr] border border-slate-200 text-sm">
                        <div className="bg-slate-50 px-3 py-2 font-semibold text-slate-700">{label}</div>
                        <div className="px-3 py-2 text-slate-900">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-rose-200 bg-rose-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold text-rose-700">
                    <span>⚠️</span>
                    <span>{mode === "owner" ? "Critical alerts — read first" : "Alert panel — staff check before appointment"}</span>
                  </div>
                  <div className="grid gap-3">
                    {[
                      ["Drug allergies", form.drugAllergies || "None listed"],
                      ["Food allergies", form.foodAllergies || "None listed"],
                      [mode === "owner" ? "Chronic conditions" : "Medical alerts", form.conditions || "None listed"],
                    ].map(([label, value]) => (
                      <div key={label} className="border border-slate-200 bg-white p-3">
                        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</div>
                        <div className="mt-1 text-sm text-slate-800">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border border-slate-200 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
                      <span>📞</span>
                      <span>Owner / client information</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-semibold text-slate-600">Owner:</span> {form.owner || "—"}</div>
                      <div><span className="font-semibold text-slate-600">Phone:</span> {form.ownerPhone || "—"}</div>
                      <div><span className="font-semibold text-slate-600">Email:</span> {form.ownerEmail || "—"}</div>
                      <div><span className="font-semibold text-slate-600">Address:</span> {form.ownerAddress || "—"}</div>
                      <div><span className="font-semibold text-slate-600">Emergency contact:</span> {form.emergencyContact || "—"}</div>
                      <div><span className="font-semibold text-slate-600">Emergency phone:</span> {form.emergencyPhone || "—"}</div>
                    </div>
                  </div>

                  <div className="border border-slate-200 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
                      <span>🏥</span>
                      <span>Vet information</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-semibold text-slate-600">Clinic:</span> {form.vetClinic || "—"}</div>
                      <div><span className="font-semibold text-slate-600">Phone:</span> {form.vetPhone || "—"}</div>
                      <div><span className="font-semibold text-slate-600">Emergency vet:</span> {form.emergencyVet || "—"}</div>
                      <div><span className="font-semibold text-slate-600">Emergency phone:</span> {form.emergencyVetPhone || "—"}</div>
                      <div><span className="font-semibold text-slate-600">Current medications:</span> {form.meds || "None listed"}</div>
                    </div>

                    <div className="mt-4">
                      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Handling notes</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {handlingFlags.length > 0 ? (
                          handlingFlags.map((item) => (
                            <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-500">No handling notes</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
                    <span>💉</span>
                    <span>Vaccinations</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr>
                          {["Vaccine", "Date Given", "Next Due", "Status"].map((col) => (
                            <th
                              key={col}
                              className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Rabies", "Current"],
                          ["DHPP", "Due Soon"],
                          ["Bordetella", "Current"],
                          ["Leptospirosis", "Overdue"],
                          ["Canine Influenza", ""],
                          ["Lyme", ""],
                        ].map(([vaccine, status], index, arr) => (
                          <tr key={vaccine}>
                            <td className={cn("px-3 py-3 text-slate-900", index !== arr.length - 1 && "border-b border-slate-100")}>{vaccine}</td>
                            <td className={cn("px-3 py-3 text-slate-600", index !== arr.length - 1 && "border-b border-slate-100")}>MM/DD/YYYY</td>
                            <td className={cn("px-3 py-3 text-slate-600", index !== arr.length - 1 && "border-b border-slate-100")}>MM/DD/YYYY</td>
                            <td className={cn("px-3 py-3", index !== arr.length - 1 && "border-b border-slate-100")}>
                              {status ? <StatusPill status={status} /> : <span className="text-slate-400">—</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </PreviewVariantWrapper>
      </div>
    </section>
  );

  return (
    <>
      {/* Print styles:
          Keeps the preview printable as a clean A4-like document. */}
      <style>{`
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
      `}</style>

      <div className="min-h-screen bg-stone-100">
        <PageHeader />
        <div className="mx-auto max-w-[580px] px-4 pt-2 pb-8 sm:pb-10">
          
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2">
            <Link href="/tools" className="text-sm text-neutral-600 hover:text-black transition-colors">
              Tools
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-sm text-neutral-900 font-medium">Dog Health Record</span>
          </div>
          
          {/* Content */}
          <HeaderSection />
            <ControlsSection />
            <WizardSection />
            <PreviewSection />
        </div>

        {/* Hidden print sheet:
            Mirrors the live preview for native browser print/download actions. */}
        <div className="print-sheet absolute -left-[99999px] top-0 w-[794px] bg-white">
          <div className="mx-auto max-w-[794px]">
            <PreviewSection printMode />
          </div>
        </div>

        {/* Expanded view modal:
            Presents a larger full-sheet preview without leaving the page. */}
        {viewOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
            onClick={() => setViewOpen(false)}
          >
            <div
              className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-2xl bg-stone-100 p-4 md:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-bold text-slate-900">A4 View</div>
                <button
                  type="button"
                  onClick={() => setViewOpen(false)}
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
              </div>
              <div className="mx-auto max-w-[794px]">
                <PreviewSection printMode />
              </div>
            </div>
          </div>
        )}

        {/* Footer helper row:
            Gives users quick utility actions and keeps the page practical. */}
        <div className="mx-auto mt-4 flex w-full max-w-[580px] items-center justify-between gap-4 text-xs text-slate-500">
          <span>Tip: switch owner or clinic mode to change the 20-step flow.</span>
          <button type="button" onClick={handleReset} className="font-semibold text-slate-700 hover:text-slate-900">
            Reset form
          </button>
        </div>

        {/* Who Uses This Section */}
        <section className="mx-auto mt-16 w-full max-w-[580px]">
          <h2 className="text-lg font-semibold text-black mb-4">Who Uses This</h2>
          
          <div className="space-y-2">
            {[
              { title: "New dog owners starting their first health record", body: "Fill in every detail online and download a finished dog health record PDF from day one." },
              { title: "Dog owners rebuilding lost records", body: "Recreate your dog's complete medical history online and download a finished PDF in minutes." },
              { title: "Owners switching to a new vet clinic", body: "Fill in your dog's vaccination and medical history and download a complete PDF to bring to your new clinic." },
              { title: "Pet sitters and dog walkers", body: "Clients generate a finished record with allergies, medications, and emergency contacts before handing over care." },
              { title: "Dog owners travelling internationally", body: "Fill in vaccination history and health details online and download a finished PDF for customs and quarantine officials." },
              { title: "Rescue and shelter workers", body: "Fill in incoming dog details online and download a finished canine health record PDF for every intake." },
            ].map((item, index) => (
              <div key={index} className="rounded-lg bg-neutral-50 border border-neutral-100 p-4">
                <h3 className="text-sm font-semibold text-black">{item.title}</h3>
                <p className="text-sm text-neutral-600 font-normal mt-2">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Included Section */}
        <section className="mx-auto mt-10 w-full max-w-[580px]">
          <h2 className="text-lg font-semibold text-black mb-4">What Your Dog Health Record Includes</h2>
          <p className="text-sm text-neutral-600 font-normal mb-4">Everything a vet, sitter, or carer needs to know about your dog, covered in one finished PDF.</p>
          
          <div className="rounded-2xl border-2 border-black p-4 space-y-4">
            {[
              { section: "Dog Details", covers: "Name, breed, date of birth, sex, weight, microchip number, colour and markings." },
              { section: "Critical Alerts", covers: "Drug allergies, food allergies, and chronic conditions shown first." },
              { section: "Owner Information", covers: "Owner name, phone, email, address, and emergency contact details." },
              { section: "Vet Information", covers: "Clinic name, vet name, phone, emergency vet contact, and current medications." },
              { section: "Vaccination History", covers: "Rabies, DHPP, Bordetella, Leptospirosis, Canine Influenza, Lyme with date given, next due date and status." },
              { section: "Medication Log", covers: "Medication name, dosage, frequency, and prescribing vet." },
              { section: "Handling Notes", covers: "Behaviour around strangers, known fears, and special care instructions." },
              { section: "Medical History", covers: "Past surgeries, illnesses, procedures, and hospitalisation notes." },
            ].map((item, index, arr) => (
              <div
                key={item.section}
                className={`${index !== arr.length - 1 ? "border-b border-neutral-200 pb-4" : ""}`}
              >
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">{item.section}</p>
                <p className="text-sm text-neutral-700 font-normal mt-1">{item.covers}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto mt-10 w-full max-w-[580px]">
          <h2 className="text-lg font-semibold text-black mb-4">Frequently Asked Questions</h2>
          
          <div className="rounded-2xl border-2 border-black p-4 space-y-4">
            {[
              { question: "What is a free dog health record generator?", answer: "An online tool that builds your finished dog health document as you fill in the details. You download a complete formatted PDF, not a blank form to fill yourself." },
              { question: "How is this different from downloading a blank form?", answer: "Blank forms require offline formatting. This generator builds your dog health record live as you type and downloads it complete and ready to use." },
              { question: "How do I get my dog's medical history in one place?", answer: "Fill in vaccinations, medications, vet contacts, allergies, and past procedures into the generator. Download your complete dog medical history as a finished PDF." },
              { question: "What does a complete dog health record include?", answer: "Basic dog details, critical alerts, owner and vet contacts, vaccination history, medication log, handling notes, and past medical history. Every section is covered." },
              { question: "Can I use this for multiple dogs?", answer: "Yes. Generate one finished record per dog and download each as a separate PDF." },
              { question: "What format does the finished record download in?", answer: "PDF. Opens on any device, prints cleanly, and is easy to email to vets or pet sitters." },
              { question: "Is this the same as an official vet record?", answer: "No. Your vet maintains their own clinical records. This generator creates a complete owner summary you control and can share with anyone caring for your dog." },
              { question: "Do I need a Canva account or any other app?", answer: "No. Fill in your dog's details directly on this page and download your finished PDF instantly. No account, no app, no extra steps." },
            ].map((item, index, arr) => (
              <div
                key={item.question}
                className={`${index !== arr.length - 1 ? "border-b border-neutral-200 pb-4" : ""}`}
              >
                <h3 className="text-base font-semibold text-black">{item.question}</h3>
                <p className="mt-1 text-sm font-normal text-neutral-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools Section */}
        <section className="mx-auto mt-10 w-full max-w-[580px] mb-10">
          <h2 className="text-lg font-semibold text-black mb-4">Related Pet Document Generators</h2>
          
          <div className="space-y-2">
            {[
              { label: "Dog Vaccination Record Generator", url: "/tools/dog-vaccination-record-generator", description: "Track your dog's vaccine dates and upcoming boosters." },
              { label: "Pet Sitter Notes Generator", url: "/tools/pet-sitter-notes", description: "Give your sitter everything they need before you leave." },
              { label: "Pet Emergency Card Generator", url: "/tools/pet-emergency-card", description: "Keep critical dog info ready for any emergency." },
              { label: "Dog Medication Tracker Generator", url: "/tools/dog-medication-tracker-generator", description: "Log medications, dosage, and refill schedules in one place." },
              { label: "All Pet Health Record Generators", url: "/tools/pet-health-records", description: "Back to all health record tools." },
            ].map((tool) => (
              <Link key={tool.url} href={tool.url} className="flex items-center justify-between p-4 rounded-lg bg-neutral-50 border border-neutral-100 hover:bg-neutral-100 hover:border-neutral-200 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-black">{tool.label}</p>
                  <p className="text-xs text-neutral-600">{tool.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-neutral-300" />
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
