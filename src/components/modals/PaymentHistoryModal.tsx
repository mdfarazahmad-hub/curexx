import React, { useState } from 'react';
import { Payment } from '../../types';

interface PaymentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  payments: Payment[];
  onPayPendingBill: (paymentId: string) => void;
}

export const PaymentHistoryModal: React.FC<PaymentHistoryModalProps> = ({
  isOpen,
  onClose,
  payments,
  onPayPendingBill,
}) => {
  const [currentFilter, setCurrentFilter] = useState<'All' | 'Consultation' | 'Medicine' | 'Lab Test'>('All');
  const [selectedReceipt, setSelectedReceipt] = useState<Payment | null>(null);

  if (!isOpen) return null;

  const filters: ('All' | 'Consultation' | 'Medicine' | 'Lab Test')[] = [
    'All',
    'Consultation',
    'Medicine',
    'Lab Test',
  ];

  const filteredPayments = payments.filter((p) => {
    if (currentFilter === 'All') return true;
    return p.type === currentFilter;
  });

  const totalPaid = payments
    .filter((p) => p.status === 'Success')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter((p) => p.status === 'Pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'Consultation':
        return { icon: 'stethoscope', bg: 'bg-[#a2f1e6]/40 text-[#004c46]' };
      case 'Medicine':
        return { icon: 'medication', bg: 'bg-emerald-100 text-emerald-800' };
      case 'Lab Test':
        return { icon: 'biotech', bg: 'bg-blue-100 text-blue-800' };
      default:
        return { icon: 'receipt_long', bg: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-[#e2e7e5]">
        {/* Top App Bar - matches CureX PaymentHistoryScreen */}
        <div className="px-5 py-4 bg-[#004c46] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white active:scale-95"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div>
              <h2 className="text-[18px] font-bold tracking-tight">Payment History</h2>
              <p className="text-[11px] text-[#a2f1e6] font-medium">Receipts, invoices &amp; health bills</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                const reportContent = `CureX Health - Consolidated Statement\nTotal Paid: ₹${totalPaid}\nPending: ₹${pendingAmount}\nRecords: ${payments.length}`;
                const blob = new Blob([reportContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'CureX-Annual-Statement.txt';
                a.click();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Export statement"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Financial Highlights */}
        <div className="p-4 bg-[#f8fafa] border-b border-[#e2e7e5]">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-2xl border border-[#e2e7e5] shadow-2xs">
              <span className="text-[11px] font-bold text-[#627370] uppercase tracking-wider block">
                Total Settled
              </span>
              <div className="text-[20px] font-black text-[#004c46] mt-0.5 font-mono">
                ₹{totalPaid.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5 mt-1">
                <span className="material-symbols-outlined text-[13px]">check_circle</span>
                All digital receipts ready
              </span>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#e2e7e5] shadow-2xs">
              <span className="text-[11px] font-bold text-[#627370] uppercase tracking-wider block">
                Pending Copay
              </span>
              <div className="text-[20px] font-black text-amber-700 mt-0.5 font-mono">
                ₹{pendingAmount.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-amber-800 font-semibold flex items-center gap-0.5 mt-1">
                <span className="material-symbols-outlined text-[13px]">schedule</span>
                {pendingAmount > 0 ? 'Due for upcoming OPD' : 'Zero outstanding dues'}
              </span>
            </div>
          </div>

          {/* Filter Chips - matches LazyRow in PaymentHistoryScreen.kt */}
          <div className="flex gap-2 overflow-x-auto py-2 scrollbar-none mt-3 -mx-1 px-1">
            {filters.map((filter) => {
              const isSelected = currentFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setCurrentFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold shrink-0 transition-all active:scale-95 flex items-center gap-1.5 shadow-2xs ${
                    isSelected
                      ? 'bg-[#004c46] text-white shadow-xs'
                      : 'bg-white text-[#41514e] border border-[#e2e7e5] hover:border-[#004c46]/40'
                  }`}
                >
                  {filter}
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {filter === 'All'
                      ? payments.length
                      : payments.filter((p) => p.type === filter).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment Cards List - matches PaymentCard in PaymentHistoryScreen.kt */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredPayments.length === 0 ? (
            <div className="py-12 text-center text-[#6f7977]">
              <span className="material-symbols-outlined text-[44px] text-gray-400 mb-2">
                receipt_long
              </span>
              <p className="text-[14px] font-bold text-[#191c1d]">No transactions found</p>
              <p className="text-[12px] mt-1">No payment records under "{currentFilter}" filter.</p>
            </div>
          ) : (
            filteredPayments.map((payment) => {
              const style = getCategoryIcon(payment.type);
              const isSuccess = payment.status === 'Success';

              return (
                <div
                  key={payment.id}
                  className="p-4 rounded-2xl bg-white border border-[#e4e8e7] hover:border-[#004c46]/30 shadow-2xs transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center shrink-0 mt-0.5 shadow-2xs`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{style.icon}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-[14px] font-bold text-[#141d1c]">{payment.type}</h3>
                          <span
                            className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                              isSuccess
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse'
                            }`}
                          >
                            {payment.status}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#556562] mt-0.5 line-clamp-1 font-medium">
                          {payment.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-[#788885]">
                          <span>{payment.date}</span>
                          <span>•</span>
                          <span className="font-mono">{payment.invoiceNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* Amount Block */}
                    <div className="text-right shrink-0">
                      <div className="text-[18px] font-extrabold text-[#004c46] font-mono leading-tight">
                        ₹{payment.amount.toFixed(2)}
                      </div>
                      <span className="text-[10px] text-[#6f7977] block mt-0.5">
                        {payment.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-3 pt-2.5 border-t border-[#edf0ef] flex items-center justify-between">
                    <span className="text-[11px] text-[#627370] font-medium truncate max-w-[200px]">
                      {payment.provider}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedReceipt(payment)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#f2f5f4] hover:bg-[#e4eae8] text-[#004c46] flex items-center gap-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[13px]">visibility</span>
                        Receipt
                      </button>

                      {!isSuccess && (
                        <button
                          type="button"
                          onClick={() => onPayPendingBill(payment.id)}
                          className="px-3 py-1 rounded-lg text-[11px] font-bold bg-[#004c46] hover:bg-[#003833] text-white flex items-center gap-1 transition-all shadow-2xs active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[13px]">payments</span>
                          Pay ₹{payment.amount}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f8fafa] border-t border-[#e2e7e5] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] text-[#556562]">
            <span className="material-symbols-outlined text-[18px] text-emerald-700">security</span>
            <span>256-bit encrypted medical payments</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#004c46] hover:bg-[#003833] text-white text-[13px] font-bold shadow-xs active:scale-95 transition-all"
          >
            Done
          </button>
        </div>
      </div>

      {/* Detail Receipt Dialog */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-gray-200">
            <div className="text-center pb-4 border-b border-dashed border-gray-300">
              <div className="w-12 h-12 rounded-full bg-[#004c46]/10 text-[#004c46] flex items-center justify-center mx-auto mb-2">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <h3 className="text-[17px] font-bold text-[#141d1c]">CureX Official Receipt</h3>
              <p className="text-[11px] text-[#6f7977] mt-0.5">Tax Invoice #{selectedReceipt.invoiceNumber}</p>
            </div>

            <div className="py-4 space-y-2.5 text-[12px]">
              <div className="flex justify-between">
                <span className="text-gray-500">Service Type:</span>
                <span className="font-bold text-gray-900">{selectedReceipt.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="font-semibold text-gray-900">{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Provider:</span>
                <span className="font-semibold text-gray-900 truncate max-w-[180px]">{selectedReceipt.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Mode:</span>
                <span className="font-semibold text-gray-900">{selectedReceipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100 text-[14px]">
                <span className="font-bold text-gray-900">Total Amount:</span>
                <span className="font-black text-[#004c46] font-mono">₹{selectedReceipt.amount.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  alert(`Receipt for ${selectedReceipt.invoiceNumber} downloaded successfully.`);
                  setSelectedReceipt(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#004c46] hover:bg-[#003833] text-white font-bold text-[12px] transition-all"
              >
                Save PDF Receipt
              </button>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-[12px] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
