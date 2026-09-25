import React, { useState } from 'react';

interface CriticalAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CriticalAlertModal: React.FC<CriticalAlertModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [acknowledged, setAcknowledged] = useState(false);
  const [ordered, setOrdered] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-[#ffdad6]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </span>
            <div>
              <h3 className="text-[17px] font-bold text-[#ba1a1a]">
                Critical Laboratory Alert
              </h3>
              <p className="text-[11px] text-[#6f7977]">
                Stat Priority • Alert ID: #CRIT-9941
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

        {/* Patient Details */}
        <div className="bg-[#ffdad6]/30 p-4 rounded-2xl border border-[#ffdad6]">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-[15px] font-bold text-[#191c1d]">Robert Fox</h4>
              <p className="text-[12px] text-[#3e4947]">
                Male, 62 Y • Bed 4 (Coronary Care Unit)
              </p>
            </div>
            <span className="bg-[#ba1a1a] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              Hyperkalemia
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
            <div className="bg-white p-2.5 rounded-xl border border-[#ffdad6]/80">
              <span className="text-[#6f7977] text-[10px] block">Serum Potassium</span>
              <span className="text-[18px] font-bold text-[#ba1a1a]">6.2 mmol/L</span>
              <span className="text-[10px] text-[#ba1a1a] block font-medium">Ref: 3.5 - 5.0</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#ffdad6]/80">
              <span className="text-[#6f7977] text-[10px] block">ECG Monitor</span>
              <span className="text-[14px] font-bold text-[#ba1a1a]">Tall peaked T</span>
              <span className="text-[10px] text-[#6f7977] block">Sinus rhythm 68</span>
            </div>
          </div>
        </div>

        {/* Clinical Orders Protocol */}
        <div className="space-y-2">
          <h5 className="text-[12px] font-bold text-[#191c1d] uppercase tracking-wider">
            Immediate Recommended Orders:
          </h5>
          <div className="space-y-1.5 text-[12px]">
            <label className="flex items-center gap-2 p-2 bg-[#f8f9fa] rounded-xl border border-[#edeeef] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-[#004c46]" />
              <span className="text-[#191c1d] font-medium">
                10% Calcium Gluconate 10 mL IV over 3 mins (Cardioprotection)
              </span>
            </label>
            <label className="flex items-center gap-2 p-2 bg-[#f8f9fa] rounded-xl border border-[#edeeef] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-[#004c46]" />
              <span className="text-[#191c1d] font-medium">
                10 Units Regular Insulin in 50 mL 50% Dextrose IV
              </span>
            </label>
            <label className="flex items-center gap-2 p-2 bg-[#f8f9fa] rounded-xl border border-[#edeeef] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-[#004c46]" />
              <span className="text-[#191c1d] font-medium">
                Stat repeat basic metabolic panel in 2 hours
              </span>
            </label>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => {
              setAcknowledged(true);
              setOrdered(true);
              setTimeout(() => {
                onClose();
              }, 1200);
            }}
            className="w-full py-3 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>
              {ordered ? 'Orders Transmitted to CCU Nursing Station' : 'Authorize Emergency Orders Now'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
