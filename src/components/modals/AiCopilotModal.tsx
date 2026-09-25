import React, { useState } from 'react';
import { INITIAL_PATIENT_QUEUE } from '../../data/healthcareData';

interface AiCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertNote: (patientId: string, noteText: string) => void;
}

export const AiCopilotModal: React.FC<AiCopilotModalProps> = ({
  isOpen,
  onClose,
  onInsertNote,
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState(INITIAL_PATIENT_QUEUE[0].id);
  const [copilotTask, setCopilotTask] = useState<'soap' | 'differential' | 'interactions'>('soap');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string>(
`SUBJECTIVE:
54-year-old female presenting with 3-week history of dry, non-productive cough and mild afternoon fatigue. Denies fever, chills, hemoptysis, or nocturnal orthopnea. Long-standing hypertension on Lisinopril 20mg daily.

OBJECTIVE:
Vitals: BP 134/86 mmHg, HR 76 bpm regular, Temp 98.4°F, SpO2 98% on room air.
Chest auscultation: Vesicular breath sounds bilaterally, no wheezes or rales.
Cardiovascular: S1/S2 present, regular rate and rhythm, no murmurs.

ASSESSMENT:
1. ACE Inhibitor-induced dry cough (suspected secondary to Lisinopril accumulation of bradykinin).
2. Essential hypertension, well-controlled.

PLAN:
1. Discontinue Lisinopril 20mg daily.
2. Transition to ARB (Losartan 50mg orally once daily) to avoid dry cough pathway.
3. Follow-up blood pressure check and renal function panel in 4 weeks.`
  );

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const selected = INITIAL_PATIENT_QUEUE.find((p) => p.id === selectedPatientId) || INITIAL_PATIENT_QUEUE[0];
      if (copilotTask === 'differential') {
        setGeneratedOutput(
`DIFFERENTIAL DIAGNOSIS FOR ${selected.name.toUpperCase()}:
Chief Complaint: ${selected.symptoms}

1. PRIMARY SUSPICION (High Probability - 70%):
   - ACE-inhibitor cough syndrome (given Lisinopril therapy and absence of bronchospasm or infectious signs).

2. SECONDARY DIFFERENTIALS:
   - Upper Airway Cough Syndrome (UACS / Post-nasal drip)
   - Gastroesophageal Reflux Disease (GERD with silent micro-aspiration)
   - Cough-variant Asthma (spirometry recommended if cough persists after drug switch)

RECOMMENDED WORKUP:
- Trial substitution with ARB class.
- Chest radiograph already reviewed: clear lung fields, no infiltrates.`
        );
      } else if (copilotTask === 'interactions') {
        setGeneratedOutput(
`MEDICATION INTERACTION AUDIT FOR ${selected.name.toUpperCase()}:
Active Regimen: Lisinopril 20mg daily + OTC Multivitamin.

1. Potassium Sparing Risk:
   - Potassium levels stable (4.4 mmol/L). Monitor when switching to Losartan.
2. Renal Clearance:
   - eGFR > 60 mL/min/1.73m² (Normal). Safe for standard ARB titration.
3. No critical QT prolongation or drug-food interactions detected.`
        );
      } else {
        setGeneratedOutput(
`CLINICAL SESSION SUMMARY & SOAP NOTE:
Patient: ${selected.name} (${selected.gender}/${selected.age})
Chief Complaint: ${selected.symptoms}

[S] Patient reports symptoms have persisted despite hydration. No acute distress.
[O] Vitals: BP ${selected.vitals?.bp || '120/80'}, HR ${selected.vitals?.hr || '72 bpm'}, SpO2 ${selected.vitals?.spO2 || '99%'}.
[A] Clinical stability confirmed. Symptomatic management indicated.
[P] Counseling provided on lifestyle modifications and medication adherence.`
        );
      }
      setIsGenerating(false);
    }, 1000);
  };

  const handleApply = () => {
    onInsertNote(selectedPatientId, generatedOutput);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto border border-[#a2f1e6]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-2xl bg-[#a2f1e6] text-[#00201d] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
            </span>
            <div>
              <h3 className="text-[17px] font-bold text-[#191c1d]">
                CureX AI Clinical Copilot
              </h3>
              <p className="text-[12px] text-[#3e4947]">
                Clinical Synthesis &amp; Documentation Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#edeeef] flex items-center justify-center text-[#3e4947]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Patient Selection & Task Selection */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
              Select Patient
            </label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full bg-[#f3f4f5] border border-[#bec9c6]/40 rounded-xl p-2.5 text-[12px] font-medium text-[#191c1d] focus:outline-[#004c46]"
            >
              {INITIAL_PATIENT_QUEUE.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.gender}/{p.age})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
              AI Task Mode
            </label>
            <select
              value={copilotTask}
              onChange={(e) => setCopilotTask(e.target.value as any)}
              className="w-full bg-[#f3f4f5] border border-[#bec9c6]/40 rounded-xl p-2.5 text-[12px] font-medium text-[#191c1d] focus:outline-[#004c46]"
            >
              <option value="soap">Draft SOAP Consultation Note</option>
              <option value="differential">Differential Diagnosis</option>
              <option value="interactions">Medication Safety Audit</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-2.5 rounded-xl bg-[#004c46] hover:bg-[#00665e] text-white font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95"
        >
          <span className={`material-symbols-outlined text-[18px] ${isGenerating ? 'animate-spin' : ''}`}>
            {isGenerating ? 'refresh' : 'bolt'}
          </span>
          <span>{isGenerating ? 'Synthesizing chart & lab markers...' : 'Regenerate Draft'}</span>
        </button>

        {/* Generated Content Box */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-[#004c46] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Generated Draft (Editable)
            </span>
            <span className="text-[11px] text-[#6f7977]">Clinical confidence: 98%</span>
          </div>
          <textarea
            value={generatedOutput}
            onChange={(e) => setGeneratedOutput(e.target.value)}
            rows={10}
            className="w-full bg-[#f8f9fa] border border-[#bec9c6]/60 rounded-xl p-3 text-[12px] font-mono text-[#191c1d] focus:outline-[#004c46] leading-relaxed resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-[#edeeef] text-[#191c1d] font-semibold text-[13px] hover:bg-[#e1e3e4]"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2.5 rounded-xl bg-[#004c46] text-white font-semibold text-[13px] hover:bg-[#00665e] shadow-xs active:scale-95 flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            <span>Insert to Patient Chart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
