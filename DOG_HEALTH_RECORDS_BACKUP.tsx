"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";

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

export default function DogHealthRecordWizardPage() {
  const [mode, setMode] = useState<Mode>("owner");
  const [variant, setVariant] = useState<Variant>("A");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
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
  });

  return (
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

        <section className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-black leading-tight">
            Free Dog Health Record Generator
          </h1>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed font-normal">
            Answer a few questions about your dog. Get a complete, printable health record instantly.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
