import React, { useState } from 'react';

interface ShareIdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareIdModal: React.FC<ShareIdModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.('https://curex.health/id/CX-99201-RS');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center space-y-4 border border-[#edeeef]">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-[#004c46] font-bold text-[14px]">
            <span className="material-symbols-outlined text-[20px]">badge</span>
            <span>CureX Health ID</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#edeeef] text-[#3e4947]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Digital ID Card Mock */}
        <div className="w-full bg-gradient-to-br from-[#004c46] via-[#00665e] to-[#003833] text-white p-5 rounded-2xl shadow-lg relative overflow-hidden text-left">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[10px] text-[#a2f1e6] uppercase tracking-wider block font-bold">
                National Health Passport
              </span>
              <h3 className="text-[18px] font-bold text-white">Rahul Sharma</h3>
              <p className="text-[11px] text-white/80 font-mono">ID: CX-99201-RS</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
              Active Verified
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/20 text-[11px]">
            <div>
              <span className="text-white/60 block text-[9px]">Blood</span>
              <span className="font-bold text-[#a2f1e6] text-[13px]">A+ Pos</span>
            </div>
            <div>
              <span className="text-white/60 block text-[9px]">Allergies</span>
              <span className="font-bold text-red-300 text-[11px]">Penicillin</span>
            </div>
            <div>
              <span className="text-white/60 block text-[9px]">Emergency</span>
              <span className="font-bold text-white text-[11px]">Priya (Wife)</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="text-[10px] text-white/70">
              Valid: 2026-2028 • Hospital Sync
            </span>
            <span className="material-symbols-outlined text-[#a2f1e6] text-[20px]">
              contactless
            </span>
          </div>
        </div>

        {/* High resolution QR code representation */}
        <div className="p-3 bg-white border-2 border-dashed border-[#bec9c6] rounded-2xl flex flex-col items-center shadow-xs">
          {/* Simulated QR Code SVG */}
          <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none">
            <rect width="100" height="100" fill="white" />
            {/* Top-left corner */}
            <rect x="5" y="5" width="26" height="26" rx="4" fill="#004c46" />
            <rect x="9" y="9" width="18" height="18" fill="white" />
            <rect x="13" y="13" width="10" height="10" fill="#004c46" />
            {/* Top-right corner */}
            <rect x="69" y="5" width="26" height="26" rx="4" fill="#004c46" />
            <rect x="73" y="9" width="18" height="18" fill="white" />
            <rect x="77" y="13" width="10" height="10" fill="#004c46" />
            {/* Bottom-left corner */}
            <rect x="5" y="69" width="26" height="26" rx="4" fill="#004c46" />
            <rect x="9" y="73" width="18" height="18" fill="white" />
            <rect x="13" y="77" width="10" height="10" fill="#004c46" />
            {/* Center dots simulation */}
            <rect x="36" y="12" width="6" height="6" fill="#004c46" />
            <rect x="46" y="8" width="6" height="6" fill="#004c46" />
            <rect x="56" y="14" width="6" height="6" fill="#004c46" />
            <rect x="12" y="38" width="6" height="6" fill="#004c46" />
            <rect x="22" y="46" width="6" height="6" fill="#004c46" />
            <rect x="36" y="36" width="12" height="12" rx="2" fill="#004c46" />
            <rect x="52" y="36" width="6" height="6" fill="#004c46" />
            <rect x="62" y="42" width="8" height="8" fill="#004c46" />
            <rect x="78" y="38" width="6" height="6" fill="#004c46" />
            <rect x="42" y="54" width="8" height="8" fill="#004c46" />
            <rect x="54" y="62" width="6" height="6" fill="#004c46" />
            <rect x="36" y="72" width="6" height="6" fill="#004c46" />
            <rect x="48" y="78" width="8" height="8" fill="#004c46" />
            <rect x="64" y="72" width="8" height="8" fill="#004c46" />
            <rect x="76" y="82" width="6" height="6" fill="#004c46" />
          </svg>
          <span className="text-[11px] text-[#6f7977] mt-1 font-mono">
            Scan to instantly access clinical history
          </span>
        </div>

        {/* Buttons */}
        <div className="w-full flex gap-2 pt-1">
          <button
            onClick={handleCopyLink}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#edeeef] hover:bg-[#e1e3e4] text-[#191c1d] text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'check' : 'link'}
            </span>
            <span>{copied ? 'Copied Link' : 'Copy Link'}</span>
          </button>
          <button
            onClick={() => {
              alert('Downloading official CureX Health Passport Card PDF...');
              onClose();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#004c46] hover:bg-[#00665e] text-white text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">save_alt</span>
            <span>Save Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
