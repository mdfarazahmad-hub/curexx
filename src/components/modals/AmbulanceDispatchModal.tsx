import React, { useState } from 'react';

interface AmbulanceDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDispatchSuccess: (unit: string) => void;
}

export const AmbulanceDispatchModal: React.FC<AmbulanceDispatchModalProps> = ({
  isOpen,
  onClose,
  onDispatchSuccess,
}) => {
  const [selectedUnit, setSelectedUnit] = useState('EMS Unit 04 (ALS)');
  const [priority, setPriority] = useState<'Priority 1 - Critical' | 'Priority 2 - Urgent' | 'Priority 3 - Non-Emergency'>('Priority 1 - Critical');
  const [destination, setDestination] = useState('West Sector - Highway 4 Interchange');
  const [isDispatching, setIsDispatching] = useState(false);

  if (!isOpen) return null;

  const handleDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      onDispatchSuccess(selectedUnit);
      setIsDispatching(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-[#ffdad6]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">emergency</span>
            </span>
            <div>
              <h3 className="text-[17px] font-bold text-[#191c1d]">
                Dispatch Emergency Unit
              </h3>
              <p className="text-[11px] text-[#6f7977]">
                ABC Multispeciality Fleet Telematics
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

        {/* Priority Selector */}
        <div className="flex flex-col gap-1">
          <label className="text-[12px] font-bold text-[#191c1d]">
            Triage Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="bg-[#f3f4f5] border border-[#bec9c6]/40 rounded-xl p-3 text-[13px] text-[#191c1d] focus:outline-[#ba1a1a]"
          >
            <option value="Priority 1 - Critical">Priority 1 - Critical (Trauma / Cardiac)</option>
            <option value="Priority 2 - Urgent">Priority 2 - Urgent (Respiratory / Stroke)</option>
            <option value="Priority 3 - Non-Emergency">Priority 3 - Non-Emergency (Inter-facility)</option>
          </select>
        </div>

        {/* Unit Selection */}
        <div className="flex flex-col gap-1">
          <label className="text-[12px] font-bold text-[#191c1d]">
            Available Ready Unit
          </label>
          <div className="space-y-1.5">
            {[
              { id: 'u4', name: 'EMS Unit 04 (ALS)', type: 'Advanced Life Support', eta: '4 min away' },
              { id: 'u7', name: 'EMS Unit 07 (BLS)', type: 'Basic Life Support', eta: '6 min away' },
              { id: 'u2', name: 'EMS Unit 02 (Neonatal)', type: 'Specialized Transport', eta: '9 min away' },
            ].map((unit) => (
              <div
                key={unit.id}
                onClick={() => setSelectedUnit(unit.name)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedUnit === unit.name
                    ? 'bg-[#ffdad6]/40 border-[#ba1a1a] shadow-xs'
                    : 'bg-[#f8f9fa] border-[#edeeef] hover:bg-[#f3f4f5]'
                }`}
              >
                <div>
                  <h4 className="text-[13px] font-bold text-[#191c1d]">{unit.name}</h4>
                  <p className="text-[11px] text-[#6f7977]">{unit.type}</p>
                </div>
                <span className="text-[11px] font-semibold text-[#004c46] bg-[#a2f1e6]/50 px-2 py-0.5 rounded-full">
                  {unit.eta}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Destination Location */}
        <div className="flex flex-col gap-1">
          <label className="text-[12px] font-bold text-[#191c1d]">
            Incident Destination Coordinate
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="bg-[#f3f4f5] border border-[#bec9c6]/40 rounded-xl p-3 text-[13px] text-[#191c1d] focus:outline-[#004c46]"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 bg-[#edeeef] text-[#191c1d] py-3 rounded-xl font-semibold text-[13px] hover:bg-[#e1e3e4]"
          >
            Cancel
          </button>
          <button
            onClick={handleDispatch}
            disabled={isDispatching}
            className="flex-1 bg-[#ba1a1a] text-white py-3 rounded-xl font-bold text-[13px] hover:bg-[#93000a] transition-colors flex items-center justify-center gap-1.5 shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span>{isDispatching ? 'Dispatching...' : 'Confirm Dispatch'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
