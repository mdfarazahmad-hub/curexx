import React from 'react';
import { PatientLocation } from '../../types';

interface PatientLocationBarProps {
  location: PatientLocation;
  isLocating: boolean;
  onOpenPicker: () => void;
  onRefreshGps: (e: React.MouseEvent) => void;
}

export const PatientLocationBar: React.FC<PatientLocationBarProps> = ({
  location,
  isLocating,
  onOpenPicker,
  onRefreshGps,
}) => {
  return (
    <div
      onClick={onOpenPicker}
      className="w-full mb-4 p-3 rounded-2xl bg-white border border-[#e4e8e7] hover:border-[#004c46]/40 shadow-[0_1px_3px_rgba(0,0,0,0.03)] cursor-pointer transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] group flex items-center justify-between gap-3 active:scale-[0.99]"
      title="Click to view or change your care location"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-[#004c46]/10 text-[#004c46] flex items-center justify-center shrink-0 group-hover:bg-[#004c46] group-hover:text-white transition-colors relative">
          <span className="material-symbols-outlined text-[19px]">
            location_on
          </span>
          {location.isAutoDetected && (
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 leading-none mb-1 text-[11px]">
            <span className="font-semibold tracking-wide text-[#004c46] uppercase text-[10px]">
              {location.isAutoDetected ? 'Auto GPS Fix' : 'Care Location'}
            </span>
            <span className="text-[#a0aba9]">·</span>
            <span className="text-[#495553] font-medium">
              Nearest ER {location.nearestFacility.distanceKm} km ({location.nearestFacility.etaMinutes}m ETA)
            </span>
          </div>
          <p className="text-[13px] font-semibold text-[#141d1c] truncate flex items-center gap-1.5">
            <span>{location.address}</span>
            <span className="text-[#687673] font-normal text-[12px] truncate">
              — {location.city}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onRefreshGps}
          disabled={isLocating}
          className="w-8 h-8 rounded-xl bg-[#f2f5f4] hover:bg-[#a2f1e6]/40 text-[#004c46] flex items-center justify-center transition-colors"
          title="Refresh GPS Location"
        >
          <span
            className={`material-symbols-outlined text-[17px] ${
              isLocating ? 'animate-spin' : ''
            }`}
          >
            {isLocating ? 'sync' : 'my_location'}
          </span>
        </button>

        <span className="material-symbols-outlined text-[18px] text-[#8e9c9a] group-hover:translate-x-0.5 transition-transform">
          chevron_right
        </span>
      </div>
    </div>
  );
};
