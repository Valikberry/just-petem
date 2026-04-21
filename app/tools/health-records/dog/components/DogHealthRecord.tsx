'use client';

import React, { useState } from 'react';

interface VaccinationRecord {
  vaccine: string;
  dateGiven: string;
  nextDue: string;
  status: 'current' | 'due-soon' | 'overdue' | null;
}

interface MedicationLog {
  medication: string;
  dosage: string;
  frequency: string;
  prescribingVet: string;
  startDate: string;
}

interface MedicalHistory {
  date: string;
  conditionOrProcedure: string;
  treatingVet: string;
  notes: string;
}

interface DogHealthRecordProps {
  dogName: string;
  breed: string;
  dateOfBirth: string;
  sex: string;
  weight: string;
  microchipNumber: string;
  colourAndMarkings: string;
  spayed: boolean;
  neutered: boolean;
  rabiesTag: string;
  photoUrl?: string;

  drugAllergies: string;
  foodAllergies: string;
  chronicConditions: string;
  currentMedications: string;

  ownerName: string;
  phone: string;
  email: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;

  primaryVetClinic: string;
  veterinarianName: string;
  clinicPhone: string;
  clinicAddress: string;
  emergencyVetClinic: string;
  emergencyVetPhone: string;

  behaviourAroundStrangers: string;
  behaviourAroundAnimals: string;
  knownFears: string;
  specialInstructions: string;

  vaccinationHistory: VaccinationRecord[];
  medicationLog: MedicationLog[];
  medicalHistory: MedicalHistory[];

  vetComments: string;
  ownerComments: string;

  variant?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
}

export const DogHealthRecord: React.FC<DogHealthRecordProps> = ({
  dogName = '',
  breed = '',
  dateOfBirth = '',
  sex = '',
  weight = '',
  microchipNumber = '',
  colourAndMarkings = '',
  spayed = false,
  neutered = false,
  rabiesTag = '',
  photoUrl = '',

  drugAllergies = '',
  foodAllergies = '',
  chronicConditions = '',
  currentMedications = '',

  ownerName = '',
  phone = '',
  email = '',
  address = '',
  emergencyContactName = '',
  emergencyContactPhone = '',

  primaryVetClinic = '',
  veterinarianName = '',
  clinicPhone = '',
  clinicAddress = '',
  emergencyVetClinic = '',
  emergencyVetPhone = '',

  behaviourAroundStrangers = '',
  behaviourAroundAnimals = '',
  knownFears = '',
  specialInstructions = '',

  vaccinationHistory = [],
  medicationLog = [],
  medicalHistory = [],

  vetComments = '',
  ownerComments = '',

  variant = 'A',
}) => {
  // Checkboxes state
  const [spayedChecked, setSpayedChecked] = useState(spayed);
  const [neuteredChecked, setNeuteredChecked] = useState(neutered);
  const [vaccinationChecked, setVaccinationChecked] = useState<Record<number, Record<string, boolean>>>({});

  // Variant styles
  const getVariantStyles = () => {
    const baseStyles = {
      headerBg: 'bg-gray-900',
      headerText: 'text-white',
      borderColor: 'border-gray-300',
      sectionPadding: 'py-1.5 px-2.5',
    };

    switch (variant) {
      case 'B':
        return { ...baseStyles, headerBg: 'bg-gray-800', sectionRounded: 'rounded-sm' };
      case 'C':
        return { ...baseStyles, headerBg: 'bg-zinc-900', labelColor: 'text-gray-500' };
      case 'D':
        return { ...baseStyles, alternateHeaders: true };
      case 'E':
        return { ...baseStyles, headerBg: 'bg-transparent', headerBorder: 'border-b-2 border-gray-900', headerText: 'text-gray-900', headerPadding: 'py-1 px-0' };
      case 'F':
        return { ...baseStyles, compact: true, fontSize: 'text-[10px]' };
      case 'G':
        return { ...baseStyles, bold: true, fontSize: 'text-sm', extraPadding: 'py-3 px-3' };
      default:
        return baseStyles;
    }
  };

  const styles = getVariantStyles();

  const SectionHeader = ({ title, index }: { title: string; index: number }) => {
    const isAlternate = styles.alternateHeaders && index % 2 === 1;
    const bg = isAlternate ? 'bg-gray-700' : styles.headerBg;

    return (
      <div className={`w-full ${bg} ${styles.headerText} text-xs font-bold uppercase tracking-widest ${styles.sectionPadding}`}>
        {title}
      </div>
    );
  };

  const FieldRow = ({ label, value, fullWidth = false, colSpan = 1 }: { label: string; value: string | boolean; fullWidth?: boolean; colSpan?: number }) => {
    const displayValue = typeof value === 'boolean' ? (value ? '✓' : '—') : value || '—';

    return (
      <div className={`flex flex-col border-b ${styles.borderColor} min-h-[29px] ${fullWidth ? 'col-span-2' : ''}`}>
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-900 px-1.5 pt-1.5">{label}</div>
        <div className="text-xs text-gray-700 px-1.5 pb-1.5">{displayValue}</div>
      </div>
    );
  };

  const CheckboxField = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-3 h-3 border border-gray-500 rounded-sm accent-gray-900"
      />
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-900">{label}</span>
    </label>
  );

  const TableHeader = ({ columns }: { columns: string[] }) => (
    <div className="grid gap-0 border border-gray-900 bg-gray-100">
      <div className="grid gap-0 divide-x divide-gray-300 border-b border-gray-300" style={{ gridTemplateColumns: `${columns.map(() => '1fr').join(' ')}` }}>
        {columns.map((col, i) => (
          <div key={i} className="text-xs font-bold uppercase px-2 py-1.5">
            {col}
          </div>
        ))}
      </div>
    </div>
  );

  const TableRow = ({ cells }: { cells: string[] }) => (
    <div className="grid gap-0 divide-x divide-gray-300 border-b border-gray-300 min-h-[26px]" style={{ gridTemplateColumns: `${cells.map(() => '1fr').join(' ')}` }}>
      {cells.map((cell, i) => (
        <div key={i} className="text-xs px-2 py-1 text-gray-700">
          {cell}
        </div>
      ))}
    </div>
  );

  const vaccines = [
    'Rabies',
    'DHPP',
    'Bordetella',
    'Leptospirosis',
    'Canine Influenza',
    'Lyme Disease',
    'Other',
  ];

  const toggleVaccineCheckbox = (vaccineIndex: number, checkboxType: string) => {
    setVaccinationChecked((prev) => ({
      ...prev,
      [vaccineIndex]: {
        ...prev[vaccineIndex],
        [checkboxType]: !prev[vaccineIndex]?.[checkboxType],
      },
    }));
  };

  return (
    <>
      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          .print-document { 
            width: 794px; 
            margin: 0 auto; 
            padding: 24px;
            page-break-after: avoid;
          }
          .print-section { page-break-inside: avoid; }
          .no-print { display: none; }
        }
      `}</style>

      <div className="w-full max-w-full md:max-w-[794px] mx-auto p-4 md:p-7 bg-white text-gray-900 font-sans print-document">
        
        {/* Title */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold">Dog Health Record</h1>
          <p className="text-xs md:text-sm text-gray-600">Printable owner summary</p>
        </div>

        {/* Dog Details Section */}
        <div className="mb-4 md:mb-6 print-section border border-gray-300">
          <SectionHeader title="🐾 Dog Details" index={0} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-x divide-gray-300 bg-white">
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-0">
                <FieldRow label="Name" value={dogName} fullWidth />
                <FieldRow label="Breed" value={breed} fullWidth />
                <FieldRow label="DOB" value={dateOfBirth} fullWidth />
                <FieldRow label="Sex" value={sex} fullWidth />
                <div className="grid grid-cols-2 divide-x divide-gray-300">
                  <FieldRow label="Weight" value={weight} />
                  <FieldRow label="Microchip No" value={microchipNumber} />
                </div>
                <div className="flex items-center gap-4 border-b border-gray-300 min-h-[29px] px-1.5 py-1.5">
                  <CheckboxField label="Spayed" checked={spayedChecked} onChange={setSpayedChecked} />
                  <CheckboxField label="Neutered" checked={neuteredChecked} onChange={setNeuteredChecked} />
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-300">
                  <FieldRow label="Colour & Markings" value={colourAndMarkings} />
                  <FieldRow label="Rabies Tag" value={rabiesTag} />
                </div>
              </div>
            </div>
            <div className="md:col-span-1 flex items-center justify-center bg-gray-100 border-l border-gray-300 min-h-[140px] md:min-h-auto">
              {photoUrl ? (
                <img src={photoUrl} alt="Dog" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-gray-500 font-semibold">No photo</span>
              )}
            </div>
          </div>
        </div>

        {/* Critical Alerts Section */}
        <div className="mb-4 md:mb-6 print-section border border-gray-300">
          <SectionHeader title="⚠️ Critical Alerts" index={1} />
          <div className="grid grid-cols-1 gap-0">
            <FieldRow label="Drug Allergies" value={drugAllergies} fullWidth />
            <FieldRow label="Food Allergies" value={foodAllergies} fullWidth />
            <FieldRow label="Chronic Conditions" value={chronicConditions} fullWidth />
            <FieldRow label="Current Medications" value={currentMedications} fullWidth />
          </div>
        </div>

        {/* Owner Information */}
        <div className="mb-4 md:mb-6 print-section border border-gray-300">
          <SectionHeader title="☎️ Owner / Client Information" index={2} />
          <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-gray-300">
            <div className="grid grid-cols-1">
              <FieldRow label="Owner" value={ownerName} fullWidth />
              <FieldRow label="Phone" value={phone} fullWidth />
              <FieldRow label="Email" value={email} fullWidth />
              <FieldRow label="Address" value={address} fullWidth />
              <FieldRow label="Emergency Contact" value={emergencyContactName} fullWidth />
              <FieldRow label="Emergency Phone" value={emergencyContactPhone} fullWidth />
            </div>
            <div className="md:col-span-1 hidden md:block" />
          </div>
        </div>

        {/* Veterinary Information */}
        <div className="mb-4 md:mb-6 print-section border border-gray-300">
          <SectionHeader title="🏥 Vet Information" index={3} />
          <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-gray-300">
            <div className="grid grid-cols-1">
              <FieldRow label="Clinic" value={primaryVetClinic} fullWidth />
              <FieldRow label="Veterinarian" value={veterinarianName} fullWidth />
              <FieldRow label="Phone" value={clinicPhone} fullWidth />
              <FieldRow label="Address" value={clinicAddress} fullWidth />
            </div>
            <div className="grid grid-cols-1">
              <FieldRow label="Emergency Vet" value={emergencyVetClinic} fullWidth />
              <FieldRow label="Emergency Phone" value={emergencyVetPhone} fullWidth />
            </div>
          </div>
        </div>

        {/* Handling Notes */}
        <div className="mb-4 md:mb-6 print-section border border-gray-300">
          <SectionHeader title="🐾 Handling Notes" index={4} />
          <div className="grid grid-cols-1 gap-0">
            <FieldRow label="Behaviour Around Strangers" value={behaviourAroundStrangers} fullWidth />
            <FieldRow label="Behaviour Around Animals" value={behaviourAroundAnimals} fullWidth />
            <FieldRow label="Known Fears" value={knownFears} fullWidth />
            <FieldRow label="Special Instructions" value={specialInstructions} fullWidth />
          </div>
        </div>

        {/* Vaccination History */}
        <div className="mb-4 md:mb-6 print-section border border-gray-300">
          <SectionHeader title="💉 Vaccinations" index={5} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:divide-x md:divide-gray-300">
            {vaccines.map((vaccine, idx) => (
              <div key={idx} className="border border-gray-300 md:border-none p-2">
                <div className="border-b border-gray-200 pb-1 mb-1">
                  <div className="text-xs font-bold uppercase text-gray-900">{vaccine}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-1">
                  {['Current', 'Due Soon', 'Overdue'].map((status) => (
                    <CheckboxField
                      key={status}
                      label={status}
                      checked={vaccinationChecked[idx]?.[status] || false}
                      onChange={() => toggleVaccineCheckbox(idx, status)}
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-600 border-t border-gray-200 pt-1">
                  <div>Given: {vaccinationHistory[idx]?.dateGiven || 'MM/DD/YYYY'}</div>
                  <div>Next: {vaccinationHistory[idx]?.nextDue || 'MM/DD/YYYY'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medication Log Table */}
        <div className="mb-4 md:mb-6 print-section border border-gray-300">
          <SectionHeader title="💊 Medication Log" index={6} />
          <div className="border border-gray-900 overflow-x-auto">
            <div className="min-w-[600px]">
              <TableHeader columns={['Medication', 'Dosage', 'Frequency', 'Prescribing Vet', 'Start Date']} />
              {[...Array(5)].map((_, i) => (
                <TableRow
                  key={i}
                  cells={[
                    medicationLog[i]?.medication || '',
                    medicationLog[i]?.dosage || '',
                    medicationLog[i]?.frequency || '',
                    medicationLog[i]?.prescribingVet || '',
                    medicationLog[i]?.startDate || '',
                  ]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Medical History Table */}
        <div className="mb-4 md:mb-6 print-section border border-gray-300">
          <SectionHeader title="📋 Medical History" index={7} />
          <div className="border border-gray-900 overflow-x-auto">
            <div className="min-w-[600px]">
              <TableHeader columns={['Date', 'Condition / Procedure', 'Treating Vet', 'Notes']} />
              {[...Array(5)].map((_, i) => (
                <TableRow
                  key={i}
                  cells={[
                    medicalHistory[i]?.date || '',
                    medicalHistory[i]?.conditionOrProcedure || '',
                    medicalHistory[i]?.treatingVet || '',
                    medicalHistory[i]?.notes || '',
                  ]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Vet Comments */}
        <div className="mb-4 md:mb-6 print-section border border-gray-300">
          <SectionHeader title="🖊️ Vet's Comments" index={8} />
          <div className="border border-t-0 border-gray-900 min-h-[80px] p-2">
            <p className="text-xs text-gray-700 whitespace-pre-wrap">{vetComments || ''}</p>
          </div>
        </div>

        {/* Owner Comments */}
        <div className="mb-4 md:mb-6 print-section border border-gray-300">
          <SectionHeader title="📝 Owner's Comments" index={9} />
          <div className="border border-t-0 border-gray-900 min-h-[80px] p-2">
            <p className="text-xs text-gray-700 whitespace-pre-wrap">{ownerComments || ''}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-xs text-gray-600 border-t border-gray-300 pt-4">
          <button className="no-print text-blue-600 hover:underline">Reset Form</button>
          <span className="text-center flex-1">Generated by JustPetem.com</span>
          <div className="w-24 text-right">Owner's Sign:</div>
        </div>
      </div>
    </>
  );
};

export default DogHealthRecord;
