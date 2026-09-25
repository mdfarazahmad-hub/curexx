import React, { useState } from 'react';
import { QUICK_SERVICES, DOCTORS } from '../../data/healthcareData';
import { ScreenTab, PatientLocation } from '../../types';
import { AuthUser } from './LoginAuthScreen';
import { PatientLocationBar } from '../common/PatientLocationBar';
import { LiveQueueTrackerCard } from '../queue/LiveQueueTrackerCard';
import { useVirtualQueue } from '../../hooks/useVirtualQueue';

interface HomeScreenProps {
  currentUser?: AuthUser | null;
  patientLocation: PatientLocation;
  isLocating: boolean;
  virtualQueue: ReturnType<typeof useVirtualQueue>;
  onOpenProfile?: () => void;
  onOpenLocationPicker: () => void;
  onRefreshGps: (e: React.MouseEvent) => void;
  onOpenVirtualQueueModal: () => void;
  onNavigateTab: (tab: ScreenTab) => void;
  onOpenVideoCall?: () => void;
  onOpenReschedule?: () => void;
  onOpenReport?: () => void;
  onOpenBookVisit: () => void;
  onOpenSos: () => void;
  onOpenNotifications?: () => void;
  onQuickServiceClick: (serviceId: string) => void;
  onSelectFamilyMember?: (memberId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentUser,
  patientLocation,
  isLocating,
  virtualQueue,
  onOpenProfile,
  onOpenLocationPicker,
  onRefreshGps,
  onOpenVirtualQueueModal,
  onOpenSos,
  onOpenNotifications,
  onOpenBookVisit,
  onQuickServiceClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceListening, setIsVoiceListening] = useState(false);

  const displayName = currentUser?.name || 'Patient';
  const initial = displayName.charAt(0).toUpperCase();

  const handleVoiceSearch = () => {
    setIsVoiceListening(true);
    setTimeout(() => {
      setSearchQuery('Cardiologist near me');
      setIsVoiceListening(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full pb-8 animate-in fade-in duration-300 max-w-lg mx-auto">
      {/* Integrated Brand Bar & Quick Actions */}
      <div className="flex items-center justify-between pt-1 mb-2">
        {/* Brand & Role Tag */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#004c46] text-[#a2f1e6] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[19px]">
              local_hospital
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-[18px] tracking-tight text-[#004c46]">
              CureX
            </span>
            <button
              type="button"
              onClick={onOpenProfile}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 uppercase tracking-wide flex items-center gap-1 hover:bg-emerald-100 transition-colors"
              title="Click to switch role or view profile"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{currentUser?.role === 'doctor' ? 'Doctor' : 'Patient'}</span>
            </button>
          </div>
        </div>

        {/* Action Controls: SOS, Notifications, Name Circle */}
        <div className="flex items-center gap-2">
          {/* Emergency SOS Button */}
          <button
            type="button"
            onClick={onOpenSos}
            className="h-8 px-2.5 rounded-full bg-[#ffdad6] hover:bg-[#ffcdd2] text-[#ba1a1a] flex items-center gap-1 text-[11px] font-bold transition-all active:scale-95 shadow-2xs border border-red-200"
            title="Emergency SOS & Critical Care"
          >
            <span className="material-symbols-outlined text-[15px] font-bold animate-pulse">
              emergency
            </span>
            <span>SOS</span>
          </button>

          {/* Notifications Button */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#f2f5f4] text-[#3e4947] border border-[#e2e7e5] flex items-center justify-center relative transition-colors shadow-2xs active:scale-95"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[18px]">
              notifications
            </span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-white" />
          </button>

          {/* User Profile Name Circle */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-[#004c46] text-[#a2f1e6] flex items-center justify-center font-bold text-[13px] shadow-2xs ring-2 ring-white hover:ring-[#004c46]/30 transition-all active:scale-95 shrink-0"
            title={`${displayName} - Profile & Settings`}
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={displayName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              initial
            )}
          </button>
        </div>
      </div>

      {/* Greeting Title */}
      <div className="mb-3">
        <h1 className="text-[23px] sm:text-[25px] text-[#111e1c] font-bold tracking-tight leading-tight">
          Good morning, {displayName} 👋
        </h1>
      </div>

      {/* Top Search Option (Directly below Good Morning) */}
      <div className="mb-3.5 relative z-20">
        <div className="relative flex items-center shadow-[0_1px_3px_rgba(0,0,0,0.03)] rounded-2xl bg-white transition-all focus-within:ring-2 focus-within:ring-[#004c46]/20 focus-within:border-[#004c46] border border-[#e2e7e5]">
          <span className="material-symbols-outlined absolute left-4 text-[#758482] text-[22px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctors, medicines or lab tests..."
            className="w-full bg-transparent py-3 pl-12 pr-12 text-[14px] text-[#191c1d] placeholder:text-[#83918f] focus:outline-none font-normal"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-12 p-1 text-[#758482] hover:text-[#191c1d]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            aria-label="Voice Search"
            onClick={handleVoiceSearch}
            className={`absolute right-3 p-1.5 rounded-xl transition-all ${
              isVoiceListening
                ? 'bg-[#ba1a1a] text-white animate-pulse'
                : 'bg-[#004c46]/10 text-[#004c46] hover:bg-[#004c46]/20'
            }`}
            title="Voice Search"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isVoiceListening ? 'graphic_eq' : 'mic'}
            </span>
          </button>
        </div>

        {/* Live Filter Dropdown when user types */}
        {searchQuery.trim().length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-[#e2e7e5] shadow-lg overflow-hidden p-2 z-30 animate-in fade-in duration-150">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#647471]">
              Quick Matches
            </div>
            {/* Matching Doctors */}
            {DOCTORS.filter(
              (d) =>
                d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  onOpenBookVisit();
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#f2f5f4] text-left transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#004c46]/10 text-[#004c46] flex items-center justify-center font-bold text-xs shrink-0">
                  <span className="material-symbols-outlined text-[18px]">stethoscope</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#191c1d] truncate">{doc.name}</p>
                  <p className="text-[11px] text-[#6f7977] truncate">{doc.specialty} • {doc.hospital}</p>
                </div>
                <span className="text-[11px] text-[#004c46] font-bold shrink-0">Book</span>
              </button>
            ))}

            {/* Matching Quick Services */}
            {QUICK_SERVICES.filter(
              (s) =>
                s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (s.displayLabel && s.displayLabel.toLowerCase().includes(searchQuery.toLowerCase()))
            ).map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  onQuickServiceClick(srv.id);
                }}
                className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#f2f5f4] text-left transition-colors"
              >
                <div className={`w-8 h-8 rounded-xl ${srv.bg} ${srv.color} flex items-center justify-center shrink-0`}>
                  <span className="material-symbols-outlined text-[17px]">{srv.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#191c1d] truncate">{srv.title}</p>
                  <p className="text-[11px] text-[#6f7977] truncate">Healthcare Service</p>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#6f7977]">chevron_right</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Location Bar */}
      <PatientLocationBar
        location={patientLocation}
        isLocating={isLocating}
        onOpenPicker={onOpenLocationPicker}
        onRefreshGps={onRefreshGps}
      />

      {/* Quick Services Grid (12 icons matching screenshot) placed directly after Good Morning & Name Circle */}
      <div className="mb-5">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {QUICK_SERVICES.map((srv) => (
            <button
              key={srv.id}
              onClick={() => onQuickServiceClick(srv.id)}
              className="flex flex-col items-center p-3 rounded-2xl bg-white hover:bg-[#fbfcfc] transition-all group shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-[#e4e8e7] hover:border-[#004c46]/30 hover:shadow-[0_4px_12px_rgba(0,76,70,0.06)] active:scale-95 text-center"
              title={srv.title}
            >
              <div
                className={`w-12 h-12 rounded-2xl ${srv.bg} ${srv.color} flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform shadow-2xs`}
              >
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {srv.icon}
                </span>
              </div>
              <span className="text-[12px] text-[#1c2625] group-hover:text-[#004c46] text-center font-semibold truncate w-full tracking-tight transition-colors">
                {srv.displayLabel || srv.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Virtual Queue Tracker Card (Required) */}
      <LiveQueueTrackerCard
        currentServingToken={virtualQueue.currentServingToken}
        myTokenNumber={virtualQueue.myTokenNumber}
        tokensAhead={virtualQueue.tokensAhead}
        estimatedMinutesLeft={virtualQueue.estimatedMinutesLeft}
        urgencyStatus={virtualQueue.urgencyStatus}
        guidanceHeadline={virtualQueue.guidanceHeadline}
        guidanceSubtext={virtualQueue.guidanceSubtext}
        tokensList={virtualQueue.tokensList}
        soundEnabled={virtualQueue.soundEnabled}
        isAutoAdvancing={virtualQueue.isAutoAdvancing}
        notificationBanner={virtualQueue.notificationBanner}
        onAdvanceToken={virtualQueue.advanceToken}
        onOpenFullModal={onOpenVirtualQueueModal}
        onToggleSound={() => virtualQueue.setSoundEnabled(!virtualQueue.soundEnabled)}
        onToggleAutoAdvance={() => virtualQueue.setIsAutoAdvancing(!virtualQueue.isAutoAdvancing)}
        onResetToDemo={virtualQueue.resetToPromptState}
      />
    </div>
  );
};
