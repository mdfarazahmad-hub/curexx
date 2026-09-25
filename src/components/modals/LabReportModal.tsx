import React from 'react';
import { HealthRecord } from '../../types';

interface LabReportModalProps {
  isOpen: boolean;
  record: HealthRecord | null;
  onClose: () => void;
  onDownload: () => void;
}

export const LabReportModal: React.FC<LabReportModalProps> = ({
  isOpen,
  record,
  onClose,
  onDownload,
}) => {
  if (!isOpen || !record) return null;

  const testRows = [
    { test: 'Hemoglobin (Hb)', result: '14.2', unit: 'g/dL', range: '13.5 - 17.5', status: 'Normal' },
    { test: 'WBC (Total Leucocyte Count)', result: '6,800', unit: '/uL', range: '4,000 - 11,000', status: 'Normal' },
    { test: 'Platelet Count', result: '250', unit: 'K/uL', range: '150 - 450', status: 'Normal' },
    { test: 'RBC (Red Blood Cells)', result: '4.92', unit: 'M/uL', range: '4.5 - 5.9', status: 'Normal' },
    { test: 'Hematocrit (PCV)', result: '42.6', unit: '%', range: '38.8 - 50.0', status: 'Normal' },
    { test: 'MCV', result: '86.5', unit: 'fL', range: '80.0 - 96.0', status: 'Normal' },
    { test: 'Neutrophils', result: '62', unit: '%', range: '40 - 75', status: 'Normal' },
    { test: 'Lymphocytes', result: '28', unit: '%', range: '20 - 45', status: 'Normal' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-[#edeeef]">
        {/* Modal Top Bar */}
        <div className="p-4 bg-[#f8f9fa] border-b border-[#edeeef] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004c46] text-[22px]">
              lab_profile
            </span>
            <span className="text-[14px] font-bold text-[#191c1d]">
              Diagnostic Lab Report
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              className="p-1.5 rounded-xl bg-white border border-[#edeeef] text-[#004c46] hover:bg-[#a2f1e6]/40 flex items-center gap-1 text-[12px] font-semibold px-2.5"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#edeeef] text-[#3e4947]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Report Document Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Clinic Header */}
          <div className="border-b border-[#edeeef] pb-4 flex justify-between items-start">
            <div>
              <h2 className="text-[18px] font-bold text-[#004c46] leading-tight">
                ABC Central Diagnostic Laboratory
              </h2>
              <p className="text-[11px] text-[#6f7977] mt-0.5">
                NABL Accredited • ISO 15189 Certified
              </p>
              <p className="text-[11px] text-[#6f7977]">
                Ref Lab ID: #LAB-2023-88219 • Specimen: EDTA Whole Blood
              </p>
            </div>
            <div className="bg-[#a2f1e6]/40 text-[#00201d] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Verified
            </div>
          </div>

          {/* Patient Details strip */}
          <div className="bg-[#f3f4f5] p-3 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-2 text-[12px]">
            <div>
              <span className="text-[#6f7977] block text-[10px]">Patient Name</span>
              <span className="font-bold text-[#191c1d]">Rahul Sharma</span>
            </div>
            <div>
              <span className="text-[#6f7977] block text-[10px]">Age / Gender</span>
              <span className="font-bold text-[#191c1d]">39 Y / Male</span>
            </div>
            <div>
              <span className="text-[#6f7977] block text-[10px]">Referred By</span>
              <span className="font-bold text-[#191c1d]">Dr. Ananya Sharma</span>
            </div>
            <div>
              <span className="text-[#6f7977] block text-[10px]">Collected</span>
              <span className="font-bold text-[#191c1d]">Oct 23, 08:30 AM</span>
            </div>
          </div>

          {/* Test Title */}
          <div>
            <h3 className="text-[16px] font-bold text-[#191c1d]">
              {record.title}
            </h3>
            <p className="text-[12px] text-[#3e4947]">
              Complete automated hemogram analysis by 5-part differential analyzer
            </p>
          </div>

          {/* Results Table */}
          <div className="border border-[#edeeef] rounded-2xl overflow-hidden text-[12px]">
            <table className="w-full text-left">
              <thead className="bg-[#f8f9fa] border-b border-[#edeeef] text-[#6f7977] font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Investigation</th>
                  <th className="py-2.5 px-2">Observed</th>
                  <th className="py-2.5 px-2">Ref Range</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edeeef]">
                {testRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#f8f9fa]">
                    <td className="py-2.5 px-3 font-medium text-[#191c1d]">
                      {row.test}
                    </td>
                    <td className="py-2.5 px-2 font-bold text-[#004c46]">
                      {row.result} <span className="text-[10px] font-normal text-[#6f7977]">{row.unit}</span>
                    </td>
                    <td className="py-2.5 px-2 text-[#6f7977] font-mono text-[11px]">
                      {row.range}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Impression / Notes */}
          <div className="bg-[#a2f1e6]/25 p-3 rounded-2xl border border-[#86d5ca]/40">
            <h4 className="text-[12px] font-bold text-[#004c46] mb-1">
              Pathologist Clinical Interpretation:
            </h4>
            <p className="text-[12px] text-[#191c1d] leading-relaxed">
              Normocytic normochromic red cell morphology. White blood cell counts and differentials within standard reference limits. Platelets adequate on smear. No immature cells or toxic granules observed.
            </p>
          </div>

          {/* Signoff */}
          <div className="pt-2 flex justify-between items-center text-[11px] text-[#6f7977]">
            <div>
              <p className="font-semibold text-[#191c1d]">Dr. P. Mukherjee, MD (Path)</p>
              <p>Senior Consultant Pathologist</p>
            </div>
            <div className="text-right">
              <p className="text-emerald-700 font-semibold flex items-center gap-1 justify-end">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Digitally Signed &amp; Timestamped
              </p>
              <p>Report SHA-256 Verified</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#f8f9fa] border-t border-[#edeeef] flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-white border border-[#bec9c6]/40 text-[#191c1d] font-semibold text-[13px] hover:bg-[#edeeef]"
          >
            Close
          </button>
          <button
            onClick={onDownload}
            className="flex-1 py-2.5 rounded-xl bg-[#004c46] text-white font-semibold text-[13px] hover:bg-[#00665e] flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};
