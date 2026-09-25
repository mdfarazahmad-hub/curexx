import React, { useState } from 'react';
import { PatientQueueItem } from '../../types';
import { AuthUser } from './LoginAuthScreen';

interface ClinicalScreenProps {
  currentUser?: AuthUser | null;
  queue: PatientQueueItem[];
  onOpenCriticalAlert: () => void;
  onOpenAiCopilot: () => void;
  onOpenPrescribe: (patient: PatientQueueItem) => void;
  onViewChart: (patient: PatientQueueItem) => void;
  onAddNote: (patient: PatientQueueItem) => void;
}

export const ClinicalScreen: React.FC<ClinicalScreenProps> = ({
  currentUser,
  queue,
  onOpenCriticalAlert,
  onOpenAiCopilot,
  onOpenPrescribe,
  onViewChart,
  onAddNote,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'waiting'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredQueue = filterMode === 'all'
    ? queue
    : queue.filter((p) => p.status === 'Waiting');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const doctorDisplayName = currentUser?.name || 'Dr. Sharma';

  return (
    <div className="flex flex-col w-full pb-8 animate-in fade-in duration-300">
      {/* Greeting & Date Strip */}
      <div className="flex items-center justify-between mb-4 pt-1">
        <div>
          <span className="text-[11px] text-[#004c46] font-bold tracking-wider uppercase">
            {currentUser?.department ? `${currentUser.department} • Workspace` : 'Clinical Workspace'}
          </span>
          <h1 className="text-[22px] sm:text-[24px] text-[#191c1d] font-bold tracking-tight">
            Good morning, {doctorDisplayName}
          </h1>
        </div>
        <div className="flex items-center gap-1.5 bg-[#edeeef] px-3 py-1.5 rounded-xl border border-[#bec9c6]/40">
          <span className="material-symbols-outlined text-[#004c46] text-[18px]">
            calendar_today
          </span>
          <span className="text-[12px] text-[#191c1d] font-semibold">
            Oct 24, 2023
          </span>
        </div>
      </div>

      {/* Critical Lab Alert Banner */}
      <div className="mb-4 bg-[#ffdad6]/60 p-4 rounded-2xl flex items-start gap-3.5 shadow-xs border border-[#ffdad6]">
        <div className="w-10 h-10 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0">
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            warning
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#93000a] font-bold">
              Critical Lab Alert
            </span>
            <span className="text-[11px] text-[#93000a]/80 font-medium">10m ago</span>
          </div>
          <p className="text-[12px] text-[#93000a] mt-0.5 truncate font-medium">
            Patient Robert Fox (Bed 4) - Potassium spike detected (6.2 mmol/L).
          </p>
        </div>
        <button
          onClick={onOpenCriticalAlert}
          className="bg-[#ba1a1a] text-white text-[12px] px-3.5 py-1.5 rounded-xl font-semibold self-center hover:bg-[#ba1a1a]/90 transition-opacity active:scale-95 shrink-0 shadow-xs"
        >
          Review
        </button>
      </div>

      {/* Overview Metrics Grid (Bento Style) */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Appointments */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#3e4947] font-medium">Appointments</span>
            <div className="w-8 h-8 rounded-full bg-[#a2f1e6]/45 flex items-center justify-center text-[#004c46]">
              <span className="material-symbols-outlined text-[18px]">group</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[24px] font-bold text-[#191c1d]">14</span>
            <span className="text-[12px] text-[#3e4947] ml-1.5">scheduled</span>
          </div>
        </div>

        {/* Waiting Room */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#3e4947] font-medium">Waiting Room</span>
            <div className="w-8 h-8 rounded-full bg-[#d8e2ff]/50 flex items-center justify-center text-[#0059bb]">
              <span className="material-symbols-outlined text-[18px]">
                airline_seat_recline_normal
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-[24px] font-bold text-[#191c1d]">3</span>
            <span className="text-[12px] text-[#0059bb] font-semibold">Active queue</span>
          </div>
        </div>

        {/* Follow-ups */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#3e4947] font-medium">Follow-ups</span>
            <div className="w-8 h-8 rounded-full bg-[#d7e5e2]/70 flex items-center justify-center text-[#394544]">
              <span className="material-symbols-outlined text-[18px]">update</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[24px] font-bold text-[#191c1d]">5</span>
            <span className="text-[12px] text-[#3e4947] ml-1.5">calls / visits</span>
          </div>
        </div>

        {/* Pending Reports */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#3e4947] font-medium">Pending Reports</span>
            <div className="w-8 h-8 rounded-full bg-[#e1e3e4] flex items-center justify-center text-[#3e4947]">
              <span className="material-symbols-outlined text-[18px]">description</span>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[24px] font-bold text-[#191c1d]">2</span>
            <span className="text-[12px] text-[#3e4947] ml-1.5">to sign</span>
          </div>
        </div>
      </div>

      {/* CureX AI Clinical Copilot Card */}
      <div className="mb-5 bg-gradient-to-r from-[#00665e] to-[#004c46] p-5 rounded-2xl text-white shadow-md relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none">
          <span className="material-symbols-outlined text-[110px]">smart_toy</span>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#a2f1e6] text-[20px]">
              auto_awesome
            </span>
            <span className="text-[13px] font-bold text-[#a2f1e6] tracking-wide">
              CureX AI Clinical Copilot
            </span>
          </div>
          <p className="text-[12px] text-white/90 mb-4 leading-relaxed">
            Draft session summaries, pull patient chart histories, and generate preliminary differential diagnoses instantly.
          </p>
          <button
            onClick={onOpenAiCopilot}
            className="bg-[#a2f1e6] text-[#00201d] px-4 py-2.5 rounded-xl font-bold text-[13px] flex items-center gap-1.5 hover:bg-[#86d5ca] transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span>Draft Summary &amp; Notes</span>
          </button>
        </div>
      </div>

      {/* Patient Queue Section */}
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-[17px] text-[#191c1d] font-bold tracking-tight">
          Patient Queue
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-colors ${
              filterMode === 'all'
                ? 'bg-[#004c46] text-white shadow-xs'
                : 'bg-[#edeeef] text-[#3e4947] hover:bg-[#e1e3e4]'
            }`}
          >
            All ({queue.length})
          </button>
          <button
            onClick={() => setFilterMode('waiting')}
            className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-colors ${
              filterMode === 'waiting'
                ? 'bg-[#004c46] text-white shadow-xs'
                : 'bg-[#edeeef] text-[#3e4947] hover:bg-[#e1e3e4]'
            }`}
          >
            Waiting (3)
          </button>
        </div>
      </div>

      {/* Queue List */}
      <div className="flex flex-col gap-3">
        {filteredQueue.map((patient) => {
          const isConsultation = patient.status === 'In Consultation';
          const isWaiting = patient.status === 'Waiting';
          const isCompleted = patient.status === 'Completed';

          return (
            <div
              key={patient.id}
              className={`bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] flex flex-col gap-3 transition-all ${
                isCompleted ? 'opacity-85' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-[#edeeef]">
                    <img
                      className="w-full h-full object-cover"
                      src={patient.avatar}
                      alt={patient.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14px] text-[#191c1d] font-bold">
                        {patient.name}
                      </h3>
                      <span className="text-[12px] text-[#6f7977]">
                        {patient.gender} / {patient.age}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#3e4947] mt-0.5 line-clamp-1">
                      Symptoms: {patient.symptoms}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 ${
                    isConsultation
                      ? 'bg-[#a2f1e6]/60 text-[#004c46]'
                      : isWaiting
                      ? 'bg-[#d8e2ff]/60 text-[#0059bb]'
                      : 'bg-[#d7e5e2] text-[#394544]'
                  }`}
                >
                  {patient.status}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#f3f4f5]">
                <div className="flex items-center gap-1 text-[12px] text-[#6f7977]">
                  <span className="material-symbols-outlined text-[16px]">
                    schedule
                  </span>
                  <span>{patient.timeSlot}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onViewChart(patient)}
                    className="p-2 rounded-xl bg-[#edeeef] text-[#3e4947] hover:text-[#191c1d] hover:bg-[#e1e3e4] transition-colors active:scale-95"
                    title="View Patient Chart"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      folder_shared
                    </span>
                  </button>
                  <button
                    onClick={() => onAddNote(patient)}
                    className="p-2 rounded-xl bg-[#edeeef] text-[#3e4947] hover:text-[#191c1d] hover:bg-[#e1e3e4] transition-colors active:scale-95"
                    title="Add Consultation Note"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      edit_note
                    </span>
                  </button>
                  {isCompleted ? (
                    <button
                      onClick={() => onViewChart(patient)}
                      className="px-3 py-1.5 rounded-xl bg-[#edeeef] text-[#191c1d] text-[12px] font-semibold hover:bg-[#e1e3e4] transition-colors flex items-center gap-1 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        visibility
                      </span>
                      <span>Summary</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenPrescribe(patient)}
                      className="px-3 py-1.5 rounded-xl bg-[#004c46] text-white text-[12px] font-semibold hover:bg-[#00665e] transition-colors flex items-center gap-1 active:scale-95 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        pill
                      </span>
                      <span>Prescribe</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Temporary Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-20 inset-x-5 z-50 transition-all animate-in fade-in slide-in-from-bottom duration-300">
          <div className="bg-[#004c46] text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-[#a2f1e6]/40">
            <span className="material-symbols-outlined text-[#a2f1e6] text-[22px]">
              check_circle
            </span>
            <p className="text-[13px] font-medium">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};
