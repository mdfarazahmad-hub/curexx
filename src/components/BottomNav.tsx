import React from 'react';
import { ScreenTab } from '../types';
import { UserRole } from './screens/LoginAuthScreen';

interface BottomNavProps {
  activeTab: ScreenTab;
  userRole: UserRole;
  onTabChange: (tab: ScreenTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  userRole,
  onTabChange,
}) => {
  // Tailored tab items for Patient vs Doctor
  const patientNavItems: { tab: ScreenTab; label: string; icon: string; badge?: string }[] = [
    { tab: 'home', label: 'Home', icon: 'home' },
    { tab: 'visits', label: 'Visits', icon: 'calendar_month', badge: '1' },
    { tab: 'health', label: 'Health', icon: 'favorite' },
    { tab: 'clinical', label: 'Clinical', icon: 'stethoscope' },
    { tab: 'command', label: 'Command', icon: 'local_hospital' },
  ];

  const doctorNavItems: { tab: ScreenTab; label: string; icon: string; badge?: string }[] = [
    { tab: 'clinical', label: 'Queue', icon: 'stethoscope', badge: '3' },
    { tab: 'command', label: 'Command', icon: 'local_hospital' },
    { tab: 'visits', label: 'Schedule', icon: 'calendar_month' },
    { tab: 'health', label: 'Records', icon: 'folder_shared' },
    { tab: 'home', label: 'Patient View', icon: 'preview' },
  ];

  const navItems = userRole === 'doctor' ? doctorNavItems : patientNavItems;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#e2e7e5] transition-all shadow-[0_-2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => onTabChange(item.tab)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-12 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#004c46] font-bold'
                  : 'text-[#5d6e6b] hover:text-[#191c1d]'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {item.badge && !isActive && (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#004c46] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] leading-tight tracking-tight font-medium">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#004c46] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
