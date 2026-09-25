import React, { useState } from 'react';
import { INITIAL_INVENTORY_ALERTS } from '../../data/healthcareData';
import { CriticalInventoryItem } from '../../types';

interface CommandScreenProps {
  onOpenAmbulanceDispatch: () => void;
  onOpenBedReallocation: () => void;
}

export const CommandScreen: React.FC<CommandScreenProps> = ({
  onOpenAmbulanceDispatch,
  onOpenBedReallocation,
}) => {
  const [inventory, setInventory] = useState<CriticalInventoryItem[]>(INITIAL_INVENTORY_ALERTS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showNotice('All telemetry nodes and bed sensors synchronized with Cloud IoT');
    }, 1200);
  };

  const handleRestock = (id: string, name: string) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              units: item.units + 25,
              unitLabel: 'Restock order placed with central supply depot',
              status: 'In Transit',
              isCritical: false
            }
          : item
      )
    );
    showNotice(`Restock PO expedited for ${name}. ETA 20 mins.`);
  };

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => {
      setActionNotice(null);
    }, 3500);
  };

  return (
    <div className="flex flex-col w-full pb-8 animate-in fade-in duration-300">
      {/* Live Operational Header Bar */}
      <div className="flex items-center justify-between mb-4 pt-1">
        <div>
          <h1 className="text-[22px] sm:text-[24px] text-[#191c1d] font-bold tracking-tight">
            ABC Multispeciality
          </h1>
          <p className="text-[12px] text-[#3e4947] flex items-center gap-1.5 mt-0.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#004c46] animate-pulse" />
            Live Command Centre • Auto-sync active
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSync}
            className={`bg-[#a2f1e6]/45 text-[#00504a] px-3 py-2 rounded-xl text-[12px] font-semibold flex items-center gap-1.5 transition-all hover:bg-[#a2f1e6] active:scale-95 ${
              isSyncing ? 'opacity-70' : ''
            }`}
          >
            <span className={`material-symbols-outlined text-[16px] ${isSyncing ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>{isSyncing ? 'Syncing...' : 'Sync'}</span>
          </button>
          <button
            onClick={onOpenAmbulanceDispatch}
            className="bg-[#004c46] text-white px-3.5 py-2 rounded-xl text-[12px] font-semibold flex items-center gap-1.5 shadow-xs hover:bg-[#00665e] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Dispatch</span>
          </button>
        </div>
      </div>

      {/* Live Status Ticker */}
      <div className="bg-[#00665e] text-[#92e1d6] p-3.5 rounded-2xl mb-5 flex items-center gap-3 overflow-hidden shadow-xs border border-[#004c46]">
        <div className="bg-white/10 p-2 rounded-xl flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px] text-white">
            campaign
          </span>
        </div>
        <div className="flex flex-col min-w-0 flex-grow">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#a2f1e6]">
            System Alert Ticker
          </span>
          <p className="text-[13px] text-white font-medium truncate mt-0.5">
            ICU Bed Occupancy at 94% • Emergency Trauma Team 2 Dispatched • Pharmacy Restock in Transit
          </p>
        </div>
      </div>

      {/* KPI Grid (4 Bento Cards) */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Today's Visits */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] text-[#3e4947] font-medium">Today&apos;s Visits</span>
            <span className="p-1.5 rounded-lg bg-[#edeeef] text-[#004c46]">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            </span>
          </div>
          <div>
            <div className="text-[24px] font-bold text-[#191c1d]">480</div>
            <span className="text-[11px] text-[#004c46] font-semibold flex items-center gap-0.5 mt-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +12% vs avg
            </span>
          </div>
        </div>

        {/* Patient Volume */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] text-[#3e4947] font-medium">Patient Volume</span>
            <span className="p-1.5 rounded-lg bg-[#edeeef] text-[#0059bb]">
              <span className="material-symbols-outlined text-[18px]">group</span>
            </span>
          </div>
          <div>
            <div className="text-[24px] font-bold text-[#191c1d]">Normal</div>
            <span className="text-[11px] text-[#0059bb] font-semibold flex items-center gap-0.5 mt-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Stable flow
            </span>
          </div>
        </div>

        {/* Emergency Active */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] text-[#3e4947] font-medium">Emergency Active</span>
            <span className="p-1.5 rounded-lg bg-[#ffdad6] text-[#ba1a1a]">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                emergency
              </span>
            </span>
          </div>
          <div>
            <div className="text-[24px] font-bold text-[#ba1a1a]">3 Active</div>
            <span className="text-[11px] text-[#ba1a1a] font-semibold flex items-center gap-0.5 mt-1">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              Priority 1 Trauma
            </span>
          </div>
        </div>

        {/* Bed Utilization */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] text-[#3e4947] font-medium">Bed Utilization</span>
            <span className="p-1.5 rounded-lg bg-[#edeeef] text-[#004c46]">
              <span className="material-symbols-outlined text-[18px]">hotel</span>
            </span>
          </div>
          <div>
            <div className="text-[24px] font-bold text-[#191c1d]">88%</div>
            <div className="w-full bg-[#edeeef] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#004c46] h-full rounded-full transition-all duration-500"
                style={{ width: '88%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics Section */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Doctor Utilization */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] text-[#3e4947] font-medium">Doctor Utilization</span>
            <span className="p-1.5 rounded-lg bg-[#edeeef] text-[#004c46]">
              <span className="material-symbols-outlined text-[18px]">stethoscope</span>
            </span>
          </div>
          <div>
            <div className="text-[22px] font-bold text-[#191c1d]">92%</div>
            <span className="text-[12px] text-[#3e4947] mt-0.5 block">
              42 Active on floor
            </span>
          </div>
        </div>

        {/* Lab & Pharmacy */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#edeeef] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] text-[#3e4947] font-medium">Lab &amp; Pharmacy</span>
            <span className="p-1.5 rounded-lg bg-[#edeeef] text-[#0059bb]">
              <span className="material-symbols-outlined text-[18px]">medication</span>
            </span>
          </div>
          <div>
            <div className="text-[22px] font-bold text-[#191c1d]">18 / 12</div>
            <span className="text-[12px] text-[#3e4947] mt-0.5 block">
              Samples / Pending RX
            </span>
          </div>
        </div>
      </div>

      {/* Critical Inventory Section */}
      <div className="bg-white p-4.5 rounded-2xl shadow-xs border border-[#edeeef] mb-5">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#ba1a1a] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              error
            </span>
            <h2 className="text-[16px] text-[#191c1d] font-bold tracking-tight">
              Critical Inventory Alerts
            </h2>
          </div>
          <span className="bg-[#ffdad6] text-[#ba1a1a] px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            {inventory.filter((i) => i.isCritical).length} items
          </span>
        </div>

        <div className="space-y-2.5">
          {inventory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-[#f8f9fa] rounded-xl border border-[#edeeef]"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.isCritical
                      ? 'bg-[#ffdad6]/60 text-[#ba1a1a]'
                      : 'bg-[#a2f1e6]/45 text-[#004c46]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {item.icon}
                  </span>
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-[#191c1d]">
                    {item.name}
                  </h4>
                  <p
                    className={`text-[11px] mt-0.5 ${
                      item.isCritical ? 'text-[#ba1a1a] font-medium' : 'text-[#3e4947]'
                    }`}
                  >
                    {item.isCritical ? item.unitLabel : `${item.units} available • ${item.status}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRestock(item.id, item.name)}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-all active:scale-95 ${
                  item.isCritical
                    ? 'bg-[#004c46] text-white hover:bg-[#00665e] shadow-xs'
                    : 'bg-[#edeeef] text-[#3e4947] hover:bg-[#e1e3e4]'
                }`}
              >
                {item.isCritical ? 'Restock' : 'Ordered'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Command Quick Actions */}
      <div className="bg-white p-4.5 rounded-2xl shadow-xs border border-[#edeeef]">
        <h2 className="text-[16px] text-[#191c1d] font-bold tracking-tight mb-3">
          Command Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenAmbulanceDispatch}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#a2f1e6]/35 text-[#00201d] hover:bg-[#a2f1e6]/60 transition-colors text-center border border-[#86d5ca]/40 active:scale-95"
          >
            <span className="material-symbols-outlined text-[28px] text-[#004c46] mb-1.5">
              local_shipping
            </span>
            <span className="text-[13px] font-bold text-[#004c46]">
              Dispatch Ambulance
            </span>
            <span className="text-[11px] text-[#3e4947] mt-0.5">
              Route emergency units
            </span>
          </button>

          <button
            onClick={onOpenBedReallocation}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#edeeef] text-[#191c1d] hover:bg-[#e1e3e4] transition-colors text-center border border-[#bec9c6]/40 active:scale-95"
          >
            <span className="material-symbols-outlined text-[28px] text-[#0059bb] mb-1.5">
              transfer_within_a_station
            </span>
            <span className="text-[13px] font-bold text-[#0059bb]">
              Bed Reallocation
            </span>
            <span className="text-[11px] text-[#3e4947] mt-0.5">
              Manage ward capacity
            </span>
          </button>
        </div>
      </div>

      {/* Live notification */}
      {actionNotice && (
        <div className="fixed bottom-20 inset-x-5 z-50 transition-all animate-in fade-in slide-in-from-bottom duration-300">
          <div className="bg-[#004c46] text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-[#a2f1e6]/40">
            <span className="material-symbols-outlined text-[#a2f1e6] text-[20px]">
              check_circle
            </span>
            <p className="text-[12px] font-medium">{actionNotice}</p>
          </div>
        </div>
      )}
    </div>
  );
};
