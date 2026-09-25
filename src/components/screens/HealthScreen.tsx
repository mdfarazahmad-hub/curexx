import React, { useState } from 'react';
import { HealthRecord } from '../../types';
import { AuthUser } from './LoginAuthScreen';

interface HealthScreenProps {
  currentUser?: AuthUser | null;
  records: HealthRecord[];
  onOpenShareId: () => void;
  onOpenUploadModal: () => void;
  onViewReport: (record: HealthRecord) => void;
  onDownloadReport: (record: HealthRecord) => void;
  onViewScan: () => void;
  onViewRefills: () => void;
}

export const HealthScreen: React.FC<HealthScreenProps> = ({
  currentUser,
  records,
  onOpenShareId,
  onOpenUploadModal,
  onViewReport,
  onDownloadReport,
  onViewScan,
  onViewRefills,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Records');

  const categories = [
    'All Records',
    'Lab Reports',
    'Prescriptions',
    'Imaging',
    'Vaccinations',
    'Allergies',
    'Medications'
  ];

  const filteredRecords = selectedCategory === 'All Records'
    ? records
    : records.filter((r) => r.category === selectedCategory);

  const featuredCbc = records.find((r) => r.id === 'rec-cbc') || records[0];

  return (
    <div className="flex flex-col w-full pb-8 animate-in fade-in duration-300">
      {/* Top Greeting & Quick Stats Banner */}
      <div className="flex flex-col gap-2 mb-5 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[12px] text-[#3e4947] font-medium tracking-wide">
              Digital Health Wallet {currentUser ? `• ${currentUser.name}` : ''}
            </span>
            <h1 className="text-[24px] sm:text-[26px] text-[#004c46] font-bold tracking-tight">
              Medical Records
            </h1>
          </div>
          <button
            onClick={onOpenShareId}
            className="flex items-center gap-1.5 bg-[#a2f1e6]/45 text-[#00504a] px-3.5 py-2 rounded-xl text-[13px] font-semibold hover:bg-[#a2f1e6] transition-all shadow-xs active:scale-95 shrink-0"
          >
            <span
              className="material-symbols-outlined text-[19px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              qr_code_2
            </span>
            <span>Share ID</span>
          </button>
        </div>

        {/* Quick Metrics Row (Blood Group, Allergies, Records) */}
        <div className="grid grid-cols-3 gap-2.5 mt-1">
          <div className="bg-[#f3f4f5] p-3 rounded-2xl flex flex-col gap-0.5 shadow-xs border border-[#edeeef]">
            <span className="text-[11px] text-[#3e4947] font-medium">Blood Group</span>
            <span className="text-[19px] text-[#004c46] font-bold">{currentUser?.bloodGroup || 'O+'}</span>
          </div>
          <div className="bg-[#f3f4f5] p-3 rounded-2xl flex flex-col gap-0.5 shadow-xs border border-[#edeeef]">
            <span className="text-[11px] text-[#3e4947] font-medium">Allergies</span>
            <span className="text-[18px] text-[#ba1a1a] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">warning</span>
              2 Active
            </span>
          </div>
          <div className="bg-[#f3f4f5] p-3 rounded-2xl flex flex-col gap-0.5 shadow-xs border border-[#edeeef]">
            <span className="text-[11px] text-[#3e4947] font-medium">Records</span>
            <span className="text-[19px] text-[#0059bb] font-bold">24 Total</span>
          </div>
        </div>
      </div>

      {/* Categories Horizontal Filter Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none mb-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors shrink-0 ${
                isSelected
                  ? 'bg-[#004c46] text-white shadow-xs'
                  : 'bg-[#f3f4f5] text-[#191c1d] hover:bg-[#edeeef]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Featured Recent Lab Report Card (CBC) */}
      {featuredCbc && (
        <div className="bg-white p-4.5 rounded-2xl shadow-sm mb-6 relative overflow-hidden flex flex-col gap-3.5 border border-[#edeeef]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#a2f1e6]/25 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#a2f1e6]/60 flex items-center justify-center text-[#004c46] shrink-0">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  science
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#004c46]/10 text-[#004c46] px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[13px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                    Lab Verified
                  </span>
                  <span className="text-[12px] text-[#3e4947]">
                    {featuredCbc.date}
                  </span>
                </div>
                <h2 className="text-[17px] text-[#191c1d] font-bold mt-1 leading-tight">
                  {featuredCbc.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Lab Highlights Preview */}
          <div className="bg-[#f3f4f5] p-3 rounded-xl grid grid-cols-3 gap-2 relative z-10">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#3e4947]">Hemoglobin</span>
              <span className="text-[15px] font-bold text-[#004c46]">14.2 g/dL</span>
              <span className="text-[11px] text-[#0059bb] font-medium">Normal</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#3e4947]">WBC Count</span>
              <span className="text-[15px] font-bold text-[#004c46]">6.8 K/uL</span>
              <span className="text-[11px] text-[#0059bb] font-medium">Normal</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#3e4947]">Platelets</span>
              <span className="text-[15px] font-bold text-[#004c46]">250 K/uL</span>
              <span className="text-[11px] text-[#0059bb] font-medium">Normal</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1 relative z-10">
            <button
              onClick={() => onViewReport(featuredCbc)}
              className="flex-1 bg-[#004c46] text-white py-2.5 px-4 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-1.5 hover:bg-[#00665e] transition-colors shadow-xs active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>View Report</span>
            </button>
            <button
              onClick={() => onDownloadReport(featuredCbc)}
              className="bg-[#edeeef] text-[#191c1d] hover:bg-[#e1e3e4] py-2.5 px-4 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Download</span>
            </button>
            <button
              onClick={() => onOpenShareId()}
              className="w-10 h-10 bg-[#edeeef] rounded-xl flex items-center justify-center text-[#191c1d] hover:bg-[#e1e3e4] transition-colors active:scale-95 shrink-0"
              title="Share Report"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>
          </div>
        </div>
      )}

      {/* Timeline Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[17px] text-[#191c1d] font-bold tracking-tight">
          Timeline History
        </h3>
        <button
          onClick={() => setSelectedCategory('All Records')}
          className="text-[#0059bb] text-[13px] font-semibold hover:underline"
        >
          Filter &amp; Sort
        </button>
      </div>

      {/* Timeline List */}
      <div className="flex flex-col gap-4 relative before:absolute before:inset-y-2 before:left-4 before:w-0.5 before:bg-[#e1e3e4]">
        {/* Timeline Item 1: Prescription */}
        <div className="relative flex items-start gap-4 pl-9">
          <div className="absolute left-1.5 top-1.5 w-5 h-5 rounded-full bg-[#0070ea] text-white flex items-center justify-center ring-4 ring-[#f8f9fa] shadow-xs">
            <span
              className="material-symbols-outlined text-[12px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              prescriptions
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] w-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#3e4947] font-medium">
                Oct 14, 2023 • Dr. Sarah Jenkins
              </span>
              <span className="bg-[#d8e2ff]/60 text-[#001a41] px-2 py-0.5 rounded text-[11px] font-semibold">
                Prescription
              </span>
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-[#191c1d]">
                Cardiology Follow-up Meds
              </h4>
              <p className="text-[13px] text-[#3e4947] mt-0.5">
                Amoxicillin 500mg (1 capsule 3x daily), Lisinopril 10mg.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-[#f3f4f5]">
              <button
                onClick={onViewRefills}
                className="text-[#0059bb] text-[12px] font-semibold flex items-center gap-1 hover:underline active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">pill</span>
                View Refills (2 left)
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Item 2: Imaging */}
        <div className="relative flex items-start gap-4 pl-9">
          <div className="absolute left-1.5 top-1.5 w-5 h-5 rounded-full bg-[#505d5b] text-white flex items-center justify-center ring-4 ring-[#f8f9fa] shadow-xs">
            <span
              className="material-symbols-outlined text-[12px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              radiology
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] w-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#3e4947] font-medium">
                Sep 28, 2023 • City Diagnostics
              </span>
              <span className="bg-[#d7e5e2] text-[#3d4947] px-2 py-0.5 rounded text-[11px] font-semibold">
                Imaging
              </span>
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-[#191c1d]">
                Chest X-Ray (PA View)
              </h4>
              <p className="text-[13px] text-[#3e4947] mt-0.5 leading-relaxed">
                Clear lung fields. No acute cardiopulmonary abnormalities detected.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-[#f3f4f5]">
              <button
                onClick={onViewScan}
                className="text-[#0059bb] text-[12px] font-semibold flex items-center gap-1 hover:underline active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">image</span>
                View DICOM Scan (1 File)
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Item 3: Vaccination */}
        <div className="relative flex items-start gap-4 pl-9">
          <div className="absolute left-1.5 top-1.5 w-5 h-5 rounded-full bg-[#00665e] text-white flex items-center justify-center ring-4 ring-[#f8f9fa] shadow-xs">
            <span
              className="material-symbols-outlined text-[12px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              vaccines
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] w-full flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#3e4947] font-medium">
                Aug 12, 2023 • Metro Health Clinic
              </span>
              <span className="bg-[#a2f1e6]/60 text-[#00201d] px-2 py-0.5 rounded text-[11px] font-semibold">
                Vaccination
              </span>
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-[#191c1d]">
                Influenza Quadrivalent Vaccine
              </h4>
              <p className="text-[13px] text-[#3e4947] mt-0.5 leading-relaxed">
                Batch #FL-98234 administered successfully in left deltoid.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Health Document Banner */}
      <div className="mt-8 bg-gradient-to-r from-[#00665e] to-[#004c46] p-5 rounded-2xl text-white shadow-md flex items-center justify-between relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#a2f1e6]/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex flex-col gap-1 pr-4 z-10">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#86d5ca]">
              cloud_upload
            </span>
            <h4 className="text-[16px] font-bold text-white">
              Upload Health Record
            </h4>
          </div>
          <p className="text-[12px] text-white/85 leading-relaxed">
            Snap a photo of your prescription or upload PDF lab reports instantly.
          </p>
        </div>
        <button
          onClick={onOpenUploadModal}
          className="bg-white text-[#004c46] px-4 py-3 rounded-xl font-semibold text-[13px] whitespace-nowrap shadow-md hover:bg-[#f8f9fa] transition-all z-10 flex items-center gap-1.5 active:scale-95 shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">
            add_a_photo
          </span>
          <span>Upload Now</span>
        </button>
      </div>
    </div>
  );
};
