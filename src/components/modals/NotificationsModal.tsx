import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (type: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'Consultation with Dr. Sharma in 30 mins',
      time: '10m ago',
      icon: 'videocam',
      bg: 'bg-[#a2f1e6]/50',
      color: 'text-[#004c46]',
      action: 'video'
    },
    {
      id: 'notif-2',
      title: 'Complete Blood Count (CBC) report ready',
      time: '1h ago',
      icon: 'lab_profile',
      bg: 'bg-[#d8e2ff]/60',
      color: 'text-[#0059bb]',
      action: 'report'
    },
    {
      id: 'notif-3',
      title: 'Prescription refill reminder (Lisinopril)',
      time: 'Yesterday',
      icon: 'pill',
      bg: 'bg-[#d7e5e2]/70',
      color: 'text-[#394544]',
      action: 'refill'
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl flex flex-col gap-4 border border-[#edeeef]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004c46] text-[20px]">
              notifications
            </span>
            <h3 className="text-[16px] font-bold text-[#191c1d]">
              Notifications
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#edeeef] flex items-center justify-center text-[#3e4947]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onSelectAction(n.action);
                onClose();
              }}
              className="p-3 bg-[#f8f9fa] hover:bg-[#f3f4f5] rounded-2xl border border-[#edeeef] flex items-center gap-3 cursor-pointer transition-colors active:scale-95"
            >
              <div className={`w-10 h-10 rounded-xl ${n.bg} ${n.color} flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-[20px]">{n.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#191c1d] leading-snug">
                  {n.title}
                </p>
                <span className="text-[11px] text-[#6f7977] mt-0.5 block">{n.time}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#edeeef] text-[#191c1d] font-semibold text-[13px] hover:bg-[#e1e3e4]"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
};
