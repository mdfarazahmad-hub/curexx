import React, { useState } from 'react';
import { PatientQueueItem } from '../../types';

interface PrescriptionModalProps {
  isOpen: boolean;
  patient: PatientQueueItem | null;
  onClose: () => void;
  onSave: (prescriptionText: string) => void;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  isOpen,
  patient,
  onClose,
  onSave,
}) => {
  const [medName, setMedName] = useState('Losartan Potassium');
  const [dosage, setDosage] = useState('50mg');
  const [frequency, setFrequency] = useState('Once daily with water in morning');
  const [duration, setDuration] = useState('30 days');
  const [instructions, setInstructions] = useState('Monitor morning blood pressure. Refill allowed x2.');

  if (!isOpen || !patient) return null;

  const handlePrescribe = () => {
    const rxSummary = `${medName} ${dosage} - ${frequency} (${duration}). ${instructions}`;
    onSave(rxSummary);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-[#edeeef]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-[#a2f1e6] text-[#00201d] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">pill</span>
            </span>
            <div>
              <h3 className="text-[17px] font-bold text-[#191c1d]">
                E-Prescription Order
              </h3>
              <p className="text-[11px] text-[#6f7977]">
                Dr. Ananya Sharma • Medical Council Lic #88192
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

        {/* Patient pill */}
        <div className="bg-[#f3f4f5] p-3 rounded-2xl flex items-center gap-3">
          <img
            src={patient.avatar}
            alt={patient.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="text-[14px] font-bold text-[#191c1d]">{patient.name}</h4>
            <p className="text-[11px] text-[#6f7977]">
              {patient.gender} / {patient.age} Y • Complaints: {patient.symptoms}
            </p>
          </div>
        </div>

        {/* Form fields */}
        <div className="space-y-2.5 text-[12px]">
          <div>
            <label className="font-bold text-[#191c1d] block mb-1">Medication Name</label>
            <input
              type="text"
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
              className="w-full bg-[#f8f9fa] border border-[#bec9c6]/50 rounded-xl p-2.5 text-[13px] text-[#191c1d] focus:outline-[#004c46]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-[#191c1d] block mb-1">Dosage</label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full bg-[#f8f9fa] border border-[#bec9c6]/50 rounded-xl p-2.5 text-[13px] text-[#191c1d] focus:outline-[#004c46]"
              />
            </div>
            <div>
              <label className="font-bold text-[#191c1d] block mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#f8f9fa] border border-[#bec9c6]/50 rounded-xl p-2.5 text-[13px] text-[#191c1d] focus:outline-[#004c46]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-[#191c1d] block mb-1">Frequency &amp; Timing</label>
            <input
              type="text"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full bg-[#f8f9fa] border border-[#bec9c6]/50 rounded-xl p-2.5 text-[13px] text-[#191c1d] focus:outline-[#004c46]"
            />
          </div>

          <div>
            <label className="font-bold text-[#191c1d] block mb-1">Special Clinical Advice</label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full bg-[#f8f9fa] border border-[#bec9c6]/50 rounded-xl p-2.5 text-[13px] text-[#191c1d] focus:outline-[#004c46]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 bg-[#edeeef] text-[#191c1d] py-3 rounded-xl font-semibold text-[13px] hover:bg-[#e1e3e4]"
          >
            Cancel
          </button>
          <button
            onClick={handlePrescribe}
            className="flex-1 bg-[#004c46] text-white py-3 rounded-xl font-bold text-[13px] hover:bg-[#00665e] shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Authorize &amp; Send Rx</span>
          </button>
        </div>
      </div>
    </div>
  );
};
