import React, { useState } from 'react';
import { DiagnosticTest, DiagnosticBooking } from '../../types';

interface DiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tests: DiagnosticTest[];
  bookings: DiagnosticBooking[];
  onBookTest: (test: DiagnosticTest, date: string, timeSlot: string, homeCollection: boolean, address: string) => void;
}

export const DiagnosticsModal: React.FC<DiagnosticsModalProps> = ({
  isOpen,
  onClose,
  tests,
  bookings,
  onBookTest,
}) => {
  const [activeTab, setActiveTab] = useState<'tests' | 'bookings'>('tests');
  const [selectedTest, setSelectedTest] = useState<DiagnosticTest | null>(null);
  const [date, setDate] = useState('Tomorrow');
  const [timeSlot, setTimeSlot] = useState('08:00 AM - 09:00 AM');
  const [homeCollection, setHomeCollection] = useState(true);
  const [address, setAddress] = useState('Apt 4B, Emerald Residency, Sector 62');
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  if (!isOpen) return null;

  const handleStartBooking = (test: DiagnosticTest) => {
    setSelectedTest(test);
    setShowBookingDialog(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTest) return;
    onBookTest(selectedTest, date, timeSlot, homeCollection, address);
    setShowBookingDialog(false);
    setSelectedTest(null);
    setActiveTab('bookings');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-[#e2e7e5]">
        {/* Top App Bar */}
        <div className="px-5 py-4 bg-[#004c46] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div>
              <h2 className="text-[18px] font-bold tracking-tight">Diagnostics &amp; Lab Tests</h2>
              <p className="text-[11px] text-[#a2f1e6] font-medium">NABL Accredited • Home Sample Pickup</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-[#e2e7e5] bg-[#f8fafa] p-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('tests')}
            className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition-all ${
              activeTab === 'tests'
                ? 'bg-white text-[#004c46] shadow-xs'
                : 'text-[#627370] hover:text-[#191c1d]'
            }`}
          >
            Available Tests ({tests.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition-all ${
              activeTab === 'bookings'
                ? 'bg-white text-[#004c46] shadow-xs'
                : 'text-[#627370] hover:text-[#191c1d]'
            }`}
          >
            My Bookings ({bookings.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {activeTab === 'tests' && (
            <>
              {/* Trust Badge */}
              <div className="p-3 bg-[#eef7f5] rounded-2xl border border-[#004c46]/20 flex items-center gap-3">
                <span className="material-symbols-outlined text-[24px] text-[#004c46]">
                  verified_user
                </span>
                <div className="text-[12px] text-[#003833]">
                  <strong>100% Certified Pathology:</strong> All samples analyzed in automated NABL-certified labs. Digital reports delivered within hours.
                </div>
              </div>

              {/* Tests Catalog */}
              <div className="space-y-3">
                {tests.map((test) => (
                  <div
                    key={test.id}
                    className="p-4 rounded-2xl bg-white border border-[#e4e8e7] hover:border-[#004c46]/30 shadow-2xs space-y-2.5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-[14px] font-bold text-[#141d1c]">{test.title}</h4>
                          {test.popular && (
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#627370] mt-0.5 line-clamp-2">{test.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-[17px] font-extrabold text-[#004c46] font-mono leading-tight">
                          ₹{test.price}
                        </div>
                        {test.originalPrice && (
                          <span className="text-[11px] text-gray-400 line-through font-mono">
                            ₹{test.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#4d5c59]">
                      <span className="px-2 py-0.5 rounded-md bg-gray-100 font-medium">
                        🔬 {test.parametersCount} Parameters
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-gray-100 font-medium">
                        ⏱️ Report in {test.reportHours} hrs
                      </span>
                      {test.fastingRequired ? (
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-semibold border border-amber-200">
                          ⚠️ {test.fastingHours}h Fasting Required
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200">
                          ✓ No Fasting Needed
                        </span>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#edf0ef] flex items-center justify-between">
                      <span className="text-[11px] text-[#627370] font-medium">
                        Sample: {test.sampleType}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleStartBooking(test)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#004c46] hover:bg-[#003833] text-white text-[12px] font-bold transition-all shadow-2xs active:scale-95"
                      >
                        Book Test
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-3">
              {bookings.length === 0 ? (
                <div className="py-12 text-center text-[#6f7977]">
                  <p>No active diagnostic bookings.</p>
                </div>
              ) : (
                bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-white border border-[#e4e8e7] shadow-2xs space-y-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#627370] uppercase tracking-wider block font-mono">
                          Ref #{b.bookingRef}
                        </span>
                        <h4 className="text-[14px] font-bold text-[#141d1c] mt-0.5">{b.test.title}</h4>
                        <p className="text-[12px] text-[#556562] mt-0.5 font-medium">
                          📅 {b.date} • {b.timeSlot}
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {b.status}
                      </span>
                    </div>

                    <div className="p-2.5 bg-[#f8fafa] rounded-xl border border-[#e2e7e5] text-[11px] text-[#4d5c59] flex items-center justify-between">
                      <span>Home Collection: <strong>{b.address}</strong></span>
                      <span className="font-mono font-bold text-[#004c46]">₹{b.amount}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => alert(`Phlebotomist details: Ramesh (Certified Medical Lab Tech) will arrive at ${b.timeSlot}`)}
                        className="flex-1 py-1.5 rounded-xl bg-[#f2f5f4] hover:bg-[#e4eae8] text-[#004c46] font-bold text-[11px] transition-colors"
                      >
                        Track Sample Collector
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f8fafa] border-t border-[#e2e7e5] flex items-center justify-between">
          <span className="text-[11px] text-[#6f7977]">CureX Diagnostics Lab Network</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#004c46] hover:bg-[#003833] text-white text-[13px] font-bold active:scale-95 shadow-xs"
          >
            Close
          </button>
        </div>
      </div>

      {/* Booking Dialog Modal */}
      {showBookingDialog && selectedTest && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-gray-200 space-y-3.5">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-[16px] font-bold text-[#141d1c]">Confirm Sample Collection</h3>
                <p className="text-[11px] text-[#6f7977]">{selectedTest.title}</p>
              </div>
              <span className="text-[18px] font-black text-[#004c46] font-mono">₹{selectedTest.price}</span>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Collection Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-[12px] bg-white text-gray-900"
                >
                  <option value="07:00 AM - 08:00 AM">Tomorrow 07:00 AM - 08:00 AM (Fasting)</option>
                  <option value="08:00 AM - 09:00 AM">Tomorrow 08:00 AM - 09:00 AM</option>
                  <option value="09:00 AM - 10:00 AM">Tomorrow 09:00 AM - 10:00 AM</option>
                  <option value="04:00 PM - 05:00 PM">Tomorrow 04:00 PM - 05:00 PM (Evening)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Home Pickup Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-[12px] text-gray-900"
                  required
                />
              </div>

              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-950">
                ✓ No home collection fee today. Certified phlebotomist will arrive with barcoded sterile vacutainers.
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#004c46] hover:bg-[#003833] text-white font-bold text-[12px] shadow-xs active:scale-95"
                >
                  Confirm Appointment
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingDialog(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[12px]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
