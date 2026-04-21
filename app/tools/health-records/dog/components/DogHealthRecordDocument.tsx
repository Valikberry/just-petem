'use client';
import React, { useState } from "react";

interface DogHealthRecordDocumentProps {
  template?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  name?: string;
  breed?: string;
  dob?: string;
  sex?: string;
  fixed?: boolean;
  weight?: string;
  microchip?: string;
  colorMarkings?: string;
  rabiesTag?: string;
  photoUrl?: string;
  drugAllergies?: string;
  foodAllergies?: string;
  chronicConditions?: string;
  currentMedications?: string;
  meds?: string;
  owner?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  ownerAddress?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  vetClinic?: string;
  veterinarianName?: string;
  vetPhone?: string;
  vetAddress?: string;
  emergencyVetClinic?: string;
  emergencyVetPhone?: string;
  handlingStrangers?: string;
  handlingOtherAnimals?: string;
  knownFears?: string;
  specialInstructions?: string;
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ background: "#111", padding: "6px 10px" }}>
    <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
      {title}
    </span>
  </div>
);

const Row: React.FC<{ children: React.ReactNode; noBorder?: boolean }> = ({ children, noBorder }) => (
  <div style={{ display: "flex", alignItems: "stretch", borderBottom: noBorder ? "none" : "1px solid #ccc", minHeight: 29 }}>
    {children}
  </div>
);

const Cell: React.FC<{ label: string; value?: string; half?: boolean; tall?: boolean; borderRight?: boolean; alert?: boolean }> = ({ label, value, half, tall, borderRight, alert }) => (
  <div style={{ flex: half ? "0 0 50%" : 1, padding: tall ? "7px 8px 6px" : "5px 8px", borderRight: borderRight ? "1px solid #ccc" : undefined, display: "flex", flexDirection: "column", justifyContent: tall ? "flex-start" : "center", minHeight: tall ? 38 : undefined, background: alert ? "#fff5f7" : undefined }}>
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: alert ? "#b03060" : "#111", lineHeight: 1.2 }}>
      {label}
    </span>
    {value !== undefined && (
      <span style={{ fontSize: 11, color: "#333", marginTop: 2, minHeight: 14 }}>{value}</span>
    )}
  </div>
);

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
  <label onClick={onChange} style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer", userSelect: "none", fontSize: 10, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#111" }}>
    <span style={{ width: 12, height: 12, border: "1.5px solid #666", borderRadius: 2, background: checked ? "#111" : "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {checked && (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    {label}
  </label>
);

const VACCINES = ["Rabies", "DHPP", "Bordetella", "Leptospirosis", "Canine Influenza", "Lyme Disease", "Other"];

type VaccStatus = "current" | "dueSoon" | "overdue" | null;

const VaccineCard: React.FC<{ name: string; status: VaccStatus; onStatus: (s: VaccStatus) => void; borderRight?: boolean; noBorderBottom?: boolean }> = ({ name, status, onStatus, borderRight, noBorderBottom }) => {
  const toggle = (s: "current" | "dueSoon" | "overdue") => onStatus(status === s ? null : s);
  return (
    <div style={{ borderRight: borderRight ? "1px solid #ccc" : undefined, borderBottom: noBorderBottom ? "none" : "1px solid #ccc" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 8px", borderBottom: "1px solid #eee" }}>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "#111" }}>{name}</span>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888" }}>Status</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "5px 8px", borderBottom: "1px solid #eee" }}>
        <Checkbox label="Current" checked={status === "current"} onChange={() => toggle("current")} />
        <Checkbox label="Due Soon" checked={status === "dueSoon"} onChange={() => toggle("dueSoon")} />
        <Checkbox label="Overdue" checked={status === "overdue"} onChange={() => toggle("overdue")} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 8px", flexWrap: "wrap" }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#888" }}>Date Given</span>
        <span style={{ fontSize: 10, color: "#111" }}>MM / DD / YY</span>
        <span style={{ color: "#ccc", margin: "0 2px" }}>—</span>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#888" }}>Next Due</span>
        <span style={{ fontSize: 10, color: "#111" }}>MM / DD / YY</span>
      </div>
    </div>
  );
};

const LogTable: React.FC<{ columns: { label: string; width: string }[]; rows?: number }> = ({ columns, rows = 5 }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr style={{ background: "#f0f0f0" }}>
        {columns.map((col, i) => (
          <th key={i} style={{ width: col.width, padding: "5px 7px", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: "1px solid #ccc", borderRight: i < columns.length - 1 ? "1px solid #ccc" : undefined, textAlign: "left", color: "#111" }}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r}>
          {columns.map((_, c) => (
            <td key={c} style={{ height: 26, borderBottom: r < rows - 1 ? "1px solid #ccc" : undefined, borderRight: c < columns.length - 1 ? "1px solid #ccc" : undefined }} />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const DogHealthRecordDocument: React.FC<DogHealthRecordDocumentProps> = ({
  template = 'A',
  name = "", breed = "", dob = "", sex = "", fixed = false,
  weight = "", microchip = "", colorMarkings = "", rabiesTag = "", photoUrl,
  drugAllergies = "", foodAllergies = "", chronicConditions = "",
  currentMedications = "", meds = "",
  owner = "", ownerPhone = "", ownerEmail = "", ownerAddress = "",
  emergencyContactName = "", emergencyContactPhone = "",
  vetClinic = "", veterinarianName = "", vetPhone = "", vetAddress = "",
  emergencyVetClinic = "", emergencyVetPhone = "",
  handlingStrangers = "", handlingOtherAnimals = "", knownFears = "", specialInstructions = "",
}) => {
  const [spayed, setSpayed] = useState(fixed);
  const [neutered, setNeutered] = useState(false);
  const [vaccStatus, setVaccStatus] = useState<Record<string, VaccStatus>>({});

  const secBox: React.CSSProperties = { border: "1px solid #111", borderTop: "none", marginBottom: 14 };

  return (
    <div style={{ background: "#fff", width: "100%", maxWidth: 680, margin: "0 auto", fontFamily: "'Barlow', 'Helvetica Neue', Helvetica, Arial, sans-serif", color: "#111", padding: "0 0 8px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap');
        @media print {
          @page { size: A4; margin: 10mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .dhr-no-print { display: none !important; }
        }
      `}</style>

      <div style={{ textAlign: "center", padding: "24px 16px 18px" }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111", margin: 0, letterSpacing: "-0.01em" }}>Dog Health Record</h1>
      </div>

      <SectionHeader title="Dog Details" />
      <div style={{ ...secBox, display: "grid", gridTemplateColumns: "1fr 180px" }}>
        <div style={{ borderRight: "1px solid #111" }}>
          <Row><Cell label="Dog Name:" value={name} /></Row>
          <Row><Cell label="Breed:" value={breed} /></Row>
          <Row><Cell label="Date of Birth:" value={dob} /></Row>
          <Row><Cell label="Sex:" value={sex} /></Row>
          <Row>
            <Cell label="Weight:" value={weight} half borderRight />
            <Cell label="Microchip No:" value={microchip} half />
          </Row>
          <Row>
            <div style={{ flex: 1, padding: "6px 8px", display: "flex", alignItems: "center", gap: 16 }}>
              <Checkbox label="Spayed" checked={spayed} onChange={() => setSpayed(v => !v)} />
              <Checkbox label="Neutered" checked={neutered} onChange={() => setNeutered(v => !v)} />
            </div>
          </Row>
          <Row noBorder>
            <Cell label="Colour & Markings:" value={colorMarkings} half borderRight />
            <Cell label="Rabies Tag:" value={rabiesTag} half />
          </Row>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f0f0" }}>
          {photoUrl ? (
            <img src={photoUrl} alt={name ? `${name} photo` : "Dog photo"} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <span style={{ fontSize: 9, color: "#aaa", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Photo</span>
          )}
        </div>
      </div>

      <SectionHeader title="Critical Alerts" />
      <div style={secBox}>
        <Row><Cell label="Drug Allergies:" value={drugAllergies} tall alert /></Row>
        <Row><Cell label="Food Allergies:" value={foodAllergies} tall alert /></Row>
        <Row><Cell label="Chronic Conditions:" value={chronicConditions} tall alert /></Row>
        <Row noBorder><Cell label="Current Medications:" value={currentMedications || meds} tall alert /></Row>
      </div>

      <SectionHeader title="Owner Information" />
      <div style={secBox}>
        <Row><Cell label="Owner Name:" value={owner} /></Row>
        <Row>
          <Cell label="Phone:" value={ownerPhone} half borderRight />
          <Cell label="Email:" value={ownerEmail} half />
        </Row>
        <Row><Cell label="Address:" value={ownerAddress} /></Row>
        <Row><Cell label="Emergency Contact Name:" value={emergencyContactName} /></Row>
        <Row noBorder><Cell label="Emergency Contact Phone:" value={emergencyContactPhone} /></Row>
      </div>

      <SectionHeader title="Veterinary Information" />
      <div style={secBox}>
        <Row><Cell label="Primary Vet Clinic:" value={vetClinic} /></Row>
        <Row><Cell label="Veterinarian Name:" value={veterinarianName} /></Row>
        <Row><Cell label="Clinic Phone:" value={vetPhone} /></Row>
        <Row><Cell label="Clinic Address:" value={vetAddress} /></Row>
        <Row><Cell label="Emergency Vet Clinic:" value={emergencyVetClinic} /></Row>
        <Row noBorder><Cell label="Emergency Vet Phone:" value={emergencyVetPhone} /></Row>
      </div>

      <SectionHeader title="Handling Notes" />
      <div style={secBox}>
        <Row><Cell label="Behaviour Around Strangers:" value={handlingStrangers} tall /></Row>
        <Row><Cell label="Behaviour Around Other Animals:" value={handlingOtherAnimals} tall /></Row>
        <Row><Cell label="Known Fears:" value={knownFears} tall /></Row>
        <Row noBorder><Cell label="Special Instructions:" value={specialInstructions} tall /></Row>
      </div>

      <SectionHeader title="Vaccination History" />
      <div style={{ ...secBox, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {VACCINES.map((vax, i) => {
          const total = VACCINES.length;
          const isLast = i === total - 1;
          const isOdd = total % 2 === 1;
          const lastPairStart = isOdd ? total - 3 : total - 2;
          const noBot = i >= lastPairStart;
          const full = isLast && isOdd;
          return (
            <div key={vax} style={full ? { gridColumn: "1 / -1" } : undefined}>
              <VaccineCard
                name={vax}
                status={vaccStatus[vax] ?? null}
                onStatus={(s) => setVaccStatus(prev => ({ ...prev, [vax]: s }))}
                borderRight={!full && i % 2 === 0}
                noBorderBottom={noBot}
              />
            </div>
          );
        })}
      </div>

      <SectionHeader title="Medication Log" />
      <div style={{ ...secBox, overflowX: "auto" }}>
        <LogTable columns={[
          { label: "Medication", width: "22%" },
          { label: "Dosage", width: "14%" },
          { label: "Frequency", width: "16%" },
          { label: "Prescribing Vet", width: "24%" },
          { label: "Start Date", width: "14%" },
        ]} />
      </div>

      <SectionHeader title="Medical History" />
      <div style={{ ...secBox, overflowX: "auto" }}>
        <LogTable columns={[
          { label: "Date", width: "16%" },
          { label: "Condition / Procedure", width: "30%" },
          { label: "Treating Vet", width: "24%" },
          { label: "Notes", width: "30%" },
        ]} />
      </div>

      <SectionHeader title="Vet's Comments" />
      <div style={{ ...secBox, minHeight: 80 }} />

      <SectionHeader title="Owner's Comments" />
      <div style={{ ...secBox, minHeight: 80 }} />

      <div className="dhr-no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 2px 4px", borderTop: "1px solid #ddd", marginTop: 4 }}>
        <button onClick={() => window.print()} style={{ fontSize: 11, fontWeight: 700, color: "#111", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em" }}>
          Print / Save as PDF
        </button>
        <span style={{ fontSize: 9, color: "#999", textAlign: "right", lineHeight: 1.5 }}>
          Generated by JustPetem.com<br />Free pet document generators
        </span>
      </div>
    </div>
  );
};

export default DogHealthRecordDocument;
