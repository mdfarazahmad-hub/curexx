import React from 'react';
import { CUREX_LOGO } from '../data/healthcareData';
import { ScreenTab } from '../types';
import { AuthUser } from './screens/LoginAuthScreen';

interface HeaderProps {
  activeTab: ScreenTab;
  currentUser: AuthUser | null;
  onOpenSos: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onLogout?: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  currentUser,
  onOpenSos,
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 2,
}) => {
  const isDoctor = currentUser?.role === 'doctor';

  const tabLabels: Record<ScreenTab, string> = {
    home: 'CureX Healthcare',
    visits: 'Appointments & Visits',
    health: 'Medical Records',
    clinical: 'OPD Clinical Queue',
    command: 'Command & Analytics',
  };

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#e2e7e5] pt-safe transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="h-14 px-4 sm:px-5 flex items-center justify-between max-w-lg mx-auto">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-[#004c46] text-[#a2f1e6] flex items-center justify-center p-1 shadow-2xs">
            <span className="material-symbols-outlined text-[19px]">
              local_hospital
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[16px] tracking-tight text-[#004c46]">
                CureX
              </span>
              <span className="text-[10px] text-[#71807e] font-semibold">·</span>
              <span className="text-[12px] font-bold text-[#141d1c]">
                {tabLabels[activeTab] || 'Healthcare'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Zone */}
        <div className="flex items-center gap-2">
          {/* Emergency SOS button */}
          <button
            aria-label="Emergency SOS"
            onClick={onOpenSos}
            className="h-8 px-2.5 rounded-full flex items-center gap-1 text-[#ba1a1a] bg-[#ffdad6] hover:bg-[#ffcdd2] transition-all active:scale-95 shadow-2xs text-[11px] font-bold border border-red-200"
            title="Emergency SOS"
          >
            <span className="material-symbols-outlined text-[15px] font-bold animate-pulse">
              emergency
            </span>
            <span>SOS</span>
          </button>

          {/* Notifications button */}
          <button
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#3e4947] hover:bg-[#f0f3f2] border border-[#e2e7e5] relative transition-colors shadow-2xs"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[18px]">
              notifications
            </span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* User Profile Avatar */}
          <button
            aria-label="Profile"
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-[#004c46] text-[#a2f1e6] overflow-hidden flex items-center justify-center hover:ring-2 hover:ring-[#004c46]/30 transition-all ring-2 ring-white shadow-2xs active:scale-95 shrink-0 font-bold text-[13px]"
            title={currentUser ? `${currentUser.name} (${currentUser.role})` : 'Account'}
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span>
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
