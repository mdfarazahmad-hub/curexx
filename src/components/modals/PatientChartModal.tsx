import React from 'react';
import { PatientQueueItem } from '../../types';

interface PatientChartModalProps {
  isOpen: boolean;
  patient: PatientQueueItem | null;
  onClose: () => void;
  onOpenPrescribe: (patient: PatientQueueItem) => void;
}

export const PatientChartModal: React.FC<PatientChartModalProps> = ({
  isOpen,
  patient,
  onClose,
  onOpenPrescribe,
}) => {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto border border-[#edeeef]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004c46] text-[22px]">
              folder_shared
            </span>
            <div>
              <h3 className="text-[17px] font-bold text-[#191c1d]">
                Patient Medical Record &amp; Chart
              </h3>
              <p className="text-[11px] text-[#6f7977]">
                ABC Multispeciality Electronic Health Record (EHR)
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

        {/* Profile Card */}
        <div className="p-4 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] flex items-center gap-4">
          <img
            src={patient.avatar}
            alt={patient.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-[#004c46]/30 shadow-xs shrink-0"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-[16px] font-bold text-[#191c1d]">
                {patient.name}
              </h4>
              <span className="text-[11px] font-semibold bg-[#a2f1e6]/60 text-[#004c46] px-2 py-0.5 rounded-full">
                {patient.gender} • {patient.age} Y
              </span>
            </div>
            <p className="text-[12px] text-[#3e4947] mt-0.5">
              MRN: #EHR-{patient.id.toUpperCase()}-904 • Scheduled: {patient.timeSlot}
            </p>
          </div>
        </div>

        {/* Current Vitals */}
        <div>
          <h5 className="text-[12px] font-bold text-[#3e4947] uppercase tracking-wider mb-2">
            Triage Vital Signs
          </h5>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-[#f3f4f5] p-2.5 rounded-xl border border-[#edeeef]">
              <span className="text-[10px] text-[#6f7977] block">Blood Pressure</span>
              <span className="text-[13px] font-bold text-[#004c46]">
                {patient.vitals?.bp || '120/80'}
              </span>
            </div>
            <div className="bg-[#f3f4f5] p-2.5 rounded-xl border border-[#edeeef]">
              <span className="text-[10px] text-[#6f7977] block">Heart Rate</span>
              <span className="text-[13px] font-bold text-[#0059bb]">
                {patient.vitals?.hr || '72 bpm'}
              </span>
            </div>
            <div className="bg-[#f3f4f5] p-2.5 rounded-xl border border-[#edeeef]">
              <span className="text-[10px] text-[#6f7977] block">Temperature</span>
              <span className="text-[13px] font-bold text-[#3e4947]">
                {patient.vitals?.temp || '98.6 F'}
              </span>
            </div>
            <div className="bg-[#f3f4f5] p-2.5 rounded-xl border border-[#edeeef]">
              <span className="text-[10px] text-[#6f7977] block">SpO2 Oxygen</span>
              <span className="text-[13px] font-bold text-[#004c46]">
                {patient.vitals?.spO2 || '99%'}
              </span>
            </div>
          </div>
        </div>

        {/* Symptoms & Clinical History */}
        <div className="space-y-2 text-[12px]">
          <div className="p-3 bg-white rounded-xl border border-[#edeeef]">
            <span className="font-bold text-[#191c1d] block">Presenting Symptoms:</span>
            <p className="text-[#3e4947] mt-0.5">{patient.symptoms}</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#edeeef]">
            <span className="font-bold text-[#191c1d] block">Past Medical History:</span>
            <p className="text-[#3e4947] mt-0.5">
              {patient.historySummary || 'No known drug allergies. Non-smoker. Routine health maintenance up to date.'}
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 bg-[#edeeef] text-[#191c1d] py-3 rounded-xl font-semibold text-[13px] hover:bg-[#e1e3e4]"
          >
            Close Chart
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenPrescribe(patient);
            }}
            className="flex-1 bg-[#004c46] text-white py-3 rounded-xl font-bold text-[13px] hover:bg-[#00665e] shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">pill</span>
            <span>Write Prescription</span>
          </button>
        </div>
      </div>
    </div>
  );
};
