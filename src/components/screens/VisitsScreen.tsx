import React, { useState } from 'react';
import { Appointment } from '../../types';

interface VisitsScreenProps {
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  cancelledAppointments: Appointment[];
  myTokenNumber?: number;
  currentServingToken?: number;
  onOpenVirtualQueueModal?: () => void;
  onOpenBookModal: () => void;
  onJoinVideoCall: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
  onCancelAppointment: (appointmentId: string) => void;
  onViewSummary: (appointment: Appointment) => void;
}

export const VisitsScreen: React.FC<VisitsScreenProps> = ({
  upcomingAppointments,
  pastAppointments,
  cancelledAppointments,
  myTokenNumber = 18,
  currentServingToken = 14,
  onOpenVirtualQueueModal,
  onOpenBookModal,
  onJoinVideoCall,
  onReschedule,
  onCancelAppointment,
  onViewSummary,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');

  return (
    <div className="flex flex-col w-full pb-6 space-y-5 animate-in fade-in duration-300">
      {/* Header / Intro Banner */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-[24px] sm:text-[26px] text-[#191c1d] font-bold tracking-tight">
            Your Visits
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#3e4947] mt-0.5">
            Manage your upcoming consultations and medical history
          </p>
        </div>
        <button
          aria-label="Book New Appointment"
          onClick={onOpenBookModal}
          className="flex items-center gap-1.5 bg-[#004c46] text-white px-3.5 py-2.5 rounded-xl text-[13px] font-semibold shadow-xs hover:bg-[#00665e] active:scale-95 transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-[19px]">add</span>
          <span>Book Visit</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex bg-[#edeeef] p-1 rounded-xl">
        <button
          onClick={() => setActiveSubTab('upcoming')}
          className={`flex-1 py-2.5 rounded-lg text-center text-[13px] font-semibold transition-all ${
            activeSubTab === 'upcoming'
              ? 'bg-white text-[#004c46] shadow-xs'
              : 'text-[#3e4947] hover:text-[#191c1d]'
          }`}
        >
          Upcoming ({upcomingAppointments.length})
        </button>
        <button
          onClick={() => setActiveSubTab('past')}
          className={`flex-1 py-2.5 rounded-lg text-center text-[13px] font-semibold transition-all ${
            activeSubTab === 'past'
              ? 'bg-white text-[#004c46] shadow-xs'
              : 'text-[#3e4947] hover:text-[#191c1d]'
          }`}
        >
          Past ({pastAppointments.length})
        </button>
        <button
          onClick={() => setActiveSubTab('cancelled')}
          className={`flex-1 py-2.5 rounded-lg text-center text-[13px] font-semibold transition-all ${
            activeSubTab === 'cancelled'
              ? 'bg-white text-[#004c46] shadow-xs'
              : 'text-[#3e4947] hover:text-[#191c1d]'
          }`}
        >
          Cancelled ({cancelledAppointments.length})
        </button>
      </div>

      {/* Tab Content: UPCOMING */}
      {activeSubTab === 'upcoming' && (
        <div className="flex flex-col space-y-4">
          {upcomingAppointments.length > 0 ? (
            <>
              {/* Live Consultation Banner / Alert */}
              <div className="bg-[#a2f1e6]/40 p-4 rounded-2xl flex items-center gap-3.5 shadow-xs border border-[#86d5ca]/40">
                <div className="w-12 h-12 rounded-full bg-[#004c46] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined animate-pulse text-[24px]">
                    videocam
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#004c46] text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Today
                    </span>
                    <span className="text-[12px] font-medium text-[#3e4947]">
                      {upcomingAppointments[0].time}
                    </span>
                  </div>
                  <p className="text-[14px] font-semibold text-[#191c1d] truncate mt-0.5">
                    Video Consultation starting soon
                  </p>
                </div>
                <button
                  onClick={() => onJoinVideoCall(upcomingAppointments[0])}
                  className="bg-[#004c46] text-white px-3.5 py-2 rounded-xl text-[13px] font-semibold shrink-0 shadow-xs hover:bg-[#00665e] active:scale-95 transition-all"
                >
                  Join Now
                </button>
              </div>

              {/* Detailed Appointment Cards */}
              {upcomingAppointments.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl p-5 shadow-xs border border-[#edeeef] flex flex-col space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="relative shrink-0">
                        <img
                          className="w-15 h-15 rounded-full object-cover shadow-xs ring-2 ring-[#a2f1e6]/50"
                          src={app.doctor.avatar}
                          alt={app.doctor.name}
                          referrerPolicy="no-referrer"
                        />
                        <span
                          className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#004c46] rounded-full border-2 border-white"
                          title="Confirmed"
                        />
                      </div>
                      <div>
                        <h3 className="text-[17px] font-bold text-[#191c1d] leading-tight">
                          {app.doctor.name}
                        </h3>
                        <p className="text-[13px] text-[#004c46] font-medium mt-0.5">
                          {app.doctor.specialty}
                        </p>
                        <p className="text-[12px] text-[#6f7977]">
                          {app.doctor.hospital}
                        </p>
                      </div>
                    </div>
                    {onOpenVirtualQueueModal ? (
                      <button
                        type="button"
                        onClick={onOpenVirtualQueueModal}
                        className="bg-[#004c46] hover:bg-[#00665e] text-[#a2f1e6] px-3 py-1.5 rounded-xl text-[12px] font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                        title="Click to track live OPD virtual queue"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Token #{myTokenNumber} (Live #{currentServingToken})</span>
                      </button>
                    ) : (
                      <div className="bg-[#a2f1e6]/50 text-[#00201d] px-3 py-1 rounded-full text-[12px] font-bold">
                        Token #{app.tokenNumber}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-[#f3f4f5] p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#004c46] text-[20px]">
                        calendar_today
                      </span>
                      <div>
                        <p className="text-[11px] text-[#6f7977]">Date</p>
                        <p className="text-[13px] font-semibold text-[#191c1d]">
                          {app.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#004c46] text-[20px]">
                        schedule
                      </span>
                      <div>
                        <p className="text-[11px] text-[#6f7977]">Time</p>
                        <p className="text-[13px] font-semibold text-[#191c1d]">
                          {app.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onReschedule(app)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#edeeef] text-[#191c1d] text-[13px] font-semibold hover:bg-[#e1e3e4] transition-colors text-center active:scale-95"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => onCancelAppointment(app.id)}
                      className="py-2.5 px-4 rounded-xl bg-[#ffdad6]/60 text-[#ba1a1a] text-[13px] font-semibold hover:bg-[#ffdad6] transition-colors active:scale-95"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}

              {/* Care Instructions Card */}
              <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#edeeef] flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#d7e5e2] text-[#121e1c] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">info</span>
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-[#191c1d]">
                    Before your visit
                  </h4>
                  <p className="text-[12px] text-[#3e4947] mt-0.5 leading-relaxed">
                    Please keep your previous ECG reports handy and join 5 minutes prior to test your camera and microphone.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center flex flex-col items-center justify-center shadow-xs border border-[#edeeef] space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#f3f4f5] flex items-center justify-center text-[#6f7977]">
                <span className="material-symbols-outlined text-[28px]">
                  event_available
                </span>
              </div>
              <h3 className="text-[16px] font-semibold text-[#191c1d]">
                No Upcoming Visits
              </h3>
              <p className="text-[13px] text-[#6f7977] max-w-xs">
                You do not have any pending appointments. Need a checkup?
              </p>
              <button
                onClick={onOpenBookModal}
                className="mt-2 px-4 py-2 bg-[#004c46] text-white text-[13px] font-semibold rounded-xl"
              >
                Book an Appointment
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab Content: PAST */}
      {activeSubTab === 'past' && (
        <div className="flex flex-col space-y-3">
          {pastAppointments.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl p-4 shadow-xs border border-[#edeeef] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#f3f4f5] flex items-center justify-center text-[#3e4947] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">
                    {app.doctor.specialty.includes('Ophthal') ? 'visibility' : 'stethoscope'}
                  </span>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#191c1d]">
                    {app.doctor.name}
                  </h3>
                  <p className="text-[12px] text-[#6f7977]">
                    {app.doctor.specialty} • {app.date}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onViewSummary(app)}
                className="text-[#004c46] text-[13px] font-semibold px-3 py-1.5 rounded-lg bg-[#a2f1e6]/35 hover:bg-[#a2f1e6]/60 transition-colors active:scale-95"
              >
                Summary
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: CANCELLED */}
      {activeSubTab === 'cancelled' && (
        <div className="flex flex-col space-y-3">
          {cancelledAppointments.length > 0 ? (
            cancelledAppointments.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl p-4 shadow-xs border border-[#edeeef] flex items-center justify-between opacity-80"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#ffdad6]/40 flex items-center justify-center text-[#ba1a1a] shrink-0">
                    <span className="material-symbols-outlined text-[22px]">event_busy</span>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#191c1d] line-through text-[#6f7977]">
                      {app.doctor.name}
                    </h3>
                    <p className="text-[12px] text-[#ba1a1a]">
                      Cancelled on {app.date}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#ba1a1a] bg-[#ffdad6]/60 px-2 py-0.5 rounded-md">
                  Cancelled
                </span>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center flex flex-col items-center justify-center shadow-xs border border-[#edeeef] space-y-2">
              <div className="w-15 h-15 rounded-full bg-[#f3f4f5] flex items-center justify-center text-[#6f7977]">
                <span className="material-symbols-outlined text-[32px]">
                  event_busy
                </span>
              </div>
              <h3 className="text-[16px] font-semibold text-[#191c1d]">
                No Cancelled Visits
              </h3>
              <p className="text-[13px] text-[#6f7977] max-w-xs leading-relaxed">
                You have no cancelled appointments. That&apos;s great for your health journey!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
