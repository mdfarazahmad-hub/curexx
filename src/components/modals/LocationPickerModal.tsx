import React, { useState } from 'react';
import { PatientLocation } from '../../types';

interface LocationPickerModalProps {
  isOpen: boolean;
  currentLocation: PatientLocation;
  isLocating: boolean;
  statusMessage?: string;
  onClose: () => void;
  onDetectAutoLocation: () => void;
  onSelectManualLocation: (city: string, address: string, area?: string) => void;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  currentLocation,
  isLocating,
  statusMessage,
  onClose,
  onDetectAutoLocation,
  onSelectManualLocation,
}) => {
  const [customCity, setCustomCity] = useState('');
  const [customAddress, setCustomAddress] = useState('');

  if (!isOpen) return null;

  const quickCities = [
    { city: 'San Francisco, CA', address: 'Market St & 4th', area: 'Downtown', distance: '1.2 km' },
    { city: 'New York, NY', address: '5th Ave & 42nd St', area: 'Midtown', distance: '2.1 km' },
    { city: 'Chicago, IL', address: 'Michigan Ave', area: 'Loop District', distance: '1.8 km' },
    { city: 'Los Angeles, CA', address: 'Wilshire Blvd', area: 'Beverly Hills', distance: '3.4 km' },
    { city: 'London, UK', address: 'Harley St', area: 'Marylebone', distance: '1.5 km' },
    { city: 'Bengaluru, KA', address: '100ft Rd, Indiranagar', area: 'East Health Hub', distance: '1.1 km' },
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customCity.trim()) {
      onSelectManualLocation(
        customCity.trim(),
        customAddress.trim() || 'Central Location',
        'Custom Area'
      );
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-[#edeeef] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-[#004c46]/10 text-[#004c46] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">near_me</span>
            </span>
            <div>
              <h3 className="text-[18px] font-bold text-[#191c1d]">
                Patient Care Location
              </h3>
              <p className="text-[11px] text-[#6f7977]">
                Used for ER ambulance dispatch, nearest doctors &amp; pharmacy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#edeeef] flex items-center justify-center text-[#3e4947] hover:bg-[#e1e3e4]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Current Active Location Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#004c46]/5 to-[#a2f1e6]/20 border border-[#004c46]/20 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#004c46] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {currentLocation.isAutoDetected ? 'Auto-Detected GPS Active' : 'Selected Location'}
            </span>
            {currentLocation.accuracyMeters && (
              <span className="text-[10px] text-[#6f7977] font-mono">
                ±{currentLocation.accuracyMeters}m GPS
              </span>
            )}
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-[#191c1d]">
              {currentLocation.address}
            </h4>
            <p className="text-[12px] text-[#3e4947] font-medium">
              {currentLocation.city} • {currentLocation.area}
            </p>
          </div>
          <div className="pt-2 border-t border-[#004c46]/10 flex items-center justify-between text-[11px] text-[#004c46]">
            <span className="flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">local_hospital</span>
              {currentLocation.nearestFacility.name}
            </span>
            <span className="bg-[#004c46]/10 px-2 py-0.5 rounded-md font-bold">
              {currentLocation.nearestFacility.distanceKm} km ({currentLocation.nearestFacility.etaMinutes}m ETA)
            </span>
          </div>
        </div>

        {/* 1-Tap Auto-Detect Button */}
        <button
          onClick={onDetectAutoLocation}
          disabled={isLocating}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#004c46] hover:bg-[#00665e] text-white font-bold text-[13px] flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-70"
        >
          {isLocating ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Detecting GPS Coordinates...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">my_location</span>
              <span>Auto-Detect Current Location (GPS)</span>
            </>
          )}
        </button>

        {statusMessage && (
          <p className="text-[11px] text-center text-[#004c46] font-medium -mt-1">
            {statusMessage}
          </p>
        )}

        {/* Quick Common Locations */}
        <div>
          <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block mb-2">
            Popular Cities &amp; Hubs
          </label>
          <div className="grid grid-cols-2 gap-2">
            {quickCities.map((item) => (
              <button
                key={item.city}
                onClick={() => {
                  onSelectManualLocation(item.city, item.address, item.area);
                  onClose();
                }}
                className="p-2.5 rounded-xl border border-[#bec9c6]/50 hover:border-[#004c46] hover:bg-[#f3f4f5] text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-[#191c1d] group-hover:text-[#004c46]">
                    {item.city.split(',')[0]}
                  </span>
                  <span className="text-[10px] text-[#6f7977] font-mono">
                    {item.distance}
                  </span>
                </div>
                <p className="text-[11px] text-[#6f7977] truncate mt-0.5">
                  {item.address}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Address Input Form */}
        <form onSubmit={handleCustomSubmit} className="pt-2 border-t border-[#edeeef] space-y-2.5">
          <label className="text-[11px] font-bold text-[#3e4947] uppercase tracking-wider block">
            Or Type Custom City / Street
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              required
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              placeholder="City, State"
              className="px-3 py-2 rounded-xl border border-[#bec9c6] text-[12px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
            />
            <input
              type="text"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              placeholder="Street or Area (optional)"
              className="px-3 py-2 rounded-xl border border-[#bec9c6] text-[12px] focus:outline-none focus:border-[#004c46] bg-[#f8f9fa]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#edeeef] hover:bg-[#e1e3e4] text-[#191c1d] font-bold text-[12px] transition-colors"
          >
            Apply Custom Location
          </button>
        </form>
      </div>
    </div>
  );
};
