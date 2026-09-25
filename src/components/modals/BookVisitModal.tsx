import React, { useState } from 'react';
import { DOCTORS } from '../../data/healthcareData';
import { Doctor, Appointment } from '../../types';

interface BookVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSuccess: (newAppointment: Appointment) => void;
}

export const BookVisitModal: React.FC<BookVisitModalProps> = ({
  isOpen,
  onClose,
  onBookSuccess,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Cardiology');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(DOCTORS[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [consultType, setConsultType] = useState<'video' | 'in-person'>('video');
  const [reasonForVisit, setReasonForVisit] = useState<string>('');
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const specialties = [
    { name: 'Cardiology', icon: 'favorite' },
    { name: 'General Care', icon: 'stethoscope' },
    { name: 'Eye Care', icon: 'visibility' },
    { name: 'Pediatrics', icon: 'child_care' },
    { name: 'Diagnostics', icon: 'biotech' },
    { name: 'Orthopedics', icon: 'accessibility_new' },
  ];

  const timeSlots = ['09:00 AM', '10:30 AM', '11:45 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const matchedDoctor = DOCTORS.find((d) => d.id === selectedDoctorId) || DOCTORS[0];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedDate) {
      setErrorMessage('Please choose a preferred appointment date.');
      return;
    }

    if (!selectedSlot) {
      setErrorMessage('Please select a preferred time slot.');
      return;
    }

    if (!reasonForVisit.trim()) {
      setErrorMessage('Please enter the reason for your visit or symptoms.');
      return;
    }

    // Format human readable date
    const dateObj = new Date(selectedDate);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      doctor: matchedDoctor,
      status: 'Confirmed',
      date: formattedDate || selectedDate,
      time: selectedSlot,
      tokenNumber: `#${Math.floor(Math.random() * 30) + 10}`,
      isUpcoming: true,
      type: consultType,
      notes: reasonForVisit.trim() + (patientNotes ? ` • Additional notes: ${patientNotes.trim()}` : ''),
    };

    onBookSuccess(newAppointment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto border border-[#edeeef]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004c46] text-[22px]">
              calendar_add_on
            </span>
            <div>
              <h3 className="text-[19px] font-bold text-[#191c1d]">
                Book New Appointment
              </h3>
              <p className="text-[12px] text-[#3e4947]">
                Fill in your visit details to schedule consultation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#edeeef] flex items-center justify-center text-[#3e4947] hover:bg-[#e1e3e4]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-[12px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleConfirm} className="space-y-4">
          {/* Reason for Visit / Chief Complaint */}
          <div>
            <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
              Reason for Visit / Symptoms *
            </label>
            <input
              type="text"
              required
              value={reasonForVisit}
              onChange={(e) => setReasonForVisit(e.target.value)}
              placeholder="e.g. Chest tightness during exercise, annual review"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] focus:ring-1 focus:ring-[#004c46] bg-[#f8f9fa]"
            />
          </div>

          {/* Specialty Selector */}
          <div>
            <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1.5">
              Medical Specialty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {specialties.map((s) => (
                <button
                  type="button"
                  key={s.name}
                  onClick={() => setSelectedSpecialty(s.name)}
                  className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                    selectedSpecialty === s.name
                      ? 'border-[#004c46] bg-[#a2f1e6]/25 text-[#004c46] font-bold shadow-xs'
                      : 'border-[#bec9c6]/50 bg-white text-[#3e4947] hover:bg-[#f3f4f5]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                  <span className="text-[11px]">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Doctor Selection */}
          <div>
            <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
              Select Physician
            </label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] focus:ring-1 focus:ring-[#004c46] bg-[#f8f9fa]"
            >
              {DOCTORS.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} — {doc.specialty} ({doc.hospital})
                </option>
              ))}
            </select>
          </div>

          {/* Consultation Format */}
          <div>
            <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1.5">
              Consultation Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setConsultType('video')}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-[12px] font-semibold transition-all ${
                  consultType === 'video'
                    ? 'border-[#004c46] bg-[#a2f1e6]/30 text-[#004c46]'
                    : 'border-[#bec9c6]/60 text-[#3e4947] bg-white'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">videocam</span>
                <span>HD Video Call</span>
              </button>
              <button
                type="button"
                onClick={() => setConsultType('in-person')}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-[12px] font-semibold transition-all ${
                  consultType === 'in-person'
                    ? 'border-[#004c46] bg-[#a2f1e6]/30 text-[#004c46]'
                    : 'border-[#bec9c6]/60 text-[#3e4947] bg-white'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">local_hospital</span>
                <span>Hospital In-Person</span>
              </button>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
              Appointment Date *
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#bec9c6] text-[13px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
            />
          </div>

          {/* Time Slot Selection */}
          <div>
            <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1.5">
              Available Time Slot *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 rounded-xl text-[12px] font-semibold transition-all border ${
                    selectedSlot === slot
                      ? 'border-[#004c46] bg-[#004c46] text-white shadow-xs'
                      : 'border-[#bec9c6]/50 bg-[#f8f9fa] text-[#191c1d] hover:bg-[#edeeef]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1">
              Additional Notes for Physician (Optional)
            </label>
            <textarea
              rows={2}
              value={patientNotes}
              onChange={(e) => setPatientNotes(e.target.value)}
              placeholder="e.g. Any previous allergies or medications taken recently"
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
              className="flex-1 py-3 rounded-xl bg-[#004c46] text-white font-bold text-[13px] hover:bg-[#00665e] flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Confirm Booking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
