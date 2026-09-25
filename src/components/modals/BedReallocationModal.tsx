import React, { useState } from 'react';

interface BedReallocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const BedReallocationModal: React.FC<BedReallocationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [icuBeds, setIcuBeds] = useState(18);
  const [ccuBeds, setCcuBeds] = useState(12);
  const [generalBeds, setGeneralBeds] = useState(140);
  const [stepWard, setStepWard] = useState(25);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-[#edeeef]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-[#d8e2ff] text-[#0059bb] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">hotel</span>
            </span>
            <div>
              <h3 className="text-[17px] font-bold text-[#191c1d]">
                Ward Bed Reallocation
              </h3>
              <p className="text-[11px] text-[#6f7977]">
                Live Dynamic Hospital Floor Capacity
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

        <div className="space-y-3">
          <div className="p-3 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] flex items-center justify-between">
            <div>
              <h4 className="text-[13px] font-bold text-[#191c1d]">ICU Level 3 Beds</h4>
              <p className="text-[11px] text-[#ba1a1a]">Occupancy 94% (Near Cap)</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIcuBeds((b) => Math.max(10, b - 1))}
                className="w-8 h-8 rounded-lg bg-white border border-[#bec9c6]/60 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="text-[15px] font-bold w-6 text-center">{icuBeds}</span>
              <button
                onClick={() => setIcuBeds((b) => b + 1)}
                className="w-8 h-8 rounded-lg bg-[#004c46] text-white flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] flex items-center justify-between">
            <div>
              <h4 className="text-[13px] font-bold text-[#191c1d]">Cardiac Care Unit (CCU)</h4>
              <p className="text-[11px] text-[#0059bb]">Occupancy 78% (Stable)</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCcuBeds((b) => Math.max(8, b - 1))}
                className="w-8 h-8 rounded-lg bg-white border border-[#bec9c6]/60 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="text-[15px] font-bold w-6 text-center">{ccuBeds}</span>
              <button
                onClick={() => setCcuBeds((b) => b + 1)}
                className="w-8 h-8 rounded-lg bg-[#004c46] text-white flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#f8f9fa] rounded-2xl border border-[#edeeef] flex items-center justify-between">
            <div>
              <h4 className="text-[13px] font-bold text-[#191c1d]">General Medical Ward</h4>
              <p className="text-[11px] text-[#3e4947]">Occupancy 82%</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGeneralBeds((b) => Math.max(100, b - 2))}
                className="w-8 h-8 rounded-lg bg-white border border-[#bec9c6]/60 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="text-[15px] font-bold w-8 text-center">{generalBeds}</span>
              <button
                onClick={() => setGeneralBeds((b) => b + 2)}
                className="w-8 h-8 rounded-lg bg-[#004c46] text-white flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#a2f1e6]/30 rounded-2xl border border-[#86d5ca]/40 text-[12px] text-[#004c46]">
          Reallocating 2 surge recovery beds to ICU expands critical care headroom by +11%.
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 bg-[#edeeef] text-[#191c1d] py-3 rounded-xl font-semibold text-[13px] hover:bg-[#e1e3e4]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 bg-[#004c46] text-white py-3 rounded-xl font-bold text-[13px] hover:bg-[#00665e] shadow-xs active:scale-95 transition-all"
          >
            Update Allocation
          </button>
        </div>
      </div>
    </div>
  );
};
