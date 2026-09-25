import React, { useState } from 'react';
import { QueueUrgencyStatus, VirtualQueueToken } from '../../types';

interface VirtualQueueModalProps {
  isOpen: boolean;
  currentServingToken: number;
  myTokenNumber: number;
  tokensAhead: number;
  estimatedMinutesLeft: number;
  urgencyStatus: QueueUrgencyStatus;
  guidanceHeadline: string;
  guidanceSubtext: string;
  tokensList: VirtualQueueToken[];
  soundEnabled: boolean;
  isAutoAdvancing: boolean;
  patientName?: string;
  onClose: () => void;
  onAdvanceToken: () => void;
  onRewindToken: () => void;
  onResetToDemo: () => void;
  onDeferToken: () => void;
  onToggleSound: () => void;
  onToggleAutoAdvance: () => void;
}

export const VirtualQueueModal: React.FC<VirtualQueueModalProps> = ({
  isOpen,
  currentServingToken,
  myTokenNumber,
  tokensAhead,
  estimatedMinutesLeft,
  urgencyStatus,
  guidanceHeadline,
  guidanceSubtext,
  tokensList,
  soundEnabled,
  isAutoAdvancing,
  patientName = 'Patient',
  onClose,
  onAdvanceToken,
  onRewindToken,
  onResetToDemo,
  onDeferToken,
  onToggleSound,
  onToggleAutoAdvance,
}) => {
  const [activeTab, setActiveTab] = useState<'tracker' | 'pass' | 'directions'>('tracker');
  const [smsNotificationActive, setSmsNotificationActive] = useState<boolean>(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[92vh] border border-[#edeeef] overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#004c46] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#a2f1e6]">
              <span className="material-symbols-outlined text-[20px]">
                confirmation_number
              </span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[17px] font-bold leading-tight">
                  Virtual Queue Radar
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-[#00201d] text-[10px] font-extrabold uppercase tracking-wider">
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] text-[#a2f1e6]/90">
                Cardiology OPD • Room 204 • Dr. Ananya Sharma
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 bg-[#f3f4f5] border-b border-[#edeeef] p-1 gap-1 text-[12px] font-bold shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('tracker')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'tracker'
                ? 'bg-white text-[#004c46] shadow-xs'
                : 'text-[#56605e] hover:text-[#191c1d]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">radar</span>
            <span>Live Queue</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pass')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'pass'
                ? 'bg-white text-[#004c46] shadow-xs'
                : 'text-[#56605e] hover:text-[#191c1d]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">qr_code</span>
            <span>Digital Pass</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('directions')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'directions'
                ? 'bg-white text-[#004c46] shadow-xs'
                : 'text-[#56605e] hover:text-[#191c1d]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">navigation</span>
            <span>Directions</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'tracker' && (
            <>
              {/* Primary Status Banner */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  urgencyStatus === 'enter_room'
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                    : urgencyStatus === 'seat_now'
                    ? 'bg-amber-600 text-white border-amber-700 shadow-md'
                    : urgencyStatus === 'moving_closer'
                    ? 'bg-[#004c46] text-white border-[#004c46] shadow-md'
                    : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 text-emerald-950'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-85 block mb-0.5">
                      Smart Queue Assistant
                    </span>
                    <h4 className="text-[16px] font-extrabold leading-snug">
                      {guidanceHeadline}
                    </h4>
                    <p className="text-[13px] opacity-95 mt-1 leading-relaxed font-medium">
                      {guidanceSubtext}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[32px] shrink-0 opacity-90">
                    {urgencyStatus === 'enter_room'
                      ? 'door_front'
                      : urgencyStatus === 'seat_now'
                      ? 'event_seat'
                      : urgencyStatus === 'moving_closer'
                      ? 'directions_walk'
                      : 'self_improvement'}
                  </span>
                </div>
              </div>

              {/* Waiting Room Crowding Gauge */}
              <div className="p-3.5 rounded-2xl bg-[#f8f9fa] border border-[#edeeef] space-y-2">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-bold text-[#191c1d] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-amber-600">
                      groups
                    </span>
                    Waiting Room Capacity (OPD Floor 2)
                  </span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    84% Crowded
                  </span>
                </div>

                <div className="w-full bg-[#edeeef] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: '84%' }}
                  />
                </div>

                <p className="text-[11px] text-[#6f7977] leading-relaxed">
                  Avoid overcrowded seating. Your virtual token guarantees your position. We will notify your phone with sound and SMS 2 tokens before your turn.
                </p>
              </div>

              {/* Real-time Interactive Simulator Bar */}
              <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                    Doctor OPD Token Simulator
                  </span>
                  <button
                    type="button"
                    onClick={onResetToDemo}
                    className="text-[11px] text-slate-300 hover:text-white underline font-semibold"
                  >
                    Reset (Token #14)
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={onAdvanceToken}
                    className="py-2.5 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-[12px] flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      fast_forward
                    </span>
                    <span>Advance to #{currentServingToken + 1}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onRewindToken}
                    disabled={currentServingToken <= 1}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[12px] flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      fast_rewind
                    </span>
                    <span>Rewind Token</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={soundEnabled}
                        onChange={onToggleSound}
                        className="rounded text-teal-500 focus:ring-0"
                      />
                      <span>Audio Chime</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={isAutoAdvancing}
                        onChange={onToggleAutoAdvance}
                        className="rounded text-teal-500 focus:ring-0"
                      />
                      <span>Auto-Tick (12s)</span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={onDeferToken}
                    className="text-teal-400 hover:text-teal-300 font-bold"
                    title="Need more time? Defer your token position"
                  >
                    +10 Min Buffer
                  </button>
                </div>
              </div>

              {/* Full Detailed Token Queue Breakdown */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#6f7977] uppercase tracking-wider">
                  <span>Live Patient Sequence</span>
                  <span>Avg 5 min / consult</span>
                </div>

                <div className="space-y-1.5">
                  {tokensList.map((t) => {
                    const isServing = t.tokenNumber === currentServingToken;
                    const isMe = t.tokenNumber === myTokenNumber;

                    return (
                      <div
                        key={t.tokenNumber}
                        className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                          isServing
                            ? 'bg-emerald-50 border-emerald-400 shadow-xs'
                            : isMe
                            ? 'bg-[#004c46]/10 border-[#004c46] ring-1 ring-[#004c46]'
                            : t.tokenNumber < currentServingToken
                            ? 'bg-[#f8f9fa] border-transparent opacity-60'
                            : 'bg-white border-[#edeeef]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-9 h-9 rounded-xl font-bold text-[14px] flex items-center justify-center shrink-0 ${
                              isServing
                                ? 'bg-emerald-600 text-white animate-pulse'
                                : isMe
                                ? 'bg-[#004c46] text-white'
                                : t.tokenNumber < currentServingToken
                                ? 'bg-[#edeeef] text-[#6f7977]'
                                : 'bg-[#f3f4f5] text-[#191c1d]'
                            }`}
                          >
                            #{t.tokenNumber}
                          </span>

                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-[13px] text-[#191c1d]">
                                {isMe ? `${patientName} (YOU)` : `Patient ${t.patientInitials}`}
                              </span>
                              {isMe && (
                                <span className="bg-[#004c46] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase">
                                  YOUR PASS
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#6f7977]">
                              {isServing
                                ? 'Currently inside Room 204'
                                : t.tokenNumber < currentServingToken
                                ? `Completed at ${t.calledAt || '10:15 AM'}`
                                : `Approx. ${t.approxWaitMins} mins wait`}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              isServing
                                ? 'bg-emerald-100 text-emerald-800'
                                : isMe
                                ? 'bg-[#a2f1e6]/60 text-[#004c46]'
                                : t.tokenNumber < currentServingToken
                                ? 'bg-gray-100 text-gray-600'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {isServing ? 'In Session' : isMe ? 'Waiting' : t.status === 'completed' ? 'Done' : 'Queued'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {activeTab === 'pass' && (
            <div className="space-y-4">
              {/* Boarding Pass Style Digital Token */}
              <div className="rounded-3xl bg-white border-2 border-[#004c46] shadow-xl overflow-hidden relative">
                {/* Pass Top */}
                <div className="bg-[#004c46] text-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#a2f1e6]">
                        CureX Health • Official OPD Pass
                      </span>
                      <h4 className="text-[20px] font-extrabold mt-0.5">
                        Cardiology Consultation
                      </h4>
                    </div>
                    <span className="material-symbols-outlined text-[32px] text-[#a2f1e6]">
                      medical_services
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/20 text-[12px]">
                    <div>
                      <span className="text-[10px] text-white/70 uppercase font-semibold block">
                        Patient
                      </span>
                      <span className="font-bold truncate block">{patientName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/70 uppercase font-semibold block">
                        Physician
                      </span>
                      <span className="font-bold truncate block">Dr. Ananya</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/70 uppercase font-semibold block">
                        Room
                      </span>
                      <span className="font-bold block">Room 204</span>
                    </div>
                  </div>
                </div>

                {/* Perforated Divider */}
                <div className="relative py-2 flex items-center justify-between px-3 bg-[#f8f9fa]">
                  <div className="w-5 h-5 -ml-5.5 rounded-full bg-black/70" />
                  <div className="flex-1 border-b-2 border-dashed border-[#bec9c6]" />
                  <div className="w-5 h-5 -mr-5.5 rounded-full bg-black/70" />
                </div>

                {/* Pass Bottom: Big Token & QR */}
                <div className="p-6 bg-[#f8f9fa] flex flex-col items-center text-center space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-extrabold text-[#6f7977] uppercase tracking-wider">
                      Your Official Digital Token
                    </span>
                    <div className="text-[52px] font-black text-[#004c46] leading-none tracking-tight">
                      #{myTokenNumber}
                    </div>
                    <p className="text-[12px] text-[#3e4947] font-medium">
                      Doctor is currently on Token #{currentServingToken}
                    </p>
                  </div>

                  {/* QR Code Graphic Box */}
                  <div className="w-40 h-40 bg-white p-3 rounded-2xl border border-[#bec9c6]/50 shadow-inner flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-[100px] text-[#004c46]">
                      qr_code_2
                    </span>
                    <span className="text-[9px] font-mono font-bold text-[#6f7977]">
                      TOKEN-18-OPD-CARDIOLOGY
                    </span>
                  </div>

                  <div className="text-[11px] text-[#6f7977] max-w-xs leading-relaxed">
                    Scan at the Nurse Triage Desk or OPD Entrance to auto-confirm your arrival.
                  </div>
                </div>
              </div>

              {/* SMS Notification Preference */}
              <div className="p-3.5 rounded-2xl bg-[#f8f9fa] border border-[#edeeef] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#004c46]">
                    sms
                  </span>
                  <div>
                    <h5 className="text-[13px] font-bold text-[#191c1d]">
                      SMS &amp; Push Alerts
                    </h5>
                    <p className="text-[11px] text-[#6f7977]">
                      Ping me when doctor is 2 tokens away
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSmsNotificationActive(!smsNotificationActive)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    smsNotificationActive ? 'bg-[#004c46]' : 'bg-[#bec9c6]'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      smsNotificationActive ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'directions' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-[#edeeef] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px] text-[#004c46]">
                    apartment
                  </span>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#191c1d]">
                      Indoor Hospital Wayfinding
                    </h4>
                    <p className="text-[11px] text-[#6f7977]">
                      ABC Multispeciality Hospital • Main Block
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#004c46] text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <div className="text-[13px]">
                      <p className="font-bold text-[#191c1d]">Enter via Main Entrance Gate A</p>
                      <p className="text-[#6f7977] text-[11px]">Proceed past the pharmacy towards Central Elevators.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#004c46] text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <div className="text-[13px]">
                      <p className="font-bold text-[#191c1d]">Take Elevator to Floor 2</p>
                      <p className="text-[#6f7977] text-[11px]">Follow signs for OPD Cardiology &amp; Pulmonology.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#004c46] text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <div className="text-[13px]">
                      <p className="font-bold text-[#191c1d]">Consultation Room 204</p>
                      <p className="text-[#6f7977] text-[11px]">Digital screen outside the door displays the live token.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Waiting Recommendations */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <h5 className="text-[13px] font-bold text-emerald-950 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-emerald-800">
                    park
                  </span>
                  Recommended Waiting Areas Outside
                </h5>
                <ul className="text-[12px] text-emerald-900 space-y-1.5 list-disc pl-4 font-medium">
                  <li><strong>Garden Courtyard:</strong> Ground Floor, East Wing (Free Wi-Fi, Fresh Air)</li>
                  <li><strong>Hospital Cafe &amp; Bakery:</strong> Ground Floor, near Entrance B</li>
                  <li><strong>Quiet Reading Lounge:</strong> 1st Floor Atrium</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#edeeef] bg-[#f8f9fa] flex items-center justify-between gap-3 shrink-0">
          <div className="text-[12px] text-[#6f7977]">
            <span>Token #{myTokenNumber}</span>
            <span className="mx-1.5">·</span>
            <span className="font-bold text-[#191c1d]">
              {tokensAhead === 0 ? 'Your Turn' : `~${estimatedMinutesLeft} mins remaining`}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-[#004c46] text-white font-bold text-[13px] hover:bg-[#00665e] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
