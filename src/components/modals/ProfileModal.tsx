import React from 'react';
import { AuthUser } from '../screens/LoginAuthScreen';

interface ProfileModalProps {
  isOpen: boolean;
  currentUser: AuthUser;
  onClose: () => void;
  onOpenShareId: () => void;
  onLogout: () => void;
  onSwitchRole: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  currentUser,
  onClose,
  onOpenShareId,
  onLogout,
  onSwitchRole,
}) => {
  if (!isOpen) return null;

  const isDoctor = currentUser.role === 'doctor';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-[#edeeef]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#004c46] text-[20px]">
              account_circle
            </span>
            <h3 className="text-[17px] font-bold text-[#191c1d]">
              {isDoctor ? 'Physician Profile' : 'Patient Profile'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#edeeef] flex items-center justify-center text-[#3e4947]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3.5 p-3.5 bg-[#f3f4f5] rounded-2xl">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-13 h-13 rounded-full object-cover ring-2 ring-[#004c46]"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-13 h-13 rounded-full bg-[#004c46] text-[#a2f1e6] flex items-center justify-center font-bold text-[20px] ring-2 ring-[#a2f1e6]">
              {currentUser.name.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <h4 className="text-[16px] font-bold text-[#191c1d] truncate">
              {currentUser.name}
            </h4>
            <p className="text-[12px] text-[#3e4947] truncate">{currentUser.email}</p>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                isDoctor
                  ? 'bg-[#d8e2ff] text-[#001a41]'
                  : 'bg-[#a2f1e6]/60 text-[#004c46]'
              }`}
            >
              {currentUser.badgeTitle || (isDoctor ? 'Attending Physician' : 'Verified Patient')}
            </span>
          </div>
        </div>

        {/* Credentials / ID banner */}
        <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#edeeef] text-[12px] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#6f7977] uppercase tracking-wider block font-semibold">
              {isDoctor ? 'Practitioner License ID' : 'CureX Health ID'}
            </span>
            <span className="font-mono font-bold text-[#191c1d]">
              {currentUser.identifier || (isDoctor ? 'MCI-2018-88412' : 'CX-99201-RS')}
            </span>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Active
          </span>
        </div>

        {/* List items */}
        <div className="space-y-1.5 text-[13px]">
          {!isDoctor && (
            <button
              onClick={() => {
                onClose();
                onOpenShareId();
              }}
              className="w-full p-3 rounded-xl bg-[#f8f9fa] hover:bg-[#f3f4f5] flex items-center justify-between text-[#191c1d] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#004c46] text-[20px]">
                  qr_code_2
                </span>
                <span className="font-semibold">Digital Health Wallet ID</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#6f7977]">
                chevron_right
              </span>
            </button>
          )}

          {isDoctor ? (
            <button
              onClick={() => alert('Hospital Directory: ABC Multispeciality Hospital • Level 3 Trauma Centre • Department of Cardiology.')}
              className="w-full p-3 rounded-xl bg-[#f8f9fa] hover:bg-[#f3f4f5] flex items-center justify-between text-[#191c1d] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#0059bb] text-[20px]">
                  domain
                </span>
                <span className="font-semibold">Hospital Registry &amp; Affiliation</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#6f7977]">
                chevron_right
              </span>
            </button>
          ) : (
            <button
              onClick={() => alert('Insurance Policy: Star Health Premier. Coverage: $500,000. Cashless network valid at ABC Multispeciality.')}
              className="w-full p-3 rounded-xl bg-[#f8f9fa] hover:bg-[#f3f4f5] flex items-center justify-between text-[#191c1d] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#0059bb] text-[20px]">
                  verified_user
                </span>
                <span className="font-semibold">Active Health Insurance</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#6f7977]">
                chevron_right
              </span>
            </button>
          )}

          {/* Quick Switch to the other role */}
          <button
            onClick={() => {
              onClose();
              onSwitchRole();
            }}
            className="w-full p-3 rounded-xl bg-[#a2f1e6]/25 hover:bg-[#a2f1e6]/45 flex items-center justify-between text-[#004c46] transition-colors border border-[#86d5ca]/40"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#004c46] text-[20px]">
                swap_horiz
              </span>
              <span className="font-semibold">
                Switch to {isDoctor ? 'Patient Mode' : 'Doctor Mode'}
              </span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#004c46]">
              Switch
            </span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#ffdad6]/60 text-[#ba1a1a] hover:bg-[#ffdad6] font-semibold text-[13px] transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Sign Out</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-[#edeeef] text-[#191c1d] font-semibold text-[13px] hover:bg-[#e1e3e4]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
