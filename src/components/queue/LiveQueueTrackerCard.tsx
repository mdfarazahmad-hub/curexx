import React from 'react';
import { QueueUrgencyStatus, VirtualQueueToken } from '../../types';

interface LiveQueueTrackerCardProps {
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
  notificationBanner: string | null;
  onAdvanceToken: () => void;
  onOpenFullModal: () => void;
  onToggleSound: () => void;
  onToggleAutoAdvance: () => void;
  onResetToDemo: () => void;
}

export const LiveQueueTrackerCard: React.FC<LiveQueueTrackerCardProps> = ({
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
  notificationBanner,
  onAdvanceToken,
  onOpenFullModal,
  onToggleSound,
  onToggleAutoAdvance,
  onResetToDemo,
}) => {
  // Theme styling based on urgency
  const getStatusStyles = () => {
    switch (urgencyStatus) {
      case 'enter_room':
        return {
          bannerBg: 'bg-emerald-700 text-white',
          borderCol: 'border-emerald-600',
          dotBg: 'bg-white animate-ping',
          chipBadge: 'bg-white text-emerald-800 font-bold',
          tagline: 'YOUR TURN NOW • PROCEED TO ROOM 204',
        };
      case 'seat_now':
        return {
          bannerBg: 'bg-amber-700 text-white',
          borderCol: 'border-amber-600',
          dotBg: 'bg-amber-200 animate-ping',
          chipBadge: 'bg-amber-100 text-amber-900 font-bold',
          tagline: 'NEXT IN LINE • BE SEATED OUTSIDE ROOM 204',
        };
      case 'moving_closer':
        return {
          bannerBg: 'bg-[#004c46] text-white',
          borderCol: 'border-[#004c46]',
          dotBg: 'bg-[#a2f1e6] animate-pulse',
          chipBadge: 'bg-[#a2f1e6]/30 text-[#a2f1e6]',
          tagline: 'APPROACHING • PROCEED TOWARDS FLOOR 2',
        };
      default:
        return {
          bannerBg: 'bg-[#0c3833] text-white',
          borderCol: 'border-[#0c3833]/30',
          dotBg: 'bg-emerald-400 animate-pulse',
          chipBadge: 'bg-white/15 text-[#a2f1e6]',
          tagline: 'NO NEED TO SIT IN WAITING ROOM YET',
        };
    }
  };

  const statusStyle = getStatusStyles();

  // Selected window of tokens to display in horizontal tracker: from currentServingToken to myTokenNumber
  const visibleTokens = tokensList.filter(
    (t) => t.tokenNumber >= currentServingToken && t.tokenNumber <= myTokenNumber + 1
  );

  return (
    <section
      aria-label="Virtual Queue Tracker"
      className="w-full mb-6 rounded-3xl bg-white border border-[#e2e7e5] shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_6px_20px_rgba(0,76,70,0.08)] relative"
    >
      {/* Live Token Alert Popover */}
      {notificationBanner && (
        <div className="bg-[#00201d] text-[#a2f1e6] px-4 py-2 text-[12px] font-semibold flex items-center justify-between animate-in slide-in-from-top-2 duration-200 border-b border-[#004c46]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-amber-300 animate-spin">
              autorenew
            </span>
            <span>{notificationBanner}</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-white/70">Live Sync</span>
        </div>
      )}

      {/* Header Bar */}
      <div className={`${statusStyle.bannerBg} px-4 py-3 flex items-center justify-between transition-colors duration-300`}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider">
            Live Virtual Queue
          </span>
          <span className="text-white/40">·</span>
          <span className="text-[11px] font-medium opacity-90">OPD Cardiology • Room 204</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Sound Mute/Unmute */}
          <button
            type="button"
            onClick={onToggleSound}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title={soundEnabled ? 'Chime sound is active' : 'Chime muted'}
          >
            <span className="material-symbols-outlined text-[15px]">
              {soundEnabled ? 'volume_up' : 'volume_off'}
            </span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-4">
        {/* Token Comparison & Wait Time Hero Cards */}
        <div className="grid grid-cols-12 gap-2.5">
          {/* Currently Seeing */}
          <div className="col-span-4 p-3.5 rounded-2xl bg-[#f7f9f8] border border-[#e5e9e8] flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#647471] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Now Serving
            </span>
            <div className="my-1">
              <span className="text-[26px] font-black font-mono tabular-nums text-[#141d1c] tracking-tight leading-none">
                #{currentServingToken}
              </span>
            </div>
            <span className="text-[11px] text-[#4d5c59] font-medium truncate">
              Room 204
            </span>
          </div>

          {/* Your Token */}
          <div className="col-span-4 p-3.5 rounded-2xl bg-[#eef7f5] border-2 border-[#004c46] flex flex-col justify-between relative overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#004c46]">
                Your Token
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#004c46] text-white uppercase">
                YOU
              </span>
            </div>
            <div className="my-1">
              <span className="text-[28px] font-black font-mono tabular-nums text-[#004c46] tracking-tight leading-none">
                #{myTokenNumber}
              </span>
            </div>
            <span className="text-[11px] text-[#004c46] font-semibold truncate">
              Dr. Ananya Sharma
            </span>
          </div>

          {/* Estimated Wait */}
          <div className="col-span-4 p-3.5 rounded-2xl bg-[#f7f9f8] border border-[#e5e9e8] flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#647471]">
              Estimated Wait
            </span>
            <div className="my-1 flex items-baseline gap-1">
              <span className={`text-[24px] font-black font-mono tabular-nums tracking-tight leading-none ${
                tokensAhead === 0 ? 'text-emerald-700' : tokensAhead <= 1 ? 'text-amber-700' : 'text-[#141d1c]'
              }`}>
                {tokensAhead === 0 ? 'Now' : `${estimatedMinutesLeft}m`}
              </span>
            </div>
            <span className="text-[11px] text-[#4d5c59] font-medium">
              {tokensAhead === 0 ? 'Your turn!' : `${tokensAhead} ahead of you`}
            </span>
          </div>
        </div>

        {/* The Exact Natural Language Smart Guidance requested by prompt */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            urgencyStatus === 'enter_room'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : urgencyStatus === 'seat_now'
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : urgencyStatus === 'moving_closer'
              ? 'bg-[#004c46]/5 border-[#004c46]/30 text-[#003833]'
              : 'bg-[#f4f8f7] border-[#d2e2de] text-[#0d342f]'
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-xl bg-white shadow-2xs flex items-center justify-center shrink-0 mt-0.5 border border-[#d2e2de]/60">
              <span className="material-symbols-outlined text-[20px] text-[#004c46]">
                {urgencyStatus === 'enter_room'
                  ? 'door_front'
                  : urgencyStatus === 'seat_now'
                  ? 'event_seat'
                  : urgencyStatus === 'moving_closer'
                  ? 'directions_walk'
                  : 'coffee'}
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <h4 className="text-[14px] font-bold leading-snug">
                {guidanceHeadline}
              </h4>
              <p className="text-[12px] opacity-90 mt-0.5 leading-relaxed font-medium">
                {guidanceSubtext}
              </p>
            </div>
          </div>
        </div>

        {/* Visual Token Progression Line */}
        <div className="pt-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#627370] uppercase tracking-wider mb-2">
            <span>Clinical Token Progression</span>
            <span className="text-[#004c46] font-semibold">
              {tokensAhead > 0 ? `${tokensAhead} ahead in queue` : 'Active In Consultation'}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1.5 scrollbar-none">
            {visibleTokens.map((t, idx) => {
              const isServing = t.tokenNumber === currentServingToken;
              const isMe = t.tokenNumber === myTokenNumber;

              return (
                <React.Fragment key={t.tokenNumber}>
                  <div
                    className={`flex-1 min-w-[62px] p-2.5 rounded-xl text-center border transition-all ${
                      isServing
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm scale-105'
                        : isMe
                        ? 'bg-[#004c46] text-white border-[#004c46] shadow-sm'
                        : t.tokenNumber < currentServingToken
                        ? 'bg-[#f0f3f2] text-[#869693] border-transparent opacity-60'
                        : 'bg-white text-[#191c1d] border-[#e2e7e5] shadow-2xs'
                    }`}
                  >
                    <div className="text-[10px] font-bold leading-none uppercase">
                      {isServing ? 'Calling' : isMe ? 'YOU' : `Patient`}
                    </div>
                    <div className="text-[16px] font-extrabold font-mono tabular-nums my-0.5 leading-tight">
                      #{t.tokenNumber}
                    </div>
                    <div className={`text-[10px] font-medium leading-none ${isServing || isMe ? 'text-white/80' : 'text-[#6f7977]'}`}>
                      {isServing ? 'In Room' : t.approxWaitMins === 0 ? 'Now' : `~${t.approxWaitMins}m`}
                    </div>
                  </div>

                  {idx < visibleTokens.length - 1 && (
                    <span className="material-symbols-outlined text-[14px] text-[#bcc7c5] shrink-0">
                      arrow_forward
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#edf0ef]">
          <button
            type="button"
            onClick={onOpenFullModal}
            className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#004c46] hover:bg-[#003833] active:scale-98 text-white font-bold text-[12px] flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <span className="material-symbols-outlined text-[17px]">
              confirmation_number
            </span>
            <span>Digital Pass &amp; Directions</span>
          </button>

          <button
            type="button"
            onClick={onAdvanceToken}
            className="py-2.5 px-3 rounded-xl bg-[#f2f5f4] hover:bg-[#e4eae8] text-[#191c1d] font-bold text-[12px] flex items-center gap-1 transition-colors border border-[#e2e7e5]"
            title="Advance doctor to next token"
          >
            <span className="material-symbols-outlined text-[16px] text-[#004c46]">
              skip_next
            </span>
            <span>Next (#{currentServingToken + 1})</span>
          </button>

          {currentServingToken >= myTokenNumber && (
            <button
              type="button"
              onClick={onResetToDemo}
              className="py-2.5 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-[12px] flex items-center transition-colors"
              title="Reset back to Token #14"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
