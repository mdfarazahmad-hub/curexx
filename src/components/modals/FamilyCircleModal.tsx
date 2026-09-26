import React, { useState } from 'react';
import { FamilyMember } from '../../types';

interface FamilyCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: FamilyMember[];
  activeMemberId: string;
  onSelectMember: (memberId: string) => void;
  onAddMember: (member: Omit<FamilyMember, 'id'>) => void;
}

export const FamilyCircleModal: React.FC<FamilyCircleModalProps> = ({
  isOpen,
  onClose,
  members,
  activeMemberId,
  onSelectMember,
  onAddMember,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Father');
  const [age, setAge] = useState('');

  if (!isOpen) return null;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age) return;

    onAddMember({
      name,
      relationship,
      age: parseInt(age, 10),
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
      ringColor: 'ring-emerald-500',
    });

    setName('');
    setAge('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-[#e2e7e5]">
        {/* Top App Bar - matches FamilyMembersScreen.kt */}
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
              <h2 className="text-[18px] font-bold tracking-tight">Family Health Circle</h2>
              <p className="text-[11px] text-[#a2f1e6] font-medium">Linked family health profiles &amp; records</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-[11px] flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">person_add</span>
            Add Member
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="p-3 bg-[#eef7f5] rounded-2xl border border-[#004c46]/20 text-[12px] text-[#003833]">
            Manage doctor bookings, prescriptions, and medical history for your entire family under one verified account.
          </div>

          <div className="space-y-2.5">
            {members.map((member) => {
              const isActive = member.id === activeMemberId;

              return (
                <div
                  key={member.id}
                  onClick={() => onSelectMember(member.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-2xs ${
                    isActive
                      ? 'bg-[#eef7f5] border-[#004c46] ring-1 ring-[#004c46]'
                      : 'bg-white border-[#e4e8e7] hover:border-[#004c46]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 ring-2 ring-emerald-500 shrink-0">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-[14px] font-bold text-[#141d1c]">{member.name}</h4>
                        {isActive && (
                          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#004c46] text-white">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#556562] mt-0.5">
                        {member.relationship} • {member.age} yrs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMember(member.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#e2e7e5] text-[#004c46] font-bold text-[11px] hover:bg-[#f2f5f4] transition-colors"
                    >
                      Select
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f8fafa] border-t border-[#e2e7e5] flex items-center justify-between">
          <span className="text-[11px] text-[#6f7977]">{members.length} members connected</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#004c46] hover:bg-[#003833] text-white text-[13px] font-bold active:scale-95 shadow-xs"
          >
            Done
          </button>
        </div>
      </div>

      {/* Add Member Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-gray-200">
            <h3 className="text-[16px] font-bold text-[#141d1c] mb-3">Add Family Member</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Vance"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-[12px] text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Relationship
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-[12px] bg-white text-gray-900"
                >
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Age (Years)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 68"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-[12px] text-gray-900"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#004c46] hover:bg-[#003833] text-white font-bold text-[12px] shadow-xs"
                >
                  Save Member
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
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
