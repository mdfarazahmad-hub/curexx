import React, { useState } from 'react';
import { Medicine, MedicineOrder } from '../../types';

interface PharmacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicines: Medicine[];
  orders: MedicineOrder[];
  onPlaceOrder: (items: { medicine: Medicine; quantity: number }[], deliveryAddress: string) => void;
}

export const PharmacyModal: React.FC<PharmacyModalProps> = ({
  isOpen,
  onClose,
  medicines,
  orders,
  onPlaceOrder,
}) => {
  const [activeTab, setActiveTab] = useState<'shop' | 'tracking'>('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [deliveryAddress, setDeliveryAddress] = useState('Apt 4B, Emerald Residency, Sector 62');
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  if (!isOpen) return null;

  const categories = ['All', 'Cardiac', 'Diabetic', 'Antibiotics', 'Pain Relief', 'Vitamins'];

  const filteredMedicines = medicines.filter((m) => {
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesQuery =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const cartItems = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const med = medicines.find((m) => m.id === id)!;
      return { medicine: med, quantity: qty };
    });

  const cartTotal = cartItems.reduce((acc, item) => acc + item.medicine.price * item.quantity, 0);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    onPlaceOrder(cartItems, deliveryAddress);
    setCart({});
    setShowCartDrawer(false);
    setActiveTab('tracking');
  };

  const latestOrder = orders[0];

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
              <h2 className="text-[18px] font-bold tracking-tight">CureX Pharmacy</h2>
              <p className="text-[11px] text-[#a2f1e6] font-medium">Genuine medicines • 45 min delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCartDrawer(true)}
              className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-[#00201d] font-bold text-[10px] flex items-center justify-center shadow-xs">
                  {cartItems.length}
                </span>
              )}
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

        {/* Tab Toggle */}
        <div className="flex border-b border-[#e2e7e5] bg-[#f8fafa] p-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('shop')}
            className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition-all ${
              activeTab === 'shop'
                ? 'bg-white text-[#004c46] shadow-xs'
                : 'text-[#627370] hover:text-[#191c1d]'
            }`}
          >
            Order Medicines
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tracking')}
            className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition-all relative ${
              activeTab === 'tracking'
                ? 'bg-white text-[#004c46] shadow-xs'
                : 'text-[#627370] hover:text-[#191c1d]'
            }`}
          >
            Live Tracking
            {latestOrder && latestOrder.status !== 'Delivered' && (
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-1" />
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'shop' && (
            <>
              {/* Search Bar */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-3 text-gray-400 text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search brand or generic salt (e.g. Telmisartan, Dolo)..."
                  className="w-full bg-[#f4f7f6] py-2.5 pl-10 pr-4 rounded-xl text-[13px] border border-[#e2e7e5] focus:outline-none focus:ring-2 focus:ring-[#004c46]/20 font-medium"
                />
              </div>

              {/* Prescription Upload Quick Banner */}
              <div className="p-3.5 bg-gradient-to-r from-[#eef7f5] to-[#e0f2ef] rounded-2xl border border-[#a2f1e6]/60 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#004c46] text-[#a2f1e6] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">upload_file</span>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#003833]">Have a Doctor's Prescription?</h4>
                    <p className="text-[11px] text-[#4d5c59]">Upload Rx &amp; pharmacist will pack your order</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Rx Upload: Select verified prescription from Health Vault or gallery')}
                  className="px-3 py-1.5 rounded-xl bg-[#004c46] hover:bg-[#003833] text-white font-bold text-[11px] shrink-0 shadow-2xs active:scale-95"
                >
                  Upload Rx
                </button>
              </div>

              {/* Category Chips */}
              <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none">
                {categories.map((cat) => {
                  const isSel = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold shrink-0 transition-all ${
                        isSel
                          ? 'bg-[#004c46] text-white shadow-2xs'
                          : 'bg-[#f0f3f2] text-[#556562] hover:bg-[#e4eae8]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Medicines List */}
              <div className="space-y-3">
                {filteredMedicines.map((med) => {
                  const qty = cart[med.id] || 0;
                  return (
                    <div
                      key={med.id}
                      className="p-3.5 rounded-2xl bg-white border border-[#e4e8e7] hover:border-[#004c46]/30 shadow-2xs flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-[14px] font-bold text-[#141d1c] truncate">{med.name}</h4>
                          {med.prescriptionRequired && (
                            <span className="text-[9px] font-bold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.2 rounded shrink-0">
                              Rx Required
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#627370] truncate mt-0.5">{med.genericName}</p>
                        <p className="text-[10px] text-[#869693] mt-0.5">{med.packSize} • {med.dosage}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-[15px] font-black text-[#004c46] font-mono">₹{med.price}</span>
                          <span className="text-[11px] text-gray-400 line-through font-mono">₹{med.mrp}</span>
                        </div>
                      </div>

                      {/* Add to Cart or Stepper */}
                      <div className="shrink-0">
                        {qty === 0 ? (
                          <button
                            type="button"
                            onClick={() => updateQuantity(med.id, 1)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#004c46] hover:bg-[#003833] text-white text-[12px] font-bold transition-all shadow-2xs active:scale-95 flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[15px]">add</span>
                            Add
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-[#f0f3f2] p-1 rounded-xl border border-[#e2e7e5]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(med.id, -1)}
                              className="w-6 h-6 rounded-lg bg-white text-[#004c46] font-bold flex items-center justify-center hover:bg-gray-100 shadow-2xs"
                            >
                              -
                            </button>
                            <span className="text-[12px] font-bold w-5 text-center font-mono">{qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(med.id, 1)}
                              className="w-6 h-6 rounded-lg bg-[#004c46] text-white font-bold flex items-center justify-center hover:bg-[#003833] shadow-2xs"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {activeTab === 'tracking' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="py-12 text-center text-[#6f7977]">
                  <p>No active pharmacy orders.</p>
                </div>
              ) : (
                orders.map((order) => {
                  const steps = ['Order Placed', 'Prescription Verified', 'Packed', 'Out for Delivery', 'Delivered'];

                  return (
                    <div
                      key={order.id}
                      className="p-4 rounded-3xl bg-white border border-[#e2e7e5] shadow-xs space-y-3.5"
                    >
                      <div className="flex items-start justify-between border-b border-[#edf0ef] pb-3">
                        <div>
                          <span className="text-[10px] font-bold text-[#627370] uppercase tracking-wider block">
                            Order #{order.orderNumber}
                          </span>
                          <h4 className="text-[14px] font-bold text-[#141d1c] mt-0.5">{order.status}</h4>
                          <p className="text-[11px] text-emerald-800 font-medium">{order.estimatedDelivery}</p>
                        </div>
                        <span className="text-[16px] font-black text-[#004c46] font-mono">
                          ₹{order.totalAmount}
                        </span>
                      </div>

                      {/* Visual Timeline Steps */}
                      <div className="relative pl-6 space-y-3 pt-1">
                        <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#e2e7e5]" />
                        {steps.map((st, idx) => {
                          const isDone = idx <= order.step;
                          const isCurrent = idx === order.step;

                          return (
                            <div key={st} className="relative flex items-center gap-3">
                              <span
                                className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                  isDone
                                    ? 'bg-[#004c46] text-white'
                                    : 'bg-gray-200 text-gray-500'
                                } ${isCurrent ? 'ring-4 ring-emerald-100' : ''}`}
                              >
                                {isDone ? '✓' : idx + 1}
                              </span>
                              <span
                                className={`text-[12px] font-bold ${
                                  isCurrent ? 'text-[#004c46]' : isDone ? 'text-gray-900' : 'text-gray-400'
                                }`}
                              >
                                {st}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Rider & Address Info */}
                      {order.riderName && order.status === 'Out for Delivery' && (
                        <div className="p-3 bg-[#eef7f5] rounded-2xl border border-[#004c46]/20 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-full bg-[#004c46] text-white flex items-center justify-center material-symbols-outlined text-[18px]">
                              two_wheeler
                            </span>
                            <div>
                              <p className="text-[12px] font-bold text-[#003833]">{order.riderName}</p>
                              <p className="text-[10px] text-[#4d5c59]">CureX Express Delivery Partner</p>
                            </div>
                          </div>
                          {order.riderPhone && (
                            <a
                              href={`tel:${order.riderPhone}`}
                              className="px-3 py-1 rounded-xl bg-[#004c46] text-white text-[11px] font-bold shadow-2xs"
                            >
                              Call Rider
                            </a>
                          )}
                        </div>
                      )}

                      <div className="text-[11px] text-gray-500 pt-1">
                        Delivering to: <strong className="text-gray-800">{order.deliveryAddress}</strong>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Floating Cart Drawer */}
        {showCartDrawer && (
          <div className="p-4 bg-white border-t border-[#e2e7e5] shadow-lg space-y-3 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h4 className="text-[14px] font-bold text-[#141d1c]">Your Medicine Bag ({cartItems.length})</h4>
              <button
                type="button"
                onClick={() => setShowCartDrawer(false)}
                className="text-[12px] text-gray-500 hover:text-gray-800"
              >
                Close
              </button>
            </div>

            <div className="max-h-40 overflow-y-auto space-y-2">
              {cartItems.map(({ medicine, quantity }) => (
                <div key={medicine.id} className="flex justify-between items-center text-[12px]">
                  <div>
                    <span className="font-semibold text-gray-900">{medicine.name}</span>
                    <span className="text-gray-500 block text-[10px]">Qty: {quantity}</span>
                  </div>
                  <span className="font-mono font-bold text-[#004c46]">₹{medicine.price * quantity}</span>
                </div>
              ))}
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-200 text-[12px] focus:outline-none focus:ring-1 focus:ring-[#004c46]"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div>
                <span className="text-[11px] text-gray-500 block">Total Due:</span>
                <span className="text-[18px] font-black text-[#004c46] font-mono">₹{cartTotal}</span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                className="px-6 py-2.5 rounded-xl bg-[#004c46] hover:bg-[#003833] text-white font-bold text-[13px] shadow-xs active:scale-95"
              >
                Place 45-Min Order
              </button>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        {!showCartDrawer && activeTab === 'shop' && cartItems.length > 0 && (
          <div className="p-3.5 bg-[#004c46] text-white flex items-center justify-between shadow-md">
            <div>
              <span className="text-[11px] text-[#a2f1e6] block">{cartItems.length} medicine(s) selected</span>
              <span className="text-[16px] font-bold font-mono">₹{cartTotal}</span>
            </div>
            <button
              type="button"
              onClick={() => setShowCartDrawer(true)}
              className="px-4 py-2 rounded-xl bg-white text-[#004c46] font-bold text-[12px] shadow-xs active:scale-95"
            >
              View Cart &amp; Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
