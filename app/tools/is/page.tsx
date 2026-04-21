"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";

type Mode = "owner" | "clinic";
type Variant = "A" | "B" | "C" | "D" | "E" | "F" | "G";

type VaccinationRecord = { status: string; lastDate: string; nextDate: string };

type FormState = {
  photoUrl: string | null;
  photoName: string;
  docDate: string;
  name: string;
  breed: string;
  dob: string;
  sex: string;
  fixed: string;
  weight: string;
  microchip: string;
  colorMarkings: string;
  rabiesTag: string;
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
  vetComments: string;
  ownerComments: string;
  handlingMuzzle: boolean;
  handlingAnxiety: boolean;
  handlingFearBiter: boolean;
  handlingEscape: boolean;
  handlingSedation: boolean;
  handlingTwoPerson: boolean;
  vaccineRabies: VaccinationRecord;
  vaccineDHPP: VaccinationRecord;
  vaccineBordetella: VaccinationRecord;
  vaccineLeptospirosis: VaccinationRecord;
  vaccineInfluenza: VaccinationRecord;
  vaccineLyme: VaccinationRecord;
  vaccineOther: VaccinationRecord;
  vaccineRabiesStatus: string;
  vaccineDHPPStatus: string;
  vaccineBordetellaStatus: string;
  vaccineLeptospirosisStatus: string;
  vaccineInfluenzaStatus: string;
  vaccineLymeStatus: string;
  vaccineOtherStatus: string;
};

type BaseStep = { label: string; helper?: string; };
type FileStep = BaseStep & { type: "file"; key: "photoUrl"; accept?: string; };
type TextStep = BaseStep & { type: "text" | "email" | "tel" | "date"; key: keyof FormState; placeholder?: string; };
type SelectStep = BaseStep & { type: "select"; key: keyof FormState; options: string[]; placeholder?: string; };
type TextareaStep = BaseStep & { type: "textarea"; key: keyof FormState; rows?: number; placeholder?: string; };
type CheckboxGroupStep = BaseStep & { type: "checkbox-group"; options: { key: keyof FormState; label: string }[]; };
type VaccinationStep = BaseStep & { type: "vaccination"; vaccineKey: keyof FormState; vaccineName: string; };
type StepDefinition = FileStep | TextStep | SelectStep | TextareaStep | CheckboxGroupStep | VaccinationStep;

const initialForm: FormState = {
  photoUrl: null,
  photoName: "",
  docDate: new Date().toLocaleDateString(),
  name: "",
  breed: "",
  dob: "",
  sex: "",
  fixed: "",
  weight: "",
  microchip: "",
  colorMarkings: "",
  rabiesTag: "",
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
  vetComments: "",
  ownerComments: "",
  handlingMuzzle: false,
  handlingAnxiety: false,
  handlingFearBiter: false,
  handlingEscape: false,
  handlingSedation: false,
  handlingTwoPerson: false,
  vaccineRabies: { status: '', lastDate: '', nextDate: '' },
  vaccineDHPP: { status: '', lastDate: '', nextDate: '' },
  vaccineBordetella: { status: '', lastDate: '', nextDate: '' },
  vaccineLeptospirosis: { status: '', lastDate: '', nextDate: '' },
  vaccineInfluenza: { status: '', lastDate: '', nextDate: '' },
  vaccineLyme: { status: '', lastDate: '', nextDate: '' },
  vaccineOther: { status: '', lastDate: '', nextDate: '' },
  vaccineRabiesStatus: '',
  vaccineDHPPStatus: '',
  vaccineBordetellaStatus: '',
  vaccineLeptospirosisStatus: '',
  vaccineInfluenzaStatus: '',
  vaccineLymeStatus: '',
  vaccineOtherStatus: '',
};

const ownerSteps: StepDefinition[] = [
  { type: 'file', key: 'photoUrl', label: 'Upload your dog photo', helper: 'Add a dog photo or skip for now.', accept: 'image/*' },
  { type: 'text', key: 'name', label: "What is your dog's name?", placeholder: 'e.g. Charlie' },
  { type: 'text', key: 'breed', label: "What is your dog's breed?", placeholder: 'e.g. Golden Retriever' },
  { type: 'date', key: 'dob', label: "What is your dog's date of birth?" },
  { type: 'select', key: 'sex', label: "What is your dog's sex?", placeholder: 'Select sex', options: ['Male', 'Female'] },
  { type: 'text', key: 'weight', label: "What is your dog's current weight?", placeholder: 'e.g. 28 kg' },
  { type: 'text', key: 'microchip', label: "What is your dog's microchip number?", placeholder: 'Optional — leave blank if none' },
  { type: 'text', key: 'colorMarkings', label: "What are your dog's colour and markings?", placeholder: 'e.g. Black and Tan' },
  { type: 'text', key: 'rabiesTag', label: "What is your dog's rabies tag number?", placeholder: 'Optional — leave blank if none' },
  { type: 'textarea', key: 'drugAllergies', label: "What are your dog's drug allergies?", placeholder: 'List any drug allergies or leave blank' },
  { type: 'textarea', key: 'foodAllergies', label: "What are your dog's food allergies?", placeholder: 'List any food allergies or leave blank' },
  { type: 'textarea', key: 'conditions', label: 'Does your dog have any chronic conditions?', placeholder: 'List any chronic conditions or leave blank' },
  { type: 'textarea', key: 'meds', label: 'What medications is your dog currently taking?', placeholder: 'List current medications or leave blank' },
  { type: 'text', key: 'owner', label: "What is the primary owner's full name?", placeholder: 'e.g. John Doe' },
  { type: 'text', key: 'ownerAddress', label: "What is the owner's address?", placeholder: 'Street address' },
  { type: 'tel', key: 'ownerPhone', label: "What is the owner's phone number?", placeholder: '+1 (555) 000-0000' },
  { type: 'email', key: 'ownerEmail', label: "What is the owner's email address?", placeholder: 'you@email.com' },
  { type: 'text', key: 'emergencyContact', label: 'Who is the emergency contact?', placeholder: 'Full name' },
  { type: 'tel', key: 'emergencyPhone', label: "What is the emergency contact's phone number?", placeholder: 'Phone number' },
  { type: 'text', key: 'vetClinic', label: 'What is the name of your primary vet clinic?', placeholder: 'Clinic name' },
  { type: 'tel', key: 'vetPhone', label: 'What is the primary vet clinic phone number?', placeholder: 'Clinic phone' },
  { type: 'text', key: 'emergencyVet', label: 'What is your 24/7 emergency vet clinic name?', placeholder: 'Emergency clinic name' },
  { type: 'tel', key: 'emergencyVetPhone', label: 'What is the emergency vet clinic phone number?', placeholder: 'Emergency clinic phone' },
  { type: 'vaccination', vaccineKey: 'vaccineRabies', vaccineName: 'Rabies', label: 'Rabies — what is the current vaccination status?' },
  { type: 'vaccination', vaccineKey: 'vaccineDHPP', vaccineName: 'DHPP', label: 'DHPP — what is the current vaccination status?' },
  { type: 'vaccination', vaccineKey: 'vaccineBordetella', vaccineName: 'Bordetella', label: 'Bordetella — what is the current vaccination status?' },
  { type: 'vaccination', vaccineKey: 'vaccineLeptospirosis', vaccineName: 'Leptospirosis', label: 'Leptospirosis — what is the current vaccination status?' },
  { type: 'vaccination', vaccineKey: 'vaccineInfluenza', vaccineName: 'Canine Influenza', label: 'Canine Influenza — what is the current vaccination status?' },
  { type: 'vaccination', vaccineKey: 'vaccineLyme', vaccineName: 'Lyme Disease', label: 'Lyme Disease — what is the current vaccination status?' },
  { type: 'vaccination', vaccineKey: 'vaccineOther', vaccineName: 'Other', label: 'Any other vaccinations — what is the current status?' },
  { type: 'textarea', key: 'meds', label: 'Medication log — list your dog medications', helper: 'Include name, dosage, frequency and prescribing vet for each medication', placeholder: 'e.g. Apoquel 16mg once daily — Dr Smith' },
  { type: 'textarea', key: 'conditions', label: 'Medical history — list any past procedures or illnesses', placeholder: 'e.g. Spay surgery Jan 2023 — City Vet Clinic' },
  { type: 'textarea', key: 'vetComments', label: "Vet's comments — is there anything the vet would like to note?", placeholder: 'Leave blank if not applicable' },
  { type: 'textarea', key: 'ownerComments', label: "Owner's comments — any final notes as the owner of this dog?", placeholder: 'Leave blank if not applicable' },
  { type: 'checkbox-group', label: 'Handling notes — are there any behavioral or handling risks?', helper: 'Mark any risks your vet or sitter should know.', options: [{ key: 'handlingMuzzle', label: 'Muzzle required' }, { key: 'handlingAnxiety', label: 'High anxiety' }, { key: 'handlingFearBiter', label: 'Fear biter' }, { key: 'handlingEscape', label: 'Escape risk' }, { key: 'handlingSedation', label: 'Sedation required' }, { key: 'handlingTwoPerson', label: 'Two-person restraint' }] },
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
  if (!value) return "";
  try { return new Date(value).toLocaleDateString(); } catch { return value; }
}

function getSectionLabel(step: number): string {
  if (step <= 9) return 'Dog details';
  if (step <= 13) return 'Critical alerts';
  if (step <= 23) return 'Owner & vet info';
  if (step <= 30) return 'Vaccination history';
  if (step === 31) return 'Medication log';
  if (step === 32) return 'Medical history';
  if (step === 33) return "Vet's comments";
  if (step === 34) return "Owner's comments";
  return 'Handling notes';
}

function PreviewVariantWrapper({ variant, children }: { variant: Variant; children: React.ReactNode; }) {
  const styles: Record<Variant, string> = {
    A: "border-neutral-100 bg-white",
    B: "border-slate-300 bg-white",
    C: "border-slate-300 bg-white",
    D: "border-slate-300 bg-white",
    E: "border-slate-300 bg-white",
    F: "border-slate-300 bg-white",
    G: "border-slate-300 bg-white",
  };
  return (
    <div className={cn("border", variant === "A" ? "shadow-none" : "shadow-sm", styles[variant], variant === "A" ? "p-0 overflow-hidden" : "")}>
      {children}
    </div>
  );
}

export default function DogHealthRecordWizardPageV2() {
  const [mode, setMode] = useState<Mode>("owner");
  const [variant, setVariant] = useState<Variant>("A");
  const [step, setStep] = useState(1);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewSize, setViewSize] = useState<'A4' | 'A5'>('A4');
  const [form, setForm] = useState<FormState>(initialForm);
  const [textareaExpanded, setTextareaExpanded] = useState(false);
  const [vaccineOpenKey, setVaccineOpenKey] = useState<string | null>(null);
  const [downloadStep, setDownloadStep] = useState(0);
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadCode, setDownloadCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [downloadError, setDownloadError] = useState('');

  const steps = mode === "owner" ? ownerSteps : clinicSteps;
  const currentStep = steps[step - 1];
  const progress = useMemo(() => Math.round((step / steps.length) * 100), [step, steps.length]);

  useEffect(() => { setStep(1); }, [mode]);
  useEffect(() => {
    return () => { if (form.photoUrl) URL.revokeObjectURL(form.photoUrl); };
  }, [form.photoUrl]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (form.photoUrl) URL.revokeObjectURL(form.photoUrl);
    const objectUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, photoUrl: objectUrl, photoName: file.name }));
  }

  function handleNext() {
    setTextareaExpanded(false);
    setVaccineOpenKey(null);
    setStep((prev) => Math.min(prev + 1, steps.length));
  }

  function handleBack() {
    setTextareaExpanded(false);
    setVaccineOpenKey(null);
    setStep((prev) => Math.max(prev - 1, 1));
  }

  function handleReset() {
    if (form.photoUrl) URL.revokeObjectURL(form.photoUrl);
    setForm(initialForm);
    setStep(1);
  }

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
        {(["A", "B", "C", "D"] as Variant[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded border text-xs font-bold transition",
              variant === v ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
            )}
          >{v}</button>
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
            STEP {step}&nbsp;&middot;&nbsp;<span className="font-normal normal-case text-slate-400">{getSectionLabel(step)}</span>
          </div>
          <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
            {progress}% complete
          </div>
        </div>

        <div className="mt-3">
          <label className="flex items-center gap-2 text-lg font-bold text-slate-900">
            {currentStep.label} {currentStep.type === "file" && <span className="text-xl">📷</span>}
          </label>
          {currentStep.helper && <p className="mt-1 text-xs text-slate-500">{currentStep.helper}</p>}
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

          {(currentStep.type === "text" || currentStep.type === "email" || currentStep.type === "tel") && (
            <input
              type={currentStep.type}
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
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}

          {currentStep.type === "textarea" && (() => {
            const val = String(form[currentStep.key] ?? "");
            return textareaExpanded ? (
              <div className="rounded-xl border border-slate-300 bg-white overflow-hidden">
                <textarea
                  autoFocus
                  rows={4}
                  value={val}
                  onChange={(e) => updateField(currentStep.key, e.target.value as never)}
                  placeholder={currentStep.placeholder}
                  className="w-full px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 resize-none"
                />
                <div className="flex justify-end border-t border-slate-100 px-3 py-2">
                  <button type="button" onClick={() => setTextareaExpanded(false)} className="rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-700">Done</button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => setTextareaExpanded(true)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-left text-sm hover:border-slate-400">
                {val ? <span className="text-slate-900 truncate">{val}</span> : <span className="text-slate-400">{currentStep.placeholder}</span>}
              </button>
            );
          })()}

          {currentStep.type === "vaccination" && (() => {
            const vaccineKey = currentStep.vaccineKey;
            const rec = (form[vaccineKey] as VaccinationRecord) ?? { status: '', lastDate: '', nextDate: '' };
            const statusColors: Record<string, string> = {
              'Current': 'text-emerald-700 bg-emerald-50 border-emerald-200',
              'Due Soon': 'text-amber-700 bg-amber-50 border-amber-200',
              'Overdue': 'text-rose-700 bg-rose-50 border-rose-200',
              'Not vaccinated': 'text-slate-500 bg-slate-50 border-slate-200',
            };
            const updateVaccine = (field: keyof VaccinationRecord, value: string) => {
              setForm((prev) => ({ ...prev, [vaccineKey]: { ...(prev[vaccineKey] as VaccinationRecord), [field]: value } }));
            };
            const isOpen = vaccineOpenKey === String(vaccineKey);
            return (
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setVaccineOpenKey(isOpen ? null : String(vaccineKey))}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-left hover:border-slate-400 flex items-center justify-between"
                >
                  {rec.status ? (
                    <span className={cn('inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold', statusColors[rec.status] ?? 'border-slate-200 bg-white text-slate-600')}>{rec.status}</span>
                  ) : (
                    <span className="text-sm text-slate-400">Tap to set status and dates</span>
                  )}
                  <span className="text-slate-400 text-xs">{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', marginTop: 4, overflow: 'hidden' }}>
                    <div className="px-4 pt-4 pb-2 space-y-3">
                      <div>
                        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Status</div>
                        <div className="flex flex-wrap gap-2">
                          {['Current', 'Due Soon', 'Overdue', 'Not vaccinated'].map((s) => (
                            <button key={s} type="button" onClick={() => updateVaccine('status', s)}
                              className={cn('rounded-full border px-3 py-1 text-xs font-semibold transition', rec.status === s ? statusColors[s] : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400')}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Last date</div>
                          <input type="date" value={rec.lastDate} onChange={(e) => updateVaccine('lastDate', e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400" />
                        </div>
                        <div>
                          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Next due</div>
                          <input type="date" value={rec.nextDate} onChange={(e) => updateVaccine('nextDate', e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end border-t border-slate-100 px-3 py-2">
                      <button type="button" onClick={() => setVaccineOpenKey(null)} className="rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-700">Done</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {currentStep.type === "checkbox-group" && (
            <div className="space-y-2">
              {currentStep.options.map((option) => (
                <label key={option.key} className="flex cursor-pointer items-center gap-3 py-1">
                  <input
                    type="checkbox"
                    checked={Boolean(form[option.key])}
                    onChange={(e) => updateField(option.key, e.target.checked as never)}
                    className="h-4 w-4 rounded border-slate-300 accent-slate-900"
                  />
                  <span className="text-sm text-slate-800">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <button type="button" onClick={handleBack} disabled={step === 1}
            className={cn("text-sm font-semibold transition", step === 1 ? "cursor-not-allowed text-slate-300" : "text-slate-600 hover:text-slate-900")}>
            ← Back
          </button>
          <div className="flex items-center gap-2 w-[160px]">
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-slate-900 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">{step}/{steps.length}</span>
          </div>
          <button type="button" onClick={handleNext} disabled={step === steps.length}
            className={cn("text-sm font-semibold transition", step === steps.length ? "cursor-not-allowed text-slate-300" : "text-slate-900 hover:text-slate-600")}>
            Next →
          </button>
        </div>
      </div>
    </section>
  );

  const DocumentTemplateA = () => (
    <div style={{ background: '#fff', width: '100%', fontFamily: "'Barlow', 'Helvetica Neue', Helvetica, Arial, sans-serif", color: '#111' }}>
      <div style={{ textAlign: 'center', paddingTop: 4, paddingBottom: 8 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: '#111', margin: 0, letterSpacing: '-0.01em' }}>Dog Health Record</h1>
      </div>

      {/* Dog Details */}
      <div style={{ background: '#111', padding: '6px 10px' }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Dog Details</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', border: '1px solid #e0e0e0', borderTop: 'none', marginBottom: 14 }}>
        <div style={{ borderRight: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px', minHeight: 36, borderBottom: '1px solid #e0e0e0' }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#111', whiteSpace: 'nowrap' }}>DATE:</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField('docDate', e.currentTarget.textContent || '')} style={{ fontSize: 12, fontWeight: 500, color: '#222', outline: 'none', minWidth: 60, cursor: 'text' }}>{form.docDate || new Date().toLocaleDateString()}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px', minHeight: 36, borderBottom: '1px solid #e0e0e0' }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#111', whiteSpace: 'nowrap' }}>DOG NAME:</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField('name', e.currentTarget.textContent || '')} style={{ fontSize: 12, fontWeight: 500, color: '#222', outline: 'none', minWidth: 40 }}>{form.name || ''}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px', minHeight: 36, borderBottom: '1px solid #e0e0e0' }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#111', whiteSpace: 'nowrap' }}>BREED:</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField('breed', e.currentTarget.textContent || '')} style={{ fontSize: 12, fontWeight: 500, color: '#222', outline: 'none', minWidth: 40 }}>{form.breed || ''}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px', minHeight: 36, borderBottom: '1px solid #e0e0e0' }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#111', whiteSpace: 'nowrap' }}>DATE OF BIRTH:</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField('dob', e.currentTarget.textContent || '')} style={{ fontSize: 12, fontWeight: 500, color: '#222', outline: 'none', minWidth: 40 }}>{form.dob ? prettyDate(form.dob) : ''}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px', minHeight: 36 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#111', whiteSpace: 'nowrap' }}>SEX:</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField('sex', e.currentTarget.textContent || '')} style={{ fontSize: 12, fontWeight: 500, color: '#222', outline: 'none', minWidth: 40 }}>{form.sex || ''}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', minHeight: 180, overflow: 'hidden' }}>
          {form.photoUrl ? (
            <img src={form.photoUrl} alt="Dog" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', width: '100%', height: '100%' }}>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
              <span style={{ fontSize: 9, color: '#bbb', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Upload Dog Photo</span>
            </label>
          )}
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px', minHeight: 36, borderRight: '1px solid #e0e0e0' }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#111', whiteSpace: 'nowrap' }}>WEIGHT:</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField('weight', e.currentTarget.textContent || '')} style={{ fontSize: 12, fontWeight: 500, color: '#222', outline: 'none', minWidth: 40 }}>{form.weight || ''}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px', minHeight: 36 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#111', whiteSpace: 'nowrap' }}>MICROCHIP NO:</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField('microchip', e.currentTarget.textContent || '')} style={{ fontSize: 12, fontWeight: 500, color: '#222', outline: 'none', minWidth: 40 }}>{form.microchip || ''}</span>
          </div>
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px', minHeight: 36, borderRight: '1px solid #e0e0e0' }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#111', whiteSpace: 'nowrap' }}>COLOUR & MARKINGS:</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField('colorMarkings', e.currentTarget.textContent || '')} style={{ fontSize: 12, fontWeight: 500, color: '#222', outline: 'none', minWidth: 40 }}>{form.colorMarkings || ''}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px', minHeight: 36 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#111', whiteSpace: 'nowrap' }}>RABIES TAG:</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField('rabiesTag', e.currentTarget.textContent || '')} style={{ fontSize: 12, fontWeight: 500, color: '#222', outline: 'none', minWidth: 40 }}>{form.rabiesTag || ''}</span>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      <div style={{ background: '#111', padding: '6px 10px' }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Critical Alerts</span>
      </div>
      <div style={{ border: '1px solid #e0e0e0', borderTop: 'none', marginBottom: 14 }}>
        {[
          { label: 'Drug Allergies:', key: 'drugAllergies' as keyof FormState },
          { label: 'Food Allergies:', key: 'foodAllergies' as keyof FormState },
          { label: 'Chronic Conditions:', key: 'conditions' as keyof FormState },
          { label: 'Current Medications:', key: 'meds' as keyof FormState },
        ].map(({ label, key }, i, arr) => (
          <div key={key} style={{ borderBottom: i < arr.length - 1 ? '1px solid #e0e0e0' : 'none', padding: '5px 8px', background: '#fff5f7', minHeight: 36, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#b03060', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{label}</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField(key, e.currentTarget.textContent || '')} style={{ fontSize: 12, color: '#222', fontWeight: 500, outline: 'none', minWidth: 40 }}>{String(form[key] || '')}</span>
          </div>
        ))}
      </div>

      {/* Owner Information */}
      <div style={{ background: '#111', padding: '6px 10px' }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Owner Information</span>
      </div>
      <div style={{ border: '1px solid #e0e0e0', borderTop: 'none', marginBottom: 14 }}>
        {[
          { label: 'Owner Name:', key: 'owner' as keyof FormState },
          { label: 'Address:', key: 'ownerAddress' as keyof FormState },
          { label: 'Emergency Contact:', key: 'emergencyContact' as keyof FormState },
          { label: 'Emergency Phone:', key: 'emergencyPhone' as keyof FormState },
        ].map(({ label, key }, i, arr) => (
          <div key={key} style={{ borderBottom: i < arr.length - 1 ? '1px solid #e0e0e0' : 'none', padding: '5px 8px', minHeight: 36, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#111', whiteSpace: 'nowrap' }}>{label}</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField(key, e.currentTarget.textContent || '')} style={{ fontSize: 12, color: '#222', fontWeight: 500, outline: 'none', minWidth: 40 }}>{String(form[key] || '')}</span>
          </div>
        ))}
        <div style={{ display: 'flex', borderTop: '1px solid #e0e0e0', minHeight: 36 }}>
          <div style={{ flex: '0 0 50%', padding: '5px 8px', borderRight: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#111' }}>Phone:</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField('ownerPhone', e.currentTarget.textContent || '')} style={{ fontSize: 12, color: '#222', fontWeight: 500, outline: 'none', minWidth: 40 }}>{form.ownerPhone || ''}</span>
          </div>
          <div style={{ flex: '0 0 50%', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#111' }}>Email:</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField('ownerEmail', e.currentTarget.textContent || '')} style={{ fontSize: 12, color: '#222', fontWeight: 500, outline: 'none', minWidth: 40 }}>{form.ownerEmail || ''}</span>
          </div>
        </div>
      </div>

      {/* Veterinary Information */}
      <div style={{ background: '#111', padding: '6px 10px' }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Veterinary Information</span>
      </div>
      <div style={{ border: '1px solid #e0e0e0', borderTop: 'none', marginBottom: 14 }}>
        {[
          { label: 'Primary Vet Clinic:', key: 'vetClinic' as keyof FormState },
          { label: 'Clinic Phone:', key: 'vetPhone' as keyof FormState },
          { label: 'Emergency Vet:', key: 'emergencyVet' as keyof FormState },
          { label: 'Emergency Vet Phone:', key: 'emergencyVetPhone' as keyof FormState },
        ].map(({ label, key }, i, arr) => (
          <div key={key} style={{ borderBottom: i < arr.length - 1 ? '1px solid #e0e0e0' : 'none', padding: '5px 8px', minHeight: 36, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#111', whiteSpace: 'nowrap' }}>{label}</span>
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField(key, e.currentTarget.textContent || '')} style={{ fontSize: 12, color: '#222', fontWeight: 500, outline: 'none', minWidth: 40 }}>{String(form[key] || '')}</span>
          </div>
        ))}
      </div>

      {/* Vaccination History */}
      <div style={{ background: '#111', padding: '6px 10px' }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Vaccination History</span>
      </div>
      <div style={{ border: '1px solid #e0e0e0', borderTop: 'none', marginBottom: 14, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {([
          { label: 'Rabies', recKey: 'vaccineRabies' },
          { label: 'DHPP', recKey: 'vaccineDHPP' },
          { label: 'Bordetella', recKey: 'vaccineBordetella' },
          { label: 'Leptospirosis', recKey: 'vaccineLeptospirosis' },
          { label: 'Canine Influenza', recKey: 'vaccineInfluenza' },
          { label: 'Lyme Disease', recKey: 'vaccineLyme' },
          { label: 'Other', recKey: 'vaccineOther' },
        ] as { label: string; recKey: keyof FormState }[]).map(({ label, recKey }, i, arr) => {
          const isLast = i === arr.length - 1;
          const isOdd = arr.length % 2 === 1;
          const full = isLast && isOdd;
          const rec = (form[recKey] as VaccinationRecord) || { status: '', lastDate: '', nextDate: '' };
          return (
            <div key={label} style={{ gridColumn: full ? '1 / -1' : undefined, borderRight: !full && i % 2 === 0 ? '1px solid #e0e0e0' : undefined, borderBottom: i < arr.length - (isOdd ? 1 : 2) ? '1px solid #e0e0e0' : 'none' }}>
              <div style={{ padding: '6px 8px', borderBottom: '1px solid #e0e0e0', background: '#fafafa' }}>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#111' }}>{label}</span>
              </div>
              <div style={{ padding: '5px 8px', borderBottom: '1px solid #e0e0e0', display: 'flex', gap: 12, alignItems: 'center' }}>
                {['Current', 'Due Soon', 'Overdue', 'Not vaccinated'].map((s) => (
                  <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#444', cursor: 'pointer' }}>
                    <input type="checkbox" checked={rec.status === s} onChange={() => setForm(prev => ({ ...prev, [recKey]: { ...(prev[recKey] as VaccinationRecord), status: rec.status === s ? '' : s } }))} style={{ width: 11, height: 11, accentColor: '#111' }} />
                    {s}
                  </label>
                ))}
              </div>
              <div style={{ padding: '5px 8px', fontSize: 9, color: '#888', display: 'flex', gap: 16 }}>
                <span>Date Given: {rec.lastDate ? prettyDate(rec.lastDate) : '___/___/___'}</span>
                <span>Next Due: {rec.nextDate ? prettyDate(rec.nextDate) : '___/___/___'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Medication Log */}
      <div style={{ background: '#111', padding: '6px 10px' }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Medication Log</span>
      </div>
      <div style={{ border: '1px solid #e0e0e0', borderTop: 'none', marginBottom: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '22% 14% 16% 24% 14%', background: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
          {['Medication', 'Dosage', 'Frequency', 'Prescribing Vet', 'Start'].map((h, i, arr) => (
            <div key={h} style={{ padding: '5px 8px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#555', borderRight: i < arr.length - 1 ? '1px solid #e0e0e0' : 'none' }}>{h}</div>
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} style={{ display: 'grid', gridTemplateColumns: '22% 14% 16% 24% 14%', borderBottom: row < 5 ? '1px solid #e0e0e0' : 'none', minHeight: 28 }}>
            {[0, 1, 2, 3, 4].map((col) => (
              <div key={col} style={{ padding: '5px 8px', fontSize: 11, color: '#333', borderRight: col < 4 ? '1px solid #e0e0e0' : 'none' }}>{row === 1 && col === 0 ? (form.meds || '') : ''}</div>
            ))}
          </div>
        ))}
      </div>

      {/* Medical History */}
      <div style={{ background: '#111', padding: '6px 10px' }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Medical History</span>
      </div>
      <div style={{ border: '1px solid #e0e0e0', borderTop: 'none', marginBottom: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '16% 30% 24% 30%', background: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
          {['Date', 'Condition / Procedure', 'Treating Vet', 'Notes'].map((h, i, arr) => (
            <div key={h} style={{ padding: '5px 8px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#555', borderRight: i < arr.length - 1 ? '1px solid #e0e0e0' : 'none' }}>{h}</div>
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} style={{ display: 'grid', gridTemplateColumns: '16% 30% 24% 30%', borderBottom: row < 5 ? '1px solid #e0e0e0' : 'none', minHeight: 28 }}>
            {[0, 1, 2, 3].map((col) => (
              <div key={col} style={{ padding: '5px 8px', fontSize: 11, color: '#333', borderRight: col < 3 ? '1px solid #e0e0e0' : 'none' }}></div>
            ))}
          </div>
        ))}
      </div>

      {/* Vet's Comments */}
      <div style={{ background: '#111', padding: '6px 10px' }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{"Vet's Comments"}</span>
      </div>
      <div style={{ border: '1px solid #e0e0e0', borderTop: 'none', marginBottom: 14, minHeight: 80, padding: '5px 8px' }}>
        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField('vetComments', e.currentTarget.textContent || '')} style={{ fontSize: 12, color: '#222', outline: 'none', display: 'block', minHeight: 60 }}>{form.vetComments || ''}</span>
      </div>

      {/* Owner's Comments */}
      <div style={{ background: '#111', padding: '6px 10px' }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{"Owner's Comments"}</span>
      </div>
      <div style={{ border: '1px solid #e0e0e0', borderTop: 'none', marginBottom: 14, minHeight: 80, padding: '5px 8px' }}>
        <span contentEditable suppressContentEditableWarning onBlur={(e) => updateField('ownerComments', e.currentTarget.textContent || '')} style={{ fontSize: 12, color: '#222', outline: 'none', display: 'block', minHeight: 60 }}>{form.ownerComments || ''}</span>
      </div>

      {/* Handling Notes */}
      <div style={{ background: '#111', padding: '6px 10px' }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Handling Notes</span>
      </div>
      <div style={{ border: '1px solid #e0e0e0', borderTop: 'none', marginBottom: 14, minHeight: 60, padding: '5px 8px' }}>
        <span style={{ fontSize: 12, color: '#222', fontWeight: 500 }}>{handlingFlags.length > 0 ? handlingFlags.join(', ') : ''}</span>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 2px 4px', borderTop: '1px solid #e0e0e0', marginTop: 4 }}>
        <span style={{ fontSize: 9, color: '#999', textAlign: 'right', lineHeight: 1.5 }}>
          Generated by JustPetem.com<br />Free pet document generators
        </span>
      </div>
    </div>
  );

  const PreviewSection = ({ printMode = false }: { printMode?: boolean }) => (
    <section>
      {!printMode && (
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Live Preview</span>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => { setViewSize('A4'); setViewOpen(true); }} className="text-xs font-semibold text-slate-700 underline">A4</button>
            <span className="text-xs text-slate-400">/</span>
            <button type="button" onClick={() => { setViewSize('A5'); setViewOpen(true); }} className="text-xs font-semibold text-slate-700 underline">A5</button>
            <span className="text-xs text-slate-400">·</span>
            <button type="button" onClick={() => setDownloadStep(1)} className="text-xs font-semibold text-slate-700 underline">⬇ Download</button>
          </div>
        </div>
      )}

      <div className={cn("mt-3", printMode ? "mx-auto w-[794px] max-w-full" : "w-full")}>
        <PreviewVariantWrapper variant={variant}>
          {variant !== "A" && (
            <div className={cn("border-b px-4 py-4", variant === "B" && "bg-white", variant === "C" && "bg-white", variant === "D" && "bg-white", variant === "E" && "bg-gradient-to-b from-rose-50 to-white", variant === "F" && "bg-rose-50", variant === "G" && "bg-white")}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  {variant === "C" ? (<><div className="text-2xl font-extrabold uppercase tracking-[0.12em] text-slate-900">{mode === "owner" ? "Pet Health" : "Clinic Health"}</div><div className="text-2xl font-extrabold uppercase tracking-[0.12em] text-slate-900">{previewTitleByVariant[variant]}</div></>) :
                    variant === "D" ? (<><div className="text-xl font-extrabold uppercase tracking-[0.18em] text-slate-900">Pet Health</div><div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">{previewTitleByVariant[variant]}</div></>) :
                      variant === "G" ? (<div className="text-2xl font-medium text-amber-700">{previewTitleByVariant[variant]}</div>) :
                        (<><div className="text-[22px] font-bold tracking-tight text-slate-900">{previewTitleByVariant[variant]}</div><div className="mt-1 text-xs text-slate-500">{mode === "owner" ? "Printable owner summary" : "Printable clinic summary"}</div></>)}
                </div>
                <div className={cn("flex-shrink-0 overflow-hidden border bg-slate-100", variant === "B" && "h-44 w-44 rounded-none", variant === "C" && "h-16 w-16 rounded-md", variant === "D" && "h-20 w-20 rounded-xl border-2 border-amber-600", variant === "E" && "h-36 w-36 rounded-2xl", variant === "F" && "h-20 w-20 rounded-xl border-2 border-slate-500", variant === "G" && "h-16 w-16 rounded-full")}>
                  {form.photoUrl ? (<img src={form.photoUrl} alt="Dog" className="h-full w-full object-cover" />) : (
                    <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1">
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      <span className="text-center text-[9px] font-semibold uppercase tracking-wide text-slate-400" style={{ padding: '0 4px' }}>Dog Photo</span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className={cn("space-y-5", variant !== "A" && "p-4 md:p-5")}>
            {variant === "C" ? (
              <>
                <div className="mx-auto max-w-[430px] overflow-hidden border border-slate-200">
                  {[["Primary Vet", form.vetClinic || "—", "bg-blue-500", "bg-cyan-50"], ["Vet Address", form.ownerAddress || "—", "bg-orange-400", "bg-orange-50"], ["Clinic Hours", "Add hours", "bg-pink-500", "bg-pink-50"]].map(([label, value, leftClass, rightClass], idx) => (
                    <div key={label} className={cn("grid min-h-10 grid-cols-[140px_1fr] text-sm", idx !== 2 && "border-b border-slate-200")}>
                      <div className={cn("flex items-center px-3 font-bold text-white", leftClass)}>{label}</div>
                      <div className={cn("flex items-center px-3 text-slate-800", rightClass)}>{value}</div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-sm font-extrabold uppercase tracking-[0.16em] text-orange-400">Routine & Emergency Visits</div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead><tr>{["Reason", "Date / Time", "Medicines Given", "Reaction To Medicine"].map((col) => (<th key={col} className="border border-slate-300 bg-indigo-900 px-3 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-white">{col}</th>))}</tr></thead>
                    <tbody>{Array.from({ length: 10 }).map((_, idx) => { const rowBg = idx % 3 === 0 ? "bg-cyan-50" : idx % 3 === 1 ? "bg-orange-50" : "bg-pink-50"; return (<tr key={idx}><td className={cn("border border-slate-200 px-3 py-3", rowBg)}>{idx === 0 ? (form.conditions || "Routine visit") : " "}</td><td className={cn("border border-slate-200 px-3 py-3", rowBg)}>{idx === 0 ? prettyDate(form.dob) : " "}</td><td className={cn("border border-slate-200 px-3 py-3", rowBg)}>{idx === 0 ? (form.meds || " ") : " "}</td><td className={cn("border border-slate-200 px-3 py-3", rowBg)}>{idx === 0 ? (form.drugAllergies || " ") : " "}</td></tr>); })}</tbody>
                  </table>
                </div>
              </>
            ) : variant === "D" ? (
              <div className="mx-auto max-w-md">
                <div className="rounded-full bg-slate-900 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">Pet Information</div>
                <div className="mt-3 space-y-3">{[["Pet Name", form.name], ["Species", "Dog / Cat"], ["Breed", form.breed], ["Date of Birth", prettyDate(form.dob)], ["Sex", form.sex], ["Color / Markings", form.colorMarkings], ["Microchip Number", form.microchip]].map(([label, value]) => (<div key={label}><div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div><div className="min-h-6 border-b border-slate-300 text-sm text-slate-900">{value || " "}</div></div>))}</div>
                <div className="mt-5 rounded-full bg-slate-900 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">Owner Information</div>
                <div className="mt-3 space-y-3">{[["Owner Name", form.owner], ["Address", form.ownerAddress], ["Phone", form.ownerPhone], ["Email", form.ownerEmail]].map(([label, value]) => (<div key={label}><div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div><div className="min-h-6 border-b border-slate-300 text-sm text-slate-900">{value || " "}</div></div>))}</div>
              </div>
            ) : variant === "E" ? (
              <>
                <div className="grid gap-5 md:grid-cols-[1fr_170px]">
                  <div className="space-y-3">{[["Name", form.name], ["Breed", form.breed], ["Date of Birth", prettyDate(form.dob)], ["Sex", form.sex], ["Microchip No.", form.microchip], ["Color / Markings", form.colorMarkings]].map(([label, value]) => (<div key={label}><div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div><div className="min-h-6 border-b border-slate-300 text-sm text-slate-900">{value || " "}</div></div>))}</div>
                  <div className="relative"><div className="absolute inset-0 flex items-center justify-center text-[110px] opacity-10">🐾</div><div className="relative mx-auto h-[150px] w-[150px] overflow-hidden rounded-2xl border-2 border-slate-300 bg-white">{form.photoUrl ? (<img src={form.photoUrl} alt="Dog" className="h-full w-full object-cover" />) : (<div className="flex h-full w-full items-center justify-center text-sm text-slate-400">Add photo</div>)}</div></div>
                </div>
                <div className="pt-3 text-center text-xl font-extrabold text-slate-900">CONTACT INFO</div>
                <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">{[["Owner Name", form.owner], ["Phone Number", form.ownerPhone], ["Address", form.ownerAddress], ["Vet Clinic", form.vetClinic], ["Vet Phone", form.vetPhone]].map(([label, value]) => (<div key={label} className="mb-3 last:mb-0"><div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div><div className="min-h-6 border-b border-slate-300 text-sm text-slate-900">{value || " "}</div></div>))}</div>
              </>
            ) : variant === "F" ? (
              <div className="space-y-3">{[{ title: "Pet Information", rows: [["Name", form.name], ["Breed", form.breed], ["Age", prettyDate(form.dob)], ["Sex", form.sex], ["Color / Markings", form.colorMarkings], ["Microchip No.", form.microchip]] }, { title: "Owner Information", rows: [["Owner's Name", form.owner], ["Address", form.ownerAddress], ["Phone Number", form.ownerPhone], ["Email Address", form.ownerEmail]] }, { title: "Other Information", rows: [["Emergency Contact Name", form.emergencyContact], ["Phone Number", form.emergencyPhone], ["Veterinarian's Name", form.vetClinic], ["Phone Number", form.vetPhone]] }].map((card) => (<div key={card.title} className="rounded-xl border-2 border-slate-500 bg-white p-4"><div className="mb-3 text-center text-base font-bold text-slate-700">{card.title}</div><div className="space-y-3">{card.rows.map(([label, value]) => (<div key={label}><div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div><div className="min-h-6 border-b border-slate-300 text-sm text-slate-900">{value || " "}</div></div>))}</div></div>))}</div>
            ) : variant === "G" ? (
              <div className="space-y-3">{[["Body Weight", form.weight], ["Temperature", "38.4°C"], ["Body Condition Score", "5/9"], ["Today", prettyDate(form.dob)], ["We are visiting the clinic of", form.vetClinic], ["For examination", form.conditions], ["Symptom(s)", form.conditions], ["Diagnosis", form.drugAllergies], ["Prescription(s)", form.meds], ["Dietary Restriction", form.foodAllergies], ["Phone", form.vetPhone], ["Email", form.ownerEmail]].map(([label, value]) => (<div key={label}><div className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div><div className="min-h-6 border-b border-slate-300 text-sm text-slate-900">{value || " "}</div></div>))}</div>
            ) : (
              <DocumentTemplateA />
            )}
          </div>
        </PreviewVariantWrapper>
      </div>
    </section>
  );

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-sheet, .print-sheet * { visibility: visible; }
          .print-sheet { position: absolute; left: 0; top: 0; width: 100%; background: white; padding: 24px; margin: 0; }
        }
      `}</style>

      <div className="min-h-screen bg-white">
        <PageHeader />
        <div className="mx-auto max-w-[580px] px-4 pt-2 pb-8 sm:pb-10">
          <div className="mb-6 flex items-center gap-2">
            <Link href="/tools" className="flex items-center gap-1 text-sm text-neutral-600 hover:text-black transition-colors">Tools</Link>
            <span className="text-neutral-400">/</span>
            <span className="text-sm text-neutral-900 font-medium">Dog Health Record Generator</span>
          </div>
          <HeaderSection />
          <ControlsSection />
          <WizardSection />
          <PreviewSection />
        </div>

        <div className="print-sheet absolute -left-[99999px] top-0 w-[794px] bg-white">
          <div className="mx-auto max-w-[794px]"><PreviewSection printMode /></div>
        </div>

        {viewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onClick={() => setViewOpen(false)}>
            <div className="max-h-[90vh] w-full overflow-auto rounded-2xl bg-stone-100 p-4 md:p-6" style={{ maxWidth: viewSize === 'A4' ? 860 : 620 }} onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-bold text-slate-900">{viewSize} View</div>
                <button type="button" onClick={() => setViewOpen(false)} className="text-sm font-semibold text-slate-600 hover:text-slate-900">Close</button>
              </div>
              <div style={{ maxWidth: viewSize === 'A4' ? 794 : 559, margin: '0 auto', padding: 32, fontSize: viewSize === 'A4' ? '14px' : '13px', lineHeight: 1.6 }}>
                <PreviewSection printMode />
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto mt-2 flex w-full max-w-[580px] items-center justify-between gap-4 text-xs text-slate-500" style={{ marginTop: 8 }}>
          <span>Tip: fill in each step and your document updates live below.</span>
          <button type="button" onClick={handleReset} className="font-semibold text-slate-700 hover:text-slate-900">Reset form</button>
        </div>

        <section className="mx-auto mt-16 w-full max-w-[580px]">
          <h2 className="text-lg font-semibold text-black mb-4">Who Uses This</h2>
          <div className="overflow-hidden rounded-lg border border-neutral-200">
            {[
              { case: "USE CASE 1", title: "New dog owners starting their first health record", body: "Fill in every detail online and download a finished dog health record PDF from day one." },
              { case: "USE CASE 2", title: "Dog owners rebuilding lost records", body: "Recreate your dog's complete medical history online and download a finished PDF in minutes." },
              { case: "USE CASE 3", title: "Owners switching to a new vet clinic", body: "Fill in your dog's vaccination and medical history and download a complete PDF to bring to your new clinic." },
              { case: "USE CASE 4", title: "Pet sitters and dog walkers", body: "Clients generate a finished record with allergies, medications, and emergency contacts before handing over care." },
              { case: "USE CASE 5", title: "Dog owners travelling internationally", body: "Fill in vaccination history and health details online and download a finished PDF for customs and quarantine officials." },
              { case: "USE CASE 6", title: "Rescue and shelter workers", body: "Fill in incoming dog details online and download a finished canine health record PDF for every intake." },
            ].map((item, index, arr) => (
              <div key={index} className={`px-4 py-3 ${index !== arr.length - 1 ? "border-b border-neutral-100" : ""}`}>
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">{item.case}</p>
                <p className="mt-1 text-base font-semibold text-black">{item.title}</p>
                <p className="mt-1 text-sm font-normal text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-[580px]">
          <h2 className="text-lg font-semibold text-black mb-4">What Your Dog Health Record Includes</h2>
          <p className="text-base leading-relaxed text-neutral-700 font-normal mb-4">Everything a vet, sitter, or carer needs to know about your dog, covered in one finished PDF.</p>
          <div className="overflow-hidden rounded-lg border border-neutral-200">
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
              <div key={item.section} className={`px-4 py-3 ${index !== arr.length - 1 ? "border-b border-neutral-100" : ""}`}>
                <p className="text-base font-semibold text-black">{item.section}</p>
                <p className="text-sm font-normal text-neutral-600 mt-1">{item.covers}</p>
              </div>
            ))}
          </div>
        </section>

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
              <div key={item.question} className={index !== arr.length - 1 ? "border-b border-neutral-200 pb-4" : ""}>
                <h3 className="text-base font-semibold text-black">{item.question}</h3>
                <p className="mt-1 text-sm font-normal text-neutral-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-[580px] mb-10">
          <h2 className="text-lg font-semibold text-black mb-4">Related Pet Document Generators</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Dog Vaccination Record", url: "/tools/dog-vaccination-record-generator", description: "Track your dog's vaccine dates and upcoming boosters.", bg: "bg-teal-500" },
              { label: "Pet Sitter Notes", url: "/tools/pet-sitter-notes", description: "Give your sitter everything they need before you leave.", bg: "bg-violet-500" },
              { label: "Pet Emergency Card", url: "/tools/pet-emergency-card", description: "Keep critical dog info ready for any emergency.", bg: "bg-orange-500" },
              { label: "Dog Medication Tracker", url: "/tools/dog-medication-tracker-generator", description: "Log medications, dosage, and refill schedules in one place.", bg: "bg-cyan-500" },
            ].map((tool) => (
              <Link key={tool.url} href={tool.url} className={`cursor-pointer rounded-xl p-4 transition-opacity hover:opacity-90 ${tool.bg} text-white`}>
                <p className="text-sm font-semibold leading-tight">{tool.label}</p>
                <p className="mt-1.5 text-[12px] leading-snug text-white/85">{tool.description}</p>
              </Link>
            ))}
          </div>
          <Link href="/tools/pet-health-records" className="mt-3 flex items-center justify-between px-4 py-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
            <p className="text-base font-semibold text-black">All Pet Health Record Generators</p>
            <ChevronRight className="h-5 w-5 text-neutral-300" />
          </Link>
        </section>
      </div>
      <Footer />

      {downloadStep > 0 && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, maxWidth: 420, width: '100%', position: 'relative' }}>
            <button onClick={() => setDownloadStep(0)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#888' }}>×</button>
            {downloadStep === 1 && (
              <>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 8px', color: '#111' }}>Before you download</h2>
                <p style={{ fontSize: 14, color: '#666', margin: '0 0 24px', lineHeight: 1.6 }}>Join 500+ pet owners getting free templates for vaccination, travel, and emergency records for their pets.</p>
                <input type="email" value={downloadEmail} onChange={(e) => setDownloadEmail(e.target.value)} placeholder="Your email address" style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: 10, fontSize: 14, marginBottom: 12, outline: 'none' }} />
                <button onClick={() => { const code = Math.floor(100000 + Math.random() * 900000).toString(); setGeneratedCode(code); setDownloadStep(2); }} style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 12 }}>Get templates and download my dog health record</button>
                <div style={{ textAlign: 'center' }}><button onClick={() => { window.print(); setDownloadStep(0); }} style={{ background: 'none', border: 'none', fontSize: 13, color: '#888', textDecoration: 'underline', cursor: 'pointer' }}>Skip and download</button></div>
                <p style={{ fontSize: 11, color: '#aaa', textAlign: 'center', margin: '16px 0 0' }}>No spam. Unsubscribe anytime.</p>
              </>
            )}
            {downloadStep === 2 && (
              <>
                <h2 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 8px', color: '#111' }}>Check your email</h2>
                <p style={{ fontSize: 14, color: '#666', margin: '0 0 24px', lineHeight: 1.6 }}>We sent a verification code to {downloadEmail}. Enter it below.</p>
                <input type="text" value={downloadCode} onChange={(e) => { setDownloadCode(e.target.value); setDownloadError(''); }} placeholder="6-digit code" maxLength={6} style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', border: '1px solid #e0e0e0', borderRadius: 10, fontSize: 14, marginBottom: 4, outline: 'none', textAlign: 'center', letterSpacing: 8 }} />
                {downloadError && <p style={{ fontSize: 12, color: '#e00', margin: '0 0 12px' }}>{downloadError}</p>}
                <button onClick={() => { if (downloadCode === generatedCode) { setDownloadStep(3); setTimeout(() => { window.print(); setDownloadStep(0); }, 2000); } else { setDownloadError('Incorrect code. Please try again.'); } }} style={{ width: '100%', padding: '12px', background: '#111', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 12, marginTop: 8 }}>Verify and download</button>
                <div style={{ textAlign: 'center' }}><button onClick={() => { const code = Math.floor(100000 + Math.random() * 900000).toString(); setGeneratedCode(code); }} style={{ background: 'none', border: 'none', fontSize: 13, color: '#888', textDecoration: 'underline', cursor: 'pointer' }}>Resend code</button></div>
              </>
            )}
            {downloadStep === 3 && (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 8px', color: '#111' }}>You are all set</h2>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>We have emailed you your templates. Your download is starting now.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}