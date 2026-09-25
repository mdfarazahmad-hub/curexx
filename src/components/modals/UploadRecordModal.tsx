import React, { useState, useRef } from 'react';
import { HealthRecord } from '../../types';

interface UploadRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newRecord: HealthRecord) => void;
}

export const UploadRecordModal: React.FC<UploadRecordModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [docCategory, setDocCategory] = useState<HealthRecord['category']>('Lab Reports');
  const [docTitle, setDocTitle] = useState('');
  const [docProvider, setDocProvider] = useState('');
  const [docDate, setDocDate] = useState(new Date().toISOString().split('T')[0]);
  const [docNotes, setDocNotes] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [fileSizeBytes, setFileSizeBytes] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setFileSizeBytes(file.size);
      if (!docTitle) {
        // Auto suggest title based on file name without extension
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setDocTitle(cleanName);
      }
    }
  };

  const formatFileSize = (bytes: number | null): string => {
    if (!bytes) return '1.2 MB';
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedTitle = docTitle.trim();
    const trimmedProvider = docProvider.trim();

    if (!trimmedTitle) {
      setFormError('Please enter a document title.');
      return;
    }

    if (!selectedFileName) {
      setFormError('Please select or attach a document file.');
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      const record: HealthRecord = {
        id: `rec-${Date.now()}`,
        title: trimmedTitle,
        category: docCategory,
        provider: trimmedProvider || 'Self-Uploaded Document',
        date: docDate || 'Today',
        summary: docNotes.trim() || `User uploaded ${docCategory.toLowerCase()} record: ${selectedFileName}.`,
        verified: true,
        badge: docCategory === 'Lab Reports' ? 'Lab Verified' : docCategory,
        fileSize: formatFileSize(fileSizeBytes),
      };
      onUploadSuccess(record);
      setIsUploading(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2e3132]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-[#edeeef] max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004c46] text-[22px]">
              upload_file
            </span>
            <h3 className="text-[18px] font-bold text-[#191c1d]">
              Upload Health Document
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#edeeef] flex items-center justify-center text-[#3e4947] hover:bg-[#e1e3e4]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {formError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-[12px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-3.5">
          {/* File Picker Area */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg,.dcm"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-2 cursor-pointer transition-colors ${
              selectedFileName
                ? 'border-[#004c46] bg-[#004c46]/5'
                : 'border-[#bec9c6] hover:border-[#004c46] bg-[#f8f9fa]'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-[#a2f1e6]/40 text-[#004c46] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">
                {selectedFileName ? 'check_circle' : 'cloud_upload'}
              </span>
            </div>
            {selectedFileName ? (
              <div>
                <p className="text-[13px] font-bold text-[#004c46] truncate max-w-[280px]">
                  {selectedFileName}
                </p>
                <p className="text-[11px] text-[#6f7977] mt-0.5">
                  {formatFileSize(fileSizeBytes)} • Click to replace file
                </p>
              </div>
            ) : (
              <div>
                <p className="text-[13px] font-bold text-[#191c1d]">
                  Click to select file from device
                </p>
                <p className="text-[11px] text-[#6f7977] mt-0.5">
                  PDF, JPG, PNG or DICOM up to 25MB
                </p>
              </div>
            )}
          </div>

          {/* Document Title */}
          <div>
            <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
              Document Title *
            </label>
            <input
              type="text"
              required
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="e.g. Annual Blood Biochemistry"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] focus:ring-1 focus:ring-[#004c46] bg-[#f8f9fa]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
              Category
            </label>
            <select
              value={docCategory}
              onChange={(e) => setDocCategory(e.target.value as HealthRecord['category'])}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] focus:ring-1 focus:ring-[#004c46] bg-[#f8f9fa]"
            >
              <option value="Lab Reports">Lab Reports</option>
              <option value="Prescriptions">Prescriptions</option>
              <option value="Imaging">Imaging / Scans</option>
              <option value="Vaccinations">Vaccinations</option>
              <option value="Allergies">Allergies &amp; Immunology</option>
              <option value="Medications">Medications &amp; Refills</option>
            </select>
          </div>

          {/* Provider / Hospital */}
          <div>
            <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
              Healthcare Facility / Lab Name
            </label>
            <input
              type="text"
              value={docProvider}
              onChange={(e) => setDocProvider(e.target.value)}
              placeholder="e.g. City Diagnostic Laboratory"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] focus:ring-1 focus:ring-[#004c46] bg-[#f8f9fa]"
            />
          </div>

          {/* Date of Document */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                Record Date
              </label>
              <input
                type="date"
                value={docDate}
                onChange={(e) => setDocDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#bec9c6] text-[12px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
                Security
              </label>
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold h-[38px]">
                <span className="material-symbols-outlined text-[15px]">lock</span>
                <span>256-bit Encrypted</span>
              </div>
            </div>
          </div>

          {/* Clinical Notes */}
          <div>
            <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
              Notes or Symptoms (Optional)
            </label>
            <textarea
              rows={2}
              value={docNotes}
              onChange={(e) => setDocNotes(e.target.value)}
              placeholder="Add any doctor instructions or personal notes..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#bec9c6] text-[12px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa] resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-[#edeeef] text-[#191c1d] font-semibold text-[13px] hover:bg-[#e1e3e4]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="flex-1 py-3 rounded-xl bg-[#004c46] text-white font-bold text-[13px] hover:bg-[#00665e] flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-60"
            >
              {isUploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Save Record</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
