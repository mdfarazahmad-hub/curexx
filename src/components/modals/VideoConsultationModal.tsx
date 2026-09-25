import React, { useState, useEffect } from 'react';
import { Appointment } from '../../types';

interface VideoConsultationModalProps {
  isOpen: boolean;
  appointment: Appointment | null;
  onClose: () => void;
}

export const VideoConsultationModal: React.FC<VideoConsultationModalProps> = ({
  isOpen,
  appointment,
  onClose,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'vitals'>('video');
  const [consultationNotes, setConsultationNotes] = useState(
    'Patient reports mild fatigue after morning walks. Blood pressure today 120/80 mmHg. Maintain current medication dosage.'
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !appointment) return null;

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#191c1d] text-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[90vh] max-h-[700px] border border-white/10">
        {/* Top Header */}
        <div className="p-4 flex items-center justify-between bg-black/30 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#a2f1e6]/60">
              <img
                src={appointment.doctor.avatar}
                alt={appointment.doctor.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-[14px] font-bold leading-tight">
                {appointment.doctor.name}
              </h3>
              <p className="text-[11px] text-[#86d5ca]">
                {appointment.doctor.specialty} • Encrypted Telehealth
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 text-[11px] font-mono flex items-center gap-1.5 border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              {formatTime(seconds)}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Video Canvas / Screen Content */}
        <div className="flex-1 relative bg-gradient-to-b from-[#00201d] to-[#00100e] overflow-hidden flex flex-col">
          {activeTab === 'video' ? (
            <div className="flex-1 relative flex items-center justify-center p-4">
              {/* Doctor Main Video Stream */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#00302b] flex items-center justify-center shadow-inner border border-white/10">
                <img
                  src={appointment.doctor.avatar}
                  alt={appointment.doctor.name}
                  className="w-full h-full object-cover opacity-90 scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-[12px] font-medium flex items-center gap-2 border border-white/15">
                  <span className="material-symbols-outlined text-[#86d5ca] text-[16px]">
                    verified
                  </span>
                  <span>{appointment.doctor.name}</span>
                  <span className="text-[#a2f1e6] text-[11px]">• Audio HD</span>
                </div>
              </div>

              {/* Patient PiP Video */}
              <div className="absolute top-7 right-7 w-28 h-36 rounded-xl overflow-hidden bg-black/80 ring-2 ring-[#a2f1e6]/60 shadow-xl flex items-center justify-center">
                {isVideoOff ? (
                  <div className="flex flex-col items-center gap-1 text-white/60">
                    <span className="material-symbols-outlined text-[24px]">
                      videocam_off
                    </span>
                    <span className="text-[10px]">Cam Off</span>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#004c46] to-[#00201d] flex flex-col items-center justify-center p-2 text-center">
                    <div className="w-10 h-10 rounded-full bg-[#a2f1e6] text-[#00201d] font-bold flex items-center justify-center text-sm shadow-sm mb-1">
                      R
                    </div>
                    <span className="text-[11px] font-semibold text-white">
                      Rahul (You)
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'notes' ? (
            <div className="flex-1 p-5 overflow-y-auto">
              <h4 className="text-[14px] font-bold text-[#a2f1e6] mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">clinical_notes</span>
                Live Consultation Summary &amp; Rx
              </h4>
              <textarea
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
                rows={8}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-[13px] text-white focus:outline-[#86d5ca] leading-relaxed resize-none"
              />
              <p className="text-[11px] text-white/50 mt-2">
                Notes written here are automatically synced to your digital health wallet upon call completion.
              </p>
            </div>
          ) : (
            <div className="flex-1 p-5 overflow-y-auto space-y-3">
              <h4 className="text-[14px] font-bold text-[#a2f1e6] mb-1">
                Real-Time Monitored Vitals
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <span className="text-[11px] text-white/60">Blood Pressure</span>
                  <p className="text-[18px] font-bold text-[#a2f1e6]">120/80</p>
                  <span className="text-[10px] text-green-400">Within range</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <span className="text-[11px] text-white/60">Heart Rate</span>
                  <p className="text-[18px] font-bold text-[#86d5ca]">72 bpm</p>
                  <span className="text-[10px] text-green-400">Sinus rhythm</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <span className="text-[11px] text-white/60">SpO2 Oxygen</span>
                  <p className="text-[18px] font-bold text-white">99%</p>
                  <span className="text-[10px] text-green-400">Optimal</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <span className="text-[11px] text-white/60">Temperature</span>
                  <p className="text-[18px] font-bold text-white">98.6 °F</p>
                  <span className="text-[10px] text-green-400">Normal</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick tab switcher inside call */}
          <div className="px-4 py-2 flex items-center justify-center gap-2 bg-black/40">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-colors ${
                activeTab === 'video' ? 'bg-[#00665e] text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              Video Call
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-colors ${
                activeTab === 'notes' ? 'bg-[#00665e] text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              Doctor Notes
            </button>
            <button
              onClick={() => setActiveTab('vitals')}
              className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-colors ${
                activeTab === 'vitals' ? 'bg-[#00665e] text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              Live Vitals
            </button>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-around">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isMuted ? 'bg-red-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
          </button>

          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isVideoOff ? 'bg-red-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'
            }`}
            title={isVideoOff ? 'Start Camera' : 'Stop Camera'}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isVideoOff ? 'videocam_off' : 'videocam'}
            </span>
          </button>

          <button
            onClick={onClose}
            className="w-14 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform active:scale-90"
            title="End Consultation"
          >
            <span className="material-symbols-outlined text-[24px]">call_end</span>
          </button>
        </div>
      </div>
    </div>
  );
};
