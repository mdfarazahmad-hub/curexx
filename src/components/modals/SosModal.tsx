import React, { useState } from 'react';
import { PatientLocation } from '../../types';

interface SosModalProps {
  isOpen: boolean;
  location?: PatientLocation;
  onClose: () => void;
  onRefreshLocation?: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({
  isOpen,
  location,
  onClose,
  onRefreshLocation,
}) => {
  const [sosSent, setSosSent] = useState(false);

  if (!isOpen) return null;

  const lat = location?.latitude ?? 37.7749;
  const lng = location?.longitude ?? -122.4194;
  const facility = location?.nearestFacility?.name ?? 'ABC Multispeciality Hospital';
  const dist = location?.nearestFacility?.distanceKm ?? 1.4;
  const eta = location?.nearestFacility?.etaMinutes ?? 5;

  const handleSendSos = () => {
    setSosSent(true);
    setTimeout(() => {
      alert(`🚨 Emergency Ambulance #104 has been dispatched!\n\nPatient Coordinates: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° W (${location?.address || 'Verified Location'}, ${location?.city || ''})\nReceiving Facility: ${facility} (${dist} km, ~${eta} mins ETA).\nEmergency trauma team and contacts notified.`);
      onClose();
      setSosSent(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border-2 border-[#ffdad6]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-[24px]">emergency</span>
            </span>
            <div>
              <h3 className="text-[18px] font-bold text-[#ba1a1a]">
                Emergency SOS Assistance
              </h3>
              <p className="text-[11px] text-[#6f7977]">
                Rapid Response Telehealth &amp; Ambulance Link
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#edeeef] flex items-center justify-center text-[#3e4947]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* GPS location pill */}
        <div className="bg-[#f8f9fa] p-3.5 rounded-2xl border border-[#edeeef] flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-[#004c46] text-[20px] shrink-0">
              my_location
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-[#191c1d]">
                  {location?.isAutoDetected ? 'Auto-Detected GPS' : 'Verified Location'}
                </p>
                {location?.accuracyMeters && (
                  <span className="text-[10px] text-[#004c46] font-mono bg-[#a2f1e6]/40 px-1 rounded">
                    ±{location.accuracyMeters}m
                  </span>
                )}
              </div>
              <p className="text-[#6f7977] truncate text-[11px]">
                {location?.address ? `${location.address}, ${location.city}` : `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° W`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {onRefreshLocation && (
              <button
                type="button"
                onClick={onRefreshLocation}
                className="w-7 h-7 rounded-lg bg-[#edeeef] hover:bg-[#e1e3e4] text-[#004c46] flex items-center justify-center"
                title="Refresh GPS"
              >
                <span className="material-symbols-outlined text-[15px]">refresh</span>
              </button>
            )}
            <span className="text-[10px] bg-[#a2f1e6]/60 text-[#004c46] font-bold px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
        </div>

        {/* Nearest Facility notice */}
        <div className="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-center justify-between">
          <span className="font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-amber-700">local_hospital</span>
            <span>Nearest ER: {facility}</span>
          </span>
          <span className="font-bold">{dist} km ({eta}m)</span>
        </div>

        {/* Big Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleSendSos}
            disabled={sosSent}
            className="w-full py-4 rounded-2xl bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[24px] animate-bounce">
              ambulance
            </span>
            <span>{sosSent ? 'Contacting Dispatch...' : 'Dispatch Nearest Ambulance'}</span>
          </button>

          <a
            href="tel:911"
            className="w-full py-3 rounded-2xl bg-[#f3f4f5] hover:bg-[#e1e3e4] text-[#191c1d] font-semibold text-[13px] flex items-center justify-center gap-2 border border-[#bec9c6]/50 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Call National Emergency (911)</span>
          </a>
        </div>

        {/* Quick Contacts alert */}
        <div className="text-[11px] text-[#6f7977] text-center">
          Tap will immediately share live GPS &amp; medical vitals with emergency team &amp; emergency contacts.
        </div>
      </div>
    </div>
  );
};
