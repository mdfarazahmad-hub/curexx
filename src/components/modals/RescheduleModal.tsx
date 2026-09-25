import React, { useState } from 'react';
import { Appointment } from '../../types';

interface RescheduleModalProps {
  isOpen: boolean;
  appointment: Appointment | null;
  onClose: () => void;
  onRescheduleSuccess: (appointmentId: string, newDate: string, newTime: string) => void;
}

export const RescheduleModal: React.FC<RescheduleModalProps> = ({
  isOpen,
  appointment,
  onClose,
  onRescheduleSuccess,
}) => {
  const [newDate, setNewDate] = useState('Tomorrow, Oct 25');
  const [newTime, setNewTime] = useState('03:30 PM');

  if (!isOpen || !appointment) return null;

  const dates = ['Tomorrow, Oct 25', 'Thursday, Oct 26', 'Friday, Oct 27', 'Monday, Oct 30'];
  const times = ['09:00 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const handleConfirm = () => {
    onRescheduleSuccess(appointment.id, newDate, newTime);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-[#edeeef]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004c46] text-[22px]">
              update
            </span>
            <h3 className="text-[18px] font-bold text-[#191c1d]">
              Reschedule Visit
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#edeeef] flex items-center justify-center text-[#3e4947]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-3.5 bg-[#f8f9fa] rounded-2xl flex items-center gap-3">
          <img
            src={appointment.doctor.avatar}
            alt={appointment.doctor.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="text-[14px] font-bold text-[#191c1d]">
              {appointment.doctor.name}
            </h4>
            <p className="text-[12px] text-[#3e4947]">
              Current: {appointment.date} at {appointment.time}
            </p>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <label className="text-[12px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1.5">
            Select New Date
          </label>
          <div className="grid grid-cols-2 gap-2">
            {dates.map((d) => (
              <button
                key={d}
                onClick={() => setNewDate(d)}
                className={`p-2.5 rounded-xl text-[12px] font-semibold text-center border transition-all ${
                  newDate === d
                    ? 'bg-[#a2f1e6]/40 border-[#004c46] text-[#004c46] font-bold'
                    : 'bg-[#f3f4f5] border-transparent text-[#191c1d] hover:bg-[#edeeef]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <label className="text-[12px] font-bold text-[#3e4947] uppercase tracking-wider block mb-1.5">
            Select Slot
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => setNewTime(t)}
                className={`px-3 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all shrink-0 ${
                  newTime === t
                    ? 'bg-[#004c46] text-white shadow-xs'
                    : 'bg-[#f3f4f5] text-[#3e4947] hover:bg-[#edeeef]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 bg-[#edeeef] text-[#191c1d] py-3 rounded-xl font-semibold text-[13px] hover:bg-[#e1e3e4]"
          >
            Keep Original
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-[#004c46] text-white py-3 rounded-xl font-bold text-[13px] hover:bg-[#00665e] shadow-xs active:scale-95 transition-all"
          >
            Confirm Slot
          </button>
        </div>
      </div>
    </div>
  );
};
