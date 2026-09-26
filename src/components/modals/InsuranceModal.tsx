import React, { useState } from 'react';
import { InsurancePolicy, InsuranceClaim } from '../../types';

interface InsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  policy: InsurancePolicy;
  onSubmitNewClaim: (claim: Omit<InsuranceClaim, 'id' | 'claimNumber' | 'status' | 'date'>) => void;
}

export const InsuranceModal: React.FC<InsuranceModalProps> = ({
  isOpen,
  onClose,
  policy,
  onSubmitNewClaim,
}) => {
  const [activeTab, setActiveTab] = useState<'policy' | 'claims' | 'new_claim'>('policy');
  const [selectedClaim, setSelectedClaim] = useState<InsuranceClaim | null>(null);

  // New claim form state
  const [hospital, setHospital] = useState('ABC Multispeciality Hospital');
  const [treatment, setTreatment] = useState('');
  const [amount, setAmount] = useState('');
  const [isCashless, setIsCashless] = useState(true);

  if (!isOpen) return null;

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!treatment || !amount) {
      alert('Please fill in treatment and claim amount');
      return;
    }
    onSubmitNewClaim({
      hospital,
      treatment,
      amount: parseFloat(amount),
      cashless: isCashless,
      notes: 'Initial claim request submitted via CureX Mobile Health Portal.',
    });
    setTreatment('');
    setAmount('');
    setActiveTab('claims');
  };

  const getStatusBadge = (status: InsuranceClaim['status']) => {
    switch (status) {
      case 'Settled':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Approved':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'In Review':
        return 'bg-amber-50 text-amber-800 border-amber-200 animate-pulse';
      case 'Rejected':
        return 'bg-red-50 text-red-800 border-red-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-[#e2e7e5]">
        {/* Top App Bar */}
        <div className="px-5 py-4 bg-[#004c46] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div>
              <h2 className="text-[18px] font-bold tracking-tight">Health Insurance</h2>
              <p className="text-[11px] text-[#a2f1e6] font-medium">{policy.planName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-[#00201d] uppercase tracking-wide">
              {policy.status}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#e2e7e5] bg-[#f8fafa] p-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('policy')}
            className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition-all ${
              activeTab === 'policy'
                ? 'bg-white text-[#004c46] shadow-xs'
                : 'text-[#627370] hover:text-[#191c1d]'
            }`}
          >
            Policy Card
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('claims')}
            className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition-all ${
              activeTab === 'claims'
                ? 'bg-white text-[#004c46] shadow-xs'
                : 'text-[#627370] hover:text-[#191c1d]'
            }`}
          >
            Claims ({policy.claims.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('new_claim')}
            className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition-all ${
              activeTab === 'new_claim'
                ? 'bg-white text-[#004c46] shadow-xs'
                : 'text-[#627370] hover:text-[#191c1d]'
            }`}
          >
            File Claim
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'policy' && (
            <div className="space-y-4">
              {/* Virtual Medical Insurance Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0c3833] via-[#004c46] to-[#002d29] text-white shadow-md relative overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[11px] font-extrabold tracking-widest text-[#a2f1e6] uppercase">
                      CureX Health Shield
                    </span>
                    <h3 className="text-[17px] font-bold mt-0.5">{policy.provider}</h3>
                    <p className="text-[12px] text-white/80 font-mono mt-0.5">{policy.policyNumber}</p>
                  </div>
                  <span className="material-symbols-outlined text-[32px] text-[#a2f1e6]">
                    health_and_safety
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-t border-white/15 my-2">
                  <div>
                    <span className="text-[10px] text-white/70 uppercase tracking-wider block">Sum Insured</span>
                    <span className="text-[18px] font-bold font-mono">₹{policy.sumInsured.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/70 uppercase tracking-wider block">Cashless Balance</span>
                    <span className="text-[18px] font-bold font-mono text-[#a2f1e6]">
                      ₹{policy.remainingCashless.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-white/80 pt-2 border-t border-white/15">
                  <span>Insured: <strong className="text-white">{policy.holderName}</strong></span>
                  <span>Valid: <strong className="text-white">{policy.validTill}</strong></span>
                </div>
              </div>

              {/* Network Hospitals */}
              <div className="p-4 rounded-2xl bg-[#f8fafa] border border-[#e2e7e5]">
                <h4 className="text-[13px] font-bold text-[#141d1c] mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-[#004c46]">local_hospital</span>
                  Cashless Network Hospital Near You
                </h4>
                <div className="p-3 bg-white rounded-xl border border-[#e4e8e7] flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-bold text-[#141d1c]">ABC Multispeciality Hospital</p>
                    <p className="text-[11px] text-[#627370]">1.4 km away • Priority Cashless Desk 24/7</p>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    Instant Pre-Auth
                  </span>
                </div>
              </div>

              {/* TPA Help */}
              <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-emerald-800">support_agent</span>
                  <span className="text-[12px] text-emerald-950 font-medium">TPA Cashless Support: <strong>{policy.tpaHelpline}</strong></span>
                </div>
                <a
                  href={`tel:${policy.tpaHelpline}`}
                  className="px-3 py-1 rounded-xl bg-emerald-800 text-white text-[11px] font-bold shadow-2xs"
                >
                  Call TPA
                </a>
              </div>
            </div>
          )}

          {activeTab === 'claims' && (
            <div className="space-y-3">
              {policy.claims.length === 0 ? (
                <div className="py-12 text-center text-[#6f7977]">
                  <p>No insurance claims recorded</p>
                </div>
              ) : (
                policy.claims.map((claim) => (
                  <div
                    key={claim.id}
                    onClick={() => setSelectedClaim(claim)}
                    className="p-4 rounded-2xl bg-white border border-[#e4e8e7] hover:border-[#004c46]/40 shadow-2xs cursor-pointer transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-[14px] font-bold text-[#141d1c]">{claim.treatment}</h4>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(claim.status)}`}>
                            {claim.status}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#556562] mt-0.5">{claim.hospital}</p>
                        <p className="text-[11px] text-[#788885] mt-1 font-mono">{claim.claimNumber} • {claim.date}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-[16px] font-black text-[#004c46] font-mono">
                          ₹{claim.amount.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-emerald-700 font-semibold">
                          {claim.cashless ? '100% Cashless' : 'Reimbursement'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'new_claim' && (
            <form onSubmit={handleSubmitClaim} className="space-y-3">
              <div className="p-3 bg-[#eef7f5] rounded-2xl border border-[#004c46]/20 text-[12px] text-[#003833]">
                Submit electronic pre-authorization or reimbursement claim directly to <strong>{policy.provider}</strong>.
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#4d5c59] uppercase tracking-wider block mb-1">
                  Hospital Name
                </label>
                <input
                  type="text"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#e2e7e5] bg-white text-[13px] text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#004c46]/20"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#4d5c59] uppercase tracking-wider block mb-1">
                  Treatment / Diagnosis
                </label>
                <input
                  type="text"
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  placeholder="e.g. Inpatient Cardiac Evaluation & ECG"
                  className="w-full p-3 rounded-xl border border-[#e2e7e5] bg-white text-[13px] text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#004c46]/20"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#4d5c59] uppercase tracking-wider block mb-1">
                  Claim Amount (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 15000"
                  className="w-full p-3 rounded-xl border border-[#e2e7e5] bg-white text-[13px] text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#004c46]/20"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="cashlessCheck"
                  checked={isCashless}
                  onChange={(e) => setIsCashless(e.target.checked)}
                  className="w-4 h-4 text-[#004c46] rounded focus:ring-[#004c46]"
                />
                <label htmlFor="cashlessCheck" className="text-[12px] text-[#344240] font-semibold cursor-pointer">
                  Request Instant Cashless Desk Approval
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-[#004c46] hover:bg-[#003833] text-white font-bold text-[13px] transition-all shadow-xs active:scale-95"
              >
                Submit Claim to TPA
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f8fafa] border-t border-[#e2e7e5] flex items-center justify-between">
          <span className="text-[11px] text-[#6f7977]">Authorized CureX Health TPA Desk</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#004c46] hover:bg-[#003833] text-white text-[13px] font-bold active:scale-95 transition-all shadow-xs"
          >
            Close
          </button>
        </div>
      </div>

      {/* Claim Detail Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-gray-200">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-[16px] font-bold text-[#141d1c]">Claim Details</h3>
                <p className="text-[11px] text-gray-500 font-mono">{selectedClaim.claimNumber}</p>
              </div>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(selectedClaim.status)}`}>
                {selectedClaim.status}
              </span>
            </div>

            <div className="py-4 space-y-2.5 text-[12px]">
              <div>
                <span className="text-gray-500 block">Hospital:</span>
                <span className="font-semibold text-gray-900">{selectedClaim.hospital}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Procedure / Treatment:</span>
                <span className="font-semibold text-gray-900">{selectedClaim.treatment}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Claim Amount:</span>
                <span className="font-black text-[#004c46] text-[15px] font-mono">₹{selectedClaim.amount.toLocaleString('en-IN')}</span>
              </div>
              {selectedClaim.notes && (
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-gray-500 text-[10px] uppercase tracking-wider block">Auditor Notes:</span>
                  <span className="text-gray-800 text-[11px] mt-0.5 block">{selectedClaim.notes}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSelectedClaim(null)}
              className="w-full py-2.5 rounded-xl bg-[#004c46] text-white font-bold text-[12px]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
